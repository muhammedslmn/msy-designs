# msy-designs – Website-Anleitung

Eine fertige, conversion-optimierte und SEO-vorbereitete Website für Ihre Webdesign-Dienstleistung. Kein Baukasten, kein Build-Schritt – reine HTML/CSS/JS-Dateien, die auf jedem Webspace laufen.

---

## 1. Was ist enthalten

| Datei | Zweck |
|---|---|
| `index.html` | Die Startseite (One-Pager): Hero, Leistungen, Pakete, Warum, FAQ |
| `impressum.html` | Pflichtseite Impressum (§ 5 DDG) |
| `datenschutz.html` | Pflichtseite Datenschutzerklärung (DSGVO) |
| `styles.css` | Das komplette Design |
| `script.js` | Menü, Animationen, Pop-up-Fenster (Anfrage & Termin), Versand |
| `fonts/` | Selbst gehostete Schriften – **DSGVO-konform**, kein Google-Fonts-Abruf |
| `og-image.png` | Vorschaubild beim Teilen auf WhatsApp, LinkedIn, Facebook etc. |
| `favicon.*`, `icon-*.png`, `apple-touch-icon.png` | Browser- und App-Symbole |
| `site.webmanifest` | App-Manifest (Installierbarkeit) |
| `robots.txt`, `sitemap.xml` | Für Suchmaschinen |
| `.htaccess`, `_headers` | Caching & Sicherheit (Apache bzw. Netlify/Cloudflare) |

> Den versteckten Ordner `.claude/` können Sie ignorieren oder löschen – er ist nur für die lokale Vorschau.

### So funktioniert die Seite (Aufbau)
- **Oben rechts** und **mittig im Hero** ein leuchtender Button **„Jetzt anfragen“** → springt zu den Paketen.
- **Pakete:** zwei kleine Karten („Website“ **oder** „Website + Verwaltung“) mit Button **„Angebot anfragen“**, plus die große, hervorgehobene **Enterprise**-Karte mit **„Termin buchen“**.
- **„Angebot anfragen“** öffnet ein Pop-up mit E-Mail, Telefon und Nachricht.
- **„Termin buchen“** öffnet ein Pop-up mit Telefon, E-Mail und Terminauswahl (täglich 14–20 Uhr, dazu „Andere Uhrzeit angeben“).
- **Unten rechts** schweben drei Buttons: **WhatsApp, Anrufen, E-Mail**.
- **Preise stehen bewusst nirgends** – alles wird persönlich besprochen.

---

## 2. ⚠️ Bevor Sie online gehen: Platzhalter ausfüllen

Telefon (**0178 6004553**) und E-Mail (**msywebdesign@gmail.com**) sind bereits überall eingetragen. Es fehlen nur noch die rechtlich nötigen Angaben in den beiden Rechtsseiten. Alles, was im Browser **gelb markiert** ist, muss ersetzt werden.

### Impressum (`impressum.html`) – gesetzlich verpflichtend
- [ ] Vor- und Nachname
- [ ] Ladungsfähige Anschrift (Straße + Hausnummer, PLZ, Ort – **kein Postfach**)
- [ ] USt-IdNr. – **nur falls vorhanden**. Als Kleinunternehmer (§ 19 UStG) ohne USt-IdNr. den Block löschen und **nie** die private Steuernummer angeben.
- [ ] „Stand: Monat/Jahr"
- [ ] Den orangefarbenen Hinweis-Kasten oben entfernen
- [ ] Danach `noindex, follow` → `index, follow` ändern (oben im `<head>`)

### Datenschutzerklärung (`datenschutz.html`) – gesetzlich verpflichtend
- [ ] Verantwortlicher (Name, Anschrift) – E-Mail und Telefon sind schon eingetragen
- [ ] Hosting-Anbieter (Name + Anschrift) – und mit ihm einen **AV-Vertrag** (Art. 28 DSGVO) abschließen
- [ ] Zuständige Landes-Datenschutzaufsichtsbehörde (nach Ihrem Bundesland)
- [ ] Speicherdauer der Logfiles (z. B. 7/30/60 Tage)
- [ ] „Stand: Monat/Jahr" + Hinweis-Kasten entfernen

### Optional, aber empfohlen
- [ ] **E-Mail professionalisieren:** Statt `msywebdesign@gmail.com` eine Domain-Adresse wie `kontakt@msy-designs.de`. Dann überall ersetzen (Suchen & Ersetzen in allen Dateien, inkl. `script.js`).

