/* =============================================================================
   Tuhfetü'l-Etfâl — Prüfungssimulation (soru bankası) · TR / DE / EN
   Bölüm başına 3 çoktan seçmeli soru. Her bölüm sonunda 1..N kümülatif sınav.
   Alan: q (soru) · opts (şıklar) · correct (doğru şık indeksi) · why (açıklama)
   ============================================================================= */
(function () {
  function L(tr, de, en) { return { tr: tr, de: de, en: en }; }

  window.QUIZ = {
    "mukaddime": [
      {
        q: L("Nâzım eserine hangi adı vermiştir?",
             "Welchen Titel gab der Verfasser seinem Werk?",
             "What title did the author give his work?"),
        opts: [
          L("Tuhfetü'l-Etfâl", "Tuḥfat al-Atfāl", "Tuḥfat al-Aṭfāl"),
          L("el-Cezeriyye", "al-Dschazariyya", "al-Jazariyya"),
          L("eş-Şâtıbiyye", "asch-Schāṭibiyya", "al-Shāṭibiyya")
        ],
        correct: 0,
        why: L("Nâzım 4. beyitte esere “Tuhfetü'l-Etfâl” (Çocuklara Armağan) adını verdiğini söyler.",
               "Im 4. Vers nennt er den Titel „Tuḥfat al-Atfāl“ (Geschenk für die Kinder).",
               "In verse 4 he names it “Tuḥfat al-Aṭfāl” (A Gift for the Children).")
      },
      {
        q: L("Nâzım bu ilmi hangi hocasından nakleder?",
             "Von welchem Lehrer überliefert der Verfasser dieses Wissen?",
             "From which teacher does the author transmit this knowledge?"),
        opts: [
          L("İbnü'l-Cezerî", "Ibn al-Dschazarī", "Ibn al-Jazarī"),
          L("el-Meyhî", "al-Mīhī", "al-Mīhī"),
          L("eş-Şâtıbî", "asch-Schāṭibī", "al-Shāṭibī")
        ],
        correct: 1,
        why: L("4. beyitte “şeyhimiz el-Meyhî'den naklen” der (Nûruddîn Ali el-Meyhî).",
               "In Vers 4: „nach unserem Schaykh al-Mīhī“ (Nūr ad-Dīn ʿAlī al-Mīhī).",
               "In verse 4: “from our shaykh al-Mīhī” (Nūr al-Dīn ʿAlī al-Mīhī).")
      },
      {
        q: L("Eserin asıl konusu nedir?",
             "Was ist das Hauptthema des Werks?",
             "What is the work's main subject?"),
        opts: [
          L("Sâkin nûn, tenvîn ve medler", "Sākines Nūn, Tanwīn und die Madd-Arten", "The sākin nūn, tanwīn and the madd forms"),
          L("Mahreçler ve sıfatlar", "Austrittsorte und Eigenschaften", "Exit points and qualities"),
          L("Vakıf ve ibtidâ", "Waqf und Ibtidāʾ", "Pausing and starting")
        ],
        correct: 0,
        why: L("3. beyit: “nûn, tenvîn ve medler hakkındadır.”",
               "Vers 3: „über Nūn, Tanwīn und die Madd-Arten“.",
               "Verse 3: “concerning nūn, tanwīn and the madd forms.”")
      }
    ],

    "nun-sakine": [
      {
        q: L("Sâkin nûn/tenvînden sonra bir boğaz harfi (ء ه ع ح غ خ) gelirse hüküm nedir?",
             "Welche Regel gilt, wenn nach sākinem Nūn/Tanwīn ein Kehlbuchstabe (ء ه ع ح غ خ) folgt?",
             "Which ruling applies when a throat letter (ء ه ع ح غ خ) follows the sākin nūn/tanwīn?"),
        opts: [
          L("İhfâ", "Ikhfāʾ", "Ikhfāʾ"),
          L("İdğâm", "Idghām", "Idghām"),
          L("İzhâr", "Iẓhār", "Iẓhār")
        ],
        correct: 2,
        why: L("Boğaz harfleri nûnun mahrecinden uzaktır; nûn açıkça (izhâr) okunur.",
               "Die Kehlbuchstaben sind vom Nūn-Machradsch weit entfernt; das Nūn wird deutlich (Iẓhār) gelesen.",
               "The throat letters are far from the nūn's makhraj; the nūn is read clearly (iẓhār).")
      },
      {
        q: L("«يرملون» harfleri hangi hükmün harfleridir?",
             "Zu welcher Regel gehören die Buchstaben von «يرملون»?",
             "The letters of «يرملون» belong to which ruling?"),
        opts: [
          L("İdğâm", "Idghām", "Idghām"),
          L("İzhâr", "Iẓhār", "Iẓhār"),
          L("İklâb", "Iqlāb", "Iqlāb")
        ],
        correct: 0,
        why: L("«يَرْمَلُونَ» = ي ر م ل و ن; bunlar idğâm harfleridir (gunneli ينمو, gunnesiz ل ر).",
               "«يَرْمَلُونَ» = ي ر م ل و ن; das sind die Idghām-Buchstaben (mit Ghunna ينمو, ohne ل ر).",
               "«يَرْمَلُونَ» = ي ر م ل و ن; these are the idghām letters (with ghunna ينمو, without ل ر).")
      },
      {
        q: L("Sâkin nûn/tenvînden sonra «ب» gelirse hüküm nedir?",
             "Welche Regel gilt, wenn nach sākinem Nūn/Tanwīn ein «ب» folgt?",
             "Which ruling applies when «ب» follows the sākin nūn/tanwīn?"),
        opts: [
          L("İzhâr", "Iẓhār", "Iẓhār"),
          L("İklâb (nûn → mîm)", "Iqlāb (Nūn → Mīm)", "Iqlāb (nūn → mīm)"),
          L("İhfâ", "Ikhfāʾ", "Ikhfāʾ")
        ],
        correct: 1,
        why: L("Tek harf «ب»: nûn/tenvîn gizli bir mîme çevrilip gunne ile okunur (iklâb).",
               "Ein Buchstabe «ب»: das Nūn/Tanwīn wird in ein verborgenes Mīm verwandelt, mit Ghunna (Iqlāb).",
               "One letter «ب»: the nūn/tanwīn becomes a hidden mīm read with ghunna (iqlāb).")
      }
    ],

    "gunne-museddede": [
      {
        q: L("Şeddeli mîm (مّ) ve şeddeli nûn (نّ) nasıl okunur?",
             "Wie werden verdoppeltes Mīm (مّ) und Nūn (نّ) gelesen?",
             "How are the doubled mīm (مّ) and nūn (نّ) read?"),
        opts: [
          L("Gunnesiz, hızlıca", "Ohne Ghunna, schnell", "Without ghunna, quickly"),
          L("Gunne ile, iki hareke", "Mit Ghunna, zwei Ḥaraka", "With ghunna, two ḥarakāt"),
          L("Altı hareke uzatılarak", "Mit sechs Ḥaraka gedehnt", "Lengthened six ḥarakāt")
        ],
        correct: 1,
        why: L("Şeddeli mîm/nûnda gunneyi açıkça yapmak vaciptir; miktarı iki harekedir.",
               "Beim verdoppelten Mīm/Nūn ist die Ghunna Pflicht; Maß: zwei Ḥaraka.",
               "For the doubled mīm/nūn the ghunna is obligatory; measure: two ḥarakāt.")
      },
      {
        q: L("Gunnenin mahreci (çıkış yeri) neresidir?",
             "Wo ist der Austrittsort der Ghunna?",
             "Where is the ghunna's exit point?"),
        opts: [
          L("Dil ucu", "Zungenspitze", "Tongue-tip"),
          L("Geniz / hışûm (burun)", "Nasenraum (Chaischūm)", "Nasal cavity (khayshūm)"),
          L("Boğaz", "Kehle", "Throat")
        ],
        correct: 1,
        why: L("Gunne, dilin müdahalesi olmadan genizden (hışûm) çıkan bir sestir.",
               "Die Ghunna ist ein Nasenlaut (Chaischūm), ohne Zutun der Zunge.",
               "Ghunna is a nasal sound (khayshūm), with no action of the tongue.")
      },
      {
        q: L("Bu iki harfe niçin “gunne harfi” denir?",
             "Warum heißen diese zwei „Ghunna-Buchstaben“?",
             "Why are these two called “ghunna letters”?"),
        opts: [
          L("Gunne onlarda en açık ortaya çıktığı için", "Weil die Ghunna in ihnen am deutlichsten hervortritt", "Because ghunna appears most clearly in them"),
          L("Sadece onlarda gunne bulunduğu için", "Weil nur sie Ghunna haben", "Because only they have ghunna"),
          L("Boğazdan çıktıkları için", "Weil sie aus der Kehle kommen", "Because they issue from the throat")
        ],
        correct: 0,
        why: L("Gunne başka hükümlerde de bulunur; fakat en tam ve açık şekli şeddeli mîm/nûndadır.",
               "Ghunna kommt auch anderswo vor, am vollsten aber beim verdoppelten Mīm/Nūn.",
               "Ghunna occurs elsewhere too, but most fully in the doubled mīm/nūn.")
      }
    ],

    "mim-sakine": [
      {
        q: L("Sâkin mîmden sonra «ب» gelirse hüküm nedir?",
             "Welche Regel gilt, wenn nach sākinem Mīm ein «ب» folgt?",
             "Which ruling applies when «ب» follows the sākin mīm?"),
        opts: [
          L("İhfâ-i şefevî", "Ikhfāʾ schafawī", "Ikhfāʾ shafawī"),
          L("İzhâr-ı şefevî", "Iẓhār schafawī", "Iẓhār shafawī"),
          L("İklâb", "Iqlāb", "Iqlāb")
        ],
        correct: 0,
        why: L("Sâkin mîm + «ب» → ihfâ-i şefevî: mîm dudak arasında gizlenir, gunne ile.",
               "Sākines Mīm + «ب» → Ikhfāʾ schafawī: das Mīm wird zwischen den Lippen verborgen, mit Ghunna.",
               "Sākin mīm + «ب» → ikhfāʾ shafawī: the mīm is concealed between the lips, with ghunna.")
      },
      {
        q: L("Sâkin mîmden sonra «م» gelirse hüküm nedir?",
             "Welche Regel gilt, wenn nach sākinem Mīm ein «م» folgt?",
             "Which ruling applies when «م» follows the sākin mīm?"),
        opts: [
          L("İzhâr-ı şefevî", "Iẓhār schafawī", "Iẓhār shafawī"),
          L("İdğâm-ı misleyn (şeddeli mîm)", "Idghām al-Mithlayn (verdoppeltes Mīm)", "Idghām al-mithlayn (doubled mīm)"),
          L("İhfâ-i şefevî", "Ikhfāʾ schafawī", "Ikhfāʾ shafawī")
        ],
        correct: 1,
        why: L("İki mîm birleşir, gunne ile şeddeli tek mîm olur (idğâm-ı misleyn-i sagîr).",
               "Zwei Mīm verschmelzen zu einem verdoppelten Mīm, mit Ghunna (Idghām al-Mithlayn).",
               "The two mīms merge into one doubled mīm, with ghunna (idghām al-mithlayn).")
      },
      {
        q: L("İzhâr-ı şefevîde özellikle «و» ve «ف» yanında neye dikkat edilir?",
             "Worauf achtet man beim Iẓhār schafawī besonders bei «و» und «ف»?",
             "In iẓhār shafawī, what needs care especially at «و» and «ف»?"),
        opts: [
          L("Mîmi uzatmamaya", "Das Mīm nicht zu dehnen", "Not to lengthen the mīm"),
          L("Mîmin gizlenmemesine (açık okunmasına)", "Das Mīm nicht zu verbergen (deutlich lesen)", "Not to conceal the mīm (read it clearly)"),
          L("Mîmi şeddelemeye", "Das Mīm zu verdoppeln", "To double the mīm")
        ],
        correct: 1,
        why: L("Mahreç yakınlığı/birliği sebebiyle mîm yanlışlıkla gizlenebilir; açık okunmalıdır.",
               "Wegen der Machradsch-Nähe kann das Mīm versehentlich verborgen werden; es muss deutlich bleiben.",
               "Because of makhraj nearness the mīm may be concealed by mistake; it must stay clear.")
      }
    ],

    "lam-hukumleri": [
      {
        q: L("«الشَّمْس» kelimesinde lâm-ı ta'rîf nasıl okunur?",
             "Wie wird das Artikel-Lām in «الشَّمْس» gelesen?",
             "How is the article lām read in «الشَّمْس»?"),
        opts: [
          L("Açıkça okunur", "Deutlich gelesen", "Read clearly"),
          L("Okunmaz, sonraki harfe idğam edilir (şemsî)", "Nicht gelesen, dem Folgebuchstaben eingefügt (schamsī)", "Not read, merged into the next letter (shamsī)"),
          L("Mîme çevrilir", "In ein Mīm verwandelt", "Turned into a mīm")
        ],
        correct: 1,
        why: L("«ش» şemsî harftir; lâm okunmaz, şın şeddeli okunur: “eş-şems”.",
               "«ش» ist ein schamsī-Buchstabe; das Lām entfällt, das Schīn wird verdoppelt: „asch-schams“.",
               "«ش» is a shamsī letter; the lām is dropped, the shīn doubled: “ash-shams”.")
      },
      {
        q: L("«الْقَمَر» kelimesinde lâm nasıl okunur?",
             "Wie wird das Lām in «الْقَمَر» gelesen?",
             "How is the lām read in «الْقَمَر»?"),
        opts: [
          L("Açık (kamerî izhâr)", "Deutlich (qamarī-Iẓhār)", "Clear (qamarī iẓhār)"),
          L("Gizli (idğam)", "Verschmolzen (Idghām)", "Merged (idghām)"),
          L("Mîm olarak", "Als Mīm", "As a mīm")
        ],
        correct: 0,
        why: L("«ق» kamerî harftir; lâm açıkça işitilir: “el-kamer”.",
               "«ق» ist ein qamarī-Buchstabe; das Lām ist hörbar: „al-qamar“.",
               "«ق» is a qamarī letter; the lām is audible: “al-qamar”.")
      },
      {
        q: L("Fiil lâmının aslî (genel) hükmü nedir?",
             "Was ist die Grundregel des Verb-Lām?",
             "What is the base ruling of the verb lām?"),
        opts: [
          L("Her zaman idğam", "Immer Idghām", "Always idghām"),
          L("İzhâr (açık okuma)", "Iẓhār (deutlich)", "Iẓhār (clear)"),
          L("İhfâ", "Ikhfāʾ", "Ikhfāʾ")
        ],
        correct: 1,
        why: L("Fiil lâmı kural olarak açık okunur (kul neam, kulnâ); yalnız ل ve ر'den önce idğam.",
               "Das Verb-Lām wird i. d. R. deutlich gelesen; nur vor ل und ر Idghām.",
               "The verb lām is normally read clearly; only before ل and ر is it idghām.")
      }
    ],

    "idgam-turleri": [
      {
        q: L("Mahreçleri AYNI, sıfatları FARKLI iki harfe ne denir?",
             "Wie heißen zwei Buchstaben mit GLEICHEM Machradsch, aber VERSCHIEDENER Ṣifa?",
             "What are two letters with the SAME makhraj but DIFFERENT ṣifa called?"),
        opts: [
          L("Misleyn", "Mithlān", "Mithlān"),
          L("Mütecâniseyn", "Mutadschānisān", "Mutajānisān"),
          L("Mütekāribeyn", "Mutaqāribān", "Mutaqāribān")
        ],
        correct: 1,
        why: L("Mahreç aynı + sıfat farklı = mütecâniseyn (ت→ط, ذ→ظ, ب→م).",
               "Machradsch gleich + Ṣifa verschieden = Mutadschānisān (ت→ط, ذ→ظ, ب→م).",
               "Same makhraj + different ṣifa = mutajānisān (ت→ط, ذ→ظ, ب→م).")
      },
      {
        q: L("Mahreç ve sıfatı tamamen aynı olan (aynı harf) iki harfe ne denir?",
             "Wie heißen zwei in Machradsch und Ṣifa völlig gleiche Buchstaben?",
             "What are two letters identical in makhraj and ṣifa (the same letter) called?"),
        opts: [
          L("Misleyn", "Mithlān", "Mithlān"),
          L("Mütekāribeyn", "Mutaqāribān", "Mutaqāribān"),
          L("Mütecâniseyn", "Mutadschānisān", "Mutajānisān")
        ],
        correct: 0,
        why: L("Aynı harfin peş peşe gelmesi = misleyn (م+م); daima tam idğam.",
               "Derselbe Buchstabe nacheinander = Mithlān (م+م); stets vollständiges Idghām.",
               "The same letter in succession = mithlān (م+م); always complete idghām.")
      },
      {
        q: L("İki harften birincisi sâkin, ikincisi harekeli ise idğama ne denir?",
             "Ist der erste Buchstabe sākin und der zweite bewegt, wie heißt das Idghām?",
             "If the first letter is sākin and the second vowelled, what is the idghām called?"),
        opts: [
          L("Kebîr (büyük)", "Kabīr (groß)", "Kabīr (great)"),
          L("Sagîr (küçük)", "Ṣaghīr (klein)", "Ṣaghīr (small)"),
          L("Nâkıs (eksik)", "Nāqiṣ (unvollständig)", "Nāqiṣ (incomplete)")
        ],
        correct: 1,
        why: L("İlki sâkin, ikincisi harekeli → sagîr (iş azdır). İkisi de harekeli → kebîr (Hafs'ta yok).",
               "Erster sākin, zweiter bewegt → ṣaghīr. Beide bewegt → kabīr (in Ḥafṣ nicht).",
               "First sākin, second vowelled → ṣaghīr. Both vowelled → kabīr (not in Ḥafṣ).")
      }
    ],

    "medd-kisimlari": [
      {
        q: L("Med harfleri hangileridir?",
             "Welches sind die Madd-Buchstaben?",
             "Which are the madd letters?"),
        opts: [
          L("Elif, vâv, yâ (ا و ي)", "Alif, Wāw, Yāʾ (ا و ي)", "Alif, wāw, yāʾ (ا و ي)"),
          L("Nûn, mîm, lâm", "Nūn, Mīm, Lām", "Nūn, mīm, lām"),
          L("Hemze, hâ, ayn", "Hamza, Hāʾ, ʿAyn", "Hamza, hāʾ, ʿayn")
        ],
        correct: 0,
        why: L("Med harfleri üçtür: elif, vâv, yâ — «وَاي» lafzında toplanır.",
               "Drei Madd-Buchstaben: Alif, Wāw, Yāʾ — im Wort «وَاي».",
               "Three madd letters: alif, wāw, yāʾ — gathered in «وَاي».")
      },
      {
        q: L("Vâvın med harfi sayılması için öncesindeki harekenin ne olması gerekir?",
             "Welchen Vokal muss der Buchstabe vor dem Wāw haben, damit es Madd ist?",
             "What vowel must precede the wāw for it to be a madd letter?"),
        opts: [
          L("Esre (kesra)", "Kasra", "Kasra"),
          L("Ötre (damme)", "Ḍamma", "Ḍamma"),
          L("Üstün (fetha)", "Fatḥa", "Fatḥa")
        ],
        correct: 1,
        why: L("Med vâvı: öncesi ötreli (yekûlü). Med yâsı: öncesi esreli. Med elifi: öncesi fethalı.",
               "Madd-Wāw: davor Ḍamma. Madd-Yāʾ: davor Kasra. Madd-Alif: davor Fatḥa.",
               "Madd wāw: preceded by ḍamma. Madd yāʾ: by kasra. Madd alif: by fatḥa.")
      },
      {
        q: L("Aşağıdakilerden hangisi bir lîn harfi örneğidir?",
             "Welches ist ein Beispiel für einen Līn-Buchstaben?",
             "Which is an example of a līn letter?"),
        opts: [
          L("قَالَ (kâle)", "قَالَ (qāla)", "قَالَ (qāla)"),
          L("خَوْف (havf)", "خَوْف (chawf)", "خَوْف (khawf)"),
          L("قِيلَ (kîle)", "قِيلَ (qīla)", "قِيلَ (qīla)")
        ],
        correct: 1,
        why: L("Lîn harfi: öncesi fethalı sâkin vâv/yâ — خَوْف, قُرَيْش gibi.",
               "Līn-Buchstabe: sākines Wāw/Yāʾ mit Fatḥa davor — خَوْف, قُرَيْش.",
               "Līn letter: sākin wāw/yāʾ with fatḥa before it — خَوْف, قُرَيْش.")
      }
    ],

    "medd-hukumleri": [
      {
        q: L("Med harfinden sonra AYNI kelimede hemze gelirse hangi meddir?",
             "Welches Madd, wenn nach dem Madd-Buchstaben im SELBEN Wort ein Hamza folgt?",
             "Which madd if a hamza follows the madd letter in the SAME word?"),
        opts: [
          L("Medd-i munfasıl", "Madd munfaṣil", "Madd munfaṣil"),
          L("Medd-i muttasıl (vâcib)", "Madd muttaṣil (Pflicht)", "Madd muttaṣil (obligatory)"),
          L("Medd-i bedel", "Madd al-badal", "Madd al-badal")
        ],
        correct: 1,
        why: L("Med + hemze aynı kelimede → muttasıl; uzatmak vaciptir (4-5 hareke).",
               "Madd + Hamza im selben Wort → muttaṣil; Dehnen ist Pflicht (4–5 Ḥaraka).",
               "Madd + hamza in the same word → muttaṣil; lengthening is obligatory (4–5 ḥarakāt).")
      },
      {
        q: L("Med harfi ile hemze İKİ AYRI kelimede ise hangi meddir?",
             "Welches Madd, wenn Madd-Buchstabe und Hamza in ZWEI Wörtern stehen?",
             "Which madd if the madd letter and hamza are in TWO separate words?"),
        opts: [
          L("Medd-i muttasıl", "Madd muttaṣil", "Madd muttaṣil"),
          L("Medd-i munfasıl (câiz)", "Madd munfaṣil (erlaubt)", "Madd munfaṣil (permitted)"),
          L("Medd-i lâzım", "Madd lāzim", "Madd lāzim")
        ],
        correct: 1,
        why: L("Med bir kelimenin sonunda, hemze sonrakinin başında → munfasıl (4-5 hareke câiz).",
               "Madd am Wortende, Hamza am Anfang des nächsten → munfaṣil (4–5 Ḥaraka erlaubt).",
               "Madd at a word's end, hamza at the next word's start → munfaṣil (4–5 ḥarakāt permitted).")
      },
      {
        q: L("Med harfinden sonra ASLÎ (sabit) sükûn gelirse hangi medd ve kaç hareke?",
             "Welches Madd bei ursprünglichem (festem) Sukūn nach dem Madd-Buchstaben, und wie viele Ḥaraka?",
             "Which madd if an original (fixed) sukūn follows, and how many ḥarakāt?"),
        opts: [
          L("Ârız · 2-4-6", "ʿĀriḍ · 2–4–6", "ʿĀriḍ · 2–4–6"),
          L("Lâzım · 6 hareke", "Lāzim · 6 Ḥaraka", "Lāzim · 6 ḥarakāt"),
          L("Tabiî · 2 hareke", "Ṭabīʿī · 2 Ḥaraka", "Ṭabīʿī · 2 ḥarakāt")
        ],
        correct: 1,
        why: L("Aslî sükûn (vasl+vakıfta sabit) → medd-i lâzım; her hâlde 6 hareke.",
               "Ursprüngliches Sukūn (in Waṣl+Waqf fest) → Madd lāzim; stets 6 Ḥaraka.",
               "Original sukūn (fixed in waṣl+waqf) → madd lāzim; always 6 ḥarakāt.")
      }
    ],

    "medd-lazim": [
      {
        q: L("Medd-i lâzım kaç hareke uzatılır?",
             "Wie viele Ḥaraka wird das Madd lāzim gedehnt?",
             "How many ḥarakāt is the madd lāzim lengthened?"),
        opts: [
          L("2 hareke", "2 Ḥaraka", "2 ḥarakāt"),
          L("4 hareke", "4 Ḥaraka", "4 ḥarakāt"),
          L("6 hareke", "6 Ḥaraka", "6 ḥarakāt")
        ],
        correct: 2,
        why: L("Medd-i lâzımın dört türü de daima 6 hareke okunur.",
               "Alle vier Arten des Madd lāzim werden stets 6 Ḥaraka gelesen.",
               "All four kinds of madd lāzim are always read 6 ḥarakāt.")
      },
      {
        q: L("«الضَّالِّينَ» kelimesindeki medd hangi türdendir?",
             "Zu welcher Art gehört das Madd in «الضَّالِّينَ»?",
             "Which type is the madd in «الضَّالِّينَ»?"),
        opts: [
          L("Medd-i lâzım kelimî müsakkal", "Madd lāzim kalimī muthaqqal", "Madd lāzim kalimī muthaqqal"),
          L("Medd-i tabiî", "Natürliches Madd", "Natural madd"),
          L("Medd-i munfasıl", "Madd munfaṣil", "Madd munfaṣil")
        ],
        correct: 0,
        why: L("Elif (med) + şeddeli lâm (aslî sükûn, idğamlı) → kelimî müsakkal, 6 hareke.",
               "Alif (Madd) + verdoppeltes Lām (festes Sukūn, mit Idghām) → kalimī muthaqqal, 6 Ḥaraka.",
               "Alif (madd) + doubled lām (fixed sukūn, merged) → kalimī muthaqqal, 6 ḥarakāt.")
      },
      {
        q: L("Sûre başındaki «كم عسل نقص» harfleri kaç hareke okunur?",
             "Wie viele Ḥaraka werden die Anfangsbuchstaben «كم عسل نقص» gelesen?",
             "How many ḥarakāt are the opening letters «كم عسل نقص» read?"),
        opts: [
          L("2 hareke (tabiî)", "2 Ḥaraka (natürlich)", "2 ḥarakāt (natural)"),
          L("6 hareke (medd-i lâzım harfî)", "6 Ḥaraka (Madd lāzim ḥarfī)", "6 ḥarakāt (madd lāzim ḥarfī)"),
          L("Uzatılmaz", "Nicht gedehnt", "Not lengthened")
        ],
        correct: 1,
        why: L("Bu sekiz harfin hecesi üç harfli, ortası med, sonu aslî sükûndur → 6 hareke. («حي طهر» ise 2 hareke.)",
               "Diese acht sind dreibuchstabig, Mitte Madd, Ende festes Sukūn → 6 Ḥaraka. («حي طهر» = 2 Ḥaraka.)",
               "These eight are three-lettered, middle madd, end fixed sukūn → 6 ḥarakāt. («حي طهر» = 2 ḥarakāt.)")
      }
    ],

    "hatime": [
      {
        q: L("Tuhfetü'l-Etfâl kaç beyittir?",
             "Aus wie vielen Versen besteht die Tuḥfat al-Atfāl?",
             "How many verses does Tuḥfat al-Aṭfāl have?"),
        opts: [
          L("41", "41", "41"),
          L("61", "61", "61"),
          L("100", "100", "100")
        ],
        correct: 1,
        why: L("«نَدٌّ بَدَا» ebcedi = 61; eserin toplam beyti altmış birdir.",
               "Der Abdschad von «نَدٌّ بَدَا» = 61; das Werk hat 61 Verse.",
               "The abjad of «نَدٌّ بَدَا» = 61; the work has 61 verses.")
      },
      {
        q: L("Eser hangi hicrî yılda tamamlanmıştır?",
             "In welchem Jahr n. H. wurde das Werk vollendet?",
             "In which year AH was the work completed?"),
        opts: [
          L("1198", "1198", "1198"),
          L("1298", "1298", "1298"),
          L("1100", "1100", "1100")
        ],
        correct: 0,
        why: L("«بُشْرَى لِمَنْ يُتْقِنُهَا» ebcedi = 1198 (hicrî).",
               "Der Abdschad von «بُشْرَى لِمَنْ يُتْقِنُهَا» = 1198 (n. H.).",
               "The abjad of «بُشْرَى لِمَنْ يُتْقِنُهَا» = 1198 (AH).")
      },
      {
        q: L("Nâzım eseri neyle bitirir?",
             "Womit beendet der Verfasser das Werk?",
             "How does the author end the work?"),
        opts: [
          L("Hamd ve Peygamber'e salât-selâm ile", "Mit Lob und Segen über den Propheten", "With praise and blessings on the Prophet"),
          L("Bir dua listesiyle", "Mit einer Liste von Bittgebeten", "With a list of supplications"),
          L("Yeni bir konuyla", "Mit einem neuen Thema", "With a new topic")
        ],
        correct: 0,
        why: L("Başladığı gibi hamd ve salât-selâm ile bitirir; okuyanı-dinleyeni de duaya katar.",
               "Wie zu Beginn: mit Lob und Segen; er schließt Leser und Hörer ins Gebet ein.",
               "As it began: with praise and blessing; he includes reader and listener in the prayer.")
      }
    ]
  };
})();
