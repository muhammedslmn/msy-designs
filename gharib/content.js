/* =================================================================
   Gharîb — Inhalte (Kategorien · Begriffe · Nasîha-Bibliothek)

   WICHTIG (Amâna / Verantwortung vor Allah):
   - Alle Verse sind mit Sûra + Âya angegeben.
   - Hadithe stammen ausschließlich aus anerkannt authentischen
     Sammlungen (Ṣaḥîḥ al-Bukhârî / Ṣaḥîḥ Muslim) und sind mit
     Nummer und Grad (Ṣaḥîḥ) angegeben.
   - Der arabische Text ist der Originaltext; die anderen Sprachen
     sind sinngemäße Übersetzungen.
   Neue Begriffe lassen sich unten einfach ergänzen.
   ================================================================= */

/* ---------- Icons (reine Geometrie, keine Lebewesen) ---------- */
const ICONS = {
  prophets: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M12 2l2.2 4.6 5 .7-3.6 3.5.9 5L12 18l-4.5 2.3.9-5L4.8 7.3l5-.7z"/></svg>',
  companions: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><circle cx="12" cy="8" r="3"/><circle cx="6" cy="15" r="2.4"/><circle cx="18" cy="15" r="2.4"/></svg>',
  worship: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M6 21V11a6 6 0 0 1 12 0v10"/><path d="M4 21h16"/><path d="M12 11v10"/></svg>',
  quran: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M12 6c-1.8-1.3-4-2-6.5-2A2.5 2.5 0 0 0 3 6.5v11A1.5 1.5 0 0 0 4.5 19c2.4 0 4.6.6 6.5 2 1.9-1.4 4.1-2 6.5-2A1.5 1.5 0 0 0 21 17.5v-11A2.5 2.5 0 0 0 18.5 4C16 4 13.8 4.7 12 6z"/><path d="M12 6v15"/></svg>',
  places: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M4 8l8-4 8 4v11H4z"/><path d="M4 8l8 3 8-3"/><path d="M12 11v8"/></svg>',
  akhlaq: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M12 20s-7-4.3-9-9.2C1.8 7.5 3.6 4.8 6.6 4.8c1.9 0 3.3 1 4.4 2.6 1.1-1.6 2.5-2.6 4.4-2.6 3 0 4.8 2.7 3.6 6C19 15.7 12 20 12 20z"/></svg>',
  mixed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M12 3l2.5 5.5L20 11l-5.5 2.5L12 19l-2.5-5.5L4 11l5.5-2.5z"/></svg>',
  star8: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M50 6l10 14 16-6-2 17 14 10-14 10 2 17-16-6-10 14-10-14-16 6 2-17L14 51l14-10-2-17 16 6z"/><circle cx="50" cy="50" r="13"/></svg>',
};

/* ---------- Kategorien ---------- */
const CATEGORIES = [
  { id: 'prophets',   icon: ICONS.prophets,   name: { de: 'Propheten',   tr: 'Peygamberler', en: 'Prophets',   ar: 'الأنبياء' } },
  { id: 'companions', icon: ICONS.companions, name: { de: 'Gefährten',   tr: 'Sahabeler',    en: 'Companions', ar: 'الصحابة' } },
  { id: 'worship',    icon: ICONS.worship,    name: { de: 'Gottesdienst',tr: 'İbadet',       en: 'Worship',    ar: 'العبادات' } },
  { id: 'quran',      icon: ICONS.quran,      name: { de: 'Qurʾân & Suren', tr: 'Kurʾân & Sureler', en: 'Qurʾân & Surahs', ar: 'القرآن والسور' } },
  { id: 'places',     icon: ICONS.places,     name: { de: 'Heilige Orte',tr: 'Kutsal Yerler',en: 'Sacred Places', ar: 'الأماكن المقدسة' } },
  { id: 'akhlaq',     icon: ICONS.akhlaq,     name: { de: 'Charakter',   tr: 'Ahlak',        en: 'Character',  ar: 'الأخلاق' } },
];

