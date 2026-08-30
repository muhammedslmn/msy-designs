# -*- coding: utf-8 -*-
"""Layout, Navigation und Uebersetzungen."""
from content import SITE

LANGS = [("de", "Deutsch", "DE"), ("en", "English", "EN"),
         ("tr", "Turkce", "TR"), ("ar", "العربية", "AR")]
RTL = {"ar"}

# ------------------------------------------------------------------ Icons
ICON = {
 "search": '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
 "user": '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/></svg>',
 "globe": '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18"/></svg>',
 "menu": '<svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
 "close": '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
 "book": '<svg viewBox="0 0 24 24"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H19v3H6.5"/></svg>',
 "help": '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.2a2.6 2.6 0 0 1 5 .9c0 1.7-2.5 2.1-2.5 3.9M12 17.2h.01"/></svg>',
 "cap": '<svg viewBox="0 0 24 24"><path d="M12 4l9 4.5-9 4.5-9-4.5z"/><path d="M6.5 10.8V15c0 1.7 2.5 3 5.5 3s5.5-1.3 5.5-3v-4.2"/></svg>',
 "play": '<svg viewBox="0 0 24 24"><path d="M8 5l11 7-11 7z"/></svg>',
 "sun": '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6"/></svg>',
 "arrow": '<svg viewBox="0 0 24 24"><path d="M5 12h13M12 5.5l6.5 6.5-6.5 6.5"/></svg>',
 "info": '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/></svg>',
 "users": '<svg viewBox="0 0 24 24"><circle cx="9" cy="8.4" r="3.2"/><path d="M3.2 19.4a5.8 5.8 0 0 1 11.6 0"/><path d="M16.2 5.6a3 3 0 0 1 0 5.7M17.6 14.2a5.6 5.6 0 0 1 3.2 5.2"/></svg>',
 "bell": '<svg viewBox="0 0 24 24"><path d="M6.4 10a5.6 5.6 0 0 1 11.2 0c0 4.1 1.3 5.4 1.9 6H4.5c.6-.6 1.9-1.9 1.9-6z"/><path d="M10.2 19.3a2 2 0 0 0 3.6 0"/></svg>',
 "mail": '<svg viewBox="0 0 24 24"><rect x="3" y="5.4" width="18" height="13.2" rx="2.4"/><path d="M3.6 7.1l7.3 5.2a2 2 0 0 0 2.2 0l7.3-5.2"/></svg>',
 "ig": '<svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.2a6.6 6.6 0 1 0 0 13.2 6.6 6.6 0 0 0 0-13.2zm0 10.9a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6zm8.4-11.2a1.55 1.55 0 1 1-3.1 0 1.55 1.55 0 0 1 3.1 0z"/></svg>',
 "yt": '<svg viewBox="0 0 24 24"><path d="M23 12s0-3.4-.4-5c-.3-.9-1-1.6-1.9-1.9C19 4.7 12 4.7 12 4.7s-7 0-8.7.4c-.9.3-1.6 1-1.9 1.9C1 8.6 1 12 1 12s0 3.4.4 5c.3.9 1 1.6 1.9 1.9 1.7.4 8.7.4 8.7.4s7 0 8.7-.4c.9-.3 1.6-1 1.9-1.9.4-1.6.4-5 .4-5zM9.8 15.3V8.7l5.7 3.3-5.7 3.3z"/></svg>',
 "x": '<svg viewBox="0 0 24 24"><path d="M17.5 3h3.3l-7.2 8.3L22 21h-6.6l-5.2-6.8L4.3 21H1l7.7-8.8L1.5 3h6.8l4.7 6.2L17.5 3zm-1.2 16h1.8L7.8 4.9H5.9L16.3 19z"/></svg>',
}

