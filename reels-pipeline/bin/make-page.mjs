/* Builds the scroll page: content + timings in, one self-contained HTML out.

   Section heights are proportional to how long that passage runs in the
   recording, so a steady scroll tracks the audio, and the auto-scroll can
   map audio time straight onto scroll position.

     node bin/make-page.mjs [out.html]
*/
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const PX_PER_SEC = 44;
const MIN_H = 360;

const audio = readFileSync(new URL('../build/voice.mp3', import.meta.url)).toString('base64');

/* Fonts are embedded rather than linked. The page is built to be screen
   recorded, so the typography has to be identical every time it opens -
   a link that is slow, blocked or cached-cold would silently record in a
   fallback face. */
const FACES = [
  ['newsreader/300Light/Newsreader_300Light.ttf',        'Newsreader', 300, 'normal'],
  ['newsreader/300Light_Italic/Newsreader_300Light_Italic.ttf', 'Newsreader', 300, 'italic'],
  ['newsreader/400Regular/Newsreader_400Regular.ttf',    'Newsreader', 400, 'normal'],
  ['newsreader/400Regular_Italic/Newsreader_400Regular_Italic.ttf', 'Newsreader', 400, 'italic'],
  ['karla/300Light/Karla_300Light.ttf',                  'Karla', 300, 'normal'],
  ['karla/400Regular/Karla_400Regular.ttf',              'Karla', 400, 'normal'],
  ['karla/500Medium/Karla_500Medium.ttf',                'Karla', 500, 'normal'],
  ['karla/600SemiBold/Karla_600SemiBold.ttf',            'Karla', 600, 'normal'],
  ['amiri/400Regular/Amiri_400Regular.ttf',              'Amiri', 400, 'normal'],
];
const fontCSS = FACES.map(([f, family, weight, style]) => {
  const b64 = readFileSync(new URL(`../node_modules/@expo-google-fonts/${f}`, import.meta.url)).toString('base64');
  return `@font-face{font-family:'${family}';font-style:${style};font-weight:${weight};`
       + `font-display:block;src:url(data:font/ttf;base64,${b64}) format('truetype')}`;
}).join('\n');

