# -*- coding: utf-8 -*-
"""Baut die Koerper (body) aller Seiten.

Grundregel: Es wird nichts angezeigt, wofuer es keine Inhalte gibt.
Jeder Abschnitt prueft seine Datenquelle und entfaellt, wenn sie leer ist.
"""
import re
from content import (SITE, SERIES, TOPICS, MADHAHIB, ARTICLES, COURSES, PACKAGES,
                     QA_CATEGORIES, QA_PUBLIC, TEAM)
from layout import t, u, ICON

MONTHS = {"de": ["Januar","Februar","März","April","Mai","Juni","Juli","August",
                 "September","Oktober","November","Dezember"],
          "en": ["January","February","March","April","May","June","July","August",
                 "September","October","November","December"],
          "tr": ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos",
                 "Eylül","Ekim","Kasım","Aralık"],
          "ar": ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس",
                 "سبتمبر","أكتوبر","نوفمبر","ديسمبر"]}
SERIES_MAP = {k: (n, d) for k, n, d in SERIES}
TOPIC_MAP = dict(TOPICS)
MADH_MAP = dict(MADHAHIB)


def fdate(iso, lang="de"):
    y, m, d = iso.split("-")
    ms = MONTHS.get(lang, MONTHS["de"])[int(m) - 1]
    return "%d. %s %s" % (int(d), ms, y) if lang in ("de", "tr") else "%s %d, %s" % (ms, int(d), y)


def sorted_articles():
    return sorted(ARTICLES, key=lambda a: a["date"], reverse=True)


def used_series():
    """Nur Reihen, die tatsaechlich Artikel enthalten."""
    return [(k, n, d) for k, n, d in SERIES if any(a["series"] == k for a in ARTICLES)]


def used_topics():
    """Nur Themen, die tatsaechlich vergeben sind."""
    return [(k, n) for k, n in TOPICS if any(k in a["topics"] for a in ARTICLES)]


# ------------------------------------------------------------------ Bausteine
def crumbs(lang, items):
    parts = ['<span><a href="%s">%s</a></span>' % (h, l) if h else "<span>%s</span>" % l
             for l, h in items]
    return '<nav class="crumbs" aria-label="Breadcrumb">%s</nav>' % "".join(parts)


def entry(a, lang):
    """Eine Zeile im Artikelverzeichnis."""
    return '''<a class="entry" href="%(href)s">
  <div class="entry__meta"><span class="entry__cat">%(cat)s</span><span>%(date)s</span>
    <span>%(min)d %(minlbl)s</span></div>
  <div>
    <h3 class="entry__title">%(title)s</h3>
    <p class="entry__excerpt">%(sum)s</p>
  </div>
</a>''' % {"href": u("de", "artikel/%s.html" % a["slug"]),
            "cat": SERIES_MAP[a["series"]][0], "date": fdate(a["date"], lang),
            "min": a["reading"], "minlbl": t(lang, "c.min"),
            "title": a["title"], "sum": a["summary"]}


def course_card(c, lang):
    return '''<a class="card" href="%(href)s">
  <span class="tag tag--quiet" style="align-self:flex-start;margin-bottom:.9rem">%(lang)s</span>
  <h3 class="card__title">%(title)s</h3>
  <p class="card__text">%(sum)s</p>
  <div class="card__foot" style="display:flex;align-items:baseline;justify-content:space-between;gap:1rem">
    <span style="font-family:var(--ff-display);font-size:1.3rem;font-weight:600;color:var(--accent)">
      %(eur)s&nbsp;&euro;</span>
    <span class="dim" style="font-size:.85rem">%(les)d %(leslbl)s</span>
  </div>
</a>''' % {"href": u("de", "kurse/%s.html" % c["slug"]), "lang": c["lang_label"],
            "title": c["title"], "sum": c["summary"], "eur": c["price_eur"],
            "les": c["lessons"], "leslbl": "Lektionen" if lang != "tr" else "ders"}


def video_block(url, caption):
    """Nur echte Videos. Ohne URL entsteht kein Platzhalter."""
    if not url:
        return ""
    return ('<div style="margin-block:2.5rem;border-radius:var(--r);overflow:hidden;'
            'border:1px solid var(--line);aspect-ratio:16/9">'
            '<iframe src="%s" title="%s" loading="lazy" allowfullscreen '
            'style="width:100%%;height:100%%;border:0"></iframe></div>' % (url, caption))


def lang_notice(lang):
    if lang == "de":
        return ""
    return ('<div class="notice" style="margin-bottom:2.5rem">%s<div>%s</div></div>'
            % (ICON["info"], t(lang, "c.langnote")))


