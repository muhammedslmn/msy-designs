/* =================================================================
   İsim Şehir — Oberflächen (Online-Räume)
   Rendert rein aus dem synchronisierten Zustand OS.rs.
   ================================================================= */
'use strict';

function slfPlayerLabel(p) {
  let n = p.name || '—';
  if (OS.net && p.id === OS.net.selfId) n += ' (' + ST('you') + ')';
  return n;
}
function slfInviteLink() {
  const base = location.origin + location.pathname;
  let q = '?r=' + OS.rs.code;
  if (typeof detectNetMode === 'function' && detectNetMode() === 'local') q += '&local=1';
  else if (OS.net && OS.net.brokerIndex != null) q += '&b=' + OS.net.brokerIndex; // gleicher Relay für den Gast
  return base + q;
}
function slfCopy() {
  const link = slfInviteLink();
  const done = () => { OS.copied = true; render(); setTimeout(() => { OS.copied = false; if (state.screen === 'online') render(); }, 1600); };
  try { navigator.clipboard.writeText(link).then(done, done); } catch { done(); }
}

/* ---------- Dispatcher ---------- */
function renderOnline() {
  if (!OS.rs) return renderOnlineEntry();
  if (OS.rs.game === 'gharib') {
    switch (OS.rs.phase) {
      case 'play':   return renderGharibPlay();
      case 'result': return renderGharibResult();
      case 'nasiha': return renderGharibNasiha();
      default:       return renderLobby();
    }
  }
  switch (OS.rs.phase) {
    case 'play':   return renderSlfPlay();
    case 'reveal': return renderSlfReveal();
    case 'final':  return renderSlfFinal();
    default:       return renderLobby();
  }
}

/* ---------- Eingang: Name + Erstellen/Beitreten ---------- */
function renderOnlineEntry() {
  if (OS.name === '') OS.name = store.get('slfname', '') || '';
  const slft = SLF_T[state.lang] || SLF_T.de;
  const game = OS.game || (OS.rs && OS.rs.game) || 'slf';
  const meta = OS.joinCode
    ? { title: slft.join, desc: '', mark: ICONS.star8 }
    : (game === 'gharib'
        ? { title: 'Gharîb', desc: T('game_gharib_desc'), mark: ICONS.star8 }
        : { title: slft.title, desc: slft.desc, mark: ICONS.history });
  const s = h('section', { class: 'screen setup' });
  const wrap = h('div', { class: 'container' });
  wrap.append(h('div', { class: 'shead' },
    h('button', { class: 'backbtn', 'aria-label': T('back'), html: UI.back, onclick: () => setScreen('home') }),
    h('div', {}, h('h1', {}, meta.title)),
  ));

  wrap.append(h('div', { class: 'oe-hero' },
    h('span', { class: 'oe-mark', html: meta.mark, 'aria-hidden': 'true' }),
    meta.desc ? h('p', { class: 'oe-desc' }, meta.desc) : null,
  ));

  const nameInp = h('input', { type: 'text', class: 'oe-input', value: OS.name, placeholder: slft.name_ph, maxlength: '16', autocomplete: 'off',
    oninput: (e) => { OS.name = e.target.value; store.set('slfname', e.target.value); const b = document.getElementById('oe-primary'); if (b) b.disabled = !e.target.value.trim(); } });
  wrap.append(h('div', { class: 'field' }, h('div', { class: 'label' }, slft.your_name), nameInp));

  if (OS.error) wrap.append(h('div', { class: 'warn', style: 'margin-bottom:.6rem' }, OS.error));

  if (OS.joinCode) {
    wrap.append(h('button', { id: 'oe-primary', class: 'btn btn-primary btn-lg btn-block', disabled: (OS.busy || !OS.name.trim()) ? '' : null,
      onclick: () => slfJoin(OS.joinCode) }, icon(SLF_IC.users), OS.busy ? slft.connecting : (slft.join + ' · ' + OS.joinCode)));
  } else {
    wrap.append(h('button', { id: 'oe-primary', class: 'btn btn-primary btn-lg btn-block', disabled: (OS.busy || !OS.name.trim()) ? '' : null,
      onclick: slfHostCreate }, icon(SLF_IC.users), OS.busy ? slft.connecting : slft.create));
    wrap.append(h('div', { class: 'oe-or' }, slft.or_join));
    const codeInp = h('input', { type: 'text', class: 'oe-input', placeholder: slft.code_ph, maxlength: '6', style: 'text-transform:uppercase;letter-spacing:.15em;font-weight:700',
      oninput: (e) => { OS.joinTyped = e.target.value; } });
    wrap.append(h('div', { style: 'display:flex;gap:.6rem' }, codeInp,
      h('button', { class: 'btn btn-ghost', style: 'flex:none;padding-inline:1.3rem', onclick: () => slfJoin(OS.joinTyped || '') }, slft.join)));
    if (game === 'gharib') {
      const oneDev = { de: 'Lieber auf einem Gerät (Karte weitergeben)', tr: 'Tek cihazda oyna (kartı elden ele)', en: 'Play on one device (pass the phone)', ar: 'اللعب على جهاز واحد (تمرير الهاتف)' }[state.lang] || '';
      wrap.append(h('button', { class: 'btn btn-ghost btn-block', style: 'margin-top:.9rem', onclick: () => setScreen('setup') }, oneDev));
    }
  }
  s.append(wrap);
  return s;
}