/* ---------- Nasîha-Bibliothek (belegte Verse & Hadithe) ---------- */
const NASIHA = {
  /* --- Verse (Qurʾân) --- */
  tawhid: { type: 'verse', ref: 'al-Ikhlâṣ 112:1–4',
    ar: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
    de: '„Sprich: Er ist Allah, ein Einziger. Allah, der Absolute, auf den alles angewiesen ist. Er zeugt nicht und ist nicht gezeugt worden, und niemand ist Ihm gleich.“',
    tr: '„De ki: O Allah birdir. Allah Samed’dir. Doğurmamış ve doğmamıştır. Hiçbir şey O’na denk değildir.“',
    en: '“Say: He is Allah, the One. Allah, the Eternal Refuge. He neither begets nor is born, and there is none comparable to Him.”' },

  worship_purpose: { type: 'verse', ref: 'adh-Dhâriyât 51:56',
    ar: 'وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ',
    de: '„Und Ich habe die Ǧinn und die Menschen nur dazu erschaffen, dass sie Mir dienen.“',
    tr: '„Ben cinleri ve insanları ancak bana kulluk etsinler diye yarattım.“',
    en: '“And I did not create the jinn and mankind except to worship Me.”' },

  salah: { type: 'verse', ref: 'al-ʿAnkabût 29:45',
    ar: 'إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ',
    de: '„Wahrlich, das Gebet hält von dem Schändlichen und dem Verwerflichen ab.“',
    tr: '„Şüphesiz namaz, hayâsızlıktan ve kötülükten alıkoyar.“',
    en: '“Indeed, prayer restrains from immorality and wrongdoing.”' },

  zakat_salah: { type: 'verse', ref: 'al-Baqara 2:43',
    ar: 'وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَارْكَعُوا مَعَ الرَّاكِعِينَ',
    de: '„Und verrichtet das Gebet, entrichtet die Zakât und verneigt euch mit den sich Verneigenden.“',
    tr: '„Namazı kılın, zekâtı verin ve rükû edenlerle birlikte rükû edin.“',
    en: '“And establish prayer, give zakah, and bow with those who bow.”' },

  sawm: { type: 'verse', ref: 'al-Baqara 2:183',
    ar: 'يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ',
    de: '„O die ihr glaubt, vorgeschrieben ist euch das Fasten, so wie es denen vor euch vorgeschrieben war, auf dass ihr gottesfürchtig werdet.“',
    tr: '„Ey iman edenler! Sizden öncekilere farz kılındığı gibi oruç size de farz kılındı; umulur ki sakınırsınız.“',
    en: '“O you who believe, fasting is prescribed for you as it was for those before you, that you may become mindful of Allah.”' },

  hajj: { type: 'verse', ref: 'Âl ʿImrân 3:97',
    ar: 'وَلِلَّهِ عَلَى النَّاسِ حِجُّ الْبَيْتِ مَنِ اسْتَطَاعَ إِلَيْهِ سَبِيلًا',
    de: '„Und Allah steht den Menschen gegenüber die Pilgerfahrt zum Haus zu – wer einen Weg dorthin finden kann.“',
    tr: '„Yoluna gücü yetenlerin o evi (Kâbe’yi) haccetmesi, Allah’ın insanlar üzerindeki hakkıdır.“',
    en: '“And pilgrimage to the House is a duty owed to Allah by those able to find a way to it.”' },

  knowledge: { type: 'verse', ref: 'Ṭâ Hâ 20:114',
    ar: 'وَقُل رَّبِّ زِدْنِي عِلْمًا',
    de: '„Und sag: Mein Herr, mehre mir mein Wissen.“',
    tr: '„De ki: Rabbim, ilmimi artır.“',
    en: '“And say: My Lord, increase me in knowledge.”' },

  first_revelation: { type: 'verse', ref: 'al-ʿAlaq 96:1',
    ar: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ',
    de: '„Lies im Namen deines Herrn, Der erschaffen hat.“',
    tr: '„Yaratan Rabbinin adıyla oku.“',
    en: '“Read in the name of your Lord who created.”' },

  sabr: { type: 'verse', ref: 'al-Baqara 2:153',
    ar: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',
    de: '„O die ihr glaubt, sucht Hilfe in der Geduld und im Gebet. Wahrlich, Allah ist mit den Geduldigen.“',
    tr: '„Ey iman edenler! Sabır ve namazla yardım dileyin. Şüphesiz Allah, sabredenlerle beraberdir.“',
    en: '“O you who believe, seek help through patience and prayer. Indeed, Allah is with the patient.”' },

  ease: { type: 'verse', ref: 'ash-Sharḥ 94:5–6',
    ar: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا',
    de: '„Denn mit der Erschwernis kommt Erleichterung. Wahrlich, mit der Erschwernis kommt Erleichterung.“',
    tr: '„Şüphesiz zorlukla beraber bir kolaylık vardır. Gerçekten zorlukla beraber bir kolaylık vardır.“',
    en: '“For indeed, with hardship comes ease. Indeed, with hardship comes ease.”' },

  shukr: { type: 'verse', ref: 'Ibrâhîm 14:7',
    ar: 'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ',
    de: '„Wenn ihr dankbar seid, so werde Ich euch wahrlich noch mehr geben.“',
    tr: '„Andolsun, eğer şükrederseniz elbette size (nimetimi) artırırım.“',
    en: '“If you are grateful, I will surely increase you [in favour].”' },

  tawakkul: { type: 'verse', ref: 'aṭ-Ṭalâq 65:3',
    ar: 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ',
    de: '„Und wer sich auf Allah verlässt, dem ist Er seine Genüge.“',
    tr: '„Kim Allah’a tevekkül ederse, O ona yeter.“',
    en: '“And whoever relies upon Allah – then He is sufficient for him.”' },

  taqwa: { type: 'verse', ref: 'al-Ḥujurât 49:13',
    ar: 'إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ',
    de: '„Wahrlich, der Geehrteste von euch bei Allah ist der Gottesfürchtigste von euch.“',
    tr: '„Şüphesiz Allah katında en değerliniz, en çok takvâ sahibi olanınızdır.“',
    en: '“Indeed, the most noble of you in the sight of Allah is the most righteous of you.”' },

  prophet_mercy: { type: 'verse', ref: 'al-Anbiyâʾ 21:107',
    ar: 'وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ',
    de: '„Und Wir haben dich nur als Barmherzigkeit für die Weltenbewohner gesandt.“',
    tr: '„Seni ancak âlemlere rahmet olarak gönderdik.“',
    en: '“And We have not sent you except as a mercy to the worlds.”' },

  prophet_example: { type: 'verse', ref: 'al-Aḥzâb 33:21',
    ar: 'لَّقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ',
    de: '„Wahrlich, ihr habt im Gesandten Allahs ein schönes Vorbild.“',
    tr: '„Andolsun, Allah’ın Resûlü’nde sizin için güzel bir örnek vardır.“',
    en: '“There has certainly been for you in the Messenger of Allah an excellent example.”' },

  prophets_guided: { type: 'verse', ref: 'al-Anʿâm 6:90',
    ar: 'أُولَٰئِكَ الَّذِينَ هَدَى اللَّهُ ۖ فَبِهُدَاهُمُ اقْتَدِهْ',
    de: '„Das sind diejenigen, die Allah rechtgeleitet hat. So nimm ihre Rechtleitung zum Vorbild.“',
    tr: '„İşte onlar, Allah’ın hidayet ettiği kimselerdir. Sen de onların yoluna uy.“',
    en: '“Those are the ones whom Allah has guided, so follow their guidance.”' },

  ibrahim: { type: 'verse', ref: 'an-Naḥl 16:120',
    ar: 'إِنَّ إِبْرَاهِيمَ كَانَ أُمَّةً قَانِتًا لِّلَّهِ حَنِيفًا وَلَمْ يَكُ مِنَ الْمُشْرِكِينَ',
    de: '„Wahrlich, Ibrâhîm war ein Vorbild, Allah demütig ergeben, ein Ḥanîf, und er gehörte nicht zu den Götzendienern.“',
    tr: '„Şüphesiz İbrahim, Allah’a itaat eden, hakka yönelen (hanîf) bir önderdi; müşriklerden değildi.“',
    en: '“Indeed, Abraham was a nation, devoutly obedient to Allah, inclining toward truth, and he was not of the polytheists.”' },

  musa: { type: 'verse', ref: 'an-Nisâʾ 4:164',
    ar: 'وَكَلَّمَ اللَّهُ مُوسَىٰ تَكْلِيمًا',
    de: '„Und Allah sprach mit Mûsâ ein unmittelbares Sprechen.“',
    tr: '„Ve Allah, Mûsâ ile (vasıtasız) konuştu.“',
    en: '“And Allah spoke to Moses with [direct] speech.”' },

  isa: { type: 'verse', ref: 'Maryam 19:30',
    ar: 'قَالَ إِنِّي عَبْدُ اللَّهِ آتَانِيَ الْكِتَابَ وَجَعَلَنِي نَبِيًّا',
    de: '„Er sagte: Ich bin wahrlich Allahs Diener. Er hat mir die Schrift gegeben und mich zu einem Propheten gemacht.“',
    tr: '„(Îsâ) dedi ki: Şüphesiz ben Allah’ın kuluyum. Bana kitabı verdi ve beni peygamber yaptı.“',
    en: '“He said: Indeed, I am the servant of Allah. He has given me the Scripture and made me a prophet.”' },

  yusuf: { type: 'verse', ref: 'Yûsuf 12:90',
    ar: 'إِنَّهُ مَن يَتَّقِ وَيَصْبِرْ فَإِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ',
    de: '„Wer gottesfürchtig und geduldig ist – wahrlich, Allah lässt den Lohn der Gutes Tuenden nicht verlorengehen.“',
    tr: '„Kim Allah’tan korkar ve sabrederse, şüphesiz Allah iyilik edenlerin mükâfatını zayi etmez.“',
    en: '“Indeed, whoever is mindful of Allah and patient – Allah does not let the reward of those who do good be lost.”' },

  mecca_kaaba: { type: 'verse', ref: 'Âl ʿImrân 3:96',
    ar: 'إِنَّ أَوَّلَ بَيْتٍ وُضِعَ لِلنَّاسِ لَلَّذِي بِبَكَّةَ مُبَارَكًا وَهُدًى لِّلْعَالَمِينَ',
    de: '„Wahrlich, das erste Haus, das für die Menschen (zur Anbetung) errichtet wurde, ist das in Bakka (Mekka) – gesegnet und eine Rechtleitung für die Weltenbewohner.“',
    tr: '„Şüphesiz insanlar için kurulan ilk ev, Mekke’deki mübarek ve âlemlere hidayet olan (Kâbe)dir.“',
    en: '“Indeed, the first House established for mankind was that at Bakkah (Mecca) – blessed and a guidance for the worlds.”' },

  aqsa_isra: { type: 'verse', ref: 'al-Isrâʾ 17:1',
    ar: 'سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا مِّنَ الْمَسْجِدِ الْحَرَامِ إِلَى الْمَسْجِدِ الْأَقْصَى الَّذِي بَارَكْنَا حَوْلَهُ',
    de: '„Preis sei Dem, Der Seinen Diener bei Nacht vom heiligen Gebetshaus zum fernsten Gebetshaus (al-Aqsâ), dessen Umgebung Wir gesegnet haben, reisen ließ.“',
    tr: '„Kulunu bir gece Mescid-i Harâm’dan, çevresini bereketli kıldığımız Mescid-i Aksâ’ya götüren (Allah) her türlü noksanlıktan uzaktır.“',
    en: '“Exalted is He who took His servant by night from al-Masjid al-Ḥarâm to al-Masjid al-Aqṣâ, whose surroundings We have blessed.”' },

  dhikr: { type: 'verse', ref: 'ar-Raʿd 13:28',
    ar: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
    de: '„Wahrlich, im Gedenken Allahs finden die Herzen Ruhe.“',
    tr: '„Bilin ki kalpler ancak Allah’ı anmakla huzur bulur.“',
    en: '“Unquestionably, by the remembrance of Allah hearts are assured.”' },

  quran_guidance: { type: 'verse', ref: 'al-Baqara 2:2',
    ar: 'ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ',
    de: '„Dies ist das Buch, an dem es keinen Zweifel gibt, eine Rechtleitung für die Gottesfürchtigen.“',
    tr: '„Bu, kendisinde şüphe olmayan kitaptır; müttakiler için bir hidayettir.“',
    en: '“This is the Book about which there is no doubt, a guidance for those conscious of Allah.”' },

  fatiha: { type: 'verse', ref: 'al-Fâtiḥa 1:5',
    ar: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
    de: '„Dir allein dienen wir, und Dich allein bitten wir um Hilfe.“',
    tr: '„Yalnız sana kulluk eder, yalnız senden yardım dileriz.“',
    en: '“You alone we worship, and You alone we ask for help.”' },

  parents: { type: 'verse', ref: 'al-Isrâʾ 17:23',
    ar: 'وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا',
    de: '„Und dein Herr hat bestimmt, dass ihr nur Ihm dient und zu den Eltern gütig seid.“',
    tr: '„Rabbin, yalnız kendisine ibadet etmenizi ve anne babaya iyilik etmenizi emretti.“',
    en: '“And your Lord has decreed that you worship none but Him, and to parents, good treatment.”' },

  /* --- Hadithe (nur Ṣaḥîḥ) --- */
  niyyah: { type: 'hadith', ref: 'Ṣaḥîḥ al-Bukhârî 1 · Ṣaḥîḥ Muslim 1907', grade: 'Ṣaḥîḥ',
    ar: 'إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ',
    de: '„Die Taten werden nur nach den Absichten (bewertet).“',
    tr: '„Ameller ancak niyetlere göredir.“',
    en: '“Actions are but by intentions.”' },

  islam_pillars: { type: 'hadith', ref: 'Ṣaḥîḥ al-Bukhârî 8 · Ṣaḥîḥ Muslim 16', grade: 'Ṣaḥîḥ',
    ar: 'بُنِيَ الْإِسْلَامُ عَلَىٰ خَمْسٍ: شَهَادَةِ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَإِقَامِ الصَّلَاةِ، وَإِيتَاءِ الزَّكَاةِ، وَحَجِّ الْبَيْتِ، وَصَوْمِ رَمَضَانَ',
    de: '„Der Islam ist auf fünf (Säulen) errichtet: das Zeugnis, dass es keinen Gott außer Allah gibt und dass Muhammad der Gesandte Allahs ist; das Gebet; die Zakât; die Pilgerfahrt zum Haus; und das Fasten im Ramadân.“',
    tr: '„İslam beş temel üzerine kurulmuştur: Allah’tan başka ilah olmadığına ve Muhammed’in O’nun elçisi olduğuna şehadet, namaz, zekât, hac ve Ramazan orucu.“',
    en: '“Islam is built upon five: to testify that there is no god but Allah and that Muhammad is His Messenger, to establish prayer, to give zakah, to make the pilgrimage, and to fast Ramadan.”' },

  purity: { type: 'hadith', ref: 'Ṣaḥîḥ Muslim 223', grade: 'Ṣaḥîḥ',
    ar: 'الطُّهُورُ شَطْرُ الْإِيمَانِ',
    de: '„Die Reinheit ist die Hälfte des Glaubens.“',
    tr: '„Temizlik imanın yarısıdır.“',
    en: '“Purity is half of faith.”' },

  love_brother: { type: 'hadith', ref: 'Ṣaḥîḥ al-Bukhârî 13 · Ṣaḥîḥ Muslim 45', grade: 'Ṣaḥîḥ',
    ar: 'لَا يُؤْمِنُ أَحَدُكُمْ حَتَّىٰ يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ',
    de: '„Keiner von euch glaubt (vollkommen), bis er für seinen Bruder liebt, was er für sich selbst liebt.“',
    tr: '„Sizden biri, kendisi için istediğini kardeşi için de istemedikçe (kâmil manada) iman etmiş olmaz.“',
    en: '“None of you truly believes until he loves for his brother what he loves for himself.”' },

  good_word: { type: 'hadith', ref: 'Ṣaḥîḥ al-Bukhârî 6018 · Ṣaḥîḥ Muslim 47', grade: 'Ṣaḥîḥ',
    ar: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ',
    de: '„Wer an Allah und den Jüngsten Tag glaubt, der soll Gutes sagen oder schweigen.“',
    tr: '„Allah’a ve ahiret gününe iman eden ya hayır söylesin ya da sussun.“',
    en: '“Whoever believes in Allah and the Last Day, let him speak good or remain silent.”' },

  muslim_safe: { type: 'hadith', ref: 'Ṣaḥîḥ al-Bukhârî 10 · Ṣaḥîḥ Muslim 40', grade: 'Ṣaḥîḥ',
    ar: 'الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ',
    de: '„Der Muslim ist derjenige, vor dessen Zunge und Hand die (anderen) Muslime sicher sind.“',
    tr: '„Müslüman, diğer Müslümanların dilinden ve elinden emin olduğu kimsedir.“',
    en: '“The Muslim is the one from whose tongue and hand the Muslims are safe.”' },

  salawat: { type: 'hadith', ref: 'Ṣaḥîḥ Muslim 384', grade: 'Ṣaḥîḥ',
    ar: 'مَنْ صَلَّىٰ عَلَيَّ صَلَاةً صَلَّى اللَّهُ عَلَيْهِ بِهَا عَشْرًا',
    de: '„Wer ein einziges Mal den Segensgruß über mich spricht, über den spricht Allah dafür zehnfachen Segen.“',
    tr: '„Kim bana bir defa salât (salavat) getirirse, Allah ona bununla on kere rahmet eder.“',
    en: '“Whoever sends one blessing upon me, Allah sends ten blessings upon him for it.”' },

  nasiha_deen: { type: 'hadith', ref: 'Ṣaḥîḥ Muslim 55', grade: 'Ṣaḥîḥ',
    ar: 'الدِّينُ النَّصِيحَةُ',
    de: '„Die Religion ist der aufrichtige Rat (Naṣîḥa).“',
    tr: '„Din nasihattir (samimiyet ve iyilik dilemektir).“',
    en: '“The religion is sincere advice (Naṣîḥa).”' },
};

