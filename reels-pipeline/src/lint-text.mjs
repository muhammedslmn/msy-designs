/* ── Copy guard ────────────────────────────────────────────────────────
   On-screen text stays inside plain Latin plus the letters the languages
   in play actually own: Turkish's g/s/i/o/u/c forms and German's umlauts
   and eszett. What gets rejected is borrowed accents (a-acute, e-acute,
   circumflexes, ligatures) and decorative punctuation (em dash, ellipsis,
   curly quotes).

   Arabic script is allowed through deliberately: a video about an Arabic
   word shows that word, and the Amiri face carries it.                   */

const ALLOWED = new Set([
  ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  ...'abcdefghijklmnopqrstuvwxyz',
  ...'0123456789',
  ...'ğĞşŞıİöÖüÜçÇ',        // Turkish
  ...'äÄßẞ',                 // German (o/u umlauts already above)
  ...' \n\t.,:;!?\'"()[]%/+-=&*_#@₺$€',
]);

/* Safe stand-ins for the characters people paste most often. */
export const REPLACEMENTS = {
  '—': '-', '–': '-', '−': '-', '…': '...',
  '“': '"', '”': '"', '„': '"', '‘': "'", '’': "'", '´': "'", '`': "'",
  '·': '-', '•': '-', '×': 'x', ' ': ' ',
  'â': 'a', 'Â': 'A', 'î': 'i', 'Î': 'I', 'û': 'u', 'Û': 'U',
  '\uFDFA': '', '\uFDFB': '',   // honorific ligatures: spell them out instead
  'á': 'a', 'à': 'a', 'é': 'e', 'è': 'e', 'ê': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
  'Á': 'A', 'À': 'A', 'É': 'E', 'È': 'E', 'Ê': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U',
  'æ': 'ae', 'Æ': 'AE', 'œ': 'oe', 'Œ': 'OE', 'ß': 'ss', 'ñ': 'n', 'Ñ': 'N',
  'ë': 'e', 'ï': 'i',
};



/* Markup characters the templates consume before anything reaches screen. */
const MARKUP = new Set(['*', '|', '~']);

/* Arabic (U+0600-U+06FF) and its supplement pass through untouched. */
const ARABIC = /[\u0600-\u06FF\u0750-\u077F\uFE70-\uFEFF]/;

export function clean(text = '') {
  // A character the guard allows is never rewritten, whatever the table
  // says. Without this, adding eszett to the allowed set still left the
  // ss substitution in place and German copy came out misspelled.
  return String(text).replace(/./gsu, (ch) =>
    (ALLOWED.has(ch) || MARKUP.has(ch) || ARABIC.test(ch)) ? ch : (REPLACEMENTS[ch] ?? ch));
}

export function offenders(text = '') {
  const bad = new Map();
  for (const ch of String(text)) {
    if (ALLOWED.has(ch) || MARKUP.has(ch) || ARABIC.test(ch)) continue;
    bad.set(ch, (bad.get(ch) || 0) + 1);
  }
  return bad;
}

/* Walks every string in a scene / transcript tree. */
export function lintTree(node, path = '$', found = new Map()) {
  if (typeof node === 'string') {
    for (const [ch, n] of offenders(node)) {
      const hit = found.get(ch) || { count: 0, where: [] };
      hit.count += n;
      if (hit.where.length < 3) hit.where.push(`${path}: "${node.slice(0, 60)}"`);
      found.set(ch, hit);
    }
  } else if (Array.isArray(node)) {
    node.forEach((v, i) => lintTree(v, `${path}[${i}]`, found));
  } else if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) lintTree(v, `${path}.${k}`, found);
  }
  return found;
}

export function report(found) {
  if (!found.size) return null;
  const lines = [...found].map(([ch, hit]) => {
    const fix = REPLACEMENTS[ch] ? ` -> use "${REPLACEMENTS[ch]}"` : '';
    return `  ${JSON.stringify(ch)} (U+${ch.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')})` +
           ` x${hit.count}${fix}\n      ${hit.where.join('\n      ')}`;
  });
  return `Disallowed characters in on-screen copy:\n${lines.join('\n')}`;
}