/* ---------- Lobby (Warteraum) ---------- */
function renderLobby() {
  const RS = OS.rs;
  const isHost = OS.net && OS.net.selfId === RS.hostId;
  const s = h('section', { class: 'screen setup' });
  const wrap = h('div', { class: 'container' });
  wrap.append(h('div', { class: 'shead' },
    h('button', { class: 'backbtn', 'aria-label': T('back'), html: UI.back, onclick: slfLeaveOnline }),
    h('div', {}, h('h1', {}, ST('lobby')), h('div', { class: 'sub' }, RS.game === 'gharib' ? 'Gharîb' : ST('title'))),
  ));

  wrap.append(h('div', { class: 'room-card' },
    h('div', { class: 'room-code-label' }, ST('room')),
    h('div', { class: 'room-code' }, RS.code),
    h('button', { class: 'btn btn-soft btn-block', style: 'margin-top:.9rem', onclick: slfCopy }, icon(SLF_IC.copy), OS.copied ? ST('copied') : ST('copy')),
    h('div', { class: 'room-hint' }, ST('host_hint')),
  ));

  const list = h('div', { class: 'lobby-players' });
  if (!RS.players.length) list.append(h('div', { class: 'hint', style: 'text-align:center;padding:.6rem' }, ST('empty_players')));
  RS.players.forEach(p => {
    list.append(h('div', { class: 'lp' + (p.connected === false ? ' off' : '') },
      h('span', { class: 'lp-dot' }),
      h('span', { class: 'lp-name' }, p.name),
      p.id === RS.hostId ? h('span', { class: 'lp-badge', html: SLF_IC.crown, 'aria-hidden': 'true' }) : null,
      (OS.net && p.id === OS.net.selfId) ? h('span', { class: 'lp-you' }, ST('you')) : null,
      p.connected === false ? h('span', { class: 'lp-off' }, ST('offline')) : null,
    ));
  });
  wrap.append(h('div', { class: 'field' },
    h('div', { class: 'label' }, h('span', { html: SLF_IC.users, 'aria-hidden': 'true' }), ST('players') + ' · ' + RS.players.length),
    list));

  if (isHost) {
    if (RS.game === 'gharib') {
      renderGharibLobbySettings(wrap, RS);
    } else {
      const chips = h('div', { class: 'count-chips' });
      [3, 5, 7, 10].forEach(n => chips.append(h('button', { class: 'chip' + (RS.settings.rounds === n ? ' is-selected' : ''),
        onclick: () => { RS.settings.rounds = n; slfHostPush(); } }, String(n))));
      wrap.append(h('div', { class: 'field' }, h('div', { class: 'label' }, ST('rounds')), chips));
      const canStart = RS.players.length >= 2;
      wrap.append(h('button', { class: 'btn btn-primary btn-lg btn-block', disabled: canStart ? null : '',
        onclick: () => slfSend({ t: 'start', rounds: RS.settings.rounds }) }, icon(UI.play), ST('start')));
      if (!canStart) wrap.append(h('div', { class: 'hint', style: 'text-align:center;margin-top:.6rem' }, ST('need2')));
    }
  } else {
    wrap.append(h('div', { class: 'slf-wait' }, ST('waiting_host')));
  }
  s.append(wrap);
  return s;
}

