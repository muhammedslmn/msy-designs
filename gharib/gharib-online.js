/* =================================================================
   Gharîb — Online-Mehrspieler (jeder sieht seine Karte am eigenen Handy)
   Nutzt dasselbe Raum-/Netz-System wie İsim Şehir (net.js, OS aus slf.js).
   Der Host (Einladender) legt Kategorie, Stufe und Anzahl Gharîb fest.
   Wortkarten gehen PRIVAT an jeden Spieler (sendPrivate) – der Gharîb
   bekommt das Wort NICHT, nur den Hinweis (bei „Leicht") und ggf. die Kategorie.
   ================================================================= */
'use strict';

function gharibInitialRS(code, hostId, hostName) {
  return {
    code, hostId, hostName, game: 'gharib', phase: 'lobby',
    players: [], totals: {},
    cfg: { category: 'mixed', level: 1, gharib: 1 },
    dealNo: 0, startPlayer: null, reveal: null,
  };
}

/* Wort wählen (eigene „zuletzt"-Liste, wenig Wiederholung) */
function gharibPickWord(category, level) {
  let pool = TERMS.map((t, i) => ({ t, i })).filter(x => category === 'mixed' || x.t.cat === category);
  const ranges = { 1: [1, 2], 2: [1, 3], 3: [2, 4], 4: [3, 4] };
  const [lo, hi] = ranges[level] || [1, 4];
  let pref = pool.filter(x => x.t.level >= lo && x.t.level <= hi);
  if (pref.length < 3) pref = pool;
  OS.gharibRecent = OS.gharibRecent || [];
  let avail = pref.filter(x => !OS.gharibRecent.includes(x.i));
  if (!avail.length) avail = pref;
  const pick = avail[Math.floor(Math.random() * avail.length)];
  OS.gharibRecent.push(pick.i); while (OS.gharibRecent.length > 12) OS.gharibRecent.shift();
  return pick.t;
}

function gharibMaxGharib(nPlayers) { return Math.max(1, nPlayers - 2); }

function gharibDeal() {
  const RS = OS.rs;
  const players = RS.players.slice();
  if (players.length < 3) return;
  const term = gharibPickWord(RS.cfg.category, RS.cfg.level);
  const giveHint = RS.cfg.level === 1;
  const hideCat = RS.cfg.level === 4;
  const gc = Math.max(1, Math.min(RS.cfg.gharib || 1, gharibMaxGharib(players.length)));
  const idx = [...players.keys()];
  for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  const gset = new Set(idx.slice(0, gc).map(i => players[i].id));
  OS.gTerm = term; OS.gGharibs = [...gset]; OS.gharibCards = {};
  RS.dealNo = (RS.dealNo || 0) + 1;
  RS.startPlayer = players[Math.floor(Math.random() * players.length)].id;
  RS.phase = 'play'; RS.reveal = null;
  RS.showCat = !hideCat && RS.cfg.category !== 'mixed' ? term.cat : null;
  slfHostPush(); // Zustand OHNE Wort verteilen
  players.forEach(p => {
    const card = gset.has(p.id)
      ? { role: 'gharib', hint: giveHint ? term.h : null, cat: hideCat ? null : (RS.cfg.category !== 'mixed' ? term.cat : null) }
      : { role: 'player', word: term.w, cat: RS.cfg.category !== 'mixed' ? term.cat : null };
    OS.gharibCards[p.id] = card;
    OS.net.sendPrivate(p.id, card);
  });
}

