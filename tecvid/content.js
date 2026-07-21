/* =============================================================================
   Tuhfetü'l-Etfâl — Dijital Şerh · İçerik Verisi
   -----------------------------------------------------------------------------
   İLKE: Metne tam sadakat. Buradaki açıklamalar, gönderilen güvenilir şerhe
   dayanır; sadeleştirilmiş ve sistematik hâle getirilmiştir, fakat içerik
   değiştirilmemiştir. Şerhin vermediği hüküm eklenmemiştir.

   Diller: tr (Türkçe) · de (Almanca) · en (İngilizce)
   Arapça nazım metni verses.js dosyasındadır (beyit numarasına göre).

   Şerhin henüz dijitalleştirilmediği bölümlerde `status:'draft'` işareti
   bulunur; uygulama bunu "Ayrıntılı şerh hazırlanıyor" olarak gösterir.
   ============================================================================= */

window.CONTENT = {
  meta: {
    workTitle: { tr: "Tuhfetü'l-Etfâl", de: "Tuhfat al-Atfāl", en: "Tuḥfat al-Aṭfāl" },
    workTitleAr: "تُحْفَةُ الْأَطْفَالِ",
    subtitle: {
      tr: "Tecvid ilminde manzum bir metin ve dijital şerhi",
      de: "Ein Lehrgedicht der Tadschwīd-Wissenschaft mit digitalem Kommentar",
      en: "A didactic poem of the science of Tajwīd, with a digital commentary"
    },
    author: { tr: "Süleyman el-Cemzûrî", de: "Sulaymān al-Dschamzūrī", en: "Sulaymān al-Jamzūrī" },
    authorAr: "سُلَيْمَان الْجَمْزُورِي",
    verseCount: 61
  },

  /* --------------------------------------------------------------------------
     GİRİŞ MATERYALLERİ — Nazma başlamadan önceki tanıtıcı bilgiler
     -------------------------------------------------------------------------- */
  intro: {
    fazilet: {
      title: {
        tr: "Tecvid İlmine Giriş",
        de: "Einführung in die Tadschwīd-Wissenschaft",
        en: "Introduction to the Science of Tajwīd"
      },
      body: {
        tr: [
          "Bu ilim, faziletini ve üstünlüğünü konusunun şerefinden alır; zira o, Allah Teâlâ'nın kelâmıyla ilgilidir ve bunun üstünde bir şeref yoktur.",
          "**Nispeti:** Şer'î bir ilimdir; hükümleri yüce şeriattan gelmiştir.",
          "**Vâzıı (koyucusu):** Amelî yönden hükümleri Rasûlullah'tan (ﷺ), ondan Cebrâil'den (as), ondan Levh-i Mahfûz'dan, ondan da Allah Azze ve Celle'den nakledilmiştir. Sonra sahabe, tâbiîn ve kıraat imamları eliyle nesilden nesile aktarılmıştır. Kaidelerini bir ilim olarak ortaya koyan hakkında ise ihtilaf vardır: Halil b. Ahmed el-Ferâhidî, Ebü'l-Esved ed-Düelî yahut Hafs b. Ömer ed-Dûrî olduğu söylenmiştir.",
          "**İsmi:** Tecvid ilmidir.",
          "**Kaynağı (istimdâdı):** Rasûlullah'ın (ﷺ) okuma şeklidir; bu okuyuş kesintisiz bir senetle O'na kadar ulaşır.",
          "**Hükmü:** Bu ilmi bilmek farz-ı kifâyedir; onunla amel etmek ise her mükellef Müslüman'a farz-ı ayndır. Bu farziyet kitap, sünnet ve icmâ ile sabittir."
        ],
        de: [
          "Diese Wissenschaft leitet ihren Rang und ihre Vorzüglichkeit aus der Erhabenheit ihres Gegenstands ab, denn sie befasst sich mit dem Wort Allahs – und darüber gibt es keine höhere Ehre.",
          "**Ihre Zuordnung:** Sie ist eine religionsgesetzliche (schar'ī) Wissenschaft; ihre Bestimmungen stammen aus der erhabenen Scharī'a.",
          "**Ihr Ursprung:** Praktisch ist sie vom Gesandten Allahs (ﷺ) überliefert, von ihm über Dschibrīl (as), von der wohlverwahrten Tafel, von Allah dem Erhabenen – dann durch die Gefährten, die Nachfolger und die Imame der Rezitation weitergegeben.",
          "**Ihr Name:** Die Wissenschaft des Tadschwīd.",
          "**Ihre Quelle:** Die Rezitationsweise des Propheten (ﷺ), durch eine ununterbrochene Überlieferungskette bis zu ihm.",
          "**Ihr Urteil:** Ihre Kenntnis ist eine Gemeinschaftspflicht (farḍ kifāya); ihre Anwendung beim Lesen ist für jeden verpflichteten Muslim eine individuelle Pflicht (farḍ ʿayn), belegt durch Qurʾān, Sunna und Konsens."
        ],
        en: [
          "This science derives its rank and excellence from the nobility of its subject, for it concerns the Speech of Allah — and there is no honour above that.",
          "**Its classification:** It is a legal (sharʿī) science; its rulings derive from the noble Sharīʿah.",
          "**Its origin:** In practice it is transmitted from the Messenger of Allah (ﷺ), from him via Jibrīl (as), from the Preserved Tablet, from Allah the Almighty — then handed down through the Companions, the Successors, and the Imams of recitation.",
          "**Its name:** The science of Tajwīd.",
          "**Its source:** The Prophet's (ﷺ) manner of recitation, through an unbroken chain back to him.",
          "**Its ruling:** Knowing it is a communal obligation (farḍ kifāya); applying it while reciting is an individual obligation (farḍ ʿayn) upon every accountable Muslim, established by the Book, the Sunnah, and consensus."
        ]
      }
    },

    hadith: {
      arabic: "الطُّهُورُ شَطْرُ الْإِيمَانِ… وَالْقُرْآنُ حُجَّةٌ لَكَ أَوْ عَلَيْكَ",
      source: { tr: "Müslim", de: "Muslim", en: "Muslim" },
      body: {
        tr: "Rasûlullah (ﷺ) buyurdu: \"…Kur'ân, senin lehine yahut aleyhine bir delildir.\" Kur'ân'a riayetin bir parçası da onu tertîl ile, hakkını vererek okumaktır; çünkü Allah onu tecvidli olarak indirmiş ve bize o şekilde ulaşmıştır.",
        de: "Der Gesandte Allahs (ﷺ) sagte: „…und der Qurʾān ist ein Beweis für dich oder gegen dich.\“ Zum rechten Umgang mit ihm gehört, ihn mit Tartīl und in seinem vollen Recht zu lesen; denn Allah hat ihn mit Tadschwīd herabgesandt, und so ist er zu uns gelangt.",
        en: "The Messenger of Allah (ﷺ) said: \"…and the Qurʾān is a proof for you or against you.\" Part of honouring it is to read it with tartīl, giving it its due, for Allah revealed it with tajwīd and so it has reached us."
      }
    },

    biography: {
      title: {
        tr: "Şeyh Süleyman el-Cemzûrî (rh.) Hakkında",
        de: "Über Schaykh Sulaymān al-Dschamzūrī (rh.)",
        en: "About Shaykh Sulaymān al-Jamzūrī (rh.)"
      },
      body: {
        tr: [
          "Şeyh Süleyman el-Cemzûrî (rh.), hicrî 12. asrın (mîlâdî 18. yüzyıl) tanınmış tecvid âlimlerindendir.",
          "Tam adı **Süleyman b. Hüseyin b. Muhammed b. Şelebî el-Cemzûrî** olup **\"el-Efendî\"** lakabıyla bilinir. \"el-Cemzûrî\" nispeti, Mısır'da Tanta yakınlarındaki (Minûfiyye bölgesi) **Cemzûr**'a dayanır. Yaklaşık 1160 (m. ~1747) Rebîülevvel'inde doğmuştur.",
          "Şâfiî mezhebine mensuptu; birçok âlimden ders aldı. En meşhur hocalarından **Nûruddîn Ali el-Meyhî** (rh.) kendisine bilhassa tecvid ve kıraat okuttu; **Mücâhid el-Ahmedî** (rh.) ise ona bir saygı unvanı olarak \"el-Efendî\" lakabını verdi.",
          "En meşhur eseri, **\"Tuhfetü'l-Etfâl ve'l-Gılmân fî Tecvîdi'l-Kur'ân\"** adlı, 61 beyitlik bu tecvid manzumesidir. Metni **hicrî 1198** (m. ~1783) yılında tamamlamıştır. Diğer eserleri arasında \"Fethu'l-Akfâl\", \"Kenzü'l-Meânî\" ve kıraat üzerine \"el-Fethu'r-Rahmânî\" bulunur.",
          "Vefat tarihi kesin bilinmemekle birlikte, hicrî 1208 (m. ~1793) yılında hâlâ hayatta olduğu bilinmektedir. Allah ona geniş rahmetiyle muamele etsin ve ilminden bizi faydalandırsın. Âmîn."
        ],
        de: [
          "Schaykh Sulaymān al-Dschamzūrī (rh.) gehört zu den bekannten Tadschwīd-Gelehrten des 12. islamischen Jahrhunderts (ca. 18. Jh. n. Chr.).",
          "Sein voller Name lautet **Sulaymān ibn Ḥusayn ibn Muḥammad ibn Schalabī al-Dschamzūrī**, bekannt als **„al-Afandī“**. Die Nisba „al-Dschamzūrī“ geht auf **Dschamzūr** bei Tanta (Region al-Minūfiyya) in Ägypten zurück. Geboren wurde er um 1160 n. H. (ca. 1747 n. Chr.) im Monat Rabīʿ al-Awwal.",
          "Er war schāfiʿitischen Madhhabs und lernte bei vielen Gelehrten. Sein bekanntester Lehrer war **Nūr ad-Dīn al-Mīhī** (rh.), von dem er besonders Tadschwīd und Qirāʾāt lernte; **Mudschāhid al-Aḥmadī** (rh.) verlieh ihm den Ehrentitel „al-Afandī“.",
          "Sein bekanntestes Werk ist dieses **„Tuḥfat al-Atfāl wa-l-Ghilmān fī Tadschwīd al-Qurʾān“**, ein Lehrgedicht aus 61 Versen, vollendet **1198 n. H.** (ca. 1783 n. Chr.). Weitere Werke: „Fatḥ al-Aqfāl“, „Kanz al-Maʿānī“ und „al-Fatḥ ar-Raḥmānī“ über die Qirāʾāt.",
          "Sein genaues Todesjahr ist unbekannt; belegt ist, dass er 1208 n. H. (ca. 1793 n. Chr.) noch lebte. Möge Allah ihm reichlich Barmherzigkeit schenken und uns aus seinem Wissen Nutzen gewähren. Āmīn."
        ],
        en: [
          "Shaykh Sulaymān al-Jamzūrī (rh.) is among the well-known scholars of Tajwīd of the 12th Islamic century (ca. 18th century CE).",
          "His full name is **Sulaymān ibn Ḥusayn ibn Muḥammad ibn Shalabī al-Jamzūrī**, known as **\"al-Afandī\"**. The attribution \"al-Jamzūrī\" refers to **Jamzūr** near Tanta (al-Minūfiyya region) in Egypt. He was born around 1160 AH (ca. 1747 CE) in the month of Rabīʿ al-Awwal.",
          "He was of the Shāfiʿī school and studied under many scholars. His most famous teacher, **Nūr al-Dīn al-Mīhī** (rh.), taught him Tajwīd and Qirāʾāt in particular; **Mujāhid al-Aḥmadī** (rh.) granted him the honorific \"al-Afandī\".",
          "His most famous work is this **\"Tuḥfat al-Aṭfāl wa'l-Ghilmān fī Tajwīd al-Qurʾān\"**, a didactic poem of 61 verses, completed in **1198 AH** (ca. 1783 CE). His other works include \"Fatḥ al-Aqfāl\", \"Kanz al-Maʿānī\" and \"al-Fatḥ al-Raḥmānī\" on the Qirāʾāt.",
          "His exact year of death is unknown; it is established that he was still alive in 1208 AH (ca. 1793 CE). May Allah grant him abundant mercy and benefit us through his knowledge. Āmīn."
        ]
      }
    }
  },

  /* --------------------------------------------------------------------------
     BÖLÜMLER
     -------------------------------------------------------------------------- */
  sections: [

    /* ===== 1) MUKADDİME (1–5) — TAM İŞLENMİŞ ===== */
    {
      id: "mukaddime",
      num: 1,
      arTitle: "الْمُقَدِّمَة",
      title: { tr: "Mukaddime", de: "Einleitung (Muqaddima)", en: "Introduction (Muqaddima)" },
      range: [1, 5],
      overview: {
        tr: "Nâzım (el-Cemzûrî), esere önce **hamdele ve salvele** ile başlar; kendini tanıtır, eserin adını (**Tuhfetü'l-Etfâl**) ve konusunu (**nûn-tenvîn hükümleri ve medler**) bildirir, hocası el-Meyhî'ye nispetini zikreder ve son olarak talebelerin faydalanması ile ecir, kabul ve sevap için **dua eder**. Kısacası bu bölüm eserin kimlik kartıdır: kim yazdı, ne hakkında, hangi niyetle.",
        de: "Der Verfasser (al-Dschamzūrī) beginnt mit **Lobpreis und Segensgruß**, stellt sich vor, nennt den Titel (**Tuḥfat al-Atfāl**) und das Thema (**die Regeln von Nūn/Tanwīn und die Madd-Arten**), führt seinen Lehrer al-Mīhī an und **bittet** schließlich um Nutzen für die Studierenden sowie um Lohn, Annahme und Belohnung. Kurz: Dieser Abschnitt ist der „Ausweis“ des Werks.",
        en: "The author (al-Jamzūrī) opens with **praise and blessings**, introduces himself, names the title (**Tuḥfat al-Aṭfāl**) and the subject (**the rulings of nūn/tanwīn and the types of madd**), mentions his teacher al-Mīhī, and finally **prays** that students benefit and for reward, acceptance and recompense. In short, this section is the work's identity card."
      },
      beyits: [
        {
          n: 1,
          translation: {
            tr: "Bağışlayıcı (Rabbinin) rahmetini uman kul şöyle der; o, daima (rahmet dileyen) Süleyman el-Cemzûrî'dir.",
            de: "Es spricht der auf die Barmherzigkeit des Allverzeihenden Hoffende — stets — Sulaymān, er ist al-Dschamzūrī.",
            en: "Thus speaks the one hoping for the mercy of the All-Forgiving — ever so — Sulaymān, he is al-Jamzūrī."
          },
          words: [
            { ar: "يَقُولُ", tr: "der, söyler", de: "er spricht", en: "he says", note: { tr: "Muzâri fiil.", de: "Präsensverb.", en: "Imperfect verb." } },
            { ar: "رَاجِي", tr: "uman, ümit eden", de: "der Hoffende", en: "the one hoping", note: { tr: "İsm-i fâil.", de: "Partizip Aktiv.", en: "Active participle." } },
            { ar: "رَحْمَةِ", tr: "rahmetini", de: "die Barmherzigkeit", en: "the mercy of" },
            { ar: "الْغَفُورِ", tr: "çok bağışlayanın (Allah)", de: "des Allverzeihenden", en: "the All-Forgiving", note: { tr: "Günahları örtüp hesaba çekmeyen.", de: "Der die Sünden bedeckt.", en: "Who covers sins." } },
            { ar: "دَوْماً", tr: "daima, her zaman", de: "beständig", en: "ever, always" },
            { ar: "سُلَيْمَانُ", tr: "Süleyman", de: "Sulaymān", en: "Sulaymān", note: { tr: "Nâzımın adı.", de: "Name des Autors.", en: "The author's name." } },
            { ar: "هُوَ", tr: "o(dur)", de: "er (ist)", en: "he (is)" },
            { ar: "الْجَمْزُورِى", tr: "Cemzûrlu", de: "der aus Dschamzūr", en: "the one from Jamzūr", note: { tr: "Nisbe: Cemzûr köyüne mensup.", de: "Nisba zum Ort Dschamzūr.", en: "Nisba to the village Jamzūr." } }
          ],
          sharh: {
            tr: [
              "Bağışlayıcı Rabbinden ihsan uman kişi der ki — yani çokça bağışlayan, günahları örtüp onlardan dolayı hesaba çekmeyen Rabbin rahmetini uman kişi — her zaman: O, **Süleyman b. Hüseyin b. Muhammed el-Cemzûrî**'dir (cîmden sonra mîm ile).",
              "Nitekim eş-Şa'rânî bunu meşhur *Tabakāt*'ında zikretmiştir."
            ],
            de: [
              "Der auf das Wohltun seines allverzeihenden Herrn Hoffende — d. h. jener, der auf die Barmherzigkeit des Herrn hofft, der die Sünden bedeckt und nicht dafür zur Rechenschaft zieht — spricht beständig: Er ist **Sulaymān ibn Ḥusayn ibn Muḥammad al-Dschamzūrī** (mit Mīm nach dem Dschīm).",
              "So hat es asch-Schaʿrānī in seinen bekannten *Ṭabaqāt* erwähnt."
            ],
            en: [
              "The one hoping for the bounty of his All-Forgiving Lord — that is, hoping for the mercy of the Lord who covers sins and does not take one to account for them — says, ever: He is **Sulaymān ibn Ḥusayn ibn Muḥammad al-Jamzūrī** (with a mīm after the jīm).",
              "So al-Shaʿrānī mentioned in his famous *Ṭabaqāt*."
            ]
          }
        },
        {
          n: 2,
          translation: {
            tr: "Hamd Allah'a mahsustur; Muhammed'e, âline ve (ona) tâbi olanlara salât ederek (söze başlarım).",
            de: "Alles Lob gebührt Allah — Segen sprechend über Muḥammad, seine Familie und wer (ihm) folgte.",
            en: "All praise is due to Allah — invoking blessings upon Muḥammad, his family, and whoever followed."
          },
          words: [
            { ar: "الْحَمْدُ", tr: "hamd, güzel övgü", de: "das Lob", en: "the praise" },
            { ar: "لِلَّهِ", tr: "Allah'a mahsustur", de: "gebührt Allah", en: "is due to Allah" },
            { ar: "مُصَلِّياً", tr: "salât ederek", de: "Segen sprechend", en: "invoking blessings", note: { tr: "Hâl (durum bildiren).", de: "Zustandsangabe (ḥāl).", en: "Circumstantial (ḥāl)." } },
            { ar: "عَلى", tr: "üzerine", de: "über", en: "upon" },
            { ar: "مُحَمَّدٍ", tr: "Muhammed (ﷺ)", de: "Muḥammad (ﷺ)", en: "Muḥammad (ﷺ)" },
            { ar: "وآلِهِ", tr: "ve âline", de: "und seine Familie", en: "and his family", note: { tr: "Ona iman edenler; sahabeyi de kapsar.", de: "Die an ihn glaubten; schließt die Gefährten ein.", en: "Those who believed in him; includes the Companions." } },
            { ar: "وَمَنْ", tr: "ve kimse(ler)", de: "und wer", en: "and whoever" },
            { ar: "تَلاَ", tr: "tâbi oldu", de: "folgte", en: "followed" }
          ],
          sharh: {
            tr: [
              "\"Allah'a hamdolsun\" demek, yani **güzel övgü yalnızca O'na mahsustur**; bunda O'na hakiki olarak hiç kimse ortak olamaz.",
              "\"Salât ederek\" yani Allah'tan, yücelikle birlikte olan rahmetini Efendimiz Muhammed üzerine artırmasını talep ederek; O ki, gök ehli de yer ehli de onu över.",
              "\"Âline\" yani yakınlarına; burada kastedilen **ona iman edenlerdir**, bu da sahabeyi kapsar. \"Ve ona uyanlara\" yani Peygamber'e ve ashabına tâbi olanlara."
            ],
            de: [
              "„Alles Lob gebührt Allah“ bedeutet: **Das schöne Lob gebührt allein Ihm**; darin hat niemand in Wahrheit teil an Ihm.",
              "„Segen sprechend“ heißt: von Allah erbittend, dass Er Seine mit Erhabenheit verbundene Barmherzigkeit über unseren Herrn Muḥammad mehre — ihn, den die Bewohner des Himmels und der Erde preisen.",
              "„Seine Familie“ meint seine Nahen; gemeint sind **die an ihn Glaubenden**, was die Gefährten einschließt. „Und wer folgte“ meint jene, die dem Propheten und seinen Gefährten folgten."
            ],
            en: [
              "\"All praise is due to Allah\" means: **beautiful praise belongs to Him alone**; none truly shares in it with Him.",
              "\"Invoking blessings\" means: asking Allah to increase His mercy — coupled with exaltation — upon our master Muḥammad, whom the dwellers of the heavens and the earth praise.",
              "\"His family\" means his close ones; what is intended is **those who believed in him**, which includes the Companions. \"And whoever followed\" means those who followed the Prophet and his Companions."
            ]
          }
        },
        {
          n: 3,
          translation: {
            tr: "Bundan sonra: Bu nazım, (ilim) isteyen kimse içindir; nûn, tenvîn ve medler hakkındadır.",
            de: "Und danach: Dieses Gedicht ist für den Lernwilligen — über Nūn, Tanwīn und die Madd-Arten.",
            en: "And thereafter: This poem is for the aspirant — concerning nūn, tanwīn, and the madd forms."
          },
          words: [
            { ar: "وَبَعْدُ", tr: "bundan sonra (asıl konuya geçiş)", de: "und danach", en: "and thereafter" },
            { ar: "هذَا", tr: "bu", de: "dieses", en: "this" },
            { ar: "النَّظْمُ", tr: "nazım, manzum eser", de: "das Lehrgedicht", en: "the poem" },
            { ar: "لِلْمُرِيدِ", tr: "isteyen/talep eden için", de: "für den Lernwilligen", en: "for the aspirant" },
            { ar: "في", tr: "hakkında", de: "über", en: "concerning" },
            { ar: "النُّونِ", tr: "nûn (sâkin nûn)", de: "das Nūn", en: "the nūn" },
            { ar: "والتَّنْوِينِ", tr: "ve tenvîn", de: "und das Tanwīn", en: "and the tanwīn" },
            { ar: "وَالْمُدُودِ", tr: "ve medler", de: "und die Madd-Arten", en: "and the madd forms" }
          ],
          sharh: {
            tr: [
              "Daha önce geçen tam hamd ve en yüce Peygamber'e salâttan sonra, bu nazım — yani manzum eser — **isteyen, talep eden kimse içindir**.",
              "Bu eser; sâkin nûn ve tenvîn hükümleri, medd hükümleri ve ayrıca sâkin mîm, lâm-ı tarif ve fiil lâmı gibi diğer hükümler hakkındadır."
            ],
            de: [
              "Nach dem vollständigen Lob und dem Segen über den erhabensten Propheten ist dieses Gedicht — das Lehrgedicht — **für den, der es begehrt und sucht**.",
              "Es behandelt die Regeln von sākinem Nūn und Tanwīn, die Madd-Regeln sowie weitere Themen wie das sākine Mīm, das Lām des Artikels und das Lām des Verbs."
            ],
            en: [
              "After the complete praise and blessing upon the most exalted Prophet, this poem — the versified work — is **for the one who desires and seeks it**.",
              "It concerns the rulings of sākin nūn and tanwīn, the madd rulings, and further topics such as the sākin mīm, the lām of the article, and the lām of the verb."
            ]
          }
        },
        {
          n: 4,
          translation: {
            tr: "Ona 'Tuhfetü'l-Etfâl' adını verdim; kemal sahibi şeyhimiz el-Meyhî'den naklen.",
            de: "Ich nannte es „Tuḥfat al-Atfāl“ — nach unserem Schaykh al-Mīhī, dem Vollkommenen.",
            en: "I named it \"Tuḥfat al-Aṭfāl\" — from our shaykh al-Mīhī, the perfect one."
          },
          words: [
            { ar: "سَمَّيتُهُ", tr: "ona ad verdim", de: "ich nannte es", en: "I named it" },
            { ar: "بِتُحْفَةِ", tr: "Tuhfe (armağan) ile", de: "als „Tuḥfa“ (Geschenk)", en: "\"Tuḥfa\" (a gift)" },
            { ar: "الأَطْفَالِ", tr: "çocuklar(ın)", de: "der Kinder", en: "of the children", note: { tr: "\"Tıfl\"ın çoğulu; buluğa ermemişler veya bu ilimde yeni başlayanlar.", de: "Plural von „ṭifl“; Anfänger.", en: "Plural of \"ṭifl\"; beginners." } },
            { ar: "عَنْ", tr: "-den (naklen)", de: "von (überliefert)", en: "from (transmitted)" },
            { ar: "شَيْخِنَا", tr: "şeyhimiz", de: "unserem Schaykh", en: "our shaykh" },
            { ar: "الْمَيْهِىِّ", tr: "el-Meyhî", de: "al-Mīhī", en: "al-Mīhī", note: { tr: "Nûruddîn Ali b. Ömer el-Meyhî.", de: "Nūr ad-Dīn ʿAlī al-Mīhī.", en: "Nūr al-Dīn ʿAlī al-Mīhī." } },
            { ar: "ذِي", tr: "sahibi", de: "der Besitzer von", en: "possessor of" },
            { ar: "الْكَمالِ", tr: "kemâl (olgunluk)", de: "der Vollkommenheit", en: "perfection" }
          ],
          sharh: {
            tr: [
              "Bu nazmı **\"Tuhfetü'l-Etfâl\"** diye isimlendirdim. Buradaki anlam, çocuklara güzel bir şey (tuhfe/armağan) sunmaktır; maksat da burada gelecek olan hükümlerdir. \"Etfâl\", çocuk kelimesinin çoğuludur; buluğa ermemiş olanlar yahut bu ilimde yeni başlayanlar kastedilir.",
              "Bunu, şeyhimiz, büyük âlim **Nûruddîn Ali b. Ömer el-Meyhî**'den naklettim. \"Zi'l-kemâl\" yani zâtında, sıfatlarında ve bütün hâllerinde kemâl (olgunluk) sahibidir."
            ],
            de: [
              "Ich nannte dieses Gedicht **„Tuḥfat al-Atfāl“**. Der Sinn ist, den Kindern etwas Schönes (eine Tuḥfa/ein Geschenk) darzureichen; gemeint sind die folgenden Regeln. „Atfāl“ ist der Plural von „Kind“; gemeint sind Unmündige bzw. Anfänger dieser Wissenschaft.",
              "Ich überlieferte es von unserem Schaykh, dem großen Gelehrten **Nūr ad-Dīn ʿAlī ibn ʿUmar al-Mīhī**. „Ẕu-l-kamāl“ heißt: vollkommen in seinem Wesen, seinen Eigenschaften und all seinen Zuständen."
            ],
            en: [
              "I named this poem **\"Tuḥfat al-Aṭfāl\"**. The meaning is to present to children something fine (a tuḥfa/gift); what is intended are the rulings to follow. \"Aṭfāl\" is the plural of \"child\"; meant are the young, or beginners in this science.",
              "I transmitted it from our shaykh, the great scholar **Nūr al-Dīn ʿAlī ibn ʿUmar al-Mīhī**. \"Dhu'l-kamāl\" means: perfect in his essence, his attributes, and all his states."
            ]
          }
        },
        {
          n: 5,
          translation: {
            tr: "Onunla talebelerin faydalanmasını, ayrıca ecir, kabul ve sevabı umarım.",
            de: "Ich hoffe, dass die Studierenden davon Nutzen ziehen — sowie auf Lohn, Annahme und Belohnung.",
            en: "I hope thereby that students may benefit — and for reward, acceptance, and recompense."
          },
          words: [
            { ar: "أَرْجُو", tr: "umarım", de: "ich hoffe", en: "I hope" },
            { ar: "بِهِ", tr: "onunla", de: "damit", en: "thereby" },
            { ar: "أَنْ يَنْفَعَ", tr: "faydalanmasını", de: "dass er nützt", en: "that it benefit" },
            { ar: "الطُّلاَّبَا", tr: "talebeleri", de: "die Studierenden", en: "the students" },
            { ar: "وَالأَجْرَ", tr: "ve ecri", de: "und den Lohn", en: "and reward", note: { tr: "Amelin karşılığı.", de: "Lohn für die Tat.", en: "Requital for the deed." } },
            { ar: "وَالْقَبُولَ", tr: "ve kabulü", de: "und die Annahme", en: "and acceptance" },
            { ar: "وَالثَّوَابَا", tr: "ve sevabı", de: "und die Belohnung", en: "and recompense" }
          ],
          sharh: {
            tr: [
              "Allah'tan ümit ederim ki bu nazım ile **talebeler faydalansın** — başlangıç seviyesinde olan da, orta seviyede olan da. Ayrıca bununla Allah'tan ecir, kabul ve sevap umarım.",
              "**Ecir**, amelin karşılığıdır. **Kabul**, dua edenin istediği maksadın gerçekleşmesidir. **Sevap** ise Allah'ın, kullarının güzel amellerine karşılık lütfettiği, miktarını yalnız kendisinin bildiği karşılıktır.",
              "eş-Şihâb *Şifâ Şerhi*'nde şöyle demiştir: Ecir ve sevap aynı anlamdadır; bazen ecir \"amelin karşılığı\", sevap ise \"Allah'ın lütfu\" diye ayrılır, fakat her biri diğerinin yerine kullanılabilir."
            ],
            de: [
              "Ich erhoffe von Allah, dass durch dieses Gedicht **die Studierenden Nutzen ziehen** — der Anfänger wie der Fortgeschrittene. Zudem erhoffe ich damit Lohn, Annahme und Belohnung.",
              "**Adschr (Lohn)** ist die Vergeltung der Tat. **Qabūl (Annahme)** ist das Eintreten des erbetenen Ziels. **Thawāb (Belohnung)** ist die Gunst, die Allah für die guten Taten Seiner Diener gewährt und deren Maß nur Er kennt.",
              "asch-Schihāb sagte im *Kommentar zur Schifāʾ*: Adschr und Thawāb bedeuten dasselbe; mitunter unterscheidet man Adschr als „Vergeltung der Tat“ und Thawāb als „Gunst Allahs“, doch beide vertreten einander."
            ],
            en: [
              "I hope from Allah that through this poem **the students may benefit** — the beginner and the intermediate alike. I also hope thereby for reward, acceptance, and recompense from Allah.",
              "**Ajr (reward)** is the requital of the deed. **Qabūl (acceptance)** is the granting of the sought aim. **Thawāb (recompense)** is the favour Allah bestows for His servants' good deeds, whose measure only He knows.",
              "Al-Shihāb said in the *Commentary on al-Shifāʾ*: Ajr and thawāb bear the same meaning; sometimes ajr is distinguished as \"requital of the deed\" and thawāb as \"a favour from Allah\", yet each stands for the other."
            ]
          }
        }
      ],
      summary: {
        tr: [
          "Eser, **hamdele** (Allah'a hamd) ve **salvele** (Peygamber'e salât) ile başlar — klasik telif âdâbı.",
          "Nâzım kendini tanıtır: **Süleyman el-Cemzûrî**.",
          "Eserin adı: **Tuhfetü'l-Etfâl**; kaynağı: hocası **el-Meyhî**.",
          "Konusu: **sâkin nûn ve tenvîn**, **medler** ve bağlantılı hükümler.",
          "Gaye: **talebenin faydası** ve **ihlâsla** ecir/kabul/sevap dileği."
        ],
        de: [
          "Das Werk beginnt mit **Ḥamdala** (Lob Allahs) und **Ṣalwala** (Segen über den Propheten).",
          "Der Verfasser stellt sich vor: **Sulaymān al-Dschamzūrī**.",
          "Titel: **Tuḥfat al-Atfāl**; Quelle: sein Lehrer **al-Mīhī**.",
          "Thema: **sākines Nūn und Tanwīn**, die **Madd-Arten** und verwandte Regeln.",
          "Ziel: **Nutzen der Studierenden** und aufrichtige Bitte um Lohn/Annahme/Belohnung."
        ],
        en: [
          "The work opens with **ḥamdala** (praise of Allah) and **ṣalwala** (blessing on the Prophet).",
          "The author introduces himself: **Sulaymān al-Jamzūrī**.",
          "Title: **Tuḥfat al-Aṭfāl**; source: his teacher **al-Mīhī**.",
          "Subject: **sākin nūn and tanwīn**, the **madd forms**, and related rulings.",
          "Aim: **the students' benefit** and a sincere prayer for reward/acceptance/recompense."
        ]
      }
    },

    /* ===== 2) NÛN-I SÂKİNE VE TENVÎN (6–16) ===== */
    {
      id: "nun-sakine",
      num: 2,
      arTitle: "النُّونُ السَّاكِنَةُ وَالتَّنْوِين",
      title: { tr: "Nûn-ı Sâkine ve Tenvîn", de: "Nūn Sākina und Tanwīn", en: "Nūn Sākina and Tanwīn" },
      range: [6, 16],
      provenance: {
        tr: "Not: Bu bölümün açıklamaları, gönderilen PDF şerhinde yer almadığından; doğrudan nazmın kendi metnine ve tecvid ilminin üzerinde ittifak edilen yerleşik kaidelerine dayanılarak, aynı sadelik ve düzenle hazırlanmıştır. Elinizde bu bölüme ait özel bir şerh varsa, onunla değiştirebiliriz.",
        de: "Hinweis: Da dieser Abschnitt im übermittelten PDF-Kommentar fehlt, stützen sich die Erläuterungen unmittelbar auf den Verstext selbst und auf die allgemein anerkannten Grundregeln der Tadschwīd-Wissenschaft.",
        en: "Note: As this section is absent from the provided PDF commentary, its explanations rest directly on the verse text itself and on the settled, agreed-upon rules of the science of Tajwīd."
      },
      overview: {
        tr: "Nazmın asıl konusuna girişidir. Sâkin nûn (نْ) ve tenvîn (ـً ـٍ ـٌ) için **dört hüküm** anlatılır: **İzhâr** (boğaz harflerinde açık okuma), **İdğâm** (gunneli/gunnesiz olarak sonraki harfe katma), **İklâb** (bâ'dan önce mîme çevirme) ve **İhfâ** (geri kalan on beş harfte gizleme). Nâzım her hükmün harflerini, remz cümleleriyle ezberlenecek şekilde sıralar.",
        de: "Der eigentliche Einstieg des Gedichts: Für das sākine Nūn und das Tanwīn werden **vier Regeln** dargelegt — **Iẓhār**, **Idghām**, **Iqlāb** und **Ikhfāʾ** — mitsamt ihren Buchstaben, in Merkformeln gefasst.",
        en: "The poem's substantive opening: for sākin nūn and tanwīn, **four rulings** are set out — **Iẓhār**, **Idghām**, **Iqlāb**, and **Ikhfāʾ** — each with its letters, cast as mnemonic phrases."
      },
      beyits: [
        {
          n: 6,
          translation: { tr: "Sâkin nûn ve tenvîn için dört hüküm vardır; açıklamamı iyi belle." },
          sharh: {
            tr: [
              "**Sâkin nûn (نْ):** Harekesi olmayan, vasl ve vakıfta sabit kalan nûndur; ister isimde, ister fiilde, ister harfte bulunsun.",
              "**Tenvîn (ـً ـٍ ـٌ):** İsmin sonuna gelen, yazıda değil fakat **okuyuşta** sabit olan, vakıfta düşen sâkin bir nûndur (iki üstün, iki esre, iki ötre ile gösterilir).",
              "Bu ikisinin sonrasına gelen harfe göre **dört hükmü** vardır: **İzhâr · İdğâm · İklâb · İhfâ**. Nâzım şimdi bunları sırayla açıklayacaktır."
            ]
          }
        },
        {
          n: 7,
          translation: { tr: "Birincisi izhârdır; boğaz harflerinden önce gelir; onlar sırayla dizilmiş altı harftir, öğren." },
          sharh: {
            tr: [
              "**İzhâr:** Lügatte \"açığa çıkarmak\"; ıstılahta, sâkin nûn veya tenvîni **gunne yapmadan, açıkça** kendi mahrecinden okumaktır.",
              "**Sebebi:** Boğaz harfleri ile nûnun mahreci birbirinden **uzak** olduğu için, aralarında idğam/ihfâ gibi bir karışma olmaz; her biri açıkça okunur.",
              "Bu sebeple ona **\"İzhâr-ı halkî\"** (boğaz izhârı) denir."
            ]
          }
        },
        {
          n: 8,
          translation: { tr: "(Bunlar:) hemze, sonra hâ, sonra ayn ve (noktasız ikili) hâ, sonra ğayn ve hı." },
          sharh: {
            tr: [
              "İzhâr harfleri, mahreçleri boğazda olan **altı harftir**: **ء · هـ · ع · ح · غ · خ**.",
              "Nâzım bunları boğazın dibinden ağza doğru sırayla verir: (boğaz dibi) hemze–hâ, (boğaz ortası) ayn–hâ, (boğaz ucu) ğayn–hı. \"Mühmeletân\" (noktasızlar) ifadesi, noktalı olan خ/غ'den ayırmak için ع/ح'nin noktasız oluşuna işarettir."
            ]
          },
          examples: [
            { ar: "مَنْ آمَنَ", ref: { name: "izhâr — hemze" }, tr: "\"men âmene\" — sâkin nûn + hemze" },
            { ar: "يَنْأَوْنَ", ref: { name: "izhâr — hemze (tek kelime)" }, tr: "\"yen'evne\"" },
            { ar: "مِنْ هَادٍ", ref: { name: "izhâr — hâ" }, tr: "\"min hâd\"" },
            { ar: "أَنْعَمْتَ", ref: { name: "izhâr — ayn" }, tr: "\"en'amte\"" },
            { ar: "مِنْ حَكِيمٍ", ref: { name: "izhâr — hâ" }, tr: "\"min hakîm\"" },
            { ar: "مِنْ غِلٍّ", ref: { name: "izhâr — ğayn" }, tr: "\"min ğill\"" }
          ]
        },
        {
          n: 9,
          translation: { tr: "İkincisi idğâmdır; altı harfte gelir, 'يرملون' (yermelûn) kelimesinde toplanmış ve onlarca sabit olmuştur." },
          sharh: {
            tr: [
              "**İdğâm:** Sâkin nûn/tenvîni, sonrasındaki harfe **katarak**, iki harfi şeddeli tek harf hâline getirmektir.",
              "İdğam harfleri altı olup **«يَرْمَلُونَ»** kelimesinde toplanmıştır: **ي · ر · م · ل · و · ن**."
            ]
          }
        },
        {
          n: 10,
          translation: { tr: "Fakat o iki kısımdır: bir kısmı gunne ile idğam edilir; bu da 'ينمو' (yenmû) harfleriyle bilinir." },
          sharh: {
            tr: [
              "**1) Gunneli idğâm (idğâm-ı meagunne):** Dört harfte olur; bunlar **«يَنْمُو»** kelimesinde toplanmıştır: **ي · ن · م · و**. Bu harflere idğam edilirken gunne (geniz sesi) korunur."
            ]
          },
          examples: [
            { ar: "مَنْ يَقُولُ", ref: { name: "gunneli idğâm — yâ" }, tr: "\"mey yekûl\" (نْ → يّ, gunne ile)" },
            { ar: "مِنْ نِعْمَةٍ", ref: { name: "gunneli idğâm — nûn" }, tr: "\"min ni'me\" → \"minne'me\"" },
            { ar: "مِنْ مَاءٍ", ref: { name: "gunneli idğâm — mîm" }, tr: "\"mim mâ'\"" },
            { ar: "مِنْ وَالٍ", ref: { name: "gunneli idğâm — vâv" }, tr: "\"miv vâl\"" }
          ]
        },
        {
          n: 11,
          translation: { tr: "Ancak (nûn ile harf) tek kelimede bulunursa idğam etme; 'دُنْيَا' ve ardından 'صِنْوَان' gibi." },
          sharh: {
            tr: [
              "**İstisna (izhâr-ı mutlak):** Sâkin nûn ile idğam harfi (و/ي) **aynı kelimede** bir arada bulunursa idğam **yapılmaz**, açıkça okunur. Aksi hâlde kelime aslından uzaklaşır, mana karışırdı.",
              "Kur'ân'da bu, dört kelimede geçer: **دُنْيَا · صِنْوَان · قِنْوَان · بُنْيَان**."
            ]
          },
          examples: [
            { ar: "الدُّنْيَا", ref: { name: "izhâr-ı mutlak" }, tr: "\"ed-dünyâ\" — tek kelimede, idğam yok" },
            { ar: "صِنْوَانٌ", ref: { name: "izhâr-ı mutlak" }, tr: "\"sınvân\"" }
          ]
        },
        {
          n: 12,
          translation: { tr: "İkinci (kısım) gunnesiz idğamdır; lâm ve râ'da olur; sonra onu tekrar et (şeddele)." },
          sharh: {
            tr: [
              "**2) Gunnesiz idğâm (idğâm-ı bilâ gunne):** İki harfte olur: **ل · ر**. Nûn/tenvîn bu iki harfe **gunnesiz**, tam olarak katılır (şeddelenir).",
              "\"Kerriranneh (tekrar et)\" ifadesi, râ'nın tekrîr sıfatına yahut idğamı iyice yerleştirmeye işarettir."
            ]
          },
          examples: [
            { ar: "مِنْ لَدُنْهُ", ref: { name: "gunnesiz idğâm — lâm" }, tr: "\"mil ledunh\"" },
            { ar: "مِنْ رَبِّهِمْ", ref: { name: "gunnesiz idğâm — râ" }, tr: "\"mir rabbihim\"" }
          ]
        },
        {
          n: 13,
          translation: { tr: "Üçüncüsü iklâbdır; bâ harfi yanında (nûn) mîme çevrilir, gunne ve ihfâ ile." },
          sharh: {
            tr: [
              "**İklâb:** Sâkin nûn veya tenvîni, **bâ (ب)** harfinden önce **mîme (م) çevirip**, gunne ile ve ihfâ hâlinde (dudakları tam kapatmadan) okumaktır.",
              "Harfi tektir: **ب**. Mushaflarda nûnun üzerine küçük bir mîm (ﻢ) konarak gösterilir."
            ]
          },
          examples: [
            { ar: "مِنْ بَعْدِ", ref: { name: "iklâb" }, tr: "\"mimm ba'di\" (نْ → م, gunne ile)" },
            { ar: "أَنْبِئْهُمْ", ref: { name: "iklâb (tek kelime)" }, tr: "\"embi'hum\"" },
            { ar: "سَمِيعٌ بَصِيرٌ", ref: { name: "iklâb — tenvîn" }, tr: "\"semî'um basîr\"" }
          ]
        },
        {
          n: 14,
          translation: { tr: "Dördüncüsü ihfâdır; (geri) kalan harfler yanında; faziletli okuyucu için vaciptir." },
          sharh: {
            tr: [
              "**İhfâ:** Sâkin nûn/tenvîni; izhâr'ın açıklığı ile idğâm'ın tam katılması **arasında** bir hâlde, **gunne ile** ve dile dayanmadan gizleyerek okumaktır.",
              "Geriye kalan (izhâr, idğâm ve iklâb harfleri dışındaki) **on beş harfte** olur ve okuyucu için vaciptir."
            ]
          }
        },
        {
          n: 15,
          translation: { tr: "On harften sonra gelen beş (yani on beş) harfte olur; remzini bu beytin kelimelerine yerleştirdim." },
          sharh: {
            tr: [
              "İhfâ harfleri **on beştir**. Nâzım, bunların remzini bir sonraki beytin (16. beyit) kelimelerinin **ilk harflerine** yerleştirmiştir; her kelimenin baş harfi bir ihfâ harfidir."
            ]
          }
        },
        {
          n: 16,
          translation: { tr: "«Sıfat sahibini övgüyle an; nice cömert, yükselen kişi vardır; temiz kal, takvanı artır, zalimi bırak.» — Bu cümlenin her kelimesinin ilk harfi, bir ihfâ harfini remzeder." },
          sharh: {
            tr: [
              "Beytin kelimelerinin baş harfleri, on beş ihfâ harfini verir: **ص ذ ث ك ج ش ق س د ط ز ف ت ض ظ**.",
              "(**صِفْ ذَا ثَنَا كَمْ جَادَ شَخْصٌ قَدْ سَمَا · دُمْ طَيِّبًا زِدْ فِي تُقًى ضَعْ ظَالِمَا**)"
            ]
          },
          examples: [
            { ar: "مِنْكُمْ", ref: { name: "ihfâ — kâf" }, tr: "\"minkum\" (gunne ile, dil dişe değmeden)" },
            { ar: "أَنْتُمْ", ref: { name: "ihfâ — tâ" }, tr: "\"entum\"" },
            { ar: "مَنْصُورًا", ref: { name: "ihfâ — sâd" }, tr: "\"mensûrâ\"" },
            { ar: "جَنَّاتٍ تَجْرِي", ref: { name: "ihfâ — tenvîn + tâ" }, tr: "\"cennâtin tecrî\"" }
          ]
        }
      ],
      summary: {
        tr: [
          "Sâkin nûn / tenvîn + **boğaz harfleri (ء ه ع ح غ خ)** → **İzhâr** (açık, gunnesiz).",
          "+ **يرملون** → **İdğâm**: gunneli (**ينمو**: ي ن م و) / gunnesiz (**ل ر**).",
          "İstisna: aynı kelimede (دنيا، صنوان، قنوان، بنيان) → **izhâr** (idğam yok).",
          "+ **bâ (ب)** → **İklâb**: nûn → mîm, gunne ile.",
          "+ **kalan 15 harf** → **İhfâ**: gunne ile gizleme (remz: *صف ذا ثنا…*)."
        ]
      }
    },

    /* ===== 3) MÎM VE NÛN MÜŞEDDEDE (17) — TAM İŞLENMİŞ ===== */
    {
      id: "mim-nun-mushaddada",
      num: 3,
      arTitle: "الْمِيمُ وَالنُّونُ الْمُشَدَّدَتَان",
      title: { tr: "Şeddeli Mîm ve Nûn", de: "Verdoppeltes Mīm und Nūn", en: "Doubled Mīm and Nūn" },
      range: [17, 17],
      overview: {
        tr: "Kısa fakat temel bir kâide: Şeddeli mîm (ـمّ) ve şeddeli nûn (ـنّ) geldiğinde **gunne** yapmak **vaciptir**. Bu ikisinin her birine \"gunne harfi\" denir.",
        de: "Eine kurze, grundlegende Regel: Bei verdoppeltem Mīm (ـمّ) und Nūn (ـنّ) ist die **Ghunna** (Nasalierung) **verpflichtend**. Beide heißen „Ghunna-Buchstabe“.",
        en: "A short but foundational rule: with a doubled mīm (ـمّ) and nūn (ـنّ), applying the **ghunna** (nasalization) is **obligatory**. Each is called a \"ghunna letter\"."
      },
      beyits: [
        {
          n: 17,
          translation: {
            tr: "Şeddeli mîm'i, sonra şeddeli nûn'u gunnele; her birini 'gunne harfi' diye isimlendir.",
            de: "Nasaliere das (verdoppelte) Mīm, dann das Nūn — und nenne jedes einen „Ghunna-Buchstaben“.",
            en: "Apply ghunna to the (doubled) mīm, then the nūn — and name each a \"ghunna letter\"."
          },
          sharh: {
            tr: [
              "**Gunnenin tarifi:** Dilin hiçbir müdahalesi olmaksızın, nûn ve mîmin yapısında bulunan **hoş bir sestir**.",
              "**Gunnenin mahreci:** Hayşûm (geniz/burun boşluğu).",
              "**Hükmü:** Şeddeli nûn ve şeddeli mîm geldiğinde gunneyi açıkça yapmak **vaciptir**. Bunların her birine \"şeddeli gunne harfi\" denir.",
              "**Gunnenin miktarı:** İki harekedir. Hareke, parmağı açıp kapama süresi kadardır; ne aşırı yavaş ne de hızlı."
            ],
            de: [
              "**Definition der Ghunna:** Ein **angenehmer Laut**, der im Körper von Nūn und Mīm liegt, ohne Mitwirkung der Zunge.",
              "**Austrittsort:** Al-Chaischūm (die Nasenhöhle).",
              "**Urteil:** Bei verdoppeltem Nūn und Mīm ist es **verpflichtend**, die Ghunna deutlich auszuführen. Jedes heißt „verdoppelter Ghunna-Buchstabe“.",
              "**Maß der Ghunna:** Zwei Ḥaraka — die Zeit, einen Finger zu öffnen oder zu schließen; weder zu langsam noch zu schnell."
            ],
            en: [
              "**Definition of ghunna:** A **pleasant sound** residing in the body of the nūn and mīm, with no action of the tongue.",
              "**Its exit point:** Al-khayshūm (the nasal cavity).",
              "**Its ruling:** With a doubled nūn and mīm it is **obligatory** to make the ghunna clearly. Each is called a \"doubled ghunna letter\".",
              "**Its measure:** Two ḥarakāt — the span of opening or closing a finger; neither too slow nor too fast."
            ]
          },
          verses: [
            { ar: "وَلَا أُقْسِمُ بِالنَّفْسِ اللَّوَّامَةِ", ref: { sura: "el-Kıyâme", ayah: 2 }, tr: "«…nefs-i levvâmeye yemin ederim.» (şeddeli nûn: النَّفْس)" },
            { ar: "إِنَّ الْإِنْسَانَ لَفِي خُسْرٍ", ref: { sura: "el-Asr", ayah: 2 }, tr: "«İnsan gerçekten ziyandadır.» (şeddeli nûn: إِنَّ)" },
            { ar: "الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنْفِقُونَ", ref: { sura: "el-Bakara", ayah: 3 }, tr: "«…kendilerine verdiğimiz rızıktan infak ederler.» (şeddeli mîm: مِمَّا)" },
            { ar: "ثُمَّ كَانَ مِنَ الَّذِينَ آمَنُوا وَتَوَاصَوْا بِالصَّبْرِ وَتَوَاصَوْا بِالْمَرْحَمَةِ", ref: { sura: "el-Beled", ayah: 17 }, tr: "«Sonra iman edip birbirlerine sabrı ve merhameti tavsiye edenlerden oldu.» (şeddeli mîm: ثُمَّ)" }
          ]
        }
      ],
      summary: {
        tr: [
          "Şeddeli **nûn** ve **mîm** → **gunne vacip**.",
          "Gunne, **hayşûm**dan (genizden) çıkar.",
          "Miktarı **iki hareke**dir.",
          "Her ikisine \"**gunne harfi**\" denir."
        ]
      }
    },

    /* ===== 4) MÎM-İ SÂKİNE (18–23) — TAM İŞLENMİŞ ===== */
    {
      id: "mim-sakine",
      num: 4,
      arTitle: "الْمِيمُ السَّاكِنَة",
      title: { tr: "Mîm-i Sâkine", de: "Mīm Sākina", en: "Mīm Sākina" },
      range: [18, 23],
      overview: {
        tr: "Harekesiz mîm (مْ) için **üç hüküm** vardır: **İhfâ-i şefevî** (bâ'dan önce), **İdğâm-ı misleyn sagîr** (mîmden önce) ve **İzhâr-ı şefevî** (geri kalan 26 harfte). Nâzım ayrıca vâv ve fâ yanında mîmin yanlışlıkla gizlenmemesi için uyarır. Not: Sâkin mîm, iki sâkinin birleşmesinden kurtulmak için (cem' mîmi vb.) bazen harekelenebilir.",
        de: "Für das vokallose Mīm (مْ) gibt es **drei Regeln**: **Ikhfāʾ schafawī** (vor Bāʾ), **Idghām mithlain ṣaghīr** (vor Mīm) und **Iẓhār schafawī** (bei den übrigen 26 Buchstaben). Zudem eine Warnung vor unbeabsichtigtem Verbergen vor Wāw und Fāʾ.",
        en: "For the vowelless mīm (مْ) there are **three rulings**: **Ikhfāʾ shafawī** (before bāʾ), **Idghām mithlayn ṣaghīr** (before mīm), and **Iẓhār shafawī** (before the remaining 26 letters). Plus a caution against accidentally hiding it before wāw and fāʾ."
      },
      beyits: [
        {
          n: 18,
          translation: {
            tr: "Sâkin mîm, harflerden önce gelirse — akıl sahibi için — yumuşak eliften başkasının (yanında bulunur)…",
            de: "Das sākine Mīm kommt vor den Buchstaben — für den Verständigen — außer dem weichen Alif…",
            en: "The sākin mīm comes before the letters — for the discerning — except the soft alif…"
          },
          sharh: {
            tr: [
              "**Tarifi:** Harekesi olmayan mîmdir; vasl (geçiş) ve vakıf (durak) hâllerinde sâkin (sabit) kalır.",
              "Bu, iki sâkinin birleşmesinden kurtulmak için sonradan harekelenen mîm değildir. (Sâkin mîm bazen şu durumlarda harekelenir: cem' mîmi ötre alır — *aleyhimُ*; fiillerde esre — *lem yekُ*; tek bir yerde Âl-i İmrân başında *الٓمّ* + lafzatullah fetha alır: *الٓمّ ۝ اللَّهُ*.)",
              "**Neden \"elif hariç\"?** Elif zaten sâkin bir harftir ve müstakil, güçlü bir sese sahip değildir (ya hemze ile ya uzatma ile çıkar). Sâkin mîm ile karşılaştığında bir \"çarpışma\" (etkileşim) olmaz; bu yüzden üç hükümden hiçbiri gerçekleşmez. Diğer bütün harflerde ise bir hüküm doğar."
            ],
            de: [
              "**Definition:** Das Mīm ohne Vokal; es bleibt in Verbindung (Waṣl) und beim Anhalten (Waqf) sākin.",
              "Es ist nicht das Mīm, das zur Vermeidung zweier aufeinandertreffender Vokalloser bewegt wird. (Bewegt wird es etwa: als Plural-Mīm mit Ḍamma, in Verben mit Kasra, und an einer Stelle in Āl ʿImrān mit Fatḥa: *Alif-Lām-Mīm • Allāh*.)",
              "**Warum „außer Alif“?** Das Alif ist ohnehin sākin und hat keinen eigenständigen, kräftigen Laut. Trifft es auf das sākine Mīm, gibt es keine „Kollision“ (Wechselwirkung), daher greift keine der drei Regeln — anders als bei allen übrigen Buchstaben."
            ],
            en: [
              "**Definition:** The mīm without a vowel; it stays sākin both in continuity (waṣl) and when pausing (waqf).",
              "It is not the mīm vowelled to avoid two meeting sākins. (It is vowelled, e.g.: as the plural mīm with ḍamma, in verbs with kasra, and in one place in Āl ʿImrān with fatḥa: *Alif-Lām-Mīm • Allāh*.)",
              "**Why \"except alif\"?** The alif is already sākin and has no independent, strong sound. Meeting the sākin mīm produces no \"collision\" (interaction), so none of the three rulings applies — unlike with every other letter."
            ]
          }
        },
        {
          n: 19,
          translation: {
            tr: "Onun hükümleri, kavrayan için sadece üçtür: ihfâ, idğam ve izhâr.",
            de: "Seine Regeln sind — für den, der es erfasst — nur drei: Ikhfāʾ, Idghām und Iẓhār.",
            en: "Its rulings, for one who grasps them, are only three: ikhfāʾ, idghām, and iẓhār."
          },
          sharh: {
            tr: [
              "Sâkin mîmin üç hükmü şunlardır: **1) İhfâ-i şefevî**, **2) İdğâm-ı misleyn-i sagîr**, **3) İzhâr-ı şefevî**.",
              "Kural özeti: **مْ + (bir harf)** → sonraki harfe göre bu üç hükümden biri uygulanır."
            ],
            de: [
              "Die drei Regeln des sākinen Mīm: **1) Ikhfāʾ schafawī**, **2) Idghām mithlain ṣaghīr**, **3) Iẓhār schafawī**.",
              "Kurzregel: **مْ + (ein Buchstabe)** → je nach folgendem Buchstaben greift eine dieser drei Regeln."
            ],
            en: [
              "The three rulings of the sākin mīm: **1) Ikhfāʾ shafawī**, **2) Idghām mithlayn ṣaghīr**, **3) Iẓhār shafawī**.",
              "Rule in brief: **مْ + (a letter)** → depending on the following letter, one of these three applies."
            ]
          }
        },
        {
          n: 20,
          translation: {
            tr: "Birincisi ihfâdır, bâ harfi yanında olur; kurrâ için ona 'şefevî' de.",
            de: "Das erste ist Ikhfāʾ, beim Bāʾ; nenne es für die Rezitatoren „schafawī“.",
            en: "The first is ikhfāʾ, at the bāʾ; for the reciters, call it \"shafawī\"."
          },
          sharh: {
            tr: [
              "**Tarifi:** Lügatte \"örtmek\"; ıstılahta, bâ harfi yanında sâkin mîmin **örtülmesi/gizlenmesi**; tam gunneye riayet ve şeddelenmeme ile.",
              "**Harfi:** Tek harftir, o da **bâ**dır. **\"Şefevî\" denmesi:** Mîm ve bâ'nın mahreci **dudaklar** olduğu içindir.",
              "**Varlığı:** Yalnızca iki kelime arasında olur. **Uygulanışı:** Dudaklar arasında çok küçük bir açıklık bırakılır; tercih edilen görüşe göre dudaklar neredeyse kapanır. Bu ancak **telakkî** (hocadan öğrenme) ile düzgün olur."
            ],
            de: [
              "**Definition:** Sprachlich „bedecken“; fachlich das **Verbergen** des sākinen Mīm vor dem Bāʾ, unter voller Ghunna und ohne Verdopplung.",
              "**Sein Buchstabe:** einer — das **Bāʾ**. **„Schafawī“ (labial):** weil Mīm und Bāʾ aus den **Lippen** kommen.",
              "**Vorkommen:** nur zwischen zwei Wörtern. **Ausführung:** ein ganz kleiner Spalt zwischen den Lippen; nach der bevorzugten Ansicht schließen sie sich beinahe. Korrekt nur durch **Talaqqī** (Lernen beim Lehrer)."
            ],
            en: [
              "**Definition:** Literally \"to cover\"; technically, **concealing** the sākin mīm before the bāʾ, with full ghunna and without doubling.",
              "**Its letter:** one — the **bāʾ**. **Called \"shafawī\" (labial):** because mīm and bāʾ issue from the **lips**.",
              "**Occurrence:** only between two words. **Execution:** a very small gap between the lips; per the preferred view they almost meet. Correct only through **talaqqī** (learning from a teacher)."
            ]
          },
          verses: [
            { ar: "يَوْمَ هُمْ بَارِزُونَ", ref: { sura: "Ğâfir/Mü'min", ayah: 16 }, tr: "«O gün onlar (kabirlerinden) meydana çıkarlar.» (هُمْ بَارِزُونَ)" },
            { ar: "إِنَّ رَبَّهُمْ بِهِمْ يَوْمَئِذٍ لَخَبِيرٌ", ref: { sura: "el-Âdiyât", ayah: 11 }, tr: "«Şüphesiz Rableri o gün onlardan haberdardır.» (رَبَّهُمْ بِهِمْ)" }
          ]
        },
        {
          n: 21,
          translation: {
            tr: "İkincisi, benzeriyle (mîmle) gelen idğamdır; ey genç, ona 'küçük idğam' de.",
            de: "Das zweite ist Idghām, das mit seinesgleichen (Mīm) kommt; nenne es, junger Mann, „kleines Idghām“.",
            en: "The second is idghām, coming with its like (mīm); call it, young man, \"minor idghām\"."
          },
          sharh: {
            tr: [
              "**Tarifi:** Lügatte \"birleştirme, içe katma\"; ıstılahta, sâkin mîmin kendisi gibi **harekeli bir mîme** katılıp, ikisinin **şeddeli tek bir harf** olmasıdır.",
              "**Harfi:** Tek harftir, o da **mîm**dir. **\"Misleyn\" denmesi:** İki benzer harf arasında olduğu içindir. **\"Sagîr (küçük)\" denmesi:** İşlem az olduğu içindir; sâkin mîm doğrudan harekeli mîme, **gunne ile** katılır."
            ],
            de: [
              "**Definition:** Sprachlich „Verschmelzen, Einfügen“; fachlich das Einfügen des sākinen Mīm in ein gleichartiges **bewegtes Mīm**, sodass beide **ein verdoppelter Buchstabe** werden.",
              "**Sein Buchstabe:** das **Mīm**. **„Mithlain“:** weil es zwischen zwei gleichen Buchstaben steht. **„Ṣaghīr (klein)“:** weil wenig Aufwand nötig ist; das sākine Mīm geht direkt, **mit Ghunna**, in das bewegte über."
            ],
            en: [
              "**Definition:** Literally \"merging, insertion\"; technically, inserting the sākin mīm into a like **vowelled mīm**, so both become **one doubled letter**.",
              "**Its letter:** the **mīm**. **Called \"mithlayn\":** because it is between two identical letters. **Called \"ṣaghīr (minor)\":** because little effort is involved; the sākin mīm merges directly, **with ghunna**, into the vowelled one."
            ]
          },
          verses: [
            { ar: "لَهُمْ مَا يَشَاءُونَ عِنْدَ رَبِّهِمْ", ref: { sura: "ez-Zümer", ayah: 34 }, tr: "«Rableri katında diledikleri her şey onlarındır.» (لَهُمْ مَا)" }
          ]
        },
        {
          n: 22,
          translation: {
            tr: "Üçüncüsü izhârdır, geri kalan harflerde olur; ona 'şefevî' (dudaksal) de.",
            de: "Das dritte ist Iẓhār, bei den übrigen Buchstaben; nenne es „schafawī“ (labial).",
            en: "The third is iẓhār, with the remaining letters; call it \"shafawī\" (labial)."
          },
          sharh: {
            tr: [
              "**Tarifi:** Lügatte \"açıklık, ortaya koyma\"; ıstılahta, sâkin mîmin ardından **26 izhâr harfinden biri** geldiğinde, onu mahrecinden **gunnesiz ve açıkça** okumaktır.",
              "**Harfleri:** Elifbânın geri kalan **26 harfi**dir. **\"Şefevî\" denmesi:** İzhâr edilen mîm dudaklardan çıktığı içindir.",
              "**Uygulanışı:** Mîmi uzatmadan, dudakları hafifçe kapatıp açarak, tam gunne yapmadan — fakat **aslî gunneyi** koruyarak — çıkarmaktır."
            ],
            de: [
              "**Definition:** Sprachlich „Klarheit, Offenlegung“; fachlich das **deutliche, ghunna-lose** Aussprechen des sākinen Mīm aus seinem Austrittsort, wenn danach **einer der 26 Iẓhār-Buchstaben** folgt.",
              "**Seine Buchstaben:** die übrigen **26** des Alphabets. **„Schafawī“:** weil das offen gesprochene Mīm aus den Lippen kommt.",
              "**Ausführung:** ohne Dehnung, Lippen leicht schließend und öffnend, ohne volle Ghunna — aber unter Wahrung der **Grund-Ghunna**."
            ],
            en: [
              "**Definition:** Literally \"clarity, disclosure\"; technically, pronouncing the sākin mīm from its exit point **clearly and without ghunna** when **one of the 26 iẓhār letters** follows.",
              "**Its letters:** the remaining **26** of the alphabet. **Called \"shafawī\":** because the disclosed mīm issues from the lips.",
              "**Execution:** without lengthening, lightly closing and opening the lips, without full ghunna — yet preserving the **base ghunna**."
            ]
          },
          verses: [
            { ar: "أَلْهَاكُمُ التَّكَاثُرُ", ref: { sura: "et-Tekâsür", ayah: 1 }, tr: "«Çokluk kuruntusu sizi oyaladı.» (mîm + tâ: izhâr)" },
            { ar: "لَكُمْ دِينُكُمْ وَلِيَ دِينِ", ref: { sura: "el-Kâfirûn", ayah: 6 }, tr: "«Sizin dininiz size, benim dinim bana.» (mîm + dâl: izhâr)" }
          ]
        },
        {
          n: 23,
          translation: {
            tr: "Vâv ve fâ yanında dikkat et, (mîm) gizlenmesin; yakınlık ve (mahreç) birliği sebebiyle; bunu bil.",
            de: "Hüte dich bei Wāw und Fāʾ, dass (das Mīm sich) nicht verberge — wegen Nähe und Gleichheit; wisse das.",
            en: "Beware, at wāw and fāʾ, lest (the mīm) be hidden — due to nearness and sameness; know this."
          },
          sharh: {
            tr: [
              "**Uyarı:** Sâkin mîm izhâr edilirken **iki harfte** dikkat edilmelidir ki yanlışlıkla gizlenmesin:",
              "**1) Vâv (و) yanında** — çünkü mîm de vâv da **dudaktan** çıkar (mahreç birliği); sesler karışıp mîm \"yok olmuş gibi\" olabilir. Doğrusu: mîm açıkça çıkar, vâv'a karışmaz.",
              "**2) Fâ (ف) yanında** — çünkü mîm dudaktan, fâ ise alt dudak + üst diş ucundan çıkar (mahreç yakınlığı); hızlı okunursa mîm \"kaybolmuş gibi\" olabilir. Doğrusu: mîm net ve kısa çıkar."
            ],
            de: [
              "**Warnung:** Beim Iẓhār des sākinen Mīm ist bei **zwei Buchstaben** Vorsicht geboten, damit es nicht versehentlich verborgen wird:",
              "**1) Vor Wāw (و)** — weil Mīm und Wāw beide aus der **Lippe** kommen (gleicher Austrittsort); die Laute können verschmelzen, das Mīm scheint zu „verschwinden“. Richtig: das Mīm deutlich, ohne Verschmelzung.",
              "**2) Vor Fāʾ (ف)** — weil Mīm aus der Lippe, Fāʾ aus Unterlippe + oberen Schneidezähnen kommt (nahe Austrittsorte); bei schnellem Lesen scheint das Mīm zu „verschwinden“. Richtig: das Mīm klar und kurz."
            ],
            en: [
              "**Caution:** When making iẓhār of the sākin mīm, take care with **two letters** so it is not accidentally hidden:",
              "**1) Before wāw (و)** — because both mīm and wāw issue from the **lip** (same exit point); the sounds may blend and the mīm seem to \"vanish\". Correct: the mīm clearly, without blending.",
              "**2) Before fāʾ (ف)** — because the mīm is from the lip, the fāʾ from the lower lip + upper teeth (near exit points); read quickly, the mīm may seem to \"vanish\". Correct: the mīm clear and short."
            ]
          },
          verses: [
            { ar: "إِنَّكُمْ وَمَا تَعْبُدُونَ", ref: { sura: "el-Enbiyâ", ayah: 98 }, tr: "«Siz ve (Allah'tan başka) taptıklarınız…» (mîm + vâv: izhâr, dikkat!)" },
            { ar: "إِنَّهُمْ فِتْيَةٌ آمَنُوا بِرَبِّهِمْ", ref: { sura: "el-Kehf", ayah: 13 }, tr: "«Onlar, Rablerine iman etmiş gençlerdi.» (mîm + fâ: izhâr, dikkat!)" }
          ]
        }
      ],
      summary: {
        tr: [
          "Sâkin mîm (مْ) + **bâ** → **İhfâ-i şefevî** (gunneli, iki kelime arası).",
          "Sâkin mîm + **mîm** → **İdğâm-ı misleyn sagîr** (gunneli).",
          "Sâkin mîm + **diğer 26 harf** → **İzhâr-ı şefevî** (gunnesiz, açık).",
          "**Vâv** ve **fâ** yanında mîmi gizlemekten sakın.",
          "Gunnenin mahreci **hayşûm**; miktarı **iki hareke**."
        ],
        de: [
          "Sākines Mīm + **Bāʾ** → **Ikhfāʾ schafawī** (mit Ghunna, zwischen zwei Wörtern).",
          "Sākines Mīm + **Mīm** → **Idghām mithlain ṣaghīr** (mit Ghunna).",
          "Sākines Mīm + **die übrigen 26** → **Iẓhār schafawī** (ohne Ghunna, deutlich).",
          "Vor **Wāw** und **Fāʾ** das Mīm nicht verbergen.",
          "Austrittsort der Ghunna: **Chaischūm**; Maß: **zwei Ḥaraka**."
        ],
        en: [
          "Sākin mīm (مْ) + **bāʾ** → **Ikhfāʾ shafawī** (with ghunna, between two words).",
          "Sākin mīm + **mīm** → **Idghām mithlayn ṣaghīr** (with ghunna).",
          "Sākin mīm + **the other 26** → **Iẓhār shafawī** (no ghunna, clear).",
          "Before **wāw** and **fāʾ**, do not hide the mīm.",
          "Ghunna's exit point: **khayshūm**; measure: **two ḥarakāt**."
        ]
      }
    },

    /* ===== 5) LÂM-I TA'RÎF VE LÂM-I FİİL (24–29) ===== */
    {
      id: "lam",
      num: 5,
      arTitle: "لَامُ «أَل» وَلَامُ الْفِعْل",
      title: { tr: "Lâm-ı Ta'rîf ve Lâm-ı Fiil", de: "Lām von „al-“ und Verb-Lām", en: "Lām of \"al-\" and the Verb Lām" },
      range: [24, 29],
      overview: {
        tr: "İki tür lâm işlenir. **Lâm-ı ta'rîf** (ال): 14 \"kamerî\" harften önce **izhâr** (kamerî lâm), 14 \"şemsî\" harften önce **idğâm** (şemsî lâm) edilir; remzleri «اِبْغِ حَجَّكَ وَخَفْ عَقِيمَهُ» ve «طِبْ ثُمَّ صِلْ…» cümleleridir. **Fiil lâmı** ise her durumda **izhâr** edilir. (Şerhte ayrıca emir lâmı, isim lâmı ve \"hel/bel\" lâmı da ele alınır.)",
        de: "Zwei Arten von Lām: Das **Artikel-Lām** (ال) wird vor 14 „Mond“-Buchstaben mit **Iẓhār** (Mond-Lām), vor 14 „Sonnen“-Buchstaben mit **Idghām** (Sonnen-Lām) gelesen. Das **Verb-Lām** wird stets mit **Iẓhār** gelesen.",
        en: "Two kinds of lām: the **article lām** (ال) is read with **iẓhār** before 14 \"lunar\" letters (lunar lām) and with **idghām** before 14 \"solar\" letters (solar lām). The **verb lām** is always read with **iẓhār**."
      },
      beyits: [
        {
          n: 24,
          translation: { tr: "Lâm-ı ta'rîfin harflerden önce iki hâli vardır; birincisi onun izhârıdır, bunu bil." },
          sharh: {
            tr: [
              "**Lâm-ı ta'rîf (لْ):** Kendisinden önce, başlangıçta üstünlü okunan bir vasıl hemzesi (اَلْ) bulunan; ardından bir **isim** gelen, sâkin ve ziyade (kelimenin aslından olmayan) lâm harfidir.",
              "Bu lâmın, sonrasındaki harfe göre **iki hâli** vardır: **1) İzhâr (kamerî)**, **2) İdğâm (şemsî)**. Nâzım önce izhâr ile başlar."
            ]
          }
        },
        {
          n: 25,
          translation: { tr: "On dört harften önceki (hükmünü) öğren: «اِبْغِ حَجَّكَ وَخَفْ عَقِيمَهُ» cümlesinden." },
          sharh: {
            tr: [
              "**İzhâr-ı kamerî:** Lâm-ı ta'rîften sonra şu **on dört harften** biri gelirse, lâm **açıkça** okunur.",
              "Bu harfler **«اِبْغِ حَجَّكَ وَخَفْ عَقِيمَهُ»** cümlesinin harflerinde toplanmıştır: **ا ب غ ح ج ك و خ ف ع ق ي م ه**."
            ]
          },
          examples: [
            { ar: "إِنَّ الْإِنْسَانَ لِرَبِّهِ لَكَنُودٌ", ref: { sura: "el-Âdiyât", ayah: 6 }, tr: "«İnsan Rabbine karşı çok nankördür.» (الْإِنْسَان — kamerî: hemze)" },
            { ar: "الْمَالُ وَالْبَنُونَ زِينَةُ الْحَيَاةِ الدُّنْيَا", ref: { sura: "el-Kehf", ayah: 46 }, tr: "«Mal ve oğullar dünya hayatının süsüdür.» (الْمَال — kamerî: mîm)" },
            { ar: "الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ", ref: { sura: "el-Mülk", ayah: 2 }, tr: "«O ki ölümü ve hayatı yarattı.» (الْحَيَاة — kamerî: hâ)" }
          ]
        },
        {
          n: 26,
          translation: { tr: "İkincisi, yine on dört harfte idğam edilmesidir; onun remzini de belle." },
          sharh: {
            tr: [
              "**İdğâm-ı şemsî:** Lâm-ı ta'rîften sonra, izhâr harfleri **dışındaki** on dört harften biri gelirse, lâm **okunmaz**; sonraki harfe idğam edilir (o harf şeddelenir)."
            ]
          }
        },
        {
          n: 27,
          translation: { tr: "«Akrabalık bağını gözet, kurtul; nimet sahibine katıl; kötü zandan uzak dur; şerefliyi ziyaret et.» — (Bu cümle şemsî harflerin remzidir.)" },
          sharh: {
            tr: [
              "Şemsî harfler on dörttür; her kelimenin **ilk harfi** bir şemsî harfi verir: **ط ث ص ر ت ض ذ ن د س ظ ز ش ل**.",
              "(**طِبْ ثُمَّ صِلْ رَحِمًا تَفُزْ ضِفْ ذَا نِعَمْ · دَعْ سُوءَ ظَنٍّ زُرْ شَرِيفًا لِلْكَرَمْ**)"
            ]
          },
          examples: [
            { ar: "وَلَقَدْ كَرَّمْنَا بَنِي آدَمَ", ref: { sura: "el-İsrâ", ayah: 70 }, tr: "«…وَرَزَقْنَاهُمْ مِنَ الطَّيِّبَاتِ» (الطَّيِّبَات — şemsî: tâ, lâm okunmaz)" },
            { ar: "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ", ref: { sura: "el-İhlâs", ayah: 2 }, tr: "«Allah Samed'dir.» (الصَّمَد — şemsî: sâd)" },
            { ar: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", ref: { sura: "en-Nâs", ayah: 1 }, tr: "«İnsanların Rabbine sığınırım.» (النَّاس — şemsî: nûn)" }
          ]
        },
        {
          n: 28,
          translation: { tr: "Birinci lâmı 'kamerî', diğer lâmı ise 'şemsî' diye isimlendir." },
          sharh: {
            tr: [
              "İzhâr edilen (açık okunan) birinci lâma **\"lâm-ı kameriyye\"** (ay lâmı: الْقَمَر gibi), idğam edilen (okunmayan) ikinci lâma **\"lâm-ı şemsiyye\"** (güneş lâmı: الشَّمْس gibi) denir.",
              "İsimlendirme, تعريف'in الْقَمَر (kamer/ay) ve الشَّمْس (şems/güneş) kelimelerinden alınmıştır: birincide lâm okunur, ikincide okunmaz."
            ]
          }
        },
        {
          n: 29,
          translation: { tr: "Fiil lâmını her durumda izhâr et; «قُلْ نَعَمْ», «قُلْنَا» ve «الْتَقَى» gibi örneklerde." },
          sharh: {
            tr: [
              "**Lâm-ı fiil:** Bir fiilin bünyesinde bulunan **aslî sâkin** lâmdır (iki sâkinin birleşmesinden kurtulmak için getirilmiş bir hareke değildir).",
              "**Hükmü:** Her durumda **izhâr** edilir (açıkça okunur). Sadece sonrasında **lâm** veya **râ** gelirse idğam edilir; diğer bütün harflerde açıktır.",
              "**İdğam örneği:** «قُلْ رَبِّي» (kur rabbî — lâm, râ'ya idğam) · «أَلَمْ أَقُلْ لَكُمْ» (lâm, lâm'a idğam). **İzhâr örneği:** «قُلْ نَعَمْ», «قُلْنَا», «الْتَقَى»."
            ]
          },
          examples: [
            { ar: "قُلْ نَعَمْ وَأَنْتُمْ دَاخِرُونَ", ref: { sura: "es-Sâffât", ayah: 18 }, tr: "«De ki: Evet, hem de siz zelil olarak.» (فيil lâmı + nûn → izhâr)" },
            { ar: "أَلَمْ أَقُلْ لَكُمْ", ref: { sura: "el-Bakara", ayah: 33 }, tr: "«Size dememiş miydim?» (fiil lâmı + lâm → idğam)" }
          ]
        }
      ],
      notes: [
        {
          title: { tr: "Şerhteki diğer lâm türleri", de: "Weitere Lām-Arten im Kommentar", en: "Other lām types in the commentary" },
          body: {
            tr: "Şerh, nazımdaki iki lâma ek olarak diğer lâm çeşitlerine de değinir; hepsinin hükmü mutlak **izhâr**dır (lâm-ı ta'rîf ve —idğam durumları hariç— fiil lâmı istisna):\n\n• **Emir lâmı** (muzariyi emre çeviren ziyade lâm — لِيُنْفِقْ): mutlaka izhâr. Öncesinde ف/و/ثم yoksa, başlanırken kesre ile okunur (Arapçada sâkinle başlanmaz).\n• **İsim lâmı** (bir ismin aslından olan lâm — أَلْسِنَتُكُمْ, سَلْسَبِيلًا): kelime ortasında bulunur, her durumda izhâr.\n• **«هَلْ» ve «بَلْ» lâmı** (aslî sâkin lâm): sonrasında lâm (بَلْ لَهُمْ) veya —«بَلْ» için— râ (بَلْ رَبُّكُمْ) gelirse idğam; diğer harflerde izhâr. Bir yerde «كَلَّا بَلْ ۜ رَانَ» sekte sebebiyle özel okunur."
          }
        }
      ],
      summary: {
        tr: [
          "**Lâm-ı ta'rîf (ال)** + **kamerî 14 harf** (اِبْغِ حَجَّكَ وَخَفْ عَقِيمَهُ) → **izhâr** (lâm okunur).",
          "**Lâm-ı ta'rîf** + **şemsî 14 harf** → **idğâm** (lâm okunmaz, sonraki harf şeddelenir).",
          "Birinci lâm = **kamerî**, ikinci lâm = **şemsî**.",
          "**Fiil lâmı** → mutlak **izhâr**; yalnız **ل/ر**'de idğam.",
          "Şerh ayrıca emir lâmı, isim lâmı ve هل/بل lâmını da açıklar."
        ]
      }
    },

    /* ===== 6) MİSLEYN, MÜTEKĀRİBEYN, MÜTECÂNİSEYN (30–34) ===== */
    {
      id: "mislan-mutaqaribayn",
      num: 6,
      arTitle: "الْمِثْلَانِ وَالْمُتَقَارِبَانِ وَالْمُتَجَانِسَان",
      title: { tr: "Misleyn, Mütekāribeyn, Mütecâniseyn", de: "Mithlān, Mutaqāribān, Mutadschānisān", en: "Mithlān, Mutaqāribān, Mutajānisān" },
      range: [30, 34],
      overview: {
        tr: "İki harfin karşılaşma türleri: **Misleyn** (mahreç ve sıfatça aynı — ör. mîm+mîm), **Mütekāribeyn** (mahreçleri yakın, sıfatları farklı), **Mütecâniseyn** (mahreçleri aynı, sıfatları farklı — ör. tâ+dâl). Ayrıca birincisi sâkin olursa **sagîr (küçük) idğam**, ikisi de harekeli olursa **kebîr (büyük) idğam** adını alır.",
        de: "Arten des Zusammentreffens zweier Buchstaben: **Mithlān** (in Austrittsort und Eigenschaft gleich), **Mutaqāribān** (nahe Austrittsorte, verschiedene Eigenschaften), **Mutadschānisān** (gleicher Austrittsort, verschiedene Eigenschaften). Ist der erste sākin: **kleines** Idghām; sind beide bewegt: **großes** Idghām.",
        en: "Types of two letters meeting: **mithlān** (same exit point and quality), **mutaqāribān** (near exit points, differing qualities), **mutajānisān** (same exit point, differing qualities). If the first is sākin: **minor** idghām; if both are vowelled: **major** idghām."
      },
      beyits: [
        {
          n: 30,
          translation: { tr: "Sıfat ve mahreçte iki harf birleşirse (aynı olursa), en uygunu onlara 'misleyn' (denmesi)dir." },
          sharh: {
            tr: [
              "**İdğâmın üç sebebi vardır:** **Temâsül** (iki harfin mahreç ve sıfatta tam aynı olması), **Tecânüs** (mahreçleri aynı, sıfatları farklı), **Tekārüb** (mahreç veya sıfatça birbirine yakın olması). İdğamın faydası, telaffuzu **kolaylaştırmak** ve **hafifletmektir**.",
              "**Misleyn (İki Benzer):** Mahreçleri ve sıfatları **tamamen aynı** olan iki harftir (ör. **بْ + ب**, **دْ + د**, **مْ + م**).",
              "**Hükmü:** İdğam **vaciptir** ve daima **tam idğam** olur. Mîm ve nûnda **gunne ile**, diğerlerinde gunnesiz okunur."
            ]
          },
          examples: [
            { ar: "قَدْ دَخَلُوا", ref: { name: "misleyn — dâl+dâl" }, tr: "\"kad dehalû\" (دْ + د → دّ)" },
            { ar: "بَلْ لَهُمْ", ref: { name: "misleyn — lâm+lâm" }, tr: "\"bel lehum\"" },
            { ar: "اضْرِبْ بِعَصَاكَ", ref: { name: "misleyn — bâ+bâ" }, tr: "\"ıdrib bi-asâke\"" }
          ]
        },
        {
          n: 31,
          translation: { tr: "Eğer mahreççe yakın olur, sıfatlarda ayrılırlarsa…" },
          sharh: {
            tr: [
              "Nâzım burada **mütekāribeyn**i tarif etmeye başlar: mahreçleri birbirine **yakın**, sıfatları ise **farklı** olan iki harf."
            ]
          }
        },
        {
          n: 32,
          translation: { tr: "…'mütekāribeyn' diye adlandırılırlar; yahut mahreçte birleşip sıfatta ayrılırlarsa," },
          sharh: {
            tr: [
              "**Mütekāribeyn (İki Yakın):** Mahreç ve sıfatça birbirine yakın iki harftir.",
              "**Tam idğam olarak gelenler:** nûn→lâm (مِنْ لَدُنْهُ değil; **مَنْ لَعَنَ**), nûn→râ (**مِنْ رَبِّكَ**), lâm→râ (**قُلْ رَبِّ**).",
              "**Eksik idğam olarak gelenler (iki durumda):** nûn→vâv, nûn→yâ (bunlarda gunne kalır: **مَنْ وَلِيٍّ**, **مَنْ يَشَاءُ**).",
              "Sonra nâzım **mütecâniseyn**e geçer: mahreçte birleşip sıfatta ayrılan iki harf."
            ]
          }
        },
        {
          n: 33,
          translation: { tr: "'mütecâniseyn' (denir). Sonra, her birinin birincisi sâkin olursa 'sagîr' (küçük) diye isimlendir." },
          sharh: {
            tr: [
              "**Mütecâniseyn (İki Cinsdeş):** Mahreçleri **aynı**, sıfatları **farklı** olan iki harftir.",
              "**Tam idğam örnekleri:** tâ→dâl (**أَثْقَلَتْ دَعَوَا**… → **أَثْقَلَت دّعَوَا**), dâl→tâ (**قَدْ تَبَيَّنَ** → **قَت تَبَيَّنَ**), zel→zâ (**إِذْ ظَلَمُوا**), se→zel (**يَلْهَثْ ذَٰلِكَ**), tâ→tı (**قَالَتْ طَائِفَةٌ**). **Bâ→mîm** gunne ile gelir (**ارْكَبْ مَعَنَا**).",
              "**Eksik idğam** yalnız bir durumdadır: tı→tâ (**أَحَطْتُ**, **فَرَّطْتُمْ**) — burada tı'nın isti'lâ (kalınlık) sıfatı kalır.",
              "**Sagîr / Kebîr:** İki harften **birincisi sâkin**, ikincisi harekeli ise idğam **sagîr (küçük)** olur; çünkü yapılan işlem azdır."
            ]
          },
          examples: [
            { ar: "وَقَالَتْ طَائِفَةٌ", ref: { sura: "Âl-i İmrân", ayah: 72 }, tr: "«Bir topluluk dedi ki…» (تْ + ط → tam idğam)" },
            { ar: "أَحَطْتُ بِمَا لَمْ تُحِطْ بِهِ", ref: { sura: "en-Neml", ayah: 22 }, tr: "«Ben, senin kuşatamadığını kuşattım.» (طْ + ت → eksik idğam)" }
          ]
        },
        {
          n: 34,
          translation: { tr: "Yahut her ikisi de harekeli olursa 'kebîr' (büyük) de; bunu örneklerle iyi kavra." },
          sharh: {
            tr: [
              "Eğer iki harfin **ikisi de harekeli** ise idğam **kebîr (büyük)** olur; çünkü harekeliyi sâkin yapıp sonra idğam etmek gerektiğinden işlem çoktur. **Bu tür, Hafs rivayetinde bulunmaz.**",
              "**Tam ve eksik idğam:** **Tam idğam**, idğam edilen harfin hem zâtı hem sıfatıyla tamamen kaybolmasıdır (mushafta sonraki harfe şedde konur). **Eksik idğam**, zâtı kaybolup **sıfatının kaldığı** idğamdır (şedde konmaz) — ör. tı'nın tâ'ya idğamında isti'lâ sıfatının kalması."
            ]
          }
        }
      ],
      summary: {
        tr: [
          "İdğam sebepleri: **temâsül · tecânüs · tekārüb**; faydası telaffuz kolaylığı.",
          "**Misleyn:** mahreç+sıfat aynı → **vacip, tam idğam**.",
          "**Mütekāribeyn:** mahreç yakın, sıfat farklı (nûn→lâm/râ; lâm→râ).",
          "**Mütecâniseyn:** mahreç aynı, sıfat farklı (tâ↔dâl, zel↔zâ, tı↔tâ…).",
          "İlki sâkin → **sagîr**; ikisi harekeli → **kebîr** (Hafs'ta yok).",
          "**Tam idğam** (zât+sıfat kaybolur) / **eksik idğam** (sıfat kalır)."
        ]
      }
    },

    /* ===== 7) MEDDİN KISIMLARI (35–41) ===== */
    {
      id: "mad-aksam",
      num: 7,
      arTitle: "أَقْسَامُ الْمَدّ",
      title: { tr: "Meddin Kısımları", de: "Die Arten des Madd", en: "The Types of Madd" },
      range: [35, 41],
      overview: {
        tr: "Med (sesi uzatma) iki kısımdır: **Aslî (tabiî) med** — bir sebebe (hemze/sükûn) bağlı değildir, miktarı iki harekedir; ve **fer'î med** — hemze veya sükûn sebebiyle uzar. Med harfleri üçtür (ا، و، ي) ve «نُوحِيهَا» kelimesinde toplanır. Ayrıca **lîn harfleri** (öncesi üstünlü sâkin و ve ي) açıklanır.",
        de: "Madd (Dehnung) ist zweifach: **ursprünglicher (natürlicher) Madd** — ohne Ursache, zwei Ḥaraka lang; und **abgeleiteter Madd** — durch Hamza oder Sukūn verlängert. Die drei Madd-Buchstaben (ا، و، ي) sind im Wort «نُوحِيهَا» versammelt.",
        en: "Madd (prolongation) is of two kinds: **original (natural) madd** — with no cause, two ḥarakāt long; and **derived madd** — lengthened by a hamza or sukūn. The three madd letters (ا، و، ي) are gathered in the word «نُوحِيهَا»."
      },
      beyits: [
        {
          n: 35,
          translation: { tr: "Med, aslî ve fer'î olmak üzere ikidir; birincisine 'tabiî' adını ver." },
          sharh: {
            tr: [
              "**Med:** Lügatte \"artırmak, ziyade\"; ıstılahta, sesi bir **med harfiyle uzatmaktır**. Karşıtı **kasr**: med/lîn harfini ilave uzatma yapmadan (iki hareke) okumaktır.",
              "Med iki kısımdır: **1) Aslî (tabiî) med** ve **2) Fer'î med**. Nâzım önce tabiî medle başlar."
            ]
          }
        },
        {
          n: 36,
          translation: { tr: "O, bir sebebe bağlı olmayan meddir; med harfleri de onsuz getirilmez (bulunmaz)." },
          sharh: {
            tr: [
              "**Tabiî (aslî) med:** Uzatılması **hemze** veya **sükûn** gibi bir sebebe bağlı olmayan meddir; med harfinin zâtı ancak onunla (o uzatmayla) tamam olur.",
              "**\"Aslî\" denmesi:** Bütün med çeşitlerinin aslı olduğu için. **\"Tabiî\" denmesi:** Selîm tabiatlı kişinin onu ne eksiltip ne artırdığı, tam **iki hareke** okuduğu için. (Bir hareke, parmağı normal hızda açıp kapama süresidir.)"
            ]
          },
          examples: [
            { ar: "قَالَ · يَقُولُ · قِيلَ", ref: { name: "tabiî med" }, tr: "elif / vâv / yâ ile iki hareke uzatma" }
          ]
        },
        {
          n: 37,
          translation: { tr: "Bilakis medden sonra hemze veya sükûn dışında herhangi bir harf gelirse, o tabiî med olur." },
          sharh: {
            tr: [
              "Ölçü şudur: Med harfinden sonra **hemze de sükûn da yoksa**, herhangi bir harf gelirse, bu **tabiî med**dir (iki hareke).",
              "Tabiî medin **ekleri (mülhakâtı)** da vardır ve iki hareke okunur: **Bedel/İvaz meddi** (tenvîn-i fethanın vakıfta elifle uzatılması: *عَلِيمًا* → *عَلِيمَا*), **Temkîn meddi** (*حُيِّيتُمْ*, *النَّبِيِّينَ*), **Küçük Sıla meddi** (harekeli iki harf arasındaki hâ zamiri: *إِنَّهُ كَانَ*), ve **حَيٌّ طَاهِرٌ** harflerinin sûre başlarındaki tabiî meddi."
            ]
          }
        },
        {
          n: 38,
          translation: { tr: "Diğeri fer'î meddir; hemze veya sükûn gibi bir sebebe bağlıdır." },
          sharh: {
            tr: [
              "**Fer'î med:** Uzatılması **hemze** veya **sükûn** sebebine bağlı olan meddir. **\"Fer'î\" denmesi:** Aslî medden **türemiş** olduğu içindir. Miktarı, türüne göre 4, 5 veya 6 harekeye çıkar."
            ]
          }
        },
        {
          n: 39,
          translation: { tr: "Onun harfleri üçtür; onları 'وَاي' lafzında bul; onlar 'نُوحِيهَا' kelimesindedir." },
          sharh: {
            tr: [
              "**Med harfleri üçtür:** **Elif (ا) · Vâv (و) · Yâ (ي)**. Bunlar hem **«وَاي»** lafzında, hem de şartlarıyla birlikte **«نُوحِيهَا»** kelimesinde toplanmıştır."
            ]
          }
        },
        {
          n: 40,
          translation: { tr: "Yâ'dan önce kesre, vâv'dan önce ötre şarttır; eliften önce ise fetha gereklidir." },
          sharh: {
            tr: [
              "**Med harflerinin şartı** (öncesindeki harekenin cinsine uygun olması):",
              "• **Elif**ten önce → **fetha** (üstün): *قَالَ*. • **Vâv**dan önce → **damme** (ötre): *يَقُولُ*. • **Yâ**dan önce → **kesre** (esre): *قِيلَ*.",
              "**Not:** Elif daima med harfidir; çünkü kendisi sâkindir ve öncesi daima fethalıdır."
            ]
          }
        },
        {
          n: 41,
          translation: { tr: "Lîn (harfleri) ondandır: öncesi üstünlü olan sâkin yâ ve vâv'dır." },
          sharh: {
            tr: [
              "**Lîn harfleri:** Öncesi **fethalı (üstünlü)** olan sâkin **vâv (و)** ve sâkin **yâ (ي)**'dir. Yumuşaklıkla, med harflerine göre daha kısa çıkar.",
              "**Örnek:** *خَوْف* (havf), *قُرَيْش* (Kureyş), *بَيْت* (beyt)."
            ]
          },
          examples: [
            { ar: "لِإِيلَافِ قُرَيْشٍ", ref: { sura: "Kureyş", ayah: 1 }, tr: "«Kureyş'in ülfeti için…» (قُرَيْش — lîn: yâ)" },
            { ar: "الَّذِي أَطْعَمَهُمْ مِنْ جُوعٍ وَآمَنَهُمْ مِنْ خَوْفٍ", ref: { sura: "Kureyş", ayah: 4 }, tr: "«…onları korkudan emin kıldı.» (خَوْف — lîn: vâv)" }
          ]
        }
      ],
      summary: {
        tr: [
          "**Med** = med harfiyle sesi uzatma; **kasr** = uzatmadan (iki hareke) okuma.",
          "**Med harfleri:** ا (öncesi fetha) · و (öncesi damme) · ي (öncesi kesre) — *وَاي / نُوحِيهَا*.",
          "**Tabiî med:** sebep yok → **iki hareke**; ekleri: bedel/ivaz, temkîn, küçük sıla…",
          "**Fer'î med:** sebep **hemze** veya **sükûn** → 4/5/6 hareke.",
          "**Lîn harfleri:** öncesi fethalı sâkin **و / ي** (*خَوْف*, *قُرَيْش*)."
        ]
      }
    },

    /* ===== 8) MEDDİN HÜKÜMLERİ (42–47) ===== */
    {
      id: "mad-ahkam",
      num: 8,
      arTitle: "أَحْكَامُ الْمَدّ",
      title: { tr: "Meddin Hükümleri", de: "Die Regeln des Madd", en: "The Rulings of Madd" },
      range: [42, 47],
      overview: {
        tr: "Meddin üç hükmü: **Vücûb** (vâcib — muttasıl med: tek kelimede medden sonra hemze), **Cevâz** (câiz — munfasıl med: hemze ayrı kelimede; ayrıca ârız-ı sükûn ve bedel medleri) ve **Lüzûm** (lâzım — aslî sükûn medden sonra gelirse). Her biri örneklerle verilir.",
        de: "Drei Regeln des Madd: **Wudschūb** (Pflicht — Madd muttaṣil), **Dschawāz** (Erlaubnis — Madd munfaṣil, ʿāriḍ, badal) und **Luzūm** (Notwendigkeit — Madd lāzim).",
        en: "Three rulings of madd: **wujūb** (obligatory — madd muttaṣil), **jawāz** (permissible — madd munfaṣil, ʿāriḍ, badal), and **luzūm** (necessary — madd lāzim)."
      },
      beyits: [
        {
          n: 42,
          translation: { tr: "Med için süregelen üç hüküm vardır: vücûb, cevâz ve lüzûm." },
          sharh: {
            tr: [
              "Fer'î medin **üç hükmü** vardır: **1) Vücûb** (zorunluluk) → **Muttasıl med**. **2) Cevâz** (serbestlik) → **Munfasıl, Ârız ve Bedel** medleri. **3) Lüzûm** (gereklilik) → **Lâzım med**.",
              "Adları hükümlerinden gelir: muttasılda uzatma **vacip**, munfasıl/ârız/bedelde uzatma-kısaltma **câiz**, lâzımda ise altı hareke **lâzım** (gerekli)dir."
            ]
          }
        },
        {
          n: 43,
          translation: { tr: "Vâcib olan: tek kelimede medden sonra hemze gelmesidir; buna 'muttasıl' denir." },
          sharh: {
            tr: [
              "**Medd-i Muttasıl:** Med harfinden sonra, **aynı kelime içinde** ona bitişik bir **hemze** gelmesidir.",
              "**\"Muttasıl (bitişik)\" denmesi:** med harfi ile hemzenin aynı kelimede birleşmesindendir. **Hükmü:** Vasılda **4 veya 5 hareke** uzatmak **vaciptir**; üzerinde vakfedilirse ârız sükûn sebebiyle 4-5-6 hareke okunabilir."
            ]
          },
          examples: [
            { ar: "وَإِلَى السَّمَاءِ كَيْفَ رُفِعَتْ", ref: { sura: "el-Ğâşiye", ayah: 18 }, tr: "«Göğe bakmazlar mı, nasıl yükseltilmiş?» (السَّمَاء — elif + hemze)" },
            { ar: "جَاءَ · سُوءَ · جِيءَ", ref: { name: "muttasıl" }, tr: "med harfi + bitişik hemze, aynı kelimede" }
          ]
        },
        {
          n: 44,
          translation: { tr: "Câiz olan med ve kasr: (hemze ile med) ayrı kelimelerde olursa; bu da 'munfasıl'dır." },
          sharh: {
            tr: [
              "**Medd-i Munfasıl:** Med harfi bir kelimenin **sonunda**, hemze ise sonraki kelimenin **başında** olur (iki ayrı kelime).",
              "**\"Munfasıl (ayrı)\" denmesi:** med ile hemzenin farklı kelimelerde bulunmasındandır. **Hükmü:** Uzatmak da kısaltmak da **câiz**dir; Şâtıbiyye yolunda genellikle **4 veya 5 hareke** (tavassut) okunur.",
              "**Not:** «هَا التَّنْبِيه» (*هَا أَنْتُمْ*, *هَٰؤُلَاءِ*) ve «يَا النِّدَاء» (*يَا أَيُّهَا*) yazıda bitişik görünse de hüküm bakımından munfasıldır. **Medd-i Sıla Kübrâ** da munfasıla dâhildir (hâ zamirinden sonra hemze: *مَالَهُ أَخْلَدَهُ* değil, *عِنْدَهُ إِلَّا*)."
            ]
          },
          examples: [
            { ar: "إِنَّا أَرْسَلْنَا", ref: { sura: "Nûh", ayah: 1 }, tr: "«Biz gönderdik…» (إِنَّا + أَ — elif, sonra hemze)" },
            { ar: "قُوا أَنْفُسَكُمْ", ref: { sura: "et-Tahrîm", ayah: 6 }, tr: "«Kendinizi koruyun.» (قُوا + أَ — vâv, sonra hemze)" }
          ]
        },
        {
          n: 45,
          translation: { tr: "Bunun benzeri, vakıf sebebiyle ârız sükûn olursa; 'تَعْلَمُونَ', 'نَسْتَعِينُ' gibi." },
          sharh: {
            tr: [
              "**Medd-i Ârız li's-Sükûn:** Med harfinden sonra, **vakıf (durma) sebebiyle** geçici (ârız) bir sükûn gelmesidir.",
              "**Hükmü:** **2, 4 veya 6 hareke** uzatmak câizdir. **\"Ârız\" denmesi:** sükûn, durma sebebiyle sonradan ortaya çıktığı içindir.",
              "**Medd-i Lîn li's-Sükûn:** Lîn harfinden (öncesi fethalı sâkin و/ي) sonra vakıf sebebiyle sükûn gelmesidir (*خَوْف*, *الْبَيْت*); ârız gibi 2/4/6 hareke okunur. Aynı okuyuşta ârız ile lîn eşit ölçüde tutulur."
            ]
          },
          examples: [
            { ar: "يَعْلَمُونَ · نَسْتَعِينُ · الْعَالَمِينَ", ref: { name: "ârız li's-sükûn" }, tr: "vakıfta med harfi + geçici sükûn → 2/4/6 hareke" }
          ]
        },
        {
          n: 46,
          translation: { tr: "Yahut hemze medden önce gelirse; bu 'bedel'dir; 'آمَنُوا' ve 'إِيمَاناً' gibi al." },
          sharh: {
            tr: [
              "**Medd-i Bedel:** İki hemzenin peş peşe gelip (birincisi harekeli, ikincisi sâkin), ikinci sâkin hemzenin, öncesindeki harekeye uygun bir **med harfine dönüşmesidir**.",
              "• *أَأْمَنُوا* → **آمَنُوا** (elife), • *إِئْمَانًا* → **إِيمَانًا** (yâ'ya), • *أُؤْتُوا* → **أُوتُوا** (vâv'a).",
              "**\"Bedel\" denmesi:** med harfinin, hemzeden **bedel** (dönüşmüş) olmasındandır. **Hükmü:** Uzatmak câizdir; ancak uygulamada **iki hareke** (tabiî med miktarı) okunur. (Hemzeden dönüşmemiş benzerlerine *şibh-i bedel* denir: *الْقُرْآن*, *مَآب*.)"
            ]
          },
          examples: [
            { ar: "إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ", ref: { sura: "el-Beyyine", ayah: 7 }, tr: "«İman edip salih amel işleyenler…» (آمَنُوا — aslı أَأْمَنُوا)" }
          ]
        },
        {
          n: 47,
          translation: { tr: "Lâzım olan: vasl ve vakıfta sabit, aslî sükûn medden sonra gelip uzatılırsa (olur)." },
          sharh: {
            tr: [
              "**Medd-i Lâzım:** Med harfinden sonra **aslî (sabit) bir sükûn** gelmesidir; bu sükûn hem vasılda hem vakıfta değişmez.",
              "**\"Lâzım\" denmesi:** Sükûnun her hâlde sabit kalması, yahut **altı hareke** uzatmanın gerekli (lâzım) olması sebebiyledir. Ayrıntılı kısımları bir sonraki bölümdedir."
            ]
          }
        }
      ],
      summary: {
        tr: [
          "**Muttasıl** (tek kelimede med+hemze) → **vacip**, 4-5 hareke.",
          "**Munfasıl** (ayrı kelimelerde med+hemze) → **câiz**, 4-5 hareke.",
          "**Ârız li's-sükûn** (vakıfta geçici sükûn) → **câiz**, 2-4-6 hareke.",
          "**Lîn li's-sükûn** (vakıfta و/ي) → 2-4-6 hareke; ârızla eşit tutulur.",
          "**Bedel** (hemze → med harfi: *آمَنُوا*) → uygulamada **2 hareke**.",
          "**Lâzım** (aslî sabit sükûn) → **6 hareke** (sonraki bölüm)."
        ]
      }
    },

    /* ===== 9) MEDD-İ LÂZIMIN KISIMLARI (48–57) ===== */
    {
      id: "mad-lazim",
      num: 9,
      arTitle: "أَقْسَامُ الْمَدِّ اللَّازِم",
      title: { tr: "Medd-i Lâzımın Kısımları", de: "Die Arten des Madd Lāzim", en: "The Types of Madd Lāzim" },
      range: [48, 57],
      overview: {
        tr: "Medd-i lâzım dörttür: **Kelimî müsakkal / muhaffef** ve **harfî müsakkal / muhaffef**. Kelimîde med harfinden sonra kelimede aslî sükûn bulunur; harfîde ise sûre başlarındaki (mukattaa) harflerde med ortada olur. Harfî lâzım, sekiz harfte toplanır: «كَمْ عَسَلْ نَقَصْ»; tabiî uzayanlar ise «حَيٌّ طَاهِرٌ» lafzındadır. On dört mukattaa harfi «صِلْهُ سُحَيْراً مَنْ قَطَعْكَ» ile toplanır.",
        de: "Madd Lāzim ist vierfach: **kalimī** (schwer/leicht) und **ḥarfī** (schwer/leicht). Die acht ḥarfī-Buchstaben sind in «كَمْ عَسَلْ نَقَصْ» versammelt; die natürlich gedehnten in «حَيٌّ طَاهِرٌ». Die vierzehn Anfangsbuchstaben in «صِلْهُ سُحَيْراً مَنْ قَطَعْكَ».",
        en: "Madd lāzim is fourfold: **kalimī** (heavy/light) and **ḥarfī** (heavy/light). The eight ḥarfī letters are gathered in «كَمْ عَسَلْ نَقَصْ»; the naturally-lengthened in «حَيٌّ طَاهِرٌ». The fourteen opening letters in «صِلْهُ سُحَيْراً مَنْ قَطَعْكَ»."
      },
      beyits: [
        {
          n: 48,
          translation: { tr: "Lâzım medin kısımları onlarca dörttür; bunlar kelimî ve harfî(dir)." },
          sharh: {
            tr: [
              "Medd-i lâzım, med harfinden sonra **aslî sükûnun** bulunduğu yere göre iki ana türdür: **1) Kelimî** (sükûn bir **kelimede**) ve **2) Harfî** (sükûn, sûre başı **mukattaa harfinde**)."
            ]
          }
        },
        {
          n: 49,
          translation: { tr: "Her ikisi de muhaffef ve müsakkal (olur); işte bunlar dört (kısım olarak) ayrıntılanır." },
          sharh: {
            tr: [
              "Kelimî ve harfînin her biri, sonraki harfe **idğam edilip edilmemesine** göre ikiye ayrılır: **müsakkal (ağır — idğamlı)** ve **muhaffef (hafif — idğamsız)**. Böylece toplam **dört kısım** oluşur.",
              "Hepsinin ortak hükmü: **altı hareke** uzatma."
            ]
          }
        },
        {
          n: 50,
          translation: { tr: "Bir kelimede sükûn, med harfiyle bir araya gelirse, o 'kelimî' olur." },
          sharh: {
            tr: [
              "**Medd-i Lâzım Kelimî:** Med harfinden sonra, harf sayısı **üçten az olmayan bir kelimede** aslî sükûn gelmesidir.",
              "**Müsakkal (ağır):** Sükûnlu harf sonrakine **idğam edilir** (şeddelenir) — *الضَّالِّينَ* (elif + şeddeli lâm), *الْحَاقَّة*, *أَتُحَاجُّونِّي*. **Muhaffef (hafif):** İdğam **edilmez**; Kur'ân'da yalnız bir kelimede: *آلْآنَ* (Yûnus 51, 91) — eliften sonra sâkin lâm gelir, idğam olmaz."
            ]
          },
          examples: [
            { ar: "وَلَا الضَّالِّينَ", ref: { sura: "el-Fâtiha", ayah: 7 }, tr: "«…ne de sapıtanların (yoluna).» (kelimî müsakkal: الضَّالّ)" },
            { ar: "آلْآنَ وَقَدْ عَصَيْتَ", ref: { sura: "Yûnus", ayah: 91 }, tr: "«Şimdi mi? Oysa daha önce isyan etmiştin.» (kelimî muhaffef: آلْآن)" }
          ]
        },
        {
          n: 51,
          translation: { tr: "Yahut üç harfli (isimlerde) bulunur, medd de ortasında olursa, 'harfî' olarak belirir." },
          sharh: {
            tr: [
              "**Medd-i Lâzım Harfî:** Sûre başlarındaki **mukattaa harflerinden**, okunuşu **üç harfli** olup **ortasında med harfi**, sonrasında aslî sükûn bulunan harfte olur (ör. **لَام** = lâm–elif–mîm, ortasında elif).",
              "**Not:** Bu harfler yazıldıkları gibi değil, **isimleriyle** okunur (ل → \"lâm\", م → \"mîm\", س → \"sîn\")."
            ]
          }
        },
        {
          n: 52,
          translation: { tr: "İdğam edilirse her ikisi de müsakkaldir; idğam edilmezse hepsi muhaffeftir." },
          sharh: {
            tr: [
              "**Harfî müsakkal:** Med harfinden sonraki sâkin, sonrakine **idğam edilirse** — *الٓمّ* (lâm'ın sonundaki mîm, sonraki mîme idğam olur: \"lâm-mîm\"), *طٰسٓمّ* (sîn'in nûnu mîme idğam).",
              "**Harfî muhaffef:** İdğam **edilmezse** — *الٓمٓ* içindeki \"mîm\" (Âl-i İmrân'da sonuna vasl yok), *عٓسٓقٓ*'daki \"sîn\" ve \"ayn\", *قٓ*, *نٓ* gibi. Bunlar altı hareke uzatılır fakat sonraki harfe katılmaz."
            ]
          },
          examples: [
            { ar: "الٓمّ", ref: { sura: "el-Bakara", ayah: 1 }, tr: "\"elif–lâââm–mîîm\" (lâm: harfî müsakkal, mîm→mîm idğam)" },
            { ar: "الٓمٓصٓ", ref: { sura: "el-A'râf", ayah: 1 }, tr: "\"elif–lâââm–mîîm–sâââd\" (sâd: harfî muhaffef)" }
          ]
        },
        {
          n: 53,
          translation: { tr: "Lâzım harfî, sûre başlarında bulunur; sekiz harfte toplanmıştır." },
          sharh: {
            tr: [
              "Medd-i lâzım (harfî) ile uzatılan harfler, sûre başlarındaki mukattaalardan **sekiz** tanesidir; çünkü bunların isimleri **üç harflidir** ve ortalarında med harfi vardır."
            ]
          }
        },
        {
          n: 54,
          translation: { tr: "Onları 'كَمْ عَسَلْ نَقَصْ' harfleri toplar; 'ayn' iki vecihlidir, uzatma (tûl) daha uygundur." },
          sharh: {
            tr: [
              "Lâzım med ile uzatılan sekiz harf **«كَمْ عَسَلْ نَقَصْ»** ifadesinde toplanmıştır: **ك م ع س ل ن ق ص**. Bunlar altı hareke uzatılır.",
              "**İstisna — «ayn» (ع):** Meryem ve Şûrâ sûrelerinin başındaki (كهيعص / حمعسق) \"ayn\"ın ortasında med değil **lîn** harfi (yâ) vardır; bu yüzden **dört veya altı hareke** (iki vecih) câizdir; **altı hareke (tûl)** tercih edilir."
            ]
          }
        },
        {
          n: 55,
          translation: { tr: "Üç harfli olmayan (ve içinde elif bulunmayan harfin) meddi, alışılmış tabiî meddir." },
          sharh: {
            tr: [
              "Mukattaa harflerinden **iki harfli** olanlar (isminde elif bulunan: *حا، يا، طا، ها، را*) med harfiyle bitmediğinden **tabiî med** (iki hareke) ile okunur.",
              "**Elif (ا)** ise hiç uzatılmaz; çünkü isminde med harfi yoktur (*الٓمٓ*'deki elif gibi)."
            ]
          }
        },
        {
          n: 56,
          translation: { tr: "Bu da yine sûre başlarında olur; 'حَيٌّ طَاهِرٌ' lafzında toplanmıştır." },
          sharh: {
            tr: [
              "Sûre başlarında **tabiî med** (iki hareke) ile okunan harfler beştir; **«حَيٌّ طَاهِرٌ»** lafzında toplanmıştır: **ح ي ط ه ر** (hâ, yâ, tâ, hâ, râ).",
              "Bunların isimleri iki harflidir ve ikinci harf med harfidir (*حا، يا، طا، ها، را*), sonrasında sükûn yoktur; bu yüzden lâzım değil tabiî meddir."
            ]
          },
          examples: [
            { ar: "طٰهٰ", ref: { sura: "Tâhâ", ayah: 1 }, tr: "\"tâ–hâ\" (ikisi de حي طهر'den → tabiî med)" },
            { ar: "يٰسٓ", ref: { sura: "Yâsîn", ayah: 1 }, tr: "\"yâ (tabiî) – sîn (lâzım)\"" }
          ]
        },
        {
          n: 57,
          translation: { tr: "On dört (mukattaa) harfini 'صِلْهُ سُحَيْراً مَنْ قَطَعْكَ' toplar; bu (görüş) meşhurdur." },
          sharh: {
            tr: [
              "Sûre başlarında geçen **bütün mukattaa harfleri on dörttür** ve meşhur olan **«صِلْهُ سُحَيْرًا مَنْ قَطَعْكَ»** ifadesinde toplanmıştır: **ص ل ه س ح ي ر م ن ق ط ع ك** + (elif).",
              "Özet: bunlardan **elif** hiç uzatılmaz; **حي طهر** tabiî (2 hareke); geri kalan **كم عسل نقص** lâzım (6 hareke); **ayn** ise 4 veya 6 hareke."
            ]
          }
        }
      ],
      summary: {
        tr: [
          "**Kelimî:** med + sükûn bir **kelimede** (üç+ harf). **Harfî:** mukattaa harfinde.",
          "**Müsakkal** (idğamlı) / **Muhaffef** (idğamsız) → toplam **4 kısım**, hepsi **6 hareke**.",
          "Kelimî muhaffefe tek örnek: *آلْآنَ* (Yûnus).",
          "Harfî lâzım (6 hareke): **كم عسل نقص** (8 harf).",
          "Tabiî (2 hareke): **حي طهر** (5 harf). **Elif** uzatılmaz.",
          "**Ayn** (كهيعص / حمعسق): 4 veya 6 hareke — tûl tercih.",
          "Bütün mukattaa harfleri 14: **صله سحيرا من قطعك**."
        ]
      }
    },

    /* ===== 10) HÂTİME (58–61) ===== */
    {
      id: "hatime",
      num: 10,
      arTitle: "الْخَاتِمَة",
      title: { tr: "Hâtime (Sonuç)", de: "Schluss (Chātima)", en: "Conclusion (Khātima)" },
      range: [58, 61],
      overview: {
        tr: "Nâzım eseri **hamd ile** bitirir; beyit sayısına (**نَدّ = 61**) ebced ile işaret eder ve tamamlanış tarihini müjde olarak zikreder. Son olarak Peygamber'e (ﷺ), âline, ashabına, her okuyan ve dinleyene **salât ve selâm** ile hitama erdirir.",
        de: "Der Verfasser schließt mit **Lob**, verweist per Abdschad auf die Verszahl (**Nadd = 61**) und nennt das Vollendungsdatum als frohe Botschaft. Zuletzt **Segen und Frieden** über den Propheten (ﷺ), seine Familie, Gefährten und jeden Leser und Hörer.",
        en: "The author closes with **praise**, points via abjad to the verse count (**Nadd = 61**), and names the completion date as glad tidings. Finally, **blessings and peace** upon the Prophet (ﷺ), his family, Companions, and every reader and listener."
      },
      beyits: [
        { n: 58, translation: { tr: "Bu nazım Allah'a hamd ile tamam oldu; sonu gelmeksizin O'na hamd ile." } },
        { n: 59, translation: { tr: "Beyitleri, akıl sahibine göründü (ki sayısı) 'نَدّ'dir (=61); tarihi, onu iyi öğrenene müjdedir." } },
        { n: 60, translation: { tr: "Sonra salât ve selâm daima, peygamberlerin sonuncusu Ahmed'in (ﷺ) üzerine olsun." } },
        { n: 61, translation: { tr: "Ve âline, ashabına, her tâbi olana, her okuyana ve her dinleyene (olsun)." } }
      ],
      summary: {
        tr: [
          "Eser **hamdele** ile başlayıp **hamdele** ile biter.",
          "Beyit sayısı **61**'dir ('نَدّ' ebced değeri).",
          "Kapanış: Peygamber'e (ﷺ) ve tâbilerine **salât ü selâm**."
        ]
      }
    }
  ]
};
