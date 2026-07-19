/* =================================================================
   Gharîb — Echtzeit-Schicht (Online-Räume, host-autoritativ)
   Zwei Transporte hinter EINER Schnittstelle:
     · 'net'   → MQTT über WebSocket (echte Geräte, per Link, ohne Konto)
                 Reine Relay-Verbindung: jedes Handy baut nur eine
                 ausgehende WSS-Verbindung auf → funktioniert hinter
                 jedem NAT/Firewall (Mobilfunk, WLAN), ohne TURN.
     · 'local' → BroadcastChannel (mehrere Tabs, für Tests/gleiches Gerät)
   Der Host hält den maßgeblichen Zustand und sendet ihn an alle.
   Private Daten (z. B. Gharîb-Karten) gehen gezielt an einen Spieler.
   ================================================================= */
'use strict';

const NET_NS = 'gharibv1-'; // Namensraum für Raum-IDs
const RECONNECT_KEY = 'gharib_client';

// Öffentliche MQTT-Relays (kostenlos, ohne Konto). Der Host probiert sie der
// Reihe nach durch und nimmt den ersten, der antwortet; der gewählte Index
// wandert in den Einladungslink (&b=…), damit der Gast denselben Relay nutzt.
// So klappt es auch, wenn in einem Netz ein einzelner Relay-Port gesperrt ist.
const MQTT_BROKERS = [
  'wss://broker.emqx.io:8084/mqtt',
  'wss://broker.hivemq.com:8884/mqtt',
  'wss://test.mosquitto.org:8081/mqtt',
];
// Für lokale Tests per ?broker=ws://… erzwingbar (überschreibt die Liste).
function netBrokerOverride() {
  try { return new URLSearchParams(location.search).get('broker') || null; } catch { return null; }
}
// Relay-Liste, die eine Instanz durchprobiert.
function netBrokerList(explicit) {
  const ov = netBrokerOverride();
  if (ov) return [ov];
  if (explicit) return [explicit];
  return MQTT_BROKERS.slice();
}
// Gast: gewählten Relay aus dem Einladungslink (&b=…) lesen, damit Host und
// Gast garantiert denselben Relay nutzen.
function netJoinBroker() {
  try {
    const b = new URLSearchParams(location.search).get('b');
    if (b != null && b !== '') { const i = parseInt(b, 10); if (!isNaN(i) && MQTT_BROKERS[i]) return MQTT_BROKERS[i]; }
  } catch {}
  return null;
}
const MQTT_ROOT = 'ghrbv1';

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

/* ---------------- Transport: MQTT über WebSocket (Relay, echte Geräte) ----------------
   Host lauscht auf .../toHost, sendet an alle über .../toAll und privat
   an einen Spieler über .../to/<id>. Clients umgekehrt. Nur ausgehende
   WebSocket-Verbindungen → funktioniert hinter jedem NAT (kein TURN nötig). */
class MqttTransport {
  constructor(code, explicitBroker) {
    this.code = code;
    this.cbs = {};
    this.client = null;
    this.selfId = null;
    this._ready = false;
    this._base = MQTT_ROOT + '/' + code;
    this._brokers = netBrokerList(explicitBroker);
    this.brokerIndex = 0;
    this.brokerUrl = this._brokers[0];
  }
  on(ev, cb) { this.cbs[ev] = cb; return this; }
  _emit(ev, ...a) { if (this.cbs[ev]) this.cbs[ev](...a); }
  _t() {
    const b = this._base;
    return { toHost: b + '/toHost', toAll: b + '/toAll', to: (id) => b + '/to/' + id };
  }
  _payload(p) { try { return JSON.parse(typeof p === 'string' ? p : p.toString()); } catch { return null; } }

  // Verbindung zu EINEM Relay; erfüllt sich bei 'connect', sonst Fehler/Timeout.
  _open(url) {
    return new Promise((resolve, reject) => {
      if (typeof mqtt === 'undefined' || !mqtt.connect) return reject(new Error('MQTT nicht geladen'));
      const cid = 'ghrb_' + (this.selfId || 'x') + '_' + Math.random().toString(36).slice(2, 8);
      let settled = false;
      const client = mqtt.connect(url, { clientId: cid, clean: true, keepalive: 30, reconnectPeriod: 2500, connectTimeout: 6000, protocolVersion: 4 });
      const to = setTimeout(() => { if (!settled) { settled = true; try { client.end(true); } catch {} reject(new Error('timeout ' + url)); } }, 7000);
      client.once('connect', () => { if (!settled) { settled = true; clearTimeout(to); resolve(client); } });
      client.once('error', (err) => { if (!settled) { settled = true; clearTimeout(to); try { client.end(true); } catch {} reject(err); } });
    });
  }
  // Relays der Reihe nach durchprobieren, ersten erreichbaren nehmen.
  async _openAny() {
    let lastErr = null;
    for (let i = 0; i < this._brokers.length; i++) {
      try {
        const client = await this._open(this._brokers[i]);
        this.brokerIndex = i; this.brokerUrl = this._brokers[i];
        return client;
      } catch (e) { lastErr = e; }
    }
    throw lastErr || new Error('kein Relay erreichbar');
  }

