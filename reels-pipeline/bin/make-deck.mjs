/* Builds the full-screen deck: one self-contained HTML file.

   A tap advances one scene. The recording is embedded, so the page plays
   the lecture itself and a screen capture picks up both. Every scene knows
   the timecode it belongs to, which drives the optional auto-advance and
   the cue that says whether the tap is early or late.

     node bin/make-deck.mjs [out.html]
*/
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { SCENES } from './deck-content.mjs';

const audio = readFileSync(new URL('../build/voice.mp3', import.meta.url)).toString('base64');

const FACES = [
  ['newsreader/300Light/Newsreader_300Light.ttf', 'Newsreader', 300, 'normal'],
  ['newsreader/300Light_Italic/Newsreader_300Light_Italic.ttf', 'Newsreader', 300, 'italic'],
  ['newsreader/400Regular/Newsreader_400Regular.ttf', 'Newsreader', 400, 'normal'],
  ['newsreader/400Regular_Italic/Newsreader_400Regular_Italic.ttf', 'Newsreader', 400, 'italic'],
  ['karla/400Regular/Karla_400Regular.ttf', 'Karla', 400, 'normal'],
  ['karla/500Medium/Karla_500Medium.ttf', 'Karla', 500, 'normal'],
  ['karla/600SemiBold/Karla_600SemiBold.ttf', 'Karla', 600, 'normal'],
  ['amiri/400Regular/Amiri_400Regular.ttf', 'Amiri', 400, 'normal'],
];
const fontCSS = FACES.map(([f, family, weight, style]) => {
  const b64 = readFileSync(new URL(`../node_modules/@expo-google-fonts/${f}`, import.meta.url)).toString('base64');
  return `@font-face{font-family:'${family}';font-style:${style};font-weight:${weight};`
       + `font-display:block;src:url(data:font/ttf;base64,${b64}) format('truetype')}`;
}).join('\n');

/* Drawings: objects and directions only, never a figure or a face. */
const svg = (b) => `<svg viewBox="0 0 200 200" fill="none" stroke="currentColor"
  stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${b}</svg>`;

const ART = {
  book: svg(`<path d="M100 52C80 36 54 33 28 36v112c26-3 52 0 72 16Z"/>
    <path d="M100 52c20-16 46-19 72-16v112c-26-3-52 0-72 16Z"/>
    <path d="M100 52v112" stroke-width="3"/>
    <path d="M46 68h36M46 92h36M118 68h36M118 92h36" stroke-width="2.6" opacity=".55"/>`),

  root: svg(`<path d="M100 176V96" stroke-width="5"/>
    <path d="M100 112c0-30-26-34-40-52M100 104c0-32 0-42 0-66M100 112c0-30 26-34 40-52"/>
    <circle cx="60" cy="52" r="11"/><circle cx="100" cy="30" r="11"/><circle cx="140" cy="52" r="11"/>
    <path d="M68 176h64" stroke-width="5"/>`),

  heart: svg(`<path d="M100 168C60 136 30 112 30 79a34 34 0 0 1 70-13 34 34 0 0 1 70 13c0 33-30 57-70 89Z"/>`),

  converge: svg(`<circle cx="100" cy="100" r="19"/>
    <path d="M100 24v40M100 176v-40M24 100h40M176 100h-40M46 46l28 28M154 154l-28-28M154 46l-28 28M46 154l28-28"/>
    <path d="M93 57l7 7 7-7M93 143l7-7 7 7M57 93l7 7-7 7M143 93l-7 7 7 7"/>`),

  reject: svg(`<circle cx="100" cy="100" r="66" stroke-width="5"/>
    <path d="M53 53l94 94" stroke-width="5"/>`),

  pen: svg(`<path d="M46 158l14-45 74-74a15 15 0 0 1 21 21l-74 74Z"/>
    <path d="M60 113l21 21" stroke-width="3"/>
    <path d="M32 176h136" stroke-width="4"/>`),
};

/* U+FDFA is an Arabic glyph. Left in the Latin body font it falls back to
   whatever the system has and renders as tofu, so it gets Amiri by name. */
const hon = (t = '') => String(t).replace(/\uFDFA/g, '<span class="hon">\uFDFA</span>');

const art = (k) => k ? `<div class="art">${ART[k] || ''}</div>` : '';
const kick = (s) => s.kicker ? `<p class="kicker">${s.kicker}</p>` : '';
const cite = (s) => s.cite ? `<p class="cite">${s.cite}</p>` : '';

