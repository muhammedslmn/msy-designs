#!/usr/bin/env python3
"""Propose scene boundaries from an audio map.

Long thought blocks get split at the speaker's own phrase pauses so no scene
sits still too long; short blocks get merged so no scene flashes past. Every
boundary is one the speaker actually made, never an even grid.

    python3 bin/plan-scenes.py build/audio-map.json [target] [min] [max]
"""
import json, sys
from pathlib import Path


def plan(m, target=15.0, lo=8.0, hi=22.0):
    phrases = m["phrases"]
    paras = m["paragraphs"]
    cuts = [0.0]

    for p in paras:
        inside = [q for q in phrases if q["start"] >= p["start"] - 0.01 and q["end"] <= p["end"] + 0.01]
        span = p["end"] - p["start"]
        if span <= hi or len(inside) < 2:
            cuts.append(p["end"])
            continue
        # Split this block at the phrase gap nearest each target step.
        n = max(1, round(span / target))
        for k in range(1, n):
            want = p["start"] + span * k / n
            best = min(inside[:-1], key=lambda q: abs(q["end"] - want))
            if best["end"] - cuts[-1] >= lo:
                cuts.append(round(best["end"], 2))
        cuts.append(p["end"])

    # Merge anything still too short into its neighbour.
    merged = [cuts[0]]
    for c in cuts[1:]:
        if c - merged[-1] < lo and len(merged) > 1:
            merged[-1] = c
        else:
            merged.append(c)

    # Merging runs of short blocks can overshoot; split those back down at
    # the nearest phrase pause so no scene outstays its welcome.
    final = [merged[0]]
    for c in merged[1:]:
        span = c - final[-1]
        if span > hi:
            n = max(2, round(span / target))
            for k in range(1, n):
                want = final[-1] + span * k / n
                near = [q["end"] for q in phrases if final[-1] + lo <= q["end"] <= c - lo]
                if near:
                    final.append(round(min(near, key=lambda t: abs(t - want)), 2))
        final.append(c)
    merged = sorted(set(final))
    merged[-1] = m["duration"]
    return [{"start": round(a, 2), "end": round(b, 2), "dur": round(b - a, 2)}
            for a, b in zip(merged, merged[1:])]


if __name__ == "__main__":
    m = json.loads(Path(sys.argv[1]).read_text())
    args = [float(a) for a in sys.argv[2:5]] or [15.0, 8.0, 22.0]
    scenes = plan(m, *(args + [15.0, 8.0, 22.0])[:3])
    Path("build/scene-plan.json").write_text(json.dumps(scenes, indent=2))
    print(f"{len(scenes)} scenes over {m['duration']:.1f}s\n")
    for i, s in enumerate(scenes, 1):
        m0, s0 = divmod(s["start"], 60); m1, s1 = divmod(s["end"], 60)
        print(f"  {i:2d}. {int(m0)}:{s0:05.2f} - {int(m1)}:{s1:05.2f}   {s['dur']:5.1f}s")
