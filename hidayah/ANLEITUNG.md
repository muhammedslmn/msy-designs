# Hidayah — Website

> Auf der Suche nach Licht in einer Welt voller Dunkelheit.

Statische Website (HTML/CSS/JS, kein Framework). Alle Seiten werden aus den Dateien in
`_build/` erzeugt und liegen fertig im Ordner — der Hoster muss nichts kompilieren.

```bash
cd hidayah
python3 -m http.server 8000     # lokal ansehen -> http://localhost:8000
python3 _build/build.py         # nach jeder Änderung neu bauen
```

---

## 1. Aktueller Stand

Die Website besteht derzeit aus dem **Grundgerüst**. Es sind bewusst keine Artikel,
keine Fragen, keine Antworten und keine aufgezeichneten Kurse hinterlegt — die kommen,
sobald ihr sie liefert.

**Hauptbereiche** (feste Navigation, in dieser Reihenfolge):

Startseite · Über uns · Artikel · Frage & Antwort · Privatunterricht · Kurse ·
Neuigkeiten · Kontakt

Dazu im Kopfbereich: Suche, Konto, Darstellung und Sprache.

**Die drei Reihen** ordnen wiederkehrende Beitragsformate:

| Reihe | Schlüssel in `content.py` |
|---|---|
| Islamische Terminologie | `terminologie` |
| Islamische Rechtsurteile | `rechtsurteile` |
| Aufklärung von Zweifeln zum Islam | `zweifel` |

**Artikel ist der allgemeine Bereich.** Ein Beitrag kann einer Reihe zugeordnet werden, muss es
aber nicht — Beiträge zu anderen Themen lassen das Feld `series` einfach weg und erscheinen
trotzdem im Verzeichnis.

**Beiträge erscheinen unter „Hidayah".** Soll bei einem bestimmten Beitrag ein Name genannt
werden, wird `"author"` im Artikel eingetragen. Sonst bleibt es bei Hidayah.

---

## 2. Die Seite wächst mit dem Inhalt

Was nicht eingetragen ist, erscheint auch nicht. Das ist fest im Generator verankert:

| Leer in `content.py` | Folge |
|---|---|
| `ARTICLES` | Kein Artikelverzeichnis, kein Startseiten-Block, keine Suche |
| `QA_PUBLIC` | Kein öffentliches Antwortarchiv (das Frageformular bleibt) |
| `COURSES` | Auf der Kursseite erscheint nur der Aufbau, keine Kursliste |
| `NEWS` | Auf der Neuigkeiten-Seite steht ein kurzer Hinweis statt einer Liste |
| `PACKAGES` | Kein Paketbereich (erscheint erst ab zwei Kursen) |
| `SITE["intro_video"]` | Kein Videobereich auf der Startseite |
| `"video"` im Artikel | Kein Videobereich im Artikel |

Zusätzlich: Die **Suche** erscheint erst, wenn es etwas zu finden gibt. Ein **Filter** über die
Reihen erscheint erst, wenn Artikel aus mindestens zwei Reihen vorliegen. Es gibt keine
Platzhalter, keine „demnächst"-Kacheln und keine leeren Kategorien.

---

## 3. Artikel anlegen

Eintrag in `ARTICLES` in `_build/content.py` — Muster steht in `_build/vorlagen.py`:

```python
{
    "slug": "mein-artikel",          # ergibt /artikel/mein-artikel.html
    "title": "Titel des Artikels",
    "series": "terminologie",        # optional: terminologie | rechtsurteile | zweifel
    # "author": "S. Eslem",          # optional, sonst erscheint "Hidayah"
    "date": "2026-01-15",
    "reading": 8,
    "video": "",                     # Video-URL -> Videobereich erscheint automatisch
    "summary": "Ein bis zwei Sätze für Verzeichnis und Suche.",
    "body": """<p>…</p><h2 id="abschnitt-1">Überschrift</h2><p>…</p>""",
    "sources": ["al-Bukhari, <em>as-Sahih</em>, Nr. 1."],
}
```

Die Artikelseite gliedert sich dann von selbst:

- **Abschnitte werden nummeriert** (01, 02, 03 …) mit feiner Trennlinie
- **Inhaltsverzeichnis** ab zwei `<h2 id="…">`, auf breiten Bildschirmen mitlaufend am Rand
- **Lesefortschritt** als dünner Balken oben
- **Quran- und Hadith-Blöcke** deutlich abgesetzt, Quran in Akzentfarbe, Hadith neutral
- **Quellen** am Ende, nummeriert
- **Weitere Artikel derselben Reihe** darunter

Quran- oder Hadith-Block im `body`:

```python
+ ayah("﴿…arabisch…﴾", "&bdquo;Deutsche Übersetzung.&ldquo;", "Surat al-Baqarah, 2:255") +
+ ayah("«…arabisch…»", "&bdquo;Übersetzung.&ldquo;", "al-Bukhari, Nr. 1", kind="hadith") +
```

> Anführungszeichen bitte als `&bdquo;` (öffnend) und `&ldquo;` (schließend) schreiben.

---

## 4. Privatunterricht und Kurse

Es sind **zwei getrennte Bereiche**:

- **Privatunterricht** — Einzelunterricht auf Anfrage. Ablauf: Bewerbung → Prüfung → Gespräch
  per FaceTime oder Telefon → individuelles Programm. Der Beitrag wird ausdrücklich **erst im
  Gespräch** festgelegt.