function gharibHostReduce(pid, a) {
  const RS = OS.rs;
  switch (a.t) {
    case 'setcfg':
      if (pid !== RS.hostId) return;
      RS.cfg = Object.assign({}, RS.cfg, a.cfg);
      RS.cfg.gharib = Math.max(1, Math.min(RS.cfg.gharib || 1, gharibMaxGharib(RS.players.length)));
      RS.cfg.level = Math.max(1, Math.min(4, RS.cfg.level || 1));
      slfHostPush(); return;
    case 'start':
      if (pid !== RS.hostId) return;
      if (RS.players.length < 3) return;
      gharibDeal(); return;
    case 'reveal':
      if (pid !== RS.hostId || !OS.gTerm) return;
      RS.reveal = { word: OS.gTerm.w, cat: OS.gTerm.cat, n: OS.gTerm.n, gharibs: OS.gGharibs.slice() };
      RS.phase = 'result'; slfHostPush(); return;
    case 'nasiha':
      if (pid !== RS.hostId) return; RS.phase = 'nasiha'; slfHostPush(); return;
    case 'again':
      if (pid !== RS.hostId) return; gharibDeal(); return;
    case 'restart':
      if (pid !== RS.hostId) return;
      RS.phase = 'lobby'; RS.reveal = null; OS.gTerm = null; OS.gGharibs = []; OS.gharibCards = {};
      slfHostPush(); return;
  }
}

/* =================================================================
   Oberflächen
   ================================================================= */
function gharibCatName(id) { const c = CATEGORIES.find(x => x.id === id); return c ? c.name[state.lang] : ''; }

/* Host-Einstellungen im Warteraum (Kategorie, Stufe, Anzahl Gharîb) */
function renderGharibLobbySettings(wrap, RS) {
  const c = RS.cfg;
  const set = (patch) => slfSend({ t: 'setcfg', cfg: patch });

  /* Kategorie – gruppiert */
  const CAT_GROUP = { islam: { de: 'Islam', tr: 'İslami', en: 'Islamic', ar: 'إسلامية' }, daily: { de: 'Alltag & Werte', tr: 'Günlük & değerler', en: 'Everyday & values', ar: 'الحياة والقيم' } };
  const ISLAMIC = ['prophets', 'companions', 'worship', 'quran', 'places', 'akhlaq', 'aqida', 'history'];
  const catBtn = (cat) => h('button', { class: 'cat' + (c.category === cat.id ? ' is-selected' : ''), onclick: () => set({ category: cat.id }) },
    h('span', { class: 'tick', html: UI.check }), h('span', { class: 'ico', html: cat.icon }),
    h('span', { class: 'nm' }, cat.name[state.lang]), h('span', { class: 'cnt' }, TERMS.filter(t => t.cat === cat.id).length + ' ' + T('words_unit')));
  const gI = h('div', { class: 'cat-grid' }); ISLAMIC.forEach(id => { const cat = CATEGORIES.find(x => x.id === id); if (cat) gI.append(catBtn(cat)); });
  const gD = h('div', { class: 'cat-grid' }); CATEGORIES.filter(x => !ISLAMIC.includes(x.id)).forEach(cat => gD.append(catBtn(cat)));
  const mixed = h('button', { class: 'cat mixed' + (c.category === 'mixed' ? ' is-selected' : ''), onclick: () => set({ category: 'mixed' }) },
    h('span', { class: 'ico', html: ICONS.mixed }),
    h('span', {}, h('span', { class: 'nm' }, T('mixed_name')), h('span', { class: 'cnt', style: 'display:block' }, T('mixed_desc') + ' · ' + TERMS.length + ' ' + T('words_unit'))),
    h('span', { class: 'tick', html: UI.check }));
  wrap.append(field('category_label', 'category_hint', ICONS.quran, mixed,
    h('div', { class: 'cat-group' }, CAT_GROUP.islam[state.lang]), gI,
    h('div', { class: 'cat-group' }, CAT_GROUP.daily[state.lang]), gD));

  /* Anzahl Gharîb */
  const mg = gharibMaxGharib(RS.players.length);
  const gVal = h('div', { class: 'value' }, String(Math.min(c.gharib, mg)), h('small', {}, T('gharib_unit')));
  wrap.append(field('gharib_label', null, ICONS.star8,
    h('div', { class: 'stepper' },
      h('button', { 'aria-label': '-', html: UI.minus, disabled: c.gharib <= 1 ? '' : null, onclick: () => set({ gharib: Math.max(1, c.gharib - 1) }) }),
      gVal,
      h('button', { 'aria-label': '+', html: UI.plus, disabled: c.gharib >= mg ? '' : null, onclick: () => set({ gharib: Math.min(mg, c.gharib + 1) }) })),
    h('div', { class: 'hint', style: 'margin-top:.7rem' }, T('gharib_hint', { p: RS.players.length, m: mg }))));

  /* Schwierigkeit */
  const levels = h('div', { class: 'levels' });
  [1, 2, 3, 4].forEach(lv => {
    const pips = h('span', { class: 'pips' }); for (let i = 1; i <= 4; i++) pips.append(h('i', { class: i <= lv ? 'on' : '' }));
    levels.append(h('button', { class: 'level' + (c.level === lv ? ' is-selected' : ''), onclick: () => set({ level: lv }) },
      h('span', { class: 'lv' }, T('level_' + lv), pips), h('span', { class: 'd' }, T('level_' + lv + '_d'))));
  });
  wrap.append(field('level_label', 'level_hint', UI.sparkle, levels));

  const canStart = RS.players.length >= 3;
  wrap.append(h('button', { class: 'btn btn-primary btn-lg btn-block', style: 'margin-top:.4rem', disabled: canStart ? null : '',
    onclick: () => slfSend({ t: 'start' }) }, icon(UI.play), T('start_btn')));
  if (!canStart) wrap.append(h('div', { class: 'hint', style: 'text-align:center;margin-top:.6rem' }, T('warn_players')));
}

