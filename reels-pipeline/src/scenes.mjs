/* ── Scene templates ───────────────────────────────────────────────────
   A scene spec (plain JSON) becomes one 1080x1920 HTML page. The renderer
   screenshots it frame by frame while seeking the page's animations, so
   every entrance below is deterministic.                                */

import { readFileSync } from 'node:fs';
import { ART } from './art.mjs';
import { clean } from './lint-text.mjs';

const read = (f) => readFileSync(new URL(f, import.meta.url), 'utf8');
const FONTS = read('./fonts.css');
const BASE = read('./styles/base.css');
const ANIM = read('./styles/anim.css');
const SKINS = { quiet: read('./styles/quiet.css'), bold: read('./styles/bold.css') };

const esc = (s = '') => clean(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* Inline markup in copy: *emphasis* and _accent_. */
const rich = (s = '') => esc(s)
  .replace(/\*([^*]+)\*/g, '<span class="hl">$1</span>')
  .replace(/_([^_]+)_/g, '<span class="out">$1</span>')
  .replace(/~([^~]+)~/g, '<span class="ar">$1</span>');

/* Headlines animate per word, so each word needs its own box. Emphasis is
   resolved here rather than by rich(): splitting finished HTML on
   whitespace would tear the markup spans apart. */
const headlineWords = (raw = '') => {
  const text = clean(raw);
  const segs = [];                       // [{ text, style }]
  let buf = '', style = null;
  for (const ch of text) {
    if (ch === '*' || ch === '_') {
      const want = ch === '*' ? 'hl' : 'out';
      if (buf) segs.push({ text: buf, style });
      buf = '';
      style = style === want ? null : want;
    } else buf += ch;
  }
  if (buf) segs.push({ text: buf, style });

  const out = [];
  let i = 0;
  for (const seg of segs) {
    for (const tok of seg.text.split(/(\s+)/)) {
      if (!tok) continue;
      if (/^\s+$/.test(tok)) { out.push(' '); continue; }
      const word = esc(tok);
      const inner = seg.style ? `<span class="${seg.style}">${word}</span>` : word;
      out.push(`<span class="w" style="--i:${i++}">${inner}</span>`);
    }
  }
  return out.join('');
};

const grainURL = () => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="420">
    <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/></filter>
    <rect width="420" height="420" filter="url(#n)"/></svg>`;
  return `url("data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}")`;
};

const art = (key) => ART[key] || ART.bulb;
const kicker = (s, accent) =>
  s ? `<div class="kicker${accent ? ' kicker--accent' : ''} a-fade">${esc(s)}</div>` : '';
const idx = (i) => `style="--i:${i}"`;

const LAYOUTS = {
  title: (s) => `
    <div class="scene scene--center stack">
      ${kicker(s.kicker, true)}
      <h1 class="headline">${headlineWords(s.headline)}</h1>
      ${s.sub ? `<p class="sub a-rise" style="--i:4">${rich(s.sub)}</p>` : ''}
      ${s.art ? `<div class="art" style="max-height:500px">${art(s.art)}</div>` : ''}
    </div>`,

  art: (s) => `
    <div class="scene stack">
      ${kicker(s.kicker)}
      ${s.headline ? `<h2 class="headline">${headlineWords(s.headline)}</h2>` : ''}
      <div class="art">${art(s.art)}</div>
      ${s.sub ? `<p class="sub a-rise" style="--i:6;max-width:100%">${rich(s.sub)}</p>` : ''}
    </div>`,

  stat: (s) => `
    <div class="scene scene--center">
      <div class="stat">
        ${kicker(s.kicker, true)}
        <div class="big" style="margin-top:${s.kicker ? '56px' : '0'}">${esc(s.value)}</div>
        <div class="cap">${rich(s.cap || '')}</div>
      </div>
    </div>`,

  table: (s) => `
    <div class="scene scene--center">
      ${s.title ? `<div class="tbl-title">${headlineWords(s.title)}</div>` : ''}
      <div class="card">
        <table class="tbl">
          ${s.head ? `<thead><tr>${s.head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead>` : ''}
          <tbody>${s.rows.map((r, i) => `<tr ${idx(i)}>${r.map((c) => {
            // "12.500|num" / "dusuk|bad" pick alignment and colour.
            const [txt, cls] = String(c).split('|');
            return `<td class="${cls || ''}">${rich(txt)}</td>`;
          }).join('')}</tr>`).join('')}</tbody>
        </table>
      </div>
      ${s.note ? `<p class="sub a-fade" style="--i:8;font-size:28px;margin-top:38px">${rich(s.note)}</p>` : ''}
    </div>`,

  steps: (s) => `
    <div class="scene scene--center stack">
      ${kicker(s.kicker)}
      ${s.headline ? `<h2 class="headline">${headlineWords(s.headline)}</h2>` : ''}
      <ol class="steps">
        ${s.items.map((it, i) => {
          const done = String(it).startsWith('+');
          return `<li class="${done ? 'on' : ''}" ${idx(i)}><span class="n">${i + 1}</span>
                  <span>${rich(String(it).replace(/^\+/, ''))}</span></li>`;
        }).join('')}
      </ol>
    </div>`,

  vs: (s) => `
    <div class="scene scene--center scene--wide stack">
      ${s.headline ? `<h2 class="headline">${headlineWords(s.headline)}</h2>` : ''}
      <div class="vs">
        ${[['bad', s.left], ['good', s.right]].map(([cls, col], ci) => `
          <div class="col ${cls}" ${idx(ci)}><h3>${esc(col.title)}</h3>
            <ul>${col.items.map((i2, li) => `<li ${idx(li + ci * 2)}>${rich(i2)}</li>`).join('')}</ul>
          </div>`).join('')}
      </div>
    </div>`,

  /* The word itself: Arabic above, transliteration below. */
  word: (s) => `
    <div class="scene scene--center stack">
      ${kicker(s.kicker)}
      <div style="text-align:center;width:100%">
        <span class="word-ar a-lift">${esc(s.ar)}</span>
        <div class="word-latin a-rise" style="--i:2">${esc(s.latin)}</div>
      </div>
      ${s.sub ? `<p class="sub a-rise" style="--i:4;max-width:100%;text-align:center">${rich(s.sub)}</p>` : ''}
    </div>`,

  quote: (s) => `
    <div class="scene scene--center">
      <span class="quote-mark a-fade">"</span>
      <h2 class="headline" style="font-size:${s.size || 78}px">${headlineWords(s.text)}</h2>
      ${s.by ? `<p class="sub a-rise" style="--i:6;margin-top:44px;color:var(--ember)">${esc(s.by)}</p>` : ''}
    </div>`,
};

/* Runs in the page: measures every stroke so it can ink itself in, and
   numbers siblings for the stagger. */
const BOOTSTRAP = `
  document.querySelectorAll('.art svg').forEach((svg) => {
    [...svg.querySelectorAll('path,circle,rect,line,polyline,polygon,ellipse')].forEach((el, i) => {
      const stroke = getComputedStyle(el).stroke;
      if (stroke && stroke !== 'none' && typeof el.getTotalLength === 'function') {
        const len = el.getTotalLength();
        if (len > 0) { el.style.setProperty('--len', len.toFixed(1)); el.dataset.len = '1'; }
      }
      const fill = getComputedStyle(el).fill;
      if (fill && fill !== 'none' && !/rgba\\(0, 0, 0, 0\\)/.test(fill)) el.dataset.fill = '1';
      el.style.setProperty('--i', i);
    });
  });
`;

export function sceneHTML(spec, skin = 'quiet') {
  const layout = LAYOUTS[spec.type];
  if (!layout) throw new Error(`unknown scene type: ${spec.type}`);
  const skinCSS = SKINS[skin] || SKINS.quiet;
  const override = spec.bg === 'invert'
    ? (skin === 'quiet'
        ? ':root{--paper:#EFEBE4;--paper-2:#E4DFD6;--ink:#0A0A0C;--ink-soft:#575249;--ink-mute:#8A8479;--line:#0A0A0C;--hair:rgba(10,10,12,.16);--hair-2:rgba(10,10,12,.34);--grain-blend:multiply;--grain-opacity:.05;--vignette:radial-gradient(120% 84% at 50% 46%, transparent 58%, rgba(10,10,12,.14) 100%)}'
        : ':root{--paper:#14110E;--paper-2:#1F1A15;--ink:#F5EFE3;--ink-soft:#B9AE9C;--line:#F5EFE3}')
    : '';
  return `<!doctype html><html lang="tr"><head><meta charset="utf-8">
    <style>${FONTS}</style>
    <style>${skinCSS}</style>
    <style>${BASE}</style>
    <style>${ANIM}</style>
    <style>:root{--grain-url:${grainURL()}}${override}</style>
  </head><body>
    ${layout(spec)}
    <div class="vignette"></div><div class="grain"></div>
    <script>${BOOTSTRAP}</script>
  </body></html>`;
}

export const LAYOUT_KEYS = Object.keys(LAYOUTS);
export const SKIN_KEYS = Object.keys(SKINS);
