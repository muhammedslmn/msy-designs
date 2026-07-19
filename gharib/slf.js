/* =================================================================
   İsim Şehir (Stadt-Land-Fluss) — Online-Mehrspieler
   Nutzt net.js (RoomNet, host-autoritativ). Host rechnet die Punkte,
   private Antworten werden erst bei der Auflösung sichtbar.
   ================================================================= */
'use strict';

/* ---------- Kategorien (9 Eingabe + „Punkte" berechnet) ---------- */
const SLF_CATS = [
  { id: 'name',  name: { de:'Name',        tr:'İsim',   en:'Name',    ar:'اسم' } },
  { id: 'land',  name: { de:'Land',        tr:'Ülke',   en:'Country', ar:'دولة' } },
  { id: 'stadt', name: { de:'Stadt',       tr:'Şehir',  en:'City',    ar:'مدينة' } },
  { id: 'ding',  name: { de:'Gegenstand',  tr:'Eşya',   en:'Object',  ar:'شيء' } },
  { id: 'beruf', name: { de:'Beruf',       tr:'Meslek', en:'Profession', ar:'مهنة' } },
  { id: 'tier',  name: { de:'Tier',        tr:'Hayvan', en:'Animal',  ar:'حيوان' } },
  { id: 'food',  name: { de:'Obst & Gemüse', tr:'Meyve & sebze', en:'Fruit & veg', ar:'فاكهة وخضار' } },
  { id: 'islam', name: { de:'Islamische Persönlichkeit', tr:'İslami şahsiyet', en:'Islamic figure', ar:'شخصية إسلامية' } },
  { id: 'marke', name: { de:'Marke',       tr:'Marka',  en:'Brand',   ar:'ماركة' } },
];
const SLF_LETTERS = 'ABCDEFGHIKLMNOPRSTUVZ'.split(''); // gut spielbare Buchstaben
const SLF_POINTS_LABEL = { de:'Punkte', tr:'Puan', en:'Points', ar:'نقاط' };

