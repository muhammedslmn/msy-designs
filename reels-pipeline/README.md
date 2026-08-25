# reels-pipeline

Bir ses kaydini 9:16 (1080x1920) dikey videoya ceviren pipeline.
Sahneler tarayicida cizilir, ffmpeg birlestirir, altyazi videoya gomulur.

## Tasarim kurallari

- **Yuz yok.** Portre, surat, cinsiyet belirten figur hicbir sahnede gecmez.
  Insanlar sadece yuzsuz notr silueteler olarak, cogu sahne ise nesne ve tablo.
- **Sade Latin harfleri.** Ekrandaki her yazi duz Latin + Turkce'nin kendi
  harfleriyle (g s i I o u c) sinirli. Aksanli harfler (a-acute, sapkali i,
  ae) ve suslu noktalama (uzun tire, ucnokta, egri tirnak) `src/lint-text.mjs`
  tarafindan reddedilir; render bu yuzden durur.
- **Iki gorsel dil (skin).** `quiet` sessiz ve premium: neredeyse siyah zemin,
  kemik rengi yazi, tek kizil vurgu, kutu yok, sadece sac teli cizgiler.
  `bold` daha yuksek sesli: krem zemin, kalin konturlu duz karikatur.

## Kurulum

```bash
apt-get install -y ffmpeg      # ffmpeg + libass
npm install                    # playwright + fontlar
node src/make-fonts.mjs        # fontlari CSS'e goc
```

Chromium `/opt/pw-browsers/chromium` uzerinden kullanilir (`CHROME_PATH`).

## Akis

```
ses kaydi + transkript
        |
        +-- node src/render.mjs <proje.json> <klasor> <skin>
        |      her sahne icin giris animasyonu kareleri + oturmus kare
        |
        +-- python3 bin/subs.py <transkript.json> <cikti.ass> <skin>
        |      kelime kelime kinetik altyazi
        |
        +-- python3 bin/build.py <proje.json> <skin>
               ffmpeg: hareket + gecis + altyazi + ses  ->  build/*.mp4
```

Demoyu bastan uretmek icin:

```bash
python3 bin/tts-demo.py content/demo.script.json
node    src/render.mjs  build/project.json build/frames quiet
python3 bin/subs.py     build/transcript.json build/subs.ass quiet
python3 bin/build.py    build/project.json quiet
```

## Sahne tipleri

| tip     | ne ise yarar                        | ana alanlar                        |
|---------|-------------------------------------|------------------------------------|
| `title` | acilis / kapanis karti              | `kicker`, `headline`, `sub`, `art` |
| `stat`  | tek buyuk rakam                     | `value`, `cap`                     |
| `table` | tabella: karsilastirma, fiyat, oran | `title`, `head`, `rows`, `note`    |
| `steps` | numarali adimlar                    | `headline`, `items`                |
| `vs`    | yap / yapma, once / sonra           | `headline`, `left`, `right`        |
| `art`   | buyuk cizim + tek cumle             | `headline`, `art`, `sub`           |
| `quote` | vurgulu cumle                       | `text`, `by`                       |

Metin icinde `*kelime*` vurgu (quiet'te italik + kizil alti cizgi),
`_kelime_` kizil renk verir. Tablo hucrelerinde `"%64|num"` yazimi hizalama
ve renk secer (`num`, `good`, `bad`, `dim`). `bg: "invert"` sahneyi ters cevirir.

Cizimler `src/art.mjs` icinde: `question`, `chartUp`, `chartDown`, `money`,
`clock`, `warning`, `document`, `phone`, `scale`, `gears`, `crowd`, `flag`,
`search`, `bulb`. Ayni cizim seti iki skin'de de calisir; dolgular skin'den gelir.

## Nasil calisiyor

- **Animasyon.** Sahneler CSS keyframe ile animasyonlu; renderer sayfayi
  durdurup `animation.currentTime` ile kare kare ileri sarar, boylece ayni
  proje her calistirmada ayni kareleri verir. Cizgiler `getTotalLength` ile
  olculup `stroke-dashoffset` uzerinden kendini cizer.
- **Uzun kuyruk.** Her sahnenin ilk ~1.7 saniyesi kare kare cizilir; geri
  kalani oturmus kare uzerinde ffmpeg'in yavas kaydirmasiyla gecer.
- **Altyazi.** Kelime sureleri harf sayisina gore paylastirilir; her kelime
  kendi ASS olayini alir, konusulan kelime tam parlaklikta, komsulari kisik.
- **Tasma.** Uzun Turkce satirlar icin `render.mjs` sahne tasarsa puntoyu
  kademeli kucultur.

## Notlar

- `bin/tts-demo.py` sadece demo icindir (espeak-ng, robotik ses).
- Bu ortamda ag politikasi Hugging Face'i kapattigi icin otomatik konusma
  tanima (Whisper) modeli indirilemiyor; transkript disaridan verilmeli.