/* ---------- Runde (Antworten eingeben) ---------- */
function renderSlfPlay() {
  const RS = OS.rs;
  if (OS.lastRound !== RS.round) { OS.myAnswers = {}; OS.lastRound = RS.round; OS.autoStopSent = false; OS.focusCat = null; }
  const s = h('section', { class: 'screen slf' });
  const wrap = h('div', { class: 'container' });
  wrap.append(h('div', { class: 'shead' },
    h('button', { class: 'backbtn', 'aria-label': T('back'), html: UI.back, onclick: slfLeaveOnline }),
    h('div', {}, h('h1', {}, ST('round') + ' ' + RS.round + '/' + RS.settings.rounds), h('div', { class: 'sub' }, ST('fill'))),
  ));

  wrap.append(h('div', { class: 'letter-banner' },
    h('div', { class: 'lb-label' }, ST('letter')),
    h('div', { class: 'lb-letter' }, RS.letter),
  ));

  const form = h('div', { class: 'slf-form' });
  SLF_CATS.forEach(cat => {
    const inp = h('input', { type: 'text', class: 'slf-input', value: OS.myAnswers[cat.id] || '', placeholder: RS.letter + '…',
      'data-cat': cat.id, autocomplete: 'off', autocapitalize: 'words', spellcheck: 'false', disabled: RS.stopping ? '' : null,
      oninput: (e) => { OS.myAnswers[cat.id] = e.target.value; slfSendDraft(); },
      onfocus: () => { OS.focusCat = cat.id; } });
    form.append(h('label', { class: 'slf-field' }, h('span', { class: 'slf-cat' }, cat.name[state.lang]), inp));
  });
  wrap.append(form);

  if (RS.stopping) {
    if (!OS.autoStopSent) { OS.autoStopSent = true; slfSendDraft(true); }
    wrap.append(h('div', { class: 'slf-stopping' }, icon(UI.sparkle), ST('stopping')));
  } else {
    wrap.append(h('button', { class: 'btn btn-gold btn-lg btn-block', style: 'margin-top:1.3rem',
      onclick: () => { slfSendDraft(true); slfSend({ t: 'stop' }); } }, icon(UI.check), ST('stop')));
  }
  s.append(wrap);

  if (OS.focusCat) requestAnimationFrame(() => {
    const el = document.querySelector('.slf-input[data-cat="' + OS.focusCat + '"]');
    if (el && document.activeElement !== el) { const v = el.value; el.focus(); try { el.setSelectionRange(v.length, v.length); } catch {} }
  });
  return s;
}

