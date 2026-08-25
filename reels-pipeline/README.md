# reels-pipeline

Bir ses kaydını **9:16 (1080×1920) Instagram Reels videosuna** çeviren pipeline.
Görseller karikatür tarzı vektör çizimler ve tablolar; altyazılar videoya gömülü.

**Kural:** hiçbir sahnede yüz, portre veya cinsiyet belirten figür yok. İnsanlar
sadece yüzsüz, nötr silüetler olarak geçiyor; sahnelerin çoğu nesne ve tablo.

## Kurulum (bu sandbox'ta hazır)

```bash
apt-get install -y ffmpeg          # ffmpeg + libass
npm install                        # playwright + fontlar
node src/make-fonts.mjs            # fontları CSS'e göm
```

Chromium `/opt/pw-browsers/chromium` üzerinden kullanılıyor
(`CHROME_PATH` ile değiştirilebilir).

## Akış

```
ses kaydı  ─┐
            ├─► content/<proje>.script.json  (metin + sahne planı)
transkript ─┘
                    │
                    ├─ node src/render.mjs  →  build/frames/*.png   (Chromium ile sahneler)
                    ├─ python3 bin/subs.py  →  build/subs.ass       (altyazılar)
                    └─ python3 bin/build.py →  build/reel.mp4       (ffmpeg: hareket + geçiş + ses)
```

Demoyu baştan üretmek için:

```bash
python3 bin/tts-demo.py content/demo.script.json   # örnek seslendirme + zamanlama
node   src/render.mjs   build/project.json build/frames
python3 bin/subs.py     build/transcript.json build/subs.ass
python3 bin/build.py    build/project.json
```

## Sahne tipleri

| tip     | ne işe yarar                              | ana alanlar                          |
|---------|-------------------------------------------|--------------------------------------|
| `title` | açılış / kapanış kartı                    | `kicker`, `headline`, `sub`, `art`   |
| `stat`  | tek büyük rakam                           | `value`, `cap`                       |
| `table` | **tabella** — karşılaştırma, fiyat, liste | `title`, `head`, `rows`, `note`      |
| `steps` | numaralı adımlar                          | `headline`, `items`                  |
| `vs`    | yap / yapma, önce / sonra                 | `headline`, `left`, `right`          |
| `art`   | büyük karikatür + tek cümle               | `headline`, `art`, `sub`             |
| `quote` | vurgulu cümle                             | `text`, `by`                         |

Metin içinde `*kelime*` sarı marker, `_kelime_` turuncu renk verir.
Tablo hücrelerinde `"%64|num good"` gibi `metin|sınıf` yazımı hizalama ve renk
seçer (`num`, `good`, `bad`). `bg` alanı `dark` veya `accent` olabilir.

Çizimler `src/art.mjs` içinde: `question`, `chartUp`, `chartDown`, `money`,
`clock`, `warning`, `document`, `phone`, `scale`, `gears`, `crowd`, `flag`,
`search`, `bulb`.

## Notlar

- Uzun Türkçe satırlar için `render.mjs` sahne taşarsa punto'yu otomatik küçültür.
- Zamanlama transkriptten gelir; sahne `start`/`end` vermezse süre eşit bölünür.
- `bin/tts-demo.py` sadece demo içindir (espeak-ng, robotik ses). Gerçek videoda
  kullanıcının kendi kaydı kullanılır.
- Bu sandbox'ta ağ politikası Hugging Face'i kapattığı için otomatik konuşma
  tanıma (Whisper) modeli indirilemiyor — transkript dışarıdan verilmeli.
