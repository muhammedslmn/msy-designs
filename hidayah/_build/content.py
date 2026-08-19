# -*- coding: utf-8 -*-
"""Inhalte für hidayah.  Alles hier ist Klartext und kann direkt bearbeitet werden."""

SITE = {
    "name": "Hidayah",
    "slogan": "Auf der Suche nach Licht in einer Welt voller Dunkelheit.",
    "tagline": "Islamisches Wissen. Dawah. Orientierung.",
    "url": "https://hidayah.de",
    "email": "salam@hidayah.de",
    "instagram": "https://instagram.com/hidayah",
    "youtube": "https://youtube.com/@hidayah",
    "x": "https://x.com/hidayah",
    # Formspree o. Ä. – ID eintragen, dann versenden die Formulare echte E-Mails.
    "form_endpoint": "https://formspree.io/f/DEINE-FORM-ID",
    # Vorstellungsvideo auf der Startseite. Leer = Bereich wird ausgeblendet.
    "intro_video": "",
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
    ("aqidah", "Aqidah"), ("tawhid", "Tawhid"), ("shirk", "Shirk"), ("iman", "Iman"),
    ("fiqh", "Fiqh"), ("taharah", "Taharah"), ("salah", "Salah"), ("zakah", "Zakah"),
    ("sawm", "Sawm"), ("hajj", "Hajj"), ("ehe", "Ehe"), ("handel", "Handel"),
    ("hadith", "Hadith"), ("quran", "Quran"), ("sirah", "Sirah"), ("dawah", "Dawah"),
    ("familie", "Familie"), ("tazkiyah", "Tazkiyah"), ("geschichte", "Islamische Geschichte"),
    ("bidah", "Bidah"), ("sunnah", "Sunnah"),
]

MADHAHIB = [("hanafi", "Hanafi"), ("maliki", "Maliki"), ("shafii", "Shafii"), ("hanbali", "Hanbali")]


def ayah(ar, de, src, kind="ayah"):
    cls = "ayah hadith" if kind == "hadith" else "ayah"
    return (f'<figure class="{cls}"><p class="ayah__ar" lang="ar" dir="rtl">{ar}</p>'
            f'<p class="ayah__de">{de}</p><figcaption class="ayah__src">{src}</figcaption></figure>')