const CATEGORY_DEFAULT_NASIHA = {
  prophets: 'prophets_guided', companions: 'love_brother', worship: 'worship_purpose',
  quran: 'quran_guidance', places: 'mecca_kaaba', akhlaq: 'taqwa',
};
const DEFAULT_NASIHA = 'nasiha_deen';

/* ---------- Begriffe ----------
   level: 1=Leicht · 2=Mittel · 3=Schwer · 4=Sehr schwer
   w = Wort · h = Hinweiswort (für den Gharîb auf „Leicht“) · n = Nasîha-Schlüssel
*/
const TERMS = [
  /* ===== Propheten ===== */
  { cat:'prophets', level:1, n:'prophets_guided', w:{de:'Âdam',tr:'Âdem',en:'Âdam',ar:'آدم'}, h:{de:'erster Mensch',tr:'ilk insan',en:'first human',ar:'أول إنسان'} },
  { cat:'prophets', level:1, n:'ibrahim', w:{de:'Ibrâhîm',tr:'İbrahim',en:'Ibrâhîm',ar:'إبراهيم'}, h:{de:'Freund Allahs',tr:'Halîlullah',en:'Friend of Allah',ar:'الخليل'} },
  { cat:'prophets', level:1, n:'musa', w:{de:'Mûsâ',tr:'Mûsâ',en:'Mûsâ',ar:'موسى'}, h:{de:'der Stab',tr:'asa',en:'the staff',ar:'العصا'} },
  { cat:'prophets', level:1, n:'isa', w:{de:'ʿÎsâ',tr:'Îsâ',en:'ʿÎsâ',ar:'عيسى'}, h:{de:'Sohn Maryams',tr:'Meryem oğlu',en:'son of Mary',ar:'ابن مريم'} },
  { cat:'prophets', level:1, n:'prophet_mercy', w:{de:'Muḥammad ﷺ',tr:'Muhammed ﷺ',en:'Muḥammad ﷺ',ar:'محمد ﷺ'}, h:{de:'Siegel der Propheten',tr:'son peygamber',en:'final prophet',ar:'خاتم الأنبياء'} },
  { cat:'prophets', level:2, n:'prophets_guided', w:{de:'Nûḥ',tr:'Nûh',en:'Nûḥ',ar:'نوح'}, h:{de:'die Arche',tr:'gemi',en:'the ark',ar:'السفينة'} },
  { cat:'prophets', level:2, n:'yusuf', w:{de:'Yûsuf',tr:'Yûsuf',en:'Yûsuf',ar:'يوسف'}, h:{de:'der Brunnen',tr:'kuyu',en:'the well',ar:'البئر'} },
  { cat:'prophets', level:3, n:'prophets_guided', w:{de:'Sulaymân',tr:'Süleyman',en:'Sulaymân',ar:'سليمان'}, h:{de:'das Königreich',tr:'hükümdarlık',en:'the kingdom',ar:'المُلك'} },
  { cat:'prophets', level:3, n:'ease', w:{de:'Yûnus',tr:'Yûnus',en:'Yûnus',ar:'يونس'}, h:{de:'der große Fisch',tr:'balık',en:'the whale',ar:'الحوت'} },
  { cat:'prophets', level:3, n:'prophets_guided', w:{de:'Dâwûd',tr:'Dâvûd',en:'Dâwûd',ar:'داود'}, h:{de:'der Zabûr',tr:'Zebûr',en:'the Psalms',ar:'الزبور'} },
  { cat:'prophets', level:3, n:'ibrahim', w:{de:'Ismâʿîl',tr:'İsmail',en:'Ismâʿîl',ar:'إسماعيل'}, h:{de:'das Opfer',tr:'kurban',en:'the sacrifice',ar:'الذبح'} },
  { cat:'prophets', level:4, n:'prophets_guided', w:{de:'Zakariyyâ',tr:'Zekeriyyâ',en:'Zakariyyâ',ar:'زكريا'}, h:{de:'das Bittgebet',tr:'dua',en:'supplication',ar:'الدعاء'} },

  /* ===== Gefährten (Ṣaḥâba) ===== */
  { cat:'companions', level:1, n:'love_brother', w:{de:'Abû Bakr aṣ-Ṣiddîq',tr:'Ebû Bekir',en:'Abû Bakr',ar:'أبو بكر الصدّيق'}, h:{de:'erster Kalif',tr:'ilk halife',en:'first caliph',ar:'أول خليفة'} },
  { cat:'companions', level:1, n:'taqwa', w:{de:'ʿUmar al-Fârûq',tr:'Ömer',en:'ʿUmar',ar:'عمر بن الخطاب'}, h:{de:'die Gerechtigkeit',tr:'adalet',en:'justice',ar:'العدل'} },
  { cat:'companions', level:1, n:'knowledge', w:{de:'ʿAlî ibn Abî Ṭâlib',tr:'Ali',en:'ʿAlî',ar:'علي بن أبي طالب'}, h:{de:'Tor des Wissens',tr:'ilim kapısı',en:'gate of knowledge',ar:'باب العلم'} },
  { cat:'companions', level:2, n:'good_word', w:{de:'ʿUthmân ibn ʿAffân',tr:'Osman',en:'ʿUthmân',ar:'عثمان بن عفّان'}, h:{de:'der mit den zwei Lichtern',tr:'Zinnûreyn',en:'the two lights',ar:'ذو النورين'} },
  { cat:'companions', level:2, n:'salah', w:{de:'Bilâl al-Ḥabashî',tr:'Bilâl-i Habeşî',en:'Bilâl',ar:'بلال الحبشي'}, h:{de:'der erste Muezzin',tr:'ilk müezzin',en:'first muezzin',ar:'أول مؤذّن'} },
  { cat:'companions', level:2, n:'sabr', w:{de:'Khadîja',tr:'Hatice',en:'Khadîja',ar:'خديجة'}, h:{de:'erste Gläubige',tr:'ilk iman eden',en:'first believer',ar:'أول مؤمنة'} },
  { cat:'companions', level:2, n:'knowledge', w:{de:'ʿÂʾisha',tr:'Âişe',en:'ʿÂʾisha',ar:'عائشة'}, h:{de:'die Gelehrte',tr:'âlime',en:'the scholar',ar:'العالِمة'} },
  { cat:'companions', level:3, n:'tawakkul', w:{de:'Khâlid ibn al-Walîd',tr:'Hâlid bin Velîd',en:'Khâlid ibn al-Walîd',ar:'خالد بن الوليد'}, h:{de:'Schwert Allahs',tr:'Allah’ın kılıcı',en:'Sword of Allah',ar:'سيف الله'} },
  { cat:'companions', level:3, n:'prophet_example', w:{de:'Fâṭima az-Zahrâʾ',tr:'Fâtıma',en:'Fâṭima',ar:'فاطمة الزهراء'}, h:{de:'Tochter des Propheten ﷺ',tr:'Peygamber’in kızı',en:'the Prophet’s daughter',ar:'بنت النبي ﷺ'} },
  { cat:'companions', level:4, n:'tawakkul', w:{de:'Ḥamza',tr:'Hamza',en:'Ḥamza',ar:'حمزة'}, h:{de:'Löwe Allahs',tr:'Allah’ın aslanı',en:'Lion of Allah',ar:'أسد الله'} },
  { cat:'companions', level:4, n:'knowledge', w:{de:'Salmân al-Fârisî',tr:'Selmân-ı Fârisî',en:'Salmân al-Fârisî',ar:'سلمان الفارسي'}, h:{de:'der Perser',tr:'Farslı',en:'the Persian',ar:'الفارسي'} },
  { cat:'companions', level:4, n:'prophets_guided', w:{de:'Muṣʿab ibn ʿUmayr',tr:'Musʿab bin Umeyr',en:'Muṣʿab ibn ʿUmayr',ar:'مصعب بن عمير'}, h:{de:'erster Gesandter',tr:'ilk davetçi',en:'first envoy',ar:'أول سفير'} },

  /* ===== Gottesdienst (ʿIbâda) ===== */
  { cat:'worship', level:1, n:'salah', w:{de:'Ṣalâh (Gebet)',tr:'Namaz',en:'Ṣalâh (Prayer)',ar:'الصلاة'}, h:{de:'fünfmal am Tag',tr:'beş vakit',en:'five times a day',ar:'خمس مرات'} },
  { cat:'worship', level:1, n:'zakat_salah', w:{de:'Zakât',tr:'Zekât',en:'Zakât',ar:'الزكاة'}, h:{de:'Pflichtabgabe',tr:'sadaka',en:'obligatory charity',ar:'الصدقة'} },
  { cat:'worship', level:1, n:'sawm', w:{de:'Ṣawm (Fasten)',tr:'Oruç',en:'Ṣawm (Fasting)',ar:'الصوم'}, h:{de:'Ramadân',tr:'Ramazan',en:'Ramadan',ar:'رمضان'} },
  { cat:'worship', level:1, n:'hajj', w:{de:'Ḥajj',tr:'Hac',en:'Ḥajj',ar:'الحج'}, h:{de:'Reise nach Mekka',tr:'Mekke yolculuğu',en:'journey to Mecca',ar:'مكة'} },
  { cat:'worship', level:1, n:'islam_pillars', w:{de:'Shahâda',tr:'Şehadet',en:'Shahâda',ar:'الشهادة'}, h:{de:'das Bekenntnis',tr:'kelime-i şehadet',en:'the testimony',ar:'لا إله إلا الله'} },
  { cat:'worship', level:2, n:'purity', w:{de:'Wuḍûʾ',tr:'Abdest',en:'Wuḍûʾ',ar:'الوضوء'}, h:{de:'Reinheit',tr:'temizlik',en:'purity',ar:'الطهارة'} },
  { cat:'worship', level:2, n:'dhikr', w:{de:'Duʿâʾ',tr:'Dua',en:'Duʿâʾ',ar:'الدعاء'}, h:{de:'Bittgebet',tr:'yakarış',en:'supplication',ar:'الطلب'} },
  { cat:'worship', level:2, n:'dhikr', w:{de:'Dhikr',tr:'Zikir',en:'Dhikr',ar:'الذكر'}, h:{de:'Gedenken Allahs',tr:'Allah’ı anmak',en:'remembrance',ar:'التسبيح'} },
  { cat:'worship', level:2, n:'salah', w:{de:'Adhân',tr:'Ezan',en:'Adhân',ar:'الأذان'}, h:{de:'Gebetsruf',tr:'namaza çağrı',en:'call to prayer',ar:'النداء'} },
  { cat:'worship', level:2, n:'tawhid', w:{de:'Tawḥîd',tr:'Tevhid',en:'Tawḥîd',ar:'التوحيد'}, h:{de:'Einheit Allahs',tr:'Allah’ın birliği',en:'Oneness of Allah',ar:'الوحدانية'} },
  { cat:'worship', level:2, n:'worship_purpose', w:{de:'Îmân',tr:'İman',en:'Îmân',ar:'الإيمان'}, h:{de:'der Glaube',tr:'inanç',en:'faith',ar:'التصديق'} },
  { cat:'worship', level:3, n:'zakat_salah', w:{de:'Ṣadaqa',tr:'Sadaka',en:'Ṣadaqa',ar:'الصدقة'}, h:{de:'freiwillige Gabe',tr:'gönüllü yardım',en:'voluntary giving',ar:'التطوع'} },
  { cat:'worship', level:4, n:'purity', w:{de:'Tayammum',tr:'Teyemmüm',en:'Tayammum',ar:'التيمم'}, h:{de:'Reinigung mit Erde',tr:'toprakla temizlik',en:'dry ablution',ar:'بالتراب'} },
  { cat:'worship', level:4, n:'dhikr', w:{de:'Iʿtikâf',tr:'İtikâf',en:'Iʿtikâf',ar:'الاعتكاف'}, h:{de:'Rückzug in die Moschee',tr:'mescitte inziva',en:'seclusion in the mosque',ar:'في المسجد'} },

  /* ===== Qurʾân & Suren ===== */
  { cat:'quran', level:1, n:'fatiha', w:{de:'al-Fâtiḥa',tr:'Fâtiha',en:'al-Fâtiḥa',ar:'الفاتحة'}, h:{de:'die Eröffnende',tr:'açılış suresi',en:'the Opening',ar:'أم الكتاب'} },
  { cat:'quran', level:1, n:'tawhid', w:{de:'al-Ikhlâṣ',tr:'İhlâs',en:'al-Ikhlâṣ',ar:'الإخلاص'}, h:{de:'Tawḥîd-Sure',tr:'tevhid suresi',en:'surah of Tawhîd',ar:'قل هو الله أحد'} },
  { cat:'quran', level:2, n:'tawhid', w:{de:'Âyat al-Kursî',tr:'Âyetü’l-Kürsî',en:'Âyat al-Kursî',ar:'آية الكرسي'}, h:{de:'der Thronvers',tr:'en büyük ayet',en:'the Throne Verse',ar:'أعظم آية'} },
  { cat:'quran', level:2, n:'quran_guidance', w:{de:'Yâ Sîn',tr:'Yâsîn',en:'Yâ Sîn',ar:'يس'}, h:{de:'Herz des Qurʾân',tr:'Kurʾân’ın kalbi',en:'heart of the Qurʾân',ar:'قلب القرآن'} },
  { cat:'quran', level:2, n:'quran_guidance', w:{de:'al-Baqara',tr:'Bakara',en:'al-Baqara',ar:'البقرة'}, h:{de:'längste Sure',tr:'en uzun sure',en:'longest surah',ar:'أطول سورة'} },
  { cat:'quran', level:2, n:'tawhid', w:{de:'an-Nâs',tr:'Nâs',en:'an-Nâs',ar:'الناس'}, h:{de:'letzte Sure',tr:'son sure',en:'last surah',ar:'آخر سورة'} },
  { cat:'quran', level:3, n:'salah', w:{de:'al-Kawthar',tr:'Kevser',en:'al-Kawthar',ar:'الكوثر'}, h:{de:'kürzeste Sure',tr:'en kısa sure',en:'shortest surah',ar:'أقصر سورة'} },
  { cat:'quran', level:3, n:'quran_guidance', w:{de:'al-Mulk',tr:'Mülk',en:'al-Mulk',ar:'الملك'}, h:{de:'die Beschützerin',tr:'koruyan sure',en:'the protector',ar:'تبارك'} },
  { cat:'quran', level:3, n:'quran_guidance', w:{de:'al-Kahf',tr:'Kehf',en:'al-Kahf',ar:'الكهف'}, h:{de:'Freitagssure',tr:'Cuma suresi',en:'Friday surah',ar:'أصحاب الكهف'} },
  { cat:'quran', level:3, n:'tawhid', w:{de:'al-Falaq',tr:'Felak',en:'al-Falaq',ar:'الفلق'}, h:{de:'das Tagesgrauen',tr:'şafak',en:'the daybreak',ar:'الصبح'} },
  { cat:'quran', level:4, n:'tawhid', w:{de:'al-Muʿawwidhatân',tr:'Muavvizeteyn',en:'al-Muʿawwidhatân',ar:'المعوذتان'}, h:{de:'die zwei Schutzsuren',tr:'iki koruyucu sure',en:'the two refuge surahs',ar:'الفلق والناس'} },
  { cat:'quran', level:4, n:'first_revelation', w:{de:'al-ʿAlaq',tr:'Alak',en:'al-ʿAlaq',ar:'العلق'}, h:{de:'erste Offenbarung',tr:'ilk vahiy',en:'first revelation',ar:'أول ما نزل'} },

  /* ===== Heilige Orte ===== */
  { cat:'places', level:1, n:'mecca_kaaba', w:{de:'al-Kaʿba',tr:'Kâbe',en:'al-Kaʿba',ar:'الكعبة'}, h:{de:'die Qibla',tr:'kıble',en:'the qibla',ar:'القبلة'} },
  { cat:'places', level:1, n:'mecca_kaaba', w:{de:'Makka (Mekka)',tr:'Mekke',en:'Makkah',ar:'مكة'}, h:{de:'Mutter der Städte',tr:'şehirlerin anası',en:'mother of cities',ar:'أم القرى'} },
  { cat:'places', level:1, n:'salawat', w:{de:'al-Madîna',tr:'Medine',en:'al-Madînah',ar:'المدينة'}, h:{de:'Stadt des Propheten ﷺ',tr:'Peygamber şehri',en:'city of the Prophet ﷺ',ar:'طيبة'} },
  { cat:'places', level:2, n:'aqsa_isra', w:{de:'al-Masjid al-Aqṣâ',tr:'Mescid-i Aksâ',en:'al-Masjid al-Aqṣâ',ar:'المسجد الأقصى'}, h:{de:'die erste Qibla',tr:'ilk kıble',en:'the first qibla',ar:'أولى القبلتين'} },
  { cat:'places', level:2, n:'mecca_kaaba', w:{de:'Zamzam',tr:'Zemzem',en:'Zamzam',ar:'زمزم'}, h:{de:'gesegnetes Wasser',tr:'mübarek su',en:'blessed water',ar:'ماء مبارك'} },
  { cat:'places', level:2, n:'salawat', w:{de:'al-Masjid an-Nabawî',tr:'Mescid-i Nebevî',en:'al-Masjid an-Nabawî',ar:'المسجد النبوي'}, h:{de:'Moschee des Propheten ﷺ',tr:'Peygamber mescidi',en:'the Prophet’s Mosque ﷺ',ar:'الروضة'} },
  { cat:'places', level:3, n:'hajj', w:{de:'ʿArafât',tr:'Arafat',en:'ʿArafât',ar:'عرفات'}, h:{de:'Tag des Ḥajj',tr:'vakfe',en:'the standing',ar:'الوقوف'} },
  { cat:'places', level:3, n:'hajj', w:{de:'aṣ-Ṣafâ wa-l-Marwa',tr:'Safâ ve Merve',en:'aṣ-Ṣafâ & al-Marwa',ar:'الصفا والمروة'}, h:{de:'der Saʿy',tr:'sa’y',en:'the walk (Saʿy)',ar:'السعي'} },
  { cat:'places', level:3, n:'tawakkul', w:{de:'Uḥud',tr:'Uhud',en:'Uḥud',ar:'أحد'}, h:{de:'der Berg',tr:'dağ',en:'the mountain',ar:'الجبل'} },
  { cat:'places', level:4, n:'first_revelation', w:{de:'Ḥirâʾ',tr:'Hira',en:'Ḥirâʾ',ar:'حراء'}, h:{de:'Höhle der Offenbarung',tr:'vahiy mağarası',en:'cave of revelation',ar:'الغار'} },
  { cat:'places', level:4, n:'hajj', w:{de:'Minâ',tr:'Mina',en:'Minâ',ar:'منى'}, h:{de:'die Zelte',tr:'çadırlar',en:'the tents',ar:'الجمرات'} },
  { cat:'places', level:4, n:'mecca_kaaba', w:{de:'al-Ḥaramayn',tr:'Harameyn',en:'al-Ḥaramayn',ar:'الحرمين'}, h:{de:'die zwei heiligen Stätten',tr:'iki harem',en:'the two sanctuaries',ar:'مكة والمدينة'} },

  /* ===== Charakter (Akhlâq) ===== */
  { cat:'akhlaq', level:1, n:'sabr', w:{de:'Ṣabr (Geduld)',tr:'Sabır',en:'Ṣabr (Patience)',ar:'الصبر'}, h:{de:'Standhaftigkeit',tr:'metanet',en:'steadfastness',ar:'التحمل'} },
  { cat:'akhlaq', level:1, n:'shukr', w:{de:'Shukr (Dankbarkeit)',tr:'Şükür',en:'Shukr (Gratitude)',ar:'الشكر'}, h:{de:'Danken',tr:'teşekkür',en:'thankfulness',ar:'الحمد'} },
  { cat:'akhlaq', level:1, n:'prophet_mercy', w:{de:'Raḥma (Barmherzigkeit)',tr:'Merhamet',en:'Raḥma (Mercy)',ar:'الرحمة'}, h:{de:'Mitgefühl',tr:'şefkat',en:'compassion',ar:'العطف'} },
  { cat:'akhlaq', level:2, n:'niyyah', w:{de:'Ikhlâṣ (Aufrichtigkeit)',tr:'İhlâs',en:'Ikhlâṣ (Sincerity)',ar:'الإخلاص'}, h:{de:'reine Absicht',tr:'samimiyet',en:'pure intention',ar:'النية'} },
  { cat:'akhlaq', level:2, n:'tawakkul', w:{de:'Tawakkul',tr:'Tevekkül',en:'Tawakkul',ar:'التوكل'}, h:{de:'Gottvertrauen',tr:'Allah’a güven',en:'reliance on Allah',ar:'الاعتماد على الله'} },
  { cat:'akhlaq', level:2, n:'good_word', w:{de:'Ṣidq (Wahrhaftigkeit)',tr:'Sıdk (Doğruluk)',en:'Ṣidq (Truthfulness)',ar:'الصدق'}, h:{de:'Ehrlichkeit',tr:'dürüstlük',en:'honesty',ar:'الصراحة'} },
  { cat:'akhlaq', level:2, n:'muslim_safe', w:{de:'Amâna',tr:'Emanet',en:'Amâna',ar:'الأمانة'}, h:{de:'Vertrauenswürdigkeit',tr:'güvenilirlik',en:'trustworthiness',ar:'الوفاء'} },
  { cat:'akhlaq', level:2, n:'taqwa', w:{de:'Taqwâ',tr:'Takvâ',en:'Taqwâ',ar:'التقوى'}, h:{de:'Gottesfurcht',tr:'Allah bilinci',en:'God-consciousness',ar:'الخوف من الله'} },
  { cat:'akhlaq', level:3, n:'parents', w:{de:'Birr al-Wâlidayn',tr:'Ana-babaya iyilik',en:'Birr al-Wâlidayn',ar:'بر الوالدين'}, h:{de:'Güte zu den Eltern',tr:'anne-babaya iyilik',en:'kindness to parents',ar:'الإحسان للوالدين'} },
  { cat:'akhlaq', level:3, n:'taqwa', w:{de:'Tawâḍuʿ (Demut)',tr:'Tevazu',en:'Tawâḍuʿ (Humility)',ar:'التواضع'}, h:{de:'Bescheidenheit',tr:'alçakgönüllülük',en:'modesty',ar:'التذلل'} },
  { cat:'akhlaq', level:3, n:'good_word', w:{de:'ʿAfw (Vergebung)',tr:'Af',en:'ʿAfw (Forgiveness)',ar:'العفو'}, h:{de:'Verzeihen',tr:'bağışlamak',en:'pardon',ar:'المغفرة'} },
  { cat:'akhlaq', level:3, n:'love_brother', w:{de:'Ḥayâʾ (Schamgefühl)',tr:'Hayâ',en:'Ḥayâʾ (Modesty)',ar:'الحياء'}, h:{de:'Ehrgefühl vor Allah',tr:'edep',en:'bashfulness',ar:'الحشمة'} },
  { cat:'akhlaq', level:4, n:'good_word', w:{de:'Ḥilm (Sanftmut)',tr:'Hilm (Yumuşaklık)',en:'Ḥilm (Forbearance)',ar:'الحلم'}, h:{de:'Geduld im Zorn',tr:'öfkeye hâkimiyet',en:'calm in anger',ar:'ضبط النفس'} },
  { cat:'akhlaq', level:4, n:'love_brother', w:{de:'Ṣilat ar-Raḥim',tr:'Sıla-i Rahim',en:'Ṣilat ar-Raḥim',ar:'صلة الرحم'}, h:{de:'Verwandtschaftspflege',tr:'akraba ziyareti',en:'kinship ties',ar:'القرابة'} },
];
