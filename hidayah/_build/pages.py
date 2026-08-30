# -*- coding: utf-8 -*-
"""Baut die Koerper (body) aller Seiten.

Grundregel: Die Hauptbereiche stehen fest. Einzelne Beitraege darin erscheinen
erst, wenn sie eingetragen sind — nichts wird als Platzhalter vorgetaeuscht.
"""
import math
import re
from content import (SITE, SERIES, DEFAULT_AUTHOR, ARTICLES, TEACHING, COURSES,
                     PACKAGES, QA_CATEGORIES, QA_PUBLIC, NEWS, TEAM, ayah)
from layout import t, u, ICON, NAV_ICON, nav_items

MONTHS = {"de": ["Januar","Februar","März","April","Mai","Juni","Juli","August",
                 "September","Oktober","November","Dezember"],
          "en": ["January","February","March","April","May","June","July","August",
                 "September","October","November","December"],
          "tr": ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos",
                 "Eylül","Ekim","Kasım","Aralık"],
          "ar": ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس",
                 "سبتمبر","أكتوبر","نوفمبر","ديسمبر"]}
SERIES_BY_KEY = {s["key"]: s for s in SERIES}


def fdate(iso, lang="de"):
    y, m, d = iso.split("-")
    ms = MONTHS.get(lang, MONTHS["de"])[int(m) - 1]
    return "%d. %s %s" % (int(d), ms, y) if lang in ("de", "tr") else "%s %d, %s" % (ms, int(d), y)


def sorted_articles():
    return sorted(ARTICLES, key=lambda a: a["date"], reverse=True)


def author_of(a):
    """Beitraege erscheinen unter Hidayah, sofern kein Autor eingetragen ist."""
    return a.get("author") or DEFAULT_AUTHOR


def used_series():
    return [s for s in SERIES if any(a.get("series") == s["key"] for a in ARTICLES)]


def has_loose_articles():
    """Artikel ohne Reihe — allgemeine Beitraege."""
    return any(not a.get("series") for a in ARTICLES)


# ------------------------------------------------------------------ Bausteine
def crumbs(lang, items):
    parts = ['<span><a href="%s">%s</a></span>' % (h, l) if h else "<span>%s</span>" % l
             for l, h in items]
    return '<nav class="crumbs" aria-label="Breadcrumb">%s</nav>' % "".join(parts)


def entry(a, lang):
    cat = ('<span class="entry__cat">%s</span>' % SERIES_BY_KEY[a["series"]]["name"]
           if a.get("series") else "")
    return '''<a class="entry" href="%(href)s">
  <div class="entry__meta">%(cat)s<span>%(date)s</span>
    <span>%(min)d %(minlbl)s</span></div>
  <div>
    <h3 class="entry__title">%(title)s</h3>
    <p class="entry__excerpt">%(sum)s</p>
  </div>
</a>''' % {"href": u("de", "artikel/%s.html" % a["slug"]), "cat": cat,
            "date": fdate(a["date"], lang), "min": a["reading"], "minlbl": t(lang, "c.min"),
            "title": a["title"], "sum": a["summary"]}


def video_block(url, caption):
    if not url:
        return ""
    return ('<div class="video"><iframe src="%s" title="%s" loading="lazy" allowfullscreen></iframe></div>'
            % (url, caption))


def lang_notice(lang):
    if lang == "de":
        return ""
    return ('<div class="notice" style="margin-bottom:2.5rem">%s<div>%s</div></div>'
            % (ICON["info"], t(lang, "c.langnote")))


def steps_block(items):
    return '<ol class="steps">%s</ol>' % "".join(
        '<li class="step"><span class="step__num">%02d</span>'
        '<div><h3 class="step__title">%s</h3><p class="step__text">%s</p></div></li>'
        % (i + 1, title, text) for i, (title, text) in enumerate(items))


# ------------------------------------------------------------------ Startseite
# Die Bereiche liegen auf einem Kreis um das Logo. Winkel und Punkte werden hier
# berechnet, damit im Browser dafuer kein Skript noetig ist.
ORBIT_R = 43.0          # Radius in Prozent der Feldbreite (breite Schirme)
ORBIT_R_S = 37.5        # engerer Radius fuer schmale Schirme
ORBIT_START = -90.0     # der erste Punkt steht oben

def orbit(lang):
    """Bereichsknoepfe auf dem Kreis um das Logo.

    Winkel und Punkte werden hier berechnet — im Browser laeuft dafuer kein Skript.
    Fuer schmale Schirme gibt es einen zweiten, engeren Kreis (--mx/--my).
    Die Startseite selbst fehlt im Ring; dorthin fuehrt das Logo.
    """
    items = [(key, href) for key, href in nav_items(lang) if key != "nav.home"]
    n = len(items) or 1
    out = []
    for i, (key, href) in enumerate(items):
        ang = ORBIT_START + i * 360.0 / n
        rad = math.radians(ang)
        cx, cy = math.cos(rad), math.sin(rad)
        if cx > .28:
            side = "r"
        elif cx < -.28:
            side = "l"
        else:
            side = "b" if cy > 0 else "t"
        out.append(
            '<a class="orb orb--%s" href="%s" style="'
            '--a:%.3fdeg;--x:%.3f%%;--y:%.3f%%;--mx:%.3f%%;--my:%.3f%%;--d:%.2fs">'
            '<i class="orb__spoke" aria-hidden="true"></i>'
            '<span class="orb__pt">'
            '<span class="orb__ico" aria-hidden="true">%s</span>'
            '<span class="orb__label">%s</span>'
            '<i class="orb__ring" aria-hidden="true"></i></span></a>'
            % (side, u(lang, href), ang,
               50 + ORBIT_R * cx, 50 + ORBIT_R * cy,
               50 + ORBIT_R_S * cx, 50 + ORBIT_R_S * cy,
               .34 + i * .075, ICON[NAV_ICON[key]], t(lang, key)))
    return "".join(out)


def home(lang):
    """Die Startseite ist eine einzige Flaeche: das Logo in der Mitte,
    die Bereiche auf seinem Kreis. Darunter folgt nichts mehr."""
    legal = " &middot; ".join(
        '<a href="%s">%s</a>' % (u(lang, slug + ".html"), t(lang, key))
        for slug, key in (("impressum", "foot.imprint"),
                          ("datenschutz", "foot.privacy"),
                          ("agb", "foot.terms"),
                          ("widerruf", "foot.withdrawal")))
    return '''
<section class="stage night">
  <canvas class="stage__stars" data-stars aria-hidden="true"></canvas>
  <div class="stage__glow" aria-hidden="true"></div>
  <div class="stage__vignette" aria-hidden="true"></div>
  <div class="stage__inner">
    <div class="orbit">
      <div class="orbit__rings" aria-hidden="true">
        <i class="orbit__ring orbit__ring--1"></i>
        <i class="orbit__ring orbit__ring--2"></i>
        <i class="orbit__ring orbit__ring--3"></i>
      </div>
      <nav class="orbit__nav" aria-label="%(navlabel)s">%(orbs)s</nav>
      <div class="orbit__core">
        <img class="stage__logo" src="/assets/img/logo.webp" alt="Hidayah"
             width="1400" height="476" fetchpriority="high">
      </div>
    </div>
    <div class="orbit__say">
      <h1 class="stage__slogan balance">%(slogan)s</h1>
      <p class="stage__sub">%(sub)s</p>
    </div>
  </div>
  <p class="stage__legal">%(legal)s &middot;
    <a href="#" data-cookie-open>%(cookie)s</a></p>
</section>''' % {"slogan": t(lang, "slogan"), "sub": t(lang, "hero.sub"),
                 "orbs": orbit(lang), "navlabel": t(lang, "menu"),
                 "legal": legal, "cookie": t(lang, "foot.cookies")}