# ---------------------------------------------------------------- Artikel
ARTICLES = [
    {
        "slug": "was-bedeutet-tawhid",
        "title": "Was bedeutet Tawhid?",
        "series": "terminologie",
        "topics": ["tawhid", "aqidah", "iman"],
        "author": "S. Eslem",
        "date": "2025-02-14",
        "reading": 9,
        "video": "",   # Video-URL eintragen -> Videobereich erscheint automatisch
        "summary": "Tawhid ist die Grundlage des Islam und die Botschaft aller Propheten. "
                   "Dieser Artikel erklärt, was das Wort bedeutet, wie die Gelehrten es aufgeteilt haben "
                   "und warum es der Ausgangspunkt jedes weiteren Wissens ist.",
        "body": """
<p>Kein Begriff steht im Islam so sehr im Zentrum wie <strong>Tawhid</strong>. Er ist der Inhalt des
ersten Satzes, den ein Mensch spricht, wenn er den Islam annimmt, und der letzte Satz, den ein
Muslim sich wünscht auszusprechen, bevor er stirbt. Alles Weitere – Gebet, Fasten, Ethik, Recht –
baut darauf auf.</p>

<h2 id="wortbedeutung">Die Wortbedeutung</h2>
<p>Sprachlich stammt <em>Tawhid</em> (تَوْحِيد) von der Wurzel <em>w-h-d</em>, die &bdquo;eins sein&ldquo; bedeutet.
Die Form <em>tawhid</em> ist ein Verbalnomen und trägt die Bedeutung: <strong>etwas als eins
erklären, etwas für einzig halten</strong>. Es geht also nicht bloß um die Feststellung, dass Allah
einer ist – das bestritten selbst die Götzendiener Makkas nicht –, sondern darum, Ihn in dem, was
Ihm allein zusteht, auch tatsächlich einzig zu machen.</p>

<h2 id="kern">Der Kern: Anbetung ist Sein Recht</h2>
<p>Der Quran nennt den Zweck der Erschaffung von Jinn und Menschen unmissverständlich:</p>
""" + ayah("﴿وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ﴾",
           "&bdquo;Und Ich habe die Jinn und die Menschen nur erschaffen, damit sie Mir dienen.&ldquo;",
           "Surat adh-Dhariyat, 51:56") + """
<p>Die Botschaft jedes Propheten war im Kern dieselbe. Nuh, Hud, Salih, Shuayb – der Quran
wiederholt ihren Aufruf beinahe wortgleich: <em>&bdquo;O mein Volk, dient Allah! Ihr habt keinen anderen
Gott als Ihn.&ldquo;</em> Die Sendungen unterschieden sich in ihren Gesetzen, nicht in ihrem Fundament.</p>

<h2 id="einteilung">Die Einteilung der Gelehrten</h2>
<p>Um den Begriff lehrbar zu machen, haben die Gelehrten den Tawhid in drei Bereiche gegliedert.
Diese Einteilung ist ein <em>didaktisches Hilfsmittel</em>, das sich aus den Texten ableitet – kein
zusätzlicher Glaubensinhalt.</p>
<h3 id="rububiyyah">1. Tawhid ar-Rububiyyah – die Einzigkeit in der Herrschaft</h3>
<p>Allah allein erschafft, versorgt, belebt, lässt sterben und lenkt die Angelegenheiten. Niemand
teilt mit Ihm die Herrschaft über die Schöpfung. Bemerkenswert ist: Die Araber zur Zeit des
Propheten ﷺ erkannten dies bereits an. Fragte man sie, wer Himmel und Erde erschaffen habe,
antworteten sie: &bdquo;Allah.&ldquo; Dieses Bekenntnis allein machte sie jedoch nicht zu Muslimen.</p>
<h3 id="uluhiyyah">2. Tawhid al-Uluhiyyah – die Einzigkeit in der Anbetung</h3>
<p>Hier lag der eigentliche Streitpunkt. Anbetung – Bittgebet, Gelübde, Opfer, Vertrauen, Furcht,
Hoffnung – darf ausschließlich Allah gewidmet werden. Wer eine dieser Handlungen einem anderen
zuwendet, hat den Tawhid verletzt, auch wenn er die Schöpferschaft Allahs anerkennt. Genau das
meint das Zeugnis <em>la ilaha illa-llah</em>: &bdquo;Es gibt keinen, der mit Recht angebetet wird,
außer Allah.&ldquo;</p>
<h3 id="asma">3. Tawhid al-Asma wa-s-Sifat – die Einzigkeit in Namen und Eigenschaften</h3>
<p>Allah wird mit dem beschrieben, womit Er sich selbst beschrieben hat und womit Sein Gesandter ﷺ
Ihn beschrieben hat – ohne Entstellung, ohne Leugnung, ohne Verbildlichung und ohne Vergleich mit
der Schöpfung. Der Maßstab bleibt Sein eigenes Wort:</p>
""" + ayah("﴿لَيْسَ كَمِثْلِهِ شَيْءٌ ۖ وَهُوَ السَّمِيعُ الْبَصِيرُ﴾",
           "&bdquo;Nichts ist Ihm gleich, und Er ist der Allhörende, der Allsehende.&ldquo;",
           "Surat ash-Shura, 42:11") + """

<h2 id="folgen">Warum das praktisch alles verändert</h2>
<p>Tawhid ist keine abstrakte Theorie. Wer verinnerlicht, dass Nutzen und Schaden allein bei Allah
liegen, dessen Verhältnis zu Menschen, Angst, Besitz und Zukunft verändert sich. Er bittet den, der
geben kann. Er fürchtet den, der wirklich Macht hat. Er richtet sein Herz auf einen Punkt aus statt
auf hundert.</p>
<p>Deshalb verbrachte der Prophet ﷺ dreizehn Jahre in Makka überwiegend damit, den Tawhid zu
festigen, bevor die meisten detaillierten Gesetze überhaupt offenbart wurden. Wer beim Fundament
spart, dem hilft das Dach wenig.</p>

<h2 id="gegenteil">Das Gegenteil: Shirk</h2>
<p>Der Gegenbegriff zum Tawhid ist <a href="/artikel/was-ist-shirk.html">Shirk</a> – Allah in dem,
was Ihm allein zusteht, jemanden beizugesellen. Der Quran stellt ihn als einzige Sünde dar, die
ohne Reue nicht vergeben wird:</p>
""" + ayah("﴿إِنَّ اللَّهَ لَا يَغْفِرُ أَن يُشْرَكَ بِهِ وَيَغْفِرُ مَا دُونَ ذَٰلِكَ لِمَن يَشَاءُ﴾",
           "&bdquo;Gewiss, Allah vergibt nicht, dass Ihm etwas beigesellt wird. Doch was darunter liegt, "
           "vergibt Er, wem Er will.&ldquo;",
           "Surat an-Nisa, 4:48") + """

<h2 id="fazit">Schlussfolgerung</h2>
<p>Tawhid bedeutet, Allah in Seiner Herrschaft, in Seiner Anbetung und in Seinen Namen und
Eigenschaften einzig zu machen. Er ist der Ausgangspunkt des Islam, das Ziel der Dawah und der
Maßstab, an dem sich jede weitere Frage ausrichtet. Wer hier Klarheit gewinnt, dem ordnet sich
vieles andere von selbst.</p>
""",
        "sources": [
            "al-Bukhari, <em>as-Sahih</em>, Kitab at-Tawhid.",
            "Muslim, <em>as-Sahih</em>, Kitab al-Iman, Nr. 8 (Hadith Jibril).",
            "Ibn Taymiyyah, <em>al-Aqidah al-Wasitiyyah</em>.",
            "Ibn Kathir, <em>Tafsir al-Quran al-Azim</em>, zu 51:56 und 4:48.",
        ],
    },
    {
        "slug": "was-ist-shirk",
        "title": "Was ist Shirk – und wo beginnt er?",
        "series": "terminologie",
        "topics": ["shirk", "aqidah", "tawhid"],
        "author": "S. Eslem",
        "date": "2025-03-02",
        "reading": 8,
        "video": "",   # Video-URL eintragen -> Videobereich erscheint automatisch
        "summary": "Shirk wird oft auf Götzenstatuen reduziert. Tatsächlich beschreibt der Begriff jede "
                   "Zuwendung von Anbetung an anderes als Allah – und er hat Formen, die leicht übersehen werden.",
        "body": """
<p>Wer <strong>Shirk</strong> nur mit steinernen Götzen verbindet, hält ihn für ein Problem
vergangener Völker. Der Quran und die Sunnah behandeln ihn dagegen als eine Gefahr, vor der auch
Propheten Zuflucht suchten. Ibrahim ﷺ – der Vater der Propheten – betete:</p>
""" + ayah("﴿وَاجْنُبْنِي وَبَنِيَّ أَن نَّعْبُدَ الْأَصْنَامَ﴾",
           "&bdquo;Und bewahre mich und meine Kinder davor, Götzen zu dienen.&ldquo;",
           "Surat Ibrahim, 14:35") + """
<p>Wenn Ibrahim ﷺ um Bewahrung bat, ist niemand nach ihm davon ausgenommen, sich damit
auseinanderzusetzen.</p>

<h2 id="definition">Die Definition</h2>
<p>Sprachlich bedeutet <em>shirk</em> &bdquo;Teilhaberschaft&ldquo;. In der Terminologie: <strong>einem anderen
neben Allah etwas zuzuschreiben oder zuzuwenden, was allein Allah zusteht</strong> – sei es in
Seiner Herrschaft, in Seiner Anbetung oder in Seinen Namen und Eigenschaften.</p>

<h2 id="akbar">Großer Shirk (ash-shirk al-akbar)</h2>
<p>Er führt aus dem Islam heraus und macht Taten zunichte. Dazu zählt etwa:</p>
<ul>
  <li>ein Bittgebet an einen Verstorbenen, einen Propheten oder einen &bdquo;Heiligen&ldquo; zu richten,</li>
  <li>ein Opfer oder Gelübde für anderes als Allah darzubringen,</li>
  <li>einem Geschöpf jene Furcht, Hoffnung oder jenes Vertrauen entgegenzubringen, das nur Allah
      gebührt,</li>
  <li>zu glauben, ein Geschöpf könne unabhängig von Allah Nutzen oder Schaden bewirken.</li>
</ul>

<h2 id="asghar">Kleiner Shirk (ash-shirk al-asghar)</h2>
<p>Er führt nicht aus dem Islam heraus, ist aber schwerwiegender als jede große Sünde. Am
bekanntesten ist <em>ar-riya</em>: eine gottesdienstliche Handlung zu verrichten, damit Menschen
sie sehen. Der Prophet ﷺ nannte ihn den &bdquo;kleineren Beigesellungsdienst&ldquo; und warnte seine
Gefährten ausdrücklich davor – gerade weil er unauffällig ist.</p>
<p>Ebenso gehört dazu, bei anderem als Allah zu schwören, oder Formulierungen zu gebrauchen, die
ein Geschöpf auf eine Stufe mit Allah stellen (&bdquo;Was Allah will und was du willst&ldquo; statt &bdquo;Was Allah
will, dann was du willst&ldquo;).</p>

<h2 id="khafi">Verborgener Shirk</h2>
<p>Damit ist die feine Regung im Herzen gemeint: eine Tat ein wenig schöner zu verrichten, weil
jemand zusieht. Die Gelehrten der Tazkiyah haben ihm ganze Kapitel gewidmet, weil er niemanden
verschont, der sich nicht prüft.</p>

<h2 id="abgrenzung">Wichtige Abgrenzungen</h2>
<p>Nicht alles, was auf den ersten Blick danach aussieht, ist Shirk:</p>
<ul>
  <li>Einen <em>lebenden, anwesenden</em> Menschen um etwas zu bitten, wozu er tatsächlich in der
      Lage ist, ist erlaubt und alltäglich.</li>
  <li>Ursachen zu ergreifen – Medizin, Arbeit, Vorsorge – ist Sunnah, solange man weiß, dass die
      Wirkung von Allah kommt.</li>
  <li>Einen Gelehrten zu respektieren und von ihm zu lernen ist geboten; ihn für unfehlbar zu
      halten, ist es nicht.</li>
</ul>
<p>Ebenso wichtig: <strong>Die Feststellung, dass eine Handlung Shirk ist, ist etwas anderes als das
Urteil über eine bestimmte Person.</strong> Letzteres (<em>takfir al-muayyan</em>) hat Bedingungen
und Hindernisse und ist Aufgabe der Gelehrten, nicht des Einzelnen. Wer diesen Unterschied
übergeht, richtet mehr Schaden an, als er behebt.</p>

<h2 id="fazit">Schlussfolgerung</h2>
<p>Shirk ist nicht nur ein historisches Phänomen, sondern eine Frage der Ausrichtung des Herzens.
Der Schutz davor liegt im Wissen, im aufrichtigen Bittgebet und in der ständigen Prüfung der
eigenen Absicht.</p>
""",
        "sources": [
            "Muslim, <em>as-Sahih</em>, Kitab az-Zuhd, Nr. 2985 (zu ar-riya).",
            "Ahmad, <em>al-Musnad</em>, Nr. 23630 (ash-shirk al-asghar).",
            "Ibn Rajab al-Hanbali, <em>Jami al-Ulum wa-l-Hikam</em>.",
            "at-Tabari, <em>Jami al-Bayan</em>, zu 14:35.",
        ],
    },
    {
        "slug": "was-ist-bidah",
        "title": "Bidah – was ist damit gemeint?",
        "series": "terminologie",
        "topics": ["bidah", "sunnah", "aqidah"],
        "author": "A. Sirac",
        "date": "2025-04-08",
        "reading": 7,
        "video": "",   # Video-URL eintragen -> Videobereich erscheint automatisch
        "summary": "Der Begriff Bidah wird häufig zu weit oder zu eng verwendet. Ein Blick auf die "
                   "Definition der Gelehrten – und auf die Grenze zwischen religiöser Neuerung und "
                   "alltäglicher Entwicklung.",
        "body": """
<p>Wenige Begriffe werden so oft im Streitgespräch gebraucht und so selten definiert wie
<strong>Bidah</strong>. Dabei ist eine saubere Definition der halbe Weg zur Antwort.</p>

<h2 id="definition">Sprachlich und fachlich</h2>
<p>Sprachlich ist <em>bidah</em> alles Neuartige, das ohne Vorbild entsteht. In diesem allgemeinen
Sinn ist ein Auto eine Bidah – und niemand behauptet, Autofahren sei verboten.</p>
<p>Fachlich haben die Gelehrten den Begriff enger gefasst. ash-Shatibi definiert ihn als
<em>&bdquo;einen erdachten Weg in der Religion, der der Shariah nachgebildet ist und mit dem beabsichtigt
wird, was mit dem vorgeschriebenen Weg beabsichtigt wird&ldquo;</em>. Entscheidend sind also zwei
Merkmale: Es geht um die <strong>Religion</strong>, und es wird damit <strong>Annäherung an
Allah</strong> bezweckt.</p>

<h2 id="grundregel">Die Grundregel im Ibadat-Bereich</h2>
<p>Bei gottesdienstlichen Handlungen gilt: <em>Das Grundprinzip ist die Unterlassung, bis ein Beleg
kommt.</em> Bei weltlichen Angelegenheiten gilt das Umgekehrte: <em>Das Grundprinzip ist die
Erlaubnis, bis ein Verbot kommt.</em> Aus diesem Unterschied erklärt sich das meiste.</p>
<p>Die Grundlage bildet die bekannte Überlieferung:</p>
""" + ayah("«مَنْ أَحْدَثَ فِي أَمْرِنَا هَذَا مَا لَيْسَ مِنْهُ فَهُوَ رَدٌّ»",
           "&bdquo;Wer in dieser unserer Angelegenheit etwas Neues einführt, das nicht dazugehört, "
           "dessen Tat ist zurückgewiesen.&ldquo;",
           "al-Bukhari, Nr. 2697; Muslim, Nr. 1718", kind="hadith") + """
<p>Der Wortlaut &bdquo;in dieser unserer Angelegenheit&ldquo; verweist auf die Religion, nicht auf Technik,
Verwaltung oder Sprache.</p>

<h2 id="mittel">Mittel und Zweck unterscheiden</h2>
<p>Viele Missverständnisse lösen sich, wenn man <em>Zwecke</em> von <em>Mitteln</em> trennt. Der
Quran in einem gedruckten Band, Unterricht in einem Klassenzimmer, ein Lautsprecher für den Adhan,
eine Website für Dawah – all das sind Mittel, für die es keinen eigenen Beleg braucht. Eine neu
erfundene Gebetsform, ein zusätzlich vorgeschriebener Gedenktag mit gottesdienstlichem Charakter
oder eine festgelegte Anzahl von Wiederholungen ohne Beleg berühren dagegen den Zweckbereich.</p>

<h2 id="hasanah">Und &bdquo;bidah hasanah&ldquo;?</h2>
<p>Die Aussage Umars ﷺ zum gemeinsamen Tarawih-Gebet – <em>&bdquo;Welch schöne Bidah ist dies&ldquo;</em> –
wird oft angeführt. Die Gelehrten erklären sie überwiegend im <strong>sprachlichen</strong> Sinn:
Der Prophet ﷺ hatte dieses Gebet selbst in Gemeinschaft verrichtet und es nur aus Sorge unterlassen,
es könnte zur Pflicht werden. Umar führte also nichts Neues ein, sondern belebte etwas Belegtes
wieder. Wer den Ausdruck dagegen als Freibrief für beliebige Zusätze liest, weitet ihn über das
hinaus, was der Kontext trägt.</p>

<h2 id="haltung">Die Haltung in der Praxis</h2>
<p>Wissen über Bidah ist dazu da, die eigene Anbetung zu reinigen – nicht, um ein Werkzeug gegen
andere Muslime zu werden. Die frühen Gelehrten waren streng in der Sache und maßvoll im Umgang.
Wer eine Frage nicht sicher beurteilen kann, fragt jemanden, der es kann. Das ist keine Schwäche,
sondern die vorgeschriebene Methode.</p>

<h2 id="fazit">Schlussfolgerung</h2>
<p>Bidah meint eine erdachte Neuerung <em>in der Religion</em>, mit der Annäherung an Allah
bezweckt wird. Neue Mittel, Techniken und Organisationsformen fallen nicht darunter. Die
Unterscheidung von Zweck und Mittel – und die Rückkehr zu den Gelehrten in Zweifelsfällen – löst
die meisten Streitfragen.</p>
""",
        "sources": [
            "ash-Shatibi, <em>al-Itisam</em>, Bd. 1.",
            "al-Bukhari, <em>as-Sahih</em>, Nr. 2697; Muslim, <em>as-Sahih</em>, Nr. 1718.",
            "Ibn Rajab, <em>Jami al-Ulum wa-l-Hikam</em>, Hadith 5.",
            "an-Nawawi, <em>Sharh Sahih Muslim</em>, zu Nr. 1718.",
        ],
    },
    {
        "slug": "blut-und-wudu",
        "title": "Bricht Blut den Wudu?",
        "series": "fiqh",
        "topics": ["fiqh", "taharah", "salah"],
        "madhhab": ["hanafi", "shafii"],
        "author": "S. Eslem",
        "date": "2025-05-19",
        "reading": 6,
        "video": "",   # Video-URL eintragen -> Videobereich erscheint automatisch
        "summary": "Eine klassische Frage, bei der die Rechtsschulen unterschiedlich urteilen. Der Artikel "
                   "stellt die Belege beider Seiten dar und zeigt, wie man in der Praxis damit umgeht.",
        "body": """
<p>Die Frage klingt klein und begegnet doch fast jedem: Man schneidet sich beim Kochen, die Nase
blutet, das Zahnfleisch blutet beim Zähneputzen – <strong>muss man den Wudu erneuern?</strong></p>
<p>Vorab zwei Dinge. Erstens: Diese Frage gehört zu den anerkannten Meinungsverschiedenheiten
(<em>ikhtilaf mutabar</em>) zwischen den Rechtsschulen. Zweitens: Wer einer der vier Schulen folgt,
handelt richtig – niemand muss sich hier für &bdquo;die eine wahre Antwort&ldquo; rechtfertigen.</p>

<h2 id="grundlage">Die Grundlage</h2>
""" + ayah("«لَا يَقْبَلُ اللَّهُ صَلَاةَ أَحَدِكُمْ إِذَا أَحْدَثَ حَتَّى يَتَوَضَّأَ»",
           "&bdquo;Allah nimmt das Gebet eines von euch nicht an, wenn er einen Zustand der rituellen "
           "Unreinheit hat, bis er den Wudu verrichtet.&ldquo;",
           "al-Bukhari, Nr. 135; Muslim, Nr. 225", kind="hadith") + """
<p>Der Text steht fest. Die Meinungsverschiedenheit betrifft die Frage, <em>was</em> genau als
solcher Zustand gilt.</p>

<h2 id="hanafi">Die hanafitische Position</h2>
<p>Nach der Hanafiyyah bricht austretendes Blut den Wudu, wenn es <strong>fließt</strong>, also
über die Wundstelle hinausläuft. Ein Tropfen, der stehen bleibt und nur abgewischt wird, bricht ihn
nicht. Begründet wird dies unter anderem mit Überlieferungen zum Schröpfen (<em>hijamah</em>) und
mit Aussagen von Gefährten wie Ibn Umar und Ibn Abbas.</p>
<p>Praktisch heißt das: Nasenbluten, das läuft, erfordert eine Erneuerung; ein kleiner Kratzer, den
man abtupft, nicht.</p>

<h2 id="shafii">Die shafiitische und malikitische Position</h2>
<p>Nach der Shafiiyyah und der Malikiyyah bricht Blut, das nicht aus den beiden üblichen
Körperöffnungen austritt, den Wudu <strong>nicht</strong> – unabhängig von der Menge. Angeführt
wird unter anderem der Bericht über den Gefährten, der während des Nachtgebets von einem Pfeil
getroffen wurde, weiterblutete und sein Gebet fortsetzte, ohne es zu wiederholen. Ebenso wird
argumentiert, dass es keinen eindeutigen Text gibt, der Blut allgemein als Wudu-brechend benennt –
und im Ibadat-Bereich braucht eine zusätzliche Verpflichtung einen Beleg.</p>

<h2 id="hanbali">Die hanbalitische Position</h2>
<p>Bei den Hanbaliyyah findet sich die Unterscheidung nach <em>Menge</em>: Viel Blut bricht den
Wudu, wenig nicht, wobei &bdquo;viel&ldquo; nach dem üblichen Verständnis der Menschen bestimmt wird.</p>

<h2 id="praxis">Was bedeutet das praktisch?</h2>
<ul>
  <li><strong>Folge deiner Schule.</strong> Wer nach hanafitischem Fiqh lernt und betet, erneuert
      bei fließendem Blut den Wudu.</li>
  <li><strong>Kein Streit darüber.</strong> Wer nach shafiitischem Fiqh weiterbetet, hat eine
      belegte Grundlage. Ihn zu korrigieren, ist nicht angebracht.</li>
  <li><strong>Bei Zwang zur Vorsicht.</strong> Wer unsicher ist und Zeit hat, erneuert den Wudu –
      das ist in jedem Fall gültig.</li>
  <li><strong>Chronische Fälle</strong> (etwa dauerhaft blutendes Zahnfleisch) fallen unter die
      Regelungen für <em>madhur</em>-Zustände und sollten individuell mit einem Gelehrten geklärt
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
            "al-Kasani, <em>Badai as-Sanai</em>, Bd. 1, Kitab at-Taharah.",
            "an-Nawawi, <em>al-Majmu Sharh al-Muhadhdhab</em>, Bd. 2.",
            "Ibn Qudamah, <em>al-Mughni</em>, Bd. 1, Bab Nawaqid al-Wudu.",
            "al-Bukhari, <em>as-Sahih</em>, Nr. 135; Muslim, <em>as-Sahih</em>, Nr. 225.",
            "Abu Dawud, <em>as-Sunan</em>, Nr. 198 (Bericht vom Gefährten im Nachtgebet).",
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
        "video": "",   # Video-URL eintragen -> Videobereich erscheint automatisch
        "summary": "Eine der ältesten Behauptungen über den Islam. Was sagen der Quran, die Praxis des "
                   "Propheten ﷺ und die historische Entwicklung tatsächlich dazu?",
        "body": """
<p>Der Satz begegnet in Schulbüchern, Talkshows und Kommentarspalten. Er klingt einfach und
erledigt scheinbar eine ganze Religion in sechs Wörtern. Sehen wir uns an, was tatsächlich in den
Quellen steht.</p>

<h2 id="quran">Was der Quran sagt</h2>
""" + ayah("﴿لَا إِكْرَاهَ فِي الدِّينِ ۖ قَد تَّبَيَّنَ الرُّشْدُ مِنَ الْغَيِّ﴾",
           "&bdquo;Es gibt keinen Zwang im Glauben. Der rechte Weg ist nunmehr deutlich vom Irrweg "
           "unterschieden.&ldquo;",
           "Surat al-Baqarah, 2:256") + """
<p>Dieser Vers wurde in Madinah offenbart – also zu einem Zeitpunkt, als die Muslime bereits einen
Staat und militärische Mittel besaßen. Wäre erzwungene Bekehrung das Ziel gewesen, wäre dies der
denkbar ungünstigste Moment für einen solchen Vers.</p>
<p>An anderer Stelle wird der Prophet ﷺ ausdrücklich in seiner Rolle begrenzt:</p>
""" + ayah("﴿فَذَكِّرْ إِنَّمَا أَنتَ مُذَكِّرٌ ۝ لَّسْتَ عَلَيْهِم بِمُصَيْطِرٍ﴾",
           "&bdquo;So ermahne! Du bist nur ein Ermahner. Du bist nicht ihr Bevollmächtigter.&ldquo;",
           "Surat al-Ghashiyah, 88:21–22") + """

<h2 id="kampf">Worum ging es dann bei den Kämpfen?</h2>
<p>Der Quran erlaubt den Kampf – aber mit klar benannten Gründen: Abwehr von Angriffen, Schutz der
Vertriebenen und Beendigung von Verfolgung.</p>
""" + ayah("﴿أُذِنَ لِلَّذِينَ يُقَاتَلُونَ بِأَنَّهُمْ ظُلِمُوا ۚ وَإِنَّ اللَّهَ عَلَىٰ نَصْرِهِمْ لَقَدِيرٌ﴾",
           "&bdquo;Erlaubnis ist denen gegeben, die bekämpft werden, weil ihnen Unrecht geschah – "
           "und Allah hat wahrlich die Macht, ihnen zu helfen.&ldquo;",
           "Surat al-Hajj, 22:39") + """
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
<p>Die Behauptung hält weder dem Text noch der Geschichte stand. Der Quran schließt Zwang im
Glauben ausdrücklich aus, die Kampferlaubnis ist an Abwehr und Unrecht gebunden, und die
tatsächliche Ausbreitung des Islam verlief über Jahrhunderte, vielfach ganz ohne militärische
Beteiligung. Wer diese Frage ernsthaft stellt, verdient eine ernsthafte Antwort – und die liefern
die Quellen selbst.</p>
""",
        "sources": [
            "Ibn Hisham, <em>as-Sirah an-Nabawiyyah</em>.",
            "Muslim, <em>as-Sahih</em>, Kitab al-Jihad, Nr. 1731 (Anweisungen an Heerführer).",
            "Richard W. Bulliet, <em>Conversion to Islam in the Medieval Period</em>, Harvard 1979.",
            "Thomas W. Arnold, <em>The Preaching of Islam</em>, London 1913.",
            "at-Tabari, <em>Jami al-Bayan</em>, zu 2:256.",
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
        "video": "",   # Video-URL eintragen -> Videobereich erscheint automatisch
        "summary": "Jeder kann heute über Religion sprechen. Warum der Islam trotzdem eine Überlieferungskette "
                   "kennt – und was das für den Umgang mit Wissen in sozialen Medien bedeutet.",
        "body": """
<p>Ein Video von neunzig Sekunden kann heute Millionen Menschen erreichen. Das ist eine Chance –
und ein Problem. Denn die Frage, <em>wer</em> spricht, ist im Islam nie nebensächlich gewesen.</p>

<h2 id="isnad">Die Besonderheit der Überlieferungskette</h2>
<p>Abdullah Ibn al-Mubarak sagte: <em>&bdquo;Die Überlieferungskette gehört zur Religion. Gäbe es sie
nicht, würde jeder sagen, was er will.&ldquo;</em> Diese Aussage beschreibt ein ganzes
Wissenschaftssystem. Über Jahrhunderte wurde nicht nur festgehalten, <em>was</em> gesagt wurde,
sondern auch, <em>von wem</em>, <em>an wen</em> und mit welcher Zuverlässigkeit.</p>

<h2 id="belege">Die textliche Grundlage</h2>
""" + ayah("﴿فَاسْأَلُوا أَهْلَ الذِّكْرِ إِن كُنتُمْ لَا تَعْلَمُونَ﴾",
           "&bdquo;So fragt die Leute der Ermahnung, wenn ihr nicht wisst.&ldquo;",
           "Surat an-Nahl, 16:43") + """
""" + ayah("«إِنَّ الْعُلَمَاءَ وَرَثَةُ الْأَنْبِيَاءِ»",
           "&bdquo;Wahrlich, die Gelehrten sind die Erben der Propheten.&ldquo;",
           "Abu Dawud, Nr. 3641; at-Tirmidhi, Nr. 2682", kind="hadith") + """
<p>Ein Erbe erhält man nicht durch Behauptung, sondern durch einen nachvollziehbaren Weg. Genau das
beschreibt der Hadith: Wissen wird übergeben, nicht selbst erklärt.</p>

<h2 id="warnung">Die Warnung vor dem Verlust</h2>
<p>Der Prophet ﷺ beschrieb, wie Wissen verschwindet: nicht durch plötzliches Auslöschen, sondern
durch das Fortgehen der Gelehrten. Wenn keiner mehr da sei, so heißt es weiter, nähmen die Menschen
Unwissende zu Vorstehern, diese würden ohne Wissen gefragt, gäben Auskunft – und gingen selbst in
die Irre und führten andere in die Irre (al-Bukhari, Nr. 100).</p>
<p>Der Hadith beschreibt keinen Einzelfall. Er beschreibt einen Mechanismus, der sich wiederholt,
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
sagte: <em>&bdquo;Übermittelt von mir, und sei es einen einzigen Vers.&ldquo;</em> (al-Bukhari, Nr. 3461) Die
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
            "Muslim, <em>as-Sahih</em>, Muqaddimah (Aussage Ibn al-Mubaraks).",
            "al-Bukhari, <em>as-Sahih</em>, Nr. 100 und Nr. 3461.",
            "Abu Dawud, <em>as-Sunan</em>, Nr. 3641; at-Tirmidhi, <em>as-Sunan</em>, Nr. 2682.",
            "al-Khatib al-Baghdadi, <em>al-Jami li-Akhlaq ar-Rawi</em>.",
        ],
    },
]

