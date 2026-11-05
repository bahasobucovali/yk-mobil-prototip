# Kullanım Kılavuzu

Bu belge, prototipi **kullanacak / demo yapacak** kişiler içindir.
Kod üzerinde çalışacaksan (insan ya da AI agent) önce kökteki [AGENTS.md](../AGENTS.md) dosyasını oku.

## Yeni özellik geliştirme — agent ile çalışma

Prototipe yeni özellik, ekran veya akış eklemek için repo içinde Claude Code (agent) çalıştırılır.
Agent'ı beslemenin yolları:

- **Sözlü tarif:** Eklenecek özelliği ve akışı düz cümlelerle anlat; agent gerisini
  [AGENTS.md](../AGENTS.md) kurallarına göre yapar.
- **Başka AI'larla hazırlık:** ChatGPT, Gemini gibi araçlarla UX/UI görselleri (ekran taslağı,
  widget konsepti) üretip agent'a verebilirsin. Görseli sohbete yapıştırman yeterli.
  Aynı şekilde bir özelliğin akışını (adımlar, ekranlar, durumlar) başka bir AI ile çalışıp
  çıkan metni agent'a girdi olarak verebilirsin.
- **Gerçek uygulama ekran görüntüsü:** Görsel birebirlik için en güçlü referans budur;
  gerçek Yapı Kredi Mobil ekran görüntüsü at, agent ona göre yapar.

Bilinmesi gerekenler:

- AI üretimi görseller ve akış önerileri **fikir dokümanıdır, şartname değildir**: agent bunları
  doğru kabul edip birebir uygulamaz; repo kuralları ve gerçek Yapı Kredi temasıyla (renk, font,
  bileşen dili) karşılaştırıp değerlendirir, uyumsuz bulduğu kısımları söyleyip daha iyisini önerir.
- Uygulamada kullanılacak görseller (ürün, logo vb.) `app/assets/` içine girer;
  saklamaya değer tasarım referansları `docs/referans/` içine girer; tek seferlik konsept
  görsellerini repoya eklemeye gerek yok, sohbete yapıştırmak yeterli.
- Gerçek ekran görüntüsü paylaşırken içinde kişisel bilgiler (ad, bakiye, IBAN, kart no vb.)
  kalabilir; mümkünse gizle. Kalsa bile agent bu bilgileri prototipe almaz, mock verilerle
  değiştirir ve başka yerde kullanmaz.
- Yeni bölüm eklenince agent bu dosyadaki hash tablosunu da günceller; demo linkini oradan alabilirsin.

## Prototipi açma

| Yöntem | Nasıl |
|---|---|
| **Canlı link** | https://yk-mobil-prototip.github.io/yk-mobil-prototip/ |
| **Bilgisayarda lokal** | `app/baslat.command` dosyasına çift tıkla (ilk seferde: sağ tık → Aç) → http://localhost:8080 |
| **Telefonda** | `app/baslat.command` çalışırken, aynı Wi-Fi'daki telefondan terminalde yazan `http://<IP>:8080` adresini aç. Tam ekran için Safari'de Paylaş → Ana Ekrana Ekle |

> Derleme/kurulum yok: proje statik HTML/CSS/JS'dir, herhangi bir HTTP sunucusuyla açılır.

## Ana demo akışı (Alışveriş Asistanı)

1. Ana sayfa → üstteki **arama çubuğuna** dokun
2. **"Yapı Kredi Alışveriş Asistanı"** yaz → çıkan sonuca dokun
3. Chat'te öneri çipine bas (mesaj otomatik yazılıp gönderilir)
4. Asistan World kampanyalı/taksitli **Koçtaş** ürünlerini listeler (yatay kaydır)
5. Bir üründe **"World Pay ile Al"** → ödeme ekranı
6. **Worldcard ile öde** seç → **Öde** → **Yapı Kredi Mobil ile Onayla** (Face ID simülasyonu)
7. Başarı ekranı + Worldpuan kazanımı