# ------------------------------------------------------------------ i18n
T = {
"de": {
 "dir":"ltr",
 "locale":"de_DE",
 "slogan":"Auf der Suche nach Licht in einer Welt voller Dunkelheit.",
 "news.more":"Alle Neuigkeiten",
 "news.none":"Derzeit liegen keine Mitteilungen vor.",
 "news.lead":"Einladungen, Unterrichtsankündigungen und Mitteilungen von Hidayah.",
 "news.h1":"Neuigkeiten",
 "news.eyebrow":"Neuigkeiten",
 "nav.news":"Neuigkeiten",
 "nav.teaching":"Privatunterricht",
 "areas.c.text":"Fertig aufgezeichnete Kurse zum eigenen Tempo – vollständig produziert, bevor sie erscheinen.",
 "areas.c.cta":"Kurse ansehen",
 "areas.t.text":"Einzelunterricht, abgestimmt auf deinen Stand – auf Anfrage, nach Bewerbung und Gespräch.",
 "areas.t.cta":"Zur Bewerbung",
 "areas.t.title":"Privatunterricht",
 "areas.title4":"Vier Wege, hier weiterzukommen",
 "meta.desc":"Islamisches Wissen, das Gute gebieten und das Verwerfliche verbieten, Orientierung auf Grundlage von Quran und Sunnah nach dem Verständnis der Sahabah und der frühen Generationen.",
 "nav.account":"Mein Konto",
 "arch.other":"Weitere Themen",
 "arch.all.title":"Artikel",
 "arch.all.eyebrow":"Alle Beiträge",
 "arch.lead":"Beiträge zu islamischen Themen – erklärende Begriffe, Rechtsfragen, Antworten auf verbreitete Zweifel und alles Weitere, was uns wichtig erscheint.",
 "search.none":"Es sind noch keine Inhalte veröffentlicht. Sobald die ersten Artikel vorliegen, findest du sie hier.",
 "arch.eyebrow2":"Reihen",
 "areas.title2":"Zwei Wege, hier weiterzukommen",
 "areas.title3":"Drei Wege, hier weiterzukommen",
 "base.eyebrow":"Unsere Grundlage",
 "base.title":"Wissen wird von seinen Leuten genommen",
 "base.text":"Unsere Grundlage sind der Quran und die authentische Sunnah des Gesandten Allahs &#65018; nach dem Verständnis der Sahabah und der rechtschaffenen frühen Generationen – as-Salaf as-Salih.",
 "base.cta":"Unsere Grundlage im Detail",
 "arch.eyebrow":"Wissensarchiv",
 "arch.title":"Unsere Reihen",
 "arch.text":"Neben einzelnen Beiträgen erscheinen bei uns wiederkehrende Reihen. Sie ordnen das Wissensarchiv und machen sichtbar, worum es im jeweiligen Beitrag geht.",
 "arch.empty":"Die ersten Beiträge werden derzeit vorbereitet.",
 "teach.eyebrow":"Unterricht",
 "teach.title":"Persönlicher Unterricht bei Hidayah",
 "teach.lead":"Wir unterrichten nicht nach Schema, sondern nach deinem Stand. Deshalb steht am Anfang kein Warenkorb, sondern ein Gespräch.",
 "teach.steps":"So läuft es ab",
 "teach.form":"Bewerbung",
 "teach.price":"Zum Beitrag",
 "teach.pricetext":"Der Unterricht ist kostenpflichtig. Wie hoch der Beitrag ausfällt, hängt von Fach, Umfang und Häufigkeit ab – das legen wir gemeinsam im persönlichen Gespräch fest, nicht vorher. Abgerechnet wird ausschließlich in Euro.",
 "nav.appearance":"Darstellung",
 "theme.mode":"Modus",
 "theme.auto":"Automatisch",
 "theme.light":"Hell",
 "theme.dark":"Dunkel",
 "theme.accent":"Akzentfarbe",
 "acc.smaragd":"Smaragd",
 "acc.tuerkis":"Türkis",
 "acc.indigo":"Indigo",
 "acc.pflaume":"Pflaume",
 "acc.rubin":"Rubin",
 "acc.kupfer":"Kupfer",
 "acc.messing":"Messing",
 "acc.tinte":"Tinte",
 "hero.cta2":"Frage stellen",
 "areas.eyebrow":"Bereiche",
 "nav.home":"Startseite",
 "nav.about":"Über uns",
 "nav.knowledge":"Artikel",
 "nav.qa":"Frage &amp; Antwort",
 "nav.courses":"Kurse",
 "nav.contact":"Kontakt",
 "nav.search":"Suche",
 "nav.language":"Sprache",
 "skip":"Zum Inhalt springen",
 "menu":"Menü",
 "close":"Schließen",
 "hero.sub":"Islamisches Wissen. Das Gute gebieten und das Verwerfliche verbieten. Orientierung.",
 "hero.cta1":"Artikel lesen",
 "hero.scroll":"Mehr",
 "intro.skip":"Überspringen",
 "who.eyebrow":"Wer wir sind",
 "who.title":"Weitergeben, was uns anvertraut wurde",
 "who.p1":"Hidayah entstand aus dem Wunsch, gelerntes islamisches Wissen nicht lediglich für sich selbst zu bewahren, sondern es weiterzugeben und damit – entsprechend den eigenen Möglichkeiten – dem Islam und den Muslimen zu dienen.",
 "who.p2":"Unser Ziel ist es, Menschen zum Tawhid aufzurufen, authentisches islamisches Wissen verständlich zu vermitteln, Missverständnisse aufzuklären und Muslime darin zu stärken, ihren Glauben zu verstehen, zu leben und darin standhaft zu bleiben.",
 "who.cta":"Mehr über Hidayah erfahren",
 "video.eyebrow":"Vorstellung",
 "video.title":"Hidayah in wenigen Minuten",
 "video.text":"Wer wir sind, warum Hidayah entstanden ist und was dich hier erwartet.",
 "video.hint":"Video startet ohne Ton. Sobald unser Vorstellungsvideo fertig ist, erscheint es an dieser Stelle.",
 "areas.title":"Drei Wege, hier weiterzukommen",
 "areas.k.title":"Artikel",
 "areas.k.text":"Islamische Artikel, Erklärungen, Begriffe, Fiqh-Fragen und Antworten auf verbreitete Zweifel.",
 "areas.k.cta":"Artikel entdecken",
 "areas.q.title":"Frage &amp; Antwort",
 "areas.q.text":"Stelle deine Frage und erhalte eine fundierte Antwort auf Grundlage islamischer Quellen.",
 "areas.q.cta":"Frage stellen",
 "areas.c.title":"Kurse",
 "latest.eyebrow":"Wissensarchiv",
 "latest.title":"Neueste Artikel",
 "latest.all":"Alle Artikel ansehen",
 "rec.eyebrow":"Medrese",
 "rec.title":"Empfohlene Kurse",
 "rec.all":"Alle Kurse ansehen",
 "news.title":"Bleib auf dem Laufenden",
 "news.text":"Neue Artikel, Videos, Kurse und Ankündigungen – ohne Pop-ups und ohne Werbung.",
 "news.ph":"Deine E-Mail-Adresse",
 "news.btn":"Anmelden",
 "news.privacy":"Du kannst dich jederzeit wieder abmelden. Es gilt unsere <a href=\"/datenschutz.html\">Datenschutzerklärung</a>.",
 "news.ok":"Bitte bestätige deine Anmeldung über die E-Mail, die wir dir geschickt haben.",
 "foot.content":"Inhalte",
 "foot.hidayah":"Hidayah",
 "foot.legal":"Rechtliches",
 "foot.social":"Social Media",
 "foot.imprint":"Impressum",
 "foot.privacy":"Datenschutzerklärung",
 "foot.terms":"AGB",
 "foot.withdrawal":"Widerruf",
 "foot.cookies":"Cookie-Einstellungen",
 "foot.rights":"Alle Rechte vorbehalten.",
 "search.ph":"Suche nach Artikeln, Kursen, Begriffen …",
 "search.hint":"zum Öffnen",
 "search.empty":"Keine Treffer. Versuche es mit einem anderen Begriff.",
 "search.start":"Tippe, um im Wissensarchiv, in den Kursen und in den Antworten zu suchen.",
 "search.g.articles":"Artikel",
 "search.g.courses":"Kurse",
 "search.g.qa":"Frage &amp; Antwort",
 "search.g.terms":"Begriffe",
 "search.results":"Treffer",
 "search.close":"Schließen",
 "cookie.title":"Cookies",
 "cookie.text":"Wir verwenden nur technisch notwendige Cookies, damit die Seite funktioniert – etwa für deine Sprachwahl. Es findet keine Werbung und kein Tracking statt.",
 "cookie.ok":"Verstanden",
 "cookie.more":"Datenschutz",
 "c.read":"Artikel lesen",
 "c.back":"Zurück",
 "c.min":"Min. Lesezeit",
 "c.by":"Von",
 "c.pub":"Veröffentlicht",
 "c.sources":"Quellen",
 "c.related":"Das könnte dich ebenfalls interessieren",
 "c.share":"Teilen",
 "c.copy":"Link kopieren",
 "c.copied":"Kopiert",
 "c.toc":"Inhalt",
 "c.category":"Kategorie",
 "c.video":"Video ansehen",
 "c.article":"Ausführlichen Artikel lesen",
 "c.all":"Alle",
 "c.langnote":"Die Inhalte werden derzeit auf Deutsch veröffentlicht. Übersetzungen sind in Arbeit.",
 "c.required":"Pflichtfeld",
 "c.optional":"optional",
 "f.name":"Name",
 "f.email":"E-Mail-Adresse",
 "f.subject":"Betreff",
 "f.message":"Deine Nachricht",
 "f.category":"Kategorie",
 "f.send":"Absenden",
 "f.sending":"Wird gesendet …",
 "f.ok":"Jazak Allahu khayran. Deine Nachricht ist bei uns angekommen.",
 "f.err":"Das hat leider nicht geklappt. Schreib uns gerne direkt an ",
 "f.consent":"Ich habe die <a href=\"/datenschutz.html\">Datenschutzerklärung</a> gelesen und bin mit der Verarbeitung meiner Angaben zur Bearbeitung meiner Anfrage einverstanden.",
},
"en": {
 "dir":"ltr",
 "locale":"en_US",
 "slogan":"In search of light in a world full of darkness.",
 "news.more":"All news",
 "news.none":"There are no notices at the moment.",
 "news.lead":"Invitations, teaching announcements and notices from Hidayah.",
 "news.h1":"News",
 "news.eyebrow":"News",
 "nav.news":"News",
 "nav.teaching":"Private tuition",
 "areas.c.text":"Fully recorded courses at your own pace – finished before they are released.",
 "areas.c.cta":"View courses",
 "areas.t.text":"One-to-one teaching matched to your level – on request, after application and conversation.",
 "areas.t.cta":"To the application",
 "areas.t.title":"Private tuition",
 "areas.title4":"Four ways to go further here",
 "meta.desc":"Islamic knowledge, enjoining the good and forbidding the wrong, orientation grounded in the Quran and the Sunnah as understood by the Sahabah and the early generations.",
 "nav.account":"My account",
 "arch.other":"Other topics",
 "arch.all.title":"Articles",
 "arch.all.eyebrow":"All pieces",
 "arch.lead":"Pieces on Islamic topics – terminology, questions of law, answers to widespread doubts and whatever else matters to us.",
 "search.none":"No content has been published yet. As soon as the first articles are available you will find them here.",
 "arch.eyebrow2":"Series",
 "areas.title2":"Two ways to go further here",
 "areas.title3":"Three ways to go further here",
 "base.eyebrow":"Our foundation",
 "base.title":"Knowledge is taken from its people",
 "base.text":"Our foundation is the Quran and the authentic Sunnah of the Messenger of Allah &#65018; as understood by the Sahabah and the righteous early generations – as-Salaf as-Salih.",
 "base.cta":"Our foundation in detail",
 "arch.eyebrow":"Knowledge archive",
 "arch.title":"Our series",
 "arch.text":"Alongside individual pieces we publish recurring series. They organise the archive and make clear what a given piece is about.",
 "arch.empty":"The first pieces are being prepared.",
 "teach.eyebrow":"Teaching",
 "teach.title":"Personal teaching at Hidayah",
 "teach.lead":"We do not teach by template but according to your level. That is why this starts with a conversation, not a shopping cart.",
 "teach.steps":"How it works",
 "teach.form":"Application",
 "teach.price":"About the fee",
 "teach.pricetext":"Teaching is paid. The amount depends on subject, scope and frequency – we settle it together in the personal conversation, not before. Payment is in euro only.",
 "nav.appearance":"Appearance",
 "theme.mode":"Mode",
 "theme.auto":"System",
 "theme.light":"Light",
 "theme.dark":"Dark",
 "theme.accent":"Accent colour",
 "acc.smaragd":"Emerald",
 "acc.tuerkis":"Turquoise",
 "acc.indigo":"Indigo",
 "acc.pflaume":"Plum",
 "acc.rubin":"Ruby",
 "acc.kupfer":"Copper",
 "acc.messing":"Brass",
 "acc.tinte":"Ink",
 "hero.cta2":"Ask a question",
 "areas.eyebrow":"Areas",
 "nav.home":"Home",
 "nav.about":"About us",
 "nav.knowledge":"Articles",
 "nav.qa":"Q &amp; A",
 "nav.courses":"Courses",
 "nav.contact":"Contact",
 "nav.search":"Search",
 "nav.language":"Language",
 "skip":"Skip to content",
 "menu":"Menu",
 "close":"Close",
 "hero.sub":"Islamic knowledge. Enjoining the good and forbidding the wrong. Orientation.",
 "hero.cta1":"Read articles",
 "hero.scroll":"More",
 "intro.skip":"Skip",
 "who.eyebrow":"Who we are",
 "who.title":"Passing on what was entrusted to us",
 "who.p1":"Hidayah grew out of the wish not to keep the Islamic knowledge we learned to ourselves, but to pass it on and thereby serve Islam and the Muslims according to our means.",
 "who.p2":"Our aim is to call people to Tawhid, to convey authentic Islamic knowledge in an understandable way, to clear up misconceptions and to strengthen Muslims in understanding, living and holding firm to their faith.",
 "who.cta":"Learn more about Hidayah",
 "video.eyebrow":"Introduction",
 "video.title":"Hidayah in a few minutes",
 "video.text":"Who we are, why Hidayah came about and what awaits you here.",
 "video.hint":"Video starts muted. Our introduction video will appear here once it is ready.",
 "areas.title":"Three ways to go further here",
 "areas.k.title":"Articles",
 "areas.k.text":"Islamic articles, explanations, terminology, questions of Fiqh and answers to widespread doubts.",
 "areas.k.cta":"Discover articles",
 "areas.q.title":"Q &amp; A",
 "areas.q.text":"Ask your question and receive a well-founded answer based on Islamic sources.",
 "areas.q.cta":"Ask a question",
 "areas.c.title":"Courses",
 "latest.eyebrow":"Knowledge archive",
 "latest.title":"Latest articles",
 "latest.all":"View all articles",
 "rec.eyebrow":"Madrasah",
 "rec.title":"Recommended courses",
 "rec.all":"View all courses",
 "news.title":"Stay up to date",
 "news.text":"New articles, videos, courses and announcements – no pop-ups, no advertising.",
 "news.ph":"Your email address",
 "news.btn":"Subscribe",
 "news.privacy":"You can unsubscribe at any time. Our <a href=\"/en/datenschutz.html\">privacy policy</a> applies.",
 "news.ok":"Please confirm your subscription via the email we sent you.",
 "foot.content":"Content",
 "foot.hidayah":"Hidayah",
 "foot.legal":"Legal",
 "foot.social":"Social media",
 "foot.imprint":"Imprint",
 "foot.privacy":"Privacy policy",
 "foot.terms":"Terms",
 "foot.withdrawal":"Right of withdrawal",
 "foot.cookies":"Cookie settings",
 "foot.rights":"All rights reserved.",
 "search.ph":"Search articles, courses, terms …",
 "search.hint":"to open",
 "search.empty":"No results. Try a different term.",
 "search.start":"Type to search the knowledge archive, the courses and the answers.",
 "search.g.articles":"Articles",
 "search.g.courses":"Courses",
 "search.g.qa":"Q &amp; A",
 "search.g.terms":"Terms",
 "search.results":"results",
 "search.close":"Close",
 "cookie.title":"Cookies",
 "cookie.text":"We only use technically necessary cookies so the site works – for example to remember your language. No advertising, no tracking.",
 "cookie.ok":"Understood",
 "cookie.more":"Privacy",
 "c.read":"Read article",
 "c.back":"Back",
 "c.min":"min read",
 "c.by":"By",
 "c.pub":"Published",
 "c.sources":"Sources",
 "c.related":"You may also find this useful",
 "c.share":"Share",
 "c.copy":"Copy link",
 "c.copied":"Copied",
 "c.toc":"Contents",
 "c.category":"Category",
 "c.video":"Watch video",
 "c.article":"Read the full article",
 "c.all":"All",
 "c.langnote":"Content is currently published in German. Translations are in progress.",
 "f.name":"Name",
 "f.email":"Email address",
 "f.subject":"Subject",
 "f.message":"Your message",
 "f.category":"Category",
 "f.send":"Send",
 "f.sending":"Sending …",
 "f.ok":"Jazak Allahu khayran. Your message has reached us.",
 "f.err":"That did not work. Please write to us directly at ",
 "f.consent":"I have read the <a href=\"/en/datenschutz.html\">privacy policy</a> and consent to my data being processed to handle my request.",
},
"tr": {
 "dir":"ltr",
 "locale":"tr_TR",
 "slogan":"Karanlıkla dolu bir dünyada nûr arayışında.",
 "news.more":"Tüm duyurular",
 "news.none":"Şu anda duyuru bulunmuyor.",
 "news.lead":"Hidayah'tan davetler, ders duyuruları ve bildiriler.",
 "news.h1":"Duyurular",
 "news.eyebrow":"Duyurular",
 "nav.news":"Duyurular",
 "nav.teaching":"Özel Ders",
 "areas.c.text":"Kendi hızında izleyeceğin hazır kayıtlı kurslar – yayınlanmadan önce tamamen çekilmiş.",
 "areas.c.cta":"Kursları gör",
 "areas.t.text":"Seviyene göre birebir ders – talep üzerine, başvuru ve görüşmeden sonra.",
 "areas.t.cta":"Başvuruya",
 "areas.t.title":"Özel Ders",
 "areas.title4":"Burada ilerlemenin dört yolu",
 "meta.desc":"Sahabenin ve ilk nesillerin anlayışı üzere Kurân ve sünnet temelinde İslami ilim, iyiliği emretmek ve kötülüğü yasaklamak ve istikamet.",
 "nav.account":"Hesabım",
 "arch.other":"Diğer konular",
 "arch.all.title":"Makaleler",
 "arch.all.eyebrow":"Tüm yazılar",
 "arch.lead":"İslami konularda yazılar – kavramlar, fıkhi meseleler, yaygın şüphelere cevaplar ve önemli gördüğümüz her konu.",
 "search.none":"Henüz içerik yayınlanmadı. İlk makaleler hazır olduğunda burada bulacaksın.",
 "arch.eyebrow2":"Seriler",
 "areas.title2":"Burada ilerlemenin iki yolu",
 "areas.title3":"Burada ilerlemenin üç yolu",
 "base.eyebrow":"Dayanağımız",
 "base.title":"İlim ehlinden alınır",
 "base.text":"Dayanağımız Kurân ve Allah Resûlü&#65018;nün sahih sünnetidir; sahabenin ve salih ilk nesillerin – Selef-i Salihîn'in – anlayışı üzere.",
 "base.cta":"Dayanağımızın ayrıntısı",
 "arch.eyebrow":"İlim arşivi",
 "arch.title":"Serilerimiz",
 "arch.text":"Tek tek yazıların yanında düzenli seriler yayınlıyoruz. Seriler arşivi düzenler ve yazının neyle ilgili olduğunu açıkça gösterir.",
 "arch.empty":"İlk yazılar hazırlanıyor.",
 "teach.eyebrow":"Ders",
 "teach.title":"Hidayah'ta birebir ders",
 "teach.lead":"Kalıba göre değil, senin seviyene göre ders veriyoruz. Bu yüzden başlangıçta sepet değil, bir görüşme var.",
 "teach.steps":"Nasıl işliyor",
 "teach.form":"Başvuru",
 "teach.price":"Ücret hakkında",
 "teach.pricetext":"Ders ücretlidir. Tutar; ders, kapsam ve sıklığa göre değişir – bunu önceden değil, görüşmede birlikte belirleriz. Ödeme yalnızca Euro olarak alınır.",
 "nav.appearance":"Görünüm",
 "theme.mode":"Mod",
 "theme.auto":"Otomatik",
 "theme.light":"Açık",
 "theme.dark":"Koyu",
 "theme.accent":"Vurgu rengi",
 "acc.smaragd":"Zümrüt",
 "acc.tuerkis":"Turkuaz",
 "acc.indigo":"Çivit",
 "acc.pflaume":"Erik",
 "acc.rubin":"Yakut",
 "acc.kupfer":"Bakır",
 "acc.messing":"Pirinç",
 "acc.tinte":"Mürekkep",
 "hero.cta2":"Soru sor",
 "areas.eyebrow":"Bölümler",
 "nav.home":"Ana sayfa",
 "nav.about":"Hakkımızda",
 "nav.knowledge":"Makaleler",
 "nav.qa":"Soru &amp; Cevap",
 "nav.courses":"Kurslar",
 "nav.contact":"İletişim",
 "nav.search":"Ara",
 "nav.language":"Dil",
 "skip":"İçeriğe geç",
 "menu":"Menü",
 "close":"Kapat",
 "hero.sub":"İslami ilim. İyiliği emretmek ve kötülüğü yasaklamak. İstikamet.",
 "hero.cta1":"Makaleleri oku",
 "hero.scroll":"Devam",
 "intro.skip":"Geç",
 "who.eyebrow":"Biz kimiz",
 "who.title":"Bize emanet edileni aktarmak",
 "who.p1":"Hidayah, öğrenilen İslami ilmi sadece kendimize saklamayıp aktarma ve böylece imkânlarımız ölçüsünde İslam'a ve Müslümanlara hizmet etme arzusundan doğdu.",
 "who.p2":"Amacımız insanları tevhide çağırmak, sahih İslami ilmi anlaşılır şekilde aktarmak, yanlış anlaşılmaları gidermek ve Müslümanları inançlarını anlama, yaşama ve onda sebat etme konusunda güçlendirmektir.",
 "who.cta":"Hidayah hakkında daha fazlası",
 "video.eyebrow":"Tanıtım",
 "video.title":"Birkaç dakikada Hidayah",
 "video.text":"Kim olduğumuz, Hidayah'ın neden doğduğu ve burada seni ne beklediği.",
 "video.hint":"Video sessiz başlar. Tanıtım videomuz hazır olduğunda burada görünecek.",
 "areas.title":"Burada ilerlemenin üç yolu",
 "areas.k.title":"Makaleler",
 "areas.k.text":"İslami makaleler, açıklamalar, kavramlar, fıkhi meseleler ve yaygın şüphelere cevaplar.",
 "areas.k.cta":"Makaleleri keşfet",
 "areas.q.title":"Soru &amp; Cevap",
 "areas.q.text":"Sorunu sor, İslami kaynaklara dayalı sağlam bir cevap al.",
 "areas.q.cta":"Soru sor",
 "areas.c.title":"Kurslar",
 "latest.eyebrow":"İlim arşivi",
 "latest.title":"Yeni makaleler",
 "latest.all":"Tüm makaleler",
 "rec.eyebrow":"Medrese",
 "rec.title":"Önerilen dersler",
 "rec.all":"Tüm dersler",
 "news.title":"Haberdar ol",
 "news.text":"Yeni makaleler, videolar, dersler ve duyurular – pop-up yok, reklam yok.",
 "news.ph":"E-posta adresin",
 "news.btn":"Kaydol",
 "news.privacy":"İstediğin zaman çıkabilirsin. <a href=\"/tr/datenschutz.html\">Gizlilik politikamız</a> geçerlidir.",
 "news.ok":"Lütfen gönderdiğimiz e-posta üzerinden kaydını onayla.",
 "foot.content":"İçerik",
 "foot.hidayah":"Hidayah",
 "foot.legal":"Hukuki",
 "foot.social":"Sosyal medya",
 "foot.imprint":"Künye",
 "foot.privacy":"Gizlilik politikası",
 "foot.terms":"Şartlar",
 "foot.withdrawal":"Cayma hakkı",
 "foot.cookies":"Çerez ayarları",
 "foot.rights":"Tüm hakları saklıdır.",
 "search.ph":"Makale, ders, kavram ara …",
 "search.hint":"açmak için",
 "search.empty":"Sonuç yok. Başka bir kelime dene.",
 "search.start":"İlim arşivinde, derslerde ve cevaplarda aramak için yaz.",
 "search.g.articles":"Makaleler",
 "search.g.courses":"Dersler",
 "search.g.qa":"Soru &amp; Cevap",
 "search.g.terms":"Kavramlar",
 "search.results":"sonuç",
 "search.close":"Kapat",
 "cookie.title":"Çerezler",
 "cookie.text":"Sadece sitenin çalışması için teknik olarak gerekli çerezleri kullanıyoruz – örneğin dil tercihin için. Reklam ve takip yok.",
 "cookie.ok":"Anladım",
 "cookie.more":"Gizlilik",
 "c.read":"Makaleyi oku",
 "c.back":"Geri",
 "c.min":"dk okuma",
 "c.by":"Yazan",
 "c.pub":"Yayın",
 "c.sources":"Kaynaklar",
 "c.related":"Bunlar da ilgini çekebilir",
 "c.share":"Paylaş",
 "c.copy":"Bağlantıyı kopyala",
 "c.copied":"Kopyalandı",
 "c.toc":"İçindekiler",
 "c.category":"Kategori",
 "c.video":"Videoyu izle",
 "c.article":"Ayrıntılı makaleyi oku",
 "c.all":"Tümü",
 "c.langnote":"İçerikler şu anda Almanca yayınlanıyor. Çeviriler devam ediyor.",
 "f.name":"İsim",
 "f.email":"E-posta adresi",
 "f.subject":"Konu",
 "f.message":"Mesajın",
 "f.category":"Kategori",
 "f.send":"Gönder",
 "f.sending":"Gönderiliyor …",
 "f.ok":"Cezâkallâhu hayran. Mesajın bize ulaştı.",
 "f.err":"Maalesef olmadı. Bize doğrudan yazabilirsin: ",
 "f.consent":"<a href=\"/tr/datenschutz.html\">Gizlilik politikasını</a> okudum ve talebimin işlenmesi için verilerimin işlenmesini kabul ediyorum.",
},
"ar": {
 "dir":"rtl",
 "locale":"ar_AR",
 "slogan":"في بحثٍ عن النور في عالمٍ يملؤه الظلام.",
 "news.more":"كل الأخبار",
 "news.none":"لا توجد إعلانات حاليًا.",
 "news.lead":"دعوات وإعلانات الدروس وبيانات من هداية.",
 "news.h1":"الأخبار",
 "news.eyebrow":"الأخبار",
 "nav.news":"الأخبار",
 "nav.teaching":"دروس خاصة",
 "areas.c.text":"دورات مسجَّلة كاملة تتابعها بوتيرتك — تُنتَج بالكامل قبل نشرها.",
 "areas.c.cta":"شاهد الدورات",
 "areas.t.text":"دروس فردية حسب مستواك — عند الطلب، بعد التقديم والمقابلة.",
 "areas.t.cta":"إلى التقديم",
 "areas.t.title":"دروس خاصة",
 "areas.title4":"أربعة طرق للمضي قدمًا",
 "meta.desc":"علم شرعي وأمر بالمعروف ونهي عن المنكر وهداية على أساس القرآن والسنة بفهم الصحابة والقرون الأولى.",
 "nav.account":"حسابي",
 "arch.other":"موضوعات أخرى",
 "arch.all.title":"المقالات",
 "arch.all.eyebrow":"كل المقالات",
 "arch.lead":"مقالات في موضوعات شرعية — مصطلحات، مسائل فقهية، ردود على الشبهات المنتشرة، وكل ما نراه مهمًّا.",
 "search.none":"لم يُنشر أي محتوى بعد. ستجد أولى المقالات هنا فور توفّرها.",
 "arch.eyebrow2":"السلاسل",
 "areas.title2":"طريقان للمضي قدمًا",
 "areas.title3":"ثلاثة طرق للمضي قدمًا",
 "base.eyebrow":"أساسنا",
 "base.title":"العلم يؤخذ عن أهله",
 "base.text":"أساسنا القرآن والسنة الصحيحة لرسول الله &#65018; بفهم الصحابة والقرون الأولى الصالحة — السلف الصالح.",
 "base.cta":"تفصيل أساسنا",
 "arch.eyebrow":"أرشيف العلم",
 "arch.title":"سلاسلنا",
 "arch.text":"إلى جانب المقالات المفردة ننشر سلاسل متجدّدة. تنظّم السلاسل الأرشيف وتوضّح موضوع كل مقال.",
 "arch.empty":"يجري إعداد أولى المقالات.",
 "teach.eyebrow":"الدروس",
 "teach.title":"دروس فردية مع هداية",
 "teach.lead":"لا نُدرّس بقالب جاهز بل حسب مستواك. لذلك تبدأ الرحلة بمقابلة لا بسلة شراء.",
 "teach.steps":"كيف تسير",
 "teach.form":"التقديم",
 "teach.price":"عن الأجر",
 "teach.pricetext":"الدروس بأجر. ويتحدد المبلغ حسب المادة والحجم والوتيرة — نتفق عليه معًا في المقابلة الشخصية لا قبلها. والدفع باليورو فقط.",
 "nav.appearance":"المظهر",
 "theme.mode":"الوضع",
 "theme.auto":"تلقائي",
 "theme.light":"فاتح",
 "theme.dark":"داكن",
 "theme.accent":"لون التمييز",
 "acc.smaragd":"زمردي",
 "acc.tuerkis":"فيروزي",
 "acc.indigo":"نيلي",
 "acc.pflaume":"برقوقي",
 "acc.rubin":"ياقوتي",
 "acc.kupfer":"نحاسي أحمر",
 "acc.messing":"نحاسي",
 "acc.tinte":"حبري",
 "hero.cta2":"اطرح سؤالًا",
 "areas.eyebrow":"الأقسام",
 "nav.home":"الرئيسية",
 "nav.about":"من نحن",
 "nav.knowledge":"المقالات",
 "nav.qa":"سؤال وجواب",
 "nav.courses":"الدورات",
 "nav.contact":"تواصل",
 "nav.search":"بحث",
 "nav.language":"اللغة",
 "skip":"تخطَّ إلى المحتوى",
 "menu":"القائمة",
 "close":"إغلاق",
 "hero.sub":"علم شرعي. أمر بالمعروف ونهي عن المنكر. هداية.",
 "hero.cta1":"اقرأ المقالات",
 "hero.scroll":"المزيد",
 "intro.skip":"تخطّي",
 "who.eyebrow":"من نحن",
 "who.title":"نبلّغ ما اؤتمنّا عليه",
 "who.p1":"نشأت هداية من الرغبة في ألّا نحتفظ بما تعلّمناه من العلم الشرعي لأنفسنا، بل أن نبلّغه ونخدم به الإسلام والمسلمين قدر استطاعتنا.",
 "who.p2":"هدفنا دعوة الناس إلى التوحيد، وتبليغ العلم الشرعي الصحيح بأسلوب مفهوم، وإزالة الشبهات، وتثبيت المسلمين على فهم دينهم والعمل به والثبات عليه.",
 "who.cta":"اعرف المزيد عن هداية",
 "video.eyebrow":"تعريف",
 "video.title":"هداية في دقائق",
 "video.text":"من نحن، ولماذا نشأت هداية، وماذا ينتظرك هنا.",
 "video.hint":"يبدأ الفيديو بلا صوت. سيظهر الفيديو التعريفي هنا فور جاهزيته.",
 "areas.title":"ثلاثة طرق للمضي قدمًا",
 "areas.k.title":"المقالات",
 "areas.k.text":"مقالات وشروح ومصطلحات ومسائل فقهية وردود على الشبهات المنتشرة.",
 "areas.k.cta":"تصفّح المقالات",
 "areas.q.title":"سؤال وجواب",
 "areas.q.text":"اطرح سؤالك واحصل على جواب مؤصَّل من المصادر الشرعية.",
 "areas.q.cta":"اطرح سؤالًا",
 "areas.c.title":"الدورات",
 "latest.eyebrow":"أرشيف العلم",
 "latest.title":"أحدث المقالات",
 "latest.all":"كل المقالات",
 "rec.eyebrow":"المدرسة",
 "rec.title":"دورات مختارة",
 "rec.all":"كل الدورات",
 "news.title":"ابقَ على اطّلاع",
 "news.text":"مقالات وفيديوهات ودورات وإعلانات جديدة — بلا نوافذ منبثقة وبلا إعلانات.",
 "news.ph":"بريدك الإلكتروني",
 "news.btn":"اشترك",
 "news.privacy":"يمكنك إلغاء الاشتراك في أي وقت. تسري <a href=\"/ar/datenschutz.html\">سياسة الخصوصية</a>.",
 "news.ok":"يرجى تأكيد اشتراكك عبر الرسالة التي أرسلناها إليك.",
 "foot.content":"المحتوى",
 "foot.hidayah":"هداية",
 "foot.legal":"قانوني",
 "foot.social":"التواصل الاجتماعي",
 "foot.imprint":"بيانات الناشر",
 "foot.privacy":"سياسة الخصوصية",
 "foot.terms":"الشروط",
 "foot.withdrawal":"حق الانسحاب",
 "foot.cookies":"إعدادات الكوكيز",
 "foot.rights":"جميع الحقوق محفوظة.",
 "search.ph":"ابحث في المقالات والدورات والمصطلحات …",
 "search.hint":"للفتح",
 "search.empty":"لا نتائج. جرّب كلمة أخرى.",
 "search.start":"اكتب للبحث في أرشيف العلم والدورات والأجوبة.",
 "search.g.articles":"المقالات",
 "search.g.courses":"الدورات",
 "search.g.qa":"سؤال وجواب",
 "search.g.terms":"المصطلحات",
 "search.results":"نتيجة",
 "search.close":"إغلاق",
 "cookie.title":"ملفات تعريف الارتباط",
 "cookie.text":"نستخدم فقط ما هو ضروري تقنيًا لعمل الموقع — مثل حفظ اختيارك للغة. بلا إعلانات وبلا تتبّع.",
 "cookie.ok":"فهمت",
 "cookie.more":"الخصوصية",
 "c.read":"اقرأ المقال",
 "c.back":"رجوع",
 "c.min":"دقيقة قراءة",
 "c.by":"بقلم",
 "c.pub":"نُشر",
 "c.sources":"المصادر",
 "c.related":"قد يهمّك أيضًا",
 "c.share":"مشاركة",
 "c.copy":"نسخ الرابط",
 "c.copied":"تم النسخ",
 "c.toc":"المحتويات",
 "c.category":"القسم",
 "c.video":"شاهد الفيديو",
 "c.article":"اقرأ المقال كاملًا",
 "c.all":"الكل",
 "c.langnote":"تُنشر المحتويات حاليًا بالألمانية. الترجمات قيد الإعداد.",
 "f.name":"الاسم",
 "f.email":"البريد الإلكتروني",
 "f.subject":"الموضوع",
 "f.message":"رسالتك",
 "f.category":"القسم",
 "f.send":"إرسال",
 "f.sending":"جارٍ الإرسال …",
 "f.ok":"جزاك الله خيرًا. وصلتنا رسالتك.",
 "f.err":"لم ينجح الإرسال. راسلنا مباشرة على ",
 "f.consent":"قرأتُ <a href=\"/ar/datenschutz.html\">سياسة الخصوصية</a> وأوافق على معالجة بياناتي لمعالجة طلبي.",
},
}