- **Kurse** — fertig aufgezeichnete Kurse zum Kauf. Erscheinen, sobald Einträge in `COURSES`
  stehen; bis dahin erklärt die Seite nur den Aufbau.

**Sprache und Beitrag:** Kurse gibt es **nur auf Deutsch**. Der Privatunterricht wird dagegen in
**Deutsch, Türkisch oder Arabisch** gehalten — der Bewerber wählt die Sprache selbst im Formular
(Liste `languages` in `TEACHING`). Abgerechnet wird überall **ausschließlich in Euro**
(`price_eur`).

### Neuigkeiten

Einladungen, Unterrichtsankündigungen und Mitteilungen kommen in `NEWS` in `content.py`.
Jeder Eintrag hat Datum, Art (`Einladung`, `Unterricht`, `Ankündigung`), Titel und Text.
Muster in `_build/vorlagen.py`.

### Details zum Privatunterricht

Der Unterrichtsbereich bildet euren Ablauf ab: **Bewerbung → Prüfung → Gespräch → Programm**.

Die Bewerbung fragt ab: Name, E-Mail, Alter, Wohnort, gewünschtes Fach, Beweggrund,
Vorkenntnisse, gewünschte Unterrichtssprache, ob arabische Schrift gelesen werden kann,
bereits Gelerntes und bei wem,
Zeitbudget pro Woche, bevorzugtes Gesprächsmedium (FaceTime, Telefon, WhatsApp) und
Erreichbarkeit.

Auf der Seite steht ausdrücklich, dass der Beitrag **erst im persönlichen Gespräch**
festgelegt wird — vorher wird kein Preis genannt.

Anpassen lässt sich alles in `TEACHING` in `_build/content.py`: Ablaufschritte, Fächerliste,
Niveaustufen, Zeitoptionen und Gesprächsmedien.

Sobald ihr **aufgezeichnete Kurse** habt, kommen sie in `COURSES` — dann erscheint auf
derselben Seite zusätzlich ein Abschnitt dafür.

---

## 5. Design und Darstellung

Hell als Standard: warmes Papierweiß, redaktionelle Typografie, Haarlinien statt Kacheln,
großzügige Freiflächen. Besucher wählen oben rechts selbst:

- **Modus:** Automatisch · Hell · Dunkel
- **Akzentfarbe:** Smaragd · Indigo · Messing · Tinte

Die Wahl wird lokal gespeichert und vor dem ersten Bildaufbau angewendet.

**Das Logo bleibt unverändert.** Schriftzug und Mond werden nicht eingefärbt und nicht
abgewandelt — es wird immer die Originaldatei verwendet. Damit die weiße Schrift überall
lesbar ist, liegen die drei Bereiche mit Logo auf einem **Nachthimmel-Band**: Kopfbereich,
Hero der Startseite und Fußbereich. Dazwischen ist die Seite hell.

Farben stehen gebündelt am Anfang von `assets/css/hidayah.css` unter `1 · Farbwerte`.

---

## 6. Schreibweise islamischer Begriffe

In lateinischer Schrift **nur normale Buchstaben**, keine wissenschaftlichen Sonderzeichen:

Tawhid · Aqidah · Shirk · Bidah · Hadith · Fiqh · Sunnah · Sahabah · Sheykh · Shuyukh ·
Ijazat · Salaf as-Salih · Ahl as-Sunnah wa-l-Jamaah · Quran · al-Bukhari ·
at-Tirmidhi · Abu Dawud

Arabische Originaltexte bleiben in arabischer Schrift.

---

## 7. Aufbau der Dateien

```
hidayah/
├── _build/
│   ├── content.py    ← Reihen, Artikel, Unterricht, Kurse, Team, Kontaktdaten
│   ├── vorlagen.py   ← Muster zum Herauskopieren
│   ├── layout.py     ← Kopf, Fuß, Navigation, Übersetzungen (de/en/tr/ar)
│   ├── pages.py      ← Aufbau der Seitentypen
│   └── build.py      ← erzeugt alles
├── assets/css/hidayah.css   ← Design-System
├── assets/js/theme.js       ← Darstellung vor dem ersten Bildaufbau
├── assets/js/site.js        ← Einblendung, Menü, Suche, Formulare, Lesefortschritt
├── assets/fonts/  assets/img/
├── index.html  ueber-uns.html  artikel.html  frage-antwort.html
├── unterricht.html  kontakt.html  404.html
├── impressum.html  datenschutz.html  agb.html  widerruf.html
└── en/  tr/  ar/            ← Sprachversionen (Arabisch vollständig RTL)
```

---

## 8. Veröffentlichen

- **Vercel** (aktiv): Projekt `hidayah`, Root-Verzeichnis `hidayah`, kein Build-Command.
  Jeder Push aktualisiert die Seite.
- **Netlify**: Publish directory `hidayah`, kein Build-Command.

Alte Adressen (`/wissen.html`, `/wissen/…`, `/kurse.html`, `/konto.html`) werden weitergeleitet.

---

## 9. Vor dem Live-Gang

- [ ] `SITE["url"]` auf die echte Domain setzen
- [ ] Formspree-ID eintragen (`SITE["form_endpoint"]`) und alle vier Formulare testen
      (Newsletter, Frage, Bewerbung, Kontakt)
- [ ] **Impressum, Datenschutz, AGB und Widerruf ausfüllen und rechtlich prüfen lassen** —
      alle vier sind ausdrücklich als Vorlage markiert
- [ ] Instagram-, YouTube- und X-Links in `SITE` eintragen