Diğer uçtan uca akışlar: **Setur otonom senaryosu** (`#setur`), **Karekod ile Öde** (`#springboard`'dan başlar), **Birikim** (Yuvarla / Ekstreden / Maden), **Ödül Yolu**, **Harcama Bölüştür**, **Birlikte Kazan**, **Sky Limit** (taslak — menü → Krediler), **Toplu Borç Ödeme** (taslak — menü → Ödemeler).

Taslak özellikler ana sayfadaki **"Yapı Kredi Mobil'de Ara"** çubuğundan da açılır: arama ekranında **Önerilenler** altında "YENİ" etiketiyle görünürler; "sky", "limit", "borç", "toplu", "ekstre" gibi kelimelerle aranabilirler (Türkçe karakter yazmadan da eşleşir).

## Bölümlere doğrudan erişim (hash linkleri)

Her bölüm, akışı baştan tekrarlamadan kendi hash linkiyle doğrudan açılır ve gereken state hazır gelir.

İki şekilde erişilir:
- **Uygulama içinden:** soldaki menü → Bölümler
- **Bağlantıyla:** adresin sonuna aşağıdaki etiketlerden birini ekle
  (örnek: `https://yk-mobil-prototip.github.io/yk-mobil-prototip/#tracking`)

| Bölüm | Link |
|---|---|
| Ana ekran | `#home` |
| Koçtaş senaryosu — tamamlandı (dolu sohbet) | `#assistant` |
| Setur otonom senaryosu — tamamlandı | `#setur` |
| Asistan — boştan (animasyonlu) | `#chat` |
| Ödeme ekranı | `#payment` |
| Ödeme başarılı | `#success` |
| Sipariş takibi | `#tracking` |
| Widget Galerisi — tüm çeşitler (YK teması) | `#widgets` |
| Karekod ile Öde — telefon ana ekranı + YK widget'ı | `#springboard` |
| Karekod ile Öde — kamera/tarayıcı (otomatik okur) | `#qr-scan` |
| Karekod ile Öde — tutar + ödeme yöntemi | `#qr-pay` |
| Karekod ile Öde — ödeme başarılı | `#qr-success` |
| Yuvarla & Biriktir — başvuru | `#roundup` |
| Yuvarla & Biriktir — kumbara (grafik, hedef, duraklat/durdur) | `#roundup-jar` |
| Yuvarla & Biriktir — tüm hareketler | `#roundup-history` |
| Ekstreden Biriktir — başvuru | `#spendup` |
| Ekstreden Biriktir — yönet | `#spendup-jar` |
| Ekstreden Biriktir — tüm aktarımlar | `#spendup-history` |
| Maden Biriktir — başvuru | `#metal` |
| Maden Biriktir — yönet | `#metal-jar` |
| Maden Biriktir — tüm alımlar | `#metal-history` |
| Ödül Yolu — hub (Benim Dünyam) | `#fayda` |
| Ödül Yolu — yolculuk (level haritası) | `#fayda-journey` |
| Ödül Yolu — tam ekran ödül seçimi | `#fayda-reward` |
| Ödüllerim — kazanılmış/aktif ödüller | `#fayda-wallet` |
| Toplu Borç Ödeme (taslak) — ana ekran | `#toplu-borc` |
| Toplu Borç Ödeme — ekstre detayı | `#toplu-borc-ekstre` |
| Toplu Borç Ödeme — toplu ödeme (hesap seçimi) | `#toplu-borc-odeme` |
| Toplu Borç Ödeme — ödeme onayı | `#toplu-borc-onay` |
| Toplu Borç Ödeme — işlem sonucu | `#toplu-borc-sonuc` |
| Toplu Borç Ödeme — ödeme geçmişi | `#toplu-borc-gecmis` |
| Harcama Bölüştür — hub | `#split` |
| Harcama Bölüştür — harcama seç | `#split-pick` |
| Harcama Bölüştür — tutar girerek istek | `#split-amount` |
| Harcama Bölüştür — kişi seç | `#split-people` |
| Harcama Bölüştür — form | `#split-form` |
| Harcama Bölüştür — gelen isteği FAST ile öde | `#split-pay` |
| Birlikte Kazan — hub | `#reward-goal` |
| Birlikte Kazan — yeni hedef | `#reward-goal-new` |
| Birlikte Kazan — ilerleme | `#reward-goal-track` |
| Birlikte Kazan — kutlama | `#reward-goal-win` |
| Sky Limit (taslak) — ana ekran | `#sky-limit` |
| Sky Limit — limit dağılımı (ürünler arası aktarım) | `#sky-limit-manage` |
| Sky Limit — değişiklik onayı | `#sky-limit-confirm` |
| Sky Limit — işlem sonucu | `#sky-limit-success` |
| Sky Limit — ödeme sonrası açılan limit | `#sky-limit-payment` |
| Arama | `#search` |
| Ayarlar | `#settings` |
| Bölümler hub'ı | `#sections` |

## Özellik özetleri

### Yuvarla & Biriktir
Kart seç → yuvarlama kuralı (10/50/100 TL) → birikim hesabı → Talimat Formu → Aktifleştir.
Yönet ekranında kumbara, 6 aylık grafik, hedef belirleme, duraklat/durdur.
World Pay ile ödeme yapınca fark otomatik kumbaraya düşer ve başarı ekranında görünür.

### Karekod ile Öde (ana ekran widget'ı)
Telefon ana ekranındaki (springboard) YK widget'ından: Karekod ile Öde → kamera TR Karekod'u otomatik okur → işyeri + tutar gelir → kart/hesap seç → Öde → onay → başarı. Uygulamaya giriş adımı atlanır.

### Toplu Borç Ödeme (taslak)
Kredi kartı, esnek hesap (KMH), ihtiyaç, konut ve taşıt kredisi borçları ay sonunda tek ekstrede birleşir (Kasım 2026: 78.000 TL, son ödeme 15 Kasım). Yeni kredi ya da yapılandırma değildir; ürünlerin koşulları değişmez. Soldaki menü → **Ödemeler**'den ya da ana sayfadaki aramadan ("borç", "toplu", "ekstre") açılır.
- **Ana ekran:** toplam borç, kesim/son ödeme tarihi, ürün bazında dağılım çubuğu ve tutarlar, ekstre detayı ve ödeme geçmişi girişleri, **Toplu Öde**.
- **Toplu ödeme:** hesap seçimi ve bakiye. Vadesiz TL Hesabım (10.000 TL) yetersiz bakiye uyarısı verir; Maaş Hesabım ile devam edilir.
- **Onay → sonuç:** hesap, dönem ve ürün özeti; Face ID simülasyonuyla onay, referans no ve güncel ekstre durumu (kalan borç 0).
- **Ödeme geçmişi:** önceki toplu ödemeler (biri başarısız); satıra dokununca işlem detayı açılır.

### Widget Galerisi
Tüm YK widget çeşitleri tek ana-ekran yüzeyinde: karekod aksiyon kartı, bakiye, Worldpuan, aylık bütçe donut'u, Kartsız ATM, döviz & altın kurları. Karekodlu widget'lar dokununca ödeme akışını açar.

### Birikim hub'ı
Tek "Birikim" girişi altında 4 birikim türü × 3 yöntem matrisi (Harcama Yuvarla, Ekstreden, Maden; Transfer Et yöntemi dahil).

### Ödül Yolu / Harcama Bölüştür / Birlikte Kazan
Benim Dünyam altında level haritalı görev-ödül yolculuğu; FAST tabanlı harcama bölüştürme istekleri; ortak hedefle biriktirip TL ödül kazanılan Birlikte Kazan.

### Sky Limit (taslak)
500.000 TL'lik tek ortak kredi limiti İhtiyaç Kredisi, Taşıt Kredisi ve Esnek Hesap (KMH) arasında dağıtılır. Soldaki menü → **Krediler**'den ya da ana sayfadaki aramadan ("sky", "limit") açılır.
- **Ana ekran:** toplam / kullanılan / kullanılabilir limit, ürün bazında dağılım çubuğu (koyu: kullanılan, açık: kullanılabilir), yaklaşan taksit, son ödemeler ve açılan limitler.
- **Limit dağılımı:** kaydırarak, +/− ile ya da tutar yazarak ürünler arası aktarım. Bir ürünün limiti kullanılan tutarın altına inemez, ürünlere dağıtılan toplam 500.000 TL'yi aşamaz; sınır zorlanınca kart içinde uyarı çıkar.
- **Onay → sonuç:** önceki/yeni dağılım, ürün bazında değişiklikler, işlem özeti; Vazgeç değişikliği iptal eder.
- **Ödeme sonrası açılan limit:** yaklaşan taksitte **Öde** → 20.000 TL limit yeniden açılır → **Limiti Başka Ürüne Aktar** ile dağılım ekranına geçilir.
