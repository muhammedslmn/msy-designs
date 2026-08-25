/* Scene list for the Ilah deck.

   Every word of `text`, `quote` and `cite` is the author's own transcript,
   verbatim. Scenes only ever SPLIT that text at sentence boundaries - the
   14 timed sections the author supplied are subdivided so no single scene
   holds more than a breath's worth of reading, and each split inherits its
   share of that section's timecode.

   The only omissions are the author's source markers ([fu-berlin +1],
   [islamimherzen]), which are footnotes on the script rather than words of
   the lecture.                                                            */

export const SCENES = [
  // 1. Einleitung  00:00,00 - 00:17,62
  { t: 0, e: 4.6, kind: 'opening', sec: 1,
    kicker: 'Tawhid',
    title: 'Was bedeutet „Ilah“?',
    ar: 'الإله' },

  { t: 4.6, e: 12.4, kind: 'statement', sec: 1, art: 'book',
    text: 'Nachdem wir uns in den vergangenen Videos mit dem Tawhid und der Bedeutung des Glaubensbekenntnisses La ilaha illa Allah beschäftigt haben, wollen wir nun einen Begriff näher betrachten, der im Zentrum dieser gewaltigen Aussage steht: Ilah (الإله).' },

  { t: 12.4, e: 17.62, kind: 'ask', sec: 1,
    text: 'Was bedeutet dieses Wort eigentlich – sprachlich und in der islamischen Fachsprache?' },

  // 2. Ibn Faris  00:18,12 - 00:40,56
  { t: 18.12, e: 24.6, kind: 'statement', sec: 2, kicker: 'Die Wörterbücher',
    text: 'Die Gelehrten der arabischen Sprache haben die Herkunft und Bedeutung dieses Wortes in den klassischen Wörterbüchern sehr deutlich erklärt:' },

  { t: 24.6, e: 34.0, kind: 'root', sec: 2, cite: 'Ibn Faris',
    ar: 'أ ل ه',
    text: 'Der große Sprachgelehrte Ibn Faris erklärt, dass die aus den Buchstaben Hamza, Lam und Ha (أ-ل-ه) bestehende Wortwurzel eine grundlegende Bedeutung trägt: das Dienen und Anbeten (at-Ta’abbud).' },

  { t: 34.0, e: 40.56, kind: 'quote', sec: 2, cite: 'Ibn Faris',
    quote: 'Ilah wird so bezeichnet, weil er der Ma’bud, also derjenige ist, dem Anbetung dargebracht wird.' },

  // 3. al-Jawhari, Ibn Manzur  00:41,04 - 01:02,64
  { t: 41.04, e: 51.6, kind: 'statement', sec: 3, cite: 'al-Jawhari · Ibn Manzur',
    ar_inline: 'مألوه',
    text: 'Imam al-Jawhari und Ibn Manzur erklären, dass Ilah die Bedeutung von Ma’luh (مألوه) trägt. Es bedeutet also: al-Ma’luh beziehungsweise al-Ma’bud – derjenige, der angebetet wird und vor dem man sich unterwirft.' },

  { t: 51.6, e: 62.64, kind: 'statement', sec: 3, art: 'heart', kicker: 'Sprachlich',
    text: 'Zusammengefasst bedeutet Ilah sprachlich: das Wesen, dem sich das Herz mit höchster Liebe, Ehrfurcht, Zufluchtssuche und Furcht zuwendet und das es anbetet.' },

  // 4. Fachsprache, Ibn Abbas  01:02,84 - 01:27,98
  { t: 62.84, e: 71.0, kind: 'statement', sec: 4, art: 'converge', kicker: 'Fachsprache',
    text: 'In der islamischen Fachsprache bezeichnet Ilah jedoch Allah azza wa-jall – den Einzigen, dem Anbetung und uneingeschränkter Gehorsam zustehen.' },

  { t: 71.0, e: 78.4, kind: 'statement', sec: 4,
    text: 'Der Imam der Quran-Ausleger, Ibn Jarir at-Tabari, überliefert in seinem Tafsir vom Gefährten Abdullah ibn Abbas (radiyallahu anhuma), dass er die Bezeichnungen Ilah und Allah folgendermaßen erklärte:' },

  { t: 78.4, e: 87.98, kind: 'quote', sec: 4, cite: 'Abdullah ibn Abbas',
    quote: 'Allah ist der Einzige, der gegenüber der gesamten Schöpfung das Recht auf <b>Uluhiyyah</b> – das Recht, Ilah zu sein – und auf <b>Ubudiyyah</b> – das Recht, angebetet zu werden – besitzt.' },

  // 5. at-Tahawi  01:28,50 - 01:45,28
  { t: 88.5, e: 93.6, kind: 'statement', sec: 5, kicker: 'Die Imame der Aqidah',
    text: 'Die klassischen Imame der Aqidah haben diese Bedeutung folgendermaßen erklärt:' },

  { t: 93.6, e: 105.28, kind: 'quote', sec: 5, cite: 'Imam Abu Ja’far at-Tahawi',
    quote: 'Über den Tawhid Allahs sagen wir – überzeugt und durch Allahs Rechtleitung –: Allah ist einzig und hat keinen Teilhaber. Nichts ist Ihm gleich, nichts kann Ihn unfähig machen und es gibt keinen wahren Ilah außer Ihm.' },

  // 6. Ibn Abi l-Izz al-Hanafi  01:45,28 - 02:05,18
  { t: 105.28, e: 116.0, kind: 'quote', sec: 6, cite: 'Ibn Abi l-Izz al-Hanafi',
    lead: 'Ibn Abi l-Izz al-Hanafi erklärt in seinem Kommentar zu Imam at-Tahawis Werk:',
    quote: 'Der Ilah ist der Ma’luh und Ma’bud: der Angebetete, dem sich die Herzen mit Liebe, Verherrlichung, Ehrfurcht, Ehrerweisung, Furcht und Hoffnung zuwenden.' },

  { t: 116.0, e: 125.18, kind: 'quote', sec: 6, cite: 'Ibn Abi l-Izz al-Hanafi',
    quote: 'Diese Stellung steht aufgrund der vollkommenen Vollkommenheit Seiner Eigenschaften und Handlungen ausschließlich Allah zu.' },

  // 7. al-Izz ibn Abd as-Salam  02:05,18 - 02:35,62
  { t: 125.18, e: 136.4, kind: 'quote', sec: 7, cite: 'Al-Izz ibn Abd as-Salam',
    quote: 'Der uneingeschränkte Gehorsam gebührt allein Allah, dem Erhabenen, weil nur Ihm die Gaben des Erschaffens, des Erhaltens, der Versorgung sowie der Gewährung des religiösen und weltlichen Wohls gehören.' },

  { t: 136.4, e: 147.2, kind: 'quote', sec: 7, cite: 'Al-Izz ibn Abd as-Salam',
    quote: 'Es gibt nichts Gutes, das nicht Er hervorbringt, und keinen Schaden, den nicht Er beseitigt. Deshalb verdient es niemand außer Ihm, gepriesen sei Er, um seiner selbst willen uneingeschränkt befolgt zu werden.' },

  { t: 147.2, e: 155.62, kind: 'quote', sec: 7, cite: 'Al-Izz ibn Abd as-Salam',
    quote: 'Die Ibadah ist die höchste Form der Unterwerfung und Erniedrigung. Diese gebührt nur Demjenigen, der die vollkommene Güte und grenzenlose Gunst besitzt.' },

  // 8. Ibn Taymiyya  02:36,12 - 02:49,32
  { t: 156.12, e: 162.4, kind: 'quote', sec: 8, cite: 'Scheich al-Islam Ibn Taymiyya',
    quote: 'Der Ilah ist der Ma’bud, dem Anbetung und Gehorsam entgegengebracht werden.' },

  { t: 162.4, e: 169.32, kind: 'quote', sec: 8, cite: 'Scheich al-Islam Ibn Taymiyya',
    quote: 'Die Herzen lieben Ihn, unterwerfen sich vor Ihm, fürchten Ihn, hoffen auf Ihn, suchen in der Not ausschließlich bei Ihm Zuflucht und vertrauen auf Ihn.' },

  // 9. Ibn al-Qayyim  02:49,44 - 02:56,82
  { t: 169.44, e: 176.82, kind: 'quote', sec: 9, cite: 'Ibn al-Qayyim',
    quote: 'Der Ilah ist der Ma’bud, dem sich die Herzen mit Liebe, Verherrlichung, vollkommener Unterwerfung, Furcht und Hoffnung zuwenden.' },

  // 10. Ibn Rajab  02:56,82 - 03:16,96
  { t: 176.82, e: 187.4, kind: 'quote', sec: 10, cite: 'Hafidh Ibn Rajab al-Hanbali',
    quote: 'Der Ilah ist derjenige, dem aufgrund seiner Ehrfurcht, Erhabenheit und Liebe sowie aus Furcht und Hoffnung uneingeschränkter Gehorsam entgegengebracht und nicht widersprochen wird.' },

  { t: 187.4, e: 196.96, kind: 'quote', sec: 10, cite: 'Hafidh Ibn Rajab al-Hanbali',
    quote: 'Diese Eigenschaft gehört ausschließlich Allah. Wer einem Geschöpf etwas davon zukommen lässt, beeinträchtigt damit die Aufrichtigkeit des Glaubensbekenntnisses des Tawhid.' },

  // 11. Im Quran  03:17,54 - 03:39,26
  { t: 197.54, e: 205.4, kind: 'statement', sec: 11, kicker: 'Im Quran',
    text: 'Der Quran zeigt uns, dass der Begriff Ilah nicht allein auf das Erschaffen beschränkt ist, sondern unmittelbar mit Anbetung, Gehorsam und der Bindung des Herzens zusammenhängt:' },

  { t: 205.4, e: 212.6, kind: 'verse', sec: 11, cite: 'Surah al-An’am, Vers 102',
    quote: 'Das ist Allah, euer Herr! Es gibt keinen Ilah außer Ihm. Er ist der Schöpfer aller Dinge. So betet allein Ihn an!' },

  { t: 212.6, e: 219.26, kind: 'verse', sec: 11, cite: 'Surah al-Furqan, Vers 43',
    quote: 'Hast du denjenigen gesehen, der seine eigene Neigung – die Begierden seiner Seele – zu seinem Ilah genommen hat?' },

  // 12. Adiyy ibn Hatim  03:39,72 - 04:42,14
  { t: 219.72, e: 228.4, kind: 'ask', sec: 12, art: 'reject',
    text: 'Bedeutet es also nur, sich vor Statuen niederzuwerfen, wenn man etwas zu einem „Ilah oder Rabb“ nimmt? Nein!' },

  { t: 228.4, e: 236.6, kind: 'statement', sec: 12, kicker: 'Adiyy ibn Hatim',
    text: 'Das lernen wir unmittelbar aus der bekannten Begebenheit zwischen unserem Propheten ﷺ und seinem Gefährten Adiyy ibn Hatim.' },

  { t: 236.6, e: 245.4, kind: 'statement', sec: 12,
    text: 'Adiyy ibn Hatim (radiyallahu anhu) war Christ, bevor er den Islam annahm. Er hörte, wie der Gesandte Allahs ﷺ folgenden Vers rezitierte:' },

  { t: 245.4, e: 252.4, kind: 'verse', sec: 12, cite: 'Rezitierter Vers',
    quote: 'Sie nahmen ihre Rabbiner und Mönche anstelle Allahs zu Herren …' },

  { t: 252.4, e: 261.4, kind: 'dialogue', sec: 12, who: 'Adiyy',
    quote: 'O Gesandter Allahs! Wir haben sie doch nicht angebetet – das heißt, wir haben nicht zu ihnen gebetet und uns nicht vor ihnen niedergeworfen!' },

  { t: 261.4, e: 266.4, kind: 'statement', sec: 12,
    text: 'Daraufhin erklärte ihm der Gesandte Allahs ﷺ mit folgenden Worten, was es in Wirklichkeit bedeutet, jemanden zu einem Ilah oder Rabb zu nehmen:' },

  { t: 266.4, e: 274.4, kind: 'dialogue', sec: 12, who: 'Der Gesandte Allahs ﷺ', accent: true,
    quote: 'Erklären sie nicht das für verboten, was Allah erlaubt hat, woraufhin auch ihr es für verboten erklärt? Und erklären sie nicht das für erlaubt, was Allah verboten hat, woraufhin auch ihr es für erlaubt haltet?' },

  { t: 274.4, e: 277.8, kind: 'beat', sec: 12,
    text: 'Adiyy sagte: „Doch.“' },

  { t: 277.8, e: 282.14, kind: 'dialogue', sec: 12, who: 'Der Prophet ﷺ', accent: true,
    quote: 'Genau das ist eure Anbetung ihnen gegenüber – und damit habt ihr sie zu Ilah und Rabb genommen.' },

  // 13. Zusammenfassung  04:42,98 - 04:58,64
  { t: 282.98, e: 298.64, kind: 'summary', sec: 13, kicker: 'Zusammengefasst',
    rows: [
      { label: 'Ilah bedeutet nicht', body: 'lediglich eine „erschaffende Macht“.' },
      { label: 'Ilah ist', body: 'der Ma’bud, der geliebt und gefürchtet wird, bei dem man Zuflucht sucht, dessen Gesetz und dessen Bestimmungen über Erlaubtes und Verbotenes man sich unterwirft und dem allein sämtliche Formen der Anbetung dargebracht werden.', affirm: true },
    ] },

  // 14. La ilaha illa Allah  04:58,76 - 05:28,24
  { t: 298.76, e: 311.4, kind: 'statement', sec: 14, kicker: 'La ilaha illa Allah', art: 'pen',
    text: 'Deshalb bedeutet La ilaha illa Allah: alle falschen Gottheiten und Autoritäten aus dem Herzen und dem Leben herauszureißen; jeden zurückzuweisen, der für sich selbst das Recht der Gesetzgebung beansprucht, und sich von ihm loszusagen; und sich von jedem loszusagen, der sagt:' },

  { t: 311.4, e: 321.4, kind: 'dialogue', sec: 14, who: 'Wer sagt',
    quote: 'Wenn Allah Gesetze erlässt, dann erlassen auch wir in den Gebieten, über die wir verfügen, Gesetze. Wir regieren nach diesen Gesetzen und legen anhand dieser Gesetze Strafen und Verbote fest.' },

  { t: 321.4, e: 328.24, kind: 'closing', sec: 14,
    ar: 'لا إله إلا الله',
    text: 'Es bedeutet, die Ibadah und den uneingeschränkten Gehorsam ausschließlich Allah azza wa-jall zu widmen.' },
];
