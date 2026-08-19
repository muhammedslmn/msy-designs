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
 "ig": '<svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.2a6.6 6.6 0 1 0 0 13.2 6.6 6.6 0 0 0 0-13.2zm0 10.9a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6zm8.4-11.2a1.55 1.55 0 1 1-3.1 0 1.55 1.55 0 0 1 3.1 0z"/></svg>',
 "yt": '<svg viewBox="0 0 24 24"><path d="M23 12s0-3.4-.4-5c-.3-.9-1-1.6-1.9-1.9C19 4.7 12 4.7 12 4.7s-7 0-8.7.4c-.9.3-1.6 1-1.9 1.9C1 8.6 1 12 1 12s0 3.4.4 5c.3.9 1 1.6 1.9 1.9 1.7.4 8.7.4 8.7.4s7 0 8.7-.4c.9-.3 1.6-1 1.9-1.9.4-1.6.4-5 .4-5zM9.8 15.3V8.7l5.7 3.3-5.7 3.3z"/></svg>',
 "x": '<svg viewBox="0 0 24 24"><path d="M17.5 3h3.3l-7.2 8.3L22 21h-6.6l-5.2-6.8L4.3 21H1l7.7-8.8L1.5 3h6.8l4.7 6.2L17.5 3zm-1.2 16h1.8L7.8 4.9H5.9L16.3 19z"/></svg>',
}