/* Runde: eigene Karte am eigenen Handy */
function renderGharibPlay() {
  const RS = OS.rs;
  const isHost = OS.net && OS.net.selfId === RS.hostId;
  const startName = (RS.players.find(p => p.id === RS.startPlayer) || {}).name || '';
  const s = h('section', { class: 'screen deal' });
  const wrap = h('div', { class: 'container', style: 'display:flex;flex-direction:column;align-items:center;justify-content:center;flex:1' });

  if (!OS.myCard) {
    wrap.append(h('div', { class: 'pass' }, h('div', { class: 'give' }, ST('connecting'))));
    s.append(wrap); return s;
  }

  const pass = h('div', { class: 'pass' });
  if (!OS.cardRevealed) {
    pass.append(h('button', { class: 'card card-back', 'aria-label': T('deal_tap'),
      onclick: () => { OS.cardRevealed = true; render(); } },
      h('div', { class: 'frame' }), h('div', { class: 'cb-star', html: ICONS.star8 }),
      h('div', { class: 'cb-tap' }, icon(UI.tap), T('deal_tap'))));
  } else {
    pass.append(gharibCardFace());
  }
  wrap.append(pass);

  // Startspieler-Hinweis + Auflösen (Host)
  const foot = h('div', { style: 'width:100%;max-width:400px;margin-top:1.3rem;text-align:center' });
  if (startName) foot.append(h('div', { class: 'hint', style: 'margin-bottom:.8rem' }, T('round_eyebrow') + ': ' + startName + ' · ' + T('round_desc')));
  if (isHost) foot.append(h('button', { class: 'btn btn-gold btn-lg btn-block', onclick: () => slfSend({ t: 'reveal' }) }, icon(UI.eye), T('reveal_btn')));
  else foot.append(h('div', { class: 'slf-wait' }, ST('waiting_host')));
  wrap.append(foot);
  s.append(wrap);
  return s;
}
function gharibCardFace() {
  const card = OS.myCard;
  const el = h('div', { class: 'card card-face' },
    h('span', { class: 'corner tl', html: UI.corner }), h('span', { class: 'corner br', html: UI.corner }));
  if (card.role === 'gharib') {
    el.append(
      h('span', { class: 'gharib-badge', html: ICONS.star8 }),
      h('div', { class: 'card-word gharib' }, T('deal_gharib_title')),
      h('div', { class: 'card-memorize' }, T('deal_gharib_desc')));
    if (card.cat) el.append(h('div', { class: 'card-hintbox', style: 'margin-top:1rem' }, h('b', {}, T('deal_category') + ': '), gharibCatName(card.cat)));
    if (card.hint) el.append(h('div', { class: 'card-hintbox' }, h('b', {}, T('deal_hint') + ': '), card.hint[state.lang]));
  } else {
    el.append(h('div', { class: 'card-eyebrow' }, icon(UI.eye), T('deal_your_word')));
    el.append(h('div', { class: 'card-word' }, card.word[state.lang]));
    if (card.cat) el.append(h('div', { class: 'card-cat' }, gharibCatName(card.cat)));
    el.append(h('div', { class: 'card-memorize' }, T('deal_memorize')));
  }
  return el;
}

