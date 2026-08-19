# -*- coding: utf-8 -*-
"""Baut die Koerper (body) aller Seiten."""
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


def price(c, lang):
    return '<span class="course__price">%s&nbsp;&euro; <small>/ %s&nbsp;&#8378;</small></span>' % (
        c["price_eur"], c["price_try"])


# ------------------------------------------------------------------ Bausteine
def article_card(a, lang):
    # Detailseiten existieren bislang nur auf Deutsch -> immer dorthin verlinken
    return f'''<a class="post" href="{u('de','wissen/'+a['slug']+'.html')}">
  <div class="post__meta">
    <span class="tag">{SERIES_MAP[a['series']][0]}</span>
    <span>{fdate(a['date'], lang)}</span><span>&middot;</span>
    <span>{a['reading']} {t(lang,'c.min')}</span>
  </div>
  <h3 class="post__title">{a['title']}</h3>
  <p class="post__excerpt">{a['summary']}</p>
</a>'''


def course_card(c, lang):
    facts = f'''<div class="course__facts">
      <span>{ICON['book']} {c['lessons']} {'Lektionen' if lang!='tr' else 'ders'}</span>
      <span>{c['hours']} h</span><span>{c['level']}</span></div>'''
    return f'''<a class="card course card--hover" href="{u('de','kurse/'+c['slug']+'.html')}">
  <span class="course__lang">{c['lang_label']}</span>
  <h3 class="card__title">{c['title']}</h3>
  <p class="card__text">{c['summary']}</p>
  {facts}
  <div class="price-row">{price(c, lang)}<span class="link-arrow">{t(lang,'c.read') if False else t(lang,'areas.c.cta')}</span></div>
</a>'''


def lang_notice(lang):
    if lang == "de":
        return ""
    return f'''<div class="notice" style="margin-bottom:2rem">{ICON['info']}
      <div>{t(lang,'c.langnote')}</div></div>'''


def crumbs(lang, items):
    parts = []
    for label, href in items:
        parts.append(f'<span><a href="{href}">{label}</a></span>' if href else f'<span>{label}</span>')
    return '<nav class="crumbs" aria-label="Breadcrumb">' + "".join(parts) + "</nav>"


# ------------------------------------------------------------------ Startseite
def home(lang):
    latest = sorted(ARTICLES, key=lambda a: a["date"], reverse=True)[:3]
    rec = [c for c in COURSES if c["slug"] in
           ("arabische-grammatik-de", "aqidah-grundlagen-de", "tajwid-de")][:3]
    return f'''
<section class="hero">
  <div class="hero__moon" aria-hidden="true"></div>
  <div class="container">
    <img class="hero__logo" src="/assets/img/logo.webp" alt="Hidayah"
         width="1400" height="476" fetchpriority="high">
    <h1 class="hero__slogan">{t(lang,'slogan')}</h1>
    <p class="hero__sub">{t(lang,'hero.sub')}</p>
    <div class="btn-row">
      <a class="btn btn--primary" href="{u(lang,'wissen.html')}">{t(lang,'hero.cta1')}</a>
      <a class="btn btn--ghost" href="{u(lang,'kurse.html')}">{t(lang,'hero.cta2')}</a>
    </div>
    <div class="scroll-hint" aria-hidden="true">{t(lang,'hero.scroll')}<span></span></div>
  </div>
</section>

<section class="section section--tight reveal">
  <div class="container-narrow">
    <p class="eyebrow">{t(lang,'who.eyebrow')}</p>
    <h2>{t(lang,'who.title')}</h2>
    <div class="stack" style="margin-top:1.5rem">
      <p class="lead">{t(lang,'who.p1')}</p>
      <p class="lead">{t(lang,'who.p2')}</p>
    </div>
    <div class="btn-row"><a class="link-arrow" href="{u(lang,'ueber-uns.html')}">{t(lang,'who.cta')}</a></div>
  </div>
</section>

<section class="section reveal">
  <div class="container-narrow">
    <p class="eyebrow">{t(lang,'video.eyebrow')}</p>
    <h2 style="margin-bottom:.9rem">{t(lang,'video.title')}</h2>
    <p class="lead" style="margin-bottom:2rem">{t(lang,'video.text')}</p>
    <div class="video-box" data-video-placeholder>
      <div>
        <div class="video-box__play">{ICON['play']}</div>
        <p class="muted" style="font-size:.92rem;max-width:34ch;margin-inline:auto">{t(lang,'video.hint')}</p>
      </div>
    </div>
  </div>
</section>

<section class="section reveal">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">{t(lang,'areas.eyebrow')}</p>
      <h2>{t(lang,'areas.title')}</h2>
    </div>
    <div class="grid" style="gap:1rem">
      <a class="area" href="{u(lang,'wissen.html')}">
        <span class="area__icon">{ICON['book']}</span>
        <div class="area__body"><h3 class="area__title">{t(lang,'areas.k.title')}</h3>
          <p class="area__text">{t(lang,'areas.k.text')}</p></div>
        <span class="area__cta">{t(lang,'areas.k.cta')}</span>
      </a>
      <a class="area" href="{u(lang,'frage-antwort.html')}">
        <span class="area__icon">{ICON['help']}</span>
        <div class="area__body"><h3 class="area__title">{t(lang,'areas.q.title')}</h3>
          <p class="area__text">{t(lang,'areas.q.text')}</p></div>
        <span class="area__cta">{t(lang,'areas.q.cta')}</span>
      </a>
      <a class="area" href="{u(lang,'kurse.html')}">
        <span class="area__icon">{ICON['cap']}</span>
        <div class="area__body"><h3 class="area__title">{t(lang,'areas.c.title')}</h3>
          <p class="area__text">{t(lang,'areas.c.text')}</p></div>
        <span class="area__cta">{t(lang,'areas.c.cta')}</span>
      </a>
    </div>
  </div>
</section>

<section class="section reveal">
  <div class="container">
    <div class="section-head section-head--split">
      <div><p class="eyebrow">{t(lang,'latest.eyebrow')}</p><h2>{t(lang,'latest.title')}</h2></div>
      <a class="link-arrow" href="{u(lang,'wissen.html')}">{t(lang,'latest.all')}</a>
    </div>
    {lang_notice(lang)}
    <div>{''.join(article_card(a, lang) for a in latest)}</div>
  </div>
</section>

<section class="section reveal">
  <div class="container">
    <div class="section-head section-head--split">
      <div><p class="eyebrow">{t(lang,'rec.eyebrow')}</p><h2>{t(lang,'rec.title')}</h2></div>
      <a class="link-arrow" href="{u(lang,'kurse.html')}">{t(lang,'rec.all')}</a>
    </div>
    <div class="grid grid--3">{''.join(course_card(c, lang) for c in rec)}</div>
  </div>
</section>

<section class="section--tight reveal" style="padding-bottom:2rem">
  <div class="container">
    <div class="newsletter">
      <div>
        <h2 style="font-size:clamp(1.5rem,1.2rem + 1.4vw,2.1rem)">{t(lang,'news.title')}</h2>
        <p class="muted" style="margin-top:.8rem;max-width:44ch">{t(lang,'news.text')}</p>
      </div>
      <div>
        <form data-form="newsletter" novalidate>
          <input class="input" type="email" name="email" required placeholder="{t(lang,'news.ph')}"
                 aria-label="{t(lang,'news.ph')}">
          <button class="btn btn--primary" type="submit">{t(lang,'news.btn')}</button>
        </form>
        <p class="form-note">{t(lang,'news.privacy')}</p>
        <p class="form-status" data-status></p>
      </div>
    </div>
  </div>
</section>'''


