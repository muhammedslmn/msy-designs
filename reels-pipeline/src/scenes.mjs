/* ── Scene templates ───────────────────────────────────────────────────
   A scene spec (plain JSON) becomes one 1080x1920 HTML page, which the
   renderer screenshots into a still frame. Motion is added later by
   ffmpeg, so these stay static by design.                              */

import { readFileSync } from 'node:fs';
import { ART } from './art.mjs';

const read = (f) => readFileSync(new URL(f, import.meta.url), 'utf8');
const FONTS = read('./fonts.css');
const THEME = read('./theme.css');

const esc = (s = '') => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* Inline markup allowed in copy: *highlighted* and _accent-coloured_. */
const rich = (s = '') => esc(s)
  .replace(/\*([^*]+)\*/g, '<span class="hl">$1</span>')
  .replace(/_([^_]+)_/g, '<span class="out">$1</span>');

const grainURL = () => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="420">
    <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/></filter>
    <rect width="420" height="420" filter="url(#n)"/></svg>`;
  return `url("data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}")`;
};

const art = (key) => ART[key] || ART.bulb;

/* ── individual layouts ──────────────────────────────────────────── */

const kicker = (s, accent) =>
  s ? `<div class="kicker${accent ? ' kicker--accent' : ''}">${esc(s)}</div>` : '';

const LAYOUTS = {
  title: (s) => `
    <div class="scene scene--center stack">
      ${kicker(s.kicker, true)}
      <h1 class="headline">${rich(s.headline)}</h1>
      ${s.sub ? `<p class="sub">${rich(s.sub)}</p>` : ''}
      ${s.art ? `<div class="art" style="max-height:520px">${art(s.art)}</div>` : ''}
    </div>`,

  art: (s) => `
    <div class="scene stack">
      ${kicker(s.kicker)}
      ${s.headline ? `<h2 class="headline">${rich(s.headline)}</h2>` : ''}
      <div class="art">${art(s.art)}</div>
      ${s.sub ? `<p class="sub" style="max-width:100%">${rich(s.sub)}</p>` : ''}
    </div>`,

  stat: (s) => `
    <div class="scene scene--center">
      <div class="stat">
        ${kicker(s.kicker, true)}
        <div class="big" style="margin-top:${s.kicker ? '60px' : '0'}">${esc(s.value)}</div>
        <div class="cap">${rich(s.cap || '')}</div>
      </div>
    </div>`,

  table: (s) => `
    <div class="scene scene--center">
      ${s.title ? `<div class="tbl-title">${rich(s.title)}</div>` : ''}
      <div class="card">
        <table class="tbl">
          ${s.head ? `<thead><tr>${s.head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead>` : ''}
          <tbody>${s.rows.map((r) => `<tr>${r.map((c) => {
            // "12.500|num" / "iyi|good" pick a cell style.
            const [txt, cls] = String(c).split('|');
            return `<td class="${cls || ''}">${rich(txt)}</td>`;
          }).join('')}</tr>`).join('')}</tbody>
        </table>
      </div>
      ${s.note ? `<p class="sub" style="font-size:32px;margin-top:34px">${rich(s.note)}</p>` : ''}
    </div>`,

  steps: (s) => `
    <div class="scene scene--center stack">
      ${kicker(s.kicker)}
      ${s.headline ? `<h2 class="headline">${rich(s.headline)}</h2>` : ''}
      <ol class="steps">
        ${s.items.map((it, i) => {
          const done = String(it).startsWith('+');
          return `<li class="${done ? 'on' : ''}"><span class="n">${i + 1}</span>
                  <span>${rich(String(it).replace(/^\+/, ''))}</span></li>`;
        }).join('')}
      </ol>
    </div>`,

  vs: (s) => `
    <div class="scene scene--center scene--wide stack">
      ${s.headline ? `<h2 class="headline">${rich(s.headline)}</h2>` : ''}
      <div class="vs">
        <div class="col bad"><h3>${esc(s.left.title)}</h3>
          <ul>${s.left.items.map((i) => `<li>${rich(i)}</li>`).join('')}</ul></div>
        <div class="col good"><h3>${esc(s.right.title)}</h3>
          <ul>${s.right.items.map((i) => `<li>${rich(i)}</li>`).join('')}</ul></div>
      </div>
    </div>`,

  quote: (s) => `
    <div class="scene scene--center">
      <h2 class="headline" style="font-size:96px">"${rich(s.text)}"</h2>
      ${s.by ? `<p class="sub" style="margin-top:48px">— ${esc(s.by)}</p>` : ''}
    </div>`,
};

export function sceneHTML(spec) {
  const layout = LAYOUTS[spec.type];
  if (!layout) throw new Error(`unknown scene type: ${spec.type}`);
  const bg = spec.bg === 'dark'
    ? ':root{--paper:#14110E;--paper-2:#1F1A15;--ink:#F5EFE3;--ink-soft:#B9AE9C;--line:#F5EFE3}'
    : spec.bg === 'accent'
      ? ':root{--paper:#FFE8D2;--paper-2:#FFD9B5}'
      : '';
  return `<!doctype html><html lang="tr"><head><meta charset="utf-8">
    <style>${FONTS}</style>
    <style>${THEME}</style>
    <style>:root{--grain-url:${grainURL()}}${bg}</style>
  </head><body>
    ${layout(spec)}
    <div class="vignette"></div><div class="grain"></div>
  </body></html>`;
}

export const LAYOUT_KEYS = Object.keys(LAYOUTS);