/* ---------- Oberflächen-Texte (4 Sprachen) ---------- */
const SLF_T = {
  de: {
    title:'Stadt-Land-Fluss', desc:'Ein gemeinsamer Buchstabe – findet zu jeder Kategorie ein passendes Wort. Online, jeder am eigenen Handy.',
    your_name:'Dein Name', name_ph:'Name eingeben', create:'Raum erstellen', join:'Raum beitreten', code_ph:'Raum-Code',
    or_join:'…oder mit Code beitreten', room:'Raum', invite:'Einladungslink', copy:'Link kopieren', copied:'Kopiert!',
    lobby:'Warteraum', players:'Spieler', host:'Host', you:'du', waiting_host:'Warte, bis der Host startet …',
    rounds:'Runden', start:'Spiel starten', need2:'Mindestens 2 Spieler zum Starten.',
    round:'Runde', letter:'Buchstabe', fill:'Fülle die Kategorien mit diesem Buchstaben.', stop:'Stopp – fertig!',
    stopping:'Runde wird beendet …', submitted:'Deine Antworten sind eingereicht. Warte auf die Auflösung …',
    reveal:'Auflösung', roundpts:'Rundenpunkte', totalpts:'Gesamt', next_round:'Nächste Runde', to_result:'Endergebnis',
    empty:'—', mark_invalid:'Als ungültig werten', mark_valid:'Wieder gültig', invalid_note:'ungültig',
    final:'Endstand', winner:'Sieger', again:'Nochmal spielen', home:'Startseite',
    connecting:'Verbinde …', conn_error:'Verbindung fehlgeschlagen. Prüfe den Code/Link und versuche es erneut.',
    left:'hat den Raum verlassen', offline:'offline', host_hint:'Teile den Link – Freunde treten von ihrem Handy bei.',
    empty_players:'Noch niemand da. Teile den Link!', enter_name_first:'Bitte zuerst einen Namen eingeben.',
  },
  tr: {
    title:'İsim Şehir', desc:'Ortak bir harf – her kategoriye uygun bir kelime bulun. Çevrim içi, herkes kendi telefonunda.',
    your_name:'Adın', name_ph:'İsmini yaz', create:'Oda oluştur', join:'Odaya katıl', code_ph:'Oda kodu',
    or_join:'…veya kodla katıl', room:'Oda', invite:'Davet bağlantısı', copy:'Bağlantıyı kopyala', copied:'Kopyalandı!',
    lobby:'Bekleme odası', players:'Oyuncular', host:'Kurucu', you:'sen', waiting_host:'Kurucunun başlatması bekleniyor …',
    rounds:'Tur sayısı', start:'Oyunu başlat', need2:'Başlamak için en az 2 oyuncu.',
    round:'Tur', letter:'Harf', fill:'Bu harfle kategorileri doldur.', stop:'Stop – bitti!',
    stopping:'Tur bitiriliyor …', submitted:'Cevapların gönderildi. Sonucu bekle …',
    reveal:'Sonuç', roundpts:'Tur puanı', totalpts:'Toplam', next_round:'Sonraki tur', to_result:'Genel sonuç',
    empty:'—', mark_invalid:'Geçersiz say', mark_valid:'Tekrar geçerli', invalid_note:'geçersiz',
    final:'Genel sıralama', winner:'Kazanan', again:'Tekrar oyna', home:'Ana sayfa',
    connecting:'Bağlanıyor …', conn_error:'Bağlantı başarısız. Kodu/bağlantıyı kontrol edip tekrar dene.',
    left:'odadan ayrıldı', offline:'çevrim dışı', host_hint:'Bağlantıyı paylaş – arkadaşların kendi telefonundan katılır.',
    empty_players:'Henüz kimse yok. Bağlantıyı paylaş!', enter_name_first:'Lütfen önce bir isim yaz.',
  },
  en: {
    title:'City–Country–River', desc:'One shared letter – find a fitting word for each category. Online, everyone on their own phone.',
    your_name:'Your name', name_ph:'Enter your name', create:'Create room', join:'Join room', code_ph:'Room code',
    or_join:'…or join with a code', room:'Room', invite:'Invite link', copy:'Copy link', copied:'Copied!',
    lobby:'Waiting room', players:'Players', host:'Host', you:'you', waiting_host:'Waiting for the host to start …',
    rounds:'Rounds', start:'Start game', need2:'At least 2 players to start.',
    round:'Round', letter:'Letter', fill:'Fill the categories with this letter.', stop:'Stop – done!',
    stopping:'Ending the round …', submitted:'Your answers are in. Waiting for the reveal …',
    reveal:'Reveal', roundpts:'Round points', totalpts:'Total', next_round:'Next round', to_result:'Final result',
    empty:'—', mark_invalid:'Mark invalid', mark_valid:'Make valid again', invalid_note:'invalid',
    final:'Final standings', winner:'Winner', again:'Play again', home:'Home',
    connecting:'Connecting …', conn_error:'Connection failed. Check the code/link and try again.',
    left:'left the room', offline:'offline', host_hint:'Share the link – friends join from their phones.',
    empty_players:'Nobody here yet. Share the link!', enter_name_first:'Please enter a name first.',
  },
  ar: {
    title:'مدينة وبلد', desc:'حرف مشترك – جِد كلمة مناسبة لكل فئة. عبر الإنترنت، كلٌّ على هاتفه.',
    your_name:'اسمك', name_ph:'اكتب اسمك', create:'إنشاء غرفة', join:'انضمّ للغرفة', code_ph:'رمز الغرفة',
    or_join:'…أو انضمّ برمز', room:'الغرفة', invite:'رابط الدعوة', copy:'انسخ الرابط', copied:'تم النسخ!',
    lobby:'غرفة الانتظار', players:'اللاعبون', host:'المضيف', you:'أنت', waiting_host:'بانتظار أن يبدأ المضيف …',
    rounds:'الجولات', start:'ابدأ اللعبة', need2:'لاعبان على الأقل للبدء.',
    round:'جولة', letter:'الحرف', fill:'املأ الفئات بهذا الحرف.', stop:'إيقاف – انتهيت!',
    stopping:'يتم إنهاء الجولة …', submitted:'تم إرسال إجاباتك. بانتظار الكشف …',
    reveal:'الكشف', roundpts:'نقاط الجولة', totalpts:'المجموع', next_round:'الجولة التالية', to_result:'النتيجة النهائية',
    empty:'—', mark_invalid:'اعتبرها غير صحيحة', mark_valid:'صحيحة من جديد', invalid_note:'غير صحيحة',
    final:'الترتيب النهائي', winner:'الفائز', again:'العب مرة أخرى', home:'الرئيسية',
    connecting:'جارٍ الاتصال …', conn_error:'فشل الاتصال. تحقّق من الرمز/الرابط وحاول مجددًا.',
    left:'غادر الغرفة', offline:'غير متصل', host_hint:'شارك الرابط – ينضمّ أصدقاؤك من هواتفهم.',
    empty_players:'لا أحد بعد. شارك الرابط!', enter_name_first:'اكتب اسمًا أولًا من فضلك.',
  },
};
const ST = (k) => (SLF_T[state.lang] || SLF_T.de)[k];
const slfCatName = (id) => { const c = SLF_CATS.find(x => x.id === id); return c ? c.name[state.lang] : id; };

