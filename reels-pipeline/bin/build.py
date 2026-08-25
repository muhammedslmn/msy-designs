#!/usr/bin/env python3
"""Assemble rendered scene stills + audio + subtitles into a 9:16 MP4.

  python3 bin/build.py content/project.json

Stage 1 turns each still into a moving clip (slow Ken-Burns push), stage 2
cross-fades the clips together, burns the subtitles and muxes the audio.
"""
import json, os, shlex, subprocess, sys, tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FPS = 30
W, H = 1080, 1920
XFADE = 0.45                       # seconds of overlap between scenes
SUPER = 2                          # render motion from a 2x still to stay sharp

MOTIONS = ["in", "out", "up", "in", "down", "out", "left", "in", "right", "out"]
TRANSITIONS = ["fade", "smoothleft", "fade", "circleopen", "fade", "smoothup", "fade", "wipeleft"]


def run(cmd, **kw):
    p = subprocess.run(cmd, capture_output=True, text=True, **kw)
    if p.returncode:
        sys.exit(f"ffmpeg failed:\n{' '.join(shlex.quote(c) for c in cmd)}\n\n{p.stderr[-3000:]}")
    return p


def probe_duration(path):
    p = run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
             "-of", "default=nw=1:nk=1", str(path)])
    return float(p.stdout.strip())


def motion_filter(kind, frames):
    """A zoompan expression per motion preset, fed by a 2x-upscaled still."""
    iw, ih = W * SUPER, H * SUPER
    base = f"scale={iw}:{ih}:flags=lanczos,setsar=1"
    cx, cy = "iw/2-(iw/zoom/2)", "ih/2-(ih/zoom/2)"
    speed = 0.10 / max(frames, 1)          # ~10% travel across the whole clip
    if kind == "in":
        z, x, y = f"min(1.02+{speed}*on,1.14)", cx, cy
    elif kind == "out":
        z, x, y = f"max(1.14-{speed}*on,1.02)", cx, cy
    elif kind in ("up", "down"):
        z = "1.10"
        drift = f"(ih-ih/zoom)*({'1-' if kind == 'up' else ''}on/{max(frames,1)})"
        x, y = cx, drift
    else:  # left / right
        z = "1.10"
        drift = f"(iw-iw/zoom)*({'1-' if kind == 'left' else ''}on/{max(frames,1)})"
        x, y = drift, cy
    return (f"{base},zoompan=z='{z}':x='{x}':y='{y}'"
            f":d={frames}:s={W}x{H}:fps={FPS}")


def build_clip(png, seconds, motion, out):
    frames = max(2, round(seconds * FPS))
    run(["ffmpeg", "-y", "-loop", "1", "-i", str(png),
         "-vf", motion_filter(motion, frames),
         "-frames:v", str(frames), "-r", str(FPS),
         "-c:v", "libx264", "-preset", "medium", "-crf", "16",
         "-pix_fmt", "yuv420p", str(out)])
    return frames / FPS


def main(project_path):
    project = json.loads(Path(project_path).read_text(encoding="utf-8"))
    work = ROOT / "build"
    frames_dir = work / "frames"
    clips_dir = work / "clips"
    clips_dir.mkdir(parents=True, exist_ok=True)
    manifest = json.loads((frames_dir / "manifest.json").read_text())

    audio = (ROOT / project["audio"]).resolve()
    audio_dur = probe_duration(audio)
    print(f"audio: {audio.name}  {audio_dur:.2f}s")

    # Scene timings default to an even split when the project doesn't set them.
    scenes = project["scenes"]
    for i, s in enumerate(scenes):
        if s.get("start") is None:
            s["start"] = audio_dur * i / len(scenes)
        if s.get("end") is None:
            s["end"] = audio_dur * (i + 1) / len(scenes)
    scenes[-1]["end"] = audio_dur

    # Stage 1 — stills become moving clips. Each clip is padded by one
    # transition so the cross-fade offsets land exactly on scene boundaries.
    print("\nstage 1 — scene clips")
    clips, durs = [], []
    for i, (s, m) in enumerate(zip(scenes, manifest)):
        span = max(0.6, s["end"] - s["start"])
        pad = XFADE if i < len(scenes) - 1 else 0.0
        motion = s.get("motion") or MOTIONS[i % len(MOTIONS)]
        out = clips_dir / f"clip-{i+1:03d}.mp4"
        real = build_clip(m["file"], span + pad, motion, out)
        clips.append(out); durs.append(real)
        print(f"  clip-{i+1:03d}  {span:5.2f}s  {motion}")

    # Stage 2 — cross-fade chain, burn subtitles, mux audio.
    print("\nstage 2 — xfade + subtitles + audio")
    subs = work / "subs.ass"
    inputs, fc, prev, offset = [], [], "0:v", 0.0
    for c in clips:
        inputs += ["-i", str(c)]
    for i in range(1, len(clips)):
        offset += durs[i - 1] - XFADE
        label = f"v{i}"
        trans = TRANSITIONS[(i - 1) % len(TRANSITIONS)]
        fc.append(f"[{prev}][{i}:v]xfade=transition={trans}:duration={XFADE}"
                  f":offset={offset:.3f}[{label}]")
        prev = label
    chain = ";".join(fc)
    tail = f"[{prev}]" if fc else "[0:v]"

    sub_filter = ""
    if subs.exists():
        fonts = (ROOT / "assets" / "fonts").as_posix()
        sub_filter = f",subtitles={subs.as_posix()}:fontsdir={fonts}"

    fc_full = (f"{chain};{tail}format=yuv420p{sub_filter}[vout]"
               if chain else f"[0:v]format=yuv420p{sub_filter}[vout]")

    out = ROOT / "build" / project.get("out", "reel.mp4")
    run(["ffmpeg", "-y", *inputs, "-i", str(audio),
         "-filter_complex", fc_full,
         "-map", "[vout]", "-map", f"{len(clips)}:a",
         "-c:v", "libx264", "-preset", "slow", "-crf", "19",
         "-profile:v", "high", "-level", "4.1", "-pix_fmt", "yuv420p",
         "-x264-params", "keyint=60:min-keyint=60:scenecut=0",
         "-c:a", "aac", "-b:a", "192k", "-ar", "44100", "-ac", "2",
         "-movflags", "+faststart", "-shortest", str(out)])

    size = out.stat().st_size / 1e6
    print(f"\n✓ {out}  ({probe_duration(out):.2f}s, {size:.1f} MB, {W}x{H})")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "content/demo.json")
