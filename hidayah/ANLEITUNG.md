# Hidayah — Website

> Auf der Suche nach Licht in einer Welt voller Dunkelheit.

Statische Website (HTML/CSS/JS, kein Framework). Alle Seiten werden aus den Dateien in
`_build/` erzeugt und liegen fertig im Ordner — der Hoster muss nichts kompilieren.

---

## 1. Schnellstart

```bash
cd hidayah
python3 -m http.server 8000     # lokal ansehen -> http://localhost:8000
python3 _build/build.py         # nach jeder Inhaltsänderung neu bauen
```

---

## 2. Grundregel: Die Seite wächst mit dem Inhalt

**Es wird nichts angezeigt, wofür es keine Inhalte gibt.** Das ist im Generator fest verdrahtet,
nicht nur eine Einstellung:

| Liste in `_build/content.py` | Wenn leer | Sobald gefüllt |
|---|---|---|
| `COURSES` | Kein Menüpunkt „Kurse", keine Kursseiten, kein Eintrag auf der Startseite, keine Sitemap-Einträge, keine Suchtreffer | Bereich erscheint überall automatisch |
| `PACKAGES` | Kein Paketbereich | Erscheint, sobald **mindestens zwei** Kurse vorhanden sind |
| `QA_PUBLIC` | Kein öffentliches Antwortarchiv (das Frageformular bleibt) | Archiv erscheint mit Filtern |
| `ARTICLES` | Kein Menüpunkt „Artikel" | Verzeichnis, Detailseiten, Startseiten-Block |
| `SITE["intro_video"]` | Kein Videobereich auf der Startseite | Video wird eingebettet |
| `"video"` im Artikel | Kein Videobereich im Artikel | Video wird eingebettet |

**Kategorien folgen derselben Regel:**

- Eine **Reihe** erscheint als Filter nur, wenn sie Artikel enthält — und nur, wenn es mindestens
  zwei gefüllte Reihen gibt.
- Ein **Thema** erscheint als Filter erst ab **zwei** zugeordneten Artikeln. Ein einzelner Artikel
  bildet noch keine Kategorie.
- Die **Sprachtrennung im Kursbereich** (deutsche / türkische Kurse) erscheint erst, wenn es
  tatsächlich Kurse in mehr als einer Sprache gibt.

Du musst also nie „aufräumen". Trage Inhalte ein, baue neu — die Struktur ordnet sich selbst.

**Aktueller Stand:** 6 Artikel. Keine Kurse, kein öffentliches Q&A-Archiv. Die Navigation zeigt
deshalb: Artikel · Frage & Antwort · Über uns · Kontakt.

---

## 3. Aufbau

```
hidayah/
├── _build/
│   ├── content.py       ← Artikel, Kurse, Q&A, Team, Kontaktdaten   (hier bearbeiten)
│   ├── vorlagen.py      ← Beispieleinträge zum Herauskopieren
│   ├── layout.py        ← Kopf, Fuß, Navigation, Übersetzungen
│   ├── pages.py         ← Aufbau der Seitentypen
│   └── build.py         ← erzeugt alles
├── assets/
│   ├── css/hidayah.css  ← komplettes Design-System
│   ├── js/theme.js      ← setzt die Darstellung vor dem ersten Bildaufbau
│   ├── js/site.js       ← Einblendung, Suche, Filter, Formulare, Sprache, Darstellung
│   ├── fonts/           ← Clash Display, Satoshi, Amiri, Cairo
│   └── img/             ← Logos hell und dunkel, Mond, Favicons, OG-Bild
├── index.html  artikel.html  frage-antwort.html  ueber-uns.html  kontakt.html
├── impressum.html  datenschutz.html  agb.html  widerruf.html  404.html
├── artikel/<slug>.html
└── en/  tr/  ar/        ← Sprachversionen (Arabisch vollständig RTL)
```

---

## 4. Design und Darstellung

Die Website ist **hell als Standard** — warmes Papierweiß, viel Freiraum, redaktionelle
Typografie. Besucher können oben rechts selbst wählen:

- **Modus:** Automatisch (folgt dem Gerät) · Hell · Dunkel
- **Akzentfarbe:** Smaragd (Standard) · Indigo · Messing · Tinte

Die Wahl wird lokal gespeichert und vor dem ersten Bildaufbau angewendet, es blitzt also nichts auf.

Die **Einblendung beim Seitenstart** bleibt bewusst dunkel: Das Besmele-Logo erscheint auf
schwarzem Grund, dann öffnet sich die helle Seite — aus der Dunkelheit ins Licht, passend zum
Leitgedanken. Sie läuft einmal pro Sitzung und lässt sich überspringen.

**Farben ändern:** alle Werte stehen gebündelt am Anfang von `assets/css/hidayah.css` unter
`1 · Farbwerte`. Die vier Akzente sind dort je eine Zeile.

---

## 5. Schreibweise islamischer Begriffe

In allen lateinisch geschriebenen Sprachversionen gilt: **nur normale lateinische Buchstaben**,
keine wissenschaftlichen Transliterationszeichen.

| So | Nicht so |
|---|---|
| Tawhid, Aqidah, Shirk, Bidah | Tawḥīd, ʿAqīdah, Širk, Bidʿah |
| Hadith, Fiqh, Sunnah, Sahabah | Ḥadīṯ, Ṣaḥābah |
| Sheykh, Shuyukh, Ijazat | Šayḫ, Šuyūḫ, Iǧāzāt |
| Salaf as-Salih, Ahl as-Sunnah wa-l-Jamaah | as-Salaf aṣ-Ṣāliḥ |
| Quran, Dawah, Taharah, Salah | Qurʾān, Daʿwah, Ṭahārah, Ṣalāh |
| al-Bukhari, Muslim, at-Tirmidhi, Abu Dawud | al-Buḫārī, at-Tirmiḏī, Abū Dāwūd |

