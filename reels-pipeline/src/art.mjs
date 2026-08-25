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


/* ── Set for the Ilah video ───────────────────────────────────────────
   No figures at all here, not even faceless ones: the subject is a word
   and what the heart does with it, so the drawings stay to objects,
   directions and structure.                                            */

Object.assign(ART, {
  /* A word root branching into what grows from it. */
  root: S(`
    <path d="M200 356 V206" stroke-width="12"/>
    <path d="M200 232 C200 176 150 168 122 132" />
    <path d="M200 214 C200 152 200 132 200 84" />
    <path d="M200 232 C200 176 250 168 278 132" />
    <circle cx="122" cy="118" r="26" fill="var(--fill-b)"/>
    <circle cx="200" cy="70"  r="26" fill="var(--fill-b)"/>
    <circle cx="278" cy="118" r="26" fill="var(--fill-b)"/>
    <path d="M132 356 H268" stroke-width="12"/>`),

  /* The heart, as the thing that turns. */
  heart: S(`
    <path d="M200 336 C120 274 60 226 60 162 a72 72 0 0 1 140 -26 a72 72 0 0 1 140 26
             c0 64 -60 112 -140 174 Z" fill="var(--fill-b)"/>`),

  /* An open book: the dictionaries and the tafsir. */
  book: S(`
    <path d="M200 116 C160 84 108 78 56 84 V304 c52 -6 104 0 144 32 Z" fill="var(--fill-a)"/>
    <path d="M200 116 C240 84 292 78 344 84 V304 c-52 -6 -104 0 -144 32 Z" fill="var(--fill-a)"/>
    <path d="M200 116 V336" stroke-width="11"/>
    <path d="M92 148 h72 M92 194 h72 M236 148 h72 M236 194 h72" stroke-width="8"/>`),

  /* Everything pointing to one centre. */
  converge: S(`
    <circle cx="200" cy="200" r="42" fill="var(--fill-b)"/>
    <path d="M200 44 V128 M200 356 V272 M44 200 H128 M356 200 H272
             M90 90 L150 150 M310 310 L250 250 M310 90 L250 150 M90 310 L150 250" stroke-width="11"/>
    <path d="M186 114 L200 128 L214 114 M186 286 L200 272 L214 286
             M114 186 L128 200 L114 214 M286 186 L272 200 L286 214" stroke-width="11"/>`),

  /* The same arrows, with nothing at the centre. */
  scatter: S(`
    <circle cx="200" cy="200" r="40" stroke-dasharray="14 16" stroke-width="9"/>
    <path d="M200 152 V60 M200 248 V340 M152 200 H60 M248 200 H340" stroke-width="11"/>
    <path d="M186 74 L200 60 L214 74 M186 326 L200 340 L214 326
             M74 186 L60 200 L74 214 M326 186 L340 200 L326 214" stroke-width="11"/>`),

  /* Balance: what is permitted and what is forbidden. */
  balance: S(`
    <path d="M200 62 V330 M132 330 h136" stroke-width="12"/>
    <path d="M76 124 H324" stroke-width="12"/>
    <path d="M76 124 L36 214 h80 Z" fill="var(--fill-b)"/>
    <path d="M324 124 L284 214 h80 Z" fill="var(--fill-c)"/>
    <circle cx="200" cy="106" r="16" fill="var(--fill-a)"/>`),

  /* The pen: who has the right to legislate. */
  pen: S(`
    <path d="M92 316 L120 226 L268 78 a30 30 0 0 1 42 42 L162 268 Z" fill="var(--fill-a)"/>
    <path d="M120 226 L162 268" stroke-width="9"/>
    <path d="M92 316 L128 300" stroke-width="9"/>
    <path d="M60 350 H340" stroke-width="11"/>`),

  /* A lamp: the guidance in the text. */
  lamp: S(`
    <path d="M200 54 V96" stroke-width="11"/>
    <path d="M118 96 H282 L248 214 H152 Z" fill="var(--fill-a)"/>
    <path d="M152 214 h96 v28 h-96 Z"/>
    <path d="M200 242 V304" stroke-width="11"/>
    <path d="M124 336 h152" stroke-width="12"/>
    <path d="M64 268 l40 -22 M336 268 l-40 -22 M78 168 h-34 M356 168 h-34" stroke-width="9"/>`),

  /* Two voices: the question and the answer. */
  dialogue: S(`
    <path d="M56 92 h182 a20 20 0 0 1 20 20 v106 a20 20 0 0 1 -20 20 H132 l-48 44 v-44 H56
             a20 20 0 0 1 -20 -20 V112 a20 20 0 0 1 20 -20 Z" fill="var(--fill-a)"/>
    <path d="M344 176 H286 a20 20 0 0 0 -20 20 v100 a20 20 0 0 0 20 20 h74 l40 38 v-38 h-2
             a20 20 0 0 0 20 -20 V196 a20 20 0 0 0 -20 -20 Z" fill="var(--fill-c)"
          transform="translate(-42,0)"/>`),

  /* Refuge. */
  refuge: S(`
    <path d="M200 46 L332 96 v112 c0 76 -58 122 -132 148 -74 -26 -132 -72 -132 -148 V96 Z"
          fill="var(--fill-b)"/>
    <path d="M156 200 l30 32 l62 -70" stroke="var(--paper)" stroke-width="15"/>`),

  /* One door, one way through. */
  gate: S(`
    <path d="M110 348 V166 a90 90 0 0 1 180 0 v182" fill="var(--fill-a)"/>
    <path d="M200 166 V348" stroke-width="10"/>
    <path d="M64 348 H336" stroke-width="12"/>
    <circle cx="176" cy="258" r="9" fill="var(--line)" stroke="none"/>
    <circle cx="224" cy="258" r="9" fill="var(--line)" stroke="none"/>`),

  /* Crossed out: the claim that is rejected. */
  reject: S(`
    <circle cx="200" cy="200" r="136" stroke-width="16"/>
    <path d="M104 104 L296 296" stroke-width="16" stroke="var(--line-accent)"/>`),
});

export const ART_KEYS = Object.keys(ART);