# ------------------------------------------------------------------ Über uns
def about(lang):
    ay = ('<figure class="ayah"><p class="ayah__ar" lang="ar" dir="rtl">'
          '﴿وَقَالُوا الْحَمْدُ لِلّٰهِ الَّذِي هَدَانَا لِهٰذَا وَمَا كُنَّا لِنَهْتَدِيَ لَوْلَا أَنْ هَدَانَا اللّٰهُ﴾</p>'
          '<p class="ayah__de">&bdquo;Und sie werden sagen: Alles Lob gebührt Allah, Der uns hierher '
          'rechtgeleitet hat. Wir hätten niemals die Rechtleitung gefunden, wenn Allah uns nicht '
          'rechtgeleitet hätte.&ldquo;</p>'
          '<figcaption class="ayah__src">Sūrat al-Aʿrāf, 7:43</figcaption></figure>')
    ay2 = ('<figure class="ayah"><p class="ayah__ar" lang="ar" dir="rtl">'
           '﴿وَالسَّابِقُونَ الْأَوَّلُونَ مِنَ الْمُهَاجِرِينَ وَالْأَنْصَارِ وَالَّذِينَ اتَّبَعُوهُمْ بِإِحْسَانٍ رَضِيَ اللَّهُ عَنْهُمْ وَرَضُوا عَنْهُ﴾</p>'
           '<p class="ayah__de">&bdquo;Die ersten Vorausgeeilten von den Muhāǧirūn und den Anṣār und '
           'diejenigen, die ihnen in guter Weise folgen &ndash; Allah ist mit ihnen zufrieden und sie '
           'sind mit Ihm zufrieden.&ldquo;</p>'
           '<figcaption class="ayah__src">Sūrat at-Tawbah, 9:100</figcaption></figure>')
    ay3 = ('<figure class="ayah"><p class="ayah__ar" lang="ar" dir="rtl">'
           '﴿إِنَّمَا يَخْشَى اللَّهَ مِنْ عِبَادِهِ الْعُلَمَاءُ﴾</p>'
           '<p class="ayah__de">&bdquo;Allah fürchten von Seinen Dienern wahrhaftig die Gelehrten.&ldquo;</p>'
           '<figcaption class="ayah__src">Sūrat Fāṭir, 35:28</figcaption></figure>')
    hd = ('<figure class="ayah hadith"><p class="ayah__ar" lang="ar" dir="rtl">'
          '«إِنَّ الْعُلَمَاءَ وَرَثَةُ الْأَنْبِيَاءِ»</p>'
          '<p class="ayah__de">&bdquo;Wahrlich, die Gelehrten sind die Erben der Propheten.&ldquo;</p>'
          '<figcaption class="ayah__src">Abū Dāwūd, Nr. 3641; at-Tirmiḏī, Nr. 2682</figcaption></figure>')

    team = "".join(f'''<div class="card member">
      <div class="member__avatar">{m['initials']}</div>
      <p class="member__role">{m['role']}</p>
      <h3 class="card__title" style="margin-bottom:.5rem">{m['name']}</h3>
      <p class="card__text">{m['bio']}</p>
      <ul class="member__list">{''.join('<li>'+f+'</li>' for f in m['focus'])}</ul>
    </div>''' for m in TEAM)

    madh = " &nbsp;|&nbsp; ".join(n for _, n in MADHAHIB)

    return f'''
<section class="section" style="padding-bottom:0">
  <div class="container-narrow">
    {crumbs(lang, [(t(lang,'nav.home'), u(lang)), (t(lang,'nav.about'), None)])}
    <p class="eyebrow">{t(lang,'nav.about')}</p>
    <h1>{t(lang,'who.title')}</h1>
    <p class="lead" style="margin-top:1.5rem">{t(lang,'who.p1')}</p>
    {lang_notice(lang)}
  </div>
</section>

<section class="section">
  <div class="container-narrow">
    <article class="prose">
      <h2 id="entstehung">Entstehung von Hidayah</h2>
      <p>Hidayah entstand im Oktober 2024 nach Gesprächen und Beratungen zwischen drei Brüdern sowie
      mit unseren Lehrern und Šuyūḫ. Dahinter stand die gemeinsame Überzeugung, dass es notwendig ist,
      das Gelernte nicht nur für sich selbst zu bewahren, sondern damit nach außen zu treten und
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
      <p>Daraus entwickelte sich unser Weg: Daʿwah zu machen, islamisches Wissen weiterzugeben,
      Missverständnisse aufzuklären und dort zu helfen, wo wir mit unseren Möglichkeiten helfen können.</p>
      <p>Ein weiterer Grund für die Entstehung von Hidayah war die Art und Weise, wie islamisches
      Wissen heute verbreitet wird. Durch soziale Medien kann nahezu jeder über religiöse Themen
      sprechen. Dadurch wird Wissen teilweise ohne ausreichende Grundlagen weitergegeben, Aussagen
      werden aus ihrem Zusammenhang gerissen und komplexe Fragen werden von Menschen behandelt, denen
      die notwendigen Grundlagen fehlen.</p>
      <p>Nach mehreren Jahren des Lernens, dem Begleiten unserer Lehrer und dem Erhalt von Iǧāzāt
      entstand deshalb &ndash; gemeinsam mit unseren Lehrern und Šuyūḫ &ndash; der Entschluss, selbst
      Verantwortung zu übernehmen und das Gelernte auf zugängliche und zugleich fundierte Weise
      weiterzugeben.</p>

      <h2 id="name">Warum der Name &bdquo;Hidayah&ldquo;?</h2>
      <p>Hidayah bedeutet: <strong>Rechtleitung</strong>. Einer der Verse, die bei der Wahl dieses
      Namens eine besondere Bedeutung hatten, ist die Aussage Allahs:</p>
      {ay}
      <p>Der Name soll zuerst uns selbst daran erinnern, dass Rechtleitung allein von Allah kommt.
      Wissen, Daʿwah und die eigenen Bemühungen sind lediglich Mittel. Niemand kann einem Herzen die
      Rechtleitung geben außer Allah.</p>
      <p>Hidayah soll deshalb nicht um Personen aufgebaut sein. Unser Ziel ist es, Menschen zum Islam,
      zum Wissen und letztlich zu Allah zu führen und gleichzeitig selbst auf diesem Weg standhaft zu
      bleiben. Denn auch wir sind weiterhin: <em>Auf der Suche nach Licht in einer Welt voller
      Dunkelheit.</em></p>

      <h2 id="mission">Unsere Mission</h2>
      <p>Unsere Mission ist es, die Menschen zum Tawḥīd &ndash; zur alleinigen Anbetung Allahs &ndash;
      aufzurufen, den Islam auf Grundlage authentischen Wissens zu vermitteln und Muslime darin zu
      stärken, ihren Glauben zu verstehen, zu leben und darin standhaft zu bleiben.</p>

      <h2 id="grundlage">Unsere Grundlage</h2>
      <p>Unsere Grundlage sind der Qurʾān und die authentische Sunnah des Gesandten Allahs ﷺ nach dem
      Verständnis der Ṣaḥābah und der rechtschaffenen frühen Generationen &ndash; as-Salaf aṣ-Ṣāliḥ.</p>
      {ay2}
      <p>Islamisches Wissen bedeutet für uns deshalb nicht, Qurʾān und Sunnah nach persönlichen
      Vorstellungen auszulegen. <strong>Wissen wird von seinen Leuten genommen.</strong></p>
      {ay3}
      {hd}
      <p>Daher gehören die Rückkehr zu den Gelehrten, das Lernen bei ihnen und ein fundierter
      wissenschaftlicher Weg zu den Grundlagen unserer Arbeit.</p>
      <p>In der ʿAqīdah folgen wir dem Weg von Ahl as-Sunnah wa-l-Ǧamāʿah, wie ihn die Ṣaḥābah und die
      Salaf verstanden und überliefert haben. Im Fiqh erkennen und respektieren wir die vier bekannten
      Rechtsschulen:</p>
      <p style="font-family:var(--ff-display);font-size:1.2rem;color:var(--moon);text-align:center;
      padding:1.2rem 0;border-block:1px solid var(--line)">{madh}</p>
      <p>Anerkannte Meinungsverschiedenheiten behandeln wir mit Wissen, Gerechtigkeit und Respekt.
      Unser Ziel ist nicht, einen neuen Weg zu schaffen oder den Islam nach eigenen Vorstellungen zu
      formen. <strong>Unser Ziel ist es, dem zu folgen, was bereits vorgegeben wurde.</strong></p>
    </article>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="container">
    <div class="section-head"><p class="eyebrow">Unser Team</p>
      <h2>Drei Brüder, ein gemeinsamer Weg</h2>
      <p class="lead" style="margin-top:1rem">Die jeweiligen Aufgaben und Themenbereiche richten sich
      nach dem Wissensstand und den Schwerpunkten des Einzelnen. Die Personen sollen sichtbar sein &ndash;
      Hidayah wird jedoch nicht um einzelne Personen aufgebaut.</p></div>
    <div class="grid grid--3">{team}</div>
  </div>
</section>

<section class="section--tight" style="padding-bottom:4rem">
  <div class="container-narrow" style="text-align:center">
    <p class="lead" style="margin-inline:auto">Du hast eine Frage zu Hidayah oder zu einem islamischen Thema?</p>
    <div class="btn-row" style="justify-content:center">
      <a class="btn btn--primary" href="{u(lang,'frage-antwort.html')}">{t(lang,'areas.q.cta')}</a>
      <a class="btn btn--ghost" href="{u(lang,'kontakt.html')}">{t(lang,'nav.contact')}</a>
    </div>
  </div>
</section>'''