# ------------------------------------------------------------------ Startseite
def home(lang):
    out = ['''
<section class="hero night">
  <div class="hero__sky" aria-hidden="true"></div>
  <div class="container">
    <img class="hero__logo" src="/assets/img/logo.webp" alt="Hidayah"
         width="1400" height="476" fetchpriority="high">
    <h1 class="hero__slogan display-xl balance">%(slogan)s</h1>
    <p class="hero__sub">%(sub)s</p>
    <div class="btn-row">%(cta)s</div>
    <p class="hero__seal">%(seal)s</p>
  </div>
</section>''' % {
        "slogan": t(lang, "slogan"), "sub": t(lang, "hero.sub"),
        "cta": ('<a class="btn btn--primary" href="%s">%s</a>' % (u(lang, "artikel.html"), t(lang, "hero.cta1"))
                if ARTICLES else "") +
               '<a class="btn btn--quiet" href="%s">%s</a>' % (u(lang, "frage-antwort.html"), t(lang, "hero.cta2")),
        "seal": "Quran &amp; Sunnah" if lang != "ar" else "القرآن والسنة",
    }]

    # Wer wir sind
    out.append('''
<section class="section reveal">
  <div class="container">
    <div class="split">
      <p class="eyebrow">%(eb)s</p>
      <div>
        <h2 class="balance" style="max-width:16ch">%(title)s</h2>
        <div class="stack" style="margin-top:1.6rem">
          <p class="lead">%(p1)s</p>
          <p class="lead">%(p2)s</p>
        </div>
        <div class="btn-row" style="margin-top:1.8rem">
          <a class="link" href="%(href)s">%(cta)s <span class="arw">&rarr;</span></a>
        </div>
      </div>
    </div>
  </div>
</section>''' % {"eb": t(lang, "who.eyebrow"), "title": t(lang, "who.title"),
                 "p1": t(lang, "who.p1"), "p2": t(lang, "who.p2"),
                 "href": u(lang, "ueber-uns.html"), "cta": t(lang, "who.cta")})

    # Optionales Vorstellungsvideo
    if SITE.get("intro_video"):
        out.append('<section class="section reveal"><div class="container-narrow">'
                   '<p class="eyebrow">%s</p><h2>%s</h2>%s</div></section>'
                   % (t(lang, "video.eyebrow"), t(lang, "video.title"),
                      video_block(SITE["intro_video"], t(lang, "video.title"))))

    # Bereiche — nur, was es gibt
    areas = []
    if ARTICLES:
        areas.append((t(lang, "areas.k.title"), t(lang, "areas.k.text"), u(lang, "artikel.html")))
    areas.append((t(lang, "areas.q.title"), t(lang, "areas.q.text"), u(lang, "frage-antwort.html")))
    if COURSES:
        areas.append((t(lang, "areas.c.title"), t(lang, "areas.c.text"), u(lang, "kurse.html")))
    if len(areas) > 1:
        rows = "".join('''<a class="area" href="%s">
      <span class="area__num">%02d</span>
      <div><h3 class="area__title">%s</h3><p class="area__text">%s</p></div>
      <span class="area__go">%s</span>
    </a>''' % (href, i + 1, title, text, ICON["arrow"])
                       for i, (title, text, href) in enumerate(areas))
        out.append('''
<section class="section reveal">
  <div class="container">
    <div class="section-head"><p class="eyebrow">%s</p><h2 class="balance">%s</h2></div>
    <div class="areas">%s</div>
  </div>
</section>''' % (t(lang, "areas.eyebrow"), t(lang, "areas.title"), rows))

    # Neueste Artikel
    if ARTICLES:
        latest = sorted_articles()[:3]
        more = ('<a class="link" href="%s">%s <span class="arw">&rarr;</span></a>'
                % (u(lang, "artikel.html"), t(lang, "latest.all"))) if len(ARTICLES) > 3 else ""
        out.append('''
<section class="section reveal">
  <div class="container">
    <div class="section-head section-head--split">
      <div><p class="eyebrow">%s</p><h2>%s</h2></div>%s
    </div>
    %s
    <div class="index">%s</div>
  </div>
</section>''' % (t(lang, "latest.eyebrow"), t(lang, "latest.title"), more,
                 lang_notice(lang), "".join(entry(a, lang) for a in latest)))

    # Empfohlene Kurse
    if COURSES:
        more = ('<a class="link" href="%s">%s <span class="arw">&rarr;</span></a>'
                % (u(lang, "kurse.html"), t(lang, "rec.all"))) if len(COURSES) > 3 else ""
        out.append('''
<section class="section reveal">
  <div class="container">
    <div class="section-head section-head--split">
      <div><p class="eyebrow">%s</p><h2>%s</h2></div>%s
    </div>
    <div class="grid grid--3">%s</div>
  </div>
</section>''' % (t(lang, "rec.eyebrow"), t(lang, "rec.title"), more,
                 "".join(course_card(c, lang) for c in COURSES[:3])))

    # Newsletter
    out.append('''
<section class="section--tight reveal">
  <div class="container">
    <div class="band">
      <h2 class="balance">%(title)s</h2>
      <p>%(text)s</p>
      <form data-form="newsletter" novalidate>
        <input class="input" type="email" name="email" required placeholder="%(ph)s" aria-label="%(ph)s">
        <button class="btn btn--primary" type="submit">%(btn)s</button>
      </form>
      <p class="form-note">%(privacy)s</p>
      <p class="form-status" data-status></p>
    </div>
  </div>
</section>''' % {"title": t(lang, "news.title"), "text": t(lang, "news.text"),
                 "ph": t(lang, "news.ph"), "btn": t(lang, "news.btn"),
                 "privacy": t(lang, "news.privacy")})
    return "".join(out)