# ------------------------------------------------------------------ Artikel
def archive(lang):
    """Allgemeiner Artikelbereich. Darin die wiederkehrenden Reihen."""
    reihen = "".join('''<div class="rail">
      <span class="rail__num">%02d</span>
      <div class="rail__body">
        <h3 class="rail__title">%s</h3>
        <p class="rail__text">%s</p>
      </div>
    </div>''' % (i + 1, r["name"], r["desc"]) for i, r in enumerate(SERIES))

    arts = sorted_articles()
    if arts:
        used = used_series()
        loose = has_loose_articles()
        options = [("series:" + r["key"], r["name"]) for r in used]
        if loose and used:
            options.append(("series:frei", t(lang, "arch.other")))
        filters = ""
        if len(options) >= 2:
            chips = ('<button class="chip" type="button" data-filter="all" aria-pressed="true">%s</button>'
                     % t(lang, "c.all"))
            chips += "".join('<button class="chip" type="button" data-filter="%s" aria-pressed="false">%s</button>'
                             % (v, n) for v, n in options)
            filters = '<div class="filters" data-filters>%s</div>' % chips
        rows = "".join('<div data-keys="series:%s">%s</div>'
                       % (a.get("series") or "frei", entry(a, lang)) for a in arts)
        listing = '''
<section class="section section--hairline">
  <div class="container">
    <div class="section-head"><p class="eyebrow">%s</p><h2>%s</h2></div>
    %s%s<div class="index" data-article-list>%s</div>
    <p class="search-empty" data-empty hidden>%s</p>
  </div>
</section>''' % (t(lang, "arch.all.eyebrow"), t(lang, "arch.all.title"),
                 lang_notice(lang), filters, rows, t(lang, "search.empty"))
    else:
        listing = ('<section class="section--tight"><div class="container">'
                   '<p class="dim" style="font-size:.92rem">%s</p></div></section>'
                   % t(lang, "arch.empty"))

    return '''
<section class="section" style="padding-bottom:0">
  <div class="container">
    %(crumbs)s
    <div class="split">
      <p class="eyebrow">%(eb)s</p>
      <div>
        <h1 class="balance" style="max-width:13ch">%(h1)s</h1>
        <p class="lead" style="margin-top:1.5rem">%(lead)s</p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head"><p class="eyebrow">%(eb2)s</p>
      <h2 class="balance" style="max-width:16ch">%(h2)s</h2>
      <p class="lead" style="margin-top:1.2rem">%(text)s</p></div>
    <div class="rails">%(reihen)s</div>
  </div>
</section>
%(listing)s''' % {
        "crumbs": crumbs(lang, [(t(lang, "nav.home"), u(lang)), (t(lang, "nav.knowledge"), None)]),
        "eb": t(lang, "arch.eyebrow"), "h1": t(lang, "areas.k.title"),
        "lead": t(lang, "arch.lead"), "eb2": t(lang, "arch.eyebrow2"),
        "h2": t(lang, "arch.title"), "text": t(lang, "arch.text"),
        "reihen": reihen, "listing": listing,
    }


# ------------------------------------------------------------------ Artikelseite
def article_page(a, lang):
    heads = re.findall(r'<h2 id="([^"]+)">(.*?)</h2>', a["body"], re.S)
    toc = ""
    if len(heads) >= 2:
        toc = ('<nav class="toc" aria-label="%s"><p class="toc__title">%s</p><ol>%s</ol></nav>'
               % (t(lang, "c.toc"), t(lang, "c.toc"),
                  "".join('<li><a href="#%s">%s</a></li>' % (i, re.sub("<[^>]+>", "", h))
                          for i, h in heads)))
    src = ""
    if a.get("sources"):
        src = ('<section class="sources"><h2>%s</h2><ol>%s</ol></section>'
               % (t(lang, "c.sources"), "".join("<li>%s</li>" % x for x in a["sources"])))

    rel = [x for x in ARTICLES if x["slug"] != a["slug"]
           and x.get("series") == a.get("series")][:3]
    related = ""
    if rel:
        related = ('<section class="section section--hairline"><div class="container-narrow">'
                   '<h2 style="font-size:1.4rem;margin-bottom:1.5rem">%s</h2>'
                   '<div class="index">%s</div></div></section>'
                   % (t(lang, "c.related"), "".join(entry(r, lang) for r in rel)))

    tag = ('<span class="tag">%s</span>' % SERIES_BY_KEY[a["series"]]["name"]
           if a.get("series") else "")
    return '''
<div class="progress-bar" data-progress aria-hidden="true"></div>
<article class="article-head">
  <div class="container-narrow">
    %(crumbs)s
    %(series)s
    <h1 class="balance">%(title)s</h1>
    <p class="article-summary">%(sum)s</p>
    <div class="article-meta">
      <span>%(by)s <strong>%(author)s</strong></span><span>%(date)s</span>
      <span>%(min)d %(minlbl)s</span>
    </div>
  </div>
</article>

<section class="section" style="padding-top:2rem">
  <div class="container">
    <div class="article-layout">
      <aside class="article-aside">%(toc)s</aside>
      <div class="article-body">
        %(video)s
        <div class="prose prose--numbered">%(body)s</div>
        %(src)s
        <div class="share">
          <span>%(share)s</span>
          <a href="#" data-share="whatsapp" rel="noopener" target="_blank">WhatsApp</a>
          <a href="#" data-share="telegram" rel="noopener" target="_blank">Telegram</a>
          <a href="#" data-share="x" rel="noopener" target="_blank">X</a>
          <button type="button" data-share="copy">%(copy)s</button>
        </div>
      </div>
    </div>
  </div>
</section>
%(related)s''' % {
        "crumbs": crumbs(lang, [(t(lang, "nav.home"), u(lang)),
                                (t(lang, "nav.knowledge"), u(lang, "artikel.html")),
                                (a["title"], None)]),
        "series": tag, "title": a["title"], "sum": a["summary"],
        "by": t(lang, "c.by"), "author": author_of(a), "date": fdate(a["date"], lang),
        "min": a["reading"], "minlbl": t(lang, "c.min"),
        "toc": toc, "video": video_block(a.get("video", ""), a["title"]),
        "body": a["body"], "src": src, "share": t(lang, "c.share"),
        "copy": t(lang, "c.copy"), "related": related,
    }