# ------------------------------------------------------------------ Wissen (Archiv)
def knowledge(lang):
    series_cards = "".join(f'''<a class="card card--hover" href="#reihe-{k}">
      <h3 class="card__title">{n}</h3><p class="card__text">{d}</p>
      <span class="card__foot link-arrow">{t(lang,'areas.k.cta')}</span></a>''' for k, n, d in SERIES)

    chips = ['<button class="chip" type="button" data-filter="all" aria-pressed="true">%s</button>'
             % t(lang, "c.all")]
    chips += ['<button class="chip" type="button" data-filter="series:%s" aria-pressed="false">%s</button>'
              % (k, n) for k, n, _ in SERIES]
    used = sorted({tp for a in ARTICLES for tp in a["topics"]})
    chips += ['<button class="chip" type="button" data-filter="topic:%s" aria-pressed="false">%s</button>'
              % (k, TOPIC_MAP[k]) for k in used]

    items = []
    for a in sorted(ARTICLES, key=lambda x: x["date"], reverse=True):
        keys = " ".join(["series:" + a["series"]] + ["topic:" + x for x in a["topics"]])
        items.append(f'<div data-keys="{keys}" data-series="{a["series"]}">{article_card(a, lang)}</div>')

    return f'''
<section class="section" style="padding-bottom:0">
  <div class="container">
    {crumbs(lang, [(t(lang,'nav.home'), u(lang)), (t(lang,'nav.knowledge'), None)])}
    <p class="eyebrow">{t(lang,'latest.eyebrow')}</p>
    <h1>{t(lang,'areas.k.title')}</h1>
    <p class="lead" style="margin-top:1.5rem">{t(lang,'areas.k.text')}
    Alle Inhalte sind nach Reihen und Themen geordnet, damit du gezielt findest, was du suchst.</p>
  </div>
</section>

<section class="section--tight">
  <div class="container"><div class="grid grid--3">{series_cards}</div></div>
</section>

<section class="section" style="padding-top:2rem">
  <div class="container">
    {lang_notice(lang)}
    <div class="filters" data-filters>{''.join(chips)}</div>
    <div data-article-list>{''.join(items)}</div>
    <p class="search-empty" data-empty hidden>{t(lang,'search.empty')}</p>
  </div>
</section>'''


# ------------------------------------------------------------------ Artikel
import re as _re


