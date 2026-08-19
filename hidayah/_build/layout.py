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
 "nav.home":"Startseite","nav.about":"Über uns","nav.knowledge":"Wissen",
 "nav.qa":"Frage &amp; Antwort","nav.courses":"Kurse","nav.contact":"Kontakt",
 "nav.search":"Suche","nav.account":"Mein Konto","nav.language":"Sprache",
 "skip":"Zum Inhalt springen","menu":"Menü","close":"Schließen",

 "hero.sub":"<strong>Islamisches Wissen. Daʿwah. Orientierung.</strong><br>Auf Grundlage des Qurʾān und der authentischen Sunnah.",
 "hero.cta1":"Wissen entdecken","hero.cta2":"Kurse ansehen","hero.scroll":"Mehr",
 "intro.skip":"Überspringen",

 "who.eyebrow":"Wer wir sind","who.title":"Weitergeben, was uns anvertraut wurde",
 "who.p1":"Hidayah entstand aus dem Wunsch, gelerntes islamisches Wissen nicht lediglich für sich selbst zu bewahren, sondern es weiterzugeben und damit – entsprechend den eigenen Möglichkeiten – dem Islam und den Muslimen zu dienen.",
 "who.p2":"Unser Ziel ist es, Menschen zum Tawḥīd aufzurufen, authentisches islamisches Wissen verständlich zu vermitteln, Missverständnisse aufzuklären und Muslime darin zu stärken, ihren Glauben zu verstehen, zu leben und darin standhaft zu bleiben.",
 "who.cta":"Mehr über Hidayah erfahren",

 "video.eyebrow":"Vorstellung","video.title":"Hidayah in wenigen Minuten",
 "video.text":"Wer wir sind, warum Hidayah entstanden ist und was dich hier erwartet.",
 "video.hint":"Video startet ohne Ton. Sobald unser Vorstellungsvideo fertig ist, erscheint es an dieser Stelle.",

 "areas.eyebrow":"Unsere Bereiche","areas.title":"Drei Wege, hier weiterzukommen",
 "areas.k.title":"Wissen","areas.k.text":"Islamische Artikel, Erklärungen, Begriffe, Fiqh-Fragen und Antworten auf verbreitete Zweifel.","areas.k.cta":"Artikel entdecken",
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
 "f.ok":"Ǧazāk Allāhu ḫayran. Deine Nachricht ist bei uns angekommen.",
 "f.err":"Das hat leider nicht geklappt. Schreib uns gerne direkt an ",
 "f.consent":"Ich habe die <a href=\"/datenschutz.html\">Datenschutzerklärung</a> gelesen und bin mit der Verarbeitung meiner Angaben zur Bearbeitung meiner Anfrage einverstanden.",
},
"en": {
 "dir":"ltr","locale":"en_US",
 "slogan":"In search of light in a world full of darkness.",
 "nav.home":"Home","nav.about":"About us","nav.knowledge":"Knowledge",
 "nav.qa":"Q &amp; A","nav.courses":"Courses","nav.contact":"Contact",
 "nav.search":"Search","nav.account":"My account","nav.language":"Language",
 "skip":"Skip to content","menu":"Menu","close":"Close",
 "hero.sub":"<strong>Islamic knowledge. Daʿwah. Orientation.</strong><br>Grounded in the Qurʾān and the authentic Sunnah.",
 "hero.cta1":"Explore knowledge","hero.cta2":"View courses","hero.scroll":"More",
 "intro.skip":"Skip",
 "who.eyebrow":"Who we are","who.title":"Passing on what was entrusted to us",
 "who.p1":"Hidayah grew out of the wish not to keep the Islamic knowledge we learned to ourselves, but to pass it on and thereby serve Islam and the Muslims according to our means.",
 "who.p2":"Our aim is to call people to Tawḥīd, to convey authentic Islamic knowledge in an understandable way, to clear up misconceptions and to strengthen Muslims in understanding, living and holding firm to their faith.",
 "who.cta":"Learn more about Hidayah",
 "video.eyebrow":"Introduction","video.title":"Hidayah in a few minutes",
 "video.text":"Who we are, why Hidayah came about and what awaits you here.",
 "video.hint":"Video starts muted. Our introduction video will appear here once it is ready.",
 "areas.eyebrow":"Our areas","areas.title":"Three ways to go further here",
 "areas.k.title":"Knowledge","areas.k.text":"Islamic articles, explanations, terminology, questions of Fiqh and answers to widespread doubts.","areas.k.cta":"Discover articles",
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
 "f.ok":"Ǧazāk Allāhu ḫayran. Your message has reached us.",
 "f.err":"That did not work. Please write to us directly at ",
 "f.consent":"I have read the <a href=\"/en/datenschutz.html\">privacy policy</a> and consent to my data being processed to handle my request.",
},
"tr": {
 "dir":"ltr","locale":"tr_TR",
 "slogan":"Karanlıkla dolu bir dünyada nûr arayışında.",
 "nav.home":"Ana sayfa","nav.about":"Hakkımızda","nav.knowledge":"İlim",
 "nav.qa":"Soru &amp; Cevap","nav.courses":"Dersler","nav.contact":"İletişim",
 "nav.search":"Ara","nav.account":"Hesabım","nav.language":"Dil",
 "skip":"İçeriğe geç","menu":"Menü","close":"Kapat",
 "hero.sub":"<strong>İslami ilim. Daʿvet. İstikamet.</strong><br>Kurʾân ve sahih sünnet temelinde.",
 "hero.cta1":"İlmi keşfet","hero.cta2":"Dersleri gör","hero.scroll":"Devam",
 "intro.skip":"Geç",
 "who.eyebrow":"Biz kimiz","who.title":"Bize emanet edileni aktarmak",
 "who.p1":"Hidayah, öğrenilen İslami ilmi sadece kendimize saklamayıp aktarma ve böylece imkânlarımız ölçüsünde İslam'a ve Müslümanlara hizmet etme arzusundan doğdu.",
 "who.p2":"Amacımız insanları tevhide çağırmak, sahih İslami ilmi anlaşılır şekilde aktarmak, yanlış anlaşılmaları gidermek ve Müslümanları inançlarını anlama, yaşama ve onda sebat etme konusunda güçlendirmektir.",
 "who.cta":"Hidayah hakkında daha fazlası",
 "video.eyebrow":"Tanıtım","video.title":"Birkaç dakikada Hidayah",
 "video.text":"Kim olduğumuz, Hidayah'ın neden doğduğu ve burada seni ne beklediği.",
 "video.hint":"Video sessiz başlar. Tanıtım videomuz hazır olduğunda burada görünecek.",
 "areas.eyebrow":"Bölümlerimiz","areas.title":"Burada ilerlemenin üç yolu",
 "areas.k.title":"İlim","areas.k.text":"İslami makaleler, açıklamalar, kavramlar, fıkhi meseleler ve yaygın şüphelere cevaplar.","areas.k.cta":"Makaleleri keşfet",
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
 "nav.home":"الرئيسية","nav.about":"من نحن","nav.knowledge":"العلم",
 "nav.qa":"سؤال وجواب","nav.courses":"الدورات","nav.contact":"تواصل",
 "nav.search":"بحث","nav.account":"حسابي","nav.language":"اللغة",
 "skip":"تخطَّ إلى المحتوى","menu":"القائمة","close":"إغلاق",
 "hero.sub":"<strong>علم شرعي. دعوة. هداية.</strong><br>على أساس القرآن والسنة الصحيحة.",
 "hero.cta1":"اكتشف العلم","hero.cta2":"شاهد الدورات","hero.scroll":"المزيد",
 "intro.skip":"تخطّي",
 "who.eyebrow":"من نحن","who.title":"نبلّغ ما اؤتمنّا عليه",
 "who.p1":"نشأت هداية من الرغبة في ألّا نحتفظ بما تعلّمناه من العلم الشرعي لأنفسنا، بل أن نبلّغه ونخدم به الإسلام والمسلمين قدر استطاعتنا.",
 "who.p2":"هدفنا دعوة الناس إلى التوحيد، وتبليغ العلم الشرعي الصحيح بأسلوب مفهوم، وإزالة الشبهات، وتثبيت المسلمين على فهم دينهم والعمل به والثبات عليه.",
 "who.cta":"اعرف المزيد عن هداية",
 "video.eyebrow":"تعريف","video.title":"هداية في دقائق",
 "video.text":"من نحن، ولماذا نشأت هداية، وماذا ينتظرك هنا.",
 "video.hint":"يبدأ الفيديو بلا صوت. سيظهر الفيديو التعريفي هنا فور جاهزيته.",
 "areas.eyebrow":"أقسامنا","areas.title":"ثلاثة طرق للمضي قدمًا",
 "areas.k.title":"العلم","areas.k.text":"مقالات وشروح ومصطلحات ومسائل فقهية وردود على الشبهات المنتشرة.","areas.k.cta":"تصفّح المقالات",
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
    """Root-relative URL fuer eine Sprache."""
    base = "/" if lang == "de" else f"/{lang}/"
    return base + path.lstrip("/")


NAV = [("nav.home", ""), ("nav.about", "ueber-uns.html"), ("nav.knowledge", "wissen.html"),
       ("nav.qa", "frage-antwort.html"), ("nav.courses", "kurse.html"), ("nav.contact", "kontakt.html")]


def header(lang, active):
    CUR = ' aria-current="page"'
    links = "".join(
        '<a href="%s"%s>%s</a>' % (u(lang, p), CUR if active == k else "", t(lang, k))
        for k, p in NAV)
    drawer_links = links
    langbtns = "".join(
        f'<button type="button" data-lang="{c}" role="option" aria-selected="{"true" if c == lang else "false"}">'
        f'<span>{n}</span><span class="lang__code">{code}</span></button>'
        for c, n, code in LANGS)
    langpills = "".join(
        f'<button type="button" data-lang="{c}" aria-selected="{"true" if c == lang else "false"}">{code}</button>'
        for c, n, code in LANGS)
    cur = next(x for x in LANGS if x[0] == lang)
    return f'''<a class="skip-link" href="#main">{t(lang,"skip")}</a>
<header class="site-header" id="siteHeader">
  <nav class="nav container" aria-label="{t(lang,'menu')}">
    <a class="nav__logo" href="{u(lang)}" aria-label="Hidayah">
      <img src="/assets/img/logo-360.webp" alt="Hidayah" width="360" height="122" fetchpriority="high">
    </a>
    <div class="nav__links">{links}</div>
    <div class="nav__tools">
      <button class="icon-btn" type="button" data-search-open aria-label="{t(lang,'nav.search')}">{ICON['search']}</button>
      <a class="icon-btn" href="{u(lang,'konto.html')}" aria-label="{t(lang,'nav.account')}">{ICON['user']}</a>
      <div class="lang" data-lang-switch aria-expanded="false">
        <button class="icon-btn icon-btn--wide" type="button" aria-haspopup="listbox" aria-label="{t(lang,'nav.language')}">
          {ICON['globe']}<span class="lang__code">{cur[2]}</span>
        </button>
        <div class="lang__menu" role="listbox">{langbtns}</div>
      </div>
      <button class="icon-btn nav__burger" type="button" data-drawer-open aria-label="{t(lang,'menu')}">{ICON['menu']}</button>
    </div>
  </nav>
</header>
<div class="drawer" data-drawer aria-hidden="true">
  <div class="drawer__top">
    <img src="/assets/img/logo-360.webp" alt="Hidayah" style="height:26px;width:auto">
    <button class="icon-btn" type="button" data-drawer-close aria-label="{t(lang,'close')}">{ICON['close']}</button>
  </div>
  <div class="drawer__links">{drawer_links}
    <a href="{u(lang,'konto.html')}">{t(lang,'nav.account')}</a>
  </div>
  <div class="drawer__foot">{langpills}</div>
</div>'''


def footer(lang):
    return f'''<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <img src="/assets/img/logo-360.webp" alt="Hidayah" width="360" height="122" loading="lazy">
        <p>{t(lang,"slogan")}</p>
      </div>
      <div class="footer-col">
        <h4>{t(lang,'foot.content')}</h4>
        <a href="{u(lang,'wissen.html')}">{t(lang,'nav.knowledge')}</a>
        <a href="{u(lang,'kurse.html')}">{t(lang,'nav.courses')}</a>
        <a href="{u(lang,'frage-antwort.html')}">{t(lang,'nav.qa')}</a>
      </div>
      <div class="footer-col">
        <h4>{t(lang,'foot.hidayah')}</h4>
        <a href="{u(lang,'ueber-uns.html')}">{t(lang,'nav.about')}</a>
        <a href="{u(lang,'kontakt.html')}">{t(lang,'nav.contact')}</a>
        <a href="{u(lang,'konto.html')}">{t(lang,'nav.account')}</a>
      </div>
      <div class="footer-col">
        <h4>{t(lang,'foot.legal')}</h4>
        <a href="{u(lang,'impressum.html')}">{t(lang,'foot.imprint')}</a>
        <a href="{u(lang,'datenschutz.html')}">{t(lang,'foot.privacy')}</a>
        <a href="{u(lang,'agb.html')}">{t(lang,'foot.terms')}</a>
        <a href="{u(lang,'widerruf.html')}">{t(lang,'foot.withdrawal')}</a>
        <a href="#" data-cookie-open>{t(lang,'foot.cookies')}</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; <span data-year>2026</span> Hidayah. {t(lang,'foot.rights')}</span>
      <div class="social">
        <a href="{SITE['instagram']}" rel="noopener me" target="_blank" aria-label="Instagram">{ICON['ig']}</a>
        <a href="{SITE['youtube']}" rel="noopener me" target="_blank" aria-label="YouTube">{ICON['yt']}</a>
        <a href="{SITE['x']}" rel="noopener me" target="_blank" aria-label="X">{ICON['x']}</a>
      </div>
    </div>
  </div>
</footer>'''


def overlays(lang):
    return f'''<div class="search-overlay" data-search aria-hidden="true">
  <div class="search-box">
    <div class="search-input-wrap">{ICON['search']}
      <input class="search-input" type="search" data-search-input placeholder="{t(lang,'search.ph')}"
             aria-label="{t(lang,'nav.search')}" autocomplete="off" spellcheck="false">
    </div>
    <div class="search-meta"><span data-search-count></span>
      <span><kbd>Esc</kbd> {t(lang,'search.close')}</span></div>
    <div class="search-results" data-search-results>
      <p class="search-empty">{t(lang,'search.start')}</p>
    </div>
  </div>
</div>
<div class="cookie" data-cookie role="dialog" aria-label="{t(lang,'cookie.title')}">
  <p>{t(lang,'cookie.text')}</p>
  <div class="btn-row">
    <button class="btn btn--primary btn--sm" type="button" data-cookie-ok>{t(lang,'cookie.ok')}</button>
    <a class="btn btn--ghost btn--sm" href="{u(lang,'datenschutz.html')}">{t(lang,'cookie.more')}</a>
  </div>
</div>'''


def intro(lang):
    return f'''<div class="intro" data-intro>
  <div class="intro__glow"></div>
  <img class="intro__logo" src="/assets/img/logo-besmele.webp"
       alt="Bismillāhir-Raḥmānir-Raḥīm — Hidayah" width="1600" height="551" fetchpriority="high">
  <p class="intro__slogan">{t(lang,"slogan")}</p>
  <button class="intro__skip" type="button" data-intro-skip>{t(lang,"intro.skip")}</button>
</div>'''


def page(*, lang, slug, title, desc, body, active=None, with_intro=False, extra_head="", extra_js=""):
    d = t(lang, "dir")
    full_title = title if slug == "" else f"{title} — Hidayah"
    if slug == "":
        full_title = f'Hidayah — {t(lang, "slogan")}'
    canonical = SITE["url"] + u(lang, slug)
    alts = "".join(
        f'<link rel="alternate" hreflang="{c}" href="{SITE["url"]}{u(c, slug)}">' for c, _, _ in LANGS)
    return f'''<!doctype html>
<html lang="{lang}" dir="{d}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{full_title}</title>
<meta name="description" content="{desc}">
<meta name="theme-color" content="#05060a">
<link rel="canonical" href="{canonical}">
{alts}<link rel="alternate" hreflang="x-default" href="{SITE['url']}/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Hidayah">
<meta property="og:locale" content="{t(lang,'locale')}">
<meta property="og:title" content="{full_title}">
<meta property="og:description" content="{desc}">
<meta property="og:url" content="{canonical}">
<meta property="og:image" content="{SITE['url']}/assets/img/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/img/favicon.ico" sizes="any">
<link rel="icon" href="/assets/img/favicon-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/assets/fonts/clash-display-600.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/satoshi-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/hidayah.css">
{extra_head}</head>
<body data-lang="{lang}">
{intro(lang) if with_intro else ""}
{header(lang, active)}
<main id="main">
{body}
</main>
{footer(lang)}
{overlays(lang)}
<script src="/assets/js/config.js" defer></script>
<script src="/assets/js/search-index.js" defer></script>
<script src="/assets/js/site.js" defer></script>
{extra_js}</body>
</html>'''