# ------------------------------------------------------------------ Unterricht
def teaching(lang):
    sel = lambda name, label, opts, req=True: '''<div class="field">
      <label for="u-%s">%s</label>
      <select class="select" id="u-%s" name="%s"%s>%s</select>
    </div>''' % (name, label, name, name, " required" if req else "",
                 "".join('<option value="%s">%s</option>' % (o, o) for o in opts))

    return '''
<section class="section" style="padding-bottom:0">
  <div class="container">
    %(crumbs)s
    <div class="split">
      <p class="eyebrow">%(eb)s</p>
      <div>
        <h1 class="balance" style="max-width:15ch">%(h1)s</h1>
        <p class="lead" style="margin-top:1.5rem">%(lead)s</p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="split">
      <p class="eyebrow">%(l_steps)s</p>
      <div>%(steps)s</div>
    </div>
  </div>
</section>

<section class="section section--hairline">
  <div class="container">
    <div class="split">
      <p class="eyebrow">Unterrichtssprache</p>
      <div><p class="lead" style="max-width:54ch">Du wählst selbst, in welcher Sprache du
      unterrichtet werden möchtest: <strong>Deutsch</strong>, <strong>Türkisch</strong> oder
      <strong>Arabisch</strong>. Der Unterricht wird vollständig in der von dir gewählten Sprache
      gehalten.</p></div>
    </div>
  </div>
</section>

<section class="section section--hairline">
  <div class="container">
    <div class="split">
      <p class="eyebrow">%(l_price)s</p>
      <div><p class="lead" style="max-width:52ch">%(pricetext)s</p></div>
    </div>
  </div>
</section>

<section class="section section--hairline">
  <div class="container">
    <div class="split">
      <p class="eyebrow">%(l_form)s</p>
      <div>
        <h2 class="balance" style="max-width:16ch;margin-bottom:.9rem">Stell dich kurz vor</h2>
        <p class="lead" style="margin-bottom:2.5rem">Je genauer wir deinen Stand kennen, desto besser
        können wir einschätzen, womit du anfangen solltest.</p>

        <form data-form="unterricht" novalidate>
          <fieldset class="fs">
            <legend class="fs__legend">1 &middot; Über dich</legend>
            <div class="form-grid">
              <div class="field"><label for="u-name">%(f_name)s</label>
                <input class="input" id="u-name" name="name" type="text" required autocomplete="name"></div>
              <div class="field"><label for="u-mail">%(f_mail)s</label>
                <input class="input" id="u-mail" name="email" type="email" required autocomplete="email"></div>
            </div>
            <div class="form-grid">
              <div class="field"><label for="u-alter">Alter</label>
                <input class="input" id="u-alter" name="alter" type="text" inputmode="numeric"></div>
              <div class="field"><label for="u-ort">Wohnort und Land</label>
                <input class="input" id="u-ort" name="ort" type="text" required></div>
            </div>
          </fieldset>

          <fieldset class="fs">
            <legend class="fs__legend">2 &middot; Dein Ziel</legend>
            <div class="form-grid">%(f_fach)s%(f_sprache)s</div>
            <div class="field">
              <label for="u-ziel">Warum möchtest du das lernen?</label>
              <textarea class="textarea" id="u-ziel" name="ziel" required
                placeholder="Was möchtest du erreichen? Was ist dein Beweggrund?"></textarea>
            </div>
          </fieldset>

          <fieldset class="fs">
            <legend class="fs__legend">3 &middot; Dein Stand</legend>
            <div class="form-grid">%(f_level)s%(f_ar)s</div>
            <div class="field">
              <label for="u-gelernt">Hast du bereits etwas gelesen oder gelernt?</label>
              <textarea class="textarea" id="u-gelernt" name="gelernt"
                placeholder="Welche Bücher, welche Fächer, bei wem und über welchen Zeitraum? Wenn noch nichts: schreib einfach „noch nichts&#8220;."></textarea>
            </div>
          </fieldset>

          <fieldset class="fs">
            <legend class="fs__legend">4 &middot; Organisatorisches</legend>
            <div class="form-grid">%(f_zeit)s%(f_med)s</div>
            <div class="field">
              <label for="u-zeiten">Wann bist du gut erreichbar? <span class="dim">(%(opt)s)</span></label>
              <input class="input" id="u-zeiten" name="erreichbarkeit" type="text"
                placeholder="z. B. werktags ab 18 Uhr">
            </div>
          </fieldset>

          <div class="field" style="margin-top:1.5rem">
            <label class="check"><input type="checkbox" required><span>%(consent)s</span></label>
          </div>
          <button class="btn btn--primary" type="submit">Bewerbung absenden</button>
          <p class="form-status" data-status></p>
          <p class="form-note">Wir melden uns bei jeder Bewerbung zurück. Wenn es passt, vereinbaren
          wir ein persönliches Gespräch – erst danach steht ein Programm und ein Beitrag fest.</p>
        </form>
      </div>
    </div>
  </div>
</section>''' % {
        "crumbs": crumbs(lang, [(t(lang, "nav.home"), u(lang)), (t(lang, "nav.teaching"), None)]),
        "eb": t(lang, "teach.eyebrow"), "h1": t(lang, "teach.title"), "lead": t(lang, "teach.lead"),
        "l_steps": t(lang, "teach.steps"), "steps": steps_block(TEACHING["steps"]),
        "l_price": t(lang, "teach.price"), "pricetext": t(lang, "teach.pricetext"),
        "l_form": t(lang, "teach.form"),
        "f_name": t(lang, "f.name"), "f_mail": t(lang, "f.email"), "opt": t(lang, "c.optional"),
        "f_fach": sel("fach", "Was möchtest du lernen?", TEACHING["subjects"]),
        "f_sprache": sel("sprache", "In welcher Sprache?", TEACHING["languages"]),
        "f_level": sel("vorkenntnisse", "Deine Vorkenntnisse", TEACHING["levels"]),
        "f_ar": sel("arabisch", "Kannst du arabische Schrift lesen?", TEACHING["arabic"]),
        "f_zeit": sel("zeit", "Zeit pro Woche", TEACHING["time"]),
        "f_med": sel("medium", "Gespräch bevorzugt über", TEACHING["media"]),
        "consent": t(lang, "f.consent"),
    }