def article_page(a, lang):
    heads = _re.findall(r'<h2 id="([^"]+)">(.*?)</h2>', a["body"], _re.S)
    toc = ""
    if len(heads) >= 3:
        toc = ('<nav class="toc" aria-label="%s"><p class="toc__title">%s</p><ol>%s</ol></nav>'
               % (t(lang, "c.toc"), t(lang, "c.toc"),
                  "".join('<li><a href="#%s">%s</a></li>' % (i, _re.sub("<[^>]+>", "", h))
                          for i, h in heads)))
    video = ""
    if a.get("video"):
        video = f'''<div class="video-box" style="margin-block:2.5rem" data-video-placeholder>
          <div><div class="video-box__play">{ICON['play']}</div>
          <p class="muted" style="font-size:.92rem">{t(lang,'c.video')} &mdash; {a['title']}</p></div>
        </div>'''
    src = ""
    if a.get("sources"):
        src = ('<section class="sources"><h2 style="font-size:1.1rem;margin-bottom:1rem">%s</h2><ol>%s</ol></section>'
               % (t(lang, "c.sources"), "".join("<li>%s</li>" % s for s in a["sources"])))

    rel = [x for x in ARTICLES if x["slug"] != a["slug"]
           and (x["series"] == a["series"] or set(x["topics"]) & set(a["topics"]))][:3]
    related = ""
    if rel:
        related = f'''<section class="section" style="padding-top:0">
          <div class="container-narrow"><div class="section-head"><h2 style="font-size:1.5rem">{t(lang,'c.related')}</h2></div>
          <div>{''.join(article_card(r, lang) for r in rel)}</div></div></section>'''

    tags = "".join('<span class="tag">%s</span>' % TOPIC_MAP[x] for x in a["topics"])
    madh = ""
    if a.get("madhhab"):
        madh = " ".join('<span class="tag">%s</span>' % MADH_MAP[m] for m in a["madhhab"])

    return f'''
<article class="article-head">
  <div class="container-narrow">
    {crumbs(lang, [(t(lang,'nav.home'), u(lang)), (t(lang,'nav.knowledge'), u(lang,'wissen.html')),
                   (SERIES_MAP[a['series']][0], u(lang,'wissen.html')), (a['title'], None)])}
    <div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:1.2rem">
      <span class="tag">{SERIES_MAP[a['series']][0]}</span>{tags}{madh}</div>
    <h1>{a['title']}</h1>
    <p class="article-summary">{a['summary']}</p>
    <div class="article-meta">
      <span>{t(lang,'c.by')} <strong style="color:var(--fg-muted)">{a['author']}</strong></span>
      <span>{fdate(a['date'], lang)}</span>
      <span>{a['reading']} {t(lang,'c.min')}</span>
    </div>
  </div>
</article>

<section class="section" style="padding-top:2.5rem">
  <div class="container-narrow">
    {video}{toc}
    <div class="prose">{a['body']}</div>
    {src}
    <div class="share">
      <span>{t(lang,'c.share')}</span>
      <a href="https://wa.me/?text=" data-share="whatsapp" rel="noopener" target="_blank">WhatsApp</a>
      <a href="https://t.me/share/url?url=" data-share="telegram" rel="noopener" target="_blank">Telegram</a>
      <a href="https://x.com/intent/tweet?url=" data-share="x" rel="noopener" target="_blank">X</a>
      <button type="button" data-share="copy">{t(lang,'c.copy')}</button>
    </div>
  </div>
</section>
{related}'''


# ------------------------------------------------------------------ Kurse
def courses(lang):
    de = [c for c in COURSES if c["lang"] == "de"]
    tr = [c for c in COURSES if c["lang"] == "tr"]
    packs = "".join(f'''<div class="card">
      <span class="course__lang">{p['lang_label']}</span>
      <h3 class="card__title">{p['title']}</h3>
      <p class="card__text">{p['note']}</p>
      <ul class="member__list" style="margin-top:1rem">{''.join(
          '<li>' + next(c['title'] for c in COURSES if c['slug']==s) + '</li>' for s in p['includes'])}</ul>
      <div class="price-row">
        <span class="course__price">{p['price_eur']}&nbsp;&euro; <small>/ {p['price_try']}&nbsp;&#8378;</small></span>
        <button class="btn btn--primary btn--sm" type="button" data-checkout="{p['slug']}">Paket kaufen</button>
      </div></div>''' for p in PACKAGES)

    return f'''
<section class="section" style="padding-bottom:0">
  <div class="container">
    {crumbs(lang, [(t(lang,'nav.home'), u(lang)), (t(lang,'nav.courses'), None)])}
    <p class="eyebrow">{t(lang,'rec.eyebrow')}</p>
    <h1>Hidayah Kurse</h1>
    <p class="lead" style="margin-top:1.5rem">Strukturiertes islamisches Wissen &ndash; Schritt für Schritt.
    Jeder Kurs wird vollständig aufgenommen und vorbereitet, bevor er freigeschaltet wird. Du kaufst
    also keinen unfertigen Kurs, dessen Lektionen erst irgendwann erscheinen.</p>
    <div class="grid grid--3" style="margin-top:3rem">
      <div class="card"><h3 class="card__title">Für wen?</h3>
        <p class="card__text">Für alle, die strukturiert lernen wollen &ndash; vom ersten Einstieg bis
        zur Vertiefung. Voraussetzungen stehen bei jedem Kurs klar dabei.</p></div>
      <div class="card"><h3 class="card__title">Wie wird unterrichtet?</h3>
        <p class="card__text">Video plus schriftliche Zusammenfassung als PDF zu jeder Lektion. Du
        siehst deinen Fortschritt und kannst jederzeit dort weitermachen, wo du aufgehört hast.</p></div>
      <div class="card"><h3 class="card__title">Sprachen &amp; Zahlung</h3>
        <p class="card__text">Kurse auf Deutsch und Türkisch als getrennte Produkte. Bezahlung wahlweise
        in Euro oder Türkischer Lira &ndash; unabhängig von der Sprache der Website.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head"><p class="eyebrow">Einzelkurse</p><h2>Deutschsprachige Kurse</h2></div>
    <div class="grid grid--3">{''.join(course_card(c, lang) for c in de)}</div>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="container">
    <div class="section-head"><p class="eyebrow">Tek dersler</p><h2>Türkischsprachige Kurse</h2></div>
    <div class="grid grid--3">{''.join(course_card(c, lang) for c in tr)}</div>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="container">
    <div class="section-head"><p class="eyebrow">Pakete</p><h2>Komplettpakete</h2>
      <p class="lead" style="margin-top:1rem">Alle Kurse einer Sprache zusammen &ndash; günstiger als einzeln.</p></div>
    <div class="grid grid--2">{packs}</div>
  </div>
</section>'''