# ---------------------------------------------------------------- Kurse
# Leer = der gesamte Kursbereich (Navigation, Startseite, Suche, Sitemap)
# wird ausgeblendet. Sobald hier ein Kurs steht, erscheint der Bereich
# automatisch. Muster siehe _build/vorlagen.py
COURSES = []

# Komplettpakete. Erscheinen nur, wenn mindestens zwei Kurse vorhanden sind.
PACKAGES = []

# ---------------------------------------------------------------- Frage & Antwort
# Kategorien im Frageformular. Wird zu wenig oder zu viel angeboten,
# hier anpassen.
QA_CATEGORIES = ["Aqidah", "Fiqh", "Gebet", "Fasten", "Ehe & Familie", "Handel", "Dawah",
                 "Allgemeine islamische Fragen"]

# Oeffentlich veroeffentlichte, anonymisierte Antworten.
# Leer = das oeffentliche Archiv wird ausgeblendet, das Frageformular bleibt.
# Muster siehe _build/vorlagen.py
QA_PUBLIC = []

# ---------------------------------------------------------------- Team
TEAM = [
    {"name": "A. Sirac", "initials": "AS", "role": "Dawah & Inhalte",
     "bio": "Beschäftigt sich seit mehreren Jahren mit den islamischen Wissenschaften und hat "
            "bei verschiedenen Lehrern Unterricht genommen.",
     "focus": ["Sirah und islamische Geschichte", "Aufklärung von Zweifeln", "Tajwid"]},
    {"name": "S. Eslem", "initials": "SE", "role": "Unterricht & Fatwa-Recherche",
     "bio": "Hat einen mehrjährigen strukturierten Studienweg in verschiedenen islamischen "
            "Wissenschaften absolviert und Ijazat von verschiedenen Lehrern erhalten.",
     "focus": ["Aqidah", "Fiqh und Usul al-Fiqh", "Arabische Sprache"]},
    {"name": "M. Selman", "initials": "MS", "role": "Plattform & Organisation",
     "bio": "Beschäftigt sich seit mehreren Jahren mit den islamischen Wissenschaften und "
            "verantwortet die technische und organisatorische Seite von Hidayah.",
     "focus": ["Wissensarchiv und Struktur", "Digitale Dawah", "Kursproduktion"]},
]
