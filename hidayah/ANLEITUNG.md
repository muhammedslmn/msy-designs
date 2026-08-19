# Hidayah — Website

> Auf der Suche nach Licht in einer Welt voller Dunkelheit.

Statische Website (HTML/CSS/JS, kein Framework, keine Build-Abhängigkeiten im Browser).
Alle Seiten werden aus den Dateien in `_build/` erzeugt und liegen fertig im Ordner —
Netlify muss nichts kompilieren.

---

## 1. Schnellstart

**Lokal ansehen**

```bash
cd hidayah
python3 -m http.server 8000
# -> http://localhost:8000
```

**Nach einer Inhaltsänderung neu bauen**

```bash
cd hidayah
python3 _build/build.py
```

Das schreibt alle HTML-Seiten, den Suchindex, `sitemap.xml`, `robots.txt`,
`site.webmanifest`, `_headers` und `_redirects` neu.

---

## 2. Aufbau

```
hidayah/
├── _build/                 ← Quelle. Hier wird bearbeitet.
│   ├── content.py          ← Artikel, Kurse, Q&A, Team, Kontaktdaten
│   ├── layout.py           ← Kopf, Fuß, Navigation, Übersetzungen
│   ├── pages.py            ← Aufbau der einzelnen Seitentypen
│   └── build.py            ← erzeugt alles
├── assets/
│   ├── css/hidayah.css     ← komplettes Design-System
│   ├── js/site.js          ← Intro, Suche, Filter, Formulare, Sprache
│   ├── js/search-index.js  ← automatisch erzeugt
│   ├── js/config.js        ← automatisch erzeugt (Formular-Endpunkt)
│   ├── fonts/              ← Clash Display, Satoshi, Amiri, Cairo
│   └── img/                ← Logos, Mond, Favicons, OG-Bild
├── index.html  ueber-uns.html  wissen.html  frage-antwort.html
├── kurse.html  kontakt.html  konto.html  404.html
├── impressum.html  datenschutz.html  agb.html  widerruf.html
├── wissen/<artikel>.html   ← je Artikel eine Seite
├── kurse/<kurs>.html       ← je Kurs eine Seite
└── en/  tr/  ar/           ← Sprachversionen (Arabisch vollständig RTL)
```

---

## 3. Was ist fertig — und was braucht noch einen Server

**Fertig und live einsetzbar**

- Startseite mit Besmele-Einblendung beim ersten Aufruf (einmal pro Sitzung, überspringbar)
- Über uns, Wissensarchiv mit Reihen- und Themenfilter, Artikelseiten mit
  Inhaltsverzeichnis, Āyāt-/Ḥadīṯ-Blöcken, Quellenangaben, verwandten Artikeln und Teilen-Buttons
- Frage & Antwort: Formular plus öffentliches, anonymisiertes Antwortarchiv mit Filter
- Kursbereich: Übersichtsseite, Einzelkurs-Landingpages mit Curriculum, Währungsumschalter
  (EUR/TRY) und Paketen
- Kontakt, Kontobereich als vollständige Vorschau, vier Rechtsseiten als Vorlage
- Intelligente Suche (Cmd/Ctrl + K oder `/`): findet `ʿAqīdah` auch bei Eingabe von
  „akide", „aqida", „aqeedah" oder „عقيدة" — toleriert Umschrift, Sonderzeichen und Tippfehler
- Vier Sprachen mit vollständiger RTL-Unterstützung für Arabisch
- Cookie-Hinweis, Newsletter-Anmeldung, mobile Navigation, Tastaturbedienung,
  `prefers-reduced-motion`, Sicherheits-Header, sitemap, Schema.org-Daten

**Braucht einen Server / externen Dienst**

| Funktion | Was fehlt |
|---|---|
| Formulare wirklich versenden | Formspree-ID in `_build/content.py` → `SITE["form_endpoint"]` eintragen, neu bauen |
| Login, Nutzerkonto, Fortschritt | Backend (z. B. Supabase, Firebase) |
| Bezahlung EUR/TRY | Zahlungsanbieter (z. B. Stripe, PayPal, iyzico für TRY) |
| Geschützte Kursvideos, Offline-Nutzung | Videoplattform mit Zugriffsschutz (z. B. Vimeo OTT, Mux, Bunny Stream) |
| Verwaltungsbereich (Artikel, Fragen, Nutzer) | CMS oder eigenes Backend |

Bis dahin zeigen Kauf- und Vorschau-Buttons einen freundlichen Hinweis statt eines Fehlers.

---

## 4. Inhalte pflegen

### Neuen Artikel anlegen

In `_build/content.py` einen Eintrag zur Liste `ARTICLES` hinzufügen:

```python
{
    "slug": "mein-artikel",             # wird zu /wissen/mein-artikel.html
    "title": "Titel des Artikels",
    "series": "terminologie",           # terminologie | fiqh | zweifel
    "topics": ["aqidah", "tawhid"],     # Schlüssel aus TOPICS
    "madhhab": ["hanafi"],              # optional
    "author": "S. Eslem",
    "date": "2026-01-15",
    "reading": 8,                       # Minuten
    "video": False,                     # True blendet den Video-Bereich ein
    "summary": "Kurze Zusammenfassung für Übersicht und Suche.",
    "body": """<p>…</p><h2 id="abschnitt">Überschrift</h2><p>…</p>""",
    "sources": ["al-Buḫārī, <em>aṣ-Ṣaḥīḥ</em>, Nr. 1."],
}
```