  async hostStart() {
    const T = this._t();
    const client = await this._openAny();
    this.client = client;
    client.on('message', (topic, payload) => {
      if (topic !== T.toHost) return;
      const env = this._payload(payload);
      if (!env || env._k == null) return;
      this._emit('message', env._k, env.m);
    });
    client.on('error', (err) => this._emit('neterror', err));
    await new Promise((res, rej) => client.subscribe(T.toHost, { qos: 0 }, (e) => e ? rej(e) : res()));
    this._ready = true;
    // Reconnect (mqtt.js abonniert automatisch neu) → Zustand erneut verteilen.
    client.on('connect', () => { client.subscribe(T.toHost, { qos: 0 }, () => this._emit('reopen')); });
  }
  async clientStart() {
    const T = this._t(); const mine = T.to(this.selfId);
    const client = await this._openAny();
    this.client = client;
    client.on('message', (topic, payload) => {
      if (topic !== T.toAll && topic !== mine) return;
      const m = this._payload(payload);
      if (m) this._emit('message', m);
    });
    client.on('error', (err) => this._emit('neterror', err));
    await new Promise((res, rej) => client.subscribe([T.toAll, mine], { qos: 0 }, (e) => e ? rej(e) : res()));
    this._ready = true;
    // Reconnect → erneut beitreten, damit der Host frischen Zustand schickt.
    client.on('connect', () => { client.subscribe([T.toAll, mine], { qos: 0 }, () => this._emit('reopen')); });
  }
  broadcast(obj) { if (this.client) try { this.client.publish(this._t().toAll, JSON.stringify(obj), { qos: 0 }); } catch {} }
  sendTo(key, obj) { if (this.client) try { this.client.publish(this._t().to(key), JSON.stringify(obj), { qos: 0 }); } catch {} }
  send(obj) { if (this.client) try { this.client.publish(this._t().toHost, JSON.stringify({ _k: this.selfId, m: obj }), { qos: 0 }); } catch {} }
  close() { try { if (this.client) this.client.end(true); } catch {} }
}

/* ---------------- RoomNet (Protokoll über dem Transport) ---------------- */
class RoomNet {
  constructor(mode, brokerUrl) {
    this.mode = mode || 'net';
    this.selfId = netId();
    this.isHost = false;
    this.code = null;
    this.transport = null;
    this.brokerIndex = 0;          // gewählter Relay (für den Einladungslink)
    this._brokerUrl = brokerUrl || null;
    this.keyToPlayer = new Map(); // Transport-Kanal → Spieler-ID (nur Host)
    this.playerToKey = new Map();
    this.handlers = { state: [], action: [], join: [], leave: [], private: [], disconnected: [], neterror: [] };
    this.lastState = null;
    this._selfName = null;
  }
  on(ev, cb) { (this.handlers[ev] || (this.handlers[ev] = [])).push(cb); return this; }
  _emit(ev, ...a) { (this.handlers[ev] || []).forEach(cb => cb(...a)); }
  _mk(code) { return this.mode === 'local' ? new LocalTransport(code) : new MqttTransport(code, this._brokerUrl); }

  /* ---- Host ---- */
  async host(code) {
    this.code = code || netCode();
    this.isHost = true;
    this.transport = this._mk(this.code);
    this.transport.selfId = 'host';
    this.transport.on('neterror', (e) => this._emit('neterror', e));
    this.transport.on('open', (key) => { /* auf join warten */ });
    // Nach einem Reconnect des Hosts: aktuellen Zustand erneut an alle senden.
    this.transport.on('reopen', () => { if (this.lastState) this.transport.broadcast({ kind: 'state', state: this.lastState }); });
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
    if (this.transport.brokerIndex != null) this.brokerIndex = this.transport.brokerIndex;
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
    // Nach einem Reconnect des Clients: erneut beitreten → Host schickt frischen Zustand.
    this.transport.on('reopen', () => { try { this.transport.send({ kind: 'join', id: this.selfId, name: this._selfName }); } catch {} });
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
//  · eigene Adresse (Hosting)→ MQTT-Relay (echt geräteübergreifend, per Link)
function detectNetMode() {
  try {
    if (new URLSearchParams(location.search).get('local')) return 'local';
    if (window.self !== window.top) return 'local';
    if (/claude\.ai|claudeusercontent|anthropic|\.usercontent\./i.test(location.hostname)) return 'local';
    return 'net';
  } catch { return 'net'; }
}
