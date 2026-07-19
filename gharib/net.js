/* =================================================================
   Gharîb — Echtzeit-Schicht (Online-Räume, host-autoritativ)
   Zwei Transporte hinter EINER Schnittstelle:
     · 'peer'  → PeerJS (echte Geräte, per Link, ohne Konto/Server)
     · 'local' → BroadcastChannel (mehrere Tabs, für Tests/gleiches Gerät)
   Der Host hält den maßgeblichen Zustand und sendet ihn an alle.
   Private Daten (z. B. Gharîb-Karten) gehen gezielt an einen Spieler.
   ================================================================= */
'use strict';

const NET_NS = 'gharibv1-'; // Namensraum für Peer-IDs
const RECONNECT_KEY = 'gharib_client';

function netCode(n = 4) {
  const A = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // ohne verwechselbare Zeichen
  let s = ''; for (let i = 0; i < n; i++) s += A[Math.floor(Math.random() * A.length)];
  return s;
}
function netId() {
  // stabile Client-ID (überlebt Reload → Wiederbeitritt)
  try {
    let id = sessionStorage.getItem(RECONNECT_KEY);
    if (!id) { id = 'u' + Math.random().toString(36).slice(2, 11); sessionStorage.setItem(RECONNECT_KEY, id); }
    return id;
  } catch { return 'u' + Math.random().toString(36).slice(2, 11); }
}

/* ---------------- Transport: BroadcastChannel (lokal) ---------------- */
class LocalTransport {
  constructor(code) { this.code = code; this.ch = new BroadcastChannel('ghrb_' + code); this.isHost = false; this.cbs = {}; }
  on(ev, cb) { this.cbs[ev] = cb; return this; }
  _emit(ev, ...a) { if (this.cbs[ev]) this.cbs[ev](...a); }
  _post(obj) { this.ch.postMessage(obj); }

  hostStart() {
    this.isHost = true;
    this.ch.onmessage = (e) => {
      const m = e.data;
      if (m.to !== 'host') return;               // nur an den Host gerichtete Nachrichten
      if (m.kind === 'join') this._emit('open', m.from);
      this._emit('message', m.from, m);
    };
    return Promise.resolve();
  }
  clientStart() {
    this.ch.onmessage = (e) => {
      const m = e.data;
      if (m.to !== '*' && m.to !== this.selfId) return;
      this._emit('message', m);
    };
    return Promise.resolve();
  }
  // Host → alle
  broadcast(obj) { this._post({ from: 'host', to: '*', ...obj }); }
  // Host → ein Spieler
  sendTo(key, obj) { this._post({ from: 'host', to: key, ...obj }); }
  // Client → Host
  send(obj) { this._post({ from: this.selfId, to: 'host', ...obj }); }
  close() { try { this.ch.close(); } catch {} }
}

/* ---------------- Transport: PeerJS (echte Geräte) ---------------- */
class PeerTransport {
  constructor(code) { this.code = code; this.cbs = {}; this.conns = new Map(); this.peer = null; this.hostConn = null; }
  on(ev, cb) { this.cbs[ev] = cb; return this; }
  _emit(ev, ...a) { if (this.cbs[ev]) this.cbs[ev](...a); }

  hostStart() {
    return new Promise((resolve, reject) => {
      if (typeof Peer === 'undefined') return reject(new Error('PeerJS nicht geladen'));
      this.peer = new Peer(NET_NS + this.code, { debug: 0 });
      const to = setTimeout(() => reject(new Error('Zeitüberschreitung beim Erstellen')), 15000);
      this.peer.on('open', () => { clearTimeout(to); resolve(); });
      this.peer.on('error', (err) => { this._emit('neterror', err); if (String(err).includes('unavailable-id')) { clearTimeout(to); reject(err); } });
      this.peer.on('connection', (conn) => {
        conn.on('open', () => { this.conns.set(conn.peer, conn); this._emit('open', conn.peer); });
        conn.on('data', (d) => this._emit('message', conn.peer, d));
        conn.on('close', () => { this.conns.delete(conn.peer); this._emit('close', conn.peer); });
        conn.on('error', () => {});
      });
    });
  }
  clientStart() {
    return new Promise((resolve, reject) => {
      if (typeof Peer === 'undefined') return reject(new Error('PeerJS nicht geladen'));
      this.peer = new Peer({ debug: 0 });
      const to = setTimeout(() => reject(new Error('Zeitüberschreitung beim Beitreten')), 15000);
      this.peer.on('open', () => {
        const conn = this.peer.connect(NET_NS + this.code, { reliable: true });
        this.hostConn = conn;
        conn.on('open', () => { clearTimeout(to); resolve(); });
        conn.on('data', (d) => this._emit('message', d));
        conn.on('close', () => this._emit('disconnected'));
        conn.on('error', (err) => { clearTimeout(to); reject(err); });
      });
      this.peer.on('error', (err) => { clearTimeout(to); this._emit('neterror', err); reject(err); });
    });
  }
  broadcast(obj) { this.conns.forEach((c) => { try { c.send(obj); } catch {} }); }
  sendTo(key, obj) { const c = this.conns.get(key); if (c) { try { c.send(obj); } catch {} } }
  send(obj) { if (this.hostConn) { try { this.hostConn.send(obj); } catch {} } }
  close() { try { this.conns.forEach(c => c.close()); if (this.peer) this.peer.destroy(); } catch {} }
}