def t(lang, key):
    return T.get(lang, {}).get(key) or T["de"].get(key, key)


def u(lang, path=""):
    """Wurzelrelative Adresse fuer eine Sprache."""
    base = "/" if lang == "de" else "/%s/" % lang
    return base + path.lstrip("/")


# ---------------------------------------------------------------- Navigation
# Die Hauptbereiche der Plattform stehen fest. Einzelne Beitraege darin
# erscheinen erst, wenn sie eingetragen sind.
NAV = [("nav.home", ""),
       ("nav.about", "ueber-uns.html"),
       ("nav.knowledge", "artikel.html"),
       ("nav.qa", "frage-antwort.html"),
       ("nav.teaching", "unterricht.html"),
       ("nav.courses", "kurse.html"),
       ("nav.news", "neuigkeiten.html"),
       ("nav.contact", "kontakt.html")]


def nav_items(lang):
    return NAV


def has_search_content():
    """Suche nur anbieten, wenn es etwas zu finden gibt."""
    from content import ARTICLES, COURSES, QA_PUBLIC
    return bool(ARTICLES or COURSES or QA_PUBLIC)


# Zeichen der Bereiche auf der Startseite
NAV_ICON = {"nav.about": "users", "nav.knowledge": "book", "nav.qa": "help",
            "nav.teaching": "cap", "nav.courses": "play", "nav.news": "bell",
            "nav.contact": "mail", "nav.home": "info"}