# ------------------------------------------------------------------ Über uns
def about(lang):
    team = "".join('''<div class="card">
      <div class="member__mono">%s</div>
      <h3 class="card__title" style="margin-bottom:.6rem">%s</h3>
      <p class="card__text">%s</p>
    </div>''' % (m["initials"], m["name"], m["bio"]) for m in TEAM)

    return '''
<section class="section" style="padding-bottom:0">
  <div class="container">
    %(crumbs)s
    <div class="split">
      <p class="eyebrow">%(eb)s</p>
      <div>
        <h1 class="balance" style="max-width:15ch">%(title)s</h1>
        <p class="lead" style="margin-top:1.5rem">%(intro)s</p>
        %(notice)s
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container-narrow">
    <article class="prose prose--numbered">
      <h2 id="entstehung">Entstehung von Hidayah</h2>
      <p>Hidayah entstand im Oktober 2024 nach Gesprächen und Beratungen zwischen drei Brüdern sowie
      mit unseren Lehrern und Shuyukh. Dahinter stand die gemeinsame Überzeugung, dass es notwendig
      ist, das Gelernte nicht nur für sich selbst zu bewahren, sondern damit nach außen zu treten und
      &ndash; entsprechend den eigenen Möglichkeiten &ndash; einen Beitrag für den Islam und die
      Muslime zu leisten.</p>
      <p>Eine wichtige Rolle spielten dabei auch die Ereignisse in Gaza. Doch Hidayah entstand nicht
      einfach als emotionale Reaktion auf Gaza.</p>
      <p>Was dort geschah, war für uns vielmehr eine Erinnerung an eine Realität, die nicht erst mit
      Gaza begonnen hat und auch nicht mit Gaza enden wird. Seit jeher wurden Muslime geprüft,
      unterdrückt und aufgrund ihres Glaubens bekämpft. Die entscheidende Frage war für uns deshalb
      nicht nur, was gerade geschieht, sondern auch: Was bedeutet es eigentlich, Muslim zu sein? Was
      verlangt der Islam von uns? Und warum halten wir trotz Prüfungen, Widerstand und
      Schwierigkeiten an diesem Weg fest?</p>
      %(ay_pruefung)s
      <p>In dieser Zeit gingen viele Menschen auf die Straße, Organisationen veranstalteten
      Demonstrationen und zahlreiche Stimmen machten auf das Leid in Gaza aufmerksam. Das hatte
      zweifellos seine Berechtigung. Wir sahen jedoch gleichzeitig, dass der Islam selbst dabei
      oftmals kaum erklärt oder repräsentiert wurde.</p>
      <p>Für uns war deshalb klar: <strong>Wenn ein Muslim für eine islamische Angelegenheit spricht,
      sollte seine Botschaft nicht bei einem politischen oder gesellschaftlichen Thema enden.</strong>
      Sie sollte letztlich auch zu Allah führen und den Menschen zeigen, was der Islam ist, wofür er
      steht und wozu er den Menschen ruft.</p>
      %(ay_dawah)s
      <p>Genau daraus entwickelte sich unser Weg: <strong>das Gute zu gebieten und das Verwerfliche
      zu verbieten</strong>, islamisches Wissen weiterzugeben, Missverständnisse aufzuklären und
      dort zu helfen, wo wir mit unseren Möglichkeiten helfen können.</p>
      <p>Ein weiterer Grund für die Entstehung von Hidayah war die Art und Weise, wie islamisches
      Wissen heute verbreitet wird. Durch soziale Medien kann nahezu jeder über religiöse Themen
      sprechen. Dadurch wird Wissen teilweise ohne ausreichende Grundlagen weitergegeben, Aussagen
      werden aus ihrem Zusammenhang gerissen und komplexe Fragen von Menschen behandelt, denen die
      notwendige Qualifikation fehlt.</p>
      %(hd_wissen)s
      <p>Nach mehreren Jahren des Lernens, dem Begleiten unserer Lehrer und dem Erhalt von Ijazat
      entstand deshalb &ndash; gemeinsam mit unseren Lehrern und Shuyukh &ndash; der Entschluss,
      selbst Verantwortung zu übernehmen und das Gelernte auf eine zugängliche und zugleich fundierte
      Weise weiterzugeben.</p>

      <h2 id="name">Warum der Name &bdquo;Hidayah&ldquo;?</h2>
      <p>Hidayah bedeutet <strong>Rechtleitung</strong>.</p>
      <p>Einer der Verse, die bei der Wahl dieses Namens eine besondere Bedeutung für uns hatten, ist
      die Aussage Allahs:</p>
      %(ay_name)s
      <p>Der Name soll uns zuerst selbst daran erinnern, dass Rechtleitung allein von Allah kommt.
      Wissen, das Gute zu gebieten, das Verwerfliche zu verbieten und alle unsere eigenen
      Bemühungen sind lediglich Mittel. Niemand kann einem Herzen
      die Rechtleitung geben außer Allah.</p>
      <p>Hidayah soll deshalb nicht um Personen aufgebaut sein. Unser Ziel ist es, Menschen zum Islam,
      zum Wissen und letztlich zu Allah zu führen &ndash; und gleichzeitig selbst auf diesem Weg
      standhaft zu bleiben. Denn auch wir sind weiterhin:</p>
      <p class="pull">Auf der Suche nach Licht in einer Welt voller Dunkelheit.</p>

      <h2 id="mission">Unsere Mission</h2>
      <p>Unsere Mission ist es, die Menschen zum Tawhid &ndash; zur alleinigen Anbetung Allahs
      &ndash; aufzurufen, den Islam auf Grundlage authentischen Wissens zu vermitteln und Muslime
      darin zu stärken, ihren Glauben zu verstehen, zu leben und darin standhaft zu bleiben.</p>
      %(ay_mission)s

      <h2 id="grundlage">Unsere Grundlage</h2>
      <p>Unsere Grundlage sind der Quran und die authentische Sunnah des Gesandten Allahs &#65018;
      nach dem Verständnis der Sahabah und der rechtschaffenen frühen Generationen &ndash;
      as-Salaf as-Salih.</p>
      %(ay_salaf)s
      <p>Islamisches Wissen bedeutet für uns deshalb nicht, Quran und Sunnah nach persönlichen
      Vorstellungen auszulegen. <strong>Wissen wird von seinen Leuten genommen.</strong></p>
      %(ay_ulama)s
      %(hd_erben)s
      <p>Daher gehören die Rückkehr zu den Gelehrten, das Lernen bei ihnen und ein fundierter
      wissenschaftlicher Weg zu den Grundlagen unserer Arbeit.</p>
      <p>In der Aqidah folgen wir dem Weg von Ahl as-Sunnah wa-l-Jamaah, wie ihn die Sahabah und die
      Salaf verstanden und überliefert haben. Im Fiqh erkennen und respektieren wir die vier
      bekannten Rechtsschulen:</p>
      <p class="madhahib">Hanafi &nbsp;&middot;&nbsp; Maliki &nbsp;&middot;&nbsp; Shafii
      &nbsp;&middot;&nbsp; Hanbali</p>
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
      <div class="grid grid--3">%(team)s</div>
    </div>
  </div>
</section>''' % {
        "crumbs": crumbs(lang, [(t(lang, "nav.home"), u(lang)), (t(lang, "nav.about"), None)]),
        "eb": t(lang, "nav.about"), "title": t(lang, "who.title"), "intro": t(lang, "who.p1"),
        "notice": lang_notice(lang),

        "ay_pruefung": ayah(
            "﴿أَحَسِبَ النَّاسُ أَن يُتْرَكُوا أَن يَقُولُوا آمَنَّا وَهُمْ لَا يُفْتَنُونَ﴾",
            "&bdquo;Meinen die Menschen, sie würden in Ruhe gelassen, weil sie sagen: Wir glauben, "
            "ohne dass sie geprüft werden?&ldquo;", "Surat al-Ankabut, 29:2"),

        "ay_dawah": ayah(
            "﴿قُلْ هَٰذِهِ سَبِيلِي أَدْعُو إِلَى اللَّهِ ۚ عَلَىٰ بَصِيرَةٍ أَنَا وَمَنِ اتَّبَعَنِي﴾",
            "&bdquo;Sag: Das ist mein Weg. Ich rufe zu Allah aufgrund eines klaren Beweises, ich und "
            "wer mir folgt.&ldquo;", "Surat Yusuf, 12:108"),

        "hd_wissen": ayah(
            "«إِنَّ اللَّهَ لَا يَقْبِضُ الْعِلْمَ انْتِزَاعًا يَنْتَزِعُهُ مِنَ الْعِبَادِ، وَلَٰكِنْ يَقْبِضُ "
            "الْعِلْمَ بِقَبْضِ الْعُلَمَاءِ، حَتَّىٰ إِذَا لَمْ يُبْقِ عَالِمًا اتَّخَذَ النَّاسُ رُءُوسًا جُهَّالًا، "
            "فَسُئِلُوا فَأَفْتَوْا بِغَيْرِ عِلْمٍ، فَضَلُّوا وَأَضَلُّوا»",
            "&bdquo;Allah nimmt das Wissen nicht fort, indem Er es den Menschen entreißt, sondern Er "
            "nimmt das Wissen fort, indem Er die Gelehrten zu sich nimmt. Bleibt schließlich kein "
            "Gelehrter mehr übrig, nehmen sich die Menschen unwissende Vorsteher. Diese werden "
            "gefragt und geben Auskunft ohne Wissen &ndash; so gehen sie selbst in die Irre und "
            "führen andere in die Irre.&ldquo;",
            "al-Bukhari, Nr. 100; Muslim, Nr. 2673", "hadith"),

        "ay_name": ayah(
            "﴿وَقَالُوا الْحَمْدُ لِلّٰهِ الَّذِي هَدَانَا لِهٰذَا وَمَا كُنَّا لِنَهْتَدِيَ لَوْلَا أَنْ هَدَانَا اللّٰهُ﴾",
            "&bdquo;Und sie werden sagen: Alles Lob gebührt Allah, Der uns hierher rechtgeleitet hat. "
            "Wir hätten niemals die Rechtleitung gefunden, wenn Allah uns nicht rechtgeleitet "
            "hätte.&ldquo;", "Surat al-Araf, 7:43"),

        "ay_mission": ayah(
            "﴿وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ﴾",
            "&bdquo;Und Ich habe die Jinn und die Menschen nur erschaffen, damit sie Mir "
            "dienen.&ldquo;", "Surat adh-Dhariyat, 51:56"),

        "ay_salaf": ayah(
            "﴿وَالسَّابِقُونَ الْأَوَّلُونَ مِنَ الْمُهَاجِرِينَ وَالْأَنْصَارِ وَالَّذِينَ اتَّبَعُوهُم بِإِحْسَانٍ "
            "رَّضِيَ اللَّهُ عَنْهُمْ وَرَضُوا عَنْهُ﴾",
            "&bdquo;Die ersten Vorausgeeilten von den Muhajirun und den Ansar und diejenigen, die "
            "ihnen in guter Weise folgen &ndash; Allah ist mit ihnen zufrieden und sie sind mit Ihm "
            "zufrieden.&ldquo;", "Surat at-Tawbah, 9:100"),

        "ay_ulama": ayah(
            "﴿إِنَّمَا يَخْشَى اللَّهَ مِنْ عِبَادِهِ الْعُلَمَاءُ﴾",
            "&bdquo;Allah fürchten von Seinen Dienern wahrhaftig die Gelehrten.&ldquo;",
            "Surat Fatir, 35:28"),

        "hd_erben": ayah(
            "«إِنَّ الْعُلَمَاءَ وَرَثَةُ الْأَنْبِيَاءِ»",
            "&bdquo;Wahrlich, die Gelehrten sind die Erben der Propheten.&ldquo;",
            "Abu Dawud, Nr. 3641; at-Tirmidhi, Nr. 2682", "hadith"),

        "team": team,
    }


