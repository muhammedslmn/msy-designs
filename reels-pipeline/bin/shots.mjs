/* Renders every slide to build/slides/ by tapping through the real deck.

     node bin/shots.mjs [width] [height]
*/
import { chromium } from 'playwright';
import { mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const W = Number(process.argv[2] || 430);
const H = Number(process.argv[3] || 932);
const out = resolve('build/slides');
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
await p.goto(`file://${resolve('site/app/index.html')}`, { waitUntil: 'load' });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(1400);
// the controls are hidden for the take, so review the frame as it will film
await p.evaluate(() => document.getElementById('hide').click());
await p.waitForTimeout(300);

const n = await p.evaluate(() => document.querySelectorAll('.slide').length);
for (let i = 0; i < n; i++) {
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `${out}/s-${String(i + 1).padStart(2, '0')}.png` });
  await p.evaluate(() => document.getElementById('stage').click());
}
await b.close();
console.log(`${n} slides -> ${out} (${W}x${H})`);
