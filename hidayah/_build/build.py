# -*- coding: utf-8 -*-
"""Baut die statische Website nach hidayah/  ->  python3 _build/build.py

Grundregel: Seiten und Verzeichnisse entstehen nur fuer vorhandene Inhalte.
Leere Bereiche erzeugen keine Seiten, keine Navigationspunkte, keine
Sitemap-Eintraege und keine Suchtreffer.
"""
import os, re, json, sys, shutil, datetime
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
OUT = os.path.abspath(os.path.join(HERE, ".."))

from content import (SITE, ARTICLES, COURSES, PACKAGES, SERIES, QA_PUBLIC)
from layout import LANGS, page, u, t
import pages as P

TODAY = datetime.date.today().isoformat()
written = []


def write(path, text):
    full = os.path.join(OUT, path.lstrip("/"))
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, "w", encoding="utf-8") as f:
        f.write(text)
    written.append("/" + path.lstrip("/"))


def strip(html):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", html)).strip()


# Alte Ausgabe entfernen, damit geloeschte Inhalte keine Seiten hinterlassen
for d in ("artikel", "kurse", "wissen", "en", "tr", "ar"):
    shutil.rmtree(os.path.join(OUT, d), ignore_errors=True)
for f in ("konto.html", "wissen.html", "kurse.html"):
    p = os.path.join(OUT, f)
    if os.path.exists(p):
        os.remove(p)

# ------------------------------------------------------------------ Seiten
for lang, _lname, _code in LANGS:
    pre = "" if lang == "de" else lang + "/"

    write(pre + "index.html", page(
        lang=lang, slug="", title="Hidayah", active="nav.home", with_intro=True,
        desc=t(lang, "slogan") + " " + strip(t(lang, "hero.sub")),
        body=P.home(lang)))

    write(pre + "ueber-uns.html", page(
        lang=lang, slug="ueber-uns.html", title=t(lang, "nav.about"), active="nav.about",
        desc="Wie Hidayah entstand, warum der Name Hidayah gewaehlt wurde, unsere Mission, "
             "unsere Grundlage und unser Team.",
        body=P.about(lang)))

    write(pre + "artikel.html", page(
        lang=lang, slug="artikel.html", title=t(lang, "nav.knowledge"), active="nav.knowledge",
        desc=strip(t(lang, "areas.k.text")), body=P.archive(lang)))

    write(pre + "frage-antwort.html", page(
        lang=lang, slug="frage-antwort.html", title=strip(t(lang, "nav.qa")), active="nav.qa",
        desc=strip(t(lang, "areas.q.text")), body=P.qa(lang)))

    write(pre + "unterricht.html", page(
        lang=lang, slug="unterricht.html", title=t(lang, "nav.courses"), active="nav.courses",
        desc=strip(t(lang, "teach.lead")), body=P.teaching(lang)))

    write(pre + "kontakt.html", page(
        lang=lang, slug="kontakt.html", title=t(lang, "nav.contact"), active="nav.contact",
        desc="Kontaktiere Hidayah. Religioese Fragen bitte ueber Frage und Antwort stellen.",
        body=P.contact(lang)))

    for kind in ("impressum", "datenschutz", "agb", "widerruf"):
        write(pre + kind + ".html", page(
            lang=lang, slug=kind + ".html", title=P.LEGAL_TITLES[kind],
            desc="Rechtliche Informationen zu Hidayah.", body=P.legal(lang, kind)))

    write(pre + "404.html", page(
        lang=lang, slug="404.html", title="Seite nicht gefunden",
        desc="Diese Seite existiert nicht.", body=P.notfound(lang)))

# Detailseiten liegen auf Deutsch vor
for a in ARTICLES:
    ld = json.dumps({
        "@context": "https://schema.org", "@type": "Article",
        "headline": a["title"], "description": strip(a["summary"]),
        "author": {"@type": "Person", "name": P.author_of(a)},
        "publisher": {"@type": "Organization", "name": "Hidayah",
                      "logo": {"@type": "ImageObject", "url": SITE["url"] + "/assets/img/icon-512.png"}},
        "datePublished": a["date"],
        "mainEntityOfPage": SITE["url"] + "/artikel/" + a["slug"] + ".html",
        "image": SITE["url"] + "/assets/img/og-image.jpg", "inLanguage": "de",
    }, ensure_ascii=False)
    write("artikel/" + a["slug"] + ".html", page(
        lang="de", slug="artikel/" + a["slug"] + ".html", title=a["title"], active="nav.knowledge",
        desc=strip(a["summary"])[:300], body=P.article_page(a, "de"),
        extra_head='<script type="application/ld+json">%s</script>\n' % ld))