# ------------------------------------------------------------------ Frage & Antwort
GUIDE = [
    ("Beschreibe die Lage, nicht nur das Stichwort",
     "Was ist genau geschehen, wann und unter welchen Umständen? Ein Urteil hängt häufig an einem "
     "einzigen Detail, das in einer allgemeinen Frage gar nicht vorkommt."),
    ("Nenne, was du bereits weißt",
     "Hast du dazu etwas gelesen oder gehört, und von wem? So erkennen wir, woher eine Unklarheit "
     "stammt, und können sie gezielt auflösen, statt an ihr vorbeizureden."),
    ("Trenne Vorgeschichte und Frage",
     "Schildere zuerst den Sachverhalt und stelle die eigentliche Frage danach in einem eigenen "
     "Satz. Dann bleibt eindeutig, worauf du eine Antwort möchtest."),
    ("Stelle eine Frage je Anfrage",
     "Mehrere Themen in einer Nachricht führen dazu, dass jedes davon nur knapp behandelt wird. "
     "Getrennt gestellt bekommt jede Frage die Aufmerksamkeit, die sie braucht."),
]


def qa(lang):
    cats = "".join('<option value="%s">%s</option>' % (c, c) for c in QA_CATEGORIES)

    guide = "".join('''<li class="guide__item">
      <span class="guide__num">%02d</span>
      <div><h3 class="guide__title">%s</h3><p class="guide__text">%s</p></div>
    </li>''' % (i + 1, ti, tx) for i, (ti, tx) in enumerate(GUIDE))

    archive_block = ""
    if QA_PUBLIC:
        items = "".join('''<details class="entry" style="display:block">
            <summary style="list-style:none;cursor:pointer;display:flex;gap:1rem;align-items:flex-start">
              <span class="tag" style="flex:0 0 auto;margin-top:.2rem">%s</span>
              <span class="entry__title" style="font-size:1.1rem">%s</span></summary>
            <div class="prose" style="margin-top:1rem;font-size:1rem;max-width:none">
              <p>%s</p><p class="dim" style="font-size:.82rem">%s</p></div>
          </details>''' % (q["cat"], q["q"], q["a"], fdate(q["date"], lang)) for q in QA_PUBLIC)
        archive_block = ('<section class="section section--hairline"><div class="container">'
                         '<div class="section-head"><p class="eyebrow">Öffentliches Archiv</p>'
                         "<h2>Bereits beantwortete Fragen</h2></div>"
                         '<div class="index">%s</div></div></section>' % items)

    return '''
<section class="section" style="padding-bottom:0">
  <div class="container">
    %(crumbs)s
    <div class="split">
      <p class="eyebrow">%(eb)s</p>
      <div>
        <h1 class="balance" style="max-width:15ch">Stelle deine Frage</h1>
        <p class="lead" style="margin-top:1.5rem">%(text)s Der Dienst ist kostenlos.</p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="split">
      <p class="eyebrow">Wie du fragst</p>
      <div>
        <h2 class="balance" style="max-width:19ch">Eine Frage wird so genau beantwortet,
        wie sie gestellt wird</h2>
        <p class="lead" style="margin-top:1.4rem">Wer allgemein fragt, kann nur eine allgemeine
        Antwort erhalten. Je genauer du deine Lage beschreibst, desto genauer fällt auch die Antwort
        aus &ndash; und desto eher trägt sie in deiner tatsächlichen Situation.</p>
        %(hadith)s
        <ol class="guide">%(guide)s</ol>

        <div class="compare">
          <div class="compare__col">
            <p class="compare__label">Zu allgemein</p>
            <p class="compare__q">&bdquo;Muss ich das Gebet nachholen?&ldquo;</p>
            <p class="compare__note">Darauf lässt sich nur allgemein antworten &ndash; die Regel
            hängt davon ab, warum, wann und unter welchen Umständen es ausgefallen ist.</p>
          </div>
          <div class="compare__col compare__col--good">
            <p class="compare__label">Genauer gefragt</p>
            <p class="compare__q">&bdquo;Ich war auf einer Reise von acht Stunden und habe das
            Asr-Gebet nicht verrichtet, weil ich im Zug keine Möglichkeit hatte. Muss ich es
            nachholen, und gilt für mich als Reisender eine andere Regel?&ldquo;</p>
            <p class="compare__note">Hier steht alles, was für das Urteil zählt. Die Antwort kann
            konkret werden und dir tatsächlich weiterhelfen.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section--hairline">
  <div class="container">
    <div class="split">
      <p class="eyebrow">Veröffentlichung</p>
      <div>
        <p class="lead" style="max-width:56ch">Antworten, die auch für andere von Nutzen sind,
        veröffentlichen wir <strong>ohne Namen und ohne persönliche Angaben</strong> &ndash; damit
        nicht nur der Fragende davon profitiert. Persönliche Angelegenheiten beantworten wir
        ausschließlich privat; im Formular kannst du eine Veröffentlichung ausdrücklich
        ausschließen.</p>
      </div>
    </div>
  </div>
</section>

<section class="section section--hairline">
  <div class="container">
    <div class="split">
      <p class="eyebrow">Formular</p>
      <div>
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
              placeholder="Schildere zuerst den Sachverhalt und stelle danach deine Frage."></textarea>
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
        </form>
      </div>
    </div>
  </div>
</section>
%(archive)s''' % {
        "crumbs": crumbs(lang, [(t(lang, "nav.home"), u(lang)), (t(lang, "nav.qa"), None)]),
        "eb": t(lang, "nav.qa"), "text": t(lang, "areas.q.text"),
        "hadith": ayah("«إِنَّمَا شِفَاءُ الْعِيِّ السُّؤَالُ»",
                       "&bdquo;Das Heilmittel gegen Unwissenheit ist doch das Fragen.&ldquo;",
                       "Abu Dawud, Nr. 336", "hadith"),
        "guide": guide, "cats": cats,
        "f_name": t(lang, "f.name"), "f_mail": t(lang, "f.email"),
        "f_cat": t(lang, "f.category"), "opt": t(lang, "c.optional"),
        "consent": t(lang, "f.consent"), "archive": archive_block,
    }


