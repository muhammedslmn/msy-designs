# -*- coding: utf-8 -*-
"""VORLAGEN – nicht aktiv.

Hier liegen Beispieleintraege fuer Kurse, Pakete und das oeffentliche
Frage-und-Antwort-Archiv. Sie dienen als Muster: Eintrag herauskopieren,
in content.py in die passende Liste einfuegen, anpassen und neu bauen.
Solange eine Liste in content.py leer ist, blendet die Website den
gesamten Bereich samt Navigationspunkt automatisch aus.
"""

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
        "topics": ["Nahw", "Sarf", "Irab"],
        "summary": "Von den Wortarten bis zur Satzanalyse: Der systematische Einstieg in die "
                   "Sprache des Quran – ohne Vorkenntnisse.",
        "goal": "Nach diesem Kurs kannst du einfache arabische Sätze grammatikalisch bestimmen, "
                "die Endungen (<em>irab</em>) begründen und einen Grundtext mit Wörterbuch selbstständig erschließen.",
        "audience": ["Anfänger ohne Vorkenntnisse in der Grammatik",
                     "Geschwister, die den Quran verstehen und nicht nur lesen möchten",
                     "Studierende, die vor einem Fiqh- oder Aqidah-Kurs die Sprache festigen wollen"],
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
            ("Einführung: Warum Grammatik?", ["Der Nutzen für Quran und Sunnah", "Aufbau des Kurses", "Wie du lernst"], True),
            ("Die drei Wortarten", ["Ism, Fil, Harf", "Erkennungszeichen", "Übungen"], True),
            ("Der Nominalsatz", ["Mubtada und Khabar", "Übereinstimmung", "Häufige Fehler"], False),
            ("Der Verbalsatz", ["Fil, Fail, Maful", "Wortstellung", "Übungen"], False),
            ("Die Fälle (Irab)", ["Raf, Nasb, Jarr", "Sichtbare und geschätzte Zeichen", "Die fünf Nomen"], False),
            ("Das Verb im Detail", ["Madi, Mudari, Amr", "Die zehn Stämme", "Übungen am Quran"], False),
            ("Abschluss: Textanalyse", ["Ein Surah-Abschnitt Wort für Wort", "Selbstständig weiterarbeiten"], False),
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
        "summary": "Kelime türlerinden cümle tahliline: Kurân dilinin sistemli girişi – ön bilgi gerekmez.",
        "goal": "Bu kurstan sonra basit Arapça cümleleri tahlil edebilir, kelime sonlarını (<em>irab</em>) "
                "gerekçelendirebilir ve temel bir metni sözlükle çözebilirsin.",
        "audience": ["Gramer bilgisi olmayan başlangıç seviyesi",
                     "Kurân'ı sadece okumak değil anlamak isteyenler",
                     "Fıkıh veya akide dersinden önce dili sağlamlaştırmak isteyenler"],
        "prereq": ["Arapça harfleri akıcı okuyabilmek", "Gramer ön bilgisi gerekmez"],
        "learn": ["Üç kelime türü ve alametleri", "İsim ve fiil cümlesini ayırt etmek",
                  "İrab halleri ve alametleri", "Fiil kalıpları ve zamanlar",
                  "Basit bir metni kelime kelime tahlil etmek"],
        "materials": ["18 HD video ders", "Her ders için PDF özet", "Çözümlü alıştırmalar",
                      "Arapça–Türkçe terim sözlüğü"],
        "curriculum": [
            ("Giriş: Gramer neden?", ["Kurân ve sünnet için faydası", "Kurs yapısı", "Nasıl çalışmalı"], True),
            ("Üç kelime türü", ["İsim, fiil, harf", "Alametler", "Alıştırmalar"], True),
            ("İsim cümlesi", ["Mübteda ve haber", "Uyum", "Sık yapılan hatalar"], False),
            ("Fiil cümlesi", ["Fiil, fail, mefûl", "Kelime sırası", "Alıştırmalar"], False),
            ("İrab halleri", ["Ref, nasb, cer", "Zahir ve mukadder alametler", "Esmâ-i hamse"], False),
            ("Fiilin detayı", ["Mazi, muzari, emir", "On bab", "Kurân'dan alıştırmalar"], False),
            ("Bitiriş: Metin tahlili", ["Bir sure bölümü kelime kelime", "Kendi başına devam etmek"], False),
        ],
    },
    {
        "slug": "aqidah-grundlagen-de",
        "title": "Aqidah – Die Grundlagen",
        "lang": "de", "lang_label": "Deutsch",
        "level": "Grundstufe",
        "lessons": 14, "hours": 11,
        "price_eur": 79, "price_try": 2800,
        "teacher": "S. Eslem",
        "topics": ["Tawhid", "Iman", "Qadar"],
        "summary": "Die sechs Säulen des Iman, der Tawhid in seinen drei Bereichen und die Fragen, "
                   "die dabei am häufigsten offen bleiben.",
        "goal": "Nach diesem Kurs kennst du die Glaubensgrundlagen mit ihren Belegen, kannst zwischen "
                "Tawhid und Shirk sicher unterscheiden und weißt, wie mit Zweifeln umzugehen ist.",
        "audience": ["Muslime, die ihren Glauben mit Belegen verstehen wollen",
                     "Neu zum Islam gekommene Geschwister",
                     "Alle, die in der Dawah aktiv sind"],
        "prereq": ["Keine Vorkenntnisse nötig", "Arabischkenntnisse hilfreich, aber nicht erforderlich"],
        "learn": ["Die drei Bereiche des Tawhid", "Die sechs Säulen des Iman mit Belegen",
                  "Was den Tawhid bricht und was nicht", "Der Umgang mit Zweifeln (shubuhat)",
                  "Qada und Qadar verständlich erklärt"],
        "materials": ["14 Videolektionen", "PDF-Lernblätter zu jeder Lektion",
                      "Belegsammlung Quran & Sunnah", "Wiederholungsfragen"],
        "curriculum": [
            ("Einführung in die Aqidah", ["Was bedeutet Aqidah?", "Quellen und Methode", "Warum zuerst?"], True),
            ("Tawhid ar-Rububiyyah", ["Belege", "Das Verständnis der Quraysh", "Missverständnisse"], True),
            ("Tawhid al-Uluhiyyah", ["Was ist Anbetung?", "La ilaha illa-llah", "Bedingungen"], False),
            ("Namen und Eigenschaften", ["Die Methode der Salaf", "Vier Grundregeln", "Häufige Fehler"], False),
            ("Die sechs Säulen des Iman", ["Hadith Jibril", "Jede Säule mit Belegen", "Zusammenhänge"], False),
            ("Shirk und seine Formen", ["Groß, klein, verborgen", "Abgrenzungen", "Der Umgang damit"], False),
            ("Qada und Qadar", ["Die vier Stufen", "Freier Wille", "Antworten auf Einwände"], False),
        ],
    },
    {
        "slug": "tajwid-de",
        "title": "Tajwid – Der Quran richtig gelesen",
        "lang": "de", "lang_label": "Deutsch",
        "level": "Grundstufe",
        "lessons": 12, "hours": 8,
        "price_eur": 69, "price_try": 2400,
        "teacher": "A. Sirac",
        "topics": ["Makharij", "Sifat", "Ahkam"],
        "summary": "Buchstabe für Buchstabe zur korrekten Rezitation – mit Hörbeispielen zu jeder Regel.",
        "goal": "Nach diesem Kurs liest du den Quran mit korrekten Austrittsstellen, erkennst die "
                "wichtigsten Regeln im Mushaf und kannst deine eigene Rezitation prüfen.",
        "audience": ["Alle, die den Quran lesen können, aber unsicher in den Regeln sind",
                     "Eltern, die ihre Kinder begleiten wollen", "Vorbeter und Vorbeterinnen im Alltag"],
        "prereq": ["Arabische Schrift flüssig lesen können"],
        "learn": ["Die Austrittsstellen der Buchstaben (makharij)", "Eigenschaften der Buchstaben (sifat)",
                  "Nun sakinah, Tanwin und Mim sakinah", "Madd-Regeln und ihre Längen",
                  "Häufige Fehler und wie man sie abstellt"],
        "materials": ["12 Videolektionen mit Hörbeispielen", "PDF-Regelübersichten",
                      "Übungsseiten aus dem Mushaf", "Selbstkontrolle-Checkliste"],
        "curriculum": [
            ("Einführung in den Tajwid", ["Das Urteil über Tajwid", "Aufbau des Kurses"], True),
            ("Die Austrittsstellen", ["Die fünf Hauptbereiche", "Buchstabe für Buchstabe", "Übungen"], True),
            ("Eigenschaften der Buchstaben", ["Gegensatzpaare", "Eigenständige Sifat"], False),
            ("Nun sakinah und Tanwin", ["Izhar, Idgham, Iqlab, Ikhfa", "Erkennen im Mushaf"], False),
            ("Mim sakinah und Madd", ["Die drei Regeln", "Madd-Arten und Längen"], False),
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
QA_CATEGORIES = ["Aqidah", "Fiqh", "Gebet", "Fasten", "Ehe & Familie", "Handel", "Dawah",
                 "Allgemeine islamische Fragen"]

QA_PUBLIC = [
    {"cat": "Gebet", "q": "Ich arbeite im Schichtdienst und verpasse regelmäßig das Asr-Gebet. Was soll ich tun?",
     "a": "Das Gebet zu seiner Zeit zu verrichten ist Pflicht, solange keine echte Verhinderung vorliegt. "
          "Prüfe zuerst, ob eine kurze Unterbrechung möglich ist – in Deutschland besteht darauf in der Regel "
          "ein Anspruch im Rahmen der Pausenregelung. Ist das nachweislich unmöglich, wird das Gebet "
          "unmittelbar nach Ende der Verhinderung nachgeholt (<em>qada</em>), ohne dass eine Sünde vorliegt. "
          "Eine dauerhafte Lösung – Schichttausch, Absprache mit dem Arbeitgeber – bleibt aber das Ziel.",
     "date": "2025-06-02"},
    {"cat": "Taharah", "q": "Bricht das Berühren des Ehepartners den Wudu?",
     "a": "Auch hier unterscheiden sich die Rechtsschulen. Nach der Shafiiyyah bricht die direkte Hautberührung "
          "zwischen Mann und Frau den Wudu. Nach der Hanafiyyah tut sie das nicht, solange nichts weiter "
          "hinzukommt. Die Malikiyyah und Hanbaliyyah machen es von Begleitumständen abhängig. "
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
          "danach nicht erhöht. Unzulässig wird es, wenn bei Verzug ein Zuschlag anfällt – das ist Riba. "
          "Prüfe den Vertrag daher gezielt auf Verzugszinsen und Gebühren bei später Zahlung.",
     "date": "2025-03-17"},
    {"cat": "Dawah", "q": "Wie spreche ich Kollegen über den Islam an, ohne aufdringlich zu wirken?",
     "a": "Der wirksamste Anfang ist die eigene Verlässlichkeit: Pünktlichkeit, Ehrlichkeit, Freundlichkeit. "
          "Der Prophet ﷺ war in Makka als <em>al-Amin</em> bekannt, bevor er als Prophet bekannt war. "
          "Warte auf echte Fragen statt Gespräche zu erzwingen, antworte knapp und ehrlich, und sage "
          "&bdquo;das weiß ich nicht, ich frage nach&ldquo;, wenn du es nicht weißt. Ein einziges gehaltenes Versprechen "
          "wirkt oft stärker als ein langes Gespräch.",
     "date": "2025-02-08"},
    {"cat": "Aqidah", "q": "Ich habe aufdringliche Zweifel am Glauben und Angst, dadurch ungläubig zu werden.",
     "a": "Aufdringliche Gedanken (<em>waswasah</em>), die dich belasten und die du ablehnst, schaden deinem "
          "Iman nicht – im Gegenteil: Dass sie dich beunruhigen, ist selbst ein Zeichen von Iman. Die "
          "Gefährten kamen mit genau dieser Sorge zum Propheten ﷺ, und er antwortete: &bdquo;Das ist deutlicher "
          "Glaube.&ldquo; (Muslim, Nr. 132) Die Anweisung lautet, sich nicht in die Gedanken hineinzudenken, "
          "Zuflucht bei Allah zu suchen und weiterzumachen. Diskutiere nicht mit den Einflüsterungen – "
          "wende dich ab und lerne stattdessen strukturiert.",
     "date": "2025-01-19"},
]