# ------------------------------------------------------------------ Über uns
def about(lang):
    def q(ar, de, src, kind=""):
        cls = "ayah ayah--hadith" if kind == "hadith" else "ayah"
        return ('<figure class="%s"><p class="ayah__ar" lang="ar" dir="rtl">%s</p>'
                '<p class="ayah__de">%s</p><figcaption class="ayah__src">%s</figcaption></figure>'
                % (cls, ar, de, src))

    team = "".join('''<div class="card">
      <div class="member__mono">%s</div>
      <p class="member__role">%s</p>
      <h3 class="card__title" style="margin-bottom:.5rem">%s</h3>
      <p class="card__text">%s</p>
      <ul class="member__list">%s</ul>
    </div>''' % (m["initials"], m["role"], m["name"], m["bio"],
                 "".join("<li>%s</li>" % f for f in m["focus"])) for m in TEAM)

    return '''
<section class="section" style="padding-bottom:0">
  <div class="container-narrow">
    %(crumbs)s
    <p class="eyebrow">%(eb)s</p>
    <h1 class="balance">%(title)s</h1>
    <p class="lead" style="margin-top:1.6rem">%(intro)s</p>
    %(notice)s
  </div>
</section>

<section class="section">
  <div class="container-narrow">
    <article class="prose">
      <h2 id="entstehung">Entstehung von Hidayah</h2>
      <p>Hidayah entstand im Oktober 2024 nach Gesprächen und Beratungen zwischen drei Brüdern sowie
      mit unseren Lehrern und Shuyukh. Dahinter stand die gemeinsame Überzeugung, dass es notwendig
      ist, das Gelernte nicht nur für sich selbst zu bewahren, sondern damit nach außen zu treten und
      &ndash; entsprechend den eigenen Möglichkeiten &ndash; einen Beitrag für den Islam und die
      Muslime zu leisten.</p>
      <p>Eine wichtige Rolle spielten dabei auch die Ereignisse in Gaza. Hidayah entstand jedoch nicht
      lediglich als emotionale Reaktion darauf. Was dort geschah, war vielmehr eine Erinnerung an eine
      Realität, die nicht erst mit Gaza begonnen hat und auch nicht mit Gaza enden wird. Muslime wurden
      zu verschiedenen Zeiten geprüft, unterdrückt und aufgrund ihres Glaubens bekämpft.</p>
      <p>Für uns stellte sich deshalb nicht nur die Frage, was gerade geschieht, sondern vielmehr:
      Was bedeutet es eigentlich, Muslim zu sein? Was verlangt der Islam von uns? Warum halten wir
      trotz Prüfungen und Schwierigkeiten an diesem Weg fest?</p>
      <p>In dieser Zeit gingen viele Menschen auf die Straße, Organisationen veranstalteten
      Demonstrationen und zahlreiche Stimmen machten auf das Leid in Gaza aufmerksam. Wir stellten
      jedoch gleichzeitig fest, dass der Islam selbst oftmals kaum erklärt oder repräsentiert wurde.</p>
      <p>Für uns war deshalb klar: <strong>Wenn ein Muslim für eine islamische Angelegenheit spricht,
      sollte seine Botschaft nicht bei einem politischen oder gesellschaftlichen Thema enden.</strong>
      Sie sollte letztlich auch zu Allah führen und den Menschen zeigen, was der Islam ist, wofür er
      steht und wozu er den Menschen ruft.</p>
      <p>Daraus entwickelte sich unser Weg: Dawah zu machen, islamisches Wissen weiterzugeben,
      Missverständnisse aufzuklären und dort zu helfen, wo wir mit unseren Möglichkeiten helfen können.</p>
      <p>Ein weiterer Grund für die Entstehung von Hidayah war die Art und Weise, wie islamisches
      Wissen heute verbreitet wird. Durch soziale Medien kann nahezu jeder über religiöse Themen
      sprechen. Dadurch wird Wissen teilweise ohne ausreichende Grundlagen weitergegeben, Aussagen
      werden aus ihrem Zusammenhang gerissen und komplexe Fragen werden von Menschen behandelt, denen
      die notwendigen Grundlagen fehlen.</p>
      <p>Nach mehreren Jahren des Lernens, dem Begleiten unserer Lehrer und dem Erhalt von Ijazat
      entstand deshalb &ndash; gemeinsam mit unseren Lehrern und Shuyukh &ndash; der Entschluss, selbst
      Verantwortung zu übernehmen und das Gelernte auf zugängliche und zugleich fundierte Weise
      weiterzugeben.</p>

      <h2 id="name">Warum der Name &bdquo;Hidayah&ldquo;?</h2>
      <p>Hidayah bedeutet: <strong>Rechtleitung</strong>. Einer der Verse, die bei der Wahl dieses
      Namens eine besondere Bedeutung hatten, ist die Aussage Allahs:</p>
      %(ay1)s
      <p>Der Name soll zuerst uns selbst daran erinnern, dass Rechtleitung allein von Allah kommt.
      Wissen, Dawah und die eigenen Bemühungen sind lediglich Mittel. Niemand kann einem Herzen die
      Rechtleitung geben außer Allah.</p>
      <p>Hidayah soll deshalb nicht um Personen aufgebaut sein. Unser Ziel ist es, Menschen zum Islam,
      zum Wissen und letztlich zu Allah zu führen und gleichzeitig selbst auf diesem Weg standhaft zu
      bleiben. Denn auch wir sind weiterhin: <em>Auf der Suche nach Licht in einer Welt voller
      Dunkelheit.</em></p>

      <h2 id="mission">Unsere Mission</h2>
      <p>Unsere Mission ist es, die Menschen zum Tawhid &ndash; zur alleinigen Anbetung Allahs &ndash;
      aufzurufen, den Islam auf Grundlage authentischen Wissens zu vermitteln und Muslime darin zu
      stärken, ihren Glauben zu verstehen, zu leben und darin standhaft zu bleiben.</p>

      <h2 id="grundlage">Unsere Grundlage</h2>
      <p>Unsere Grundlage sind der Quran und die authentische Sunnah des Gesandten Allahs &#65018;
      nach dem Verständnis der Sahabah und der rechtschaffenen frühen Generationen
      &ndash; as-Salaf as-Salih.</p>
      %(ay2)s
      <p>Islamisches Wissen bedeutet für uns deshalb nicht, Quran und Sunnah nach persönlichen
      Vorstellungen auszulegen. <strong>Wissen wird von seinen Leuten genommen.</strong></p>
      %(ay3)s
      %(hd)s
      <p>Daher gehören die Rückkehr zu den Gelehrten, das Lernen bei ihnen und ein fundierter
      wissenschaftlicher Weg zu den Grundlagen unserer Arbeit.</p>
      <p>In der Aqidah folgen wir dem Weg von Ahl as-Sunnah wa-l-Jamaah, wie ihn die Sahabah und die
      Salaf verstanden und überliefert haben. Im Fiqh erkennen und respektieren wir die vier bekannten
      Rechtsschulen:</p>
      <p style="font-family:var(--ff-display);font-size:1.2rem;color:var(--accent);text-align:center;
      padding:1.3rem 0;border-block:1px solid var(--line);letter-spacing:.02em">%(madh)s</p>
      <p>Anerkannte Meinungsverschiedenheiten behandeln wir mit Wissen, Gerechtigkeit und Respekt.
      Unser Ziel ist nicht, einen neuen Weg zu schaffen oder den Islam nach eigenen Vorstellungen zu
      formen. <strong>Unser Ziel ist es, dem zu folgen, was bereits vorgegeben wurde.</strong></p>
    </article>
  </div>
</section>

<section class="section section--hairline">
  <div class="container">
    <div class="split">
      <p class="eyebrow">Unser Team</p>
      <div>
        <h2 class="balance" style="max-width:15ch">Drei Brüder, ein gemeinsamer Weg</h2>
        <p class="lead" style="margin-top:1.4rem">Die jeweiligen Aufgaben und Themenbereiche richten
        sich nach dem Wissensstand und den Schwerpunkten des Einzelnen. Die Personen sollen sichtbar
        sein &ndash; Hidayah wird jedoch nicht um einzelne Personen aufgebaut.</p>
        <div class="grid grid--3" style="margin-top:2.5rem">%(team)s</div>
      </div>
    </div>
  </div>
</section>''' % {
        "crumbs": crumbs(lang, [(t(lang, "nav.home"), u(lang)), (t(lang, "nav.about"), None)]),
        "eb": t(lang, "nav.about"), "title": t(lang, "who.title"), "intro": t(lang, "who.p1"),
        "notice": lang_notice(lang),
        "ay1": q("﴿وَقَالُوا الْحَمْدُ لِلّٰهِ الَّذِي هَدَانَا لِهٰذَا وَمَا كُنَّا لِنَهْتَدِيَ لَوْلَا أَنْ هَدَانَا اللّٰهُ﴾",
                 "&bdquo;Und sie werden sagen: Alles Lob gebührt Allah, Der uns hierher rechtgeleitet "
                 "hat. Wir hätten niemals die Rechtleitung gefunden, wenn Allah uns nicht rechtgeleitet "
                 "hätte.&ldquo;", "Surat al-Araf, 7:43"),
        "ay2": q("﴿وَالسَّابِقُونَ الْأَوَّلُونَ مِنَ الْمُهَاجِرِينَ وَالْأَنْصَارِ وَالَّذِينَ اتَّبَعُوهُمْ بِإِحْسَانٍ رَضِيَ اللَّهُ عَنْهُمْ وَرَضُوا عَنْهُ﴾",
                 "&bdquo;Die ersten Vorausgeeilten von den Muhajirun und den Ansar und diejenigen, die "
                 "ihnen in guter Weise folgen &ndash; Allah ist mit ihnen zufrieden und sie sind mit Ihm "
                 "zufrieden.&ldquo;", "Surat at-Tawbah, 9:100"),
        "ay3": q("﴿إِنَّمَا يَخْشَى اللَّهَ مِنْ عِبَادِهِ الْعُلَمَاءُ﴾",
                 "&bdquo;Allah fürchten von Seinen Dienern wahrhaftig die Gelehrten.&ldquo;",
                 "Surat Fatir, 35:28"),
        "hd": q("«إِنَّ الْعُلَمَاءَ وَرَثَةُ الْأَنْبِيَاءِ»",
                "&bdquo;Wahrlich, die Gelehrten sind die Erben der Propheten.&ldquo;",
                "Abu Dawud, Nr. 3641; at-Tirmidhi, Nr. 2682", "hadith"),
        "madh": " &nbsp;&middot;&nbsp; ".join(n for _, n in MADHAHIB),
        "team": team,
    }