for c in COURSES:
    ld = json.dumps({
        "@context": "https://schema.org", "@type": "Course",
        "name": c["title"], "description": strip(c["summary"]),
        "provider": {"@type": "Organization", "name": "Hidayah", "url": SITE["url"]},
        "inLanguage": c["lang"],
        "offers": {"@type": "Offer", "price": c["price_eur"], "priceCurrency": "EUR",
                   "url": SITE["url"] + "/kurse/" + c["slug"] + ".html"},
    }, ensure_ascii=False)
    write("kurse/" + c["slug"] + ".html", page(
        lang="de", slug="kurse/" + c["slug"] + ".html", title=c["title"], active="nav.courses",
        desc=strip(c["summary"])[:300], body=P.course_page(c, "de"),
        extra_head='<script type="application/ld+json">%s</script>\n' % ld))

write("assets/js/config.js",
      "window.HIDAYAH_FORM_ENDPOINT=%s;\n" % json.dumps(SITE["form_endpoint"]))

# ------------------------------------------------------------------ Suchindex
SERIES_NAME = {x["key"]: x["name"] for x in SERIES}
index = []
for a in ARTICLES:
    index.append({"g": "articles", "t": a["title"], "u": "/artikel/%s.html" % a["slug"],
                  "s": SERIES_NAME[a["series"]],
                  "k": strip(a["summary"]) + " " + P.author_of(a)})
for c in COURSES:
    index.append({"g": "courses", "t": c["title"], "u": "/kurse/%s.html" % c["slug"],
                  "s": "%s · %s Lektionen" % (c["lang_label"], c["lessons"]),
                  "k": strip(c["summary"]) + " " + c["teacher"]})
for q in QA_PUBLIC:
    index.append({"g": "qa", "t": q["q"], "u": "/frage-antwort.html", "s": q["cat"],
                  "k": strip(q["a"])})

write("assets/js/search-index.js",
      "window.HIDAYAH_INDEX=%s;\n" % json.dumps(index, ensure_ascii=False, separators=(",", ":")))

# ------------------------------------------------------------------ Meta-Dateien
urls = []
for lang, _n, _c in LANGS:
    for sl in ("", "ueber-uns.html", "artikel.html", "frage-antwort.html", "unterricht.html",
               "kontakt.html", "impressum.html", "datenschutz.html", "agb.html", "widerruf.html"):
        urls.append((u(lang, sl), "1.0" if sl == "" else "0.7"))
for a in ARTICLES:
    urls.append(("/artikel/%s.html" % a["slug"], "0.8"))
for c in COURSES:
    urls.append(("/kurse/%s.html" % c["slug"], "0.8"))

sm = ['<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for path, prio in urls:
    sm.append("  <url><loc>%s%s</loc><lastmod>%s</lastmod><priority>%s</priority></url>"
              % (SITE["url"], path, TODAY, prio))
sm.append("</urlset>")
write("sitemap.xml", "\n".join(sm) + "\n")

write("robots.txt", "User-agent: *\nAllow: /\n\nSitemap: %s/sitemap.xml\n" % SITE["url"])

write("site.webmanifest", json.dumps({
    "name": "Hidayah", "short_name": "Hidayah", "description": SITE["slogan"],
    "start_url": "/", "scope": "/", "display": "standalone",
    "background_color": "#FBFAF6", "theme_color": "#FBFAF6", "lang": "de",
    "icons": [
        {"src": "/assets/img/icon-192.png", "sizes": "192x192", "type": "image/png"},
        {"src": "/assets/img/icon-512.png", "sizes": "512x512", "type": "image/png"},
        {"src": "/assets/img/icon-maskable-512.png", "sizes": "512x512", "type": "image/png",
         "purpose": "maskable"},
    ],
}, ensure_ascii=False, indent=2) + "\n")

write("_headers", """/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=(), interest-cohort=()
  Content-Security-Policy: default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; font-src 'self'; frame-src https:; form-action 'self' https://formspree.io; frame-ancestors 'none'; base-uri 'self'

/assets/fonts/*
  Cache-Control: public, max-age=31536000, immutable

/assets/img/*
  Cache-Control: public, max-age=31536000, immutable

/assets/css/*
  Cache-Control: public, max-age=604800

/assets/js/*
  Cache-Control: public, max-age=604800
""")

# Alte Adressen weiterleiten
red = ["/wissen.html  /artikel.html  301",
       "/wissen/*  /artikel/:splat  301",
       "/kurse.html  /unterricht.html  301",
       "/konto.html  /  301",
       "/*  /404.html  404"]
write("_redirects", "\n".join(red) + "\n")

print("Erstellt: %d Dateien" % len(written))
print("Artikel: %d | Kurse: %d | Q&A oeffentlich: %d" % (len(ARTICLES), len(COURSES), len(QA_PUBLIC)))
