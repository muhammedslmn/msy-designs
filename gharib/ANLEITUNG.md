# Gharîb · غريب — Islamisches Lernspiel

Ein islamisches Party- & Lernspiel nach dem Prinzip von „Imposter“ – aber in
einer **halal**, lehrreichen Version auf Tawhîd-Grundlage. Wer den Begriff nicht
kennt, ist der **Gharîb** (der Fremde). Am Ende jeder Runde gibt es eine kurze
**Nasîha** mit Vers oder authentischem Hadîth.

- **In 4 Sprachen:** Deutsch · Türkçe · English · العربية (mit Rechts-nach-Links).
- **Ohne Bilder von Lebewesen** – nur islamische Geometrie & Ornamentik.
- **Kein Internet nötig** zum Spielen, keine Werbung, kein Tracking, DSGVO-konform.
- **Reines HTML/CSS/JS** – kein Build-Schritt. Läuft auf jedem Webspace.

---

## 1. Sofort testen (lokal)

Weil moderne Browser Schriften/Module nur über `http://` laden (nicht per
Doppelklick auf die Datei), am einfachsten mit einem kleinen lokalen Server:

```bash
cd gharib
python3 -m http.server 8000
# dann im Browser öffnen:  http://localhost:8000
```

Auf dem Handy: Rechner und Handy im selben WLAN, dann `http://<PC-IP>:8000` aufrufen.

## 2. Veröffentlichen (Hosting)

Den **kompletten Ordner `gharib/`** hochladen – fertig. Es läuft auf:

- **Netlify / Cloudflare Pages / Vercel:** Ordner hochladen bzw. Repo verbinden,
  Publish-Verzeichnis = `gharib`. Die Datei `_headers` (Caching/Sicherheit) wird
  automatisch beachtet.
- **Klassischer Webspace (IONOS, Strato …):** per FTP in einen Unterordner laden,
  z. B. `deine-domain.de/gharib/`.

Danach **HTTPS** aktivieren (bei allen genannten Anbietern kostenlos).

### Als App aufs Handy „installieren“
Seite im Browser öffnen → Menü → **„Zum Startbildschirm hinzufügen“**. Dank
`site.webmanifest` erscheint Gharîb dann wie eine echte App (eigenes Icon,
Vollbild).

---

## 3. So wird gespielt

1. **Spieler & Gharîb wählen.** Anzahl der Spieler (mind. 3) und wie viele davon
   der Gharîb sind. Sinnvoll sind höchstens `Spieler − 2` Gharîb – die App lässt
   gar nichts Unmögliches zu.
2. **Kategorie & Stufe wählen.** Propheten, Gefährten, Gottesdienst, Qurʾân & Suren,
   Heilige Orte, Charakter – oder **Gemischt**. Stufen: Leicht, Mittel, Schwer,
   Sehr schwer. Auf **Leicht** bekommt der Gharîb ein **Hinweiswort**; auf
   **Sehr schwer** kennt er nicht einmal die Kategorie.
3. **Handy herumgeben.** Jeder tippt auf die verdeckte Karte und lernt sein Wort;
   danach „Verdecken & weitergeben“. Der Gharîb sieht: „Du bist der Gharîb“.
4. **Reihum beschreiben.** Jeder sagt ein Wort zum Begriff – deutlich genug für
   die Gruppe, aber nicht so klar, dass der Gharîb es errät.
5. **Auflösen.** Beratet und stimmt ab. Enttarnt ihr den Gharîb, gewinnt die
   Gruppe; errät der Gharîb den Begriff, gewinnt er.
6. **Nasîha.** Zum Schluss ein kurzer Rat mit Vers/Hadîth zum Begriff – zum Lernen.

---

## 4. Inhalte erweitern oder korrigieren

Alle Inhalte stehen in **`content.js`** – gut lesbar und ohne Programmierkenntnisse
erweiterbar.

- **Neuen Begriff hinzufügen:** in der Liste `TERMS` eine Zeile ergänzen:
  ```js
  { cat:'worship', level:2, n:'salah',
    w:{de:'…', tr:'…', en:'…', ar:'…'},   // das Wort in 4 Sprachen
    h:{de:'…', tr:'…', en:'…', ar:'…'} }, // Hinweiswort (für „Leicht“)
  ```
  - `cat`: `prophets` · `companions` · `worship` · `quran` · `places` · `akhlaq`
  - `level`: `1` Leicht · `2` Mittel · `3` Schwer · `4` Sehr schwer
  - `n`: Schlüssel der Nasîha aus dem Objekt `NASIHA` (oben in `content.js`).
- **Neue Nasîha hinzufügen:** in `NASIHA` einen Eintrag mit `ref` (Quelle),
  `ar` (Originaltext) und Übersetzungen `de/tr/en` anlegen. Bei Hadithen zusätzlich
  `type:'hadith'` und `grade` (Authentizitätsgrad).
- **UI-Texte ändern:** in **`i18n.js`**. **Farben/Design:** ganz oben in
  **`styles.css`** unter `:root` (und `html[data-theme="dark"]`).

> **Amâna (Verantwortung):** Alle Verse tragen ihre Sûra:Âya-Referenz, alle
> Hadithe stammen aus **Ṣaḥîḥ al-Bukhârî / Ṣaḥîḥ Muslim** mit Nummer und Grad
> `Ṣaḥîḥ`. Bitte prüfe die religiösen Inhalte vor dem produktiven Einsatz mit
> vertrauenswürdigem Wissen nach – die Referenzen sind extra dafür angegeben.

---

## 5. Gut zu wissen

- **Schriften** (Satoshi, Clash Display, Amiri, Cairo) werden lokal ausgeliefert –
  kein externer Abruf, DSGVO-konform. Amiri & Cairo stehen unter der SIL Open
  Font License (siehe `fonts/…-LICENSE.txt`).
- **Datenschutz:** Es werden keine Daten gesendet. Nur Sprache, Theme und die
  letzten Einstellungen werden lokal im Browser (localStorage) gespeichert – rein
  auf dem Gerät.
- **Barrierefreiheit:** hoher Kontrast, große Tippflächen, Fokus-Rahmen,
  Reduzierte-Bewegung wird respektiert.

Möge Allah es segnen und nützlich machen. 🌙