# ------------------------------------------------------------------ Artikelverzeichnis
def articles_index(lang):
    arts = sorted_articles()
    if not arts:
        return ""

    # Filter nur, wenn es wirklich etwas zu filtern gibt
    ser = used_series()
    tops = [(k, n) for k, n in used_topics()
            if sum(1 for a in arts if k in a["topics"]) >= 2]
    options = []
    if len(ser) >= 2:
        options += [("series:" + k, n) for k, n, _ in ser]
    if len(tops) >= 2:
        options += [("topic:" + k, n) for k, n in tops]
    filters = ""
    if options:
        chips = '<button class="chip" type="button" data-filter="all" aria-pressed="true">%s</button>' % t(lang, "c.all")
        chips += "".join('<button class="chip" type="button" data-filter="%s" aria-pressed="false">%s</button>'
                         % (v, n) for v, n in options)
        filters = '<div class="filters" data-filters>%s</div>' % chips

    rows = "".join('<div data-keys="%s">%s</div>'
                   % (" ".join(["series:" + a["series"]] + ["topic:" + x for x in a["topics"]]),
                      entry(a, lang)) for a in arts)

    return '''
<section class="section" style="padding-bottom:0">
  <div class="container">
    %(crumbs)s
    <div class="split">
      <p class="eyebrow">%(eb)s</p>
      <div>
        <h1 class="balance" style="max-width:14ch">%(title)s</h1>
        <p class="lead" style="margin-top:1.5rem">%(text)s</p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    %(notice)s%(filters)s
    <div class="index" data-article-list>%(rows)s</div>
    <p class="search-empty" data-empty hidden>%(empty)s</p>
  </div>
</section>''' % {
        "crumbs": crumbs(lang, [(t(lang, "nav.home"), u(lang)), (t(lang, "nav.knowledge"), None)]),
        "eb": t(lang, "latest.eyebrow"), "title": t(lang, "areas.k.title"),
        "text": t(lang, "areas.k.text"), "notice": lang_notice(lang),
        "filters": filters, "rows": rows, "empty": t(lang, "search.empty"),
    }


