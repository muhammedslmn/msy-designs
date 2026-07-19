/* =================================================================
   Gharîb — Spiel-Engine & Oberfläche
   Reines JavaScript, kein Framework, kein Build-Schritt.
   ================================================================= */
'use strict';

/* ---------- Kleine UI-Icons (reine Geometrie/Symbole) ---------- */
const UI = {
  back:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
  plus:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  minus:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5 12h14"/></svg>',
  sun:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/></svg>',
  moon:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/></svg>',
  globe:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"/></svg>',
  chevron:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',
  check:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 6"/></svg>',
  info:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5v.2"/></svg>',
  play:   '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.87l11-6.5a1 1 0 0 0 0-1.74l-11-6.5A1 1 0 0 0 8 5.5z"/></svg>',
  hand:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 11V5.5a1.5 1.5 0 0 1 3 0V11M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.7 7-7 7-2.3 0-3.8-.9-5.2-2.7L3 15.4a1.6 1.6 0 0 1 2.6-1.9L8 16"/></svg>',
  eye:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>',
  tap:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11V6a1.6 1.6 0 0 1 3.2 0v5"/><path d="M12.2 11V8.5a1.5 1.5 0 0 1 3 0V13c0 3.5-2 6-5.5 6-1.8 0-3-.7-4-2l-2-3a1.5 1.5 0 0 1 2.4-1.8L10 15"/></svg>',
  refresh:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-2.6-6.3M21 4v5h-5"/></svg>',
  home:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M4 11l8-7 8 7"/><path d="M6 10v9h12v-9"/></svg>',
  book:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H19v15H6a2 2 0 0 0-2 2z"/><path d="M6 19h13"/></svg>',
  award:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M8.5 12.6L7 21l5-2.6L17 21l-1.5-8.4"/></svg>',
  sparkle:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M12 3l1.8 4.7L18.5 9.5 13.8 11.3 12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/></svg>',
  corner: '<svg viewBox="0 0 46 46" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M4 22V10a6 6 0 0 1 6-6h12"/><path d="M4 14V10a6 6 0 0 1 6-6h4"/><circle cx="9" cy="9" r="1.6" fill="currentColor" stroke="none"/></svg>',
  close:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
};

/* ---------- Mini-Hyperscript (sicher gegen XSS: Namen via Textknoten) ---------- */
function h(tag, props, ...kids) {
  const e = document.createElement(tag);
  if (props) for (const k in props) {
    const v = props[k];
    if (v == null || v === false) continue;
    if (k === 'class') e.className = v;
    else if (k === 'html') e.innerHTML = v;               // nur für vertrauenswürdige Icon-/Inhalts-Strings
    else if (k === 'text') e.textContent = v;             // für Benutzereingaben (Namen)
    else if (k === 'onclick') e.addEventListener('click', v);
    else if (k === 'oninput') e.addEventListener('input', v);
    else if (k === 'style') e.setAttribute('style', v);
    else e.setAttribute(k, v);
  }
  for (const kid of kids.flat()) {
    if (kid == null || kid === false) continue;
    e.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
  }
  return e;
}
const icon = (svg, cls) => h('span', { class: cls || 'ic', html: svg, 'aria-hidden': 'true' });