/* Every section carries the timecode it belongs to in the recording. */
const S = [
  { t: 0, d: 17.26, kind: 'hero' },
  { t: 17.26, d: 17.60, kind: 'text', eyebrow: 'Einordnung',
    h: 'Der Begriff im Zentrum',
    p: ['Nachdem wir uns in den vergangenen Videos mit dem Tauhid und der Bedeutung des Glaubensbekenntnisses <em>La ilaha illa Allah</em> beschäftigt haben, wollen wir nun einen Begriff näher betrachten, der im Zentrum dieser gewaltigen Aussage steht.'] },

  { t: 34.86, d: 17.49, kind: 'word', eyebrow: 'Das Wort',
    ar: 'الإله', translit: 'al-Ilah',
    p: ['Was bedeutet dieses Wort eigentlich - sprachlich und in der islamischen Fachsprache?'] },

  { t: 52.35, d: 17.16, kind: 'text', eyebrow: 'Wortwurzel',
    h: 'Hamza, Lam, Ha',
    ar_inline: 'أ ل ه',
    p: ['Der große Sprachgelehrte <strong>Ibn Faris</strong> erklärt, dass die aus diesen drei Buchstaben bestehende Wortwurzel eine grundlegende Bedeutung trägt: <em>at-Ta\'abbud</em>, das Dienen und Anbeten.'] },

  { t: 69.51, d: 17.26, kind: 'quote',
    q: 'Ilah wird so bezeichnet, weil er der <em>Ma\'bud</em> ist - derjenige, dem Anbetung dargebracht wird.',
    cite: 'Ibn Faris' },

  { t: 86.77, d: 16.23, kind: 'table', eyebrow: 'Die Wörterbücher',
    h: 'Was die Sprachgelehrten sagen',
    cols: ['Gelehrter', 'Erklärung'],
    rows: [
      ['Ibn Faris', 'Die Wurzel a-l-h trägt die Bedeutung at-Ta\'abbud'],
      ['al-Jawhari', 'Ilah trägt die Bedeutung Ma\'luh'],
      ['Ibn Manzur', 'al-Ma\'luh, also al-Ma\'bud'],
    ],
    note: 'al-Ma\'bud: derjenige, der angebetet wird und vor dem man sich unterwirft.' },

  { t: 103.0, d: 15.83, kind: 'text', eyebrow: 'Sprachlich',
    h: 'Wem sich das Herz zuwendet',
    p: ['Zusammengefasst bedeutet Ilah sprachlich: das Wesen, dem sich das Herz mit höchster Liebe, Ehrfurcht, Zufluchtssuche und Furcht zuwendet - und das es anbetet.'] },

  { t: 118.83, d: 17.40, kind: 'list', eyebrow: 'Vier Bewegungen',
    h: 'Was das Herz tut',
    items: ['Liebe in höchster Form', 'Ehrfurcht und Verherrlichung', 'Zufluchtssuche in der Not', 'Furcht und Hoffnung'] },

  { t: 136.23, d: 13.90, kind: 'text', eyebrow: 'Fachsprache',
    h: 'Ilah ist Allah azza wa-jall',
    p: ['In der islamischen Fachsprache bezeichnet Ilah den Einzigen, dem Anbetung und uneingeschränkter Gehorsam zustehen.'] },

  { t: 150.13, d: 13.23, kind: 'quote',
    q: 'Allah ist der Einzige, der gegenüber der gesamten Schöpfung das Recht auf <em>Uluhiyyah</em> und <em>Ubudiyyah</em> besitzt.',
    cite: 'Abdullah ibn Abbas, überliefert bei Ibn Jarir at-Tabari' },

  { t: 163.36, d: 15.83, kind: 'table', eyebrow: 'Zwei Rechte',
    h: 'Uluhiyyah und Ubudiyyah',
    cols: ['Begriff', 'Bedeutung'],
    rows: [
      ['Uluhiyyah', 'Das Recht, Ilah zu sein'],
      ['Ubudiyyah', 'Das Recht, angebetet zu werden'],
    ],
    note: 'Beide stehen allein Allah zu, gegenüber der gesamten Schöpfung.' },

  { t: 179.19, d: 21.73, kind: 'quote',
    q: 'Allah ist einzig und hat keinen Teilhaber. Nichts ist Ihm gleich, nichts kann Ihn unfähig machen, und es gibt keinen <em>anbetungswürdigen Gott</em> außer Ihm.',
    cite: 'Imam Abu Ja\'far at-Tahawi' },

  { t: 200.92, d: 13.24, kind: 'table', eyebrow: 'Die Imame der Aqidah',
    h: 'Der Ilah ist der Ma\'bud',
    cols: ['Gelehrter', 'Der Ilah ist'],
    rows: [
      ['Ibn Abi l-Izz al-Hanafi', 'der Ma\'luh und Ma\'bud, dem sich die Herzen zuwenden'],
      ['al-Izz ibn Abd as-Salam', 'derjenige, dem allein uneingeschränkter Gehorsam gebührt'],
      ['Ibn al-Qayyim', 'der Ma\'bud, dem die Herzen sich in Liebe zuwenden'],
    ] },

  { t: 214.16, d: 13.84, kind: 'quote',
    q: 'Die Herzen lieben Ihn, unterwerfen sich vor Ihm, fürchten Ihn, hoffen auf Ihn, suchen in der Not ausschließlich bei Ihm Zuflucht und <em>vertrauen</em> auf Ihn.',
    cite: 'Scheich al-Islam Ibn Taymiyya' },

  { t: 228.0, d: 14.80, kind: 'quote',
    q: 'Wer einem Geschöpf etwas davon zukommen lässt, beeinträchtigt damit die <em>Aufrichtigkeit</em> des Glaubensbekenntnisses des Tauhid.',
    cite: 'Hafidh Ibn Rajab al-Hanbali' },

  { t: 242.8, d: 15.71, kind: 'table', eyebrow: 'Im Quran',
    h: 'Nicht am Erschaffen allein',
    cols: ['Stelle', 'Aussage'],
    rows: [
      ['al-An\'am 102', 'Es gibt keinen anbetungswürdigen Gott außer Ihm. Er ist der Schöpfer aller Dinge.'],
      ['al-Furqan 43', 'Hast du denjenigen gesehen, der seine eigene Neigung zu seinem Ilah genommen hat?'],
    ],
    note: 'Ilah hängt unmittelbar mit Anbetung, Gehorsam und der Bindung des Herzens zusammen.' },

  { t: 258.51, d: 23.30, kind: 'list', eyebrow: 'Adiyy ibn Hatim',
    h: 'Nur vor Statuen niederwerfen? Nein.',
    ordered: true,
    items: [
      'Adiyy ibn Hatim war Christ, bevor er den Islam annahm.',
      'Er hörte den Vers: sie nahmen ihre Rabbiner und Mönche anstelle Allahs zu Herren.',
      'Er sagte: wir haben sie doch nicht angebetet, wir haben nicht zu ihnen gebetet.',
    ] },

  { t: 281.81, d: 10.43, kind: 'quote',
    q: 'Erklären sie nicht das für verboten, was Allah erlaubt hat, woraufhin auch ihr es für verboten erklärt? Genau das ist eure Anbetung ihnen gegenüber - und damit habt ihr sie zu <em>Ilah und Rabb</em> genommen.',
    cite: 'Der Gesandte Allahs, Friede und Segen seien auf ihm' },

  { t: 292.24, d: 16.25, kind: 'compare',
    eyebrow: 'Zusammengefasst', h: 'Nicht nur - sondern',
    left: { title: 'Ilah ist nicht', items: ['lediglich eine erschaffende Macht', 'nur eine Statue aus Stein', 'eine Frage der Niederwerfung allein'] },
    right: { title: 'Ilah ist', items: ['der Ma\'bud, der geliebt und gefürchtet wird', 'derjenige, bei dem man Zuflucht sucht', 'derjenige, dessen Gesetz man sich unterwirft'] } },

  { t: 308.49, d: 11.57, kind: 'list', eyebrow: 'La ilaha illa Allah', ordered: true,
    h: 'Was es bedeutet',
    items: [
      'Alle falschen Gottheiten und Autoritäten aus dem Herzen und dem Leben herausreißen.',
      'Jeden zurückweisen, der für sich selbst das Recht der Gesetzgebung beansprucht.',
      'Die Ibadah und den uneingeschränkten Gehorsam ausschließlich Allah widmen.',
    ] },

  { t: 320.06, d: 8.48, kind: 'closing',
    ar: 'لا إله إلا الله',
    p: ['Es gibt keinen anbetungswürdigen Gott außer Allah.'] },
];