# ------------------------------------------------------------------ Artikelseite
def article_page(a, lang):
    heads = re.findall(r'<h2 id="([^"]+)">(.*?)</h2>', a["body"], re.S)
    toc = ""
    if len(heads) >= 3:
        toc = ('<nav class="toc" aria-label="%s"><p class="toc__title">%s</p><ol>%s</ol></nav>'
               % (t(lang, "c.toc"), t(lang, "c.toc"),
                  "".join('<li><a href="#%s">%s</a></li>' % (i, re.sub("<[^>]+>", "", h))
                          for i, h in heads)))
    src = ""
    if a.get("sources"):
        src = ('<section class="sources"><h2>%s</h2><ol>%s</ol></section>'
               % (t(lang, "c.sources"), "".join("<li>%s</li>" % s for s in a["sources"])))

    rel = [x for x in ARTICLES if x["slug"] != a["slug"]
           and (x["series"] == a["series"] or set(x["topics"]) & set(a["topics"]))][:3]
    related = ""
    if rel:
        related = ('<section class="section section--hairline"><div class="container-narrow">'
                   '<h2 style="font-size:1.4rem;margin-bottom:1.5rem">%s</h2>'
                   '<div class="index">%s</div></div></section>'
                   % (t(lang, "c.related"), "".join(entry(r, lang) for r in rel)))

    tags = "".join('<span class="tag tag--quiet">%s</span>' % TOPIC_MAP[x] for x in a["topics"])
    if a.get("madhhab"):
        tags += "".join('<span class="tag tag--quiet">%s</span>' % MADH_MAP[m] for m in a["madhhab"])

    return '''
<article class="article-head">
  <div class="container-narrow">
    %(crumbs)s
    <div style="display:flex;flex-wrap:wrap;gap:.45rem;margin-bottom:1.3rem">
      <span class="tag">%(series)s</span>%(tags)s</div>
    <h1 class="balance">%(title)s</h1>
    <p class="article-summary">%(sum)s</p>
    <div class="article-meta">
      <span>%(by)s %(author)s</span><span>%(date)s</span><span>%(min)d %(minlbl)s</span>
    </div>
  </div>
</article>

<section class="section" style="padding-top:2.5rem">
  <div class="container-narrow">
    %(video)s%(toc)s
    <div class="prose">%(body)s</div>
    %(src)s
    <div class="share">
      <span>%(share)s</span>
      <a href="#" data-share="whatsapp" rel="noopener" target="_blank">WhatsApp</a>
      <a href="#" data-share="telegram" rel="noopener" target="_blank">Telegram</a>
      <a href="#" data-share="x" rel="noopener" target="_blank">X</a>
      <button type="button" data-share="copy">%(copy)s</button>
    </div>
  </div>
</section>
%(related)s''' % {
        "crumbs": crumbs(lang, [(t(lang, "nav.home"), u(lang)),
                                (t(lang, "nav.knowledge"), u(lang, "artikel.html")),
                                (a["title"], None)]),
        "series": SERIES_MAP[a["series"]][0], "tags": tags, "title": a["title"],
        "sum": a["summary"], "by": t(lang, "c.by"), "author": a["author"],
        "date": fdate(a["date"], lang), "min": a["reading"], "minlbl": t(lang, "c.min"),
        "video": video_block(a.get("video", ""), a["title"]), "toc": toc, "body": a["body"],
        "src": src, "share": t(lang, "c.share"), "copy": t(lang, "c.copy"), "related": related,
    }


# ------------------------------------------------------------------ Kurse
def courses(lang):
    """Wird nur gebaut, wenn Kurse vorhanden sind."""
    by_lang = {}
    for c in COURSES:
        by_lang.setdefault(c["lang_label"], []).append(c)

    blocks = []
    if len(by_lang) > 1:
        for label, items in by_lang.items():
            blocks.append('<section class="section section--hairline"><div class="container">'
                          '<div class="section-head"><p class="eyebrow">%s</p></div>'
                          '<div class="grid grid--3">%s</div></div></section>'
                          % (label, "".join(course_card(c, lang) for c in items)))
    else:
        blocks.append('<section class="section"><div class="container"><div class="grid grid--3">%s</div>'
                      "</div></section>" % "".join(course_card(c, lang) for c in COURSES))

    if len(COURSES) >= 2 and PACKAGES:
        packs = "".join('''<div class="card">
          <span class="tag tag--quiet" style="align-self:flex-start;margin-bottom:.9rem">%s</span>
          <h3 class="card__title">%s</h3><p class="card__text">%s</p>
          <ul class="member__list" style="margin-top:1rem">%s</ul>
          <div class="card__foot"><span style="font-family:var(--ff-display);font-size:1.4rem;
            font-weight:600;color:var(--accent)">%s&nbsp;&euro;</span></div>
        </div>''' % (p["lang_label"], p["title"], p["note"],
                     "".join("<li>%s</li>" % next(c["title"] for c in COURSES if c["slug"] == s)
                             for s in p["includes"] if any(c["slug"] == s for c in COURSES)),
                     p["price_eur"]) for p in PACKAGES)
        blocks.append('<section class="section section--hairline"><div class="container">'
                      '<div class="section-head"><p class="eyebrow">Pakete</p>'
                      "<h2>Komplettpakete</h2></div>"
                      '<div class="grid grid--2">%s</div></div></section>' % packs)

    return '''
<section class="section" style="padding-bottom:0">
  <div class="container">
    %(crumbs)s
    <div class="split">
      <p class="eyebrow">%(eb)s</p>
      <div>
        <h1 class="balance" style="max-width:14ch">Hidayah Kurse</h1>
        <p class="lead" style="margin-top:1.5rem">Strukturiertes islamisches Wissen &ndash; Schritt für
        Schritt. Jeder Kurs wird vollständig aufgenommen und vorbereitet, bevor er freigeschaltet wird.</p>
      </div>
    </div>
  </div>
</section>
%(blocks)s''' % {
        "crumbs": crumbs(lang, [(t(lang, "nav.home"), u(lang)), (t(lang, "nav.courses"), None)]),
        "eb": t(lang, "rec.eyebrow"), "blocks": "".join(blocks),
    }


