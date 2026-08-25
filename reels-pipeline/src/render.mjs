/* Renders every scene of a project JSON into a still PNG frame. */
import { chromium } from 'playwright';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { sceneHTML } from './scenes.mjs';

const CHROME = process.env.CHROME_PATH || '/opt/pw-browsers/chromium';
const W = 1080, H = 1920;

const projectPath = resolve(process.argv[2] || 'content/demo.json');
const outDir = resolve(process.argv[3] || 'build/frames');
const project = JSON.parse(readFileSync(projectPath, 'utf8'));

mkdirSync(outDir, { recursive: true });

/* Shrink a scene's type until it fits the canvas — long Turkish lines
   overflow far more often than the English drafts they came from. */
async function fitToCanvas(page) {
  for (let pass = 0; pass < 14; pass++) {
    const over = await page.evaluate(() => {
      const el = document.querySelector('.scene');
      const room = el.clientHeight - parseFloat(getComputedStyle(el).paddingTop)
                                   - parseFloat(getComputedStyle(el).paddingBottom);
      return { over: el.scrollHeight > el.clientHeight + 2 || el.scrollWidth > el.clientWidth + 2, room };
    });
    if (!over.over) return pass;
    await page.evaluate(() => {
      const scale = (sel, f) => document.querySelectorAll(sel).forEach((n) => {
        const cur = parseFloat(getComputedStyle(n).fontSize);
        n.style.fontSize = `${cur * f}px`;
      });
      scale('.headline', 0.93); scale('.sub', 0.94);
      scale('table.tbl', 0.94); scale('ol.steps li', 0.94);
      scale('.stat .big', 0.93); scale('.vs .col', 0.94);
    });
  }
  return -1;
}

const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });

const manifest = [];
for (const [i, spec] of project.scenes.entries()) {
  const id = String(i + 1).padStart(3, '0');
  const file = join(outDir, `scene-${id}.png`);
  await page.setContent(sceneHTML(spec), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const shrunk = await fitToCanvas(page);
  await page.screenshot({ path: file, type: 'png' });
  manifest.push({ index: i, file, start: spec.start, end: spec.end, type: spec.type, motion: spec.motion });
  console.log(`  scene-${id}  ${spec.type.padEnd(6)} ${spec.start ?? '?'}→${spec.end ?? '?'}s` +
              (shrunk > 0 ? `  (autofit ${shrunk}x)` : shrunk < 0 ? '  (OVERFLOW!)' : ''));
}
await browser.close();

writeFileSync(join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(`\n${manifest.length} frames → ${outDir}`);