def course_page(c, lang):
    curr = "".join(f'''<details{" open" if i == 0 else ""}>
      <summary><span class="curriculum__num">{i+1:02d}</span>{title}
      {'<span class="lesson-free">Kostenlos</span>' if free else ''}</summary>
      <div class="curriculum__body"><ul style="margin:0;padding-inline-start:1.1rem">{
        ''.join('<li>'+x+'</li>' for x in items)}</ul></div>
    </details>''' for i, (title, items, free) in enumerate(c["curriculum"]))

    def ul(key):
        return "".join("<li>%s</li>" % x for x in c[key])

    return f'''
<section class="section" style="padding-bottom:0">
  <div class="container">
    {crumbs(lang, [(t(lang,'nav.home'), u(lang)), (t(lang,'nav.courses'), u(lang,'kurse.html')), (c['title'], None)])}
    <div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:1.2rem">
      <span class="tag">Kurssprache: {c['lang_label']}</span>
      <span class="tag">{c['level']}</span>
      {''.join('<span class="tag">%s</span>' % x for x in c['topics'])}
    </div>
    <h1>{c['title']}</h1>
    <p class="lead" style="margin-top:1.5rem">{c['summary']}</p>
  </div>
</section>

<section class="section" style="padding-top:2.5rem">
  <div class="container">
    <div style="display:grid;gap:2.5rem;grid-template-columns:1fr" data-course-layout>
      <div>
        <div class="video-box" data-video-placeholder>
          <div><div class="video-box__play">{ICON['play']}</div>
          <p class="muted" style="font-size:.92rem;max-width:36ch;margin-inline:auto">
            Vorstellungsvideo &ndash; worum es geht, für wen der Kurs ist und was du danach kannst.</p></div>
        </div>

        <div class="prose" style="max-width:none;margin-top:2.5rem">
          <h2>Kursziel</h2><p>{c['goal']}</p>
          <h2>Für wen ist dieser Kurs?</h2><ul>{ul('audience')}</ul>
          <h2>Voraussetzungen</h2><ul>{ul('prereq')}</ul>
          <h2>Was wirst du lernen?</h2><ul>{ul('learn')}</ul>
        </div>

        <h2 style="margin-top:3rem;margin-bottom:1.2rem;font-size:1.5rem">Kursinhalt</h2>
        <div class="curriculum">{curr}</div>

        <div class="notice" style="margin-top:2rem">{ICON['info']}
          <div><strong>Kostenlose Vorschau:</strong> Die ersten Lektionen kannst du teilweise ansehen,
          bevor du dich entscheidest. Nach etwa zwei bis drei Minuten wirst du gefragt, ob du den
          Unterricht fortsetzen möchtest.</div></div>
      </div>

      <aside>
        <div class="card" style="position:sticky;top:calc(var(--header-h) + 20px)">
          <div class="price-row" style="margin-top:0">{price(c, lang)}</div>
          <p class="muted" style="font-size:.85rem;margin-top:.4rem">Einmalzahlung &middot; dauerhafter Zugang</p>
          <div class="field" style="margin-top:1.3rem">
            <label for="cur-{c['slug']}">Währung</label>
            <select class="select" id="cur-{c['slug']}" data-currency>
              <option value="eur">EUR &euro; &ndash; Euro</option>
              <option value="try">TRY &#8378; &ndash; Türkische Lira</option>
            </select>
          </div>
          <button class="btn btn--primary btn--block" type="button" data-checkout="{c['slug']}">Kurs freischalten</button>
          <button class="btn btn--ghost btn--block" type="button" style="margin-top:.6rem"
                  data-preview="{c['slug']}">Kostenlose Vorschau</button>
          <ul class="member__list" style="margin-top:1.5rem">
            <li>{c['lessons']} Lektionen &middot; ca. {c['hours']} Stunden</li>
            <li>Dozent: {c['teacher']}</li>
            <li>Unterrichtssprache: {c['lang_label']}</li>
            {''.join('<li>'+m+'</li>' for m in c['materials'])}
          </ul>
        </div>
      </aside>
    </div>
  </div>
</section>'''


# ------------------------------------------------------------------ Frage & Antwort
def qa(lang):
    cats = "".join('<option value="%s">%s</option>' % (c, c) for c in QA_CATEGORIES)
    chips = ['<button class="chip" type="button" data-filter="all" aria-pressed="true">%s</button>'
             % t(lang, "c.all")]
    seen = []
    for q in QA_PUBLIC:
        if q["cat"] not in seen:
            seen.append(q["cat"])
    chips += ['<button class="chip" type="button" data-filter="topic:%s" aria-pressed="false">%s</button>'
              % (c.lower().replace(" ", "-"), c) for c in seen]

    items = "".join(f'''<div data-keys="topic:{q['cat'].lower().replace(' ','-')}">
      <details class="card" style="margin-bottom:1rem;padding:0">
        <summary style="list-style:none;cursor:pointer;padding:1.3rem 1.6rem;display:flex;gap:1rem;align-items:flex-start">
          <span class="tag" style="flex:0 0 auto;margin-top:.15rem">{q['cat']}</span>
          <span style="font-family:var(--ff-display);font-weight:600;font-size:1.05rem;line-height:1.4">{q['q']}</span>
        </summary>
        <div class="prose" style="padding:0 1.6rem 1.6rem;max-width:none;font-size:1rem">
          <p>{q['a']}</p>
          <p class="dim" style="font-size:.82rem">{fdate(q['date'], lang)} &middot; anonymisiert veröffentlicht</p>
        </div>
      </details></div>''' for q in QA_PUBLIC)

    return f'''
<section class="section" style="padding-bottom:0">
  <div class="container-narrow">
    {crumbs(lang, [(t(lang,'nav.home'), u(lang)), (t(lang,'nav.qa'), None)])}
    <p class="eyebrow">{t(lang,'nav.qa')}</p>
    <h1>Stelle deine islamische Frage</h1>
    <p class="lead" style="margin-top:1.5rem">{t(lang,'areas.q.text')}
    Der Dienst ist kostenlos. Persönliche Angelegenheiten werden ausschließlich privat beantwortet.</p>
  </div>
</section>

<section class="section">
  <div class="container-narrow">
    <div class="card" style="padding:clamp(1.6rem,1.2rem + 1.6vw,2.6rem)">
      <h2 style="font-size:1.4rem;margin-bottom:1.6rem">Frage stellen</h2>
      <form data-form="frage" novalidate>
        <div class="form-grid">
          <div class="field">
            <label for="q-name">{t(lang,'f.name')} <span class="dim">({t(lang,'c.optional')})</span></label>
            <input class="input" id="q-name" name="name" type="text" autocomplete="name">
          </div>
          <div class="field">
            <label for="q-mail">{t(lang,'f.email')}</label>
            <input class="input" id="q-mail" name="email" type="email" required autocomplete="email">
            <span class="hint">Wir benachrichtigen dich, sobald deine Antwort vorliegt.</span>
          </div>
        </div>
        <div class="field">
          <label for="q-cat">{t(lang,'f.category')}</label>
          <select class="select" id="q-cat" name="kategorie">{cats}</select>
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
          <label class="check"><input type="checkbox" required>
            <span>{t(lang,'f.consent')}</span></label>
        </div>
        <button class="btn btn--primary" type="submit">Frage absenden</button>
        <p class="form-status" data-status></p>
        <p class="form-note">Nützliche Antworten veröffentlichen wir gegebenenfalls <strong>anonymisiert</strong>
        im Wissensarchiv, damit andere davon profitieren. Persönliche Daten werden dabei niemals gezeigt.</p>
      </form>
    </div>

    <div class="grid grid--3" style="margin-top:2rem">
      <div class="card"><h3 class="card__title" style="font-size:1.05rem">1. Eingegangen</h3>
        <p class="card__text" style="font-size:.92rem">Deine Frage ist bei uns und wird gesichtet.</p></div>
      <div class="card"><h3 class="card__title" style="font-size:1.05rem">2. In Bearbeitung</h3>
        <p class="card__text" style="font-size:.92rem">Wir recherchieren und prüfen die Quellen.</p></div>
      <div class="card"><h3 class="card__title" style="font-size:1.05rem">3. Beantwortet</h3>
        <p class="card__text" style="font-size:.92rem">Du siehst die Antwort in
        <a href="{u(lang,'konto.html')}">deinem Konto</a> und erhältst eine E-Mail.</p></div>
    </div>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="container">
    <div class="section-head"><p class="eyebrow">Öffentliches Archiv</p>
      <h2>Bereits beantwortete Fragen</h2>
      <p class="lead" style="margin-top:1rem">Anonymisiert veröffentlicht, weil sie für viele nützlich sind.</p></div>
    <div class="filters" data-filters>{''.join(chips)}</div>
    <div data-article-list>{items}</div>
    <p class="search-empty" data-empty hidden>{t(lang,'search.empty')}</p>
  </div>
</section>'''