def course_page(c, lang):
    curr = "".join('''<details%s style="border-bottom:1px solid var(--line)">
      <summary style="cursor:pointer;padding:1rem 0;font-weight:600;list-style:none;
        display:flex;gap:.9rem;align-items:center">
        <span class="dim" style="font-size:.8rem;font-weight:700">%02d</span>%s</summary>
      <div style="padding:0 0 1.2rem 2.1rem;color:var(--ink-2);font-size:.95rem">
        <ul style="margin:0;padding-inline-start:1.1rem">%s</ul></div>
    </details>''' % (" open" if i == 0 else "", i + 1, title,
                     "".join("<li>%s</li>" % x for x in items))
                   for i, (title, items, _free) in enumerate(c["curriculum"]))

    def ul(key):
        return "".join("<li>%s</li>" % x for x in c[key])

    return '''
<section class="section" style="padding-bottom:0">
  <div class="container-narrow">
    %(crumbs)s
    <div style="display:flex;flex-wrap:wrap;gap:.45rem;margin-bottom:1.3rem">
      <span class="tag">%(clang)s</span><span class="tag tag--quiet">%(level)s</span></div>
    <h1 class="balance">%(title)s</h1>
    <p class="lead" style="margin-top:1.5rem">%(sum)s</p>
    <div class="btn-row">
      <span style="font-family:var(--ff-display);font-size:1.6rem;font-weight:600;color:var(--accent)">
        %(eur)s&nbsp;&euro;</span>
      <button class="btn btn--primary" type="button" data-checkout="%(slug)s">Kurs freischalten</button>
    </div>
  </div>
</section>

<section class="section" style="padding-top:2.5rem">
  <div class="container-narrow">
    %(video)s
    <div class="prose">
      <h2>Kursziel</h2><p>%(goal)s</p>
      <h2>Für wen ist dieser Kurs?</h2><ul>%(aud)s</ul>
      <h2>Voraussetzungen</h2><ul>%(pre)s</ul>
      <h2>Was wirst du lernen?</h2><ul>%(learn)s</ul>
      <h2>Kursinhalt</h2>
    </div>
    <div style="border-top:1px solid var(--line);margin-top:1.2rem">%(curr)s</div>
    <div class="prose" style="margin-top:2.5rem">
      <h2>Enthalten</h2><ul>%(mat)s</ul>
      <p class="dim" style="font-size:.9rem">%(les)d Lektionen &middot; ca. %(hrs)d Stunden &middot;
      Dozent: %(teach)s &middot; Unterrichtssprache: %(clang)s</p>
    </div>
  </div>
</section>''' % {
        "crumbs": crumbs(lang, [(t(lang, "nav.home"), u(lang)),
                                (t(lang, "nav.courses"), u(lang, "kurse.html")), (c["title"], None)]),
        "clang": "Kurssprache: %s" % c["lang_label"], "level": c["level"], "title": c["title"],
        "sum": c["summary"], "eur": c["price_eur"], "slug": c["slug"],
        "video": video_block(c.get("intro_video", ""), c["title"]),
        "goal": c["goal"], "aud": ul("audience"), "pre": ul("prereq"), "learn": ul("learn"),
        "curr": curr, "mat": ul("materials"), "les": c["lessons"], "hrs": c["hours"],
        "teach": c["teacher"],
    }


# ------------------------------------------------------------------ Frage & Antwort
def qa(lang):
    cats = "".join('<option value="%s">%s</option>' % (c, c) for c in QA_CATEGORIES)

    archive = ""
    if QA_PUBLIC:
        seen = []
        for q in QA_PUBLIC:
            if q["cat"] not in seen:
                seen.append(q["cat"])
        filters = ""
        if len(seen) >= 2:
            chips = ('<button class="chip" type="button" data-filter="all" aria-pressed="true">%s</button>'
                     % t(lang, "c.all"))
            chips += "".join('<button class="chip" type="button" data-filter="topic:%s" aria-pressed="false">%s</button>'
                             % (c.lower().replace(" ", "-"), c) for c in seen)
            filters = '<div class="filters" data-filters>%s</div>' % chips
        items = "".join('''<div data-keys="topic:%s">
          <details class="entry" style="display:block">
            <summary style="list-style:none;cursor:pointer;display:flex;gap:1rem;align-items:flex-start">
              <span class="tag" style="flex:0 0 auto;margin-top:.2rem">%s</span>
              <span class="entry__title" style="font-size:1.1rem">%s</span>
            </summary>
            <div class="prose" style="margin-top:1rem;font-size:1rem;max-width:none">
              <p>%s</p><p class="dim" style="font-size:.82rem">%s</p></div>
          </details></div>''' % (q["cat"].lower().replace(" ", "-"), q["cat"], q["q"], q["a"],
                                 fdate(q["date"], lang)) for q in QA_PUBLIC)
        archive = '''
<section class="section section--hairline">
  <div class="container">
    <div class="section-head"><p class="eyebrow">Öffentliches Archiv</p>
      <h2>Bereits beantwortete Fragen</h2></div>
    %s<div class="index" data-article-list>%s</div>
    <p class="search-empty" data-empty hidden>%s</p>
  </div>
</section>''' % (filters, items, t(lang, "search.empty"))

    return '''
<section class="section" style="padding-bottom:0">
  <div class="container-narrow">
    %(crumbs)s
    <p class="eyebrow">%(eb)s</p>
    <h1 class="balance" style="max-width:16ch">Stelle deine islamische Frage</h1>
    <p class="lead" style="margin-top:1.5rem">%(text)s Der Dienst ist kostenlos. Persönliche
    Angelegenheiten werden ausschließlich privat beantwortet.</p>
  </div>
</section>

<section class="section">
  <div class="container-narrow">
    <form data-form="frage" novalidate>
      <div class="form-grid">
        <div class="field">
          <label for="q-name">%(f_name)s <span class="dim">(%(opt)s)</span></label>
          <input class="input" id="q-name" name="name" type="text" autocomplete="name">
        </div>
        <div class="field">
          <label for="q-mail">%(f_mail)s</label>
          <input class="input" id="q-mail" name="email" type="email" required autocomplete="email">
          <span class="hint">Wir benachrichtigen dich, sobald deine Antwort vorliegt.</span>
        </div>
      </div>
      <div class="field">
        <label for="q-cat">%(f_cat)s</label>
        <select class="select" id="q-cat" name="kategorie">%(cats)s</select>
      </div>
      <div class="field">
        <label for="q-text">Deine Frage</label>
        <textarea class="textarea" id="q-text" name="frage" required
          placeholder="Beschreibe deine Situation so genau wie nötig – das hilft uns, präzise zu antworten."></textarea>
      </div>
      <div class="field">
        <label class="check"><input type="checkbox" name="privat" value="ja">
          <span>Diese Frage betrifft eine persönliche Situation und soll <strong>nicht</strong>
          veröffentlicht werden.</span></label>
      </div>
      <div class="field">
        <label class="check"><input type="checkbox" required><span>%(consent)s</span></label>
      </div>
      <button class="btn btn--primary" type="submit">Frage absenden</button>
      <p class="form-status" data-status></p>
      <p class="form-note">Nützliche Antworten veröffentlichen wir gegebenenfalls
      <strong>anonymisiert</strong>, damit andere davon profitieren. Persönliche Daten werden dabei
      niemals gezeigt. Deine Antwort erhältst du per E-Mail.</p>
    </form>
  </div>
</section>
%(archive)s''' % {
        "crumbs": crumbs(lang, [(t(lang, "nav.home"), u(lang)), (t(lang, "nav.qa"), None)]),
        "eb": t(lang, "nav.qa"), "text": t(lang, "areas.q.text"), "cats": cats,
        "f_name": t(lang, "f.name"), "f_mail": t(lang, "f.email"), "f_cat": t(lang, "f.category"),
        "opt": t(lang, "c.optional"), "consent": t(lang, "f.consent"), "archive": archive,
    }