/* ---------------- RoomNet (Protokoll über dem Transport) ---------------- */
class RoomNet {
  constructor(mode) {
    this.mode = mode || 'peer';
    this.selfId = netId();
    this.isHost = false;
    this.code = null;
    this.transport = null;
    this.keyToPlayer = new Map(); // Transport-Kanal → Spieler-ID (nur Host)
    this.playerToKey = new Map();
    this.handlers = { state: [], action: [], join: [], leave: [], private: [], disconnected: [], neterror: [] };
    this.lastState = null;
    this._selfName = null;
  }
  on(ev, cb) { (this.handlers[ev] || (this.handlers[ev] = [])).push(cb); return this; }
  _emit(ev, ...a) { (this.handlers[ev] || []).forEach(cb => cb(...a)); }
  _mk(code) { return this.mode === 'local' ? new LocalTransport(code) : new PeerTransport(code); }

  /* ---- Host ---- */
  async host(code) {
    this.code = code || netCode();
    this.isHost = true;
    this.transport = this._mk(this.code);
    this.transport.selfId = 'host';
    this.transport.on('neterror', (e) => this._emit('neterror', e));
    this.transport.on('open', (key) => { /* auf join warten */ });
    this.transport.on('close', (key) => {
      const pid = this.keyToPlayer.get(key);
      if (pid) { this.keyToPlayer.delete(key); this.playerToKey.delete(pid); this._emit('leave', pid); }
    });
    this.transport.on('message', (key, m) => {
      if (m.kind === 'join') {
        this.keyToPlayer.set(key, m.id); this.playerToKey.set(m.id, key);
        this._emit('join', m.id, m.name);
        if (this.lastState) this.transport.sendTo(key, { kind: 'state', state: this.lastState });
      } else if (m.kind === 'action') {
        const pid = this.keyToPlayer.get(key) || m.id;
        this._emit('action', pid, m.action);
      } else if (m.kind === 'ping') {
        const pid = this.keyToPlayer.get(key); if (pid) this._emit('action', pid, { t: '_ping' });
      }
    });
    await this.transport.hostStart();
    return this.code;
  }
  // Host: neuen Zustand setzen → an alle senden + lokal melden
  setState(state) { this.lastState = state; if (this.transport) this.transport.broadcast({ kind: 'state', state }); this._emit('state', state); }
  sendPrivate(playerId, data) {
    if (playerId === this.selfId) { this._emit('private', data); return; }
    const key = this.playerToKey.get(playerId); if (key) this.transport.sendTo(key, { kind: 'private', data });
  }

  /* ---- Client ---- */
  async join(code, name) {
    this.code = code; this.isHost = false; this._selfName = name;
    this.transport = this._mk(code);
    this.transport.selfId = this.selfId;
    this.transport.on('neterror', (e) => this._emit('neterror', e));
    this.transport.on('message', (m) => {
      if (m.kind === 'state') { this.lastState = m.state; this._emit('state', m.state); }
      else if (m.kind === 'private') this._emit('private', m.data);
    });
    this.transport.on('disconnected', () => this._emit('disconnected'));
    await this.transport.clientStart();
    this.transport.send({ kind: 'join', id: this.selfId, name });
    // Heartbeat (Präsenz)
    this._hb = setInterval(() => { try { this.transport.send({ kind: 'ping', id: this.selfId }); } catch {} }, 4000);
    return true;
  }
  // Client: Aktion an den Host
  send(action) {
    if (this.isHost) { this._emit('action', this.selfId, action); return; } // Host handelt lokal
    if (this.transport) this.transport.send({ kind: 'action', id: this.selfId, action });
  }
  leave() { try { if (this._hb) clearInterval(this._hb); if (this.transport) this.transport.close(); } catch {} }
}

// Modus automatisch wählen.
//  · ?local=1                → BroadcastChannel (Tests / gleiches Gerät)
//  · eingebettet (Artifact)  → BroadcastChannel (externe Verbindungen dort gesperrt)
//  · eigene Adresse (Hosting)→ PeerJS (echt geräteübergreifend, per Link)
function detectNetMode() {
  try {
    if (new URLSearchParams(location.search).get('local')) return 'local';
    if (window.self !== window.top) return 'local';
    if (/claude\.ai|claudeusercontent|anthropic|\.usercontent\./i.test(location.hostname)) return 'local';
    return 'peer';
  } catch { return 'peer'; }
}