# ------------------------------------------------------------------ Kurse
COURSE_FACTS = [
    ("Vollständig produziert",
     "Ein Kurs erscheint erst, wenn er komplett aufgenommen und vorbereitet ist. Du kaufst keinen "
     "Kurs, dessen Lektionen erst irgendwann folgen."),
    ("Video und Schrift",
     "Zu jeder Lektion gehört eine schriftliche Zusammenfassung: Kernpunkte, Begriffe, Regeln und "
     "die wichtigsten Belege auf einem Blatt."),
    ("Dein Tempo",
     "Dauerhafter Zugang. Du siehst deinen Fortschritt und machst dort weiter, wo du aufgehört hast."),
    ("Sprache und Beitrag",
     "Die Kurse werden auf Deutsch gehalten. Der Beitrag ist in Euro angegeben und wird in Euro "
     "bezahlt."),
]


def course_card(c, lang):
    foot = " &middot; ".join(x for x in [
        "%d Lektionen" % c["lessons"] if c.get("lessons") else "",
        "%d Stunden" % c["hours"] if c.get("hours") else ""] if x)
    return '''<a class="card" href="%(url)s">
      <span class="tag tag--quiet" style="align-self:flex-start;margin-bottom:.9rem">%(level)s</span>
      <h3 class="card__title">%(title)s</h3><p class="card__text">%(sum)s</p>
      <div class="card__foot" style="display:flex;align-items:baseline;justify-content:space-between;
        gap:1rem"><span class="dim" style="font-size:.86rem">%(foot)s</span>
        <span style="font-family:var(--ff-display);font-size:1.3rem;font-weight:600;
          color:var(--accent)">%(price)s&nbsp;&euro;</span></div>
    </a>''' % {"url": u("de", "kurse/%s.html" % c["slug"]), "level": c.get("level", ""),
                "title": c["title"], "sum": c["summary"], "foot": foot, "price": c["price_eur"]}