ACCENTS = ["smaragd", "tuerkis", "indigo", "pflaume",
           "rubin", "kupfer", "messing", "tinte"]


def logo(lang, cls, height, priority=False):
    """Original-Logo, unveraendert. Steht immer auf dunklem Grund."""
    fp = ' fetchpriority="high"' if priority else ' loading="lazy"'
    return ('<img class="%s" src="/assets/img/logo-%d.webp" alt="Hidayah"'
            ' width="%d" height="%d"%s>' % (cls, height, height, round(height * 0.34), fp))


def header(lang, active):
    CUR = ' aria-current="page"'
    items = nav_items(lang)
    links = "".join('<a href="%s"%s>%s</a>' % (u(lang, p), CUR if active == k else "", t(lang, k))
                    for k, p in items)
    langbtns = "".join(
        '<button class="pop__item" type="button" data-lang="%s" role="option" aria-selected="%s">'
        '<span>%s</span><span class="pop__code">%s</span></button>'
        % (c, "true" if c == lang else "false", n, code) for c, n, code in LANGS)
    langpills = "".join(
        '<button type="button" data-lang="%s" aria-selected="%s">%s</button>'
        % (c, "true" if c == lang else "false", code) for c, n, code in LANGS)
    modes = "".join(
        '<button class="pop__item" type="button" data-theme-set="%s" role="option" aria-selected="false">%s</button>'
        % (m, t(lang, "theme." + m)) for m in ("auto", "light", "dark"))
    swatches = "".join(
        '<button class="swatch" type="button" data-accent-set="%s" data-set="%s"'
        ' aria-selected="false" title="%s" aria-label="%s"></button>'
        % (a, a, t(lang, "acc." + a), t(lang, "acc." + a)) for a in ACCENTS)
    cur = next(x for x in LANGS if x[0] == lang)

    return '''<a class="skip-link" href="#main">%(skip)s</a>
<header class="site-header night" id="siteHeader">
  <nav class="nav container" aria-label="%(menu)s">
    <a class="nav__logo" href="%(home)s" aria-label="Hidayah">%(logo)s</a>
    <div class="nav__links">%(links)s</div>
    <div class="nav__tools">
      %(searchbtn)s
      <a class="icon-btn" href="%(account)s" aria-label="%(accountlbl)s">%(i_user)s</a>
      <div class="pop" data-pop aria-expanded="false">
        <button class="icon-btn" type="button" aria-haspopup="true" aria-label="%(appearance)s">%(i_sun)s</button>
        <div class="pop__menu">
          <p class="pop__label">%(mode)s</p>
          <div role="listbox" data-theme-group>%(modes)s</div>
          <div class="pop__sep"></div>
          <p class="pop__label">%(accent)s</p>
          <div class="swatches" role="listbox" data-accent-group>%(swatches)s</div>
        </div>
      </div>
      <div class="pop" data-pop aria-expanded="false">
        <button class="icon-btn icon-btn--wide" type="button" aria-haspopup="true" aria-label="%(language)s">
          %(i_globe)s<span class="pop__code">%(code)s</span>
        </button>
        <div class="pop__menu" role="listbox">%(langbtns)s</div>
      </div>
      <button class="icon-btn nav__burger" type="button" data-drawer-open aria-label="%(menu)s">%(i_menu)s</button>
    </div>
  </nav>
</header>
<div class="drawer night" data-drawer aria-hidden="true">
  <div class="drawer__top">%(logo_s)s
    <button class="icon-btn" type="button" data-drawer-close aria-label="%(close)s">%(i_close)s</button>
  </div>
  <div class="drawer__links">%(links)s</div>
  <div class="drawer__foot">
    <div><p class="pop__label" style="padding-inline:0">%(mode)s</p>
      <div class="pill-row" data-theme-group>%(modes_pill)s</div></div>
    <div><p class="pop__label" style="padding-inline:0">%(language)s</p>
      <div class="pill-row">%(langpills)s</div></div>
  </div>
</div>''' % {
        "skip": t(lang, "skip"), "menu": t(lang, "menu"), "close": t(lang, "close"),
        "home": u(lang), "logo": logo(lang, "", 360, True), "logo_s": logo(lang, "", 360),
        "links": links, "search": t(lang, "nav.search"),
        "account": u(lang, "konto.html"), "accountlbl": t(lang, "nav.account"),
        "i_user": ICON["user"],
        "searchbtn": '<button class="icon-btn" type="button" data-search-open aria-label="%s">%s</button>'
                     % (t(lang, "nav.search"), ICON["search"]),
        "appearance": t(lang, "nav.appearance"), "mode": t(lang, "theme.mode"),
        "accent": t(lang, "theme.accent"), "language": t(lang, "nav.language"),
        "modes": modes,
        "modes_pill": "".join('<button type="button" data-theme-set="%s" aria-selected="false">%s</button>'
                              % (m, t(lang, "theme." + m)) for m in ("auto", "light", "dark")),
        "swatches": swatches, "langbtns": langbtns, "langpills": langpills, "code": cur[2],
        "i_search": ICON["search"], "i_sun": ICON["sun"], "i_globe": ICON["globe"],
        "i_menu": ICON["menu"], "i_close": ICON["close"],
    }


