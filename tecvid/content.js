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
      status: "draft",
      overview: {
        tr: "Nazmın asıl konusuna girişidir. Sâkin nûn (نْ) ve tenvîn (ـً ـٍ ـٌ) için **dört hüküm** anlatılır: **İzhâr** (boğaz harflerinde açık okuma), **İdğâm** (gunneli/gunnesiz olarak sonraki harfe katma), **İklâb** (bâ'dan önce mîme çevirme) ve **İhfâ** (geri kalan on beş harfte gizleme). Nâzım her hükmün harflerini, remz cümleleriyle ezberlenecek şekilde sıralar.",
        de: "Der eigentliche Einstieg des Gedichts: Für das sākine Nūn und das Tanwīn werden **vier Regeln** dargelegt — **Iẓhār**, **Idghām**, **Iqlāb** und **Ikhfāʾ** — mitsamt ihren Buchstaben, in Merkformeln gefasst.",
        en: "The poem's substantive opening: for sākin nūn and tanwīn, **four rulings** are set out — **Iẓhār**, **Idghām**, **Iqlāb**, and **Ikhfāʾ** — each with its letters, cast as mnemonic phrases."
      },
      beyits: [
        { n: 6, translation: { tr: "Sâkin nûn ve tenvîn için dört hüküm vardır; açıklamamı iyi belle." } },
        { n: 7, translation: { tr: "Birincisi izhârdır; boğaz harflerinden önce gelir; onlar sırayla dizilmiş altı harftir, öğren." } },
        { n: 8, translation: { tr: "(Bunlar:) hemze, sonra hâ, sonra ayn ve (noktasız ikili) hâ, sonra ğayn ve hı." } },
        { n: 9, translation: { tr: "İkincisi idğâmdır; altı harfte gelir, 'يرملون' (yermelûn) kelimesinde toplanmış ve onlarca sabit olmuştur." } },
        { n: 10, translation: { tr: "Fakat o iki kısımdır: bir kısmı gunne ile idğam edilir; bu da 'ينمو' (yenmû) harfleriyle bilinir." } },
        { n: 11, translation: { tr: "Ancak (nûn ile harf) tek kelimede bulunursa idğam etme; 'دُنْيَا' ve ardından 'صِنْوَان' gibi." } },
        { n: 12, translation: { tr: "İkinci (kısım) gunnesiz idğamdır; lâm ve râ'da olur; sonra onu tekrar et (şeddele)." } },
        { n: 13, translation: { tr: "Üçüncüsü iklâbdır; bâ harfi yanında (nûn) mîme çevrilir, gunne ve ihfâ ile." } },
        { n: 14, translation: { tr: "Dördüncüsü ihfâdır; (geri) kalan harfler yanında; faziletli okuyucu için vaciptir." } },
        { n: 15, translation: { tr: "On harften sonra gelen beş (yani on beş) harfte olur; remzini bu beytin kelimelerine yerleştirdim." } },
        { n: 16, translation: { tr: "«Sıfat sahibini övgüyle an; nice cömert, yükselen kişi vardır; temiz kal, takvanı artır, zalimi bırak.» — Bu cümlenin her kelimesinin ilk harfi, bir ihfâ harfini remzeder." } }
      ]
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
      status: "draft",
      overview: {
        tr: "İki tür lâm işlenir. **Lâm-ı ta'rîf** (ال): 14 \"kamerî\" harften önce **izhâr** (kamerî lâm), 14 \"şemsî\" harften önce **idğâm** (şemsî lâm) edilir; remzleri «اِبْغِ حَجَّكَ وَخَفْ عَقِيمَهُ» ve «طِبْ ثُمَّ صِلْ…» cümleleridir. **Fiil lâmı** ise her durumda **izhâr** edilir. (Şerhte ayrıca emir lâmı, isim lâmı ve \"hel/bel\" lâmı da ele alınır.)",
        de: "Zwei Arten von Lām: Das **Artikel-Lām** (ال) wird vor 14 „Mond“-Buchstaben mit **Iẓhār** (Mond-Lām), vor 14 „Sonnen“-Buchstaben mit **Idghām** (Sonnen-Lām) gelesen. Das **Verb-Lām** wird stets mit **Iẓhār** gelesen.",
        en: "Two kinds of lām: the **article lām** (ال) is read with **iẓhār** before 14 \"lunar\" letters (lunar lām) and with **idghām** before 14 \"solar\" letters (solar lām). The **verb lām** is always read with **iẓhār**."
      },
      beyits: [
        { n: 24, translation: { tr: "Lâm-ı ta'rîfin harflerden önce iki hâli vardır; birincisi onun izhârıdır, bunu bil." } },
        { n: 25, translation: { tr: "On dört harften önceki (hükmünü) öğren: «اِبْغِ حَجَّكَ وَخَفْ عَقِيمَهُ» cümlesinden." } },
        { n: 26, translation: { tr: "İkincisi, yine on dört harfte idğam edilmesidir; onun remzini de belle." } },
        { n: 27, translation: { tr: "«Akrabalık bağını gözet, kurtul; nimet sahibine katıl; kötü zandan uzak dur; şerefliyi ziyaret et.» — (Bu cümle şemsî harflerin remzidir.)" } },
        { n: 28, translation: { tr: "Birinci lâmı 'kamerî', diğer lâmı ise 'şemsî' diye isimlendir." } },
        { n: 29, translation: { tr: "Fiil lâmını her durumda izhâr et; «قُلْ نَعَمْ», «قُلْنَا» ve «الْتَقَى» gibi örneklerde." } }
      ]
    },

    /* ===== 6) MİSLEYN, MÜTEKĀRİBEYN, MÜTECÂNİSEYN (30–34) ===== */
    {
      id: "mislan-mutaqaribayn",
      num: 6,
      arTitle: "الْمِثْلَانِ وَالْمُتَقَارِبَانِ وَالْمُتَجَانِسَان",
      title: { tr: "Misleyn, Mütekāribeyn, Mütecâniseyn", de: "Mithlān, Mutaqāribān, Mutadschānisān", en: "Mithlān, Mutaqāribān, Mutajānisān" },
      range: [30, 34],
      status: "draft",
      overview: {
        tr: "İki harfin karşılaşma türleri: **Misleyn** (mahreç ve sıfatça aynı — ör. mîm+mîm), **Mütekāribeyn** (mahreçleri yakın, sıfatları farklı), **Mütecâniseyn** (mahreçleri aynı, sıfatları farklı — ör. tâ+dâl). Ayrıca birincisi sâkin olursa **sagîr (küçük) idğam**, ikisi de harekeli olursa **kebîr (büyük) idğam** adını alır.",
        de: "Arten des Zusammentreffens zweier Buchstaben: **Mithlān** (in Austrittsort und Eigenschaft gleich), **Mutaqāribān** (nahe Austrittsorte, verschiedene Eigenschaften), **Mutadschānisān** (gleicher Austrittsort, verschiedene Eigenschaften). Ist der erste sākin: **kleines** Idghām; sind beide bewegt: **großes** Idghām.",
        en: "Types of two letters meeting: **mithlān** (same exit point and quality), **mutaqāribān** (near exit points, differing qualities), **mutajānisān** (same exit point, differing qualities). If the first is sākin: **minor** idghām; if both are vowelled: **major** idghām."
      },
      beyits: [
        { n: 30, translation: { tr: "Sıfat ve mahreçte iki harf birleşirse (aynı olursa), en uygunu onlara 'misleyn' (denmesi)dir." } },
        { n: 31, translation: { tr: "Eğer mahreççe yakın olur, sıfatlarda ayrılırlarsa…" } },
        { n: 32, translation: { tr: "…'mütekāribeyn' diye adlandırılırlar; yahut mahreçte birleşip sıfatta ayrılırlarsa," } },
        { n: 33, translation: { tr: "'mütecâniseyn' (denir). Sonra, her birinin birincisi sâkin olursa 'sagîr' (küçük) diye isimlendir." } },
        { n: 34, translation: { tr: "Yahut her ikisi de harekeli olursa 'kebîr' (büyük) de; bunu örneklerle iyi kavra." } }
      ]
    },

    /* ===== 7) MEDDİN KISIMLARI (35–41) ===== */
    {
      id: "mad-aksam",
      num: 7,
      arTitle: "أَقْسَامُ الْمَدّ",
      title: { tr: "Meddin Kısımları", de: "Die Arten des Madd", en: "The Types of Madd" },
      range: [35, 41],
      status: "draft",
      overview: {
        tr: "Med (sesi uzatma) iki kısımdır: **Aslî (tabiî) med** — bir sebebe (hemze/sükûn) bağlı değildir, miktarı iki harekedir; ve **fer'î med** — hemze veya sükûn sebebiyle uzar. Med harfleri üçtür (ا، و، ي) ve «نُوحِيهَا» kelimesinde toplanır. Ayrıca **lîn harfleri** (öncesi üstünlü sâkin و ve ي) açıklanır.",
        de: "Madd (Dehnung) ist zweifach: **ursprünglicher (natürlicher) Madd** — ohne Ursache, zwei Ḥaraka lang; und **abgeleiteter Madd** — durch Hamza oder Sukūn verlängert. Die drei Madd-Buchstaben (ا، و، ي) sind im Wort «نُوحِيهَا» versammelt.",
        en: "Madd (prolongation) is of two kinds: **original (natural) madd** — with no cause, two ḥarakāt long; and **derived madd** — lengthened by a hamza or sukūn. The three madd letters (ا، و، ي) are gathered in the word «نُوحِيهَا»."
      },
      beyits: [
        { n: 35, translation: { tr: "Med, aslî ve fer'î olmak üzere ikidir; birincisine 'tabiî' adını ver." } },
        { n: 36, translation: { tr: "O, bir sebebe bağlı olmayan meddir; med harfleri de onsuz getirilmez (bulunmaz)." } },
        { n: 37, translation: { tr: "Bilakis medden sonra hemze veya sükûn dışında herhangi bir harf gelirse, o tabiî med olur." } },
        { n: 38, translation: { tr: "Diğeri fer'î meddir; hemze veya sükûn gibi bir sebebe bağlıdır." } },
        { n: 39, translation: { tr: "Onun harfleri üçtür; onları 'وَاي' lafzında bul; onlar 'نُوحِيهَا' kelimesindedir." } },
        { n: 40, translation: { tr: "Yâ'dan önce kesre, vâv'dan önce ötre şarttır; eliften önce ise fetha gereklidir." } },
        { n: 41, translation: { tr: "Lîn (harfleri) ondandır: öncesi üstünlü olan sâkin yâ ve vâv'dır." } }
      ]
    },

    /* ===== 8) MEDDİN HÜKÜMLERİ (42–47) ===== */
    {
      id: "mad-ahkam",
      num: 8,
      arTitle: "أَحْكَامُ الْمَدّ",
      title: { tr: "Meddin Hükümleri", de: "Die Regeln des Madd", en: "The Rulings of Madd" },
      range: [42, 47],
      status: "draft",
      overview: {
        tr: "Meddin üç hükmü: **Vücûb** (vâcib — muttasıl med: tek kelimede medden sonra hemze), **Cevâz** (câiz — munfasıl med: hemze ayrı kelimede; ayrıca ârız-ı sükûn ve bedel medleri) ve **Lüzûm** (lâzım — aslî sükûn medden sonra gelirse). Her biri örneklerle verilir.",
        de: "Drei Regeln des Madd: **Wudschūb** (Pflicht — Madd muttaṣil), **Dschawāz** (Erlaubnis — Madd munfaṣil, ʿāriḍ, badal) und **Luzūm** (Notwendigkeit — Madd lāzim).",
        en: "Three rulings of madd: **wujūb** (obligatory — madd muttaṣil), **jawāz** (permissible — madd munfaṣil, ʿāriḍ, badal), and **luzūm** (necessary — madd lāzim)."
      },
      beyits: [
        { n: 42, translation: { tr: "Med için süregelen üç hüküm vardır: vücûb, cevâz ve lüzûm." } },
        { n: 43, translation: { tr: "Vâcib olan: tek kelimede medden sonra hemze gelmesidir; buna 'muttasıl' denir." } },
        { n: 44, translation: { tr: "Câiz olan med ve kasr: (hemze ile med) ayrı kelimelerde olursa; bu da 'munfasıl'dır." } },
        { n: 45, translation: { tr: "Bunun benzeri, vakıf sebebiyle ârız sükûn olursa; 'تَعْلَمُونَ', 'نَسْتَعِينُ' gibi." } },
        { n: 46, translation: { tr: "Yahut hemze medden önce gelirse; bu 'bedel'dir; 'آمَنُوا' ve 'إِيمَاناً' gibi al." } },
        { n: 47, translation: { tr: "Lâzım olan: vasl ve vakıfta sabit, aslî sükûn medden sonra gelip uzatılırsa (olur)." } }
      ]
    },

    /* ===== 9) MEDD-İ LÂZIMIN KISIMLARI (48–57) ===== */
    {
      id: "mad-lazim",
      num: 9,
      arTitle: "أَقْسَامُ الْمَدِّ اللَّازِم",
      title: { tr: "Medd-i Lâzımın Kısımları", de: "Die Arten des Madd Lāzim", en: "The Types of Madd Lāzim" },
      range: [48, 57],
      status: "draft",
      overview: {
        tr: "Medd-i lâzım dörttür: **Kelimî müsakkal / muhaffef** ve **harfî müsakkal / muhaffef**. Kelimîde med harfinden sonra kelimede aslî sükûn bulunur; harfîde ise sûre başlarındaki (mukattaa) harflerde med ortada olur. Harfî lâzım, sekiz harfte toplanır: «كَمْ عَسَلْ نَقَصْ»; tabiî uzayanlar ise «حَيٌّ طَاهِرٌ» lafzındadır. On dört mukattaa harfi «صِلْهُ سُحَيْراً مَنْ قَطَعْكَ» ile toplanır.",
        de: "Madd Lāzim ist vierfach: **kalimī** (schwer/leicht) und **ḥarfī** (schwer/leicht). Die acht ḥarfī-Buchstaben sind in «كَمْ عَسَلْ نَقَصْ» versammelt; die natürlich gedehnten in «حَيٌّ طَاهِرٌ». Die vierzehn Anfangsbuchstaben in «صِلْهُ سُحَيْراً مَنْ قَطَعْكَ».",
        en: "Madd lāzim is fourfold: **kalimī** (heavy/light) and **ḥarfī** (heavy/light). The eight ḥarfī letters are gathered in «كَمْ عَسَلْ نَقَصْ»; the naturally-lengthened in «حَيٌّ طَاهِرٌ». The fourteen opening letters in «صِلْهُ سُحَيْراً مَنْ قَطَعْكَ»."
      },
      beyits: [
        { n: 48, translation: { tr: "Lâzım medin kısımları onlarca dörttür; bunlar kelimî ve harfî(dir)." } },
        { n: 49, translation: { tr: "Her ikisi de muhaffef ve müsakkal (olur); işte bunlar dört (kısım olarak) ayrıntılanır." } },
        { n: 50, translation: { tr: "Bir kelimede sükûn, med harfiyle bir araya gelirse, o 'kelimî' olur." } },
        { n: 51, translation: { tr: "Yahut üç harfli (isimlerde) bulunur, medd de ortasında olursa, 'harfî' olarak belirir." } },
        { n: 52, translation: { tr: "İdğam edilirse her ikisi de müsakkaldir; idğam edilmezse hepsi muhaffeftir." } },
        { n: 53, translation: { tr: "Lâzım harfî, sûre başlarında bulunur; sekiz harfte toplanmıştır." } },
        { n: 54, translation: { tr: "Onları 'كَمْ عَسَلْ نَقَصْ' harfleri toplar; 'ayn' iki vecihlidir, uzatma (tûl) daha uygundur." } },
        { n: 55, translation: { tr: "Üç harfli olmayan (ve içinde elif bulunmayan harfin) meddi, alışılmış tabiî meddir." } },
        { n: 56, translation: { tr: "Bu da yine sûre başlarında olur; 'حَيٌّ طَاهِرٌ' lafzında toplanmıştır." } },
        { n: 57, translation: { tr: "On dört (mukattaa) harfini 'صِلْهُ سُحَيْراً مَنْ قَطَعْكَ' toplar; bu (görüş) meşhurdur." } }
      ]
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
