import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';

const map = JSON.parse(readFileSync(process.env.BUILD ? process.env.BUILD + '/' : 'build/audio-map.json', 'utf8'));
const wave = readFileSync(process.env.BUILD ? process.env.BUILD + '/' : 'build/wave.png').toString('base64');
const fonts = readFileSync('src/fonts.css', 'utf8');
const D = map.duration;
const mmss = (t) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;

const blocks = map.paragraphs.map((p, i) => `
  <div class="blk" style="left:${(p.start / D) * 100}%;width:${Math.max((p.dur / D) * 100, 0.25)}%">
    <span class="no">${i + 1}</span>
  </div>`).join('');

const rows = map.paragraphs.map((p, i) => `
  <tr><td class="n">${i + 1}</td><td class="t">${mmss(p.start)} - ${mmss(p.end)}</td>
      <td class="d">${p.dur.toFixed(1)} sn</td><td class="c">${p.phrases} cumle</td></tr>`).join('');

const html = `<!doctype html><meta charset="utf-8"><style>${fonts}
*{box-sizing:border-box;margin:0;padding:0}
body{width:1600px;background:#0A0A0C;color:#EFEBE4;font-family:Inter,sans-serif;padding:64px 72px}
h1{font-family:'Instrument Serif',serif;font-size:64px;font-weight:400;letter-spacing:-.02em}
.meta{color:#8C877E;font-size:24px;margin-top:14px;letter-spacing:.01em}
.wrap{margin:52px 0 26px;position:relative;height:230px;border-bottom:1px solid rgba(239,235,228,.22)}
.wrap img{width:100%;height:220px;object-fit:fill;opacity:.55}
.track{position:relative;height:56px;margin-top:18px}
.blk{position:absolute;top:0;height:44px;background:#DE5F35;border-radius:5px;opacity:.9}
.blk .no{position:absolute;top:52px;left:0;font-size:16px;color:#8C877E}
table{width:100%;border-collapse:collapse;margin-top:74px;font-size:23px}
th{text-align:left;font-size:16px;letter-spacing:.24em;text-transform:uppercase;color:#57534D;
   padding-bottom:16px;border-bottom:1px solid rgba(239,235,228,.28);font-weight:500}
td{padding:15px 0;border-bottom:1px solid rgba(239,235,228,.1)}
td.n{color:#DE5F35;width:70px;font-family:'Instrument Serif',serif;font-size:28px}
td.t{width:230px}td.d{width:160px;color:#8C877E}td.c{color:#8C877E}
.cols{column-count:2;column-gap:70px}
.note{margin-top:44px;color:#8C877E;font-size:22px;line-height:1.6}
</style>
<h1>Ses kaydinin yapisi</h1>
<div class="meta">${mmss(D)} toplam &nbsp;·&nbsp; ${map.phrases.length} cumle &nbsp;·&nbsp; ${map.paragraphs.length} dusunce blogu &nbsp;·&nbsp; konusma orani %${Math.round(map.phrases.reduce((a, p) => a + p.dur, 0) / D * 100)}</div>
<div class="wrap"><img src="data:image/png;base64,${wave}"></div>
<div class="track">${blocks}</div>
<div class="cols"><table><thead><tr><th>#</th><th>Zaman</th><th>Sure</th><th>Icerik</th></tr></thead><tbody>${rows}</tbody></table></div>
<p class="note">Kirmizi bloklar, senin duraksadigin yerlere gore ayrilmis dusunce bloklari. Sahne kesmeleri bu siniralara oturacak - yani kesme kendi nefesinde olacak, rastgele bir sayacta degil.</p>`;

const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: 1600, height: 900 } });
await p.setContent(html, { waitUntil: 'load' });
await p.evaluate(() => document.fonts.ready);
await p.screenshot({ path: 'build/audio-map.png', fullPage: true });
await b.close();
console.log('build/audio-map.png');
