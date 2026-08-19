# -*- coding: utf-8 -*-
"""Inhalte für hidayah.  Alles hier ist Klartext und kann direkt bearbeitet werden."""

SITE = {
    "name": "Hidayah",
    "slogan": "Auf der Suche nach Licht in einer Welt voller Dunkelheit.",
    "tagline": "Islamisches Wissen. Daʿwah. Orientierung.",
    "url": "https://hidayah.de",
    "email": "salam@hidayah.de",
    "instagram": "https://instagram.com/hidayah",
    "youtube": "https://youtube.com/@hidayah",
    "x": "https://x.com/hidayah",
    # Formspree o. Ä. – ID eintragen, dann versenden die Formulare echte E-Mails.
    "form_endpoint": "https://formspree.io/f/DEINE-FORM-ID",
}

# ---------------------------------------------------------------- Reihen
SERIES = [
    ("terminologie", "Islamische Terminologie",
     "Erklärungen zentraler islamischer Begriffe und Konzepte."),
    ("fiqh", "Fiqh & Rechtsfragen",
     "Islamische Rechtsfragen auf Grundlage anerkannter Quellen und Gelehrter."),
    ("zweifel", "Aufklärung von Zweifeln",
     "Antworten auf Behauptungen, Missverständnisse und mediale Darstellungen."),
]

# ---------------------------------------------------------------- Themen
TOPICS = [
    ("aqidah", "ʿAqīdah"), ("tawhid", "Tawḥīd"), ("shirk", "Širk"), ("iman", "Īmān"),
    ("fiqh", "Fiqh"), ("taharah", "Ṭahārah"), ("salah", "Ṣalāh"), ("zakah", "Zakāh"),
    ("sawm", "Ṣawm"), ("hajj", "Ḥaǧǧ"), ("ehe", "Ehe"), ("handel", "Handel"),
    ("hadith", "Ḥadīṯ"), ("quran", "Qurʾān"), ("sirah", "Sīrah"), ("dawah", "Daʿwah"),
    ("familie", "Familie"), ("tazkiyah", "Tazkiyah"), ("geschichte", "Islamische Geschichte"),
    ("bidah", "Bidʿah"), ("sunnah", "Sunnah"),
]

MADHAHIB = [("hanafi", "Ḥanafī"), ("maliki", "Mālikī"), ("shafii", "Šāfiʿī"), ("hanbali", "Ḥanbalī")]


def ayah(ar, de, src, kind="ayah"):
    cls = "ayah hadith" if kind == "hadith" else "ayah"
    return (f'<figure class="{cls}"><p class="ayah__ar" lang="ar" dir="rtl">{ar}</p>'
            f'<p class="ayah__de">{de}</p><figcaption class="ayah__src">{src}</figcaption></figure>')