def footer(lang):
    from content import ARTICLES, COURSES
    inhalte = [(t(lang, "nav.knowledge"), u(lang, "artikel.html")),
               (t(lang, "nav.qa"), u(lang, "frage-antwort.html")),
               (t(lang, "nav.teaching"), u(lang, "unterricht.html")),
               (t(lang, "nav.courses"), u(lang, "kurse.html")),
               (t(lang, "nav.news"), u(lang, "neuigkeiten.html"))]
    col_inhalte = "".join('<a href="%s">%s</a>' % (h, n) for n, h in inhalte)

    return '''<footer class="site-footer night">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">%(logo)s<p>%(slogan)s</p></div>
      <div class="footer-col"><h4>%(l_content)s</h4>%(content)s</div>
      <div class="footer-col"><h4>Hidayah</h4>
        <a href="%(about)s">%(l_about)s</a>
        <a href="%(contact)s">%(l_contact)s</a>
        <a href="%(account)s">%(l_account)s</a>
      </div>
      <div class="footer-col"><h4>%(l_legal)s</h4>
        <a href="%(imp)s">%(l_imp)s</a>
        <a href="%(pri)s">%(l_pri)s</a>
        <a href="%(agb)s">%(l_agb)s</a>
        <a href="%(wid)s">%(l_wid)s</a>
        <a href="#" data-cookie-open>%(l_cookies)s</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; <span data-year>2026</span> Hidayah. %(rights)s</span>
      <div class="social">
        <a href="%(ig)s" rel="noopener me" target="_blank" aria-label="Instagram">%(i_ig)s</a>
        <a href="%(yt)s" rel="noopener me" target="_blank" aria-label="YouTube">%(i_yt)s</a>
        <a href="%(x)s" rel="noopener me" target="_blank" aria-label="X">%(i_x)s</a>
      </div>
    </div>
  </div>
</footer>''' % {
        "logo": logo(lang, "", 360), "slogan": t(lang, "slogan"),
        "l_content": t(lang, "foot.content"), "content": col_inhalte,
        "about": u(lang, "ueber-uns.html"), "l_about": t(lang, "nav.about"),
        "contact": u(lang, "kontakt.html"), "l_contact": t(lang, "nav.contact"),
        "account": u(lang, "konto.html"), "l_account": t(lang, "nav.account"),
        "l_legal": t(lang, "foot.legal"),
        "imp": u(lang, "impressum.html"), "l_imp": t(lang, "foot.imprint"),
        "pri": u(lang, "datenschutz.html"), "l_pri": t(lang, "foot.privacy"),
        "agb": u(lang, "agb.html"), "l_agb": t(lang, "foot.terms"),
        "wid": u(lang, "widerruf.html"), "l_wid": t(lang, "foot.withdrawal"),
        "l_cookies": t(lang, "foot.cookies"), "rights": t(lang, "foot.rights"),
        "ig": SITE["instagram"], "yt": SITE["youtube"], "x": SITE["x"],
        "i_ig": ICON["ig"], "i_yt": ICON["yt"], "i_x": ICON["x"],
    }