/* ---------- Auflösung ---------- */
function renderSlfReveal() {
  const RS = OS.rs;
  const rev = RS.reveal || { byCat: {}, roundPoints: {} };
  const isHost = OS.net && OS.net.selfId === RS.hostId;
  const s = h('section', { class: 'screen slf' });
  const wrap = h('div', { class: 'container' });
  wrap.append(h('div', { class: 'shead' },
    h('div', {}, h('h1', {}, ST('reveal')), h('div', { class: 'sub' }, ST('letter') + ': ' + RS.letter + ' · ' + ST('round') + ' ' + RS.round + '/' + RS.settings.rounds)),
  ));

  // Punktetabelle
  const board = [...RS.players].sort((a, b) => (RS.totals[b.id] || 0) - (RS.totals[a.id] || 0));
  const sb = h('div', { class: 'scoreboard' });
  board.forEach(p => sb.append(h('div', { class: 'sb-row' },
    h('span', { class: 'sb-name' }, slfPlayerLabel(p)),
    h('span', { class: 'sb-round' }, '+' + (rev.roundPoints[p.id] || 0)),
    h('span', { class: 'sb-total' }, String(RS.totals[p.id] || 0)),
  )));
  wrap.append(h('div', { class: 'field' },
    h('div', { class: 'sb-head' }, h('span', {}, ST('players')), h('span', {}, ST('roundpts')), h('span', {}, ST('totalpts'))),
    sb));

  // je Kategorie
  RS.cats.forEach(catId => {
    const entries = rev.byCat[catId] || [];
    const card = h('div', { class: 'rev-cat' });
    card.append(h('div', { class: 'rev-cat-h' }, slfCatName(catId)));
    entries.forEach(e => {
      const p = RS.players.find(x => x.id === e.pid); if (!p) return;
      const row = h('div', { class: 'rev-row' + (e.valid ? '' : ' bad') },
        h('span', { class: 'rev-player' }, p.name),
        h('span', { class: 'rev-ans' }, e.answer ? e.answer : ST('empty'), (!e.valid && e.answer) ? h('span', { class: 'rev-x' }, ' · ' + ST('invalid_note')) : null),
        h('span', { class: 'rev-pts p' + e.points }, e.points ? ('+' + e.points) : '0'),
      );
      if (isHost && e.answer) {
        const flagged = OS.invalid.has(catId + '|' + e.pid);
        row.append(h('button', { class: 'rev-flag' + (flagged ? ' on' : ''), 'aria-label': flagged ? ST('mark_valid') : ST('mark_invalid'),
          onclick: () => slfSend({ t: 'objection', cat: catId, pid: e.pid }) }, flagged ? '↺' : '✕'));
      }
      card.append(row);
    });
    wrap.append(card);
  });

  if (isHost) {
    const last = RS.round >= RS.settings.rounds;
    wrap.append(h('button', { class: 'btn btn-primary btn-lg btn-block', style: 'margin-top:1.3rem',
      onclick: () => slfSend({ t: 'next' }) }, icon(last ? UI.award : UI.play), ST(last ? 'to_result' : 'next_round')));
  } else {
    wrap.append(h('div', { class: 'slf-wait', style: 'margin-top:1.2rem' }, ST('waiting_host')));
  }
  s.append(wrap);
  return s;
}

/* ---------- Endstand ---------- */
function renderSlfFinal() {
  const RS = OS.rs;
  const isHost = OS.net && OS.net.selfId === RS.hostId;
  const board = [...RS.players].sort((a, b) => (RS.totals[b.id] || 0) - (RS.totals[a.id] || 0));
  const s = h('section', { class: 'screen slf' });
  const wrap = h('div', { class: 'container', style: 'text-align:center' });
  wrap.append(h('div', { class: 'shead', style: 'justify-content:center' }, h('div', {}, h('h1', {}, ST('final')))));

  if (board[0]) {
    wrap.append(h('div', { class: 'winner-card' },
      h('span', { class: 'winner-crown', html: SLF_IC.crown, 'aria-hidden': 'true' }),
      h('div', { class: 'winner-name' }, board[0].name),
      h('div', { class: 'winner-pts' }, (RS.totals[board[0].id] || 0) + ' · ' + ST('totalpts')),
    ));
  }
  const rank = h('div', { class: 'ranking' });
  board.forEach((p, i) => rank.append(h('div', { class: 'rank-row' + (i === 0 ? ' first' : '') },
    h('span', { class: 'rank-n' }, String(i + 1)),
    h('span', { class: 'rank-name' }, slfPlayerLabel(p)),
    h('span', { class: 'rank-pts' }, String(RS.totals[p.id] || 0)),
  )));
  wrap.append(rank);

  wrap.append(h('div', { class: 'stack', style: 'margin-top:1.6rem' },
    isHost ? h('button', { class: 'btn btn-primary btn-lg btn-block', onclick: () => slfSend({ t: 'restart' }) }, icon(UI.refresh), ST('again')) : null,
    h('button', { class: 'btn btn-ghost btn-block', onclick: slfLeaveOnline }, icon(UI.home), ST('home')),
  ));
  s.append(wrap);
  return s;
}