# ------------------------------------------------------------------ Kontakt
def contact(lang):
    return f'''
<section class="section" style="padding-bottom:0">
  <div class="container-narrow">
    {crumbs(lang, [(t(lang,'nav.home'), u(lang)), (t(lang,'nav.contact'), None)])}
    <p class="eyebrow">{t(lang,'nav.contact')}</p>
    <h1>Schreib uns</h1>
    <p class="lead" style="margin-top:1.5rem">Für Anliegen rund um Hidayah, die Kurse oder eine
    Zusammenarbeit. <strong>Religiöse Fragen</strong> stelle bitte über das dafür vorgesehene
    Formular &ndash; dort werden sie strukturiert bearbeitet und beantwortet.</p>
    <div class="btn-row"><a class="link-arrow" href="{u(lang,'frage-antwort.html')}">Islamische Frage stellen</a></div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="grid grid--2" style="align-items:start">
      <div class="card" style="padding:clamp(1.6rem,1.2rem + 1.6vw,2.4rem)">
        <form data-form="kontakt" novalidate>
          <div class="form-grid">
            <div class="field"><label for="k-name">{t(lang,'f.name')}</label>
              <input class="input" id="k-name" name="name" type="text" required autocomplete="name"></div>
            <div class="field"><label for="k-mail">{t(lang,'f.email')}</label>
              <input class="input" id="k-mail" name="email" type="email" required autocomplete="email"></div>
          </div>
          <div class="field"><label for="k-subj">{t(lang,'f.subject')}</label>
            <input class="input" id="k-subj" name="betreff" type="text" required></div>
          <div class="field"><label for="k-msg">{t(lang,'f.message')}</label>
            <textarea class="textarea" id="k-msg" name="nachricht" required></textarea></div>
          <div class="field"><label class="check"><input type="checkbox" required>
            <span>{t(lang,'f.consent')}</span></label></div>
          <button class="btn btn--primary" type="submit">{t(lang,'f.send')}</button>
          <p class="form-status" data-status></p>
        </form>
      </div>

      <div class="stack">
        <div class="card">
          <h3 class="card__title">Direkt erreichbar</h3>
          <p class="card__text">E-Mail: <a href="mailto:{SITE['email']}" style="color:var(--moon)">{SITE['email']}</a></p>
          <p class="card__text" style="margin-top:.6rem">Telefon: <span class="dim">wird ergänzt, sobald verfügbar</span></p>
        </div>
        <div class="card">
          <h3 class="card__title">{t(lang,'foot.social')}</h3>
          <p class="card__text">Die schnellsten Antworten und alle neuen Inhalte findest du hier:</p>
          <div class="social" style="margin-top:1.2rem">
            <a href="{SITE['instagram']}" rel="noopener" target="_blank" aria-label="Instagram">{ICON['ig']}</a>
            <a href="{SITE['youtube']}" rel="noopener" target="_blank" aria-label="YouTube">{ICON['yt']}</a>
            <a href="{SITE['x']}" rel="noopener" target="_blank" aria-label="X">{ICON['x']}</a>
          </div>
        </div>
        <div class="notice">{ICON['info']}
          <div>Fragen zu Fiqh, ʿAqīdah oder persönlichen Angelegenheiten bitte <strong>nicht</strong>
          über dieses Formular &ndash; nutze dafür
          <a href="{u(lang,'frage-antwort.html')}" style="color:var(--moon)">Frage &amp; Antwort</a>.</div>
        </div>
      </div>
    </div>
  </div>
</section>'''


