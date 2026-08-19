# -*- coding: utf-8 -*-
"""Inhalte fuer hidayah.

Grundsatz: Hier stehen die festen Bereiche der Plattform. Einzelne Beitraege
(Artikel, Kurse, veroeffentlichte Antworten) werden ergaenzt, sobald sie
vorliegen. Was nicht eingetragen ist, erscheint auf der Website auch nicht.
"""

SITE = {
    "name": "Hidayah",
    "slogan": "Auf der Suche nach Licht in einer Welt voller Dunkelheit.",
    "tagline": "Islamisches Wissen. Emru bil maruf, nehyu anil munker. Orientierung.",
    "url": "https://hidayah.de",
    "email": "salam@hidayah.de",
    "instagram": "https://instagram.com/hidayah",
    "youtube": "https://youtube.com/@hidayah",
    "x": "https://x.com/hidayah",
    # Formspree o. Ae. eintragen, dann versenden die Formulare echte E-Mails.
    "form_endpoint": "https://formspree.io/f/DEINE-FORM-ID",
    # Vorstellungsvideo auf der Startseite. Leer = Bereich erscheint nicht.
    "intro_video": "",
}

# ---------------------------------------------------------------- Reihen
# Die drei festen Reihen des Wissensarchivs. Jede Reihe hat einen
# Verantwortlichen, der sie betreut. Artikel erben den Autor von ihrer Reihe.
SERIES = [
    {
        "key": "terminologie",
        "name": "Islamische Terminologie",
        "desc": "Zentrale Begriffe des Islam – erklärt, eingeordnet und belegt.",
    },
    {
        "key": "rechtsurteile",
        "name": "Islamische Rechtsurteile",
        "desc": "Fragen des Fiqh auf Grundlage anerkannter Quellen und Gelehrter.",
    },
    {
        "key": "zweifel",
        "name": "Aufklärung von Zweifeln zum Islam",
        "desc": "Antworten auf Behauptungen, Missverständnisse und mediale Darstellungen.",
    },
]

# Beitraege erscheinen unter diesem Namen, solange im Artikel kein eigener
# Autor eingetragen ist.
DEFAULT_AUTHOR = "Hidayah"


def ayah(ar, de, src, kind=""):
    """Quran- oder Hadith-Block fuer den Artikeltext."""
    cls = "ayah ayah--hadith" if kind == "hadith" else "ayah"
    return ('<figure class="%s"><p class="ayah__ar" lang="ar" dir="rtl">%s</p>'
            '<p class="ayah__de">%s</p><figcaption class="ayah__src">%s</figcaption></figure>'
            % (cls, ar, de, src))


# ---------------------------------------------------------------- Artikel
# Ein Artikel kann einer Reihe zugeordnet werden ("series"), muss es aber
# nicht — allgemeine Beitraege lassen das Feld einfach weg.
# Aufbau eines Eintrags siehe _build/vorlagen.py
ARTICLES = []

# ---------------------------------------------------------------- Unterricht
# Persoenlicher Einzelunterricht. Der Preis entsteht erst nach dem Gespraech.
TEACHING = {
    "steps": [
        ("Bewerbung", "Du stellst dich kurz vor: was du lernen möchtest, warum, und wo du stehst."),
        ("Prüfung", "Wir sehen uns deine Bewerbung in Ruhe an und melden uns bei dir zurück."),
        ("Gespräch", "Ein persönliches Gespräch per FaceTime oder Telefon – damit wir dich und "
                     "dein Ziel richtig einschätzen."),
        ("Programm", "Wir stellen ein Programm auf deinen Stand zusammen. Der Umfang und damit "
                     "auch der Beitrag werden erst in diesem Gespräch festgelegt."),
    ],
    "subjects": ["Arabische Sprache", "Quran & Tajwid", "Aqidah", "Fiqh",
                 "Hadith", "Sirah", "Etwas anderes"],
    # Unterrichtssprache. Der Bewerber waehlt selbst; unterrichtet wird in der gewaehlten Sprache.
    "languages": ["Deutsch", "Türkisch", "Arabisch"],
    "levels": ["Keine Vorkenntnisse", "Grundlagen vorhanden", "Fortgeschritten"],
    "arabic": ["Ja, flüssig", "Mit Mühe", "Nein, noch nicht"],
    "time": ["1–2 Stunden pro Woche", "3–4 Stunden pro Woche", "5 Stunden pro Woche oder mehr"],
    "media": ["FaceTime", "Telefon", "WhatsApp"],
}

# ---------------------------------------------------------------- Kurse
# Aufgezeichnete Kurse. Leer = es erscheint nur der Einzelunterricht.
# Muster siehe _build/vorlagen.py
COURSES = []
PACKAGES = []

# ---------------------------------------------------------------- Neuigkeiten
# Einladungen, Unterrichtsankuendigungen und Mitteilungen.
# Leer = der Bereich erscheint mit einem kurzen Hinweis, ohne Liste.
# Aufbau eines Eintrags siehe _build/vorlagen.py
NEWS = []

# Art der Mitteilung. Erscheint als kleine Marke ueber dem Titel.
NEWS_KINDS = ["Einladung", "Unterricht", "Ankündigung"]

# ---------------------------------------------------------------- Frage & Antwort
QA_CATEGORIES = ["Aqidah", "Fiqh", "Gebet", "Fasten", "Ehe & Familie", "Handel",
                 "Emru bil maruf, nehyu anil munker", "Allgemeine islamische Fragen"]

# Oeffentlich veroeffentlichte, anonymisierte Antworten.
# Leer = kein oeffentliches Archiv, das Frageformular bleibt bestehen.
QA_PUBLIC = []

# ---------------------------------------------------------------- Team
TEAM = [
    {"name": "A. Sirac", "initials": "AS",
     "bio": "Beschäftigt sich seit mehreren Jahren mit den islamischen Wissenschaften und hat bei "
            "verschiedenen Lehrern Unterricht genommen. Darüber hinaus ist er der Verantwortliche "
            "für organisatorische Angelegenheiten und die Planung der gemeinsamen Arbeit."},
    {"name": "S. Eslem", "initials": "SE",
     "bio": "Hat einen mehrjährigen strukturierten Studienweg in verschiedenen islamischen "
            "Wissenschaften absolviert und Ijazat von verschiedenen Lehrern erhalten. Zudem "
            "befasst er sich mit Recherche, Quellenprüfung und inhaltlicher Kontrolle."},
    {"name": "M. Selman", "initials": "MS",
     "bio": "Beschäftigt sich seit mehreren Jahren mit den islamischen Wissenschaften, hat den "
            "Quran auswendig gelernt und widmet sich insbesondere dem Quran-Unterricht, dem Tafsir "
            "sowie der Vermittlung von Tajwid und korrekter Rezitation."},
]
