/* Checks every slide at several phone sizes for layout faults.

   Reports four kinds of fault, each measured rather than eyeballed:
     overflow  - content taller than the box it sits in
     collide   - two elements on the same slide overlapping vertically
     clipped   - an element whose text is cut off by its own box
     outside   - content crossing into a zone Instagram will cover

     node bin/audit.mjs [file://... or path]
*/
import { chromium } from 'playwright';
import { resolve } from 'node:path';

const target = process.argv[2] || resolve('site/app/index.html');
const url = target.startsWith('http') ? target : `file://${target}`;

const VIEWPORTS = [
  { name: 'iPhone SE', width: 375, height: 667 },
  { name: 'iPhone 13', width: 390, height: 844 },
  { name: 'iPhone 15 Pro Max', width: 430, height: 932 },
];

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let total = 0;

for (const vp of VIEWPORTS) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  const errs = [];
  page.on('pageerror', (e) => errs.push(String(e.message)));
  await page.goto(url, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1200);

  const n = await page.evaluate(() => document.querySelectorAll('.slide').length);
  const faults = [];

  for (let i = 0; i < n; i++) {
    // Audit whatever the app is actually showing, then advance the way a
    // viewer does, so the band and the fit run their real code path.
    const idx = await page.evaluate(() =>
      [...document.querySelectorAll('.slide')].findIndex((s) => s.classList.contains('on')));
    if (idx !== i) faults.push({ slide: i + 1, found: [{ kind: 'desync', what: 'index', detail: `showing ${idx + 1}` }] });
    const found = await page.evaluate((k) => {
      const slides = [...document.querySelectorAll('.slide')];
      const s = slides[k];
      const pad = s.querySelector('.pad');
      const out = [];
      const cs = getComputedStyle(s);
      const room = s.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);

      // The band carries the verbatim text and must not clip it either.
      const band = document.getElementById('band'), bt = document.getElementById('bandt');
      if (band && bt && !document.body.classList.contains('no-band')) {
        const bcs = getComputedStyle(band);
        const broom = band.clientHeight - parseFloat(bcs.paddingTop) - parseFloat(bcs.paddingBottom);
        if (bt.scrollHeight > broom + 2) {
          out.push({ kind: 'bandclip', what: 'band',
                     detail: `${Math.round(bt.scrollHeight)} > ${Math.round(broom)}` });
        }
      }

      if (pad.scrollHeight > room + 1) {
        out.push({ kind: 'overflow', what: 'pad',
                   detail: `${Math.round(pad.scrollHeight)}px of ${Math.round(room)}px` });
      }
      if (pad.scrollWidth > pad.clientWidth + 1) {
        out.push({ kind: 'wide', what: 'pad',
                   detail: `${Math.round(pad.scrollWidth)}px of ${Math.round(pad.clientWidth)}px` });
      }
      // A phrase meant to sit on one line must not have wrapped.
      for (const el of s.querySelectorAll('.ar--xl,.ar--lg')) {
        const lh = parseFloat(getComputedStyle(el).lineHeight);
        if (el.clientHeight > lh * 1.4) {
          out.push({ kind: 'wrapped', what: el.className,
                     detail: `${Math.round(el.clientHeight)}px vs one line ${Math.round(lh)}px` });
        }
      }

      // Direct children of .pad are stacked by grid; any vertical overlap is a bug.
      const kids = [...pad.children].map((el) => ({ el, r: el.getBoundingClientRect() }))
        .filter((k) => k.r.height > 0);
      for (let a = 0; a < kids.length - 1; a++) {
        for (let b = a + 1; b < kids.length; b++) {
          const A = kids[a].r, B = kids[b].r;
          const overlapY = Math.min(A.bottom, B.bottom) - Math.max(A.top, B.top);
          const overlapX = Math.min(A.right, B.right) - Math.max(A.left, B.left);
          if (overlapY > 1.5 && overlapX > 1.5) {
            out.push({ kind: 'collide',
                       what: `${kids[a].el.className || kids[a].el.tagName} / ${kids[b].el.className || kids[b].el.tagName}`,
                       detail: `${overlapY.toFixed(1)}px` });
          }
        }
      }

      // Text cut off by its own box.
      for (const el of s.querySelectorAll('h1,h2,p,li,dt,dd,.chips span')) {
        if (el.scrollHeight > el.clientHeight + 2 && el.clientHeight > 0) {
          out.push({ kind: 'clipped', what: el.className || el.tagName,
                     detail: `${Math.round(el.scrollHeight)} > ${Math.round(el.clientHeight)}` });
        }
      }

      // Anything that has to be read must stay out of Instagram's furniture.
      if (document.body.classList.contains('reel')) {
        const topZ = innerHeight * 0.08, botZ = innerHeight * 0.81, rightZ = innerWidth * 0.85;
        for (const el of s.querySelectorAll('h1,h2,p,li,dt,dd,.chips span,.art')) {
          const r = el.getBoundingClientRect();
          if (r.height <= 0) continue;
          if (r.top < topZ - 1 || r.bottom > botZ + 1 || r.right > rightZ + 1) {
            out.push({ kind: 'outside', what: el.className || el.tagName,
                       detail: `top ${Math.round(r.top)} bottom ${Math.round(r.bottom)} right ${Math.round(r.right)}` });
          }
        }
      }
      return out;
    }, Math.max(idx, 0));

    if (found.length) faults.push({ slide: i + 1, found });
    await page.evaluate(() => document.getElementById('stage').click());
    await page.waitForTimeout(280);
  }

  const bandFaults = [];

  const count = faults.reduce((a, f) => a + f.found.length, 0) + bandFaults.length + errs.length;
  total += count;
  console.log(`\n=== ${vp.name} ${vp.width}x${vp.height} — ${count} fault${count === 1 ? '' : 's'} ===`);
  if (errs.length) console.log('  JS errors:', errs);
  for (const f of faults) {
    for (const x of f.found) {
      console.log(`  slide ${String(f.slide).padStart(2)}  ${x.kind.padEnd(9)} ${x.what}  (${x.detail})`);
    }
  }
  for (const b of bandFaults) console.log(`  ${b}`);
  await page.close();
}

await browser.close();
console.log(`\n${total} fault${total === 1 ? '' : 's'} total`);
process.exit(total ? 1 : 0);