/* Auflösung: Wort + wer war Gharîb */
function renderGharibResult() {
  const RS = OS.rs; const rev = RS.reveal || {};
  const isHost = OS.net && OS.net.selfId === RS.hostId;
  const s = h('section', { class: 'screen reveal' });
  const wrap = h('div', { class: 'container' });
  wrap.append(h('div', { class: 'shead', style: 'justify-content:center' }, h('div', {}, h('h1', {}, T('reveal_title')))));
  wrap.append(h('div', { class: 'reveal-word' },
    h('div', { class: 'lbl' }, T('reveal_the_word')),
    h('div', { class: 'w' }, rev.word ? rev.word[state.lang] : '')));
  const names = h('div', { class: 'names' });
  (rev.gharibs || []).forEach(id => { const p = RS.players.find(x => x.id === id); if (p) names.append(h('span', { class: 'gname' }, p.name)); });
  wrap.append(h('div', { class: 'gharib-reveal' },
    h('div', { class: 'lbl' }, (rev.gharibs || []).length > 1 ? T('reveal_gharib_n') : T('reveal_gharib_1')),
    names));
  if (isHost) wrap.append(h('button', { class: 'btn btn-primary btn-lg btn-block', style: 'margin-top:1.3rem', onclick: () => slfSend({ t: 'nasiha' }) }, icon(UI.book), T('reveal_continue')));
  else wrap.append(h('div', { class: 'slf-wait', style: 'margin-top:1.2rem' }, ST('waiting_host')));
  s.append(wrap);
  return s;
}

/* Nasîha */
function renderGharibNasiha() {
  const RS = OS.rs; const rev = RS.reveal || {};
  const isHost = OS.net && OS.net.selfId === RS.hostId;
  const n = NASIHA[rev.n] || NASIHA[CATEGORY_DEFAULT_NASIHA[rev.cat]] || NASIHA[DEFAULT_NASIHA];
  const isHadith = n.type === 'hadith';
  const s = h('section', { class: 'screen nasiha' });
  const wrap = h('div', { class: 'container' });
  wrap.append(h('div', { class: 'nasiha-head' },
    h('div', { class: 'kicker' }, icon(UI.sparkle), T('nasiha_kicker')),
    h('h2', {}, rev.word ? rev.word[state.lang] : '')));
  const body = h('div', { class: 'body' }, h('div', { class: 'arabic', dir: 'rtl' }, n.ar));
  if (n[state.lang]) body.append(h('div', { class: 'translation' }, n[state.lang]));
  body.append(h('div', { class: 'ref' }, h('span', {}, n.ref), n.grade ? h('span', { class: 'grade' }, '· ' + n.grade) : null));
  wrap.append(h('div', { class: 'scripture' },
    h('div', { class: 'stag' + (isHadith ? ' hadith' : '') }, icon(isHadith ? UI.sparkle : UI.book), T(isHadith ? 'hadith_tag' : 'verse_tag')),
    body));
  wrap.append(h('div', { class: 'nasiha-note' }, T('nasiha_note')));

  const acts = h('div', { class: 'stack', style: 'margin-top:1.4rem' });
  if (isHost) {
    acts.append(h('button', { class: 'btn btn-primary btn-lg btn-block', onclick: () => slfSend({ t: 'again' }) }, icon(UI.refresh), T('nasiha_again')));
    acts.append(h('div', { style: 'display:flex;gap:.6rem' },
      h('button', { class: 'btn btn-ghost btn-block', onclick: () => slfSend({ t: 'restart' }) }, T('nasiha_new')),
      h('button', { class: 'btn btn-ghost btn-block', onclick: slfLeaveOnline }, icon(UI.home), ST('home'))));
  } else {
    acts.append(h('div', { class: 'slf-wait' }, ST('waiting_host')));
    acts.append(h('button', { class: 'btn btn-ghost btn-block', onclick: slfLeaveOnline }, icon(UI.home), ST('home')));
  }
  wrap.append(acts);
  s.append(wrap);
  return s;
}
