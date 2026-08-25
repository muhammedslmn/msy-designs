#!/usr/bin/env python3
"""Assemble rendered scene frames + audio + subtitles into a 9:16 MP4.

  python3 bin/build.py <project.json> [quiet|bold]

Stage 1 turns each scene's entrance frames plus its settled still into one
clip, drifting slowly the whole way. Stage 2 cross-fades the clips, burns
the subtitles and muxes the audio.
"""
import json, re, shlex, subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FPS = 30
W, H = 1080, 1920
SUPER = 1.6                        # motion is cropped out of a larger raster

STYLE = {
    # Restraint reads as quality: the quiet skin gets long dissolves only.
    "quiet": {"xfade": 0.62, "transitions": ["fade"], "travel": 0.055,
              "motions": ["in", "out", "in", "up", "out", "down", "in", "out"]},
    "bold":  {"xfade": 0.45,
              "transitions": ["fade", "smoothleft", "fade", "circleopen", "fade", "smoothup"],
              "travel": 0.10,
              "motions": ["in", "out", "up", "in", "down", "out", "left", "right"]},
}


def run(cmd):
    p = subprocess.run(cmd, capture_output=True, text=True)
    if p.returncode:
        sys.exit(f"ffmpeg failed:\n{' '.join(shlex.quote(c) for c in cmd)}\n\n{p.stderr[-3000:]}")
    return p


def probe_duration(path):
    """Decode to find the real length.

    A VBR mp3's header duration can be badly wrong - the source recording
    here claims 5:00 and actually runs 5:28 - and the last scene is clamped
    to this value, so trusting the header truncates the end of the video.
    """
    p = subprocess.run(["ffmpeg", "-hide_banner", "-i", str(path), "-f", "null", "-"],
                       capture_output=True, text=True)
    stamps = re.findall(r"time=(\d+):(\d\d):(\d\d\.\d+)", p.stderr)
    if stamps:
        h, m, sec = stamps[-1]
        return int(h) * 3600 + int(m) * 60 + float(sec)
    return float(run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                      "-of", "default=nw=1:nk=1", str(path)]).stdout.strip())


def motion_filter(kind, frames, travel):
    """zoompan expression per preset, fed by an already-upscaled stream."""
    cx, cy = "iw/2-(iw/zoom/2)", "ih/2-(ih/zoom/2)"
    lo, hi = 1.02, 1.02 + travel
    step = travel / max(frames, 1)
    if kind == "in":
        z, x, y = f"min({lo}+{step:.8f}*on,{hi})", cx, cy
    elif kind == "out":
        z, x, y = f"max({hi}-{step:.8f}*on,{lo})", cx, cy
    elif kind in ("up", "down"):
        z = f"{1.0 + travel:.4f}"
        prog = f"on/{max(frames,1)}"
        y = f"(ih-ih/zoom)*({'1-' if kind == 'up' else ''}{prog})"
        x = cx
    else:  # left / right
        z = f"{1.0 + travel:.4f}"
        prog = f"on/{max(frames,1)}"
        x = f"(iw-iw/zoom)*({'1-' if kind == 'left' else ''}{prog})"
        y = cy
    return f"zoompan=z='{z}':x='{x}':y='{y}':d=1:s={W}x{H}:fps={FPS}"


def build_clip(scene, seconds, motion, travel, out):
    """Entrance frames, then the settled still held for the remainder."""
    frames = max(2, round(seconds * FPS))
    intro = min(scene["introFrames"], frames)
    rest = frames - intro
    sw, sh = int(W * SUPER) // 2 * 2, int(H * SUPER) // 2 * 2
    pre = f"scale={sw}:{sh}:flags=lanczos,setsar=1"

    cmd = ["ffmpeg", "-y",
           "-framerate", str(FPS), "-i", str(Path(scene["dir"]) / "f-%04d.png")]
    if rest > 0:
        cmd += ["-loop", "1", "-framerate", str(FPS), "-t", f"{rest / FPS:.3f}", "-i", scene["still"]]
        graph = (f"[0:v]trim=end_frame={intro},{pre}[a];[1:v]{pre}[b];"
                 f"[a][b]concat=n=2:v=1:a=0,{motion_filter(motion, frames, travel)}[v]")
    else:
        graph = f"[0:v]trim=end_frame={intro},{pre},{motion_filter(motion, frames, travel)}[v]"

    cmd += ["-filter_complex", graph, "-map", "[v]",
            "-frames:v", str(frames), "-r", str(FPS),
            "-c:v", "libx264", "-preset", "medium", "-crf", "15",
            "-pix_fmt", "yuv420p", str(out)]
    run(cmd)
    return frames / FPS