# ------------------------------------------------------------------ i18n
T = {
"de": {
 "dir":"ltr","locale":"de_DE",
 "slogan":"Auf der Suche nach Licht in einer Welt voller Dunkelheit.",
 "nav.appearance":"Darstellung",
 "theme.mode":"Modus",
 "theme.auto":"Automatisch",
 "theme.light":"Hell",
 "theme.dark":"Dunkel",
 "theme.accent":"Akzentfarbe",
 "acc.smaragd":"Smaragd",
 "acc.indigo":"Indigo",
 "acc.messing":"Messing",
 "acc.tinte":"Tinte",
 "hero.cta2":"Frage stellen",
 "areas.eyebrow":"Bereiche",
 "nav.home":"Startseite","nav.about":"Über uns","nav.knowledge":"Artikel",
 "nav.qa":"Frage &amp; Antwort","nav.courses":"Kurse","nav.contact":"Kontakt",
 "nav.search":"Suche","nav.account":"Mein Konto","nav.language":"Sprache",
 "skip":"Zum Inhalt springen","menu":"Menü","close":"Schließen",

 "hero.sub":"<strong>Islamisches Wissen. Dawah. Orientierung.</strong><br>Auf Grundlage des Quran und der authentischen Sunnah.",
 "hero.cta1":"Artikel lesen","hero.scroll":"Mehr",
 "intro.skip":"Überspringen",

 "who.eyebrow":"Wer wir sind","who.title":"Weitergeben, was uns anvertraut wurde",
 "who.p1":"Hidayah entstand aus dem Wunsch, gelerntes islamisches Wissen nicht lediglich für sich selbst zu bewahren, sondern es weiterzugeben und damit – entsprechend den eigenen Möglichkeiten – dem Islam und den Muslimen zu dienen.",
 "who.p2":"Unser Ziel ist es, Menschen zum Tawhid aufzurufen, authentisches islamisches Wissen verständlich zu vermitteln, Missverständnisse aufzuklären und Muslime darin zu stärken, ihren Glauben zu verstehen, zu leben und darin standhaft zu bleiben.",
 "who.cta":"Mehr über Hidayah erfahren",

 "video.eyebrow":"Vorstellung","video.title":"Hidayah in wenigen Minuten",
 "video.text":"Wer wir sind, warum Hidayah entstanden ist und was dich hier erwartet.",
 "video.hint":"Video startet ohne Ton. Sobald unser Vorstellungsvideo fertig ist, erscheint es an dieser Stelle.",

 "areas.eyebrow":"Unsere Bereiche","areas.title":"Drei Wege, hier weiterzukommen",
 "areas.k.title":"Artikel","areas.k.text":"Islamische Artikel, Erklärungen, Begriffe, Fiqh-Fragen und Antworten auf verbreitete Zweifel.","areas.k.cta":"Artikel entdecken",
 "areas.q.title":"Frage &amp; Antwort","areas.q.text":"Stelle deine islamische Frage und erhalte eine fundierte Antwort auf Grundlage islamischer Quellen.","areas.q.cta":"Frage stellen",
 "areas.c.title":"Kurse","areas.c.text":"Strukturierte islamische Kurse in deutscher und türkischer Sprache.","areas.c.cta":"Kurse ansehen",

 "latest.eyebrow":"Wissensarchiv","latest.title":"Neueste Artikel","latest.all":"Alle Artikel ansehen",
 "rec.eyebrow":"Medrese","rec.title":"Empfohlene Kurse","rec.all":"Alle Kurse ansehen",

 "news.title":"Bleib auf dem Laufenden","news.text":"Neue Artikel, Videos, Kurse und Ankündigungen – ohne Pop-ups und ohne Werbung.",
 "news.ph":"Deine E-Mail-Adresse","news.btn":"Anmelden",
 "news.privacy":"Du kannst dich jederzeit wieder abmelden. Es gilt unsere <a href=\"/datenschutz.html\">Datenschutzerklärung</a>.",
 "news.ok":"Bitte bestätige deine Anmeldung über die E-Mail, die wir dir geschickt haben.",

 "foot.content":"Inhalte","foot.hidayah":"Hidayah","foot.legal":"Rechtliches","foot.social":"Social Media",
 "foot.imprint":"Impressum","foot.privacy":"Datenschutzerklärung","foot.terms":"AGB",
 "foot.withdrawal":"Widerruf","foot.cookies":"Cookie-Einstellungen","foot.rights":"Alle Rechte vorbehalten.",

 "search.ph":"Suche nach Artikeln, Kursen, Begriffen …","search.hint":"zum Öffnen",
 "search.empty":"Keine Treffer. Versuche es mit einem anderen Begriff.",
 "search.start":"Tippe, um im Wissensarchiv, in den Kursen und in den Antworten zu suchen.",
 "search.g.articles":"Artikel","search.g.courses":"Kurse","search.g.qa":"Frage &amp; Antwort","search.g.terms":"Begriffe",
 "search.results":"Treffer","search.close":"Schließen",

 "cookie.title":"Cookies","cookie.text":"Wir verwenden nur technisch notwendige Cookies, damit die Seite funktioniert – etwa für deine Sprachwahl. Es findet keine Werbung und kein Tracking statt.",
 "cookie.ok":"Verstanden","cookie.more":"Datenschutz",

 "c.read":"Artikel lesen","c.back":"Zurück","c.min":"Min. Lesezeit","c.by":"Von","c.pub":"Veröffentlicht",
 "c.sources":"Quellen","c.related":"Das könnte dich ebenfalls interessieren","c.share":"Teilen",
 "c.copy":"Link kopieren","c.copied":"Kopiert","c.toc":"Inhalt","c.category":"Kategorie",
 "c.video":"Video ansehen","c.article":"Ausführlichen Artikel lesen","c.all":"Alle",
 "c.langnote":"Die Inhalte werden derzeit auf Deutsch veröffentlicht. Übersetzungen sind in Arbeit.",
 "c.required":"Pflichtfeld","c.optional":"optional",

 "f.name":"Name","f.email":"E-Mail-Adresse","f.subject":"Betreff","f.message":"Deine Nachricht",
 "f.category":"Kategorie","f.send":"Absenden","f.sending":"Wird gesendet …",
 "f.ok":"Jazak Allahu khayran. Deine Nachricht ist bei uns angekommen.",
 "f.err":"Das hat leider nicht geklappt. Schreib uns gerne direkt an ",
 "f.consent":"Ich habe die <a href=\"/datenschutz.html\">Datenschutzerklärung</a> gelesen und bin mit der Verarbeitung meiner Angaben zur Bearbeitung meiner Anfrage einverstanden.",
},
"en": {
 "dir":"ltr","locale":"en_US",
 "slogan":"In search of light in a world full of darkness.",
 "nav.appearance":"Appearance",
 "theme.mode":"Mode",
 "theme.auto":"System",
 "theme.light":"Light",
 "theme.dark":"Dark",
 "theme.accent":"Accent colour",
 "acc.smaragd":"Emerald",
 "acc.indigo":"Indigo",
 "acc.messing":"Brass",
 "acc.tinte":"Ink",
 "hero.cta2":"Ask a question",
 "areas.eyebrow":"Areas",
 "nav.home":"Home","nav.about":"About us","nav.knowledge":"Articles",
 "nav.qa":"Q &amp; A","nav.courses":"Courses","nav.contact":"Contact",
 "nav.search":"Search","nav.account":"My account","nav.language":"Language",
 "skip":"Skip to content","menu":"Menu","close":"Close",
 "hero.sub":"<strong>Islamic knowledge. Dawah. Orientation.</strong><br>Grounded in the Quran and the authentic Sunnah.",
 "hero.cta1":"Read articles","hero.scroll":"More",
 "intro.skip":"Skip",
 "who.eyebrow":"Who we are","who.title":"Passing on what was entrusted to us",
 "who.p1":"Hidayah grew out of the wish not to keep the Islamic knowledge we learned to ourselves, but to pass it on and thereby serve Islam and the Muslims according to our means.",
 "who.p2":"Our aim is to call people to Tawhid, to convey authentic Islamic knowledge in an understandable way, to clear up misconceptions and to strengthen Muslims in understanding, living and holding firm to their faith.",
 "who.cta":"Learn more about Hidayah",
 "video.eyebrow":"Introduction","video.title":"Hidayah in a few minutes",
 "video.text":"Who we are, why Hidayah came about and what awaits you here.",
 "video.hint":"Video starts muted. Our introduction video will appear here once it is ready.",
 "areas.eyebrow":"Our areas","areas.title":"Three ways to go further here",
 "areas.k.title":"Articles","areas.k.text":"Islamic articles, explanations, terminology, questions of Fiqh and answers to widespread doubts.","areas.k.cta":"Discover articles",
 "areas.q.title":"Q &amp; A","areas.q.text":"Ask your Islamic question and receive a well-founded answer based on Islamic sources.","areas.q.cta":"Ask a question",
 "areas.c.title":"Courses","areas.c.text":"Structured Islamic courses in German and Turkish.","areas.c.cta":"View courses",
 "latest.eyebrow":"Knowledge archive","latest.title":"Latest articles","latest.all":"View all articles",
 "rec.eyebrow":"Madrasah","rec.title":"Recommended courses","rec.all":"View all courses",
 "news.title":"Stay up to date","news.text":"New articles, videos, courses and announcements – no pop-ups, no advertising.",
 "news.ph":"Your email address","news.btn":"Subscribe",
 "news.privacy":"You can unsubscribe at any time. Our <a href=\"/en/datenschutz.html\">privacy policy</a> applies.",
 "news.ok":"Please confirm your subscription via the email we sent you.",
 "foot.content":"Content","foot.hidayah":"Hidayah","foot.legal":"Legal","foot.social":"Social media",
 "foot.imprint":"Imprint","foot.privacy":"Privacy policy","foot.terms":"Terms",
 "foot.withdrawal":"Right of withdrawal","foot.cookies":"Cookie settings","foot.rights":"All rights reserved.",
 "search.ph":"Search articles, courses, terms …","search.hint":"to open",
 "search.empty":"No results. Try a different term.",
 "search.start":"Type to search the knowledge archive, the courses and the answers.",
 "search.g.articles":"Articles","search.g.courses":"Courses","search.g.qa":"Q &amp; A","search.g.terms":"Terms",
 "search.results":"results","search.close":"Close",
 "cookie.title":"Cookies","cookie.text":"We only use technically necessary cookies so the site works – for example to remember your language. No advertising, no tracking.",
 "cookie.ok":"Understood","cookie.more":"Privacy",
 "c.read":"Read article","c.back":"Back","c.min":"min read","c.by":"By","c.pub":"Published",
 "c.sources":"Sources","c.related":"You may also find this useful","c.share":"Share",
 "c.copy":"Copy link","c.copied":"Copied","c.toc":"Contents","c.category":"Category",
 "c.video":"Watch video","c.article":"Read the full article","c.all":"All",
 "c.langnote":"Content is currently published in German. Translations are in progress.",
 "f.name":"Name","f.email":"Email address","f.subject":"Subject","f.message":"Your message",
 "f.category":"Category","f.send":"Send","f.sending":"Sending …",
 "f.ok":"Jazak Allahu khayran. Your message has reached us.",
 "f.err":"That did not work. Please write to us directly at ",
 "f.consent":"I have read the <a href=\"/en/datenschutz.html\">privacy policy</a> and consent to my data being processed to handle my request.",
},
"tr": {
 "dir":"ltr","locale":"tr_TR",
 "slogan":"Karanlıkla dolu bir dünyada nûr arayışında.",
 "nav.appearance":"Görünüm",
 "theme.mode":"Mod",
 "theme.auto":"Otomatik",
 "theme.light":"Açık",
 "theme.dark":"Koyu",
 "theme.accent":"Vurgu rengi",
 "acc.smaragd":"Zümrüt",
 "acc.indigo":"Çivit",
 "acc.messing":"Pirinç",
 "acc.tinte":"Mürekkep",
 "hero.cta2":"Soru sor",
 "areas.eyebrow":"Bölümler",
 "nav.home":"Ana sayfa","nav.about":"Hakkımızda","nav.knowledge":"Makaleler",
 "nav.qa":"Soru &amp; Cevap","nav.courses":"Dersler","nav.contact":"İletişim",
 "nav.search":"Ara","nav.account":"Hesabım","nav.language":"Dil",
 "skip":"İçeriğe geç","menu":"Menü","close":"Kapat",
 "hero.sub":"<strong>İslami ilim. Davet. İstikamet.</strong><br>Kurân ve sahih sünnet temelinde.",
 "hero.cta1":"Makaleleri oku","hero.scroll":"Devam",
 "intro.skip":"Geç",
 "who.eyebrow":"Biz kimiz","who.title":"Bize emanet edileni aktarmak",
 "who.p1":"Hidayah, öğrenilen İslami ilmi sadece kendimize saklamayıp aktarma ve böylece imkânlarımız ölçüsünde İslam'a ve Müslümanlara hizmet etme arzusundan doğdu.",
 "who.p2":"Amacımız insanları tevhide çağırmak, sahih İslami ilmi anlaşılır şekilde aktarmak, yanlış anlaşılmaları gidermek ve Müslümanları inançlarını anlama, yaşama ve onda sebat etme konusunda güçlendirmektir.",
 "who.cta":"Hidayah hakkında daha fazlası",
 "video.eyebrow":"Tanıtım","video.title":"Birkaç dakikada Hidayah",
 "video.text":"Kim olduğumuz, Hidayah'ın neden doğduğu ve burada seni ne beklediği.",
 "video.hint":"Video sessiz başlar. Tanıtım videomuz hazır olduğunda burada görünecek.",
 "areas.eyebrow":"Bölümlerimiz","areas.title":"Burada ilerlemenin üç yolu",
 "areas.k.title":"Makaleler","areas.k.text":"İslami makaleler, açıklamalar, kavramlar, fıkhi meseleler ve yaygın şüphelere cevaplar.","areas.k.cta":"Makaleleri keşfet",
 "areas.q.title":"Soru &amp; Cevap","areas.q.text":"İslami sorunu sor, İslami kaynaklara dayalı sağlam bir cevap al.","areas.q.cta":"Soru sor",
 "areas.c.title":"Dersler","areas.c.text":"Almanca ve Türkçe yapılandırılmış İslami dersler.","areas.c.cta":"Dersleri gör",
 "latest.eyebrow":"İlim arşivi","latest.title":"Yeni makaleler","latest.all":"Tüm makaleler",
 "rec.eyebrow":"Medrese","rec.title":"Önerilen dersler","rec.all":"Tüm dersler",
 "news.title":"Haberdar ol","news.text":"Yeni makaleler, videolar, dersler ve duyurular – pop-up yok, reklam yok.",
 "news.ph":"E-posta adresin","news.btn":"Kaydol",
 "news.privacy":"İstediğin zaman çıkabilirsin. <a href=\"/tr/datenschutz.html\">Gizlilik politikamız</a> geçerlidir.",
 "news.ok":"Lütfen gönderdiğimiz e-posta üzerinden kaydını onayla.",
 "foot.content":"İçerik","foot.hidayah":"Hidayah","foot.legal":"Hukuki","foot.social":"Sosyal medya",
 "foot.imprint":"Künye","foot.privacy":"Gizlilik politikası","foot.terms":"Şartlar",
 "foot.withdrawal":"Cayma hakkı","foot.cookies":"Çerez ayarları","foot.rights":"Tüm hakları saklıdır.",
 "search.ph":"Makale, ders, kavram ara …","search.hint":"açmak için",
 "search.empty":"Sonuç yok. Başka bir kelime dene.",
 "search.start":"İlim arşivinde, derslerde ve cevaplarda aramak için yaz.",
 "search.g.articles":"Makaleler","search.g.courses":"Dersler","search.g.qa":"Soru &amp; Cevap","search.g.terms":"Kavramlar",
 "search.results":"sonuç","search.close":"Kapat",
 "cookie.title":"Çerezler","cookie.text":"Sadece sitenin çalışması için teknik olarak gerekli çerezleri kullanıyoruz – örneğin dil tercihin için. Reklam ve takip yok.",
 "cookie.ok":"Anladım","cookie.more":"Gizlilik",
 "c.read":"Makaleyi oku","c.back":"Geri","c.min":"dk okuma","c.by":"Yazan","c.pub":"Yayın",
 "c.sources":"Kaynaklar","c.related":"Bunlar da ilgini çekebilir","c.share":"Paylaş",
 "c.copy":"Bağlantıyı kopyala","c.copied":"Kopyalandı","c.toc":"İçindekiler","c.category":"Kategori",
 "c.video":"Videoyu izle","c.article":"Ayrıntılı makaleyi oku","c.all":"Tümü",
 "c.langnote":"İçerikler şu anda Almanca yayınlanıyor. Çeviriler devam ediyor.",
 "f.name":"İsim","f.email":"E-posta adresi","f.subject":"Konu","f.message":"Mesajın",
 "f.category":"Kategori","f.send":"Gönder","f.sending":"Gönderiliyor …",
 "f.ok":"Cezâkallâhu hayran. Mesajın bize ulaştı.",
 "f.err":"Maalesef olmadı. Bize doğrudan yazabilirsin: ",
 "f.consent":"<a href=\"/tr/datenschutz.html\">Gizlilik politikasını</a> okudum ve talebimin işlenmesi için verilerimin işlenmesini kabul ediyorum.",
},
"ar": {
 "dir":"rtl","locale":"ar_AR",
 "slogan":"في بحثٍ عن النور في عالمٍ يملؤه الظلام.",
 "nav.appearance":"المظهر",
 "theme.mode":"الوضع",
 "theme.auto":"تلقائي",
 "theme.light":"فاتح",
 "theme.dark":"داكن",
 "theme.accent":"لون التمييز",
 "acc.smaragd":"زمردي",
 "acc.indigo":"نيلي",
 "acc.messing":"نحاسي",
 "acc.tinte":"حبري",
 "hero.cta2":"اطرح سؤالًا",
 "areas.eyebrow":"الأقسام",
 "nav.home":"الرئيسية","nav.about":"من نحن","nav.knowledge":"المقالات",
 "nav.qa":"سؤال وجواب","nav.courses":"الدورات","nav.contact":"تواصل",
 "nav.search":"بحث","nav.account":"حسابي","nav.language":"اللغة",
 "skip":"تخطَّ إلى المحتوى","menu":"القائمة","close":"إغلاق",
 "hero.sub":"<strong>علم شرعي. دعوة. هداية.</strong><br>على أساس القرآن والسنة الصحيحة.",
 "hero.cta1":"اقرأ المقالات","hero.scroll":"المزيد",
 "intro.skip":"تخطّي",
 "who.eyebrow":"من نحن","who.title":"نبلّغ ما اؤتمنّا عليه",
 "who.p1":"نشأت هداية من الرغبة في ألّا نحتفظ بما تعلّمناه من العلم الشرعي لأنفسنا، بل أن نبلّغه ونخدم به الإسلام والمسلمين قدر استطاعتنا.",
 "who.p2":"هدفنا دعوة الناس إلى التوحيد، وتبليغ العلم الشرعي الصحيح بأسلوب مفهوم، وإزالة الشبهات، وتثبيت المسلمين على فهم دينهم والعمل به والثبات عليه.",
 "who.cta":"اعرف المزيد عن هداية",
 "video.eyebrow":"تعريف","video.title":"هداية في دقائق",
 "video.text":"من نحن، ولماذا نشأت هداية، وماذا ينتظرك هنا.",
 "video.hint":"يبدأ الفيديو بلا صوت. سيظهر الفيديو التعريفي هنا فور جاهزيته.",
 "areas.eyebrow":"أقسامنا","areas.title":"ثلاثة طرق للمضي قدمًا",
 "areas.k.title":"المقالات","areas.k.text":"مقالات وشروح ومصطلحات ومسائل فقهية وردود على الشبهات المنتشرة.","areas.k.cta":"تصفّح المقالات",
 "areas.q.title":"سؤال وجواب","areas.q.text":"اطرح سؤالك الشرعي واحصل على جواب مؤصَّل من المصادر الشرعية.","areas.q.cta":"اطرح سؤالًا",
 "areas.c.title":"الدورات","areas.c.text":"دورات شرعية منظَّمة باللغتين الألمانية والتركية.","areas.c.cta":"شاهد الدورات",
 "latest.eyebrow":"أرشيف العلم","latest.title":"أحدث المقالات","latest.all":"كل المقالات",
 "rec.eyebrow":"المدرسة","rec.title":"دورات مختارة","rec.all":"كل الدورات",
 "news.title":"ابقَ على اطّلاع","news.text":"مقالات وفيديوهات ودورات وإعلانات جديدة — بلا نوافذ منبثقة وبلا إعلانات.",
 "news.ph":"بريدك الإلكتروني","news.btn":"اشترك",
 "news.privacy":"يمكنك إلغاء الاشتراك في أي وقت. تسري <a href=\"/ar/datenschutz.html\">سياسة الخصوصية</a>.",
 "news.ok":"يرجى تأكيد اشتراكك عبر الرسالة التي أرسلناها إليك.",
 "foot.content":"المحتوى","foot.hidayah":"هداية","foot.legal":"قانوني","foot.social":"التواصل الاجتماعي",
 "foot.imprint":"بيانات الناشر","foot.privacy":"سياسة الخصوصية","foot.terms":"الشروط",
 "foot.withdrawal":"حق الانسحاب","foot.cookies":"إعدادات الكوكيز","foot.rights":"جميع الحقوق محفوظة.",
 "search.ph":"ابحث في المقالات والدورات والمصطلحات …","search.hint":"للفتح",
 "search.empty":"لا نتائج. جرّب كلمة أخرى.",
 "search.start":"اكتب للبحث في أرشيف العلم والدورات والأجوبة.",
 "search.g.articles":"المقالات","search.g.courses":"الدورات","search.g.qa":"سؤال وجواب","search.g.terms":"المصطلحات",
 "search.results":"نتيجة","search.close":"إغلاق",
 "cookie.title":"ملفات تعريف الارتباط","cookie.text":"نستخدم فقط ما هو ضروري تقنيًا لعمل الموقع — مثل حفظ اختيارك للغة. بلا إعلانات وبلا تتبّع.",
 "cookie.ok":"فهمت","cookie.more":"الخصوصية",
 "c.read":"اقرأ المقال","c.back":"رجوع","c.min":"دقيقة قراءة","c.by":"بقلم","c.pub":"نُشر",
 "c.sources":"المصادر","c.related":"قد يهمّك أيضًا","c.share":"مشاركة",
 "c.copy":"نسخ الرابط","c.copied":"تم النسخ","c.toc":"المحتويات","c.category":"القسم",
 "c.video":"شاهد الفيديو","c.article":"اقرأ المقال كاملًا","c.all":"الكل",
 "c.langnote":"تُنشر المحتويات حاليًا بالألمانية. الترجمات قيد الإعداد.",
 "f.name":"الاسم","f.email":"البريد الإلكتروني","f.subject":"الموضوع","f.message":"رسالتك",
 "f.category":"القسم","f.send":"إرسال","f.sending":"جارٍ الإرسال …",
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
def nav_items(lang):
    """Nur Bereiche, fuer die es tatsaechlich Inhalte gibt."""
    from content import ARTICLES, COURSES
    items = []
    if ARTICLES:
        items.append(("nav.knowledge", "artikel.html"))
    items.append(("nav.qa", "frage-antwort.html"))     # Dienst, immer erreichbar
    if COURSES:
        items.append(("nav.courses", "kurse.html"))
    items += [("nav.about", "ueber-uns.html"), ("nav.contact", "kontakt.html")]
    return items


ACCENTS = ["smaragd", "indigo", "messing", "tinte"]


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
      <button class="icon-btn" type="button" data-search-open aria-label="%(search)s">%(i_search)s</button>
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
    inhalte = []
    if ARTICLES:
        inhalte.append((t(lang, "nav.knowledge"), u(lang, "artikel.html")))
    inhalte.append((t(lang, "nav.qa"), u(lang, "frage-antwort.html")))
    if COURSES:
        inhalte.append((t(lang, "nav.courses"), u(lang, "kurse.html")))
    col_inhalte = "".join('<a href="%s">%s</a>' % (h, n) for n, h in inhalte)

    return '''<footer class="site-footer night">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">%(logo)s<p>%(slogan)s</p></div>
      <div class="footer-col"><h4>%(l_content)s</h4>%(content)s</div>
      <div class="footer-col"><h4>Hidayah</h4>
        <a href="%(about)s">%(l_about)s</a>
        <a href="%(contact)s">%(l_contact)s</a>
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
    return '''<div class="search-overlay" data-search aria-hidden="true">
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
</div>
<div class="cookie" data-cookie role="dialog" aria-label="%(ctitle)s">
  <p>%(ctext)s</p>
  <div class="btn-row">
    <button class="btn btn--primary btn--sm" type="button" data-cookie-ok>%(cok)s</button>
    <a class="btn btn--quiet btn--sm" href="%(privacy)s">%(cmore)s</a>
  </div>
</div>''' % {
        "icon": ICON["search"], "ph": t(lang, "search.ph"), "label": t(lang, "nav.search"),
        "close": t(lang, "search.close"), "start": t(lang, "search.start"),
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
         extra_head="", extra_js=""):
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
<body data-lang="%(lang)s">
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
        "alts": alts, "url": SITE["url"], "locale": t(lang, "locale"),
        "extra_head": extra_head, "intro": intro(lang) if with_intro else "",
        "header": header(lang, active), "body": body, "footer": footer(lang),
        "overlays": overlays(lang), "extra_js": extra_js,
    }