# ---------------------------------------------------------------- Artikel
ARTICLES = [
    {
        "slug": "was-bedeutet-tawhid",
        "title": "Was bedeutet Tawḥīd?",
        "series": "terminologie",
        "topics": ["tawhid", "aqidah", "iman"],
        "author": "S. Eslem",
        "date": "2025-02-14",
        "reading": 9,
        "video": True,
        "summary": "Tawḥīd ist die Grundlage des Islam und die Botschaft aller Propheten. "
                   "Dieser Artikel erklärt, was das Wort bedeutet, wie die Gelehrten es aufgeteilt haben "
                   "und warum es der Ausgangspunkt jedes weiteren Wissens ist.",
        "body": """
<p>Kein Begriff steht im Islam so sehr im Zentrum wie <strong>Tawḥīd</strong>. Er ist der Inhalt des
ersten Satzes, den ein Mensch spricht, wenn er den Islam annimmt, und der letzte Satz, den ein
Muslim sich wünscht auszusprechen, bevor er stirbt. Alles Weitere – Gebet, Fasten, Ethik, Recht –
baut darauf auf.</p>

<h2 id="wortbedeutung">Die Wortbedeutung</h2>
<p>Sprachlich stammt <em>Tawḥīd</em> (تَوْحِيد) von der Wurzel <em>w-ḥ-d</em>, die &bdquo;eins sein&ldquo; bedeutet.
Die Form <em>tawḥīd</em> ist ein Verbalnomen und trägt die Bedeutung: <strong>etwas als eins
erklären, etwas für einzig halten</strong>. Es geht also nicht bloß um die Feststellung, dass Allah
einer ist – das bestritten selbst die Götzendiener Makkas nicht –, sondern darum, Ihn in dem, was
Ihm allein zusteht, auch tatsächlich einzig zu machen.</p>

<h2 id="kern">Der Kern: Anbetung ist Sein Recht</h2>
<p>Der Qurʾān nennt den Zweck der Erschaffung von Ǧinn und Menschen unmissverständlich:</p>
""" + ayah("﴿وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ﴾",
           "&bdquo;Und Ich habe die Ǧinn und die Menschen nur erschaffen, damit sie Mir dienen.&ldquo;",
           "Sūrat aḏ-Ḏāriyāt, 51:56") + """
<p>Die Botschaft jedes Propheten war im Kern dieselbe. Nūḥ, Hūd, Ṣāliḥ, Šuʿayb – der Qurʾān
wiederholt ihren Aufruf beinahe wortgleich: <em>&bdquo;O mein Volk, dient Allah! Ihr habt keinen anderen
Gott als Ihn.&ldquo;</em> Die Sendungen unterschieden sich in ihren Gesetzen, nicht in ihrem Fundament.</p>

<h2 id="einteilung">Die Einteilung der Gelehrten</h2>
<p>Um den Begriff lehrbar zu machen, haben die Gelehrten den Tawḥīd in drei Bereiche gegliedert.
Diese Einteilung ist ein <em>didaktisches Hilfsmittel</em>, das sich aus den Texten ableitet – kein
zusätzlicher Glaubensinhalt.</p>
<h3 id="rububiyyah">1. Tawḥīd ar-Rubūbiyyah – die Einzigkeit in der Herrschaft</h3>
<p>Allah allein erschafft, versorgt, belebt, lässt sterben und lenkt die Angelegenheiten. Niemand
teilt mit Ihm die Herrschaft über die Schöpfung. Bemerkenswert ist: Die Araber zur Zeit des
Propheten ﷺ erkannten dies bereits an. Fragte man sie, wer Himmel und Erde erschaffen habe,
antworteten sie: &bdquo;Allah.&ldquo; Dieses Bekenntnis allein machte sie jedoch nicht zu Muslimen.</p>
<h3 id="uluhiyyah">2. Tawḥīd al-Ulūhiyyah – die Einzigkeit in der Anbetung</h3>
<p>Hier lag der eigentliche Streitpunkt. Anbetung – Bittgebet, Gelübde, Opfer, Vertrauen, Furcht,
Hoffnung – darf ausschließlich Allah gewidmet werden. Wer eine dieser Handlungen einem anderen
zuwendet, hat den Tawḥīd verletzt, auch wenn er die Schöpferschaft Allahs anerkennt. Genau das
meint das Zeugnis <em>lā ilāha illā-llāh</em>: &bdquo;Es gibt keinen, der mit Recht angebetet wird,
außer Allah.&ldquo;</p>
<h3 id="asma">3. Tawḥīd al-Asmāʾ wa-ṣ-Ṣifāt – die Einzigkeit in Namen und Eigenschaften</h3>
<p>Allah wird mit dem beschrieben, womit Er sich selbst beschrieben hat und womit Sein Gesandter ﷺ
Ihn beschrieben hat – ohne Entstellung, ohne Leugnung, ohne Verbildlichung und ohne Vergleich mit
der Schöpfung. Der Maßstab bleibt Sein eigenes Wort:</p>
""" + ayah("﴿لَيْسَ كَمِثْلِهِ شَيْءٌ ۖ وَهُوَ السَّمِيعُ الْبَصِيرُ﴾",
           "&bdquo;Nichts ist Ihm gleich, und Er ist der Allhörende, der Allsehende.&ldquo;",
           "Sūrat aš-Šūrā, 42:11") + """

<h2 id="folgen">Warum das praktisch alles verändert</h2>
<p>Tawḥīd ist keine abstrakte Theorie. Wer verinnerlicht, dass Nutzen und Schaden allein bei Allah
liegen, dessen Verhältnis zu Menschen, Angst, Besitz und Zukunft verändert sich. Er bittet den, der
geben kann. Er fürchtet den, der wirklich Macht hat. Er richtet sein Herz auf einen Punkt aus statt
auf hundert.</p>
<p>Deshalb verbrachte der Prophet ﷺ dreizehn Jahre in Makka überwiegend damit, den Tawḥīd zu
festigen, bevor die meisten detaillierten Gesetze überhaupt offenbart wurden. Wer beim Fundament
spart, dem hilft das Dach wenig.</p>

<h2 id="gegenteil">Das Gegenteil: Širk</h2>
<p>Der Gegenbegriff zum Tawḥīd ist <a href="/wissen/was-ist-shirk.html">Širk</a> – Allah in dem,
was Ihm allein zusteht, jemanden beizugesellen. Der Qurʾān stellt ihn als einzige Sünde dar, die
ohne Reue nicht vergeben wird:</p>
""" + ayah("﴿إِنَّ اللَّهَ لَا يَغْفِرُ أَن يُشْرَكَ بِهِ وَيَغْفِرُ مَا دُونَ ذَٰلِكَ لِمَن يَشَاءُ﴾",
           "&bdquo;Gewiss, Allah vergibt nicht, dass Ihm etwas beigesellt wird. Doch was darunter liegt, "
           "vergibt Er, wem Er will.&ldquo;",
           "Sūrat an-Nisāʾ, 4:48") + """

<h2 id="fazit">Schlussfolgerung</h2>
<p>Tawḥīd bedeutet, Allah in Seiner Herrschaft, in Seiner Anbetung und in Seinen Namen und
Eigenschaften einzig zu machen. Er ist der Ausgangspunkt des Islam, das Ziel der Daʿwah und der
Maßstab, an dem sich jede weitere Frage ausrichtet. Wer hier Klarheit gewinnt, dem ordnet sich
vieles andere von selbst.</p>
""",
        "sources": [
            "al-Buḫārī, <em>aṣ-Ṣaḥīḥ</em>, Kitāb at-Tawḥīd.",
            "Muslim, <em>aṣ-Ṣaḥīḥ</em>, Kitāb al-Īmān, Nr. 8 (Ḥadīṯ Ǧibrīl).",
            "Ibn Taymiyyah, <em>al-ʿAqīdah al-Wāsiṭiyyah</em>.",
            "Ibn Kaṯīr, <em>Tafsīr al-Qurʾān al-ʿAẓīm</em>, zu 51:56 und 4:48.",
        ],
    },
    {
        "slug": "was-ist-shirk",
        "title": "Was ist Širk – und wo beginnt er?",
        "series": "terminologie",
        "topics": ["shirk", "aqidah", "tawhid"],
        "author": "S. Eslem",
        "date": "2025-03-02",
        "reading": 8,
        "video": False,
        "summary": "Širk wird oft auf Götzenstatuen reduziert. Tatsächlich beschreibt der Begriff jede "
                   "Zuwendung von Anbetung an anderes als Allah – und er hat Formen, die leicht übersehen werden.",
        "body": """
<p>Wer <strong>Širk</strong> nur mit steinernen Götzen verbindet, hält ihn für ein Problem
vergangener Völker. Der Qurʾān und die Sunnah behandeln ihn dagegen als eine Gefahr, vor der auch
Propheten Zuflucht suchten. Ibrāhīm ﷺ – der Vater der Propheten – betete:</p>
""" + ayah("﴿وَاجْنُبْنِي وَبَنِيَّ أَن نَّعْبُدَ الْأَصْنَامَ﴾",
           "&bdquo;Und bewahre mich und meine Kinder davor, Götzen zu dienen.&ldquo;",
           "Sūrat Ibrāhīm, 14:35") + """
<p>Wenn Ibrāhīm ﷺ um Bewahrung bat, ist niemand nach ihm davon ausgenommen, sich damit
auseinanderzusetzen.</p>

<h2 id="definition">Die Definition</h2>
<p>Sprachlich bedeutet <em>širk</em> &bdquo;Teilhaberschaft&ldquo;. In der Terminologie: <strong>einem anderen
neben Allah etwas zuzuschreiben oder zuzuwenden, was allein Allah zusteht</strong> – sei es in
Seiner Herrschaft, in Seiner Anbetung oder in Seinen Namen und Eigenschaften.</p>

<h2 id="akbar">Großer Širk (aš-širk al-akbar)</h2>
<p>Er führt aus dem Islam heraus und macht Taten zunichte. Dazu zählt etwa:</p>
<ul>
  <li>ein Bittgebet an einen Verstorbenen, einen Propheten oder einen &bdquo;Heiligen&ldquo; zu richten,</li>
  <li>ein Opfer oder Gelübde für anderes als Allah darzubringen,</li>
  <li>einem Geschöpf jene Furcht, Hoffnung oder jenes Vertrauen entgegenzubringen, das nur Allah
      gebührt,</li>
  <li>zu glauben, ein Geschöpf könne unabhängig von Allah Nutzen oder Schaden bewirken.</li>
</ul>

<h2 id="asghar">Kleiner Širk (aš-širk al-aṣġar)</h2>
<p>Er führt nicht aus dem Islam heraus, ist aber schwerwiegender als jede große Sünde. Am
bekanntesten ist <em>ar-riyāʾ</em>: eine gottesdienstliche Handlung zu verrichten, damit Menschen
sie sehen. Der Prophet ﷺ nannte ihn den &bdquo;kleineren Beigesellungsdienst&ldquo; und warnte seine
Gefährten ausdrücklich davor – gerade weil er unauffällig ist.</p>
<p>Ebenso gehört dazu, bei anderem als Allah zu schwören, oder Formulierungen zu gebrauchen, die
ein Geschöpf auf eine Stufe mit Allah stellen (&bdquo;Was Allah will und was du willst&ldquo; statt &bdquo;Was Allah
will, dann was du willst&ldquo;).</p>

<h2 id="khafi">Verborgener Širk</h2>
<p>Damit ist die feine Regung im Herzen gemeint: eine Tat ein wenig schöner zu verrichten, weil
jemand zusieht. Die Gelehrten der Tazkiyah haben ihm ganze Kapitel gewidmet, weil er niemanden
verschont, der sich nicht prüft.</p>

<h2 id="abgrenzung">Wichtige Abgrenzungen</h2>
<p>Nicht alles, was auf den ersten Blick danach aussieht, ist Širk:</p>
<ul>
  <li>Einen <em>lebenden, anwesenden</em> Menschen um etwas zu bitten, wozu er tatsächlich in der
      Lage ist, ist erlaubt und alltäglich.</li>
  <li>Ursachen zu ergreifen – Medizin, Arbeit, Vorsorge – ist Sunnah, solange man weiß, dass die
      Wirkung von Allah kommt.</li>
  <li>Einen Gelehrten zu respektieren und von ihm zu lernen ist geboten; ihn für unfehlbar zu
      halten, ist es nicht.</li>
</ul>
<p>Ebenso wichtig: <strong>Die Feststellung, dass eine Handlung Širk ist, ist etwas anderes als das
Urteil über eine bestimmte Person.</strong> Letzteres (<em>takfīr al-muʿayyan</em>) hat Bedingungen
und Hindernisse und ist Aufgabe der Gelehrten, nicht des Einzelnen. Wer diesen Unterschied
übergeht, richtet mehr Schaden an, als er behebt.</p>

<h2 id="fazit">Schlussfolgerung</h2>
<p>Širk ist nicht nur ein historisches Phänomen, sondern eine Frage der Ausrichtung des Herzens.
Der Schutz davor liegt im Wissen, im aufrichtigen Bittgebet und in der ständigen Prüfung der
eigenen Absicht.</p>
""",
        "sources": [
            "Muslim, <em>aṣ-Ṣaḥīḥ</em>, Kitāb az-Zuhd, Nr. 2985 (zu ar-riyāʾ).",
            "Aḥmad, <em>al-Musnad</em>, Nr. 23630 (aš-širk al-aṣġar).",
            "Ibn Raǧab al-Ḥanbalī, <em>Ǧāmiʿ al-ʿUlūm wa-l-Ḥikam</em>.",
            "aṭ-Ṭabarī, <em>Ǧāmiʿ al-Bayān</em>, zu 14:35.",
        ],
    },
    {
        "slug": "was-ist-bidah",
        "title": "Bidʿah – was ist damit gemeint?",
        "series": "terminologie",
        "topics": ["bidah", "sunnah", "aqidah"],
        "author": "A. Sirac",
        "date": "2025-04-08",
        "reading": 7,
        "video": False,
        "summary": "Der Begriff Bidʿah wird häufig zu weit oder zu eng verwendet. Ein Blick auf die "
                   "Definition der Gelehrten – und auf die Grenze zwischen religiöser Neuerung und "
                   "alltäglicher Entwicklung.",
        "body": """
<p>Wenige Begriffe werden so oft im Streitgespräch gebraucht und so selten definiert wie
<strong>Bidʿah</strong>. Dabei ist eine saubere Definition der halbe Weg zur Antwort.</p>

<h2 id="definition">Sprachlich und fachlich</h2>
<p>Sprachlich ist <em>bidʿah</em> alles Neuartige, das ohne Vorbild entsteht. In diesem allgemeinen
Sinn ist ein Auto eine Bidʿah – und niemand behauptet, Autofahren sei verboten.</p>
<p>Fachlich haben die Gelehrten den Begriff enger gefasst. aš-Šāṭibī definiert ihn als
<em>&bdquo;einen erdachten Weg in der Religion, der der Šarīʿah nachgebildet ist und mit dem beabsichtigt
wird, was mit dem vorgeschriebenen Weg beabsichtigt wird&ldquo;</em>. Entscheidend sind also zwei
Merkmale: Es geht um die <strong>Religion</strong>, und es wird damit <strong>Annäherung an
Allah</strong> bezweckt.</p>

<h2 id="grundregel">Die Grundregel im ʿIbādāt-Bereich</h2>
<p>Bei gottesdienstlichen Handlungen gilt: <em>Das Grundprinzip ist die Unterlassung, bis ein Beleg
kommt.</em> Bei weltlichen Angelegenheiten gilt das Umgekehrte: <em>Das Grundprinzip ist die
Erlaubnis, bis ein Verbot kommt.</em> Aus diesem Unterschied erklärt sich das meiste.</p>
<p>Die Grundlage bildet die bekannte Überlieferung:</p>
""" + ayah("«مَنْ أَحْدَثَ فِي أَمْرِنَا هَذَا مَا لَيْسَ مِنْهُ فَهُوَ رَدٌّ»",
           "&bdquo;Wer in dieser unserer Angelegenheit etwas Neues einführt, das nicht dazugehört, "
           "dessen Tat ist zurückgewiesen.&ldquo;",
           "al-Buḫārī, Nr. 2697; Muslim, Nr. 1718", kind="hadith") + """
<p>Der Wortlaut &bdquo;in dieser unserer Angelegenheit&ldquo; verweist auf die Religion, nicht auf Technik,
Verwaltung oder Sprache.</p>

<h2 id="mittel">Mittel und Zweck unterscheiden</h2>
<p>Viele Missverständnisse lösen sich, wenn man <em>Zwecke</em> von <em>Mitteln</em> trennt. Der
Qurʾān in einem gedruckten Band, Unterricht in einem Klassenzimmer, ein Lautsprecher für den Aḏān,
eine Website für Daʿwah – all das sind Mittel, für die es keinen eigenen Beleg braucht. Eine neu
erfundene Gebetsform, ein zusätzlich vorgeschriebener Gedenktag mit gottesdienstlichem Charakter
oder eine festgelegte Anzahl von Wiederholungen ohne Beleg berühren dagegen den Zweckbereich.</p>

<h2 id="hasanah">Und &bdquo;bidʿah ḥasanah&ldquo;?</h2>
<p>Die Aussage ʿUmars ﷺ zum gemeinsamen Tarāwīḥ-Gebet – <em>&bdquo;Welch schöne Bidʿah ist dies&ldquo;</em> –
wird oft angeführt. Die Gelehrten erklären sie überwiegend im <strong>sprachlichen</strong> Sinn:
Der Prophet ﷺ hatte dieses Gebet selbst in Gemeinschaft verrichtet und es nur aus Sorge unterlassen,
es könnte zur Pflicht werden. ʿUmar führte also nichts Neues ein, sondern belebte etwas Belegtes
wieder. Wer den Ausdruck dagegen als Freibrief für beliebige Zusätze liest, weitet ihn über das
hinaus, was der Kontext trägt.</p>

<h2 id="haltung">Die Haltung in der Praxis</h2>
<p>Wissen über Bidʿah ist dazu da, die eigene Anbetung zu reinigen – nicht, um ein Werkzeug gegen
andere Muslime zu werden. Die frühen Gelehrten waren streng in der Sache und maßvoll im Umgang.
Wer eine Frage nicht sicher beurteilen kann, fragt jemanden, der es kann. Das ist keine Schwäche,
sondern die vorgeschriebene Methode.</p>

<h2 id="fazit">Schlussfolgerung</h2>
<p>Bidʿah meint eine erdachte Neuerung <em>in der Religion</em>, mit der Annäherung an Allah
bezweckt wird. Neue Mittel, Techniken und Organisationsformen fallen nicht darunter. Die
Unterscheidung von Zweck und Mittel – und die Rückkehr zu den Gelehrten in Zweifelsfällen – löst
die meisten Streitfragen.</p>
""",
        "sources": [
            "aš-Šāṭibī, <em>al-Iʿtiṣām</em>, Bd. 1.",
            "al-Buḫārī, <em>aṣ-Ṣaḥīḥ</em>, Nr. 2697; Muslim, <em>aṣ-Ṣaḥīḥ</em>, Nr. 1718.",
            "Ibn Raǧab, <em>Ǧāmiʿ al-ʿUlūm wa-l-Ḥikam</em>, Ḥadīṯ 5.",
            "an-Nawawī, <em>Šarḥ Ṣaḥīḥ Muslim</em>, zu Nr. 1718.",
        ],
    },
    {
        "slug": "blut-und-wudu",
        "title": "Bricht Blut den Wuḍūʾ?",
        "series": "fiqh",
        "topics": ["fiqh", "taharah", "salah"],
        "madhhab": ["hanafi", "shafii"],
        "author": "S. Eslem",
        "date": "2025-05-19",
        "reading": 6,
        "video": False,
        "summary": "Eine klassische Frage, bei der die Rechtsschulen unterschiedlich urteilen. Der Artikel "
                   "stellt die Belege beider Seiten dar und zeigt, wie man in der Praxis damit umgeht.",
        "body": """
<p>Die Frage klingt klein und begegnet doch fast jedem: Man schneidet sich beim Kochen, die Nase
blutet, das Zahnfleisch blutet beim Zähneputzen – <strong>muss man den Wuḍūʾ erneuern?</strong></p>
<p>Vorab zwei Dinge. Erstens: Diese Frage gehört zu den anerkannten Meinungsverschiedenheiten
(<em>iḫtilāf muʿtabar</em>) zwischen den Rechtsschulen. Zweitens: Wer einer der vier Schulen folgt,
handelt richtig – niemand muss sich hier für &bdquo;die eine wahre Antwort&ldquo; rechtfertigen.</p>

<h2 id="grundlage">Die Grundlage</h2>
""" + ayah("«لَا يَقْبَلُ اللَّهُ صَلَاةَ أَحَدِكُمْ إِذَا أَحْدَثَ حَتَّى يَتَوَضَّأَ»",
           "&bdquo;Allah nimmt das Gebet eines von euch nicht an, wenn er einen Zustand der rituellen "
           "Unreinheit hat, bis er den Wuḍūʾ verrichtet.&ldquo;",
           "al-Buḫārī, Nr. 135; Muslim, Nr. 225", kind="hadith") + """
<p>Der Text steht fest. Die Meinungsverschiedenheit betrifft die Frage, <em>was</em> genau als
solcher Zustand gilt.</p>

<h2 id="hanafi">Die ḥanafitische Position</h2>
<p>Nach der Ḥanafiyyah bricht austretendes Blut den Wuḍūʾ, wenn es <strong>fließt</strong>, also
über die Wundstelle hinausläuft. Ein Tropfen, der stehen bleibt und nur abgewischt wird, bricht ihn
nicht. Begründet wird dies unter anderem mit Überlieferungen zum Schröpfen (<em>ḥiǧāmah</em>) und
mit Aussagen von Gefährten wie Ibn ʿUmar und Ibn ʿAbbās.</p>
<p>Praktisch heißt das: Nasenbluten, das läuft, erfordert eine Erneuerung; ein kleiner Kratzer, den
man abtupft, nicht.</p>

<h2 id="shafii">Die šāfiʿitische und mālikitische Position</h2>
<p>Nach der Šāfiʿiyyah und der Mālikiyyah bricht Blut, das nicht aus den beiden üblichen
Körperöffnungen austritt, den Wuḍūʾ <strong>nicht</strong> – unabhängig von der Menge. Angeführt
wird unter anderem der Bericht über den Gefährten, der während des Nachtgebets von einem Pfeil
getroffen wurde, weiterblutete und sein Gebet fortsetzte, ohne es zu wiederholen. Ebenso wird
argumentiert, dass es keinen eindeutigen Text gibt, der Blut allgemein als Wuḍūʾ-brechend benennt –
und im ʿIbādāt-Bereich braucht eine zusätzliche Verpflichtung einen Beleg.</p>

<h2 id="hanbali">Die ḥanbalitische Position</h2>
<p>Bei den Ḥanbaliyyah findet sich die Unterscheidung nach <em>Menge</em>: Viel Blut bricht den
Wuḍūʾ, wenig nicht, wobei &bdquo;viel&ldquo; nach dem üblichen Verständnis der Menschen bestimmt wird.</p>

<h2 id="praxis">Was bedeutet das praktisch?</h2>
<ul>
  <li><strong>Folge deiner Schule.</strong> Wer nach ḥanafitischem Fiqh lernt und betet, erneuert
      bei fließendem Blut den Wuḍūʾ.</li>
  <li><strong>Kein Streit darüber.</strong> Wer nach šāfiʿitischem Fiqh weiterbetet, hat eine
      belegte Grundlage. Ihn zu korrigieren, ist nicht angebracht.</li>
  <li><strong>Bei Zwang zur Vorsicht.</strong> Wer unsicher ist und Zeit hat, erneuert den Wuḍūʾ –
      das ist in jedem Fall gültig.</li>
  <li><strong>Chronische Fälle</strong> (etwa dauerhaft blutendes Zahnfleisch) fallen unter die
      Regelungen für <em>maʿḏūr</em>-Zustände und sollten individuell mit einem Gelehrten geklärt
      werden.</li>
</ul>

<h2 id="fazit">Schlussfolgerung</h2>
<p>Es handelt sich um eine belegte Meinungsverschiedenheit zwischen den anerkannten Rechtsschulen.
Wer einer von ihnen folgt, ist auf einem gültigen Weg. Wichtiger als die Rechthaberei ist hier,
dass das Gebet zu seiner Zeit und in Ruhe verrichtet wird.</p>
<div class="notice"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/></svg>
<div><strong>Hinweis:</strong> Dieser Artikel stellt die Positionen dar, er ersetzt keine
persönliche Rechtsauskunft. Für deine konkrete Situation stelle bitte eine
<a href="/frage-antwort.html">Frage über Hidayah</a>.</div></div>
""",
        "sources": [
            "al-Kāsānī, <em>Badāʾiʿ aṣ-Ṣanāʾiʿ</em>, Bd. 1, Kitāb aṭ-Ṭahārah.",
            "an-Nawawī, <em>al-Maǧmūʿ Šarḥ al-Muhaḏḏab</em>, Bd. 2.",
            "Ibn Qudāmah, <em>al-Muġnī</em>, Bd. 1, Bāb Nawāqiḍ al-Wuḍūʾ.",
            "al-Buḫārī, <em>aṣ-Ṣaḥīḥ</em>, Nr. 135; Muslim, <em>aṣ-Ṣaḥīḥ</em>, Nr. 225.",
            "Abū Dāwūd, <em>as-Sunan</em>, Nr. 198 (Bericht vom Gefährten im Nachtgebet).",
        ],
    },
    {
        "slug": "wurde-der-islam-mit-dem-schwert-verbreitet",
        "title": "&bdquo;Der Islam wurde mit dem Schwert verbreitet&ldquo; – stimmt das?",
        "series": "zweifel",
        "topics": ["dawah", "geschichte", "sirah"],
        "author": "A. Sirac",
        "date": "2025-06-11",
        "reading": 10,
        "video": True,
        "summary": "Eine der ältesten Behauptungen über den Islam. Was sagen der Qurʾān, die Praxis des "
                   "Propheten ﷺ und die historische Entwicklung tatsächlich dazu?",
        "body": """
<p>Der Satz begegnet in Schulbüchern, Talkshows und Kommentarspalten. Er klingt einfach und
erledigt scheinbar eine ganze Religion in sechs Wörtern. Sehen wir uns an, was tatsächlich in den
Quellen steht.</p>

<h2 id="quran">Was der Qurʾān sagt</h2>
""" + ayah("﴿لَا إِكْرَاهَ فِي الدِّينِ ۖ قَد تَّبَيَّنَ الرُّشْدُ مِنَ الْغَيِّ﴾",
           "&bdquo;Es gibt keinen Zwang im Glauben. Der rechte Weg ist nunmehr deutlich vom Irrweg "
           "unterschieden.&ldquo;",
           "Sūrat al-Baqarah, 2:256") + """
<p>Dieser Vers wurde in Madīnah offenbart – also zu einem Zeitpunkt, als die Muslime bereits einen
Staat und militärische Mittel besaßen. Wäre erzwungene Bekehrung das Ziel gewesen, wäre dies der
denkbar ungünstigste Moment für einen solchen Vers.</p>
<p>An anderer Stelle wird der Prophet ﷺ ausdrücklich in seiner Rolle begrenzt:</p>
""" + ayah("﴿فَذَكِّرْ إِنَّمَا أَنتَ مُذَكِّرٌ ۝ لَّسْتَ عَلَيْهِم بِمُصَيْطِرٍ﴾",
           "&bdquo;So ermahne! Du bist nur ein Ermahner. Du bist nicht ihr Bevollmächtigter.&ldquo;",
           "Sūrat al-Ġāšiyah, 88:21–22") + """

<h2 id="kampf">Worum ging es dann bei den Kämpfen?</h2>
<p>Der Qurʾān erlaubt den Kampf – aber mit klar benannten Gründen: Abwehr von Angriffen, Schutz der
Vertriebenen und Beendigung von Verfolgung.</p>
""" + ayah("﴿أُذِنَ لِلَّذِينَ يُقَاتَلُونَ بِأَنَّهُمْ ظُلِمُوا ۚ وَإِنَّ اللَّهَ عَلَىٰ نَصْرِهِمْ لَقَدِيرٌ﴾",
           "&bdquo;Erlaubnis ist denen gegeben, die bekämpft werden, weil ihnen Unrecht geschah – "
           "und Allah hat wahrlich die Macht, ihnen zu helfen.&ldquo;",
           "Sūrat al-Ḥaǧǧ, 22:39") + """
<p>Ebenso wird die Grenze gezogen: <em>&bdquo;Und bekämpft auf Allahs Weg diejenigen, die euch bekämpfen,
doch übertretet nicht. Allah liebt nicht die Übertreter.&ldquo;</em> (2:190) Die Anweisungen des Propheten ﷺ
an Heerführer – keine Frauen, keine Kinder, keine Alten, keine Mönche in Klausur, keine Bäume
fällen, keine Ernten verbrennen – waren im 7. Jahrhundert ohne Parallele.</p>

<h2 id="historisch">Der historische Befund</h2>
<p>Wenn Schwerter Glauben erzeugten, müssten die zuerst eroberten Gebiete am schnellsten
muslimisch geworden sein. Das Gegenteil ist der Fall. Historiker wie <em>Richard Bulliet</em> haben
anhand von Namensregistern gezeigt, dass die Bevölkerungsmehrheit in Ägypten, Syrien und dem Irak
erst <strong>Jahrhunderte</strong> nach der Eroberung muslimisch wurde – ein langsamer,
schrittweiser Prozess.</p>
<p>Ebenso aufschlussreich: In Indonesien, dem größten muslimischen Land der Welt, in weiten Teilen
Westafrikas, in Malaysia und an der ostafrikanischen Küste kam der Islam über <strong>Händler und
Gelehrte</strong>, nicht über Armeen. Und die christlichen Gemeinschaften Ägyptens, Syriens und des
Libanon existieren nach 1400 Jahren islamischer Herrschaft bis heute – was schwer zu erklären wäre,
wenn Zwangsbekehrung Politik gewesen wäre.</p>

<h2 id="verwechslung">Zwei Dinge, die verwechselt werden</h2>
<p>Die Ausdehnung eines <em>Staates</em> und die Ausbreitung eines <em>Glaubens</em> sind zwei
verschiedene Vorgänge. Das islamische Reich dehnte sich durch Feldzüge aus – wie alle Reiche seiner
Zeit. Die Menschen darin nahmen den Islam über Generationen an, aus Überzeugung, durch Nachbarschaft,
Heirat, Handel und Bildung.</p>
<p>Wer alle Kriege der islamischen Geschichte pauschal als religiös legitimiert darstellt, macht
denselben Fehler wie jemand, der jeden europäischen Krieg dem Christentum zuschreibt. Herrscher
handelten aus Machtinteressen – dafür ist eine Religion nicht der Maßstab, sondern ihre Quellen.</p>

<h2 id="fazit">Schlussfolgerung</h2>
<p>Die Behauptung hält weder dem Text noch der Geschichte stand. Der Qurʾān schließt Zwang im
Glauben ausdrücklich aus, die Kampferlaubnis ist an Abwehr und Unrecht gebunden, und die
tatsächliche Ausbreitung des Islam verlief über Jahrhunderte, vielfach ganz ohne militärische
Beteiligung. Wer diese Frage ernsthaft stellt, verdient eine ernsthafte Antwort – und die liefern
die Quellen selbst.</p>
""",
        "sources": [
            "Ibn Hišām, <em>as-Sīrah an-Nabawiyyah</em>.",
            "Muslim, <em>aṣ-Ṣaḥīḥ</em>, Kitāb al-Ǧihād, Nr. 1731 (Anweisungen an Heerführer).",
            "Richard W. Bulliet, <em>Conversion to Islam in the Medieval Period</em>, Harvard 1979.",
            "Thomas W. Arnold, <em>The Preaching of Islam</em>, London 1913.",
            "aṭ-Ṭabarī, <em>Ǧāmiʿ al-Bayān</em>, zu 2:256.",
        ],
    },
    {
        "slug": "wissen-von-seinen-leuten-nehmen",
        "title": "Warum Wissen von seinen Leuten genommen wird",
        "series": "terminologie",
        "topics": ["dawah", "hadith", "aqidah", "tazkiyah"],
        "author": "M. Selman",
        "date": "2025-07-03",
        "reading": 7,
        "video": False,
        "summary": "Jeder kann heute über Religion sprechen. Warum der Islam trotzdem eine Überlieferungskette "
                   "kennt – und was das für den Umgang mit Wissen in sozialen Medien bedeutet.",
        "body": """
<p>Ein Video von neunzig Sekunden kann heute Millionen Menschen erreichen. Das ist eine Chance –
und ein Problem. Denn die Frage, <em>wer</em> spricht, ist im Islam nie nebensächlich gewesen.</p>

<h2 id="isnad">Die Besonderheit der Überlieferungskette</h2>
<p>ʿAbdullāh Ibn al-Mubārak sagte: <em>&bdquo;Die Überlieferungskette gehört zur Religion. Gäbe es sie
nicht, würde jeder sagen, was er will.&ldquo;</em> Diese Aussage beschreibt ein ganzes
Wissenschaftssystem. Über Jahrhunderte wurde nicht nur festgehalten, <em>was</em> gesagt wurde,
sondern auch, <em>von wem</em>, <em>an wen</em> und mit welcher Zuverlässigkeit.</p>

<h2 id="belege">Die textliche Grundlage</h2>
""" + ayah("﴿فَاسْأَلُوا أَهْلَ الذِّكْرِ إِن كُنتُمْ لَا تَعْلَمُونَ﴾",
           "&bdquo;So fragt die Leute der Ermahnung, wenn ihr nicht wisst.&ldquo;",
           "Sūrat an-Naḥl, 16:43") + """
""" + ayah("«إِنَّ الْعُلَمَاءَ وَرَثَةُ الْأَنْبِيَاءِ»",
           "&bdquo;Wahrlich, die Gelehrten sind die Erben der Propheten.&ldquo;",
           "Abū Dāwūd, Nr. 3641; at-Tirmiḏī, Nr. 2682", kind="hadith") + """
<p>Ein Erbe erhält man nicht durch Behauptung, sondern durch einen nachvollziehbaren Weg. Genau das
beschreibt der Ḥadīṯ: Wissen wird übergeben, nicht selbst erklärt.</p>

<h2 id="warnung">Die Warnung vor dem Verlust</h2>
<p>Der Prophet ﷺ beschrieb, wie Wissen verschwindet: nicht durch plötzliches Auslöschen, sondern
durch das Fortgehen der Gelehrten. Wenn keiner mehr da sei, so heißt es weiter, nähmen die Menschen
Unwissende zu Vorstehern, diese würden ohne Wissen gefragt, gäben Auskunft – und gingen selbst in
die Irre und führten andere in die Irre (al-Buḫārī, Nr. 100).</p>
<p>Der Ḥadīṯ beschreibt keinen Einzelfall. Er beschreibt einen Mechanismus, der sich wiederholt,
sobald Autorität von Wissen entkoppelt wird.</p>

<h2 id="heute">Was das heute bedeutet</h2>
<p>Soziale Medien belohnen Zuspitzung, Tempo und Sichtbarkeit. Wissenschaftliches Arbeiten belohnt
Genauigkeit, Zurückhaltung und Belege. Diese beiden Logiken stehen im Widerspruch. Daraus folgen
einige praktische Fragen, bevor man etwas übernimmt:</p>
<ul>
  <li>Bei wem hat diese Person gelernt, und über welchen Zeitraum?</li>
  <li>Nennt sie ihre Quellen – mit Werk, Band und Seite – oder nur Schlagworte?</li>
  <li>Sagt sie &bdquo;ich weiß es nicht&ldquo;, wenn sie etwas nicht weiß?</li>
  <li>Unterscheidet sie zwischen einer belegten Meinungsverschiedenheit und einer klaren Frage?</li>
  <li>Ruft sie zu Allah – oder zu sich selbst?</li>
</ul>

<h2 id="ausrede">Kein Freibrief für Passivität</h2>
<p>Aus all dem folgt nicht, dass ein Muslim schweigen muss, bis er Gelehrter ist. Der Prophet ﷺ
sagte: <em>&bdquo;Übermittelt von mir, und sei es einen einzigen Vers.&ldquo;</em> (al-Buḫārī, Nr. 3461) Die
Grenze verläuft zwischen <strong>Weitergeben</strong> und <strong>Urteilen</strong>. Wer eine
gelernte Sache korrekt weitergibt, handelt gut. Wer aus eigenem Ermessen Rechtsurteile fällt,
überschreitet seine Rolle.</p>

<h2 id="fazit">Schlussfolgerung</h2>
<p>Der Islam hat ein System entwickelt, das Wissen an Personen, Prüfung und Weitergabe bindet.
Dieses System ist kein Hindernis für den Zugang zu Wissen, sondern seine Absicherung. Wer lernt,
tut gut daran, sich an Menschen zu binden, die selbst gelernt haben – und wer weitergibt, tut gut
daran, die eigene Grenze zu kennen.</p>
""",
        "sources": [
            "Muslim, <em>aṣ-Ṣaḥīḥ</em>, Muqaddimah (Aussage Ibn al-Mubāraks).",
            "al-Buḫārī, <em>aṣ-Ṣaḥīḥ</em>, Nr. 100 und Nr. 3461.",
            "Abū Dāwūd, <em>as-Sunan</em>, Nr. 3641; at-Tirmiḏī, <em>as-Sunan</em>, Nr. 2682.",
            "al-Ḫaṭīb al-Baġdādī, <em>al-Ǧāmiʿ li-Aḫlāq ar-Rāwī</em>.",
        ],
    },
]

