#!/usr/bin/env python3
"""Map a recording's shape without transcribing it.

Silence detection gives the phrase boundaries the speaker actually used, and
the long pauses between them mark where one thought ends and the next starts.
That is enough to lay scenes on the timeline: the cuts land on the speaker's
own breaths instead of on an arbitrary grid.

    python3 bin/analyze-audio.py <audio> [out.json]
"""
import json, re, subprocess, sys
from pathlib import Path

PHRASE_GAP = 0.42      # a pause at least this long ends a phrase
PARA_GAP = 0.95        # a pause at least this long ends a thought
NOISE_DB = -32


def duration(path):
    """Decode to find the real length.

    A VBR mp3's header duration can be badly wrong - this recording claims
    5:00 and actually runs 5:28 - and trusting it drifts the whole timeline.
    """
    p = subprocess.run(["ffmpeg", "-hide_banner", "-i", str(path), "-f", "null", "-"],
                       capture_output=True, text=True)
    stamps = re.findall(r"time=(\d+):(\d\d):(\d\d\.\d+)", p.stderr)
    if stamps:
        h, m, sec = stamps[-1]
        return int(h) * 3600 + int(m) * 60 + float(sec)
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                          "-of", "default=nw=1:nk=1", str(path)], capture_output=True, text=True)
    return float(out.stdout.strip())


def silences(path):
    p = subprocess.run(["ffmpeg", "-hide_banner", "-i", str(path),
                        "-af", f"silencedetect=noise={NOISE_DB}dB:d={PHRASE_GAP}", "-f", "null", "-"],
                       capture_output=True, text=True)
    starts = [float(m) for m in re.findall(r"silence_start: ([0-9.]+)", p.stderr)]
    ends = [float(m) for m in re.findall(r"silence_end: ([0-9.]+)", p.stderr)]
    return list(zip(starts, ends + [None] * (len(starts) - len(ends))))


def loudness(path, total):
    """Mean volume per second, used to spot the emphasised stretches."""
    p = subprocess.run(["ffmpeg", "-hide_banner", "-i", str(path),
                        "-af", "astats=metadata=1:reset=1,ametadata=print:key=lavfi.astats.Overall.RMS_level",
                        "-f", "null", "-"], capture_output=True, text=True)
    vals = [float(v) for v in re.findall(r"RMS_level=(-?[0-9.]+)", p.stderr)]
    return vals


def build(path):
    total = duration(path)
    sil = silences(path)
    # Invert the silences into speech spans.
    speech, cur = [], 0.0
    for s, e in sil:
        if s > cur + 0.05:
            speech.append((cur, s))
        cur = e if e is not None else total
    if total > cur + 0.05:
        speech.append((cur, total))

    # A long gap between two phrases starts a new thought.
    paras, group = [], [speech[0]] if speech else []
    for prev, nxt in zip(speech, speech[1:]):
        if nxt[0] - prev[1] >= PARA_GAP:
            paras.append(group); group = []
        group.append(nxt)
    if group:
        paras.append(group)

    return {
        "audio": str(path),
        "duration": round(total, 2),
        "phrases": [{"start": round(a, 2), "end": round(b, 2), "dur": round(b - a, 2)}
                    for a, b in speech],
        "paragraphs": [{"start": round(g[0][0], 2), "end": round(g[-1][1], 2),
                        "dur": round(g[-1][1] - g[0][0], 2), "phrases": len(g)}
                       for g in paras if g],
    }


if __name__ == "__main__":
    src = sys.argv[1]
    data = build(Path(src))
    dst = sys.argv[2] if len(sys.argv) > 2 else "build/audio-map.json"
    Path(dst).write_text(json.dumps(data, indent=2))
    sp = sum(p["dur"] for p in data["phrases"])
    print(f"{data['duration']:.1f}s total | {sp:.1f}s speech ({sp/data['duration']*100:.0f}%) | "
          f"{len(data['phrases'])} phrases | {len(data['paragraphs'])} thought blocks\n")
    for i, p in enumerate(data["paragraphs"], 1):
        m0, s0 = divmod(p["start"], 60)
        m1, s1 = divmod(p["end"], 60)
        print(f"  {i:2d}. {int(m0)}:{s0:05.2f} - {int(m1)}:{s1:05.2f}   "
              f"{p['dur']:6.1f}s  {p['phrases']:2d} cumle")
    print(f"\n-> {dst}")