/* ---------- Zustand ---------- */
const store = {
  get(k, d) { try { const v = localStorage.getItem('gharib_' + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem('gharib_' + k, JSON.stringify(v)); } catch {} },
};

const MIN_PLAYERS = 3, MAX_PLAYERS = 12, TIMER_DEFAULT = 120;

function detectLang() {
  const saved = store.get('lang');
  if (saved && LANGS.some(l => l.code === saved)) return saved;
  const nav = (navigator.language || 'de').slice(0, 2);
  return LANGS.some(l => l.code === nav) ? nav : 'de';
}

const savedSetup = store.get('setup', {});
const state = {
  lang: detectLang(),
  theme: store.get('theme', (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light'),
  screen: 'home',
  langMenuOpen: false,
  config: {
    players: clampInt(savedSetup.players, MIN_PLAYERS, MAX_PLAYERS, 4),
    names: Array.isArray(savedSetup.names) ? savedSetup.names.slice(0, MAX_PLAYERS) : [],
    gharib: clampInt(savedSetup.gharib, 1, MAX_PLAYERS, 1),
    category: savedSetup.category || 'mixed',
    level: clampInt(savedSetup.level, 1, 4, 1),
  },
  game: null,
  recent: store.get('recent', []),
  timer: { remaining: TIMER_DEFAULT, running: false, id: null },
  quizConfig: {
    category: (store.get('quizSetup', {}).category) || 'mixed',
    level: clampInt(store.get('quizSetup', {}).level, 1, 4, 2),
    count: (store.get('quizSetup', {}).count) || 10,
  },
  quiz: null,
};

function clampInt(v, lo, hi, dflt) { v = parseInt(v, 10); if (isNaN(v)) return dflt; return Math.max(lo, Math.min(hi, v)); }
const T = (key, vars) => tr(state.lang, key, vars);
const maxGharib = (players) => Math.max(1, players - 2);

/* ---------- Wurzel / Navigation ---------- */
const root = document.getElementById('app');

function applyLangDir() {
  const meta = LANGS.find(l => l.code === state.lang) || LANGS[0];
  document.documentElement.lang = state.lang;
  document.documentElement.dir = meta.dir;
  document.documentElement.setAttribute('data-theme', state.theme);
}

function setScreen(s) { stopTimer(); state.screen = s; state.langMenuOpen = false; render(); window.scrollTo(0, 0); }

function render() {
  applyLangDir();
  root.textContent = '';
  root.append(renderAppbar());
  let screen;
  switch (state.screen) {
    case 'setup':  screen = renderSetup(); break;
    case 'deal':   screen = renderDeal(); break;
    case 'round':  screen = renderRound(); break;
    case 'reveal': screen = renderReveal(); break;
    case 'nasiha': screen = renderNasiha(); break;
    case 'quiz_setup':  screen = renderQuizSetup(); break;
    case 'quiz_play':   screen = renderQuizPlay(); break;
    case 'quiz_result': screen = renderQuizResult(); break;
    case 'online':      screen = renderOnline(); break;
    default:       screen = renderHub();
  }
  root.append(screen);
}

/* ---------- App-Bar ---------- */
function brandMark() {
  return h('span', { class: 'brand-mark', html: ICONS.star8, 'aria-hidden': 'true' });
}
function renderAppbar() {
  const bar = h('div', { class: 'appbar' });

  const brand = h('button', { class: 'brand', onclick: () => setScreen('home'), 'aria-label': 'Gharîb' },
    brandMark(),
    h('span', { class: 'brand-name' }, 'Gharîb', h('span', { class: 'ar', html: '&nbsp;غريب' }))
  );

  // Sprachwähler
  const cur = LANGS.find(l => l.code === state.lang);
  const langBtn = h('button', { class: 'langbtn', 'aria-haspopup': 'true', 'aria-expanded': String(state.langMenuOpen),
    onclick: (ev) => { ev.stopPropagation(); state.langMenuOpen = !state.langMenuOpen; render(); } },
    h('span', { class: 'flag' }, cur.flag), h('span', {}, cur.native), h('span', { html: UI.chevron })
  );
  const menu = h('div', { class: 'langmenu' + (state.langMenuOpen ? ' open' : '') });
  LANGS.forEach(l => menu.append(h('button', {
    'aria-current': String(l.code === state.lang),
    onclick: () => { state.lang = l.code; store.set('lang', l.code); state.langMenuOpen = false; render(); },
  }, h('span', { class: 'flag' }, l.flag), h('span', {}, l.native), h('span', { class: 'native' }, l.label))));
  const langWrap = h('div', { class: 'langwrap' }, langBtn, menu);

  // Theme
  const themeBtn = h('button', { class: 'iconbtn', 'aria-label': 'Theme',
    html: state.theme === 'dark' ? UI.sun : UI.moon,
    onclick: () => { state.theme = state.theme === 'dark' ? 'light' : 'dark'; store.set('theme', state.theme); render(); } });

  bar.append(brand, langWrap, themeBtn);
  return bar;
}

/* ---------- Zierteiler ---------- */
function divider() { return h('div', { class: 'divider' }, icon(UI.sparkle)); }

/* ---------- Startseite / Hub ---------- */
function renderHub() {
  const s = h('section', { class: 'screen hub' });
  const inner = h('div', { class: 'container hub-inner' },
    h('div', { class: 'hero-mark', style: 'width:82px;height:82px', html: ICONS.star8 }),
    h('h1', { class: 'hub-title' }, 'Gharîb', h('span', { class: 'ar' }, 'غريب')),
    h('p', { class: 'hub-sub' }, T('hub_sub')),
    h('div', { class: 'gamecards' }, gameCard('gharib'), gameCard('quiz'), gameCard('slf')),
    h('button', { class: 'btn btn-ghost btn-block', style: 'margin-top:.2rem', onclick: openRules }, icon(UI.info), T('home_rules')),
    divider(),
    h('p', { class: 'hero-foot' }, icon(UI.book, ''), T('home_foot')),
  );
  s.append(inner);
  return s;
}
function gameCard(which) {
  const slft = (typeof SLF_T !== 'undefined') ? (SLF_T[state.lang] || SLF_T.de) : { title: 'İsim Şehir', desc: '' };
  const cfg = {
    gharib: { cls: 'g', ico: ICONS.star8, name: h('span', {}, 'Gharîb', h('span', { class: 'gc-ar' }, ' غريب')), desc: T('game_gharib_desc'), go: () => setScreen('setup') },
    quiz:   { cls: 'q', ico: ICONS.quiz,  name: T('game_quiz_name'), desc: T('game_quiz_desc'), go: () => setScreen('quiz_setup') },
    slf:    { cls: 's', ico: ICONS.history, name: slft.title, desc: slft.desc, badge: 'ONLINE',
              go: () => { if (typeof OS !== 'undefined') { OS.rs = null; OS.joinCode = ''; OS.error = ''; OS.role = null; if (OS.net) { OS.net.leave(); OS.net = null; } } setScreen('online'); } },
  }[which];
  return h('button', { class: 'gamecard ' + cfg.cls, onclick: cfg.go },
    h('span', { class: 'gc-ico', html: cfg.ico, 'aria-hidden': 'true' }),
    h('span', { class: 'gc-body' },
      h('span', { class: 'gc-name' }, cfg.name, cfg.badge ? h('span', { class: 'gc-badge' }, cfg.badge) : null),
      h('span', { class: 'gc-desc' }, cfg.desc),
    ),
    h('span', { class: 'gc-play', html: UI.play, 'aria-hidden': 'true' }),
  );
}

/* ---------- Screen-Kopf ---------- */
function screenHead(titleKey, sub) {
  return h('div', { class: 'shead' },
    h('button', { class: 'backbtn', 'aria-label': T('back'), html: UI.back, onclick: () => setScreen('home') }),
    h('div', {}, h('h1', {}, T(titleKey)), sub ? h('div', { class: 'sub' }, sub) : null),
  );
}

/* ---------- Einrichtung ---------- */
function renderSetup() {
  const c = state.config;
  const s = h('section', { class: 'screen setup' });
  const wrap = h('div', { class: 'container' });
  wrap.append(screenHead('setup_title'));

  /* Spieleranzahl */
  const playersVal = h('div', { class: 'value' }, String(c.players), h('small', {}, T('players_unit')));
  const decP = h('button', { 'aria-label': '-', html: UI.minus, disabled: c.players <= MIN_PLAYERS ? '' : null,
    onclick: () => changePlayers(-1) });
  const incP = h('button', { 'aria-label': '+', html: UI.plus, disabled: c.players >= MAX_PLAYERS ? '' : null,
    onclick: () => changePlayers(1) });
  wrap.append(field('players_label', 'players_hint', UI.hand,
    h('div', { class: 'stepper' }, decP, playersVal, incP),
    renderNames(),
  ));

  /* Gharîb-Anzahl */
  const mg = maxGharib(c.players);
  const gVal = h('div', { class: 'value' }, String(c.gharib), h('small', {}, T('gharib_unit')));
  const decG = h('button', { 'aria-label': '-', html: UI.minus, disabled: c.gharib <= 1 ? '' : null,
    onclick: () => { c.gharib = Math.max(1, c.gharib - 1); persistSetup(); render(); } });
  const incG = h('button', { 'aria-label': '+', html: UI.plus, disabled: c.gharib >= mg ? '' : null,
    onclick: () => { c.gharib = Math.min(mg, c.gharib + 1); persistSetup(); render(); } });
  wrap.append(field('gharib_label', null, ICONS.star8,
    h('div', { class: 'stepper' }, decG, gVal, incG),
    h('div', { class: 'hint', style: 'margin-top:.7rem' }, T('gharib_hint', { p: c.players, m: mg })),
  ));

  /* Kategorie – gruppiert (aufgeräumt) */
  const CAT_GROUP = { islam: { de:'Islam', tr:'İslami', en:'Islamic', ar:'إسلامية' }, daily: { de:'Alltag & Werte', tr:'Günlük & değerler', en:'Everyday & values', ar:'الحياة والقيم' } };
  const ISLAMIC = ['prophets', 'companions', 'worship', 'quran', 'places', 'akhlaq', 'aqida', 'history'];
  const catBtn = (cat) => {
    const count = TERMS.filter(t => t.cat === cat.id).length;
    return h('button', { class: 'cat' + (c.category === cat.id ? ' is-selected' : ''),
      onclick: () => { c.category = cat.id; persistSetup(); render(); } },
      h('span', { class: 'tick', html: UI.check }),
      h('span', { class: 'ico', html: cat.icon }),
      h('span', { class: 'nm' }, cat.name[state.lang]),
      h('span', { class: 'cnt' }, count + ' ' + T('words_unit')),
    );
  };
  const gridIslam = h('div', { class: 'cat-grid' });
  ISLAMIC.forEach(id => { const cat = CATEGORIES.find(x => x.id === id); if (cat) gridIslam.append(catBtn(cat)); });
  const gridDaily = h('div', { class: 'cat-grid' });
  CATEGORIES.filter(x => !ISLAMIC.includes(x.id)).forEach(cat => gridDaily.append(catBtn(cat)));
  const mixedBtn = h('button', { class: 'cat mixed' + (c.category === 'mixed' ? ' is-selected' : ''),
    onclick: () => { c.category = 'mixed'; persistSetup(); render(); } },
    h('span', { class: 'ico', html: ICONS.mixed }),
    h('span', {}, h('span', { class: 'nm' }, T('mixed_name')), h('span', { class: 'cnt', style: 'display:block' }, T('mixed_desc') + ' · ' + TERMS.length + ' ' + T('words_unit'))),
    h('span', { class: 'tick', html: UI.check }),
  );
  wrap.append(field('category_label', 'category_hint', ICONS.quran,
    mixedBtn,
    h('div', { class: 'cat-group' }, CAT_GROUP.islam[state.lang]), gridIslam,
    h('div', { class: 'cat-group' }, CAT_GROUP.daily[state.lang]), gridDaily,
  ));

  /* Schwierigkeit */
  const levels = h('div', { class: 'levels' });
  [1, 2, 3, 4].forEach(lv => {
    const pips = h('span', { class: 'pips' });
    for (let i = 1; i <= 4; i++) pips.append(h('i', { class: i <= lv ? 'on' : '' }));
    levels.append(h('button', { class: 'level' + (c.level === lv ? ' is-selected' : ''),
      onclick: () => { c.level = lv; persistSetup(); render(); } },
      h('span', { class: 'lv' }, T('level_' + lv), pips),
      h('span', { class: 'd' }, T('level_' + lv + '_d')),
    ));
  });
  wrap.append(field('level_label', 'level_hint', UI.sparkle, levels));

  s.append(wrap);

  /* Sticky Start */
  const bar = h('div', { class: 'startbar' }, h('div', { class: 'inner' },
    h('button', { class: 'btn btn-primary btn-lg btn-block', onclick: startGame }, icon(UI.play), T('start_btn'))
  ));
  s.append(bar);
  return s;
}

function field(labelKey, hintKey, iconSvg, ...body) {
  return h('div', { class: 'field' },
    h('div', { class: 'label' }, h('span', { html: iconSvg, 'aria-hidden': 'true' }), T(labelKey)),
    hintKey ? h('div', { class: 'hint' }, T(hintKey)) : null,
    ...body,
  );
}

function renderNames() {
  const c = state.config;
  const box = h('div', { class: 'names' });
  box.append(h('div', { class: 'hint', style: 'margin:.2rem 0 .3rem' }, T('names_label') + ' · ' + T('names_hint')));
  for (let i = 0; i < c.players; i++) {
    const inp = h('input', { type: 'text', value: c.names[i] || '', maxlength: '20',
      placeholder: T('name_ph', { n: i + 1 }), 'aria-label': T('name_ph', { n: i + 1 }),
      oninput: (e) => { c.names[i] = e.target.value; persistSetupDebounced(); } });
    box.append(h('div', { class: 'name-row' }, h('span', { class: 'num' }, String(i + 1)), inp));
  }
  return box;
}

function changePlayers(delta) {
  const c = state.config;
  c.players = Math.max(MIN_PLAYERS, Math.min(MAX_PLAYERS, c.players + delta));
  c.gharib = Math.min(c.gharib, maxGharib(c.players));
  persistSetup(); render();
}

let persistTimer = null;
function persistSetupDebounced() { clearTimeout(persistTimer); persistTimer = setTimeout(persistSetup, 400); }
function persistSetup() {
  const c = state.config;
  store.set('setup', { players: c.players, names: c.names, gharib: c.gharib, category: c.category, level: c.level });
}

/* ---------- Spiel starten ---------- */
function playerName(i) {
  const nm = (state.config.names[i] || '').trim();
  return nm || T('name_ph', { n: i + 1 });
}

function pickWord() {
  const { category, level } = state.config;
  let pool = TERMS.map((t, i) => ({ t, i })).filter(x => category === 'mixed' || x.t.cat === category);
  const ranges = { 1: [1, 2], 2: [1, 3], 3: [2, 4], 4: [3, 4] };
  const [lo, hi] = ranges[level];
  let pref = pool.filter(x => x.t.level >= lo && x.t.level <= hi);
  if (pref.length < 3) pref = pool;
  let avail = pref.filter(x => !state.recent.includes(x.i));
  if (avail.length === 0) avail = pref;
  const pick = avail[Math.floor(Math.random() * avail.length)];
  state.recent.push(pick.i);
  const keep = Math.min(10, Math.max(0, pref.length - 1));
  while (state.recent.length > keep) state.recent.shift();
  store.set('recent', state.recent);
  return pick.t;
}

function pickGharibs(n, count) {
  const idx = [...Array(n).keys()];
  for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  return idx.slice(0, count).sort((a, b) => a - b);
}

function startGame() {
  const c = state.config;
  c.gharib = Math.min(c.gharib, maxGharib(c.players));
  const term = pickWord();
  const gharibs = pickGharibs(c.players, c.gharib);
  state.game = {
    term,
    level: c.level,
    giveHint: c.level === 1,
    hideCategory: c.level === 4,
    gharibs,                       // Indizes der Gharîb-Spieler
    dealIndex: 0,
    revealed: false,
    startPlayer: Math.floor(Math.random() * c.players),
    gharibShown: false,
  };
  state.timer = { remaining: TIMER_DEFAULT, running: false, id: null };
  persistSetup();
  setScreen('deal');
}

function catName(id) { const cat = CATEGORIES.find(x => x.id === id); return cat ? cat.name[state.lang] : ''; }

/* ---------- Karten-Übergabe ---------- */
function renderDeal() {
  const g = state.game;
  const s = h('section', { class: 'screen deal' });
  const wrap = h('div', { class: 'container', style: 'display:flex;flex-direction:column;align-items:center;justify-content:center;flex:1' });

  if (g.dealIndex >= state.config.players) {
    // Alle fertig
    wrap.append(
      h('div', { class: 'pass' },
        h('div', { class: 'hero-mark', style: 'width:84px;height:84px;color:var(--gold)', html: ICONS.star8 }),
        h('div', { class: 'give' }, T('round_players') + ' · ' + state.config.players),
        h('button', { class: 'btn btn-primary btn-lg btn-block', style: 'max-width:340px', onclick: () => setScreen('round') }, icon(UI.play), T('deal_start_round')),
      )
    );
    s.append(wrap); return s;
  }

  const name = playerName(g.dealIndex);
  const dots = h('div', { class: 'progress-dots' });
  for (let i = 0; i < state.config.players; i++)
    dots.append(h('i', { class: i < g.dealIndex ? 'done' : (i === g.dealIndex ? 'current' : '') }));

  if (!g.revealed) {
    // Verdeckte Karte – Übergabe
    const cardBack = h('button', { class: 'card card-back', 'aria-label': T('deal_tap'),
      onclick: () => { g.revealed = true; render(); } },
      h('div', { class: 'frame' }),
      h('div', { class: 'cb-star', html: ICONS.star8 }),
      h('div', { class: 'cb-tap' }, icon(UI.tap), T('deal_tap')),
    );
    wrap.append(h('div', { class: 'pass' },
      h('div', { style: 'text-align:center' },
        h('span', { class: 'hand', html: UI.hand, 'aria-hidden': 'true' }),
        h('div', { class: 'give' }, T('deal_give')),
        h('div', { class: 'who' }, name),
      ),
      cardBack,
      dots,
    ));
  } else {
    wrap.append(h('div', { class: 'pass' }, renderCardFace(), dots));
  }
  s.append(wrap);
  return s;
}

function renderCardFace() {
  const g = state.game;
  const isGharib = g.gharibs.includes(g.dealIndex);
  const card = h('div', { class: 'card card-face' },
    h('span', { class: 'corner tl', html: UI.corner }),
    h('span', { class: 'corner br', html: UI.corner }),
  );

  if (isGharib) {
    card.append(
      h('span', { class: 'gharib-badge', html: ICONS.star8 }),
      h('div', { class: 'card-word gharib' }, T('deal_gharib_title')),
      h('div', { class: 'card-memorize' }, T('deal_gharib_desc')),
    );
    if (!g.hideCategory && state.config.category !== 'mixed')
      card.append(h('div', { class: 'card-hintbox', style: 'margin-top:1rem' }, h('b', {}, T('deal_category') + ': '), catName(g.term.cat)));
    if (g.giveHint)
      card.append(h('div', { class: 'card-hintbox' }, h('b', {}, T('deal_hint') + ': '), g.term.h[state.lang]));
  } else {
    card.append(
      h('div', { class: 'card-eyebrow' }, icon(UI.eye), T('deal_your_word')),
      h('div', { class: 'card-word' }, g.term.w[state.lang]),
      state.config.category !== 'mixed' ? h('div', { class: 'card-cat' }, catName(g.term.cat)) : null,
      h('div', { class: 'card-memorize' }, T('deal_memorize')),
    );
  }

  const last = g.dealIndex >= state.config.players - 1;
  card.append(h('button', { class: 'btn btn-primary btn-block', style: 'margin-top:1.4rem',
    onclick: () => { g.revealed = false; g.dealIndex++; render(); } },
    last ? icon(UI.check) : null, T('deal_hide')));
  return card;
}

/* ---------- Runde ---------- */
function renderRound() {
  const g = state.game;
  const s = h('section', { class: 'screen round' });
  const wrap = h('div', { class: 'container' });
  // Zurück führt zur Kartenübergabe (falls jemand sein Wort erneut sehen will)
  wrap.append(h('div', { class: 'shead' },
    h('button', { class: 'backbtn', 'aria-label': T('back'), html: UI.back, onclick: () => { state.game.revealed = false; state.game.dealIndex = 0; setScreen('deal'); } }),
    h('div', {}, h('h1', {}, T('round_eyebrow'))),
  ));

  wrap.append(h('div', { class: 'round-hero' },
    h('div', { class: 'eyebrow' }, T('round_eyebrow')),
    h('div', { class: 'start-player' }, playerName(g.startPlayer)),
    h('div', { class: 'desc' }, T('round_desc')),
  ));

  // Timer
  const timeNode = h('div', { class: 'time' }, fmtTime(state.timer.remaining));
  const timerBox = h('div', { class: 'timer' + (state.timer.remaining <= 15 ? ' low' : '') }, timeNode);
  const startPauseBtn = h('button', { class: 'btn btn-soft' },
    icon(state.timer.running ? UI.minus : UI.play),
    T(state.timer.running ? 'timer_pause' : (state.timer.remaining < TIMER_DEFAULT ? 'timer_resume' : 'timer_start')));
  startPauseBtn.addEventListener('click', () => toggleTimer(timeNode, timerBox, startPauseBtn));
  const resetBtn = h('button', { class: 'btn btn-ghost', onclick: () => resetTimer(timeNode, timerBox, startPauseBtn) }, icon(UI.refresh), T('timer_reset'));
  timerBox.append(h('div', { class: 'controls' }, startPauseBtn, resetBtn));
  state._timeNode = timeNode; state._timerBox = timerBox; state._spBtn = startPauseBtn;
  wrap.append(timerBox);

  // Mitspieler
  const chips = h('div', { class: 'player-chips' });
  for (let i = 0; i < state.config.players; i++)
    chips.append(h('span', { class: 'pchip' }, h('span', { class: 'd' }), playerName(i)));
  wrap.append(h('div', { class: 'hint', style: 'text-align:center;margin-top:1.4rem' }, T('round_players')));
  wrap.append(chips);

  wrap.append(h('div', { style: 'height:1.6rem' }));
  wrap.append(h('button', { class: 'btn btn-gold btn-lg btn-block', onclick: () => setScreen('reveal') }, icon(UI.eye), T('reveal_btn')));
  s.append(wrap);
  return s;
}

function fmtTime(sec) { const m = Math.floor(sec / 60), r = sec % 60; return m + ':' + String(r).padStart(2, '0'); }
function stopTimer() { if (state.timer.id) { clearInterval(state.timer.id); state.timer.id = null; } state.timer.running = false; }
function toggleTimer(timeNode, box, btn) {
  if (state.timer.running) { stopTimer(); updateTimerBtn(btn); return; }
  if (state.timer.remaining <= 0) state.timer.remaining = TIMER_DEFAULT;
  state.timer.running = true; updateTimerBtn(btn);
  state.timer.id = setInterval(() => {
    state.timer.remaining--;
    timeNode.textContent = fmtTime(Math.max(0, state.timer.remaining));
    box.classList.toggle('low', state.timer.remaining <= 15);
    if (state.timer.remaining <= 0) { stopTimer(); updateTimerBtn(btn); }
  }, 1000);
}
function resetTimer(timeNode, box, btn) { stopTimer(); state.timer.remaining = TIMER_DEFAULT; timeNode.textContent = fmtTime(TIMER_DEFAULT); box.classList.remove('low'); updateTimerBtn(btn); }
function updateTimerBtn(btn) {
  btn.textContent = '';
  btn.append(icon(state.timer.running ? UI.minus : UI.play));
  btn.append(document.createTextNode(T(state.timer.running ? 'timer_pause' : (state.timer.remaining < TIMER_DEFAULT ? 'timer_resume' : 'timer_start'))));
}

/* ---------- Auflösung ---------- */
function renderReveal() {
  const g = state.game;
  const s = h('section', { class: 'screen reveal' });
  const wrap = h('div', { class: 'container' + (g.gharibShown ? ' revealed' : '') });
  wrap.append(h('div', { class: 'shead' },
    h('button', { class: 'backbtn', 'aria-label': T('back'), html: UI.back, onclick: () => setScreen('round') }),
    h('div', {}, h('h1', {}, T('reveal_title'))),
  ));

  wrap.append(h('div', { class: 'reveal-word' },
    h('div', { class: 'lbl' }, T('reveal_the_word')),
    h('div', { class: 'w' }, g.term.w[state.lang]),
  ));

  if (!g.gharibShown) {
    wrap.append(h('button', { class: 'btn btn-gold btn-lg btn-block', style: 'margin-top:1.2rem',
      onclick: () => { g.gharibShown = true; render(); } }, icon(UI.eye), T('reveal_show')));
  } else {
    const names = h('div', { class: 'names' });
    g.gharibs.forEach(i => names.append(h('span', { class: 'gname' }, playerName(i))));
    wrap.append(h('div', { class: 'gharib-reveal' },
      h('div', { class: 'lbl' }, g.gharibs.length > 1 ? T('reveal_gharib_n') : T('reveal_gharib_1')),
      names,
    ));
    wrap.append(h('button', { class: 'btn btn-primary btn-lg btn-block', style: 'margin-top:1.3rem',
      onclick: () => setScreen('nasiha') }, icon(UI.book), T('reveal_continue')));
  }
  s.append(wrap);
  return s;
}

/* ---------- Nasîha ---------- */
function getNasiha(term) {
  return NASIHA[term.n] || NASIHA[CATEGORY_DEFAULT_NASIHA[term.cat]] || NASIHA[DEFAULT_NASIHA];
}
function renderNasiha() {
  const g = state.game;
  const n = getNasiha(g.term);
  const s = h('section', { class: 'screen nasiha' });
  const wrap = h('div', { class: 'container' });

  wrap.append(h('div', { class: 'nasiha-head' },
    h('div', { class: 'kicker' }, icon(UI.sparkle), T('nasiha_kicker')),
    h('h2', {}, g.term.w[state.lang]),
  ));

  const isHadith = n.type === 'hadith';
  const body = h('div', { class: 'body' }, h('div', { class: 'arabic', dir: 'rtl' }, n.ar));
  if (n[state.lang]) body.append(h('div', { class: 'translation' }, n[state.lang]));
  body.append(h('div', { class: 'ref' },
    h('span', {}, n.ref),
    n.grade ? h('span', { class: 'grade' }, '· ' + n.grade) : null,
  ));
  wrap.append(h('div', { class: 'scripture' },
    h('div', { class: 'stag' + (isHadith ? ' hadith' : '') }, icon(isHadith ? UI.sparkle : UI.book), T(isHadith ? 'hadith_tag' : 'verse_tag')),
    body,
  ));

  wrap.append(h('div', { class: 'nasiha-note' }, T('nasiha_note')));

  s.append(wrap);

  const bar = h('div', { class: 'startbar' }, h('div', { class: 'inner stack' },
    h('button', { class: 'btn btn-primary btn-lg btn-block', onclick: () => startGame() }, icon(UI.refresh), T('nasiha_again')),
    h('div', { style: 'display:flex;gap:.6rem' },
      h('button', { class: 'btn btn-ghost btn-block', onclick: () => setScreen('setup') }, T('nasiha_new')),
      h('button', { class: 'btn btn-ghost btn-block', onclick: () => setScreen('home') }, icon(UI.home), T('nasiha_home')),
    ),
  ));
  s.append(bar);
  return s;
}

/* ---------- Regeln (Modal) ---------- */
function openRules() {
  const overlay = h('div', { class: 'modal-overlay', onclick: (e) => { if (e.target === overlay) closeModal(overlay); } });
  const modal = h('div', { class: 'modal' });
  modal.append(h('div', { class: 'modal-grip' }));
  modal.append(h('h2', {}, icon(UI.info), T('rules_title')));
  const steps = [1, 2, 3, 4, 5];
  steps.forEach(i => modal.append(h('div', { class: 'rule-step' },
    h('div', { class: 'n' }, String(i)),
    h('div', { class: 't' }, h('strong', {}, T('rule_' + i + '_t')), T('rule_' + i + '_d')),
  )));
  modal.append(h('button', { class: 'btn btn-primary btn-block', style: 'margin-top:1.2rem', onclick: () => closeModal(overlay) }, T('rules_close')));
  overlay.append(modal);
  document.body.append(overlay);
  requestAnimationFrame(() => overlay.classList.add('open'));
}
function closeModal(overlay) { overlay.classList.remove('open'); setTimeout(() => overlay.remove(), 200); }

/* ======================================================================
   BILGI YARIŞI — Wissensquiz
   ====================================================================== */
const QUIZ_UNIT = { de: 'Fragen', tr: 'soru', en: 'questions', ar: 'سؤالًا' };
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function quizCatName(id) { const c = QUIZ_CATEGORIES.find(x => x.id === id); return c ? c.name[state.lang] : ''; }
function persistQuizSetup() { const c = state.quizConfig; store.set('quizSetup', { category: c.category, level: c.level, count: c.count }); }

function renderQuizSetup() {
  const c = state.quizConfig;
  const s = h('section', { class: 'screen setup' });
  const wrap = h('div', { class: 'container' });
  wrap.append(screenHead('quiz_setup_title'));

  /* Kategorie */
  const grid = h('div', { class: 'cat-grid' });
  QUIZ_CATEGORIES.forEach(cat => {
    const count = QUIZ.filter(q => q.cat === cat.id).length;
    grid.append(h('button', { class: 'cat' + (c.category === cat.id ? ' is-selected' : ''),
      onclick: () => { c.category = cat.id; persistQuizSetup(); render(); } },
      h('span', { class: 'tick', html: UI.check }),
      h('span', { class: 'ico', html: cat.icon }),
      h('span', { class: 'nm' }, cat.name[state.lang]),
      h('span', { class: 'cnt' }, count + ' ' + QUIZ_UNIT[state.lang]),
    ));
  });
  grid.append(h('button', { class: 'cat mixed' + (c.category === 'mixed' ? ' is-selected' : ''),
    onclick: () => { c.category = 'mixed'; persistQuizSetup(); render(); } },
    h('span', { class: 'ico', html: ICONS.mixed }),
    h('span', {}, h('span', { class: 'nm' }, T('mixed_name')), h('span', { class: 'cnt', style: 'display:block' }, QUIZ.length + ' ' + QUIZ_UNIT[state.lang])),
    h('span', { class: 'tick', html: UI.check }),
  ));
  wrap.append(field('category_label', 'category_hint', ICONS.quiz, grid));

  /* Schwierigkeit */
  const levels = h('div', { class: 'levels' });
  [1, 2, 3, 4].forEach(lv => {
    const pips = h('span', { class: 'pips' });
    for (let i = 1; i <= 4; i++) pips.append(h('i', { class: i <= lv ? 'on' : '' }));
    levels.append(h('button', { class: 'level' + (c.level === lv ? ' is-selected' : ''),
      onclick: () => { c.level = lv; persistQuizSetup(); render(); } },
      h('span', { class: 'lv' }, T('level_' + lv), pips),
    ));
  });
  wrap.append(field('level_label', 'level_hint', UI.sparkle, levels));

  /* Anzahl Fragen */
  const chips = h('div', { class: 'count-chips' });
  [5, 10, 15, 'all'].forEach(n => {
    chips.append(h('button', { class: 'chip' + (c.count === n ? ' is-selected' : ''),
      onclick: () => { c.count = n; persistQuizSetup(); render(); } },
      n === 'all' ? T('quiz_all') : String(n)));
  });
  wrap.append(field('quiz_count_label', 'quiz_count_hint', ICONS.quiz, chips));

  s.append(wrap);
  s.append(h('div', { class: 'startbar' }, h('div', { class: 'inner' },
    h('button', { class: 'btn btn-primary btn-lg btn-block', onclick: startQuiz }, icon(UI.play), T('quiz_start')))));
  return s;
}

function startQuiz() {
  const c = state.quizConfig;
  let pool = QUIZ.filter(q => c.category === 'mixed' || q.cat === c.category);
  const ranges = { 1: [1, 2], 2: [1, 3], 3: [2, 4], 4: [3, 4] };
  const [lo, hi] = ranges[c.level] || [1, 4];
  let pref = pool.filter(q => q.level >= lo && q.level <= hi);
  const want = c.count === 'all' ? pool.length : c.count;
  if (pref.length < Math.min(want, 4)) pref = pool;
  const arr = shuffle(pref.slice());
  const n = c.count === 'all' ? arr.length : Math.min(c.count, arr.length);
  const list = arr.slice(0, n).map(q => {
    const opts = q.o.map((o, i) => ({ o, correct: i === q.c }));
    shuffle(opts);
    return { q, opts };
  });
  state.quiz = { list, index: 0, score: 0, selected: null, answered: false };
  persistQuizSetup();
  setScreen('quiz_play');
}

function renderQuizPlay() {
  const Q = state.quiz;
  if (!Q || !Q.list.length) { return renderQuizSetup(); }
  const item = Q.list[Q.index];
  const lang = state.lang;
  const s = h('section', { class: 'screen quiz' });
  const wrap = h('div', { class: 'container' });

  wrap.append(h('div', { class: 'shead' },
    h('button', { class: 'backbtn', 'aria-label': T('back'), html: UI.back, onclick: () => setScreen('quiz_setup') }),
    h('div', {}, h('h1', {}, T('game_quiz_name')), h('div', { class: 'sub' }, T('quiz_of', { n: Q.index + 1, t: Q.list.length }))),
  ));

  const frac = (Q.index + (Q.answered ? 1 : 0)) / Q.list.length * 100;
  wrap.append(h('div', { class: 'qprogress' }, h('span', { style: 'width:' + frac + '%' })));

  wrap.append(h('div', { class: 'qcard' },
    h('div', { class: 'qcat' }, quizCatName(item.q.cat)),
    h('div', { class: 'qtext' }, item.q.q[lang]),
  ));

  const opts = h('div', { class: 'qoptions' });
  item.opts.forEach((opt, i) => {
    let cls = 'qopt';
    if (Q.answered) { if (opt.correct) cls += ' correct'; else if (i === Q.selected) cls += ' wrong'; else cls += ' dim'; }
    opts.append(h('button', { class: cls, disabled: Q.answered ? '' : null,
      onclick: () => { if (Q.answered) return; Q.answered = true; Q.selected = i; if (opt.correct) Q.score++; render(); } },
      h('span', { class: 'qletter' }, String.fromCharCode(65 + i)),
      h('span', { class: 'qopttext' }, opt.o[lang]),
      Q.answered && opt.correct ? h('span', { class: 'qmark', html: UI.check }) : (Q.answered && i === Q.selected ? h('span', { class: 'qmark', html: UI.close }) : null),
    ));
  });
  wrap.append(opts);

  if (Q.answered) {
    const correct = item.opts[Q.selected].correct;
    wrap.append(h('div', { class: 'qfeedback ' + (correct ? 'ok' : 'no') },
      h('span', { class: 'fb-ic', html: correct ? UI.check : UI.close }),
      T(correct ? 'quiz_correct' : 'quiz_wrong')));
    wrap.append(h('div', { class: 'qexplain' },
      h('div', { class: 'qexp-text' }, item.q.e[lang]),
      item.q.ref ? h('div', { class: 'qref' }, T('quiz_source') + ': ' + item.q.ref) : null));
    const last = Q.index >= Q.list.length - 1;
    wrap.append(h('button', { class: 'btn btn-primary btn-lg btn-block', style: 'margin-top:1.1rem',
      onclick: () => { if (last) { setScreen('quiz_result'); } else { Q.index++; Q.answered = false; Q.selected = null; render(); window.scrollTo(0, 0); } } },
      last ? icon(UI.award) : null, T(last ? 'quiz_to_result' : 'quiz_next')));
  }

  s.append(wrap);
  return s;
}

function renderQuizResult() {
  const Q = state.quiz || { list: [], score: 0 };
  const total = Q.list.length || 1, score = Q.score;
  const pct = score / total;
  const tier = pct >= 0.8 ? 'high' : (pct >= 0.5 ? 'mid' : 'low');
  const msg = pct >= 0.8 ? 'quiz_msg_high' : (pct >= 0.5 ? 'quiz_msg_mid' : 'quiz_msg_low');
  const s = h('section', { class: 'screen quiz-result' });
  const wrap = h('div', { class: 'container', style: 'text-align:center' });
  wrap.append(h('div', { class: 'shead', style: 'justify-content:center' },
    h('div', {}, h('h1', {}, T('quiz_result_title')))));
  wrap.append(h('div', { class: 'score-ring ' + tier, style: '--p:' + Math.round(pct * 100) + '%' },
    h('div', { class: 'score-num' }, String(score), h('span', {}, '/' + Q.list.length))));
  wrap.append(h('div', { class: 'score-msg' }, T(msg)));
  wrap.append(h('div', { class: 'score-sub muted' }, T('quiz_score', { s: score, t: Q.list.length })));
  wrap.append(h('div', { class: 'stack', style: 'margin-top:1.6rem' },
    h('button', { class: 'btn btn-primary btn-lg btn-block', onclick: startQuiz }, icon(UI.refresh), T('quiz_again')),
    h('div', { style: 'display:flex;gap:.6rem' },
      h('button', { class: 'btn btn-ghost btn-block', onclick: () => setScreen('quiz_setup') }, T('quiz_new')),
      h('button', { class: 'btn btn-ghost btn-block', onclick: () => setScreen('home') }, icon(UI.home), T('nasiha_home')),
    ),
  ));
  s.append(wrap);
  return s;
}

/* ---------- Globale Interaktionen ---------- */
document.addEventListener('click', () => { if (state.langMenuOpen) { state.langMenuOpen = false; render(); } });

/* ---------- Start ---------- */
try { if (typeof slfCheckInviteURL === 'function') slfCheckInviteURL(); } catch {}
applyLangDir();
render();
