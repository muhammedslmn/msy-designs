# -*- coding: utf-8 -*-
"""VORLAGEN – nicht aktiv.

Muster zum Herauskopieren. Eintrag nach content.py in die passende Liste
einfuegen, anpassen, dann `python3 _build/build.py` ausfuehren. Der Bereich
erscheint danach automatisch in Navigation, Startseite, Suche und Sitemap.
"""

# ---------------------------------------------------------------- Artikel
# Nach ARTICLES in content.py.
# "series" ist freiwillig: gehoert der Beitrag zu einer der drei Reihen, wird
# der Schluessel eingetragen; ein allgemeiner Beitrag laesst das Feld weg.
# "author" ist ebenfalls freiwillig – ohne Eintrag erscheint der Beitrag unter
# "Hidayah". Soll ein Name genannt werden, wird er hier eingetragen.
# Ein Inhaltsverzeichnis erscheint automatisch ab zwei <h2 id="…">.
# Die Abschnitte werden automatisch durchnummeriert (01, 02, 03 …).
ARTIKEL_VORLAGE = {
    "slug": "mein-artikel",           # ergibt /artikel/mein-artikel.html
    "title": "Titel des Artikels",
    "series": "terminologie",         # optional: terminologie | rechtsurteile | zweifel
    # "author": "S. Eslem",           # optional, sonst erscheint "Hidayah"
    "date": "2026-01-15",
    "reading": 8,                     # Lesezeit in Minuten
    "video": "",                      # Video-URL -> Videobereich erscheint automatisch
    "summary": "Ein bis zwei Sätze für Verzeichnis, Vorschau und Suche.",
    "body": """
<p>Einleitender Absatz.</p>

<h2 id="abschnitt-1">Erster Abschnitt</h2>
<p>Fließtext.</p>

<h3 id="unterpunkt">Unterpunkt</h3>
<p>Fließtext.</p>

<h2 id="abschnitt-2">Zweiter Abschnitt</h2>
<p>Fließtext.</p>
""",
    "sources": [
        "al-Bukhari, <em>as-Sahih</em>, Nr. 1.",
        "Ibn Kathir, <em>Tafsir al-Quran al-Azim</em>, zu 2:255.",
    ],
}

# Quran- und Hadith-Bloecke im body. Die Funktion ayah() steht in content.py
# bereits zur Verfuegung – im body einfach per + einfuegen:
#
#   "body": """
#   <p>Text davor.</p>
#   """ + ayah("﴿…arabischer Text…﴾",
#              "&bdquo;Deutsche Übersetzung.&ldquo;",
#              "Surat al-Baqarah, 2:255") + """
#   <p>Text danach.</p>
#   """
#
# Fuer einen Hadith zusaetzlich kind="hadith":
#
#   ayah("«…arabisch…»", "&bdquo;Übersetzung.&ldquo;", "al-Bukhari, Nr. 1", kind="hadith")
#
# Anfuehrungszeichen bitte als &bdquo; (oeffnend) und &ldquo; (schliessend)
# schreiben – das haelt die Datei robust.


# ---------------------------------------------------------------- Kurs
# Nach COURSES in content.py. Sobald hier ein Kurs steht, erscheint auf der
# Unterrichtsseite zusaetzlich der Abschnitt "Aufgezeichnete Kurse".
KURS_VORLAGE = {
    "slug": "arabische-grammatik",
    "title": "Arabische Grammatik",
    "lang": "de", "lang_label": "Deutsch",
    "level": "Grundstufe",
    "lessons": 18, "hours": 14,
    "price_eur": 89,
    "teacher": "S. Eslem",
    "intro_video": "",
    "summary": "Ein bis zwei Sätze für Übersicht und Suche.",
    "goal": "Was der Teilnehmer nach dem Kurs kann.",
    "audience": ["Für wen der Kurs gedacht ist", "Weitere Zielgruppe"],
    "prereq": ["Was vorausgesetzt wird"],
    "learn": ["Lernziel eins", "Lernziel zwei"],
    "materials": ["18 Videolektionen", "PDF-Lernblatt je Lektion"],
    "curriculum": [
        ("Einführung", ["Punkt eins", "Punkt zwei"], True),
        ("Zweite Lektion", ["Punkt eins"], False),
    ],
}

# ---------------------------------------------------------------- Paket
# Nach PACKAGES. Erscheint erst, wenn mindestens zwei Kurse vorhanden sind.
PAKET_VORLAGE = {
    "slug": "paket-de", "title": "Deutsches Gesamtpaket", "lang_label": "Deutsch",
    "price_eur": 199,
    "includes": ["arabische-grammatik"],   # slugs aus COURSES
    "note": "Was das Paket enthält und wie lange der Zugang gilt.",
}

# ---------------------------------------------------------------- Antwort
# Nach QA_PUBLIC. Erscheint anonymisiert im oeffentlichen Archiv.
ANTWORT_VORLAGE = {
    "cat": "Gebet",
    "q": "Die Frage, wie sie veröffentlicht werden soll – ohne persönliche Angaben.",
    "a": "Die Antwort. HTML ist erlaubt, etwa <strong>Hervorhebungen</strong> "
         "oder <em>Kursives</em>.",
    "date": "2026-01-15",
}


# ---------------------------------------------------------------- Neuigkeit
# Nach NEWS in content.py. Einladungen, Unterrichtsankuendigungen, Mitteilungen.
# Der Eintrag erscheint vollstaendig in der Liste – eine eigene Seite braucht
# es dafuer nicht.
NEUIGKEIT_VORLAGE = {
    "date": "2026-02-14",
    "kind": "Einladung",              # Einladung | Unterricht | Ankündigung
    "title": "Titel der Mitteilung",
    "body": """<p>Der Text der Mitteilung. HTML ist erlaubt, etwa
    <strong>Hervorhebungen</strong> oder <a href="/kurse.html">Verweise</a>.</p>
    <p>Ein zweiter Absatz, falls noetig.</p>""",
}
