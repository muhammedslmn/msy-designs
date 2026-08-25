/* Renders every scene into a frame sequence.

   Each scene produces an entrance burst (one PNG per frame, captured by
   pausing the page's animations and seeking them) plus a settled still
   that ffmpeg holds and drifts for the rest of the scene.

     node src/render.mjs <project.json> <outDir> [skin]
*/
import { chromium } from 'playwright';
import { mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { sceneHTML } from './scenes.mjs';
import { lintTree, report } from './lint-text.mjs';

const CHROME = process.env.CHROME_PATH || '/opt/pw-browsers/chromium';
const W = 1080, H = 1920;
const FPS = Number(process.env.FPS || 30);
const INTRO = Number(process.env.INTRO || 1.7);      // seconds of entrance motion
const SETTLED = 9000;                                 // ms — well past every delay

const projectPath = resolve(process.argv[2] || 'build/project.json');
const outDir = resolve(process.argv[3] || 'build/frames');
const skin = process.argv[4] || process.env.SKIN || 'quiet';
const project = JSON.parse(readFileSync(projectPath, 'utf8'));

const bad = report(lintTree(project.scenes));
if (bad) {
  console.error(bad);
  if (!process.env.LINT_SOFT) process.exit(1);
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

/* Long Turkish lines overflow layouts drafted at shorter lengths. */
async function fitToCanvas(page) {
  for (let pass = 0; pass < 16; pass++) {
    const over = await page.evaluate(() => {
      const el = document.querySelector('.scene');
      return el.scrollHeight > el.clientHeight + 2 || el.scrollWidth > el.clientWidth + 2;
    });
    if (!over) return pass;
    await page.evaluate(() => {
      const scale = (sel, f) => document.querySelectorAll(sel).forEach((n) => {
        n.style.fontSize = `${parseFloat(getComputedStyle(n).fontSize) * f}px`;
      });
      scale('.headline', 0.93); scale('.sub', 0.94); scale('.tbl-title', 0.93);
      scale('table.tbl thead th', 0.95); scale('table.tbl tbody td', 0.94);
      scale('ol.steps li', 0.94); scale('.stat .big', 0.93);
      scale('.stat .cap', 0.95); scale('.vs .col h3', 0.95); scale('.vs .col li', 0.94);
    });
  }
  return -1;
}

const seek = (page, ms) => page.evaluate((t) => {
  document.getAnimations().forEach((a) => { a.pause(); a.currentTime = t; });
  return document.timeline.currentTime;
}, ms);

const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });

const introFrames = Math.round(INTRO * FPS);
const manifest = [];

for (const [i, spec] of project.scenes.entries()) {
  const id = String(i + 1).padStart(3, '0');
  const dir = join(outDir, `scene-${id}`);
  mkdirSync(dir, { recursive: true });

  await page.setContent(sceneHTML(spec, skin), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await seek(page, SETTLED);                 // measure the settled layout
  const shrunk = await fitToCanvas(page);

  for (let f = 0; f < introFrames; f++) {
    await seek(page, (f / FPS) * 1000);
    await page.screenshot({ path: join(dir, `f-${String(f).padStart(4, '0')}.png`), type: 'png' });
  }
  await seek(page, SETTLED);
  const still = join(outDir, `still-${id}.png`);
  await page.screenshot({ path: still, type: 'png' });

  manifest.push({ index: i, dir, still, introFrames, fps: FPS,
                  start: spec.start, end: spec.end, type: spec.type, motion: spec.motion });
  console.log(`  scene-${id}  ${spec.type.padEnd(6)} ${Number(spec.start ?? 0).toFixed(1)}-${Number(spec.end ?? 0).toFixed(1)}s` +
              `  ${introFrames}f` + (shrunk > 0 ? `  autofit ${shrunk}x` : shrunk < 0 ? '  OVERFLOW!' : ''));
}
await browser.close();

writeFileSync(join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(`\n${manifest.length} scenes rendered (skin: ${skin}) -> ${outDir}`);
