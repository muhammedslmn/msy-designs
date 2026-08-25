/* Scene list for the Ilah presentation.

   Condensed on the author's instruction: headline plus a few short points
   rather than the full transcript, so a viewer reads a slide at a glance
   while listening. Scene boundaries are the fourteen timecodes the author
   supplied; long sections are subdivided at their own turning points.

   Names, terms and the wording of the short quotes stay as the author
   wrote them.                                                            */

export const SCENES = [
  // --- 1. Einleitung  00:00,00 - 00:17,62 ---
  { t: 0, e: 5.4,
    full: 'Was bedeutet „Ilah“?', kind: 'title', ar: 'الإله', title: 'Was bedeutet Ilah?', eyebrow: 'Tawhid' },

  { t: 5.4, e: 11.6,
    full: 'Nachdem wir uns in den vergangenen Videos mit dem Tawhid und der Bedeutung des Glaubensbekenntnisses La ilaha illa Allah beschäftigt haben, wollen wir nun einen Begriff näher betrachten, der im Zentrum dieser gewaltigen Aussage steht: Ilah.', kind: 'arch', eyebrow: 'Einordnung',
    ar: 'لا إله إلا الله', sub: 'Im Zentrum dieser Aussage steht ein Wort.' },

  { t: 11.6, e: 17.62,
    full: 'Was bedeutet dieses Wort eigentlich – sprachlich und in der islamischen Fachsprache?', kind: 'points', head: 'Zwei Ebenen', art: 'folio',
    points: ['Sprachlich', 'In der islamischen Fachsprache'] },

  // --- 2. Ibn Faris  00:18,12 - 00:40,56 ---
  { t: 18.12, e: 24.6,
    full: 'Die Gelehrten der arabischen Sprache haben die Herkunft und Bedeutung dieses Wortes in den klassischen Wörterbüchern sehr deutlich erklärt.', kind: 'points', eyebrow: 'Die Wörterbücher',
    head: 'Die Sprachgelehrten', art: 'folio',
    points: ['Ibn Faris', 'al-Jawhari', 'Ibn Manzur'] },

  { t: 24.6, e: 33.5,
    full: 'Der große Sprachgelehrte Ibn Faris erklärt, dass die aus den Buchstaben Hamza, Lam und Ha bestehende Wortwurzel eine grundlegende Bedeutung trägt: das Dienen und Anbeten (at-Ta’abbud).', kind: 'root', eyebrow: 'Die Wortwurzel',
    ar: 'أ ل ه', labels: ['Hamza', 'Lam', 'Ha'],
    sub: 'at-Ta’abbud — das Dienen und Anbeten', cite: 'Ibn Faris' },

  { t: 33.5, e: 40.56,
    full: 'Ilah wird so bezeichnet, weil er der Ma’bud, also derjenige ist, dem Anbetung dargebracht wird.', kind: 'equation', left: 'Ilah', right: 'al-Ma’bud',
    sub: 'Derjenige, dem Anbetung dargebracht wird.', cite: 'Ibn Faris' },

  // --- 3. al-Jawhari, Ibn Manzur  00:41,04 - 01:02,64 ---
  { t: 41.04, e: 51.6,
    full: 'Imam al-Jawhari und Ibn Manzur erklären, dass Ilah die Bedeutung von Ma’luh trägt. Es bedeutet also: al-Ma’luh beziehungsweise al-Ma’bud – derjenige, der angebetet wird und vor dem man sich unterwirft.', kind: 'table', head: 'In den Wörterbüchern', ar_small: 'مألوه',
    rows: [['al-Jawhari', 'Ma’luh'], ['Ibn Manzur', 'al-Ma’bud']] },

  { t: 51.6, e: 62.64,
    full: 'Zusammengefasst bedeutet Ilah sprachlich: das Wesen, dem sich das Herz mit höchster Liebe, Ehrfurcht, Zufluchtssuche und Furcht zuwendet und das es anbetet.', kind: 'chips', eyebrow: 'Sprachlich', art: 'heart',
    head: 'Wem sich das Herz zuwendet',
    chips: ['Liebe', 'Ehrfurcht', 'Zuflucht', 'Furcht'] },

  // --- 4. Fachsprache, Ibn Abbas  01:02,84 - 01:27,98 ---
  { t: 62.84, e: 71.0,
    full: 'In der islamischen Fachsprache bezeichnet Ilah jedoch Allah azza wa-jall – den Einzigen, dem Anbetung und uneingeschränkter Gehorsam zustehen.', kind: 'points', eyebrow: 'Fachsprachlich',
    head: 'Ilah ist Allah azza wa-jall', art: 'rings',
    points: ['Anbetung', 'Uneingeschränkter Gehorsam'] },

  { t: 71.0, e: 78.4,
    full: 'Der Imam der Quran-Ausleger, Ibn Jarir at-Tabari, überliefert in seinem Tafsir vom Gefährten Abdullah ibn Abbas (radiyallahu anhuma), dass er die Bezeichnungen Ilah und Allah folgendermaßen erklärte:', kind: 'name', name: 'Abdullah ibn Abbas',
    sub: 'überliefert bei Ibn Jarir at-Tabari', art: 'folio' },

  { t: 78.4, e: 87.98,
    full: '„Allah ist der Einzige, der gegenüber der gesamten Schöpfung das Recht auf Uluhiyyah – das Recht, Ilah zu sein – und auf Ubudiyyah – das Recht, angebetet zu werden – besitzt.“', kind: 'table', head: 'Allein Allah zu',
    rows: [['Uluhiyyah', 'Ilah zu sein'], ['Ubudiyyah', 'angebetet zu werden']],
    note: 'gegenüber der gesamten Schöpfung' },

  // --- 5. at-Tahawi  01:28,50 - 01:45,28 ---
  { t: 88.5, e: 93.6,
    full: 'Die klassischen Imame der Aqidah haben diese Bedeutung folgendermaßen erklärt:', kind: 'name', eyebrow: 'Die Imame der Aqidah',
    name: 'Wie sie es erklären', art: 'star' },

  { t: 93.6, e: 105.28,
    full: 'Imam Abu Ja’far at-Tahawi sagt: „Über den Tawhid Allahs sagen wir – überzeugt und durch Allahs Rechtleitung –: Allah ist einzig und hat keinen Teilhaber. Nichts ist Ihm gleich, nichts kann Ihn unfähig machen und es gibt keinen wahren Ilah außer Ihm.“', kind: 'points', head: 'Einzig, ohne Teilhaber',
    points: ['Nichts ist Ihm gleich', 'Nichts kann Ihn unfähig machen', 'Kein Ilah außer Ihm'],
    cite: 'Imam Abu Ja’far at-Tahawi' },

  // --- 6. Ibn Abi l-Izz  01:45,28 - 02:05,18 ---
  { t: 105.28, e: 116.0,
    full: 'Ibn Abi l-Izz al-Hanafi erklärt: „Der Ilah ist der Ma’luh und Ma’bud: der Angebetete, dem sich die Herzen mit Liebe, Verherrlichung, Ehrfurcht, Ehrerweisung, Furcht und Hoffnung zuwenden.“', kind: 'chips', head: 'Womit die Herzen sich zuwenden',
    chips: ['Liebe', 'Verherrlichung', 'Ehrfurcht', 'Ehrerweisung', 'Furcht', 'Hoffnung'],
    cite: 'Ibn Abi l-Izz al-Hanafi' },

  { t: 116.0, e: 125.18,
    full: '„Diese Stellung steht aufgrund der vollkommenen Vollkommenheit Seiner Eigenschaften und Handlungen ausschließlich Allah zu.“', kind: 'big', text: 'Diese Stellung steht ausschließlich Allah zu.',
    cite: 'Ibn Abi l-Izz al-Hanafi' },

  // --- 7. al-Izz ibn Abd as-Salam  02:05,18 - 02:35,62 ---
  { t: 125.18, e: 136.4,
    full: 'Al-Izz ibn Abd as-Salam sagt: „Der uneingeschränkte Gehorsam gebührt allein Allah, dem Erhabenen, weil nur Ihm die Gaben des Erschaffens, des Erhaltens, der Versorgung sowie der Gewährung des religiösen und weltlichen Wohls gehören.“', kind: 'points', head: 'Warum allein Ihm', art: 'rings',
    points: ['Erschaffen', 'Erhalten', 'Versorgen', 'Religiöses und weltliches Wohl'],
    cite: 'Al-Izz ibn Abd as-Salam' },

  { t: 136.4, e: 147.2,
    full: '„Es gibt nichts Gutes, das nicht Er hervorbringt, und keinen Schaden, den nicht Er beseitigt. Deshalb verdient es niemand außer Ihm, gepriesen sei Er, um seiner selbst willen uneingeschränkt befolgt zu werden.“', kind: 'balance',
    left: 'Kein Gutes, das nicht Er hervorbringt',
    right: 'Kein Schaden, den nicht Er beseitigt',
    cite: 'Al-Izz ibn Abd as-Salam' },

  { t: 147.2, e: 155.62,
    full: '„Die Ibadah ist die höchste Form der Unterwerfung und Erniedrigung. Diese gebührt nur Demjenigen, der die vollkommene Güte und grenzenlose Gunst besitzt.“', kind: 'big', text: 'Ibadah ist die höchste Form der Unterwerfung.',
    cite: 'Al-Izz ibn Abd as-Salam' },

  // --- 8. Ibn Taymiyya  02:36,12 - 02:49,32 ---
  { t: 156.12, e: 162.4,
    full: 'Scheich al-Islam Ibn Taymiyya sagt: „Der Ilah ist der Ma’bud, dem Anbetung und Gehorsam entgegengebracht werden.“', kind: 'equation', left: 'Der Ilah', right: 'der Ma’bud',
    sub: 'Anbetung und Gehorsam', cite: 'Scheich al-Islam Ibn Taymiyya' },

  { t: 162.4, e: 169.32,
    full: '„Die Herzen lieben Ihn, unterwerfen sich vor Ihm, fürchten Ihn, hoffen auf Ihn, suchen in der Not ausschließlich bei Ihm Zuflucht und vertrauen auf Ihn.“', kind: 'chips', head: 'Was die Herzen tun', art: 'heart',
    chips: ['lieben', 'sich unterwerfen', 'fürchten', 'hoffen', 'Zuflucht suchen', 'vertrauen'],
    cite: 'Scheich al-Islam Ibn Taymiyya' },

  // --- 9. Ibn al-Qayyim  02:49,44 - 02:56,82 ---
  { t: 169.44, e: 176.82,
    full: 'Ibn al-Qayyim sagt: „Der Ilah ist der Ma’bud, dem sich die Herzen mit Liebe, Verherrlichung, vollkommener Unterwerfung, Furcht und Hoffnung zuwenden.“', kind: 'big', text: 'Der Ma’bud, dem sich die Herzen zuwenden.',
    cite: 'Ibn al-Qayyim' },

  // --- 10. Ibn Rajab  02:56,82 - 03:16,96 ---
  { t: 176.82, e: 187.4,
    full: 'Hafidh Ibn Rajab al-Hanbali sagt: „Der Ilah ist derjenige, dem aufgrund seiner Ehrfurcht, Erhabenheit und Liebe sowie aus Furcht und Hoffnung uneingeschränkter Gehorsam entgegengebracht und nicht widersprochen wird.“', kind: 'big', text: 'Gehorsam, dem nicht widersprochen wird.',
    sub: 'aus Ehrfurcht, Erhabenheit, Liebe, Furcht und Hoffnung',
    cite: 'Hafidh Ibn Rajab al-Hanbali' },

  { t: 187.4, e: 196.96,
    full: '„Diese Eigenschaft gehört ausschließlich Allah. Wer einem Geschöpf etwas davon zukommen lässt, beeinträchtigt damit die Aufrichtigkeit des Glaubensbekenntnisses des Tawhid.“', kind: 'warn', art: 'crack',
    text: 'Wer einem Geschöpf davon etwas gibt, beeinträchtigt den Tawhid.',
    cite: 'Hafidh Ibn Rajab al-Hanbali' },

  // --- 11. Im Quran  03:17,54 - 03:39,26 ---
  { t: 197.54, e: 205.4,
    full: 'Der Quran zeigt uns, dass der Begriff Ilah nicht allein auf das Erschaffen beschränkt ist, sondern unmittelbar mit Anbetung, Gehorsam und der Bindung des Herzens zusammenhängt:', kind: 'points', eyebrow: 'Im Quran',
    head: 'Nicht nur das Erschaffen', art: 'star',
    points: ['Anbetung', 'Gehorsam', 'Bindung des Herzens'] },

  { t: 205.4, e: 212.6,
    full: '„Das ist Allah, euer Herr! Es gibt keinen Ilah außer Ihm. Er ist der Schöpfer aller Dinge. So betet allein Ihn an!“ (al-An’am 102)', kind: 'verse', text: 'Es gibt keinen Ilah außer Ihm. So betet allein Ihn an!',
    cite: 'Surah al-An’am, Vers 102' },

  { t: 212.6, e: 219.26,
    full: '„Hast du denjenigen gesehen, der seine eigene Neigung – die Begierden seiner Seele – zu seinem Ilah genommen hat?“ (al-Furqan 43)', kind: 'verse', text: 'Der seine eigene Neigung zu seinem Ilah genommen hat.',
    cite: 'Surah al-Furqan, Vers 43' },

  // --- 12. Adiyy ibn Hatim  03:39,72 - 04:42,14 ---
  { t: 219.72, e: 228.4,
    full: 'Bedeutet es also nur, sich vor Statuen niederzuwerfen, wenn man etwas zu einem „Ilah oder Rabb“ nimmt? Nein!', kind: 'ask', art: 'reject',
    question: 'Nur vor Statuen niederwerfen?', answer: 'Nein.' },

  { t: 228.4, e: 238.0,
    full: 'Das lernen wir unmittelbar aus der bekannten Begebenheit zwischen unserem Propheten ﷺ und seinem Gefährten Adiyy ibn Hatim. Adiyy ibn Hatim (radiyallahu anhu) war Christ, bevor er den Islam annahm.', kind: 'name', eyebrow: 'Die Begebenheit', name: 'Adiyy ibn Hatim',
    sub: 'War Christ, bevor er den Islam annahm.' },

  { t: 238.0, e: 248.0,
    full: 'Er hörte, wie der Gesandte Allahs ﷺ folgenden Vers rezitierte: „Sie nahmen ihre Rabbiner und Mönche anstelle Allahs zu Herren …“', kind: 'verse',
    text: 'Sie nahmen ihre Rabbiner und Mönche anstelle Allahs zu Herren.',
    cite: 'Rezitierter Vers' },

  { t: 248.0, e: 258.0,
    full: 'Daraufhin sagte Adiyy (radiyallahu anhu): „O Gesandter Allahs! Wir haben sie doch nicht angebetet – das heißt, wir haben nicht zu ihnen gebetet und uns nicht vor ihnen niedergeworfen!“', kind: 'says', who: 'Adiyy',
    text: 'Wir haben sie doch nicht angebetet.' },

  { t: 258.0, e: 269.0,
    full: 'Daraufhin erklärte ihm der Gesandte Allahs ﷺ: „Erklären sie nicht das für verboten, was Allah erlaubt hat, woraufhin auch ihr es für verboten erklärt? Und erklären sie nicht das für erlaubt, was Allah verboten hat, woraufhin auch ihr es für erlaubt haltet?“', kind: 'says', who: 'Der Gesandte Allahs ﷺ', accent: true,
    text: 'Erklärten sie nicht Erlaubtes für verboten — und ihr seid gefolgt?' },

  { t: 269.0, e: 274.4,
    full: 'Adiyy sagte: „Doch.“', kind: 'beat', text: 'Adiyy: „Doch.“' },

  { t: 274.4, e: 282.14,
    full: 'Daraufhin sagte der Prophet ﷺ: „Genau das ist eure Anbetung ihnen gegenüber – und damit habt ihr sie zu Ilah und Rabb genommen.“', kind: 'says', who: 'Der Prophet ﷺ', accent: true,
    text: 'Genau das ist eure Anbetung ihnen gegenüber.' },

  // --- 13. Zusammenfassung  04:42,98 - 04:58,64 ---
  { t: 282.98, e: 290.6,
    full: 'Zusammengefasst: Ilah bedeutet nicht lediglich eine „erschaffende Macht“.', kind: 'big', eyebrow: 'Zusammengefasst',
    text: 'Ilah ist nicht bloß eine erschaffende Macht.' },

  { t: 290.6, e: 298.64,
    full: 'Ilah ist der Ma’bud, der geliebt und gefürchtet wird, bei dem man Zuflucht sucht, dessen Gesetz und dessen Bestimmungen über Erlaubtes und Verbotenes man sich unterwirft und dem allein sämtliche Formen der Anbetung dargebracht werden.', kind: 'points', head: 'Ilah ist der Ma’bud',
    points: ['geliebt und gefürchtet', 'bei dem man Zuflucht sucht',
             'dessen Gesetz man sich unterwirft', 'dem alle Anbetung gilt'] },

  // --- 14. La ilaha illa Allah  04:58,76 - 05:28,24 ---
  { t: 298.76, e: 311.4,
    full: 'Deshalb bedeutet La ilaha illa Allah: alle falschen Gottheiten und Autoritäten aus dem Herzen und dem Leben herauszureißen; jeden zurückzuweisen, der für sich selbst das Recht der Gesetzgebung beansprucht, und sich von ihm loszusagen; und sich von jedem loszusagen, der sagt:', kind: 'points', eyebrow: 'La ilaha illa Allah',
    head: 'Was es bedeutet', art: 'pen',
    points: ['Falsche Gottheiten aus dem Herzen reißen',
             'Jede Gesetzgebung neben Allah zurückweisen',
             'Ibadah allein Allah widmen'] },

  { t: 311.4, e: 321.4,
    full: '„Wenn Allah Gesetze erlässt, dann erlassen auch wir in den Gebieten, über die wir verfügen, Gesetze. Wir regieren nach diesen Gesetzen und legen anhand dieser Gesetze Strafen und Verbote fest.“', kind: 'warn', art: 'reject',
    text: 'Wenn Allah Gesetze erlässt, erlassen auch wir Gesetze.',
    cite: 'Wer so spricht — davon sagt man sich los' },

  { t: 321.4, e: 328.24,
    full: 'Es bedeutet, die Ibadah und den uneingeschränkten Gehorsam ausschließlich Allah azza wa-jall zu widmen.', kind: 'closing', ar: 'لا إله إلا الله',
    sub: 'Ibadah und Gehorsam ausschließlich für Allah.' },
];