### Domain
Die Website ist auf **`msy-designs.de`** vorbereitet. Falls Ihre Domain anders lautet, `msy-designs.de` per Suchen & Ersetzen in **allen** Dateien ersetzen (`index.html`, `impressum.html`, `datenschutz.html`, `sitemap.xml`, `robots.txt`).

---

## 3. Wie die Anfragen bei Ihnen ankommen

In der **Standardeinstellung** öffnet jedes Formular (Anfrage **und** Termin) das E-Mail-Programm des Besuchers mit einer fertig ausgefüllten Nachricht an `msywebdesign@gmail.com`. Der Besucher muss dort nur noch auf „Senden“ klicken. Es wird **keine** falsche Erfolgsmeldung angezeigt.

**Empfohlen für echten Direkt-Versand (ohne E-Mail-Programm des Besuchers):**
1. Kostenloses Konto bei **[Formspree](https://formspree.io)** anlegen und Ihre Form-URL kopieren.
2. In `script.js` ganz oben im Block `CONFIG` die Zeile anpassen:
   ```js
   formspree: 'https://formspree.io/f/IHRE-ID'
   ```
3. Fertig – ab jetzt landen Anfragen direkt in Ihrem Formspree-Postfach (und werden an Ihre E-Mail weitergeleitet), ohne dass sich beim Besucher etwas öffnet.
4. **Wichtig:** Bei Nutzung von Formspree diesen Dienst in der Datenschutzerklärung (Abschnitt 7/8) als Empfänger/Auftragsverarbeiter ergänzen (US-Bezug, Drittlandtransfer).

Ein **Spam-Schutz** (Honeypot) ist in beiden Formularen eingebaut – ohne nerviges Captcha.

### Terminzeiten ändern
Die wählbaren Uhrzeiten (täglich 14:00–20:00) stehen in `index.html` im Modal „Termin buchen“ als `<option>`-Liste. Einfach Zeiten ergänzen oder entfernen. „Andere Uhrzeit angeben“ erlaubt dem Besucher eine freie Eingabe.

---

## 4. WhatsApp / Telefon / E-Mail (unten rechts)
Die drei schwebenden Buttons sind bereits aktiv und mit Ihren Daten verknüpft:
- WhatsApp: `https://wa.me/491786004553`
- Anrufen: `tel:+491786004553`
- E-Mail: `mailto:msywebdesign@gmail.com`

Falls sich Ihre Nummer ändert: in `index.html` (Dock + Footer) und `script.js` (`CONFIG.email`) anpassen.

---

## 5. Veröffentlichen (Hosting)
Die Seite läuft auf **jedem** Webspace – kein Server-Code nötig.
1. Alle Dateien und Ordner (inkl. `fonts/`) per FTP oder Upload auf Ihren Webspace laden (z. B. IONOS, Strato, Netlify, Vercel, Cloudflare Pages).
2. **HTTPS** aktivieren (bei allen genannten Anbietern kostenlos).
3. Aufrufen und testen.

---

## 6. Nach dem Launch: bei Google anmelden
1. [Google Search Console](https://search.google.com/search-console) → Domain bestätigen → `sitemap.xml` einreichen.
2. [Google Unternehmensprofil](https://business.google.com) anlegen (extrem wichtig für lokale Sichtbarkeit bei Handwerkern).
3. Strukturierte Daten prüfen mit dem [Rich Results Test](https://search.google.com/test/rich-results).

---

## 7. Gut zu wissen
- **Datenschutz:** Keine externen Skripte, kein Tracking, keine Cookies → **kein Cookie-Banner** nötig (solange Sie keine Tracker einbauen).
- **Rechtsseiten:** Impressum und Datenschutz stehen bewusst auf `noindex`. Nach dem Ausfüllen bei Bedarf auf `index, follow` ändern.
- **Schriften:** Clash Display & Satoshi werden lokal ausgeliefert (kostenlos, auch kommerziell).
- **Tempo & SEO:** Keine schweren Frameworks, optimierte Schriften, sauberes HTML – beste Voraussetzungen für gute Ladezeiten und Rankings.
- **Farben/Texte ändern:** Farben zentral oben in `styles.css` unter `:root`. Texte direkt in `index.html`.

Viel Erfolg mit msy-designs! 🚀