# ------------------------------------------------------------------ Konto
def account(lang):
    tabs = [("kurse", "Meine Kurse"), ("fortschritt", "Mein Fortschritt"), ("fragen", "Meine Fragen"),
            ("gespeichert", "Gespeicherte Inhalte"), ("zuletzt", "Zuletzt angesehen"),
            ("bestellungen", "Bestellungen"), ("newsletter", "Newsletter"), ("profil", "Profil &amp; Sicherheit")]
    nav = "".join('<button type="button" role="tab" data-acc-tab="%s" aria-selected="%s">%s</button>'
                  % (k, "true" if i == 0 else "false", n) for i, (k, n) in enumerate(tabs))
    return f'''
<section class="section">
  <div class="container">
    {crumbs(lang, [(t(lang,'nav.home'), u(lang)), (t(lang,'nav.account'), None)])}
    <p class="eyebrow">{t(lang,'nav.account')}</p>
    <h1 style="margin-bottom:2.5rem">Mein Konto</h1>

    <div class="notice" style="margin-bottom:2.5rem">{ICON['info']}
      <div><strong>Vorschau.</strong> Anmeldung, Käufe und Fortschritt benötigen einen Server.
      Diese Seite zeigt bereits den vollständigen Aufbau des Kontobereichs &ndash; die Daten unten sind
      Beispielwerte.</div></div>

    <div class="account-grid">
      <div class="account-nav" role="tablist" aria-label="{t(lang,'nav.account')}">{nav}</div>
      <div>
        <div class="card" data-acc-panel="kurse">
          <h2 style="font-size:1.3rem;margin-bottom:1.2rem">Meine Kurse</h2>
          <p class="muted" style="margin-bottom:1.5rem">Du siehst hier ausschließlich Kurse, die du
          tatsächlich gekauft hast.</p>
          <div class="grid grid--2">
            <div class="card"><h3 class="card__title" style="font-size:1.05rem">Arabische Grammatik</h3>
              <p class="dim" style="font-size:.85rem">Fortschritt: 7 von 18 Lektionen</p>
              <div class="progress"><i style="width:39%"></i></div>
              <div class="card__foot"><a class="btn btn--primary btn--sm" href="#">Weiterlernen</a></div></div>
            <div class="card"><h3 class="card__title" style="font-size:1.05rem">Tajwīd</h3>
              <p class="dim" style="font-size:.85rem">Fortschritt: 12 von 12 Lektionen</p>
              <div class="progress"><i style="width:100%"></i></div>
              <div class="card__foot"><a class="btn btn--ghost btn--sm" href="#">Wiederholen</a></div></div>
          </div>
        </div>
        <div class="card" data-acc-panel="fragen" hidden>
          <h2 style="font-size:1.3rem;margin-bottom:1.2rem">Meine Fragen</h2>
          <div class="stack">
            <div style="display:flex;gap:1rem;align-items:center;justify-content:space-between;
                        padding:1rem;border:1px solid var(--line);border-radius:12px">
              <span>Frage zu Ṭahārah</span><span class="tag">Beantwortet</span></div>
            <div style="display:flex;gap:1rem;align-items:center;justify-content:space-between;
                        padding:1rem;border:1px solid var(--line);border-radius:12px">
              <span>Frage zum Ratenkauf</span><span class="tag">In Bearbeitung</span></div>
            <div style="display:flex;gap:1rem;align-items:center;justify-content:space-between;
                        padding:1rem;border:1px solid var(--line);border-radius:12px">
              <span>Frage zur Ṣalāh im Schichtdienst</span><span class="tag">Eingegangen</span></div>
          </div>
        </div>
        <div class="card" data-acc-panel="fortschritt" hidden><h2 style="font-size:1.3rem">Mein Fortschritt</h2>
          <p class="muted" style="margin-top:1rem">Dein Stand innerhalb aller gekauften Kurse.</p></div>
        <div class="card" data-acc-panel="gespeichert" hidden><h2 style="font-size:1.3rem">Gespeicherte Inhalte</h2>
          <p class="muted" style="margin-top:1rem">Artikel, die du über &bdquo;Speichern&ldquo; markiert hast.</p></div>
        <div class="card" data-acc-panel="zuletzt" hidden><h2 style="font-size:1.3rem">Zuletzt angesehen</h2>
          <p class="muted" style="margin-top:1rem">Zuletzt gelesene Artikel und geöffnete Lektionen.</p></div>
        <div class="card" data-acc-panel="bestellungen" hidden><h2 style="font-size:1.3rem">Bestellungen</h2>
          <p class="muted" style="margin-top:1rem">Käufe und Rechnungen zum Herunterladen.</p></div>
        <div class="card" data-acc-panel="newsletter" hidden><h2 style="font-size:1.3rem">Newsletter</h2>
          <p class="muted" style="margin-top:1rem">Benachrichtigungen bei neuen Artikeln, Videos und Kursen.</p></div>
        <div class="card" data-acc-panel="profil" hidden><h2 style="font-size:1.3rem">Profil &amp; Sicherheit</h2>
          <p class="muted" style="margin-top:1rem">E-Mail, Passwort und Kontoeinstellungen.</p></div>
      </div>
    </div>
  </div>
</section>'''