/* kleine Icons (nicht-figürlich) */
const SLF_IC = {
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/></svg>',
  users:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><circle cx="9" cy="8" r="3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><path d="M16 5.5a3 3 0 0 1 0 5.8M20.5 19a5.5 5.5 0 0 0-4-5.3"/></svg>',
  crown:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 8l4 3 5-6 5 6 4-3-2 11H5z"/></svg>',
};

/* =================================================================
   Reine Punktelogik (unit-testbar)
   ================================================================= */
function slfNorm(s) {
  return (s == null ? '' : String(s)).trim().toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')  // Diakritika entfernen (İ, é …)
    .replace(/\s+/g, ' ');
}
// answersByPlayer: { pid: {catId: text} } · players: [{id}] · invalid: Set("catId|pid")
function slfScore(answersByPlayer, players, cats, letter, invalid) {
  invalid = invalid || new Set();
  const letterNorm = slfNorm(letter);
  const byCat = {}, roundPoints = {};
  players.forEach(p => roundPoints[p.id] = 0);
  cats.forEach(cat => {
    const entries = players.map(p => {
      const raw = ((answersByPlayer[p.id] || {})[cat] || '');
      const norm = slfNorm(raw);
      const startsOk = norm && letterNorm && norm.startsWith(letterNorm);
      const flagged = invalid.has(cat + '|' + p.id);
      const valid = !!(norm && startsOk && !flagged);
      return { pid: p.id, answer: raw, norm, valid, points: 0, flagged: invalid.has(cat + '|' + p.id) };
    });
    const valids = entries.filter(e => e.valid);
    if (valids.length === 1) {
      valids[0].points = 15;                                   // nur einer hat geantwortet
    } else if (valids.length >= 2) {
      const counts = {};
      valids.forEach(e => counts[e.norm] = (counts[e.norm] || 0) + 1);
      valids.forEach(e => e.points = counts[e.norm] >= 2 ? 5 : 10); // gleich → 5, einzigartig → 10
    }
    entries.forEach(e => roundPoints[e.pid] += e.points);
    byCat[cat] = entries;
  });
  return { byCat, roundPoints };
}
function slfAddMaps(a, b) { const r = { ...a }; for (const k in b) r[k] = (r[k] || 0) + b[k]; return r; }

// Für Node-Unit-Tests:
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { slfNorm, slfScore, slfAddMaps, SLF_CATS };
}

/* =================================================================
   Online-Zustand & Host-Logik
   ================================================================= */
const OS = {
  net: null, role: null, rs: null, name: '', joinCode: '', view: 'entry',
  myAnswers: {}, invalid: new Set(), totalsBase: {}, lastSeen: {}, reaper: null,
  draftTimer: null, error: '', busy: false, copied: false,
};