# ---------------------------------------------------------------- Kurse
COURSES = [
    {
        "slug": "arabische-grammatik-de",
        "title": "Arabische Grammatik",
        "lang": "de", "lang_label": "Deutsch",
        "level": "Grundstufe",
        "lessons": 18, "hours": 14,
        "price_eur": 89, "price_try": 3200,
        "teacher": "S. Eslem",
        "topics": ["Naḥw", "Ṣarf", "Iʿrāb"],
        "summary": "Von den Wortarten bis zur Satzanalyse: Der systematische Einstieg in die "
                   "Sprache des Qurʾān – ohne Vorkenntnisse.",
        "goal": "Nach diesem Kurs kannst du einfache arabische Sätze grammatikalisch bestimmen, "
                "die Endungen (<em>iʿrāb</em>) begründen und einen Grundtext mit Wörterbuch selbstständig erschließen.",
        "audience": ["Anfänger ohne Vorkenntnisse in der Grammatik",
                     "Geschwister, die den Qurʾān verstehen und nicht nur lesen möchten",
                     "Studierende, die vor einem Fiqh- oder ʿAqīdah-Kurs die Sprache festigen wollen"],
        "prereq": ["Sicheres Lesen der arabischen Schrift",
                   "Kein grammatikalisches Vorwissen nötig"],
        "learn": ["Die drei Wortarten und ihre Erkennungsmerkmale",
                  "Nominalsatz und Verbalsatz sicher unterscheiden",
                  "Die Fälle und ihre Zeichen – auch bei den Sonderformen",
                  "Verbformen, Zeiten und die abgeleiteten Stämme",
                  "Einen einfachen Text Wort für Wort analysieren"],
        "materials": ["18 Videolektionen in HD", "Zu jeder Lektion ein PDF-Lernblatt",
                      "Übungssätze mit Lösungen", "Begriffsglossar Arabisch–Deutsch"],
        "curriculum": [
            ("Einführung: Warum Grammatik?", ["Der Nutzen für Qurʾān und Sunnah", "Aufbau des Kurses", "Wie du lernst"], True),
            ("Die drei Wortarten", ["Ism, Fiʿl, Ḥarf", "Erkennungszeichen", "Übungen"], True),
            ("Der Nominalsatz", ["Mubtadaʾ und Ḫabar", "Übereinstimmung", "Häufige Fehler"], False),
            ("Der Verbalsatz", ["Fiʿl, Fāʿil, Mafʿūl", "Wortstellung", "Übungen"], False),
            ("Die Fälle (Iʿrāb)", ["Rafʿ, Naṣb, Ǧarr", "Sichtbare und geschätzte Zeichen", "Die fünf Nomen"], False),
            ("Das Verb im Detail", ["Māḍī, Muḍāriʿ, Amr", "Die zehn Stämme", "Übungen am Qurʾān"], False),
            ("Abschluss: Textanalyse", ["Ein Sūrah-Abschnitt Wort für Wort", "Selbstständig weiterarbeiten"], False),
        ],
    },
    {
        "slug": "arapca-gramer-tr",
        "title": "Arapça Gramer",
        "lang": "tr", "lang_label": "Türkçe",
        "level": "Başlangıç",
        "lessons": 18, "hours": 14,
        "price_eur": 89, "price_try": 3200,
        "teacher": "S. Eslem",
        "topics": ["Nahiv", "Sarf", "İrab"],
        "summary": "Kelime türlerinden cümle tahliline: Kurʾân dilinin sistemli girişi – ön bilgi gerekmez.",
        "goal": "Bu kurstan sonra basit Arapça cümleleri tahlil edebilir, kelime sonlarını (<em>irab</em>) "
                "gerekçelendirebilir ve temel bir metni sözlükle çözebilirsin.",
        "audience": ["Gramer bilgisi olmayan başlangıç seviyesi",
                     "Kurʾân'ı sadece okumak değil anlamak isteyenler",
                     "Fıkıh veya akide dersinden önce dili sağlamlaştırmak isteyenler"],
        "prereq": ["Arapça harfleri akıcı okuyabilmek", "Gramer ön bilgisi gerekmez"],
        "learn": ["Üç kelime türü ve alametleri", "İsim ve fiil cümlesini ayırt etmek",
                  "İrab halleri ve alametleri", "Fiil kalıpları ve zamanlar",
                  "Basit bir metni kelime kelime tahlil etmek"],
        "materials": ["18 HD video ders", "Her ders için PDF özet", "Çözümlü alıştırmalar",
                      "Arapça–Türkçe terim sözlüğü"],
        "curriculum": [
            ("Giriş: Gramer neden?", ["Kurʾân ve sünnet için faydası", "Kurs yapısı", "Nasıl çalışmalı"], True),
            ("Üç kelime türü", ["İsim, fiil, harf", "Alametler", "Alıştırmalar"], True),
            ("İsim cümlesi", ["Mübteda ve haber", "Uyum", "Sık yapılan hatalar"], False),
            ("Fiil cümlesi", ["Fiil, fail, mefûl", "Kelime sırası", "Alıştırmalar"], False),
            ("İrab halleri", ["Ref, nasb, cer", "Zahir ve mukadder alametler", "Esmâ-i hamse"], False),
            ("Fiilin detayı", ["Mazi, muzari, emir", "On bab", "Kurʾân'dan alıştırmalar"], False),
            ("Bitiriş: Metin tahlili", ["Bir sure bölümü kelime kelime", "Kendi başına devam etmek"], False),
        ],
    },
    {
        "slug": "aqidah-grundlagen-de",
        "title": "ʿAqīdah – Die Grundlagen",
        "lang": "de", "lang_label": "Deutsch",
        "level": "Grundstufe",
        "lessons": 14, "hours": 11,
        "price_eur": 79, "price_try": 2800,
        "teacher": "S. Eslem",
        "topics": ["Tawḥīd", "Īmān", "Qadar"],
        "summary": "Die sechs Säulen des Īmān, der Tawḥīd in seinen drei Bereichen und die Fragen, "
                   "die dabei am häufigsten offen bleiben.",
        "goal": "Nach diesem Kurs kennst du die Glaubensgrundlagen mit ihren Belegen, kannst zwischen "
                "Tawḥīd und Širk sicher unterscheiden und weißt, wie mit Zweifeln umzugehen ist.",
        "audience": ["Muslime, die ihren Glauben mit Belegen verstehen wollen",
                     "Neu zum Islam gekommene Geschwister",
                     "Alle, die in der Daʿwah aktiv sind"],
        "prereq": ["Keine Vorkenntnisse nötig", "Arabischkenntnisse hilfreich, aber nicht erforderlich"],
        "learn": ["Die drei Bereiche des Tawḥīd", "Die sechs Säulen des Īmān mit Belegen",
                  "Was den Tawḥīd bricht und was nicht", "Der Umgang mit Zweifeln (šubuhāt)",
                  "Qaḍāʾ und Qadar verständlich erklärt"],
        "materials": ["14 Videolektionen", "PDF-Lernblätter zu jeder Lektion",
                      "Belegsammlung Qurʾān & Sunnah", "Wiederholungsfragen"],
        "curriculum": [
            ("Einführung in die ʿAqīdah", ["Was bedeutet ʿAqīdah?", "Quellen und Methode", "Warum zuerst?"], True),
            ("Tawḥīd ar-Rubūbiyyah", ["Belege", "Das Verständnis der Quraysh", "Missverständnisse"], True),
            ("Tawḥīd al-Ulūhiyyah", ["Was ist Anbetung?", "Lā ilāha illā-llāh", "Bedingungen"], False),
            ("Namen und Eigenschaften", ["Die Methode der Salaf", "Vier Grundregeln", "Häufige Fehler"], False),
            ("Die sechs Säulen des Īmān", ["Ḥadīṯ Ǧibrīl", "Jede Säule mit Belegen", "Zusammenhänge"], False),
            ("Širk und seine Formen", ["Groß, klein, verborgen", "Abgrenzungen", "Der Umgang damit"], False),
            ("Qaḍāʾ und Qadar", ["Die vier Stufen", "Freier Wille", "Antworten auf Einwände"], False),
        ],
    },
    {
        "slug": "tajwid-de",
        "title": "Tajwīd – Der Qurʾān richtig gelesen",
        "lang": "de", "lang_label": "Deutsch",
        "level": "Grundstufe",
        "lessons": 12, "hours": 8,
        "price_eur": 69, "price_try": 2400,
        "teacher": "A. Sirac",
        "topics": ["Maḫāriǧ", "Ṣifāt", "Aḥkām"],
        "summary": "Buchstabe für Buchstabe zur korrekten Rezitation – mit Hörbeispielen zu jeder Regel.",
        "goal": "Nach diesem Kurs liest du den Qurʾān mit korrekten Austrittsstellen, erkennst die "
                "wichtigsten Regeln im Muṣḥaf und kannst deine eigene Rezitation prüfen.",
        "audience": ["Alle, die den Qurʾān lesen können, aber unsicher in den Regeln sind",
                     "Eltern, die ihre Kinder begleiten wollen", "Vorbeter und Vorbeterinnen im Alltag"],
        "prereq": ["Arabische Schrift flüssig lesen können"],
        "learn": ["Die Austrittsstellen der Buchstaben (maḫāriǧ)", "Eigenschaften der Buchstaben (ṣifāt)",
                  "Nūn sākinah, Tanwīn und Mīm sākinah", "Madd-Regeln und ihre Längen",
                  "Häufige Fehler und wie man sie abstellt"],
        "materials": ["12 Videolektionen mit Hörbeispielen", "PDF-Regelübersichten",
                      "Übungsseiten aus dem Muṣḥaf", "Selbstkontrolle-Checkliste"],
        "curriculum": [
            ("Einführung in den Tajwīd", ["Das Urteil über Tajwīd", "Aufbau des Kurses"], True),
            ("Die Austrittsstellen", ["Die fünf Hauptbereiche", "Buchstabe für Buchstabe", "Übungen"], True),
            ("Eigenschaften der Buchstaben", ["Gegensatzpaare", "Eigenständige Ṣifāt"], False),
            ("Nūn sākinah und Tanwīn", ["Iẓhār, Idġām, Iqlāb, Iḫfāʾ", "Erkennen im Muṣḥaf"], False),
            ("Mīm sākinah und Madd", ["Die drei Regeln", "Madd-Arten und Längen"], False),
            ("Praxis und Fehlerkorrektur", ["Häufige Fehler", "Eigene Aufnahme prüfen"], False),
        ],
    },
]