def overlays(lang):
    search = '''<div class="search-overlay" data-search aria-hidden="true">
  <div class="search-box">
    <div class="search-input-wrap">%(icon)s
      <input class="search-input" type="search" data-search-input placeholder="%(ph)s"
             aria-label="%(label)s" autocomplete="off" spellcheck="false">
    </div>
    <div class="search-meta"><span data-search-count></span>
      <span><kbd>Esc</kbd> %(close)s</span></div>
    <div class="search-results" data-search-results>
      <p class="search-empty">%(start)s</p>
    </div>
  </div>
</div>''' % {
        "icon": ICON["search"], "ph": t(lang, "search.ph"), "label": t(lang, "nav.search"),
        "close": t(lang, "search.close"), "start": t(lang, "search.start") if has_search_content() else t(lang, "search.none"),
    }
    return search + '''<div class="cookie" data-cookie role="dialog" aria-label="%(ctitle)s">
  <p>%(ctext)s</p>
  <div class="btn-row">
    <button class="btn btn--primary btn--sm" type="button" data-cookie-ok>%(cok)s</button>
    <a class="btn btn--quiet btn--sm" href="%(privacy)s">%(cmore)s</a>
  </div>
</div>''' % {
        "icon": ICON["search"], "ph": t(lang, "search.ph"), "label": t(lang, "nav.search"),
        "close": t(lang, "search.close"), "start": t(lang, "search.start") if has_search_content() else t(lang, "search.none"),
        "ctitle": t(lang, "cookie.title"), "ctext": t(lang, "cookie.text"),
        "cok": t(lang, "cookie.ok"), "cmore": t(lang, "cookie.more"),
        "privacy": u(lang, "datenschutz.html"),
    }