def main(project_path, style="quiet"):
    cfg = STYLE[style]
    xfade = cfg["xfade"]
    project = json.loads(Path(project_path).read_text(encoding="utf-8"))
    work = ROOT / "build"
    frames_dir = ROOT / project.get("frames", "build/frames")
    clips_dir = work / "clips"
    clips_dir.mkdir(parents=True, exist_ok=True)
    for old in clips_dir.glob("clip-*.mp4"):
        old.unlink()
    manifest = json.loads((frames_dir / "manifest.json").read_text())

    audio = (ROOT / project["audio"]).resolve()
    audio_dur = probe_duration(audio)
    print(f"audio: {audio.name}  {audio_dur:.2f}s")

    scenes = project["scenes"]
    for i, s in enumerate(scenes):
        if s.get("start") is None:
            s["start"] = audio_dur * i / len(scenes)
        if s.get("end") is None:
            s["end"] = audio_dur * (i + 1) / len(scenes)
    scenes[-1]["end"] = audio_dur

    print("\nstage 1 - scene clips")
    clips, durs = [], []
    for i, (s, m) in enumerate(zip(scenes, manifest)):
        span = max(0.8, s["end"] - s["start"])
        pad = xfade if i < len(scenes) - 1 else 0.0
        motion = s.get("motion") or cfg["motions"][i % len(cfg["motions"])]
        out = clips_dir / f"clip-{i+1:03d}.mp4"
        real = build_clip(m, span + pad, motion, cfg["travel"], out)
        clips.append(out); durs.append(real)
        print(f"  clip-{i+1:03d}  {span:6.2f}s  {motion}")

    print("\nstage 2 - xfade + subtitles + audio")
    subs = work / project.get("subs", "subs.ass")
    inputs, fc, prev, offset = [], [], "0:v", 0.0
    for c in clips:
        inputs += ["-i", str(c)]
    for i in range(1, len(clips)):
        offset += durs[i - 1] - xfade
        trans = cfg["transitions"][(i - 1) % len(cfg["transitions"])]
        fc.append(f"[{prev}][{i}:v]xfade=transition={trans}:duration={xfade}"
                  f":offset={offset:.3f}[v{i}]")
        prev = f"v{i}"
    chain = ";".join(fc)
    tail = f"[{prev}]"

    sub_filter = ""
    if subs.exists():
        fonts = (ROOT / "assets" / "fonts").as_posix()
        sub_filter = f",subtitles={subs.as_posix()}:fontsdir={fonts}"
    fc_full = (f"{chain};{tail}format=yuv420p{sub_filter}[vout]" if chain
               else f"[0:v]format=yuv420p{sub_filter}[vout]")

    out = work / project.get("out", "reel.mp4")
    run(["ffmpeg", "-y", *inputs, "-i", str(audio),
         "-filter_complex", fc_full,
         "-map", "[vout]", "-map", f"{len(clips)}:a",
         "-c:v", "libx264", "-preset", "slow", "-crf", "19",
         "-profile:v", "high", "-level", "4.1", "-pix_fmt", "yuv420p",
         "-x264-params", "keyint=60:min-keyint=60:scenecut=0",
         "-c:a", "aac", "-b:a", "192k", "-ar", "44100", "-ac", "2",
         "-movflags", "+faststart", "-shortest", str(out)])
    print(f"\nOK {out}  ({probe_duration(out):.2f}s, {out.stat().st_size/1e6:.1f} MB, {W}x{H})")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else "quiet")