function slfInitialRS(code, hostId, hostName) {
  return {
    code, hostId, hostName, game: 'slf', phase: 'lobby',
    players: [], settings: { rounds: 5 },
    round: 0, letter: null, cats: SLF_CATS.map(c => c.id),
    stopBy: null, stopping: false, reveal: null, totals: {},
  };
}

function slfHostPush() { if (OS.net) OS.net.setState(OS.rs); }

function slfHostAddPlayer(pid, name) {
  const ex = OS.rs.players.find(p => p.id === pid);
  if (ex) { ex.name = name || ex.name; ex.connected = true; }
  else { OS.rs.players.push({ id: pid, name: name || 'Spieler', connected: true }); if (!(pid in OS.rs.totals)) OS.rs.totals[pid] = 0; }
  OS.lastSeen[pid] = Date.now();
  slfHostPush();
}

function slfHostReduce(pid, a) {
  const RS = OS.rs;
  if (a.t === '_ping') {
    OS.lastSeen[pid] = Date.now();
    const p = RS.players.find(x => x.id === pid); if (p && !p.connected) { p.connected = true; slfHostPush(); }
    return;
  }
  if (RS.game === 'gharib') return gharibHostReduce(pid, a);
  switch (a.t) {
    case 'draft':
      OS.hostAnswers = OS.hostAnswers || {};
      OS.hostAnswers[pid] = a.answers || {};
      return; // NICHT broadcasten (privat bis zur Auflösung)
    case 'start':
      if (pid !== RS.hostId) return;
      RS.settings.rounds = Math.max(1, Math.min(15, a.rounds || 5));
      if (RS.players.length < 2) return;
      slfBeginRound(1); return;
    case 'stop':
      if (RS.phase !== 'play' || RS.stopping) return;
      RS.stopping = true; RS.stopBy = pid; slfHostPush();
      setTimeout(() => slfDoReveal(), 650); return;
    case 'objection':
      { const key = a.cat + '|' + a.pid; if (OS.invalid.has(key)) OS.invalid.delete(key); else OS.invalid.add(key); slfRecompute(); }
      return;
    case 'next':
      if (pid !== RS.hostId) return;
      if (RS.round < RS.settings.rounds) slfBeginRound(RS.round + 1);
      else { RS.phase = 'final'; slfHostPush(); }
      return;
    case 'restart':
      if (pid !== RS.hostId) return;
      RS.round = 0; RS.totals = {}; RS.players.forEach(p => RS.totals[p.id] = 0);
      RS.phase = 'lobby'; RS.reveal = null; RS.stopBy = null; RS.stopping = false;
      slfHostPush(); return;
  }
}
function slfBeginRound(n) {
  const RS = OS.rs;
  RS.round = n;
  RS.letter = SLF_LETTERS[Math.floor(Math.random() * SLF_LETTERS.length)];
  RS.phase = 'play'; RS.stopBy = null; RS.stopping = false; RS.reveal = null;
  OS.hostAnswers = {}; OS.invalid = new Set();
  OS.totalsBase = { ...RS.totals };
  OS.myAnswers = {};
  slfHostPush();
}
function slfDoReveal() {
  const RS = OS.rs;
  slfRecompute();
  RS.phase = 'reveal';
  slfHostPush();
}
function slfRecompute() {
  const RS = OS.rs;
  const res = slfScore(OS.hostAnswers || {}, RS.players, RS.cats, RS.letter, OS.invalid);
  // ungültige Markierungen mitschicken (Anzeige)
  RS.reveal = { byCat: res.byCat, roundPoints: res.roundPoints };
  RS.totals = slfAddMaps(OS.totalsBase, res.roundPoints);
  if (RS.phase === 'reveal') slfHostPush();
}