def intro(lang):
    return '''<div class="intro" data-intro>
  <div class="intro__glow"></div>
  <img class="intro__logo" src="/assets/img/logo-besmele.webp"
       alt="Bismillahir-Rahmanir-Rahim — Hidayah" width="1600" height="551" fetchpriority="high">
  <p class="intro__slogan">%s</p>
  <button class="intro__skip" type="button" data-intro-skip>%s</button>
</div>''' % (t(lang, "slogan"), t(lang, "intro.skip"))


def page(*, lang, slug, title, desc, body, active=None, with_intro=False,
         extra_head="", extra_js="", bare=False):
    d = t(lang, "dir")
    full_title = "Hidayah — %s" % t(lang, "slogan") if slug == "" else "%s — Hidayah" % title
    canonical = SITE["url"] + u(lang, slug)
    alts = "".join('<link rel="alternate" hreflang="%s" href="%s%s">' % (c, SITE["url"], u(c, slug))
                   for c, _, _ in LANGS)
    return '''<!doctype html>
<html lang="%(lang)s" dir="%(dir)s">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>%(title)s</title>
<meta name="description" content="%(desc)s">
<meta name="theme-color" content="#FBFAF6" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#090C11" media="(prefers-color-scheme: dark)">
<link rel="canonical" href="%(canonical)s">
%(alts)s<link rel="alternate" hreflang="x-default" href="%(url)s/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Hidayah">
<meta property="og:locale" content="%(locale)s">
<meta property="og:title" content="%(title)s">
<meta property="og:description" content="%(desc)s">
<meta property="og:url" content="%(canonical)s">
<meta property="og:image" content="%(url)s/assets/img/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/img/favicon.ico" sizes="any">
<link rel="icon" href="/assets/img/favicon-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/assets/fonts/clash-display-600.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/satoshi-400.woff2" as="font" type="font/woff2" crossorigin>
<script src="/assets/js/theme.js"></script>
<link rel="stylesheet" href="/assets/css/hidayah.css">
%(extra_head)s</head>
<body data-lang="%(lang)s"%(bodycls)s>
%(intro)s
%(header)s
<main id="main">
%(body)s
</main>
%(footer)s
%(overlays)s
<script src="/assets/js/config.js" defer></script>
<script src="/assets/js/search-index.js" defer></script>
<script src="/assets/js/site.js" defer></script>
%(extra_js)s</body>
</html>''' % {
        "lang": lang, "dir": d, "title": full_title, "desc": desc, "canonical": canonical,
        "bodycls": ' class="is-stage"' if bare else "",
        "alts": alts, "url": SITE["url"], "locale": t(lang, "locale"),
        "extra_head": extra_head, "intro": intro(lang) if with_intro else "",
        "header": header(lang, active), "body": body,
        "footer": "" if bare else footer(lang),
        "overlays": overlays(lang), "extra_js": extra_js,
    }