# ------------------------------------------------------------------ Rechtstexte
def legal(lang, kind):
    titles = {"impressum": "Impressum", "datenschutz": "Datenschutzerklärung",
              "agb": "Allgemeine Geschäftsbedingungen", "widerruf": "Widerrufsbelehrung"}
    warn = f'''<div class="notice" style="margin-bottom:2.5rem">{ICON['info']}
      <div><strong>Diese Seite ist eine Vorlage.</strong> Vor der Veröffentlichung muss sie an die
      tatsächlich verwendete technische und geschäftliche Struktur angepasst und rechtlich geprüft
      werden &ndash; insbesondere zu Anbieterkennzeichnung, Zahlungsdienstleistern, Hosting,
      Nutzerkonten und digitalen Inhalten.</div></div>'''

    bodies = {
"impressum": '''
<h2>Angaben gemäß § 5 DDG</h2>
<p>Hidayah<br>[Straße und Hausnummer]<br>[PLZ Ort]<br>Deutschland</p>
<h2>Vertreten durch</h2><p>[Vor- und Nachname der verantwortlichen Person]</p>
<h2>Kontakt</h2><p>E-Mail: salam@hidayah.de<br>Telefon: [wird ergänzt]</p>
<h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
<p>[Vor- und Nachname]<br>[Anschrift]</p>
<h2>Umsatzsteuer-Identifikationsnummer</h2><p>[falls vorhanden]</p>
<h2>Streitschlichtung</h2>
<p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit. Wir sind
nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
Verbraucherschlichtungsstelle teilzunehmen.</p>
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
Art. 6 Abs. 1 lit. f DSGVO &ndash; unser berechtigtes Interesse am sicheren und störungsfreien
Betrieb. [Hosting-Anbieter und Auftragsverarbeitungsvertrag hier eintragen.]</p>
<h2>3. Cookies und lokale Speicherung</h2>
<p>Wir setzen ausschließlich technisch notwendige Speicherung ein: deine Sprachwahl, die Bestätigung
des Cookie-Hinweises und &ndash; sofern du eingeloggt bist &ndash; deine Sitzung. Es findet kein
Tracking, keine Reichweitenmessung durch Dritte und keine Werbung statt.</p>
<h2>4. Kontakt- und Frageformular</h2>
<p>Wenn du uns eine Nachricht oder eine islamische Frage sendest, verarbeiten wir die von dir
angegebenen Daten zur Bearbeitung deiner Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b bzw.
lit. a DSGVO. Eine Veröffentlichung deiner Frage erfolgt ausschließlich <strong>anonymisiert</strong>
und nur, wenn du dem nicht widersprochen hast. Persönliche Angaben werden dabei nicht gezeigt.</p>
<h2>5. Nutzerkonto</h2>
<p>Für den Zugang zu Kursen legen wir ein Konto mit E-Mail-Adresse und Passwort an. Passwörter
werden ausschließlich als Hash gespeichert. Zusätzlich speichern wir gekaufte Kurse, den
Lernfortschritt und gespeicherte Inhalte. Du kannst dein Konto jederzeit löschen lassen.</p>
<h2>6. Zahlungsabwicklung</h2>
<p>Zahlungen werden über externe Zahlungsdienstleister abgewickelt. Deine Zahlungsdaten werden
direkt dort verarbeitet; wir erhalten lediglich die Information über den Zahlungsstatus.
[Zahlungsdienstleister und deren Datenschutzhinweise hier eintragen.]</p>
<h2>7. Newsletter</h2>
<p>Der Newsletter wird im Double-Opt-in-Verfahren versendet. Deine Einwilligung kannst du jederzeit
über den Abmeldelink in jeder E-Mail widerrufen.</p>
<h2>8. Videos</h2>
<p>Kurs- und Vorstellungsvideos werden über einen Videodienst ausgeliefert. Beim Abspielen werden
technische Daten an diesen Dienst übertragen. [Videodienst hier eintragen.]</p>
<h2>9. Deine Rechte</h2>
<p>Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
Datenübertragbarkeit und Widerspruch sowie das Recht, dich bei einer Aufsichtsbehörde zu beschweren.
Wende dich dazu an die im Impressum genannte Adresse.</p>
<h2>10. Speicherdauer</h2>
<p>Wir speichern personenbezogene Daten nur so lange, wie es für die genannten Zwecke erforderlich
ist oder gesetzliche Aufbewahrungsfristen bestehen.</p>''',

"agb": '''
<h2>1. Geltungsbereich</h2>
<p>Diese Bedingungen gelten für alle Verträge über digitale Inhalte, die über diese Website zwischen
Hidayah und Verbrauchern bzw. Unternehmern geschlossen werden.</p>
<h2>2. Vertragsgegenstand</h2>
<p>Gegenstand sind digitale Inhalte, insbesondere Videokurse, begleitende PDF-Materialien und der
Zugang zu diesen Inhalten über ein persönliches Nutzerkonto.</p>
<h2>3. Vertragsschluss</h2>
<p>Die Darstellung der Kurse stellt kein bindendes Angebot dar. Mit dem Abschluss des
Bestellvorgangs gibst du ein verbindliches Angebot ab. Der Vertrag kommt mit unserer
Bestätigung in Textform zustande.</p>
<h2>4. Preise, Währung und Zahlung</h2>
<p>Alle Preise sind Endpreise. Du kannst beim Kauf zwischen den verfügbaren Währungen (Euro oder
Türkische Lira) wählen; der tatsächlich belastete Betrag richtet sich nach dem gewählten
Zahlungsmittel und dem Zahlungsdienstleister.</p>
<h2>5. Nutzungsrechte</h2>
<p>Du erhältst ein einfaches, nicht übertragbares Recht zur persönlichen Nutzung der erworbenen
Inhalte. Die Weitergabe, Vervielfältigung, öffentliche Zugänglichmachung oder Weiterveräußerung
der Inhalte ist nicht gestattet. Zugangsdaten dürfen nicht an Dritte weitergegeben werden.</p>
<h2>6. Verfügbarkeit</h2>
<p>Der Zugang zu gekauften Kursen wird dauerhaft bereitgestellt, mindestens jedoch für die bei
Kaufabschluss angegebene Dauer. Kurzfristige Unterbrechungen aus technischen Gründen bleiben
vorbehalten.</p>
<h2>7. Gewährleistung und Haftung</h2>
<p>Es gelten die gesetzlichen Bestimmungen. Für Schäden haften wir nur bei Vorsatz und grober
Fahrlässigkeit sowie bei Verletzung wesentlicher Vertragspflichten.</p>
<h2>8. Schlussbestimmungen</h2>
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
<h2>Vorzeitiges Erlöschen des Widerrufsrechts bei digitalen Inhalten</h2>
<p>Das Widerrufsrecht erlischt vorzeitig, wenn wir mit der Ausführung begonnen haben, nachdem du
<strong>ausdrücklich zugestimmt</strong> hast, dass wir vor Ablauf der Widerrufsfrist beginnen, und
du deine <strong>Kenntnis vom Verlust des Widerrufsrechts</strong> bestätigt hast. Diese Zustimmung
wird im Bestellvorgang gesondert abgefragt.</p>
<h2>Muster-Widerrufsformular</h2>
<p>An Hidayah, [Anschrift], salam@hidayah.de:<br>
Hiermit widerrufe ich den von mir abgeschlossenen Vertrag über den Kauf der folgenden digitalen
Inhalte: ____________<br>Bestellt am: ____________<br>Name: ____________<br>
Anschrift: ____________<br>Datum: ____________</p>'''}

    return f'''
<section class="section">
  <div class="container-narrow">
    {crumbs(lang, [(t(lang,'nav.home'), u(lang)), (titles[kind], None)])}
    <h1 style="margin-bottom:2rem">{titles[kind]}</h1>
    {warn}
    <div class="prose">{bodies[kind]}</div>
  </div>
</section>'''


def notfound(lang):
    return f'''
<section class="section" style="min-height:56vh;display:grid;place-items:center;text-align:center">
  <div class="container-narrow">
    <p class="eyebrow" style="justify-content:center">404</p>
    <h1>Diese Seite gibt es nicht</h1>
    <p class="lead" style="margin:1.5rem auto 0">Vielleicht wurde sie verschoben oder der Link ist
    nicht mehr aktuell. Nutze die Suche oder starte von vorne.</p>
    <div class="btn-row" style="justify-content:center">
      <a class="btn btn--primary" href="{u(lang)}">{t(lang,'nav.home')}</a>
      <button class="btn btn--ghost" type="button" data-search-open>{t(lang,'nav.search')}</button>
    </div>
  </div>
</section>'''