# ------------------------------------------------------------------ Kontakt
def contact(lang):
    return '''
<section class="section" style="padding-bottom:0">
  <div class="container-narrow">
    %(crumbs)s
    <p class="eyebrow">%(eb)s</p>
    <h1 class="balance" style="max-width:12ch">Schreib uns</h1>
    <p class="lead" style="margin-top:1.5rem">Für Anliegen rund um Hidayah oder eine Zusammenarbeit.
    <strong>Religiöse Fragen</strong> stelle bitte über das dafür vorgesehene Formular &ndash; dort
    werden sie strukturiert bearbeitet und beantwortet.</p>
    <div class="btn-row" style="margin-top:1.6rem">
      <a class="link" href="%(qa)s">Islamische Frage stellen <span class="arw">&rarr;</span></a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="split">
      <p class="eyebrow">Formular</p>
      <div style="display:grid;gap:2.5rem;grid-template-columns:1fr" data-contact-grid>
        <form data-form="kontakt" novalidate>
          <div class="form-grid">
            <div class="field"><label for="k-name">%(f_name)s</label>
              <input class="input" id="k-name" name="name" type="text" required autocomplete="name"></div>
            <div class="field"><label for="k-mail">%(f_mail)s</label>
              <input class="input" id="k-mail" name="email" type="email" required autocomplete="email"></div>
          </div>
          <div class="field"><label for="k-subj">%(f_subj)s</label>
            <input class="input" id="k-subj" name="betreff" type="text" required></div>
          <div class="field"><label for="k-msg">%(f_msg)s</label>
            <textarea class="textarea" id="k-msg" name="nachricht" required></textarea></div>
          <div class="field"><label class="check"><input type="checkbox" required>
            <span>%(consent)s</span></label></div>
          <button class="btn btn--primary" type="submit">%(send)s</button>
          <p class="form-status" data-status></p>
        </form>
        <div class="stack">
          <div>
            <p class="eyebrow">Direkt</p>
            <p class="muted">E-Mail: <a class="link" href="mailto:%(mail)s">%(mail)s</a></p>
          </div>
          <div>
            <p class="eyebrow">%(social)s</p>
            <div class="social" style="margin-top:.6rem">
              <a href="%(ig)s" rel="noopener" target="_blank" aria-label="Instagram">%(i_ig)s</a>
              <a href="%(yt)s" rel="noopener" target="_blank" aria-label="YouTube">%(i_yt)s</a>
              <a href="%(x)s" rel="noopener" target="_blank" aria-label="X">%(i_x)s</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>''' % {
        "crumbs": crumbs(lang, [(t(lang, "nav.home"), u(lang)), (t(lang, "nav.contact"), None)]),
        "eb": t(lang, "nav.contact"), "qa": u(lang, "frage-antwort.html"),
        "f_name": t(lang, "f.name"), "f_mail": t(lang, "f.email"),
        "f_subj": t(lang, "f.subject"), "f_msg": t(lang, "f.message"),
        "consent": t(lang, "f.consent"), "send": t(lang, "f.send"),
        "mail": SITE["email"], "social": t(lang, "foot.social"),
        "ig": SITE["instagram"], "yt": SITE["youtube"], "x": SITE["x"],
        "i_ig": ICON["ig"], "i_yt": ICON["yt"], "i_x": ICON["x"],
    }


# ------------------------------------------------------------------ Rechtstexte
LEGAL_TITLES = {"impressum": "Impressum", "datenschutz": "Datenschutzerklärung",
                "agb": "Allgemeine Geschäftsbedingungen", "widerruf": "Widerrufsbelehrung"}