const TOTAL = S[S.length - 1].t + S[S.length - 1].d;
const mmss = (t) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;
const h = (n) => Math.max(MIN_H, Math.round(n * PX_PER_SEC));

const eyebrow = (s) => s.eyebrow ? `<p class="eyebrow">${s.eyebrow}</p>` : '';
const para = (s) => (s.p || []).map((x) => `<p class="lead">${x}</p>`).join('');

const BODY = {
  hero: () => `
    <p class="eyebrow">Tauhid</p>
    <h1>Was bedeutet <em>Ilah</em>?</h1>
    <p class="lead">Ein Begriff im Zentrum des Glaubensbekenntnisses - sprachlich, und in der islamischen Fachsprache.</p>
    <button class="start" id="start" type="button">
      <span class="start-ico" aria-hidden="true"></span><span id="start-label">Vortrag abspielen</span>
    </button>`,

  text: (s) => `${eyebrow(s)}<h2>${s.h}</h2>
    ${s.ar_inline ? `<p class="ar-inline">${s.ar_inline}</p>` : ''}${para(s)}`,

  word: (s) => `${eyebrow(s)}
    <p class="ar-hero">${s.ar}</p>
    <p class="translit">${s.translit}</p>${para(s)}`,

  quote: (s) => `<blockquote><p>${s.q}</p><cite>${s.cite}</cite></blockquote>`,

  table: (s) => `${eyebrow(s)}<h2>${s.h}</h2>
    <div class="tw"><table>
      <thead><tr>${s.cols.map((c) => `<th>${c}</th>`).join('')}</tr></thead>
      <tbody>${s.rows.map((r) => `<tr>${r.map((c, i) =>
        `<td${i === 0 ? ' class="key"' : ''}>${c}</td>`).join('')}</tr>`).join('')}</tbody>
    </table></div>
    ${s.note ? `<p class="note">${s.note}</p>` : ''}`,

  list: (s) => `${eyebrow(s)}<h2>${s.h}</h2>
    <${s.ordered ? 'ol' : 'ul'} class="items">
      ${s.items.map((i) => `<li>${i}</li>`).join('')}
    </${s.ordered ? 'ol' : 'ul'}>`,

  compare: (s) => `${eyebrow(s)}<h2>${s.h}</h2>
    <div class="cmp">
      ${[s.left, s.right].map((col, i) => `
        <div class="col${i ? ' is-affirm' : ''}">
          <p class="col-h">${col.title}</p>
          <ul>${col.items.map((x) => `<li>${x}</li>`).join('')}</ul>
        </div>`).join('')}
    </div>`,

  closing: (s) => `<p class="ar-hero is-shahadah">${s.ar}</p>${para(s)}`,
};

