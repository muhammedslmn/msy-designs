/* Builds the standalone presentation as a real website.

   Output is a complete HTML document, not an embeddable fragment: it needs
   its own head so it can declare a charset, a viewport that clears the
   notch, and the Apple meta that makes "Add to Home Screen" open it
   chromeless and full screen.

     node bin/make-app.mjs [outDir]

   Audio and icon are written alongside as separate files rather than data
   URIs, so the document stays small and the browser can stream the audio.
*/
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { SCENES } from './app-content.mjs';

const outDir = resolve(process.argv[2] || 'site/app');
mkdirSync(outDir, { recursive: true });

/* Fonts are embedded rather than linked. The deck is filmed, and a webfont
   that is slow, blocked or cached-cold would silently record in a fallback
   face - and the recording cannot be redone cheaply. */
const FACES = [
  ['newsreader/300Light/Newsreader_300Light.ttf', 'Newsreader', 300, 'normal'],
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

/* ---- Drawings ---------------------------------------------------------
   Objects, geometry and direction only: no figure, no face. The arch and
   the eight-point star come from the visual language the subject itself
   belongs to rather than generic iconography.                            */
const S = (b) => `<svg viewBox="0 0 240 240" fill="none" stroke="currentColor"
  stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${b}</svg>`;

const ART = {
  folio: S(`<path d="M62 26h84l32 32v156H62Z"/>
    <path d="M146 26v32h32"/>
    <path d="M84 96h72M84 120h72M84 144h48" stroke-width="2.4" opacity=".5"/>
    <path d="M84 60h34v22H84Z" stroke-width="2.4" opacity=".8"/>`),

  rootTree: S(`<path d="M120 214v-58" stroke-width="4"/>
    <path d="M120 168c0-26-24-30-38-48M120 158c0-30 0-40 0-62M120 168c0-26 24-30 38-48"/>
    <circle cx="82" cy="108" r="13"/><circle cx="120" cy="84" r="13"/><circle cx="158" cy="108" r="13"/>
    <path d="M92 214h56" stroke-width="4"/>`),

  heart: S(`<path d="M120 196C78 162 46 138 46 104a32 32 0 0 1 74-14 32 32 0 0 1 74 14c0 34-32 58-74 92Z"/>
    <path d="M120 60V38M74 74 61 58M166 74l13-16M52 116H32M188 116h20" stroke-width="2.6" opacity=".55"/>`),

  rings: S(`<circle cx="120" cy="120" r="15" fill="currentColor" stroke="none"/>
    <circle cx="120" cy="120" r="40" opacity=".8"/>
    <circle cx="120" cy="120" r="66" opacity=".5"/>
    <circle cx="120" cy="120" r="92" opacity=".28"/>`),

  /* Eight-point star: two overlaid squares, the girih figure. */
  star: S(`<path d="M120 30 210 120 120 210 30 120Z"/>
    <path d="M56 56h128v128H56Z"/>
    <circle cx="120" cy="120" r="26" opacity=".55"/>`),

  balance: S(`<path d="M120 40v160M84 200h72" stroke-width="4"/>
    <path d="M44 76h152" stroke-width="4"/>
    <path d="M44 76 16 136h56ZM196 76l28 60h-56Z"/>
    <circle cx="120" cy="58" r="10"/>`),

  pen: S(`<path d="M52 192l16-52 92-92a17 17 0 0 1 24 24l-92 92Z"/>
    <path d="M68 140l24 24" stroke-width="2.6"/>
    <path d="M36 214h168" stroke-width="4"/>`),

  crack: S(`<circle cx="120" cy="120" r="86" opacity=".45"/>
    <path d="M120 34l-26 56 40 22-34 50 26 24" stroke-width="4"/>`),

  reject: S(`<circle cx="120" cy="120" r="82" stroke-width="4"/>
    <path d="M62 62l116 116" stroke-width="4"/>`),
};

/* A mihrab silhouette, used to frame Arabic set large. */
const ARCH = `<svg class="arch" viewBox="0 0 300 340" fill="none" stroke="currentColor"
  stroke-width="1.6" aria-hidden="true">
  <path d="M18 338V150C18 78 77 22 150 22s132 56 132 128v188"/>
  <path d="M40 338V152c0-62 50-110 110-110s110 48 110 110v186" opacity=".38"/>
</svg>`;

const art = (k) => (k && ART[k]) ? `<div class="art">${ART[k]}</div>` : '';
const eyebrow = (s) => s.eyebrow ? `<p class="eyebrow">${s.eyebrow}</p>` : '';
const cite = (s) => s.cite ? `<p class="cite">${s.cite}</p>` : '';
const sub = (s) => s.sub ? `<p class="sub">${s.sub}</p>` : '';

const LAYOUT = {
  title: (s) => `${eyebrow(s)}
    <div class="archwrap">${ARCH}<p class="ar ar--xl">${s.ar}</p></div>
    <h1>${s.title}</h1>`,

  arch: (s) => `${eyebrow(s)}
    <div class="archwrap">${ARCH}<p class="ar ar--lg is-gold">${s.ar}</p></div>${sub(s)}`,

  closing: (s) => `<div class="archwrap">${ARCH}<p class="ar ar--lg is-gold">${s.ar}</p></div>${sub(s)}`,

  points: (s) => `${eyebrow(s)}${art(s.art)}<h2>${s.head}</h2>
    <ul class="points">${s.points.map((p) => `<li>${p}</li>`).join('')}</ul>${cite(s)}`,

  chips: (s) => `${eyebrow(s)}${art(s.art)}<h2>${s.head}</h2>
    <div class="chips">${s.chips.map((c) => `<span>${c}</span>`).join('')}</div>${cite(s)}`,

  root: (s) => `${eyebrow(s)}<p class="ar ar--root">${s.ar}</p>
    <div class="labels">${s.labels.map((l) => `<span>${l}</span>`).join('')}</div>
    ${sub(s)}${cite(s)}`,

  equation: (s) => `<div class="eq">
      <span class="eq-l">${s.left}</span><span class="eq-m">=</span><span class="eq-r">${s.right}</span>
    </div>${sub(s)}${cite(s)}`,

  table: (s) => `<h2>${s.head}</h2>
    ${s.ar_small ? `<p class="ar ar--sm">${s.ar_small}</p>` : ''}
    <dl class="pairs">${s.rows.map(([k, v]) =>
      `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
    ${s.note ? `<p class="note">${s.note}</p>` : ''}`,

  name: (s) => `${eyebrow(s)}${art(s.art)}<h2 class="nm">${s.name}</h2>${sub(s)}`,

  big: (s) => `${eyebrow(s)}<p class="big">${s.text}</p>${sub(s)}${cite(s)}`,

  verse: (s) => `<div class="verse"><p class="big">${s.text}</p></div>${cite(s)}`,

  says: (s) => `<p class="who${s.accent ? ' is-accent' : ''}">${s.who}</p>
    <p class="big said">${s.text}</p>`,

  beat: (s) => `<p class="beat">${s.text}</p>`,

  ask: (s) => `${art(s.art)}<p class="q">${s.question}</p><p class="a">${s.answer}</p>`,

  warn: (s) => `${art(s.art)}<p class="big">${s.text}</p>${cite(s)}`,

  balance: (s) => `<div class="art">${ART.balance}</div>
    <div class="scales"><p>${s.left}</p><p>${s.right}</p></div>${cite(s)}`,
};

/* U+FDFA is an Arabic glyph; in the Latin body font it falls back to tofu.
   Applied to the markup only - the same character also appears inside the
   scene data in the script, where a span would break the string. */
const HON = '\uFDFA';
const hon = (t) => t.split(HON).join(`<span class="hon">${HON}</span>`);

const slides = hon(SCENES.map((s, i) => `
  <article class="slide s-${s.kind}" data-i="${i}">
    <div class="pad">${LAYOUT[s.kind](s)}</div>
  </article>`).join(''));

const TIMES = JSON.stringify(SCENES.map((s) => [s.t, s.e]));
const FULLS = JSON.stringify(SCENES.map((s) => s.full || ''));
const TOTAL = SCENES[SCENES.length - 1].e;

const manifest = {
  name: 'Was bedeutet Ilah?',
  short_name: 'Ilah',
  start_url: './',
  display: 'fullscreen',
  orientation: 'portrait',
  background_color: '#0C1019',
  theme_color: '#0C1019',
  icons: [{ src: './icon.png', sizes: '1024x1024', type: 'image/png', purpose: 'any' }],
};

const doc = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no">
<title>Was bedeutet Ilah?</title>
<meta name="description" content="Ilah: sprachlich und in der islamischen Fachsprache.">
<meta name="theme-color" content="#0C1019">
<!-- Added to the home screen, these open the deck chromeless and full screen. -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Ilah">
<link rel="apple-touch-icon" href="./icon.png">
<link rel="icon" href="./icon.png">
<link rel="manifest" href="data:application/json;base64,${Buffer.from(JSON.stringify(manifest)).toString('base64')}">
<style>${fontCSS}</style>
<style>
/* Manuscript at night. One committed palette, no theme switching: the deck
   is filmed, and the viewer's OS theme must not change the recording. */
:root{
  --ground:#0C1019;
  --ground-2:#131826;
  --ink:#EFEADC;
  --ink-2:#A9A79C;
  --ink-3:#6C7288;
  --gold:#CBA25A;
  --rule:rgba(239,234,220,.15);

  /* One unit is a hundredth of the 9:16 width the design is drawn for, so
     proportions hold on any screen. */
  --u:min(1vw, 0.5625dvh);
  --pad:calc(var(--u) * 10);
  /* The band keeps a constant height so the slide above never shifts
     between scenes; long passages scale their type down instead. */
  --bandh:calc(var(--u) * 34);

  /* Instagram covers the top with its header, the bottom with the caption
     and username, and the right edge with the action buttons. Nothing that
     has to be read may sit in those bands. */
  --safe-t:0px; --safe-b:0px; --safe-r:0px;
}
*,*::before,*::after{box-sizing:border-box}
html,body{height:100%; margin:0; overflow:hidden; background:var(--ground)}
body{
  color:var(--ink); font-family:Karla,system-ui,sans-serif;
  -webkit-font-smoothing:antialiased; -webkit-tap-highlight-color:transparent;
  overscroll-behavior:none; touch-action:manipulation; user-select:none;
}

/* German compounds are long and the column is narrow; nothing may break
   mid-word, which is what put stray hyphens at the end of lines. */
h1,h2,p,li,dt,dd,span{hyphens:none; -webkit-hyphens:none; overflow-wrap:normal; word-break:normal}

.stage{position:fixed; inset:0; display:grid; place-items:center; cursor:pointer}
.stage::after{
  content:""; position:absolute; inset:0; pointer-events:none;
  background:
    radial-gradient(72% 40% at 50% 2%, rgba(203,162,90,.14), transparent 66%),
    radial-gradient(58% 38% at 50% 100%, rgba(108,114,136,.16), transparent 70%);
}
.frame{
  position:relative; overflow:hidden;
  width:100vw; height:100dvh;
}
.safe{
  position:absolute; left:0; right:var(--safe-r);
  top:calc(var(--safe-t) + env(safe-area-inset-top));
  bottom:calc(var(--safe-b) + env(safe-area-inset-bottom));
  display:grid; grid-template-rows:1fr auto;
}
body.reel{--safe-t:8dvh; --safe-b:19dvh; --safe-r:15vw}
.deck{position:relative; overflow:hidden}

/* What Instagram will cover, shown with the cue layer while rehearsing. */
.guides{position:absolute; inset:0; pointer-events:none; opacity:0; transition:opacity .3s}
body.cue.reel .guides{opacity:1}
.guides i{position:absolute; background:rgba(215,90,70,.14); border:1px dashed rgba(215,90,70,.5)}
.g-t{left:0; right:0; top:0; height:8dvh}
.g-b{left:0; right:0; bottom:0; height:19dvh}
.g-r{top:0; bottom:0; right:0; width:15vw}

/* The subtitle band: full width, thin, its own quiet surface. */
.band{
  position:relative; border-top:1px solid rgba(203,162,90,.42);
  background:linear-gradient(180deg, rgba(19,24,38,.96), rgba(9,12,20,.98));
  padding:calc(var(--u) * 3.2) var(--pad);
  height:var(--bandh);
  display:grid; align-items:center; overflow:hidden;
}
.band::before{
  content:""; position:absolute; left:0; right:0; top:-1px; height:1px;
  background:linear-gradient(90deg, transparent, rgba(203,162,90,.85), transparent);
}
.band-t{
  margin:0; color:var(--ink-2); text-wrap:pretty;
  font-size:calc(var(--u) * 3.15 * var(--bandfit, 1)); line-height:1.48;
  transition:opacity .4s;
}
body.no-band{--bandh:0px}
body.no-band .band{display:none}

.slide{
  position:absolute; inset:0; display:grid; align-content:center;
  padding:calc(var(--u) * 6) var(--pad) calc(var(--u) * 5);
  opacity:0; pointer-events:none;
  transform:scale(1.018);
  transition:opacity .8s cubic-bezier(.33,0,.12,1), transform 1.25s cubic-bezier(.2,.75,.2,1);
  will-change:opacity, transform;
}
.slide.on{opacity:1; transform:none; pointer-events:auto}
.pad{display:grid; gap:calc(var(--u) * 4); justify-items:start; width:100%;
     max-width:calc(var(--u) * 82); margin-inline:auto}

/* Each element settles a beat after the one above it. */
.slide .pad > *{
  opacity:0; transform:translate3d(0, calc(var(--u) * 2.6), 0);
  transition:opacity .8s cubic-bezier(.2,.7,.25,1), transform .9s cubic-bezier(.2,.75,.2,1);
}
.slide.on .pad > *{opacity:1; transform:none}
.slide.on .pad > *:nth-child(1){transition-delay:.18s}
.slide.on .pad > *:nth-child(2){transition-delay:.32s}
.slide.on .pad > *:nth-child(3){transition-delay:.46s}
.slide.on .pad > *:nth-child(4){transition-delay:.60s}
.slide.on .pad > *:nth-child(5){transition-delay:.74s}
@media (prefers-reduced-motion:reduce){
  .slide,.slide .pad > *{transition-duration:.01ms !important}
}

/* ---- Type ---- */
.eyebrow{
  margin:0; width:100%; display:flex; align-items:center; gap:calc(var(--u) * 2.4);
  font-size:calc(var(--u) * 2.5 * var(--fit,1)); font-weight:600;
  letter-spacing:.3em; text-transform:uppercase; color:var(--gold);
}
.eyebrow::after{content:""; flex:1; height:1px; background:linear-gradient(90deg,var(--rule),transparent)}

h1{
  margin:0; width:100%; text-align:center;
  font-family:Newsreader,Georgia,serif; font-weight:400;
  font-size:calc(var(--u) * 9.6 * var(--fit,1)); line-height:1.06;
  letter-spacing:-.018em; text-wrap:balance;
}
h2{
  margin:0; font-family:Newsreader,Georgia,serif; font-weight:400;
  font-size:calc(var(--u) * 7.4 * var(--fit,1)); line-height:1.12;
  letter-spacing:-.016em; text-wrap:balance;
}
h2.nm{font-size:calc(var(--u) * 8.6 * var(--fit,1))}
.big{
  margin:0; font-family:Newsreader,Georgia,serif; font-weight:300;
  font-size:calc(var(--u) * 6.6 * var(--fit,1)); line-height:1.28;
  letter-spacing:-.01em; text-wrap:balance;
}
.said{font-weight:400}
.sub{margin:0; font-size:calc(var(--u) * 3.5 * var(--fit,1)); line-height:1.5; color:var(--ink-2); text-wrap:pretty}
.note{margin:0; font-size:calc(var(--u) * 2.8 * var(--fit,1)); line-height:1.5; color:var(--ink-3)}
.cite{
  margin:0; font-size:calc(var(--u) * 2.35 * var(--fit,1)); font-weight:600;
  letter-spacing:.17em; text-transform:uppercase; color:var(--ink-3); line-height:1.5;
}
.who{
  margin:0; font-size:calc(var(--u) * 2.5 * var(--fit,1)); font-weight:600;
  letter-spacing:.2em; text-transform:uppercase; color:var(--ink-3);
}
.who.is-accent{color:var(--gold)}
.who .hon,.cite .hon{font-family:Amiri,serif; font-size:2em; text-transform:none;
                     vertical-align:-.34em; letter-spacing:0}
.hon{font-family:Amiri,serif; font-size:1.06em}
.band-t .hon{font-size:1.9em; vertical-align:-.3em}

.beat{
  margin:0; width:100%; text-align:center;
  font-family:Newsreader,Georgia,serif; font-size:calc(var(--u) * 7 * var(--fit,1)); line-height:1.2;
}
.q{margin:0; font-size:calc(var(--u) * 4.6 * var(--fit,1)); color:var(--ink-2); line-height:1.35}
.a{
  margin:0; font-family:Newsreader,Georgia,serif; color:var(--gold);
  font-size:calc(var(--u) * 13 * var(--fit,1)); line-height:1;
}

/* ---- Arabic ---- */
.ar{margin:0; width:100%; font-family:Amiri,serif; direction:rtl; text-align:center; color:var(--ink)}
.ar.is-gold{color:var(--gold)}
.ar--xl{font-size:calc(var(--u) * 19 * var(--fit,1)); line-height:1.92; white-space:nowrap}
.ar--lg{font-size:calc(var(--u) * 11.5 * var(--fit,1)); line-height:1.92; white-space:nowrap}
.ar--sm{font-size:calc(var(--u) * 6.6 * var(--fit,1)); line-height:1.9; color:var(--gold); text-align:left}
.ar--root{
  font-size:calc(var(--u) * 16 * var(--fit,1)); line-height:1.92;
  letter-spacing:calc(var(--u) * 2.4); color:var(--gold);
}
.archwrap{position:relative; width:100%; display:grid; place-items:center;
          padding:calc(var(--u) * 5) 0 calc(var(--u) * 2)}
.arch{position:absolute; inset:auto 0 0; margin:0 auto; width:calc(var(--u) * 58);
      height:auto; color:var(--gold); opacity:.3}
.archwrap .ar{position:relative}

/* ---- Lists, chips, pairs ---- */
.points{margin:0; padding:0; list-style:none; display:grid; gap:calc(var(--u) * 2.8); width:100%}
.points li{
  position:relative; padding-left:calc(var(--u) * 5.4);
  font-size:calc(var(--u) * 4.3 * var(--fit,1)); line-height:1.36; color:var(--ink);
}
.points li::before{
  content:""; position:absolute; left:0; top:.52em;
  width:calc(var(--u) * 3); height:1px; background:var(--gold);
}

.chips{display:flex; flex-wrap:wrap; gap:calc(var(--u) * 2); width:100%}
.chips span{
  font-size:calc(var(--u) * 3.5 * var(--fit,1)); line-height:1;
  padding:calc(var(--u) * 2) calc(var(--u) * 3); border-radius:999px;
  border:1px solid var(--rule); color:var(--ink); background:var(--ground-2);
}

.labels{display:flex; justify-content:space-between; width:100%; direction:rtl}
.labels span{
  font-size:calc(var(--u) * 2.5 * var(--fit,1)); font-weight:600;
  letter-spacing:.2em; text-transform:uppercase; color:var(--ink-3); direction:ltr;
}

.pairs{margin:0; display:grid; gap:0; width:100%}
.pairs > div{
  display:grid; grid-template-columns:auto 1fr; gap:calc(var(--u) * 3);
  align-items:baseline; padding:calc(var(--u) * 3.2) 0; border-bottom:1px solid var(--rule);
}
.pairs > div:last-child{border-bottom:none}
.pairs dt{
  margin:0; font-family:Newsreader,Georgia,serif; color:var(--gold);
  font-size:calc(var(--u) * 4.6 * var(--fit,1)); line-height:1.2;
}
.pairs dd{margin:0; font-size:calc(var(--u) * 3.6 * var(--fit,1)); line-height:1.4; color:var(--ink-2)}

.eq{display:flex; align-items:baseline; gap:calc(var(--u) * 3); flex-wrap:wrap; width:100%}
.eq span{font-family:Newsreader,Georgia,serif; font-size:calc(var(--u) * 9 * var(--fit,1)); line-height:1.1}
.eq-m{color:var(--ink-3)}
.eq-r{color:var(--gold)}

.verse{width:100%; padding-left:calc(var(--u) * 4.6); border-left:2px solid var(--gold)}
.verse .big{font-style:italic}

.scales{display:grid; gap:calc(var(--u) * 2.4); width:100%}
.scales p{margin:0; font-size:calc(var(--u) * 4 * var(--fit,1)); line-height:1.35; color:var(--ink)}
.scales p:first-child{color:var(--ink)}
.scales p:last-child{color:var(--ink-2)}

.art{width:100%; display:grid; place-items:center; color:var(--gold)}
.art svg{width:calc(var(--u) * 24 * var(--fit,1)); height:auto; opacity:.9}

/* ---- Controls ---- */
.bar{position:absolute; left:0; bottom:0; height:2px; width:0; background:var(--gold);
     opacity:0; transition:opacity .3s}
body.cue .bar{opacity:.85}
.cueline{
  position:absolute; left:var(--pad); bottom:calc(var(--u) * 3.4);
  margin:0; font-size:calc(var(--u) * 2.2); letter-spacing:.14em; color:var(--ink-3);
  font-variant-numeric:tabular-nums; opacity:0; transition:opacity .3s;
}
body.cue .cueline{opacity:.9}
.cueline b{color:var(--gold); font-weight:600}

.panel{
  position:fixed; right:calc(var(--safe-r) + var(--u) * 3); z-index:9;
  bottom:calc(var(--safe-b) + var(--bandh) + var(--u) * 3 + env(safe-area-inset-bottom));
  display:flex; align-items:center; gap:calc(var(--u) * .8);
  padding:calc(var(--u) * .9); border-radius:999px;
  background:rgba(12,16,25,.92); border:1px solid var(--rule);
  backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px);
  transition:opacity .4s;
}
.panel.gone{opacity:0; pointer-events:none}
.btn{
  appearance:none; border:0; background:transparent; color:var(--ink-2);
  font:inherit; font-size:calc(var(--u) * 2.2); font-weight:600; letter-spacing:.1em;
  text-transform:uppercase; cursor:pointer; border-radius:999px; white-space:nowrap;
  padding:calc(var(--u) * 1.6) calc(var(--u) * 2.3); transition:background .25s, color .25s;
}
.btn:hover,.btn:focus-visible{color:var(--ink); background:rgba(239,234,220,.09)}
.btn.on{color:var(--ground); background:var(--gold)}
.recall{
  position:fixed; right:0; bottom:0; z-index:8; border:0; background:transparent;
  width:calc(var(--u) * 15); height:calc(var(--u) * 15); cursor:pointer;
  margin-bottom:calc(var(--safe-b) + var(--bandh) + env(safe-area-inset-bottom));
  opacity:0; transition:opacity .4s;
}
.recall::after{
  content:""; position:absolute; right:calc(var(--u) * 6); bottom:calc(var(--u) * 6);
  width:calc(var(--u) * 1.2); height:calc(var(--u) * 1.2); border-radius:50%; background:var(--ink-3);
}
body.hidden-panel .recall{opacity:.5}
:focus-visible{outline:2px solid var(--gold); outline-offset:3px}
</style>
</head>
<body>

<div class="stage" id="stage">
  <div class="frame">
    <div class="safe">
      <div class="deck" id="deck">
        ${slides}
        <div class="bar" id="bar"></div>
        <p class="cueline" id="cueline"></p>
      </div>
      <!-- The lecture verbatim, while the slide above carries the summary. -->
      <div class="band" id="band"><p class="band-t" id="bandt"></p></div>
    </div>
    <div class="guides" aria-hidden="true"><i class="g-t"></i><i class="g-b"></i><i class="g-r"></i></div>
  </div>
</div>

<div class="panel" id="panel">
  <button class="btn" id="prev" type="button" aria-label="Zur&uuml;ck">&larr;</button>
  <button class="btn" id="play" type="button">Play</button>
  <button class="btn" id="auto" type="button" aria-pressed="false">Auto</button>
  <button class="btn on" id="reel" type="button" aria-pressed="true">Reel</button>
  <button class="btn on" id="text" type="button" aria-pressed="true">Text</button>
  <button class="btn" id="cue" type="button" aria-pressed="false">Cue</button>
  <button class="btn" id="hide" type="button" aria-label="Bedienung ausblenden">Aus</button>
</div>
<button class="recall" id="recall" type="button" aria-label="Bedienung einblenden"></button>

<audio id="a" preload="auto" src="./voice.mp3" playsinline></audio>

<script>
(function () {
  var TIMES = ${TIMES};
  var TOTAL = ${TOTAL};
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var $ = function (id) { return document.getElementById(id); };
  var a = $('a'), panel = $('panel'), bar = $('bar'), cueline = $('cueline');
  var FULLS = ${FULLS};
  var bandt = $('bandt'), band = $('band');
  var HON = '\\uFDFA';
  var i = 0, auto = false;

  function mmss(t) {
    var m = Math.floor(t / 60), s = Math.floor(t % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  function paint() {
    var t0 = TIMES[i][0], t1 = TIMES[i][1], now = a.currentTime || 0;
    var d = now - t0;
    cueline.innerHTML = (i + 1) + ' / ' + slides.length
      + ' \\u00B7 ' + mmss(t0) + '\\u2013' + mmss(t1)
      + ' \\u00B7 <b>' + mmss(now) + '</b>'
      + (now > 0 ? ' \\u00B7 ' + (d >= 0 ? '+' : '\\u2212') + Math.abs(d).toFixed(1) + 's' : '');
    bar.style.width = (now / TOTAL * 100) + '%';
  }

  function show(n) {
    i = Math.max(0, Math.min(slides.length - 1, n));
    for (var k = 0; k < slides.length; k++) slides[k].classList.toggle('on', k === i);
    setBand(FULLS[i]);
    paint();
  }

  /* Passages differ a lot in length; the band keeps its height and scales
     the type instead, so the slide above never shifts between scenes. */
  function setBand(txt) {
    bandt.style.opacity = 0;
    setTimeout(function () {
      bandt.innerHTML = txt.split(HON).join('<span class="hon">' + HON + '</span>');
      var cs = getComputedStyle(band);
      var room = band.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      var lo = 0.5, hi = 1.0, best = lo;
      for (var k = 0; k < 11; k++) {
        var mid = (lo + hi) / 2;
        band.style.setProperty('--bandfit', mid.toFixed(4));
        void bandt.offsetHeight;
        if (bandt.scrollHeight <= room) { best = mid; lo = mid; } else { hi = mid; }
      }
      band.style.setProperty('--bandfit', best.toFixed(4));
      bandt.style.opacity = 1;
    }, 180);
  }
  function next() { show(i + 1); }
  function prev() { show(i - 1); }

  /* Scale each slide to the room it actually has: one size chosen for the
     longest slide strands the short ones in an empty frame. */
  /* Scaling type reflows it, so the right factor cannot be computed in one
     step: bisect for the largest size whose content still fits the box. */
  function fitBox(el, inner, lo, hi) {
    var cs = getComputedStyle(el);
    var room = el.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    if (room <= 0) return;
    var best = lo;
    for (var k = 0; k < 11; k++) {
      var mid = (lo + hi) / 2;
      el.style.setProperty('--fit', mid.toFixed(4));
      void inner.offsetHeight;
      var fits = inner.scrollHeight <= room && inner.scrollWidth <= inner.clientWidth + 1;
      if (fits) { best = mid; lo = mid; } else { hi = mid; }
    }
    el.style.setProperty('--fit', best.toFixed(4));
  }

  function fit() {
    for (var k = 0; k < slides.length; k++) {
      fitBox(slides[k], slides[k].querySelector('.pad'), 0.55, 1.45);
    }
  }
  function refit() { fit(); requestAnimationFrame(fit); }
  addEventListener('resize', refit);
  addEventListener('orientationchange', refit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refit);

  function sceneAt(t) {
    for (var k = TIMES.length - 1; k >= 0; k--) if (t >= TIMES[k][0]) return k;
    return 0;
  }
  (function loop() {
    if (!a.paused) {
      if (auto) { var k = sceneAt(a.currentTime); if (k !== i) show(k); }
      paint();
    }
    requestAnimationFrame(loop);
  })();

  $('stage').addEventListener('click', next);
  panel.addEventListener('click', function (e) { e.stopPropagation(); });

  $('prev').addEventListener('click', prev);
  function toggle() { if (a.paused) { a.play(); } else { a.pause(); } }
  $('play').addEventListener('click', toggle);
  function sync() { $('play').textContent = a.paused ? 'Play' : 'Pause'; }
  a.addEventListener('play', sync); a.addEventListener('pause', sync); a.addEventListener('ended', sync);

  $('auto').addEventListener('click', function () {
    auto = !auto;
    $('auto').classList.toggle('on', auto);
    $('auto').setAttribute('aria-pressed', String(auto));
  });
  $('reel').addEventListener('click', function () {
    var on = document.body.classList.toggle('reel');
    $('reel').classList.toggle('on', on);
    $('reel').setAttribute('aria-pressed', String(on));
    refit();
  });
  $('text').addEventListener('click', function () {
    var off = document.body.classList.toggle('no-band');
    $('text').classList.toggle('on', !off);
    $('text').setAttribute('aria-pressed', String(!off));
    refit();
  });
  $('cue').addEventListener('click', function () {
    var on = document.body.classList.toggle('cue');
    $('cue').classList.toggle('on', on);
    $('cue').setAttribute('aria-pressed', String(on));
  });

  function setHidden(on) {
    panel.classList.toggle('gone', on);
    document.body.classList.toggle('hidden-panel', on);
  }
  $('hide').addEventListener('click', function () { setHidden(true); });
  $('recall').addEventListener('click', function (e) { e.stopPropagation(); setHidden(false); });

  addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.code === 'Space' || e.key === 'PageDown') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); prev(); }
    if (e.key === 'p' || e.key === 'P') toggle();
    if (e.key === 'a' || e.key === 'A') $('auto').click();
    if (e.key === 'c' || e.key === 'C') $('cue').click();
    if (e.key === 't' || e.key === 'T') $('text').click();
    if (e.key === 'r' || e.key === 'R') $('reel').click();
    if (e.key === 'h' || e.key === 'H') setHidden(!panel.classList.contains('gone'));
  });

  var x0 = null;
  addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  addEventListener('touchend', function (e) {
    if (x0 !== null && e.changedTouches[0].clientX - x0 > 60) prev();
    x0 = null;
  }, { passive: true });

  document.body.classList.add('reel');
  refit(); show(0); sync();
})();
</script>
</body>
</html>`;

writeFileSync(join(outDir, 'index.html'), doc);
console.log(`${join(outDir, 'index.html')}  ${(doc.length / 1024).toFixed(0)} KB  ` +
            `${SCENES.length} scenes  ${TOTAL}s`);