LEGAL_BODIES = {
"impressum": '''
<h2>Angaben gemäß § 5 DDG</h2>
<p>Hidayah<br>[Straße und Hausnummer]<br>[PLZ Ort]<br>Deutschland</p>
<h2>Vertreten durch</h2><p>[Vor- und Nachname der verantwortlichen Person]</p>
<h2>Kontakt</h2><p>E-Mail: salam@hidayah.de</p>
<h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2><p>[Vor- und Nachname]<br>[Anschrift]</p>
<h2>Streitschlichtung</h2>
<p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit. Wir sind nicht
bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
teilzunehmen.</p>
<h2>Bildnachweis</h2>
<p>Logo und Mondaufnahme: Hidayah. Schriftarten: Clash Display und Satoshi (Indian Type Foundry,
Fontshare-Lizenz), Amiri und Cairo (SIL Open Font License).</p>''',

"datenschutz": '''
<h2>1. Verantwortliche Stelle</h2>
<p>Verantwortlich für die Datenverarbeitung auf dieser Website ist der im
<a href="/impressum.html">Impressum</a> genannte Anbieter.</p>
<h2>2. Zugriffsdaten und Hosting</h2>
<p>Beim Aufruf dieser Website werden durch den Hosting-Anbieter automatisch Server-Logfiles
verarbeitet (IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browsertyp). Rechtsgrundlage ist
Art. 6 Abs. 1 lit. f DSGVO. [Hosting-Anbieter und Auftragsverarbeitungsvertrag hier eintragen.]</p>
<h2>3. Cookies und lokale Speicherung</h2>
<p>Wir setzen ausschließlich technisch notwendige Speicherung ein: deine Sprachwahl, deine gewählte
Darstellung (hell, dunkel, Akzentfarbe) und die Bestätigung des Cookie-Hinweises. Es findet kein
Tracking, keine Reichweitenmessung durch Dritte und keine Werbung statt.</p>
<h2>4. Kontakt- und Frageformular</h2>
<p>Wenn du uns eine Nachricht oder eine islamische Frage sendest, verarbeiten wir die von dir
angegebenen Daten zur Bearbeitung deiner Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b bzw.
lit. a DSGVO. Eine Veröffentlichung deiner Frage erfolgt ausschließlich <strong>anonymisiert</strong>
und nur, wenn du dem nicht widersprochen hast.</p>
<h2>5. Newsletter</h2>
<p>Der Newsletter wird im Double-Opt-in-Verfahren versendet. Deine Einwilligung kannst du jederzeit
über den Abmeldelink in jeder E-Mail widerrufen.</p>
<h2>6. Deine Rechte</h2>
<p>Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
Datenübertragbarkeit und Widerspruch sowie das Recht, dich bei einer Aufsichtsbehörde zu beschweren.</p>
<h2>7. Speicherdauer</h2>
<p>Wir speichern personenbezogene Daten nur so lange, wie es für die genannten Zwecke erforderlich
ist oder gesetzliche Aufbewahrungsfristen bestehen.</p>''',

"agb": '''
<h2>1. Geltungsbereich</h2>
<p>Diese Bedingungen gelten für alle Verträge über digitale Inhalte, die über diese Website zwischen
Hidayah und Verbrauchern bzw. Unternehmern geschlossen werden.</p>
<h2>2. Vertragsgegenstand</h2>
<p>Gegenstand sind digitale Inhalte, insbesondere Videokurse und begleitende Materialien.</p>
<h2>3. Vertragsschluss</h2>
<p>Die Darstellung der Kurse stellt kein bindendes Angebot dar. Mit dem Abschluss des Bestellvorgangs
gibst du ein verbindliches Angebot ab. Der Vertrag kommt mit unserer Bestätigung in Textform zustande.</p>
<h2>4. Preise, Währung und Zahlung</h2>
<p>Alle Preise sind Endpreise. Du kannst beim Kauf zwischen den verfügbaren Währungen wählen; der
tatsächlich belastete Betrag richtet sich nach dem gewählten Zahlungsmittel.</p>
<h2>5. Nutzungsrechte</h2>
<p>Du erhältst ein einfaches, nicht übertragbares Recht zur persönlichen Nutzung der erworbenen
Inhalte. Weitergabe, Vervielfältigung oder öffentliche Zugänglichmachung sind nicht gestattet.</p>
<h2>6. Gewährleistung und Haftung</h2>
<p>Es gelten die gesetzlichen Bestimmungen. Für Schäden haften wir nur bei Vorsatz und grober
Fahrlässigkeit sowie bei Verletzung wesentlicher Vertragspflichten.</p>
<h2>7. Schlussbestimmungen</h2>
<p>Es gilt deutsches Recht unter Wahrung der zwingenden Verbraucherschutzvorschriften des
Aufenthaltsstaates des Verbrauchers.</p>''',

"widerruf": '''
<h2>Widerrufsrecht</h2>
<p>Du hast das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.
Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.</p>
<p>Um dein Widerrufsrecht auszuüben, musst du uns mittels einer eindeutigen Erklärung (z. B. per
E-Mail an salam@hidayah.de) über deinen Entschluss informieren.</p>
<h2>Folgen des Widerrufs</h2>
<p>Wenn du diesen Vertrag widerrufst, erstatten wir dir alle Zahlungen unverzüglich und spätestens
binnen vierzehn Tagen ab Eingang deiner Mitteilung zurück.</p>
<h2>Vorzeitiges Erlöschen bei digitalen Inhalten</h2>
<p>Das Widerrufsrecht erlischt vorzeitig, wenn wir mit der Ausführung begonnen haben, nachdem du
<strong>ausdrücklich zugestimmt</strong> hast, dass wir vor Ablauf der Widerrufsfrist beginnen, und
du deine <strong>Kenntnis vom Verlust des Widerrufsrechts</strong> bestätigt hast.</p>
<h2>Muster-Widerrufsformular</h2>
<p>An Hidayah, [Anschrift], salam@hidayah.de:<br>
Hiermit widerrufe ich den von mir abgeschlossenen Vertrag über den Kauf der folgenden digitalen
Inhalte: ____________<br>Bestellt am: ____________<br>Name: ____________<br>
Anschrift: ____________<br>Datum: ____________</p>'''}


def legal(lang, kind):
    warn = ('<div class="notice" style="margin-bottom:2.5rem">%s<div><strong>Diese Seite ist eine '
            "Vorlage.</strong> Vor der Veröffentlichung muss sie an die tatsächlich verwendete "
            "technische und geschäftliche Struktur angepasst und rechtlich geprüft werden."
            "</div></div>" % ICON["info"])
    return '''
<section class="section">
  <div class="container-narrow">
    %(crumbs)s
    <h1 style="margin-bottom:2rem">%(title)s</h1>
    %(warn)s
    <div class="prose">%(body)s</div>
  </div>
</section>''' % {"crumbs": crumbs(lang, [(t(lang, "nav.home"), u(lang)), (LEGAL_TITLES[kind], None)]),
                 "title": LEGAL_TITLES[kind], "warn": warn, "body": LEGAL_BODIES[kind]}


def notfound(lang):
    return '''
<section class="section" style="min-height:58vh;display:grid;place-items:center;text-align:center">
  <div class="container-narrow">
    <p class="eyebrow" style="justify-content:center">404</p>
    <h1 class="balance">Diese Seite gibt es nicht</h1>
    <p class="lead" style="margin:1.5rem auto 0">Vielleicht wurde sie verschoben oder der Link ist
    nicht mehr aktuell. Nutze die Suche oder starte von vorne.</p>
    <div class="btn-row" style="justify-content:center">
      <a class="btn btn--primary" href="%s">%s</a>
      <button class="btn btn--quiet" type="button" data-search-open>%s</button>
    </div>
  </div>
</section>''' % (u(lang), t(lang, "nav.home"), t(lang, "nav.search"))