def courses(lang):
    listing = ""
    if COURSES:
        blocks = ['<div class="grid grid--3">%s</div>'
                  % "".join(course_card(c, lang) for c in COURSES)]
        packs = ""
        if len(COURSES) >= 2 and PACKAGES:
            cards = "".join('''<div class="card">
              <h3 class="card__title">%s</h3><p class="card__text">%s</p>
              <div class="card__foot"><span style="font-family:var(--ff-display);font-size:1.4rem;
                font-weight:600;color:var(--accent)">%s&nbsp;&euro;</span></div></div>'''
                            % (p["title"], p["note"], p["price_eur"])
                            for p in PACKAGES)
            packs = ('<div class="section-head" style="margin-top:3rem">'
                     '<p class="eyebrow">Pakete</p></div><div class="grid grid--2">%s</div>' % cards)
        listing = ('<section class="section section--hairline"><div class="container">%s%s</div>'
                   "</section>" % ("".join(blocks), packs))
    else:
        listing = ('<section class="section--tight"><div class="container">'
                   '<p class="dim" style="font-size:.92rem">Die ersten Kurse werden derzeit '
                   "produziert.</p></div></section>")

    facts = "".join('''<div class="rail">
      <span class="rail__num">%02d</span>
      <div class="rail__body"><h3 class="rail__title">%s</h3><p class="rail__text">%s</p></div>
    </div>''' % (i + 1, ti, tx) for i, (ti, tx) in enumerate(COURSE_FACTS))

    return '''
<section class="section" style="padding-bottom:0">
  <div class="container">
    %(crumbs)s
    <div class="split">
      <p class="eyebrow">%(eb)s</p>
      <div>
        <h1 class="balance" style="max-width:13ch">Kurse</h1>
        <p class="lead" style="margin-top:1.5rem">Strukturiertes islamisches Wissen, Schritt für
        Schritt &ndash; aufgezeichnet, geordnet und in deinem eigenen Tempo.</p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head"><p class="eyebrow">Aufbau</p>
      <h2 class="balance" style="max-width:18ch">Wie unsere Kurse aufgebaut sind</h2></div>
    <div class="rails">%(facts)s</div>
  </div>
</section>
%(listing)s

<section class="section section--hairline">
  <div class="container">
    <div class="split">
      <p class="eyebrow">Alternativ</p>
      <div>
        <p class="lead" style="max-width:52ch">Du suchst keinen aufgezeichneten Kurs, sondern
        persönlichen Unterricht auf deinen Stand? Dann bewirb dich für den Privatunterricht.</p>
        <div class="btn-row" style="margin-top:1.4rem">
          <a class="link" href="%(teach)s">Zum Privatunterricht <span class="arw">&rarr;</span></a>
        </div>
      </div>
    </div>
  </div>
</section>''' % {
        "crumbs": crumbs(lang, [(t(lang, "nav.home"), u(lang)), (t(lang, "nav.courses"), None)]),
        "eb": t(lang, "nav.courses"), "facts": facts, "listing": listing,
        "teach": u(lang, "unterricht.html"),
    }


# ------------------------------------------------------------------ Neuigkeiten
def news_item(n, lang):
    return '''<article class="newsitem">
  <div class="newsitem__meta"><span class="tag">%s</span><span>%s</span></div>
  <h3 class="newsitem__title">%s</h3>
  <div class="newsitem__body">%s</div>
</article>''' % (n["kind"], fdate(n["date"], lang), n["title"], n["body"])


def news(lang):
    items = sorted(NEWS, key=lambda n: n["date"], reverse=True)
    body = ("".join(news_item(n, lang) for n in items) if items else
            '<p class="dim" style="font-size:.92rem">%s</p>' % t(lang, "news.none"))
    return '''
<section class="section" style="padding-bottom:0">
  <div class="container">
    %(crumbs)s
    <div class="split">
      <p class="eyebrow">%(eb)s</p>
      <div>
        <h1 class="balance" style="max-width:12ch">%(h1)s</h1>
        <p class="lead" style="margin-top:1.5rem">%(lead)s</p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container-narrow">%(body)s</div>
</section>''' % {
        "crumbs": crumbs(lang, [(t(lang, "nav.home"), u(lang)), (t(lang, "nav.news"), None)]),
        "eb": t(lang, "news.eyebrow"), "h1": t(lang, "news.h1"),
        "lead": t(lang, "news.lead"), "body": body,
    }


# ------------------------------------------------------------------ Konto
def account(lang):
    return '''
<section class="section">
  <div class="container">
    %(crumbs)s
    <div class="split">
      <p class="eyebrow">%(eb)s</p>
      <div>
        <h1 class="balance" style="max-width:12ch">%(h1)s</h1>
        <p class="lead" style="margin-top:1.5rem">Über das Konto verwaltest du deine gekauften
        Kurse, deinen Lernfortschritt und deine eigenen Fragen.</p>
        <p class="lead" style="margin-top:1rem">Es wird gemeinsam mit den ersten Kursen geöffnet.</p>
        <div class="btn-row">
          <a class="btn btn--quiet" href="%(courses)s">%(l_courses)s</a>
          <a class="btn btn--quiet" href="%(qa)s">%(l_qa)s</a>
        </div>
      </div>
    </div>
  </div>
</section>''' % {
        "crumbs": crumbs(lang, [(t(lang, "nav.home"), u(lang)), (t(lang, "nav.account"), None)]),
        "eb": t(lang, "nav.account"), "h1": t(lang, "nav.account"),
        "courses": u(lang, "kurse.html"), "l_courses": t(lang, "nav.courses"),
        "qa": u(lang, "frage-antwort.html"), "l_qa": strip_amp(t(lang, "nav.qa")),
    }


def strip_amp(x):
    return x.replace("&amp;", "&")


# ------------------------------------------------------------------ Kontakt
def contact(lang):
    return '''
<section class="section" style="padding-bottom:0">
  <div class="container">
    %(crumbs)s
    <div class="split">
      <p class="eyebrow">%(eb)s</p>
      <div>
        <h1 class="balance" style="max-width:11ch">Schreib uns</h1>
        <p class="lead" style="margin-top:1.5rem">Für Anliegen rund um Hidayah oder eine
        Zusammenarbeit. <strong>Religiöse Fragen</strong> stelle bitte über das dafür vorgesehene
        Formular, <strong>Unterrichtsanfragen</strong> über die Bewerbung.</p>
        <div class="btn-row" style="margin-top:1.6rem;gap:1.6rem">
          <a class="link" href="%(qa)s">Frage stellen <span class="arw">&rarr;</span></a>
          <a class="link" href="%(teach)s">Zum Unterricht bewerben <span class="arw">&rarr;</span></a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="split">
      <p class="eyebrow">Formular</p>
      <div class="contact-grid">
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
            <p class="muted"><a class="link" href="mailto:%(mail)s">%(mail)s</a></p>
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
        "teach": u(lang, "unterricht.html"),
        "f_name": t(lang, "f.name"), "f_mail": t(lang, "f.email"),
        "f_subj": t(lang, "f.subject"), "f_msg": t(lang, "f.message"),
        "consent": t(lang, "f.consent"), "send": t(lang, "f.send"),
        "mail": SITE["email"], "social": t(lang, "foot.social"),
        "ig": SITE["instagram"], "yt": SITE["youtube"], "x": SITE["x"],
        "i_ig": ICON["ig"], "i_yt": ICON["yt"], "i_x": ICON["x"],
    }


# ------------------------------------------------------------------ Kurs (aufgezeichnet)
def course_page(c, lang):
    curr = "".join('''<details class="acc__item"%s>
      <summary class="acc__sum"><span class="acc__num">%02d</span>%s</summary>
      <div class="acc__body"><ul>%s</ul></div>
    </details>''' % (" open" if i == 0 else "", i + 1, title,
                     "".join("<li>%s</li>" % x for x in items))
                   for i, (title, items, _f) in enumerate(c["curriculum"]))
    ul = lambda k: "".join("<li>%s</li>" % x for x in c[k])
    return '''