/* Host: Präsenz-Wächter (offline nach ~13s ohne Ping) */
function slfStartReaper() {
  if (OS.reaper) clearInterval(OS.reaper);
  OS.reaper = setInterval(() => {
    if (!OS.rs) return;
    let changed = false;
    OS.rs.players.forEach(p => {
      if (p.id === OS.rs.hostId) return;
      const seen = OS.lastSeen[p.id] || 0;
      const off = Date.now() - seen > 13000;
      if (off && p.connected) { p.connected = false; changed = true; }
    });
    if (changed) slfHostPush();
  }, 3000);
}

/* ---------- Verbindungsaufbau ---------- */
function slfWireCommon(net) {
  net.on('state', (rs) => { OS.rs = rs; if (state.screen !== 'online') setScreen('online'); else render(); });
  net.on('private', (d) => { OS.myCard = d; OS.cardRevealed = false; if (state.screen === 'online') render(); });
  net.on('neterror', () => {});
}
async function slfHostCreate() {
  if (!OS.name.trim()) { OS.error = ST('enter_name_first'); render(); return; }
  OS.busy = true; OS.error = ''; render();
  try {
    OS.role = 'host'; OS.net = new RoomNet(detectNetMode());
    OS.net.on('join', (pid, name) => {
      slfHostAddPlayer(pid, name);
      // Karte bei Wiederbeitritt erneut privat senden (Gharîb)
      if (OS.rs.game === 'gharib' && OS.rs.phase === 'play' && OS.gharibCards && OS.gharibCards[pid]) OS.net.sendPrivate(pid, OS.gharibCards[pid]);
    });
    OS.net.on('leave', (pid) => { const p = OS.rs.players.find(x => x.id === pid); if (p) { p.connected = false; slfHostPush(); } });
    OS.net.on('action', (pid, action) => slfHostReduce(pid, action));
    slfWireCommon(OS.net);
    const code = await OS.net.host();
    OS.rs = (OS.game === 'gharib') ? gharibInitialRS(code, OS.net.selfId, OS.name.trim()) : slfInitialRS(code, OS.net.selfId, OS.name.trim());
    OS.rs.players.push({ id: OS.net.selfId, name: OS.name.trim(), connected: true });
    if (OS.rs.totals) OS.rs.totals[OS.net.selfId] = 0;
    slfStartReaper();
    OS.busy = false;
    OS.net.setState(OS.rs);
  } catch (e) { OS.busy = false; OS.error = ST('conn_error'); render(); }
}
async function slfJoin(code) {
  if (!OS.name.trim()) { OS.error = ST('enter_name_first'); render(); return; }
  if (!code) return;
  OS.busy = true; OS.error = ''; render();
  try {
    OS.role = 'client'; OS.net = new RoomNet(detectNetMode(), netJoinBroker());
    slfWireCommon(OS.net);
    OS.net.on('disconnected', () => { OS.error = ST('conn_error'); render(); });
    await OS.net.join(code.toUpperCase().trim(), OS.name.trim());
    OS.busy = false;
  } catch (e) { OS.busy = false; OS.error = ST('conn_error'); render(); }
}
function slfSend(action) { if (OS.net) OS.net.send(action); }
function slfLeaveOnline() {
  try { if (OS.reaper) clearInterval(OS.reaper); if (OS.net) OS.net.leave(); } catch {}
  OS.net = null; OS.rs = null; OS.role = null; OS.myAnswers = {}; OS.error = '';
  setScreen('home');
}

/* ---------- Draft senden (privat an den Host) ---------- */
function slfSendDraft(immediate) {
  const go = () => slfSend({ t: 'draft', answers: { ...OS.myAnswers } });
  if (immediate) { go(); return; }
  clearTimeout(OS.draftTimer); OS.draftTimer = setTimeout(go, 300);
}

/* ---------- URL-Beitritt (?r=CODE) ---------- */
function slfCheckInviteURL() {
  try {
    const r = new URLSearchParams(location.search).get('r');
    if (r) { OS.joinCode = r.toUpperCase(); OS.view = 'entry'; state.screen = 'online'; return true; }
  } catch {}
  return false;
}