Danach `python3 _build/build.py`. Seite, Suchindex, Sitemap und die Listen
aktualisieren sich von selbst. Ein Inhaltsverzeichnis erscheint automatisch,
sobald der Artikel mindestens drei `<h2 id="…">` enthält.

**Āyah- oder Ḥadīṯ-Block einfügen** — im `body` die Hilfsfunktion nutzen:

```python
+ ayah("﴿…arabischer Text…﴾", "&bdquo;Deutsche Übersetzung.&ldquo;", "Sūrat al-Baqarah, 2:255") +
+ ayah("«…arabisch…»", "&bdquo;Übersetzung.&ldquo;", "al-Buḫārī, Nr. 1", kind="hadith") +
```

> **Anführungszeichen:** in `content.py` bitte `&bdquo;` (öffnend) und `&ldquo;` (schließend)
> schreiben statt der typografischen Zeichen — das hält die Datei robust.

### Neuen Kurs anlegen

Eintrag in `COURSES` ergänzen (Aufbau siehe vorhandene Kurse). Pakete werden in
`PACKAGES` gepflegt und referenzieren Kurse über deren `slug`.

### Frage & Antwort veröffentlichen

Eintrag in `QA_PUBLIC` ergänzen. Diese Antworten erscheinen anonymisiert im
öffentlichen Archiv und sind über die Suche auffindbar.

### Kontaktdaten, Social Media, Domain

Alles in `SITE` am Anfang von `_build/content.py`.

---

## 5. Übersetzungen

Die Oberfläche (Navigation, Startseite, Formulare, Fußzeile, Suche) liegt in
`_build/layout.py` im Wörterbuch `T` für **de / en / tr / ar** vor. Fehlt ein
Schlüssel in einer Sprache, greift automatisch Deutsch.

Artikel- und Kursseiten gibt es derzeit nur auf Deutsch. Auf den
fremdsprachigen Übersichtsseiten steht deshalb ein Hinweis, und die Links führen
auf die deutsche Fassung. Sobald Übersetzungen vorliegen, lässt sich das in
`build.py` erweitern, ohne das Layout anzufassen.

---

## 6. Veröffentlichen (Netlify)

Die Website ist so gebaut, dass sie **im Wurzelverzeichnis** einer Domain liegt
(alle Pfade beginnen mit `/`).

**Variante A — eigene Netlify-Site (empfohlen)**

Neue Site aus diesem Repository anlegen und setzen:

- Base directory: *(leer)*
- Publish directory: `hidayah`
- Build command: *(leer)*

**Variante B — dieses Repository umstellen**

In der `netlify.toml` im Wurzelverzeichnis `publish = "gharib"` auf
`publish = "hidayah"` ändern. Achtung: damit wird das bisher veröffentlichte
Projekt ersetzt.

`_headers` (Sicherheits-Header, Caching) und `_redirects` (404-Seite) werden von
Netlify automatisch berücksichtigt.

---

## 7. Logo und Bilder

Die Original-Logos wurden zu Web-Assets aufbereitet:

| Datei | Verwendung |
|---|---|
| `logo.webp` / `logo-700` / `logo-360` | Wortmarke mit Mond, transparent — Hero, Kopf, Fuß |
| `logo-besmele.webp` / `-800` | Besmele + Wortmarke — Einblendung beim Seitenstart |
| `moon.webp` / `moon-512` | freigestellter Mond (Schrift herausgerechnet) |
| `favicon.ico`, `favicon-16/32/48`, `apple-touch-icon`, `icon-192/512`, `icon-maskable-512` | Browser-Tab und App-Icons |
| `og-image.jpg` | Vorschaubild beim Teilen (WhatsApp, X, Telegram) |

Bei einem neuen Logo einfach die entsprechenden Dateien in `assets/img/`
austauschen — die Dateinamen bleiben gleich, es ist keine Codeänderung nötig.

---

## 8. Vor dem Live-Gang prüfen

- [ ] `SITE["url"]` in `content.py` auf die echte Domain setzen
- [ ] Formspree-ID eintragen und beide Formulare testen
- [ ] **Impressum, Datenschutz, AGB und Widerruf ausfüllen und rechtlich prüfen lassen** —
      die Seiten sind ausdrücklich als Vorlage markiert
- [ ] Instagram-, YouTube- und X-Links in `SITE` eintragen
- [ ] **Alle Artikel und Antworten inhaltlich prüfen und freigeben.** Die vorhandenen Texte
      sind sorgfältig mit Quellenangaben erstellt, ersetzen aber nicht eure eigene Prüfung
      und Verantwortung vor der Veröffentlichung.
- [ ] Vorstellungsvideo einbinden (Platzhalter auf Startseite, Artikeln und Kursseiten)