<section class="section" style="padding-bottom:0">
  <div class="container-narrow">
    %(crumbs)s
    <span class="tag">%(level)s</span>
    <h1 class="balance">%(title)s</h1>
    <p class="lead" style="margin-top:1.5rem">%(sum)s</p>
  </div>
</section>
<section class="section" style="padding-top:2rem">
  <div class="container-narrow">
    %(video)s
    <div class="prose prose--numbered">
      <h2>Kursziel</h2><p>%(goal)s</p>
      <h2>Für wen ist dieser Kurs?</h2><ul>%(aud)s</ul>
      <h2>Voraussetzungen</h2><ul>%(pre)s</ul>
      <h2>Was wirst du lernen?</h2><ul>%(learn)s</ul>
    </div>
    <h2 style="font-size:1.4rem;margin:2.5rem 0 1rem">Kursinhalt</h2>
    <div class="acc">%(curr)s</div>
    <div class="prose" style="margin-top:2.5rem"><h2>Enthalten</h2><ul>%(mat)s</ul></div>
  </div>
</section>''' % {
        "crumbs": crumbs(lang, [(t(lang, "nav.home"), u(lang)),
                                (t(lang, "nav.courses"), u(lang, "kurse.html")),
                                (c["title"], None)]),
        "level": c.get("level", ""), "title": c["title"], "sum": c["summary"],
        "video": video_block(c.get("intro_video", ""), c["title"]),
        "goal": c["goal"], "aud": ul("audience"), "pre": ul("prereq"), "learn": ul("learn"),
        "curr": curr, "mat": ul("materials"),
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
Darstellung und die Bestätigung des Cookie-Hinweises. Es findet kein Tracking, keine
Reichweitenmessung durch Dritte und keine Werbung statt.</p>
<h2>4. Kontakt-, Frage- und Bewerbungsformular</h2>
<p>Wenn du uns eine Nachricht, eine islamische Frage oder eine Unterrichtsbewerbung sendest,
verarbeiten wir die von dir angegebenen Daten zur Bearbeitung deines Anliegens. Rechtsgrundlage ist
Art. 6 Abs. 1 lit. b bzw. lit. a DSGVO. Eine Veröffentlichung deiner Frage erfolgt ausschließlich
<strong>anonymisiert</strong> und nur, wenn du dem nicht widersprochen hast.</p>
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
<p>Diese Bedingungen gelten für Verträge über Unterrichtsleistungen und digitale Inhalte, die über
diese Website zwischen Hidayah und Verbrauchern bzw. Unternehmern geschlossen werden.</p>
<h2>2. Zustandekommen des Unterrichtsvertrags</h2>
<p>Die Bewerbung über das Formular ist noch kein Vertragsangebot. Ein Vertrag kommt erst zustande,
nachdem ein persönliches Gespräch stattgefunden hat, Umfang und Beitrag festgelegt wurden und beide
Seiten dies in Textform bestätigt haben.</p>
<h2>3. Beitrag und Zahlung</h2>
<p>Der Beitrag richtet sich nach Fach, Umfang und Häufigkeit und wird individuell vereinbart. Die
Zahlungsmodalitäten werden bei Vertragsschluss festgelegt.</p>
<h2>4. Terminabsagen</h2>
<p>Vereinbarte Termine können bis 24 Stunden vorher kostenfrei abgesagt oder verschoben werden.</p>
<h2>5. Nutzungsrechte an Materialien</h2>
<p>Unterrichtsmaterialien dürfen ausschließlich persönlich genutzt werden. Weitergabe,
Vervielfältigung oder öffentliche Zugänglichmachung sind nicht gestattet.</p>
<h2>6. Gewährleistung und Haftung</h2>
<p>Es gelten die gesetzlichen Bestimmungen. Für Schäden haften wir nur bei Vorsatz und grober
Fahrlässigkeit sowie bei Verletzung wesentlicher Vertragspflichten.</p>
<h2>7. Schlussbestimmungen</h2>
<p>Es gilt deutsches Recht unter Wahrung der zwingenden Verbraucherschutzvorschriften des
Aufenthaltsstaates des Verbrauchers.</p>''',

"widerruf": '''
<h2>Widerrufsrecht</h2>
<p>Du hast das Recht, binnen vierzehn Tagen ohne Angabe von Gründen einen geschlossenen Vertrag zu
widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.</p>
<p>Um dein Widerrufsrecht auszuüben, musst du uns mittels einer eindeutigen Erklärung (z. B. per
E-Mail an salam@hidayah.de) über deinen Entschluss informieren.</p>
<h2>Folgen des Widerrufs</h2>
<p>Wenn du widerrufst, erstatten wir dir alle Zahlungen unverzüglich und spätestens binnen vierzehn
Tagen ab Eingang deiner Mitteilung zurück.</p>
<h2>Vorzeitiges Erlöschen</h2>
<p>Bei Dienstleistungen erlischt das Widerrufsrecht, wenn wir die Leistung vollständig erbracht haben
und du vor Beginn ausdrücklich zugestimmt und deine Kenntnis vom Verlust des Widerrufsrechts
bestätigt hast. Bei digitalen Inhalten gilt dies entsprechend.</p>
<h2>Muster-Widerrufsformular</h2>
<p>An Hidayah, [Anschrift], salam@hidayah.de:<br>
Hiermit widerrufe ich den von mir abgeschlossenen Vertrag über: ____________<br>
Bestellt am: ____________<br>Name: ____________<br>Anschrift: ____________<br>
Datum: ____________</p>'''}


def legal(lang, kind):
    warn = ('<div class="notice" style="margin-bottom:2.5rem">%s<div><strong>Diese Seite ist eine '
            "Vorlage.</strong> Vor der Veröffentlichung muss sie an die tatsächlich verwendete "
            "Struktur angepasst und rechtlich geprüft werden.</div></div>" % ICON["info"])
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
<section class="section" style="min-height:56vh;display:grid;place-items:center;text-align:center">
  <div class="container-narrow">
    <p class="eyebrow" style="justify-content:center">404</p>
    <h1 class="balance">Diese Seite gibt es nicht</h1>
    <p class="lead" style="margin:1.5rem auto 0">Vielleicht wurde sie verschoben oder der Link ist
    nicht mehr aktuell.</p>
    <div class="btn-row" style="justify-content:center">
      <a class="btn btn--primary" href="%s">%s</a>
    </div>
  </div>
</section>''' % (u(lang), t(lang, "nav.home"))