const sections = S.map((s, i) => `
  <section class="sec sec--${s.kind}" style="min-height:${h(s.d)}px" data-t="${s.t}" data-d="${s.d}" data-i="${i}">
    <span class="tick" aria-hidden="true">${mmss(s.t)}</span>
    <div class="inner reveal">${BODY[s.kind](s)}</div>
  </section>`).join('');

const html = `<title>Was bedeutet Ilah?</title>
<style>${fontCSS}</style>
<style>
/* -- Manuscript at night -----------------------------------------------
   One committed palette rather than two themes: the page exists to be
   screen-recorded, and a viewer's OS theme must not change what the
   recording looks like. Every colour is painted explicitly.            */
:root{
  --ground:#10141F;
  --ground-2:#161B29;
  --ink:#E8E3D6;
  --ink-2:#B4B2AC;
  --ink-3:#7E8298;
  --gold:#C8A24A;
  --indigo:#8296C4;
  --rule:rgba(232,227,214,.13);
  --rule-2:rgba(232,227,214,.26);

  --measure:34rem;
  --pad:clamp(1.5rem,6vw,3rem);
  --step:clamp(1.02rem,.94rem + .5vw,1.2rem);
}
*,*::before,*::after{box-sizing:border-box}
html{scroll-behavior:auto;-webkit-text-size-adjust:100%}
body{
  margin:0; background:var(--ground); color:var(--ink);
  font-family:Karla,"Segoe UI",system-ui,sans-serif;
  font-size:var(--step); line-height:1.68; font-weight:350;
  -webkit-font-smoothing:antialiased;
  overflow-x:hidden;
}
/* A faint warm bloom high on the page, like lamplight on a folio. */
body::before{
  content:""; position:fixed; inset:0; pointer-events:none; z-index:0;
  background:
    radial-gradient(80% 44% at 50% 0%, rgba(200,162,74,.10), transparent 62%),
    radial-gradient(64% 40% at 50% 100%, rgba(130,150,196,.07), transparent 66%);
}

em{font-style:italic}
strong{font-weight:600; color:var(--ink)}

.wrap{position:relative; z-index:1; padding:0 var(--pad)}

.sec{
  position:relative;
  display:flex; align-items:center;
  padding-block:clamp(3rem,9vh,6rem);
  border-top:1px solid transparent;
}
.sec + .sec{border-top-color:var(--rule)}
.inner{width:100%; max-width:var(--measure); margin-inline:auto}

/* Timecodes are real information here - they say where in the recording
   each passage falls - so they are available, but off by default so they
   stay out of the screen capture. */
.tick{
  position:absolute; left:0; top:clamp(2rem,7vh,4.4rem);
  font-size:.66rem; letter-spacing:.22em; color:var(--ink-3);
  font-variant-numeric:tabular-nums; opacity:0; transition:opacity .3s;
}
body.guide .tick{opacity:.75}

/* -- Type ------------------------------------------------------------- */
.eyebrow{
  margin:0 0 1.15rem; font-size:.7rem; font-weight:600;
  letter-spacing:.3em; text-transform:uppercase; color:var(--gold);
  display:flex; align-items:center; gap:.85rem;
}
.eyebrow::after{content:""; flex:1; height:1px; background:linear-gradient(90deg,var(--rule-2),transparent)}

h1,h2{
  font-family:Newsreader,Georgia,serif; font-weight:400;
  letter-spacing:-.015em; line-height:1.06; text-wrap:balance;
  margin:0 0 1.15rem; color:var(--ink);
}
h1{font-size:clamp(2.9rem,10.5vw,4.6rem); line-height:1.0}
h1 em{color:var(--gold); font-style:italic}
h2{font-size:clamp(1.85rem,6.4vw,2.7rem)}

.lead{margin:0 0 1.1rem; color:var(--ink-2); max-width:32rem}
.lead:last-child{margin-bottom:0}
.note{margin:1.5rem 0 0; font-size:.86rem; line-height:1.6; color:var(--ink-3); max-width:30rem}

.ar-hero{
  font-family:Amiri,serif; direction:rtl; text-align:center;
  margin:.4rem 0 .5rem;
  font-size:clamp(4rem,19vw,7.2rem); line-height:1.45; color:var(--ink);
}
.ar-hero.is-shahadah{font-size:clamp(2.7rem,12.5vw,5rem); color:var(--gold)}
.ar-inline{
  font-family:Amiri,serif; direction:rtl; margin:0 0 1.1rem;
  font-size:clamp(2rem,8vw,2.8rem); line-height:1.6; color:var(--gold);
}
.translit{
  margin:0 0 1.4rem; text-align:center; font-size:1.05rem; letter-spacing:.16em;
  text-transform:uppercase; color:var(--gold); font-weight:500;
}
.sec--word .lead,.sec--closing .lead{text-align:center; margin-inline:auto}

/* -- Quote ------------------------------------------------------------ */
blockquote{margin:0; padding-left:1.5rem; border-left:2px solid var(--gold)}
blockquote p{
  font-family:Newsreader,Georgia,serif; font-weight:300;
  font-size:clamp(1.4rem,5.3vw,2rem); line-height:1.36; letter-spacing:-.01em;
  margin:0 0 1.35rem; color:var(--ink); text-wrap:pretty;
}
blockquote em{color:var(--gold)}
cite{
  font-style:normal; font-size:.76rem; font-weight:600; letter-spacing:.16em;
  text-transform:uppercase; color:var(--ink-3); line-height:1.55; display:block;
}

/* -- Table ------------------------------------------------------------ */
.tw{overflow-x:auto; margin-top:.4rem}
table{width:100%; border-collapse:collapse; font-size:.95rem}
th{
  text-align:left; font-size:.66rem; font-weight:600; letter-spacing:.2em;
  text-transform:uppercase; color:var(--ink-3); padding:0 .9rem .7rem 0;
  border-bottom:1px solid var(--rule-2); white-space:nowrap;
}
th:last-child,td:last-child{padding-right:0}
td{padding:.95rem .9rem .95rem 0; border-bottom:1px solid var(--rule);
   color:var(--ink-2); vertical-align:top; line-height:1.5}
td.key{color:var(--ink); font-weight:500; width:36%; padding-right:1.4rem}
tr:last-child td{border-bottom:none}

/* -- Lists ------------------------------------------------------------ */
.items{margin:0; padding:0; list-style:none; display:flex; flex-direction:column; gap:1rem}
.items li{
  position:relative; padding-left:2.1rem; color:var(--ink-2);
  padding-bottom:1rem; border-bottom:1px solid var(--rule);
}
.items li:last-child{border-bottom:none; padding-bottom:0}
.items li::before{
  position:absolute; left:0; top:.06em;
  font-family:Newsreader,Georgia,serif; font-size:1.12em; color:var(--gold);
}
ul.items li::before{content:"\\2014"; font-size:.9em; opacity:.7}
ol.items{counter-reset:n}
ol.items li{counter-increment:n}
ol.items li::before{content:counter(n)}

/* -- Compare ---------------------------------------------------------- */
.cmp{display:grid; gap:1.6rem}
@media (min-width:34rem){.cmp{grid-template-columns:1fr 1fr; gap:2rem}}
.col{padding-top:1rem; border-top:1px solid var(--rule-2)}
.col.is-affirm{border-top-color:var(--gold)}
.col-h{
  margin:0 0 1rem; font-size:.68rem; font-weight:600; letter-spacing:.2em;
  text-transform:uppercase; color:var(--ink-3);
}
.col.is-affirm .col-h{color:var(--gold)}
.col ul{margin:0; padding:0; list-style:none; display:flex; flex-direction:column; gap:.85rem}
.col li{font-size:.95rem; line-height:1.5; color:var(--ink-3)}
.col.is-affirm li{color:var(--ink-2)}

/* -- Reveal ----------------------------------------------------------- */
.reveal{opacity:0; transform:translateY(26px); transition:opacity .95s cubic-bezier(.2,.7,.3,1), transform .95s cubic-bezier(.2,.7,.3,1)}
.reveal.in{opacity:1; transform:none}
@media (prefers-reduced-motion:reduce){
  .reveal{opacity:1; transform:none; transition:none}
}

/* -- Start control, inside the hero so it scrolls away ---------------- */
.start{
  margin-top:2.4rem; display:inline-flex; align-items:center; gap:.85rem;
  background:transparent; color:var(--ink); cursor:pointer;
  border:1px solid var(--rule-2); border-radius:999px;
  padding:.8rem 1.5rem .8rem 1.15rem;
  font:inherit; font-size:.82rem; font-weight:500; letter-spacing:.1em;
  text-transform:uppercase; transition:border-color .3s, color .3s;
}
.start:hover,.start:focus-visible{border-color:var(--gold); color:var(--gold)}
.start-ico{
  width:.62rem; height:.72rem; background:currentColor; flex:none;
  clip-path:polygon(0 0,100% 50%,0 100%);
}
.start.is-playing .start-ico{clip-path:none; width:.6rem; height:.72rem;
  background:linear-gradient(90deg,currentColor 0 36%,transparent 36% 64%,currentColor 64% 100%)}

/* -- Floating panel --------------------------------------------------- */
.panel{
  position:fixed; right:var(--pad); bottom:calc(var(--pad) * .9); z-index:9;
  display:flex; align-items:center; gap:.5rem;
  padding:.45rem; border-radius:999px;
  background:rgba(16,20,31,.86); border:1px solid var(--rule);
  backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px);
  transition:opacity .5s; opacity:1;
}
.panel.gone{opacity:0; pointer-events:none}
.recall{
  position:fixed; right:0; bottom:0; z-index:8; width:3.4rem; height:3.4rem;
  border:0; background:transparent; cursor:pointer; opacity:0; transition:opacity .4s;
}
.recall::after{
  content:""; position:absolute; right:1.5rem; bottom:1.5rem;
  width:5px; height:5px; border-radius:50%; background:var(--ink-3);
}
body.hidden-panel .recall{opacity:.45}
.btn{
  appearance:none; border:0; background:transparent; color:var(--ink-2);
  font:inherit; font-size:.66rem; font-weight:600; letter-spacing:.12em;
  text-transform:uppercase; cursor:pointer; border-radius:999px;
  padding:.5rem .8rem; transition:background .25s, color .25s;
}
.btn:hover,.btn:focus-visible{color:var(--ink); background:rgba(232,227,214,.08)}
.btn.on{color:var(--ground); background:var(--gold)}
:focus-visible{outline:2px solid var(--gold); outline-offset:3px}

/* Progress hairline, part of the guide layer. */
.bar{position:fixed; left:0; top:0; height:2px; width:0; z-index:10;
     background:var(--gold); opacity:0; transition:opacity .3s}
body.guide .bar{opacity:.9}
</style>

<div class="bar" id="bar"></div>
<main class="wrap">${sections}</main>

<div class="panel" id="panel">
  <button class="btn" id="play" type="button" aria-label="Abspielen">Play</button>
  <button class="btn" id="auto" type="button" aria-pressed="false">Auto</button>
  <button class="btn" id="guide" type="button" aria-pressed="false">Zeit</button>
  <button class="btn" id="hide" type="button" aria-label="Bedienung ausblenden">Aus</button>
</div>
<button class="recall" id="recall" type="button" aria-label="Bedienung einblenden"></button>

<audio id="a" preload="auto" src="data:audio/mpeg;base64,${audio}"></audio>

<script>
(() => {
  const a = document.getElementById('a');
  const secs = [...document.querySelectorAll('.sec')];
  const panel = document.getElementById('panel');
  const playBtn = document.getElementById('play');
  const autoBtn = document.getElementById('auto');
  const guideBtn = document.getElementById('guide');
  const startBtn = document.getElementById('start');
  const startLabel = document.getElementById('start-label');
  const bar = document.getElementById('bar');
  const TOTAL = ${TOTAL.toFixed(2)};
  let auto = false;

  /* Reveal ---------------------------------------------------------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -18% 0px', threshold: 0.01 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  /* Audio time -> scroll position, piecewise across the sections.
     Section heights are proportional to their passages, so this stays
     continuous across every boundary. */
  const scrollFor = (t) => {
    const lead = innerHeight * 0.22;
    for (let i = 0; i < secs.length; i++) {
      const s = secs[i];
      const t0 = +s.dataset.t, d = +s.dataset.d;
      if (t < t0 + d || i === secs.length - 1) {
        const p = Math.min(Math.max((t - t0) / d, 0), 1);
        return s.offsetTop + p * s.offsetHeight - lead;
      }
    }
    return 0;
  };

  const tick = () => {
    if (!a.paused) {
      bar.style.width = (a.currentTime / TOTAL * 100) + '%';
      if (auto) scrollTo(0, scrollFor(a.currentTime));
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  /* Controls -------------------------------------------------------- */
  const sync = () => {
    const playing = !a.paused;
    playBtn.textContent = playing ? 'Pause' : 'Play';
    playBtn.setAttribute('aria-label', playing ? 'Pausieren' : 'Abspielen');
    if (startBtn) {
      startBtn.classList.toggle('is-playing', playing);
      startLabel.textContent = playing ? 'Vortrag pausieren' : 'Vortrag abspielen';
    }
  };
  const toggle = () => { a.paused ? a.play() : a.pause(); };
  playBtn.addEventListener('click', toggle);
  if (startBtn) startBtn.addEventListener('click', toggle);
  a.addEventListener('play', sync);
  a.addEventListener('pause', sync);
  a.addEventListener('ended', sync);

  autoBtn.addEventListener('click', () => {
    auto = !auto;
    autoBtn.classList.toggle('on', auto);
    autoBtn.setAttribute('aria-pressed', String(auto));
  });
  guideBtn.addEventListener('click', () => {
    const on = document.body.classList.toggle('guide');
    guideBtn.classList.toggle('on', on);
    guideBtn.setAttribute('aria-pressed', String(on));
  });

  /* The panel must stay out of the screen capture. An idle timer cannot do
     that here - the page is being scrolled the whole time, and every scroll
     counts as activity - so hiding is explicit, with a corner tap to bring
     it back. */
  const setHidden = (on) => {
    panel.classList.toggle('gone', on);
    document.body.classList.toggle('hidden-panel', on);
  };
  document.getElementById('hide').addEventListener('click', () => setHidden(true));
  document.getElementById('recall').addEventListener('click', () => setHidden(false));

  addEventListener('keydown', (e) => {
    if (e.target.matches('button')) return;
    if (e.code === 'Space') { e.preventDefault(); toggle(); }
    if (e.key === 'h' || e.key === 'H') setHidden(!panel.classList.contains('gone'));
    if (e.key === 'a' || e.key === 'A') autoBtn.click();
  });

  sync();
})();
</script>`;

