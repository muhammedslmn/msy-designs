/* ── Cartoon art library ───────────────────────────────────────────────
   Flat, thick-stroke vector illustrations. Hard rule for this project:
   NO faces and no gendered figures — people appear only as blank-headed,
   neutral silhouettes, and most scenes lean on objects instead.
   Every drawing is a 400x400 viewBox so scenes can swap them freely.    */

const S = (body, extra = '') =>
  `<svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg"
        stroke="var(--line)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" ${extra}>
     ${body}
   </svg>`;

/* A neutral, faceless body used by several scenes. */
const torso = (x, y, fill = 'var(--fill-b)', s = 1) => `
  <g transform="translate(${x},${y}) scale(${s})">
    <circle cx="0" cy="-52" r="30" fill="var(--paper)"/>
    <path d="M-40 60 V16 a40 40 0 0 1 80 0 V60 Z" fill="${fill}"/>
  </g>`;

export const ART = {
  /* Thinking it over — blank head, question marks, no features. */
  question: S(`
    <path d="M60 340 H340" />
    ${torso(200, 262, 'var(--fill-b)', 1.5)}
    <path d="M96 118 q0-40 34-40 t34 38 q0 26-30 34 v18" stroke-width="12"/>
    <circle cx="134" cy="240" r="7" fill="var(--line)" stroke="none"/>
    <path d="M282 92 q0-30 26-30 t26 28 q0 20-23 26 v14" stroke-width="12"/>
    <circle cx="311" cy="182" r="6" fill="var(--line)" stroke="none"/>`),

  /* Growth: bar chart with a rising arrow. */
  chartUp: S(`
    <path d="M62 336 H346 M62 336 V70"/>
    <rect x="96"  y="238" width="58" height="98"  rx="10" fill="var(--fill-a)"/>
    <rect x="176" y="184" width="58" height="152" rx="10" fill="var(--fill-b)"/>
    <rect x="256" y="112" width="58" height="224" rx="10" fill="var(--fill-c)"/>
    <path d="M104 208 L192 152 L268 84" stroke="var(--line-accent)" stroke-width="13"/>
    <path d="M232 76 H278 V122" stroke="var(--line-accent)" stroke-width="13"/>`),

  /* Decline: same frame, arrow falling. */
  chartDown: S(`
    <path d="M62 336 H346 M62 336 V70"/>
    <rect x="96"  y="112" width="58" height="224" rx="10" fill="var(--fill-c)"/>
    <rect x="176" y="196" width="58" height="140" rx="10" fill="var(--fill-a)"/>
    <rect x="256" y="258" width="58" height="78"  rx="10" fill="var(--line-accent)"/>
    <path d="M104 108 L192 186 L272 264" stroke="var(--line-accent)" stroke-width="13"/>
    <path d="M278 218 V272 H226" stroke="var(--line-accent)" stroke-width="13"/>`),

  /* Money / cost. */
  money: S(`
    <rect x="52" y="150" width="296" height="168" rx="22" fill="var(--fill-c)"/>
    <rect x="86" y="188" width="228" height="92" rx="12" fill="var(--paper)" stroke-width="8"/>
    <path d="M200 196 v76 M180 214 q20-14 40 0 t-40 26 q20 14 40 0" stroke-width="9"/>
    <path d="M92 122 h216 M120 90 h160" stroke-width="12"/>`),

  /* Time pressure. */
  clock: S(`
    <circle cx="200" cy="214" r="128" fill="var(--fill-a)"/>
    <circle cx="200" cy="214" r="128" fill="none"/>
    <path d="M200 214 V132 M200 214 l62 40" stroke-width="13"/>
    <path d="M200 62 v22 M142 74 l14 22 M258 74 l-14 22" stroke-width="11"/>
    <circle cx="200" cy="214" r="12" fill="var(--line)" stroke="none"/>`),

  /* Warning / risk. */
  warning: S(`
    <path d="M200 74 L352 328 H48 Z" fill="var(--fill-a)"/>
    <path d="M200 168 v76" stroke-width="16"/>
    <circle cx="200" cy="284" r="11" fill="var(--line)" stroke="none"/>`),

  /* Checked document / rules. */
  document: S(`
    <path d="M92 52 h150 l66 66 v230 a12 12 0 0 1-12 12 H92 a12 12 0 0 1-12-12 V64 a12 12 0 0 1 12-12Z" fill="var(--fill-a)"/>
    <path d="M242 52 v66 h66"/>
    <path d="M124 190 h150 M124 240 h150 M124 290 h96" stroke-width="11"/>
    <circle cx="292" cy="292" r="58" fill="var(--fill-c)"/>
    <path d="M266 292 l18 20 l38 -44" stroke="var(--fill-a)" stroke-width="14"/>`),

  /* Phone / social. */
  phone: S(`
    <rect x="118" y="40" width="164" height="320" rx="30" fill="var(--ink)"/>
    <rect x="138" y="76" width="124" height="228" rx="12" fill="var(--paper)"/>
    <rect x="156" y="98" width="88" height="62" rx="8" fill="var(--fill-b)" stroke-width="7"/>
    <path d="M156 192 h88 M156 226 h64" stroke-width="9"/>
    <circle cx="200" cy="332" r="13" fill="var(--paper)" stroke-width="7"/>`),

  /* Balance / fairness. */
  scale: S(`
    <path d="M200 66 V330 M132 330 h136"/>
    <path d="M84 128 H316" stroke-width="12"/>
    <path d="M84 128 L46 214 h76 Z" fill="var(--fill-b)"/>
    <path d="M316 128 L278 214 h76 Z" fill="var(--fill-c)"/>
    <circle cx="200" cy="112" r="15" fill="var(--fill-a)"/>`),

  /* Process / mechanics. */
  gears: S(`
    <circle cx="158" cy="176" r="76" fill="var(--fill-b)"/>
    <circle cx="158" cy="176" r="30" fill="var(--paper)"/>
    <path d="M158 78 v-22 M158 296 v-22 M60 176 h-22 M278 176 h22 M89 107 l-16-16 M227 245 l16 16 M227 107 l16-16 M89 245 l-16 16" stroke-width="14"/>
    <circle cx="286" cy="286" r="50" fill="var(--fill-c)"/>
    <circle cx="286" cy="286" r="19" fill="var(--paper)"/>
    <path d="M286 220 v-14 M286 366 v-14 M220 286 h-14 M366 286 h-14" stroke-width="12"/>`),

  /* A crowd, all faceless and identical — "people" without any portrait. */
  crowd: S(`
    <path d="M40 330 H360"/>
    ${torso(112, 268, 'var(--fill-c)', 1.15)}
    ${torso(288, 268, 'var(--fill-a)', 1.15)}
    ${torso(200, 254, 'var(--fill-b)', 1.45)}`),

  /* Goal reached. */
  flag: S(`
    <path d="M60 336 H340"/>
    <path d="M150 336 V78" stroke-width="13"/>
    <path d="M150 88 h150 l-34 48 l34 48 h-150 Z" fill="var(--line-accent)"/>
    ${torso(268, 288, 'var(--fill-c)', 1.0)}`),

  /* Search / research. */
  search: S(`
    <circle cx="176" cy="170" r="106" fill="var(--paper)"/>
    <circle cx="176" cy="170" r="106" fill="none" stroke-width="14"/>
    <path d="M252 246 L338 332" stroke-width="20"/>
    <path d="M132 150 h88 M132 194 h60" stroke-width="10"/>`),

  /* Idea / key insight. */
  bulb: S(`
    <path d="M200 62 a96 96 0 0 1 60 171 v29 h-120 v-29 a96 96 0 0 1 60 -171Z" fill="var(--fill-a)"/>
    <path d="M148 292 h104 M162 326 h76" stroke-width="12"/>
    <path d="M200 128 v104" stroke-width="9"/>
    <path d="M52 108 l34 18 M348 108 l-34 18 M200 20 v26" stroke-width="11"/>`),
};

export const ART_KEYS = Object.keys(ART);