Arabische Originaltexte bleiben selbstverständlich in arabischer Schrift.

> **Anführungszeichen** in `content.py` bitte als `&bdquo;` (öffnend) und `&ldquo;` (schließend)
> schreiben — das hält die Datei robust.

---

## 6. Inhalte pflegen

### Artikel anlegen

Eintrag in `ARTICLES` in `_build/content.py`:

```python
{
    "slug": "mein-artikel",          # wird zu /artikel/mein-artikel.html
    "title": "Titel des Artikels",
    "series": "terminologie",        # terminologie | fiqh | zweifel
    "topics": ["aqidah", "tawhid"],  # Schlüssel aus TOPICS
    "madhhab": ["hanafi"],           # optional
    "author": "S. Eslem",
    "date": "2026-01-15",
    "reading": 8,                    # Minuten
    "video": "",                     # Video-URL -> Videobereich erscheint automatisch
    "summary": "Kurze Zusammenfassung für Verzeichnis und Suche.",
    "body": """<p>…</p><h2 id="abschnitt">Überschrift</h2><p>…</p>""",
    "sources": ["al-Bukhari, <em>as-Sahih</em>, Nr. 1."],
}
```

Ein Inhaltsverzeichnis erscheint automatisch ab drei `<h2 id="…">`.

**Quran- oder Hadith-Block** im `body`:

```python
+ ayah("﴿…arabisch…﴾", "&bdquo;Deutsche Übersetzung.&ldquo;", "Surat al-Baqarah, 2:255") +
+ ayah("«…arabisch…»", "&bdquo;Übersetzung.&ldquo;", "al-Bukhari, Nr. 1", kind="hadith") +
```

### Kurse, Pakete, öffentliche Antworten

Muster stehen in `_build/vorlagen.py`. Eintrag herauskopieren, in `content.py` in die passende
Liste (`COURSES`, `PACKAGES`, `QA_PUBLIC`) einfügen, anpassen, neu bauen. Der jeweilige Bereich
erscheint dann automatisch samt Navigation, Startseiten-Block, Suche und Sitemap.

### Kontaktdaten, Social Media, Domain

Alles in `SITE` am Anfang von `_build/content.py`.

---

## 7. Übersetzungen

Die Oberfläche liegt in `_build/layout.py` im Wörterbuch `T` für **de / en / tr / ar** vor.
Fehlt ein Schlüssel, greift automatisch Deutsch.

Artikelseiten gibt es derzeit nur auf Deutsch. Auf den fremdsprachigen Übersichtsseiten steht
deshalb ein Hinweis, und die Links führen auf die deutsche Fassung.

---

## 8. Veröffentlichen

Die Website liegt im **Wurzelverzeichnis** einer Domain (alle Pfade beginnen mit `/`).

- **Vercel** (aktuell aktiv): Projekt `hidayah`, Root-Verzeichnis `hidayah`, kein Build-Command.
  Jeder Push aktualisiert die Seite. `vercel.json` enthält Header und Caching-Regeln.
- **Netlify**: Publish directory `hidayah`, kein Build-Command. `_headers` und `_redirects`
  werden automatisch berücksichtigt.

Alte Adressen (`/wissen.html`, `/wissen/…`, `/konto.html`) werden per `_redirects` weitergeleitet.

---

## 9. Logo und Bilder

**Das Logo bleibt unverändert.** Schriftzug und Mond werden nicht eingefärbt, nicht nachgebaut
und nicht abgewandelt — es wird immer die Originaldatei verwendet.

Damit die weiße Schrift überall lesbar bleibt, liegen die drei Bereiche, in denen das Logo
erscheint, auf einem **Nachthimmel-Band**: Kopfbereich, Hero der Startseite und Fußbereich.
Dazwischen ist die Seite hell. Das ergibt zugleich den Bogen des Leitgedankens — aus der
Dunkelheit ins Licht.

| Datei | Verwendung |
|---|---|
| `logo.webp` / `logo-700` / `logo-360` | Original-Wortmarke mit Mond — Kopf, Hero, Fuß |
| `logo-besmele.webp` | Besmele + Wortmarke — Einblendung beim Seitenstart |
| `moon.webp` / `moon-512` | freigestellter Mond für Favicons und App-Icons |
| `favicon.ico`, `favicon-16/32/48`, `apple-touch-icon`, `icon-192/512`, `icon-maskable-512` | Browser-Tab und App-Icons |
| `og-image.jpg` | Vorschaubild beim Teilen |

Bei einem neuen Logo einfach die Dateien unter gleichem Namen austauschen — keine Codeänderung
nötig. Die Nachthimmel-Bänder findest du in `assets/css/hidayah.css` unter der Klasse `.night`.

---

## 10. Vor dem Live-Gang

- [ ] `SITE["url"]` in `content.py` auf die echte Domain setzen
- [ ] Formspree-ID eintragen (`SITE["form_endpoint"]`) und beide Formulare testen
- [ ] **Impressum, Datenschutz, AGB und Widerruf ausfüllen und rechtlich prüfen lassen** —
      die Seiten sind ausdrücklich als Vorlage markiert
- [ ] Instagram-, YouTube- und X-Links in `SITE` eintragen
- [ ] **Alle Artikel inhaltlich prüfen und freigeben.** Die vorhandenen Texte sind sorgfältig
      mit Quellenangaben erstellt, ersetzen aber nicht eure eigene Prüfung und Verantwortung
      vor der Veröffentlichung.