/* The published page is wrapped in a head this file does not control, so a
   charset declaration of its own would land too late to be honoured. Every
   non-ASCII character therefore ships as a numeric reference, which is
   decoded in markup regardless of how the document is labelled.

   Entities are NOT decoded inside <script> or <style>, so those blocks must
   already be pure ASCII - assert it rather than corrupt them silently. */
const guardBlocks = (doc) => {
  for (const m of doc.matchAll(/<(script|style)\b[^>]*>([\s\S]*?)<\/\1>/g)) {
    const bad = [...m[2]].find((c) => c.codePointAt(0) > 127);
    if (bad) throw new Error(`non-ASCII ${JSON.stringify(bad)} inside <${m[1]}>; ` +
                             'escape it as a CSS/JS escape sequence instead');
  }
};
const toEntities = (doc) => doc.replace(/[\u0080-\uFFFF]/g,
  (c) => `&#x${c.codePointAt(0).toString(16).toUpperCase()};`);

guardBlocks(html);
const doc = toEntities(html);

const out = resolve(process.argv[2] || 'site/ilah.html');
writeFileSync(out, doc);
console.log(`${out}  ${(doc.length / 1024 / 1024).toFixed(2)} MB  ${S.length} sections  ${TOTAL.toFixed(1)}s`);
