#!/usr/bin/env python3
"""Turn a transcript into a burned-in subtitle track (ASS).

Input is a JSON list of segments: [{"start": 0.0, "end": 2.4, "text": "..."}].
Output is Reels-styled ASS: two short lines, heavy outline, bottom-safe.
"""
import json, sys, textwrap, re

PLAY_W, PLAY_H = 1080, 1920
FONT = "Manrope ExtraBold"      # from assets/fonts, passed via ffmpeg -fontsdir
MAX_CHARS = 22                  # per line, tuned for 9:16 at this size


def ts(t: float) -> str:
    t = max(0.0, t)
    h, rem = divmod(t, 3600)
    m, s = divmod(rem, 60)
    return f"{int(h)}:{int(m):02d}:{s:05.2f}"


def wrap(text: str) -> str:
    text = re.sub(r"\s+", " ", text).strip()
    lines = textwrap.wrap(text, width=MAX_CHARS, break_long_words=False) or [""]
    if len(lines) > 2:                      # rebalance rather than spill a 3rd line
        lines = textwrap.wrap(text, width=max(MAX_CHARS, len(text) // 2 + 2),
                              break_long_words=False)[:2]
    return r"\N".join(lines)


def emphasise(text: str) -> str:
    """*word* in the transcript paints that word amber."""
    return re.sub(r"\*([^*]+)\*", r"{\\c&H1878FF&}\1{\\c&HFFFFFF&}", text)


HEADER = f"""[Script Info]
ScriptType: v4.00+
PlayResX: {PLAY_W}
PlayResY: {PLAY_H}
WrapStyle: 2
ScaledBorderAndShadow: yes
YCbCr Matrix: TV.709

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Reels,{FONT},72,&H00FFFFFF,&H00FFFFFF,&H00120F0C,&H64000000,0,0,0,0,100,100,1,0,1,7,4,2,90,90,300,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""


def build(segments):
    out = [HEADER]
    for seg in segments:
        text = emphasise(wrap(seg["text"]))
        # A short pop-in keeps cuts from feeling static without distracting.
        fx = r"{\fad(90,90)\fscx92\fscy92\t(0,140,\fscx100\fscy100)}"
        out.append(f"Dialogue: 0,{ts(seg['start'])},{ts(seg['end'])},Reels,,0,0,0,,{fx}{text}")
    return "\n".join(out) + "\n"


if __name__ == "__main__":
    src, dst = sys.argv[1], sys.argv[2]
    segs = json.load(open(src, encoding="utf-8"))
    if isinstance(segs, dict):
        segs = segs.get("segments", [])
    open(dst, "w", encoding="utf-8").write(build(segs))
    print(f"{len(segs)} subtitle cues → {dst}")