const LAYOUT = {
  opening: (s) => `${kick(s)}<p class="ar ar--xl">${s.ar}</p><h1>${hon(s.title)}</h1>`,

  statement: (s) => `${kick(s)}${art(s.art)}
    ${s.ar_inline ? `<p class="ar ar--sm">${s.ar_inline}</p>` : ''}
    <p class="body">${hon(s.text)}</p>${cite(s)}`,

  ask: (s) => `${art(s.art)}<p class="ask">${hon(s.text)}</p>`,

  root: (s) => `<p class="ar ar--lg">${s.ar}</p>${art('root')}
    <p class="body">${hon(s.text)}</p>${cite(s)}`,

  quote: (s) => `${s.lead ? `<p class="lead">${hon(s.lead)}</p>` : ''}
    <span class="qm" aria-hidden="true">&#x201C;</span>
    <blockquote>${hon(s.quote)}</blockquote>${cite(s)}`,

  verse: (s) => `<div class="verse"><blockquote>${hon(s.quote)}</blockquote></div>${cite(s)}`,

  dialogue: (s) => `<p class="who${s.accent ? ' who--accent' : ''}">${hon(s.who)}</p>
    <blockquote class="said">${hon(s.quote)}</blockquote>`,

  beat: (s) => `<p class="beat">${hon(s.text)}</p>`,

  summary: (s) => `${kick(s)}<div class="rows">
    ${s.rows.map((r) => `<div class="row${r.affirm ? ' row--affirm' : ''}">
      <p class="row-l">${r.label}</p><p class="row-b">${hon(r.body)}</p></div>`).join('')}
  </div>`,

  closing: (s) => `<p class="ar ar--sh">${s.ar}</p><p class="body body--mid">${hon(s.text)}</p>`,
};

const slides = SCENES.map((s, i) => `
  <article class="slide slide--${s.kind}" data-i="${i}" data-t="${s.t}" data-e="${s.e}">
    <div class="pad">${LAYOUT[s.kind](s)}</div>
  </article>`).join('');

const TIMES = JSON.stringify(SCENES.map((s) => [s.t, s.e]));
const TOTAL = SCENES[SCENES.length - 1].e;

