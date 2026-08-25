// Embeds full-charset TTFs as data URIs so scene HTML renders identically
// offline. Full files rather than Google's latin/latin-ext woff2 subsets:
// the subsets carry no unicode-range, so loading two of them under one
// family makes the second silently shadow the first and Turkish copy falls
// back to a system face.
import { readFileSync, writeFileSync } from 'node:fs';

const FACES = [
  { file: 'BebasNeue_400Regular.ttf',  family: 'Bebas Neue', weight: 400 },
  { file: 'Manrope_500Medium.ttf',     family: 'Manrope',    weight: 500 },
  { file: 'Manrope_600SemiBold.ttf',   family: 'Manrope',    weight: 600 },
  { file: 'Manrope_700Bold.ttf',       family: 'Manrope',    weight: 700 },
  { file: 'Manrope_800ExtraBold.ttf',  family: 'Manrope',    weight: 800 },
];

const css = FACES.map(({ file, family, weight }) => {
  const b64 = readFileSync(new URL(`../assets/fonts/${file}`, import.meta.url)).toString('base64');
  return `@font-face{font-family:'${family}';font-style:normal;font-weight:${weight};font-display:block;` +
         `src:url(data:font/ttf;base64,${b64}) format('truetype')}`;
}).join('\n');

writeFileSync(new URL('./fonts.css', import.meta.url), css);
console.log(`fonts.css written (${(css.length / 1024).toFixed(0)} KB, ${FACES.length} faces)`);