PACKAGES = [
    {"slug": "paket-de", "title": "Deutsches Gesamtpaket", "lang_label": "Deutsch",
     "price_eur": 199, "price_try": 7200,
     "includes": ["arabische-grammatik-de", "aqidah-grundlagen-de", "tajwid-de"],
     "note": "Alle deutschsprachigen Kurse – dauerhafter Zugang, alle künftigen Lektionen dieser Kurse inklusive."},
    {"slug": "paket-tr", "title": "Türkisches Gesamtpaket", "lang_label": "Türkçe",
     "price_eur": 149, "price_try": 5400,
     "includes": ["arapca-gramer-tr"],
     "note": "Alle türkischsprachigen Kurse. Weitere Kurse werden laufend ergänzt und sind im Paket enthalten."},
]

# ---------------------------------------------------------------- Frage & Antwort
QA_CATEGORIES = ["ʿAqīdah", "Fiqh", "Gebet", "Fasten", "Ehe & Familie", "Handel", "Daʿwah",
                 "Allgemeine islamische Fragen"]

QA_PUBLIC = [
    {"cat": "Gebet", "q": "Ich arbeite im Schichtdienst und verpasse regelmäßig das ʿAṣr-Gebet. Was soll ich tun?",
     "a": "Das Gebet zu seiner Zeit zu verrichten ist Pflicht, solange keine echte Verhinderung vorliegt. "
          "Prüfe zuerst, ob eine kurze Unterbrechung möglich ist – in Deutschland besteht darauf in der Regel "
          "ein Anspruch im Rahmen der Pausenregelung. Ist das nachweislich unmöglich, wird das Gebet "
          "unmittelbar nach Ende der Verhinderung nachgeholt (<em>qaḍāʾ</em>), ohne dass eine Sünde vorliegt. "
          "Eine dauerhafte Lösung – Schichttausch, Absprache mit dem Arbeitgeber – bleibt aber das Ziel.",
     "date": "2025-06-02"},
    {"cat": "Ṭahārah", "q": "Bricht das Berühren des Ehepartners den Wuḍūʾ?",
     "a": "Auch hier unterscheiden sich die Rechtsschulen. Nach der Šāfiʿiyyah bricht die direkte Hautberührung "
          "zwischen Mann und Frau den Wuḍūʾ. Nach der Ḥanafiyyah tut sie das nicht, solange nichts weiter "
          "hinzukommt. Die Mālikiyyah und Ḥanbaliyyah machen es von Begleitumständen abhängig. "
          "Folge der Schule, nach der du lernst – alle vier Positionen sind belegt.",
     "date": "2025-05-21"},
    {"cat": "Ehe & Familie", "q": "Meine Eltern sind gegen meine Heiratsabsicht, obwohl es keinen "
                                 "religiösen Einwand gibt. Muss ich gehorchen?",
     "a": "Den Eltern gebührt Güte und Respekt (<em>birr</em>), doch Gehorsam ist nicht unbegrenzt: Er gilt "
          "nicht dort, wo etwas Verbotenes verlangt oder ein Recht verweigert wird. Wenn der Antrag "
          "religiös und charakterlich einwandfrei ist, dürfen Eltern die Heirat nicht grundlos blockieren. "
          "Der Weg führt über Geduld, Gespräch und die Einbeziehung einer vermittelnden Person aus der "
          "Familie oder Gemeinde. Diese Frage sollte wegen ihrer Umstände persönlich geklärt werden – "
          "stelle sie gerne vertraulich.",
     "date": "2025-04-30"},
    {"cat": "Handel", "q": "Ist ein Ratenkauf mit Aufschlag erlaubt?",
     "a": "Ja, nach der Mehrheit der Gelehrten ist ein höherer Preis bei Ratenzahlung als beim Barkauf "
          "zulässig, sofern der Gesamtpreis <strong>beim Vertragsabschluss feststeht</strong> und sich "
          "danach nicht erhöht. Unzulässig wird es, wenn bei Verzug ein Zuschlag anfällt – das ist Ribā. "
          "Prüfe den Vertrag daher gezielt auf Verzugszinsen und Gebühren bei später Zahlung.",
     "date": "2025-03-17"},
    {"cat": "Daʿwah", "q": "Wie spreche ich Kollegen über den Islam an, ohne aufdringlich zu wirken?",
     "a": "Der wirksamste Anfang ist die eigene Verlässlichkeit: Pünktlichkeit, Ehrlichkeit, Freundlichkeit. "
          "Der Prophet ﷺ war in Makka als <em>al-Amīn</em> bekannt, bevor er als Prophet bekannt war. "
          "Warte auf echte Fragen statt Gespräche zu erzwingen, antworte knapp und ehrlich, und sage "
          "&bdquo;das weiß ich nicht, ich frage nach&ldquo;, wenn du es nicht weißt. Ein einziges gehaltenes Versprechen "
          "wirkt oft stärker als ein langes Gespräch.",
     "date": "2025-02-08"},
    {"cat": "ʿAqīdah", "q": "Ich habe aufdringliche Zweifel am Glauben und Angst, dadurch ungläubig zu werden.",
     "a": "Aufdringliche Gedanken (<em>waswasah</em>), die dich belasten und die du ablehnst, schaden deinem "
          "Īmān nicht – im Gegenteil: Dass sie dich beunruhigen, ist selbst ein Zeichen von Īmān. Die "
          "Gefährten kamen mit genau dieser Sorge zum Propheten ﷺ, und er antwortete: &bdquo;Das ist deutlicher "
          "Glaube.&ldquo; (Muslim, Nr. 132) Die Anweisung lautet, sich nicht in die Gedanken hineinzudenken, "
          "Zuflucht bei Allah zu suchen und weiterzumachen. Diskutiere nicht mit den Einflüsterungen – "
          "wende dich ab und lerne stattdessen strukturiert.",
     "date": "2025-01-19"},
]

# ---------------------------------------------------------------- Team
TEAM = [
    {"name": "A. Sirac", "initials": "AS", "role": "Daʿwah & Inhalte",
     "bio": "Beschäftigt sich seit mehreren Jahren mit den islamischen Wissenschaften und hat "
            "bei verschiedenen Lehrern Unterricht genommen.",
     "focus": ["Sīrah und islamische Geschichte", "Aufklärung von Zweifeln", "Tajwīd"]},
    {"name": "S. Eslem", "initials": "SE", "role": "Unterricht & Fatwā-Recherche",
     "bio": "Hat einen mehrjährigen strukturierten Studienweg in verschiedenen islamischen "
            "Wissenschaften absolviert und Iǧāzāt von verschiedenen Lehrern erhalten.",
     "focus": ["ʿAqīdah", "Fiqh und Uṣūl al-Fiqh", "Arabische Sprache"]},
    {"name": "M. Selman", "initials": "MS", "role": "Plattform & Organisation",
     "bio": "Beschäftigt sich seit mehreren Jahren mit den islamischen Wissenschaften und "
            "verantwortet die technische und organisatorische Seite von Hidayah.",
     "focus": ["Wissensarchiv und Struktur", "Digitale Daʿwah", "Kursproduktion"]},
]