const html = `<title>Ilah, Szene f\u00FCr Szene</title>
<style>${fontCSS}</style>
<style>
/* Manuscript at night. One committed palette, no theme switching: the deck
   exists to be screen recorded, and the viewer's OS theme must not change
   what the recording looks like. */
:root{
  --ground:#0D111B;
  --ink:#EDE8DA;
  --ink-2:#A8A79F;
  --ink-3:#6E748C;
  --gold:#C9A24C;
  --rule:rgba(237,232,218,.16);

  /* One unit is a hundredth of the 9:16 width the design is drawn for, so
     type keeps its proportions whatever the screen is. */
  --u:min(1vw, 0.5625dvh);
  --pad:calc(var(--u) * 9);
}
*,*::before,*::after{box-sizing:border-box}
html,body{height:100%; margin:0; overflow:hidden; background:var(--ground)}
body{
  color:var(--ink); font-family:Karla,system-ui,sans-serif;
  -webkit-font-smoothing:antialiased; -webkit-tap-highlight-color:transparent;
  overscroll-behavior:none; touch-action:manipulation;
}
b{font-weight:400; color:var(--gold)}

.stage{position:fixed; inset:0; display:grid; place-items:center; cursor:pointer}
.stage::before{
  content:""; position:absolute; inset:0; pointer-events:none;
  background:
    radial-gradient(74% 42% at 50% 4%, rgba(201,162,76,.13), transparent 64%),
    radial-gradient(60% 40% at 50% 100%, rgba(110,116,140,.14), transparent 68%);
}
.frame{
  position:relative; overflow:hidden;
  width:min(100vw, calc(100dvh * 9 / 16));
  height:min(100dvh, calc(100vw * 16 / 9));
}

.slide{
  position:absolute; inset:0; display:grid; align-content:center;
  padding:calc(var(--u) * 11) var(--pad);
  font-size:calc(1em * var(--fit, 1));
  opacity:0; visibility:hidden;
  transition:opacity .62s cubic-bezier(.4,0,.2,1), visibility .62s;
}
.slide.on{opacity:1; visibility:visible}
.pad{display:grid; gap:calc(var(--u) * 3.4); justify-items:start}

/* Each element arrives a beat after the one above it. */
.slide .pad > *{
  opacity:0; transform:translateY(calc(var(--u) * 2.4));
  transition:opacity .72s cubic-bezier(.2,.7,.3,1), transform .72s cubic-bezier(.2,.7,.3,1);
}
.slide.on .pad > *{opacity:1; transform:none}
.slide.on .pad > *:nth-child(1){transition-delay:.12s}
.slide.on .pad > *:nth-child(2){transition-delay:.26s}
.slide.on .pad > *:nth-child(3){transition-delay:.40s}
.slide.on .pad > *:nth-child(4){transition-delay:.54s}
@media (prefers-reduced-motion:reduce){
  .slide,.slide .pad > *{transition-duration:.01ms !important}
}

/* Type */
.kicker{
  margin:0; font-size:calc(var(--u) * 2.5 * var(--fit,1)); font-weight:600;
  letter-spacing:.28em; text-transform:uppercase; color:var(--gold);
  display:flex; align-items:center; gap:calc(var(--u) * 2.4); width:100%;
}
.kicker::after{content:""; flex:1; height:1px; background:linear-gradient(90deg,var(--rule),transparent)}

h1{
  margin:0; font-family:Newsreader,Georgia,serif; font-weight:400;
  font-size:calc(var(--u) * 10.5 * var(--fit,1)); line-height:1.04; letter-spacing:-.018em;
  text-wrap:balance;
}
.body{
  margin:0; font-size:calc(var(--u) * 4.6 * var(--fit,1)); line-height:1.52; font-weight:400;
  color:var(--ink); text-wrap:pretty;
}
.body--mid{color:var(--ink-2); font-size:calc(var(--u) * 4.1 * var(--fit,1))}
.lead{margin:0; font-size:calc(var(--u) * 3.3 * var(--fit,1)); line-height:1.5; color:var(--ink-2)}
.ask{
  margin:0; font-family:Newsreader,Georgia,serif; font-weight:300;
  font-size:calc(var(--u) * 7.6 * var(--fit,1)); line-height:1.16; letter-spacing:-.012em;
  text-wrap:balance;
}
.beat{
  margin:0; width:100%; text-align:center;
  font-family:Newsreader,Georgia,serif; font-size:calc(var(--u) * 6.8 * var(--fit,1));
  line-height:1.2; color:var(--ink);
}

.qm{
  display:block; font-family:Newsreader,Georgia,serif; color:var(--gold);
  font-size:calc(var(--u) * 13); line-height:.42; height:calc(var(--u) * 4);
}
blockquote{
  margin:0; font-family:Newsreader,Georgia,serif; font-weight:300;
  font-size:calc(var(--u) * 5.8 * var(--fit,1)); line-height:1.32; letter-spacing:-.008em;
  text-wrap:pretty;
}
.slide--verse blockquote{font-style:italic}
.verse{width:100%; padding-left:calc(var(--u) * 4.4); border-left:2px solid var(--gold)}
.said{font-size:calc(var(--u) * 5.4 * var(--fit,1))}
.cite{
  margin:0; font-size:calc(var(--u) * 2.4 * var(--fit,1)); font-weight:600; letter-spacing:.17em;
  text-transform:uppercase; color:var(--ink-3); line-height:1.5;
}
.who{
  margin:0; font-size:calc(var(--u) * 2.5); font-weight:600; letter-spacing:.2em;
  text-transform:uppercase; color:var(--ink-3);
}
.who--accent{color:var(--gold)}

.hon{font-family:Amiri,serif; font-size:1.05em; line-height:1}
/* In the small tracked speaker label the ligature collapses into a blob,
   so it is set larger and outside the uppercasing. */
.who .hon,.cite .hon{font-size:2em; text-transform:none; vertical-align:-.34em; letter-spacing:0}
.ar{margin:0; width:100%; font-family:Amiri,serif; direction:rtl; text-align:center; color:var(--ink)}
.ar--xl{font-size:calc(var(--u) * 22); line-height:1.5}
.ar--lg{font-size:calc(var(--u) * 15); line-height:1.5; letter-spacing:calc(var(--u) * .8)}
.ar--sm{font-size:calc(var(--u) * 8); line-height:1.6; color:var(--gold); text-align:start}
.ar--sh{font-size:calc(var(--u) * 13); line-height:1.6; color:var(--gold)}

.art{width:100%; display:grid; place-items:center; color:var(--gold)}
.art svg{width:calc(var(--u) * 26 * var(--fit,1)); height:auto; opacity:.92}
.slide--ask .art svg{width:calc(var(--u) * 20)}

.rows{display:grid; gap:calc(var(--u) * 4.5); width:100%}
.row{padding-top:calc(var(--u) * 2.6); border-top:1px solid var(--rule)}
.row--affirm{border-top-color:var(--gold)}
.row-l{
  margin:0 0 calc(var(--u) * 1.6); font-size:calc(var(--u) * 2.4); font-weight:600;
  letter-spacing:.2em; text-transform:uppercase; color:var(--ink-3);
}
.row--affirm .row-l{color:var(--gold)}
.row-b{margin:0; font-size:calc(var(--u) * 3.9 * var(--fit,1)); line-height:1.5; color:var(--ink)}

/* Progress, off unless the cue layer is on. */
.bar{
  position:absolute; left:0; bottom:0; height:2px; width:0;
  background:var(--gold); opacity:0; transition:opacity .3s;
}
body.cue .bar{opacity:.85}
.cueline{
  position:absolute; left:var(--pad); bottom:calc(var(--u) * 3.4);
  font-size:calc(var(--u) * 2.2); letter-spacing:.16em; color:var(--ink-3);
  font-variant-numeric:tabular-nums; opacity:0; transition:opacity .3s;
}
body.cue .cueline{opacity:.9}
.cueline .now{color:var(--gold)}

/* Controls */
.panel{
  position:fixed; right:calc(var(--u) * 4); bottom:calc(var(--u) * 4); z-index:9;
  display:flex; align-items:center; gap:calc(var(--u) * .8);
  padding:calc(var(--u) * .9); border-radius:999px;
  background:rgba(13,17,27,.9); border:1px solid var(--rule);
  backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px);
  transition:opacity .4s;
}
.panel.gone{opacity:0; pointer-events:none}
.btn{
  appearance:none; border:0; background:transparent; color:var(--ink-2);
  font:inherit; font-size:calc(var(--u) * 2.2); font-weight:600; letter-spacing:.1em;
  text-transform:uppercase; cursor:pointer; border-radius:999px;
  padding:calc(var(--u) * 1.5) calc(var(--u) * 2.2); transition:background .25s, color .25s;
  white-space:nowrap;
}
.btn:hover,.btn:focus-visible{color:var(--ink); background:rgba(237,232,218,.09)}
.btn.on{color:var(--ground); background:var(--gold)}
.recall{
  position:fixed; right:0; bottom:0; z-index:8; width:calc(var(--u) * 14); height:calc(var(--u) * 14);
  border:0; background:transparent; cursor:pointer; opacity:0; transition:opacity .4s;
}
.recall::after{
  content:""; position:absolute; right:calc(var(--u) * 6); bottom:calc(var(--u) * 6);
  width:calc(var(--u) * 1.1); height:calc(var(--u) * 1.1); border-radius:50%; background:var(--ink-3);
}
body.hidden-panel .recall{opacity:.5}
:focus-visible{outline:2px solid var(--gold); outline-offset:3px}
</style>

<div class="stage" id="stage">
  <div class="frame">
    ${slides}
    <div class="bar" id="bar"></div>
    <p class="cueline" id="cueline"></p>
  </div>
</div>

<div class="panel" id="panel">
  <button class="btn" id="prev" type="button" aria-label="Vorherige Szene">&#x2190;</button>
  <button class="btn" id="play" type="button">Play</button>
  <button class="btn" id="auto" type="button" aria-pressed="false">Auto</button>
  <button class="btn" id="cue" type="button" aria-pressed="false">Cue</button>
  <button class="btn" id="full" type="button">Voll</button>
  <button class="btn" id="hide" type="button" aria-label="Bedienung ausblenden">Aus</button>
</div>
<button class="recall" id="recall" type="button" aria-label="Bedienung einblenden"></button>

<audio id="a" preload="auto" src="data:audio/mpeg;base64,${audio}"></audio>

<script>
(() => {
  const TIMES = ${TIMES};
  const TOTAL = ${TOTAL};
  const slides = [...document.querySelectorAll('.slide')];
  const a = document.getElementById('a');
  const panel = document.getElementById('panel');
  const bar = document.getElementById('bar');
  const cueline = document.getElementById('cueline');
  const $ = (id) => document.getElementById(id);
  let i = 0, auto = false;

  const mmss = (t) => Math.floor(t / 60) + ':' + String(Math.floor(t % 60)).padStart(2, '0');

  const show = (n) => {
    i = Math.max(0, Math.min(slides.length - 1, n));
    slides.forEach((s, k) => s.classList.toggle('on', k === i));
    paint();
  };
  const next = () => show(i + 1);
  const prev = () => show(i - 1);

  /* The cue says whether this tap is early or late against the recording,
     so a manual run can be corrected while it is happening. */
  const paint = () => {
    const t0 = TIMES[i][0], t1 = TIMES[i][1];
    const now = a.currentTime;
    const drift = now - t0;
    const sign = drift >= 0 ? '+' : '-';
    cueline.innerHTML = (i + 1) + ' / ' + slides.length
      + ' \\u00B7 ' + mmss(t0) + '\\u2013' + mmss(t1)
      + ' \\u00B7 <span class="now">' + mmss(now) + '</span>'
      + (now > 0 ? ' \\u00B7 ' + sign + Math.abs(drift).toFixed(1) + 's' : '');
    bar.style.width = (now / TOTAL * 100) + '%';
  };

  const sceneAt = (t) => {
    for (let k = TIMES.length - 1; k >= 0; k--) if (t >= TIMES[k][0]) return k;
    return 0;
  };

  const frame = () => {
    if (!a.paused) {
      if (auto) { const k = sceneAt(a.currentTime); if (k !== i) show(k); }
      paint();
    }
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);

  /* A tap anywhere on the stage advances; the panel keeps its own clicks. */
  $('stage').addEventListener('click', next);
  panel.addEventListener('click', (e) => e.stopPropagation());

  $('prev').addEventListener('click', prev);
  const toggle = () => { a.paused ? a.play() : a.pause(); };
  $('play').addEventListener('click', toggle);
  const sync = () => { $('play').textContent = a.paused ? 'Play' : 'Pause'; };
  a.addEventListener('play', sync); a.addEventListener('pause', sync); a.addEventListener('ended', sync);

  $('auto').addEventListener('click', () => {
    auto = !auto;
    $('auto').classList.toggle('on', auto);
    $('auto').setAttribute('aria-pressed', String(auto));
  });
  $('cue').addEventListener('click', () => {
    const on = document.body.classList.toggle('cue');
    $('cue').classList.toggle('on', on);
    $('cue').setAttribute('aria-pressed', String(on));
  });
  $('full').addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();
  });

  const setHidden = (on) => {
    panel.classList.toggle('gone', on);
    document.body.classList.toggle('hidden-panel', on);
  };
  $('hide').addEventListener('click', () => setHidden(true));
  $('recall').addEventListener('click', (e) => { e.stopPropagation(); setHidden(false); });

  addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.code === 'Space' || e.key === 'PageDown') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); prev(); }
    if (e.key === 'p' || e.key === 'P') toggle();
    if (e.key === 'a' || e.key === 'A') $('auto').click();
    if (e.key === 'c' || e.key === 'C') $('cue').click();
    if (e.key === 'h' || e.key === 'H') setHidden(!panel.classList.contains('gone'));
    if (e.key === 'f' || e.key === 'F') $('full').click();
  });

  /* A swipe back is easier than finding the arrow on a phone. */
  let x0 = null;
  addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  addEventListener('touchend', (e) => {
    if (x0 === null) return;
    if (e.changedTouches[0].clientX - x0 > 60) prev();
    x0 = null;
  });

  /* Scale each slide to the space it actually has. A size chosen for the
     longest slide leaves the short ones marooned in an empty frame, and a
     size chosen for the short ones overflows the long ones. Hidden slides
     keep their layout, so every slide can be measured up front. */
  const fit = () => {
    for (const el of slides) {
      el.style.setProperty('--fit', 1);
      const pad = el.querySelector('.pad');
      const cs = getComputedStyle(el);
      const room = el.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      const have = pad.scrollHeight;
      if (!room || !have) continue;
      const f = Math.min(1.5, Math.max(0.82, (room * 0.88) / have));
      el.style.setProperty('--fit', f.toFixed(3));
    }
  };
  const refit = () => { fit(); requestAnimationFrame(fit); };
  addEventListener('resize', refit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refit);
  refit();

  show(0); sync();
})();
</script>`;

const guardBlocks = (doc) => {
  for (const m of doc.matchAll(/<(script|style)\b[^>]*>([\s\S]*?)<\/\1>/g)) {
    const bad = [...m[2]].find((c) => c.codePointAt(0) > 127);
    if (bad) throw new Error(`non-ASCII ${JSON.stringify(bad)} inside <${m[1]}>`);
  }
};

/* The published page is wrapped in a head this file does not control, so a
   charset declaration of its own would land too late to be honoured. Numeric
   references are decoded in markup regardless of how the document is
   labelled. They are NOT decoded inside script or style, hence the guard. */
guardBlocks(html);
const doc = html.replace(/[\u0080-\uFFFF]/g,
  (c) => `&#x${c.codePointAt(0).toString(16).toUpperCase()};`);

const out = resolve(process.argv[2] || 'site/ilah-deck.html');
writeFileSync(out, doc);
console.log(`${out}  ${(doc.length / 1024 / 1024).toFixed(2)} MB  ${SCENES.length} scenes  ${TOTAL}s`);
