#!/usr/bin/env python3
"""Build a *placeholder* voice track from a script file (demo only).

espeak-ng is robotic, but synthesising one WAV per line gives exact
per-line timings for free, which is all the demo needs to prove sync.
The real reel uses the user's own recording plus its transcript.
"""
import json, subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GAP = 0.32   # breath between lines


def dur(p):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                          "-of", "default=nw=1:nk=1", str(p)], capture_output=True, text=True)
    return float(out.stdout.strip())


def main(script_path):
    script = json.loads(Path(script_path).read_text(encoding="utf-8"))
    work = ROOT / "build"; work.mkdir(exist_ok=True)
    parts = work / "tts"; parts.mkdir(exist_ok=True)
    voice = script.get("voice", "tr")

    wavs, segments, t = [], [], 0.0
    for i, line in enumerate(script["lines"]):
        w = parts / f"line-{i:03d}.wav"
        subprocess.run(["espeak-ng", "-v", voice, "-s", "150", "-p", "35",
                        "-w", str(w), line["text"]], check=True)
        d = dur(w)
        segments.append({"start": round(t, 3), "end": round(t + d, 3), "text": line["text"]})
        line["scene"]["start"] = round(t, 3)
        line["scene"]["end"] = round(t + d + GAP, 3)
        t += d + GAP
        wavs.append(w)

    # Concatenate with the breath gaps baked in.
    lst = work / "tts-list.txt"
    silence = parts / "gap.wav"
    subprocess.run(["ffmpeg", "-y", "-f", "lavfi", "-i",
                    f"anullsrc=r=22050:cl=mono:d={GAP}", str(silence)],
                   capture_output=True, check=True)
    entries = []
    for w in wavs:
        entries += [f"file '{w}'", f"file '{silence}'"]
    lst.write_text("\n".join(entries))
    audio = work / "demo-audio.wav"
    subprocess.run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(lst),
                    "-ar", "44100", "-ac", "1", str(audio)], capture_output=True, check=True)

    project = {"out": script.get("out", "reel-demo.mp4"),
               "audio": str(audio.relative_to(ROOT)),
               "scenes": [l["scene"] for l in script["lines"]]}
    (ROOT / "build" / "project.json").write_text(json.dumps(project, ensure_ascii=False, indent=2))
    (ROOT / "build" / "transcript.json").write_text(json.dumps(segments, ensure_ascii=False, indent=2))
    print(f"voice track {dur(audio):.2f}s · {len(segments)} lines → build/project.json")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "content/demo.script.json")
