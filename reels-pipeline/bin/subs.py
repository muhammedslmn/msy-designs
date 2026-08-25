#!/usr/bin/env python3
"""Transcript -> kinetic word-by-word subtitles (ASS).

Input is a JSON list of segments: [{"start": 0.0, "end": 2.4, "text": "..."}].
Each segment is cut into short chunks; inside a chunk every word gets its own
event so the spoken word sits at full strength while its neighbours stay dim.
Word timings are apportioned by character length, which tracks natural speech
closely enough that nothing has to be hand-nudged.

    python3 bin/subs.py <transcript.json> <out.ass> [quiet|bold]
"""
import json, re, sys

PLAY_W, PLAY_H = 1080, 1920
MAX_WORDS = 4          # per chunk
MAX_CHARS = 30         # per chunk, whichever limit hits first
TAIL = 0.08            # chunk ends this early so its fade-out clears the next
MIN_WORD = 0.11        # no word flashes shorter than this

STYLES = {
    # name: (font, size, primary BGR, outline BGR, outline px, shadow px,
    #        margin-v, dim alpha)
    "quiet": ("Inter SemiBold", 62, "&H00E4EBEF", "&H000A0A0A", 3, 2, 300, "&H96&"),
    "bold":  ("Manrope ExtraBold", 70, "&H00FFFFFF", "&H000C0F12", 7, 4, 300, "&H8C&"),
}


def ts(t):
    t = max(0.0, t)
    h, rem = divmod(t, 3600)
    m, s = divmod(rem, 60)
    return f"{int(h)}:{int(m):02d}:{s:05.2f}"


def chunk_words(words):
    """Group words into short, readable bursts."""
    out, cur, n = [], [], 0
    for w in words:
        if cur and (len(cur) >= MAX_WORDS or n + len(w) + 1 > MAX_CHARS):
            out.append(cur); cur, n = [], 0
        cur.append(w); n += len(w) + 1
    if cur:
        out.append(cur)
    return out


def time_words(words, start, end):
    """Split a span across words in proportion to their length."""
    weights = [max(len(w), 2) for w in words]
    total = sum(weights)
    span = max(end - start, MIN_WORD * len(words))
    spans, t = [], start
    for w, wt in zip(words, weights):
        d = max(MIN_WORD, span * wt / total)
        spans.append((w, t, t + d))
        t += d
    # Re-fit onto the real span so drift never accumulates.
    grown = spans[-1][2] - start
    if grown > 0:
        scale = (end - start) / grown
        spans = [(w, start + (a - start) * scale, start + (b - start) * scale)
                 for w, a, b in spans]
    return spans


def build(segments, style="quiet"):
    font, size, primary, outline, ow, sh, mv, dim = STYLES[style]
    head = f"""[Script Info]
ScriptType: v4.00+
PlayResX: {PLAY_W}
PlayResY: {PLAY_H}
WrapStyle: 2
ScaledBorderAndShadow: yes
YCbCr Matrix: TV.709

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Reels,{font},{size},{primary},{primary},{outline},&H78000000,0,0,0,0,100,100,2,0,1,{ow},{sh},2,110,110,{mv},1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
    events = []
    for seg in segments:
        words = [w for w in re.sub(r"\s+", " ", seg["text"]).strip().split(" ") if w]
        if not words:
            continue
        spans = time_words(words, float(seg["start"]), float(seg["end"]))
        i = 0
        for group in chunk_words(words):
            g = spans[i:i + len(group)]
            i += len(group)
            c_start = g[0][1]
            c_end = max(g[-1][2] - TAIL, c_start + MIN_WORD)
            for k, (word, w_start, w_end) in enumerate(g):
                a, b = max(w_start, c_start), min(w_end, c_end)
                if b <= a:
                    continue
                # The whole chunk stays on screen; only the live word is full strength.
                parts = [(r"{\alpha&H00&}" if j == k else r"{\alpha" + dim + "}") + other
                         for j, (other, _, _) in enumerate(g)]
                fx = ""
                if k == 0:
                    fx = r"{\fad(110,0)\fscx97\fscy97\t(0,150,\fscx100\fscy100)}"
                elif k == len(g) - 1:
                    fx = r"{\fad(0,110)}"
                events.append(f"Dialogue: 0,{ts(a)},{ts(b)},Reels,,0,0,0,,{fx}{' '.join(parts)}")
    return head + "\n".join(events) + "\n"


if __name__ == "__main__":
    src, dst = sys.argv[1], sys.argv[2]
    style = sys.argv[3] if len(sys.argv) > 3 else "quiet"
    segs = json.load(open(src, encoding="utf-8"))
    if isinstance(segs, dict):
        segs = segs.get("segments", [])
    out = build(segs, style)
    open(dst, "w", encoding="utf-8").write(out)
    print(f"{len(segs)} segments -> {out.count('Dialogue:')} word events -> {dst}")
