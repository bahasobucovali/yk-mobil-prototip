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

Diğer uçtan uca akışlar: **Setur otonom senaryosu** (`#setur`), **Karekod ile Öde** (`#springboard`'dan başlar), **Birikim** (Yuvarla / Ekstreden / Maden), **Ödül Yolu**, **Harcama Bölüştür**, **Birlikte Kazan**, **Sky Limit** (taslak — menü → Krediler), **Toplu Borç Ödeme** (taslak — menü → Ödemeler), **Erken Maaş Erişimi** (taslak — arama), **Marketplace Taşıt** (taslak — arama), **Marketplace Konut** (taslak — arama).

Taslak özellikler ana sayfadaki **"Yapı Kredi Mobil'de Ara"** çubuğundan da açılır: arama ekranında **Önerilenler** altında "YENİ" etiketiyle görünürler; "sky", "limit", "borç", "toplu", "ekstre", "maaş", "avans", "araç", "kasko" gibi kelimelerle aranabilirler (Türkçe karakter yazmadan da eşleşir).

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
| Erken Maaş Erişimi (taslak) — ana ekran | `#erken-maas` |
| Erken Maaş Erişimi — tutar belirleme | `#erken-maas-tutar` |
| Erken Maaş Erişimi — koşullar ve geri ödeme | `#erken-maas-kosullar` |
| Erken Maaş Erişimi — başvuru özeti ve onay | `#erken-maas-onay` |
| Erken Maaş Erişimi — işlem sonucu | `#erken-maas-sonuc` |
| Erken Maaş Erişimi — işlem geçmişi ve geri ödemeler | `#erken-maas-gecmis` |
| Marketplace Taşıt (taslak) — araç arama | `#arac` |
| Marketplace Taşıt — ilanlar, fiyat karşılaştırma | `#arac-liste` |
| Marketplace Taşıt — araç detayı | `#arac-detay` |
| Marketplace Taşıt — kredi ön onayı | `#arac-on-onay` |
| Marketplace Taşıt — kredi ve ödeme planı | `#arac-kredi` |
| Marketplace Taşıt — kredi başvurusu ve kullandırım | `#arac-basvuru` |
| Marketplace Taşıt — kasko teklifleri | `#arac-kasko` |
| Marketplace Taşıt — teslim ve süreç takibi | `#arac-takip` |
| Marketplace Konut (taslak) — ev arama (ilk girişte önce tanıtım açılır) | `#konut` |
| Marketplace Konut — ilk giriş tanıtımı (tanıtımı yeniden gösterir) | `#konut-tanitim` |
| Marketplace Konut — tahsis bilgileri | `#konut-tahsis` |
| Marketplace Konut — TAKBİS bilgileri | `#konut-takbis` |
| Marketplace Konut — ilanlar, fiyat karşılaştırma | `#konut-liste` |
| Marketplace Konut — konut detayı | `#konut-detay` |
| Marketplace Konut — konut kredisi simülasyonu | `#konut-kredi` |
| Marketplace Konut — kredi başvurusu | `#konut-basvuru` |
| Marketplace Konut — başvuru takibi ve nihai onay (ilk değerlendirme sürerken açılır) | `#konut-takip` |
| Marketplace Konut — ekspertiz (randevusu belirlenmiş, devam ediyor) | `#konut-ekspertiz` |
| Marketplace Konut — tapu ve ipotek (nihai onaylı başvuruyla açılır) | `#konut-ipotek` |
| Marketplace Konut — kredi kullandırıldı (süreç tamamlandı) | `#konut-tamam` |
| Akıllı İşletme Finansmanı (taslak) — işletme finansal paneli | `#isletme` |
| Akıllı İşletme Finansmanı — finansal hareketler (girenler / çıkanlar) | `#isletme-hareketler` |
| Akıllı İşletme Finansmanı — yapay zekâ finansal analiz (sonuçla açılır) | `#isletme-analiz` |
| Akıllı İşletme Finansmanı — kişiselleştirilmiş finansman önerileri | `#isletme-oneriler` |
| Akıllı İşletme Finansmanı — teklif karşılaştırma | `#isletme-karsilastir` |
| Akıllı İşletme Finansmanı — finansman detayı ve başvuru | `#isletme-basvuru` |
| Akıllı İşletme Finansmanı — başvuru ve finansman takibi (değerlendirme sürerken açılır) | `#isletme-takip` |
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

### Erken Maaş Erişimi (taslak)
Maaş müşterisi, bu ayki net maaşının %25'ine (60.000 TL maaşta 15.000 TL) maaş gününü (30 Kasım) beklemeden erişir; tutar maaş günü maaştan otomatik geri ödenir. Ana sayfadaki aramadan ("maaş", "avans", "erken") ya da `#erken-maas` ile açılır.
- **Ana ekran:** hemen erişilebilecek tutar, net maaş, oran, üst limit, kullanılan/kalan, maaş günü, kısa bilgilendirme, **Erken Erişimi Başlat**.
- **Tutar belirleme:** kaydırma, +/−, tutar yazma ve hızlı tutarlar; talep sonrası kalan limit anlık güncellenir, limit üstü (ve 500 TL altı) talep kabul edilmez.
- **Koşullar:** tahsis ücreti, faiz, KKDF + BSMV, toplam geri ödeme, tarih ve yöntem; ön bilgilendirme ve sözleşme onayı. **Değerler örnektir** (iş kuralları kesinleşmedi) ve `app.js` içindeki `EWA_TERMS` nesnesinden değiştirilir.
- **Özet → sonuç:** Face ID ikonlu onay, aktarılan tutar, işlem no, güncel limit. **İşlem geçmişi:** önceki erişimler, geri ödeme durumları (bekliyor / geri ödendi) ve işlem detayı.

### Marketplace Taşıt (taslak)
Araç aramadan kredi kullandırımına ve teslime kadar tek akış; Koç Topluluğu şirketleri üzerinden kurgulandı. Tüm ilanlar Otokoç satış noktalarından gelir (sıfır araçlar Otokoç yetkili bayileri, ikinci el araçlar Otokoç 2. El); kasko teklifleri Allianz Türkiye'den. Demo aracı: Audi A4, 2022, 45.000 km, 2.000.000 TL; peşinat 800.000 TL, kredi 1.200.000 TL, 36 ay. Ana sayfadaki aramadan ("araç", "araba", "taşıt", "kasko", "otokoç") ya da `#arac` ile açılır.
- **Araç arama:** sıfır / ikinci el, marka, model, en az–en çok fiyat; detaylı filtrelerde araç tipi, model yılı, kilometre, konum ve Otokoç satış noktası. Popüler markalar ve öne çıkan araçlar. Üstteki araç animasyonu bir Lottie animasyonudur (`app/assets/arac-hero.json`): yalnızca bu ekran açıkken oynar, cihazda hareket azaltma açıksa durağan görünür, yüklenemezse araç çizimi gösterilir.
- **İlanlar:** fotoğraf, yıl, km, fiyat, satıcı ve örnek aylık taksit; fiyat / yıl / km'ye göre sıralama, filtre sayfası, favoriler, 3 araca kadar yan yana karşılaştırma (en avantajlı değer yeşil).
- **Araç detayı:** kaydırmalı galeri, özellikler, donanım, bayi bilgisi, favori, **Kredi Ön Onayı Başlat**.
- **Kredi ön onayı:** peşinat (hızlı %20–50 seçimi), talep edilen kredi, vade, değerlendirmede kullanılan bilgiler ve KKB onayı → adım adım ön değerlendirme → ön onaylı tutar (1.250.000 TL). Ekranda açıkça **kesin onay olmadığı, kullandırımı garanti etmediği** yazar; talep ön onaylı tutarı aşarsa kısmi ön onay ve yeni asgari peşinat gösterilir.
- **Kredi ve ödeme planı:** peşinat kaydırıcısı (ön onay ve asgari peşinat sınırlarıyla), vade seçimi; aylık taksit, toplam faiz, KKDF + BSMV ve toplam geri ödeme anlık güncellenir. Taksit/gelir oranı, en fazla 3 finansman senaryosunu kaydedip karşılaştırma, tam ödeme planı.
- **Başvuru ve kullandırım:** ön onay → kesin değerlendirme → kullandırım ayrı aşamalar olarak gösterilir. Başvuru özeti, koşullar, gerekli belgeler, üç sözleşme onayı, **Başvuruyu Tamamla** → değerlendirme → onay; kullandırım kasko poliçesini bekler.
- **Kasko:** Allianz Türkiye'nin Eko ve Kapsamlı paketleri (+ ek teminatlı seçenek), teminat detayı ve karşılaştırma tablosu, Worldcard ile prim ödemesi (Tek Çekim varsayılan) → Face ID onayı → poliçe düzenlenir, kredi Otokoç Otomotiv hesabına aktarılır.
- **Teslim ve takip:** ilerleme çubuğu (8 adım), satın alma / kredi / kullandırım / kasko durum kartları, tahmini teslim tarihi, teslim noktası, bayi, belgeler. **Demo kontrolleri** ile noter → teslime hazırlık → teslim adımları ilerletilir ya da demo sıfırlanır.
- İlanlar, satış noktalarının konumları, teminat ayrıntıları, faiz ve primler demo / **örnek** veridir (`app.js` içinde `VM_DEALERS`, `VM_CARS`, `VM_RATE`, `VM_PRE_LIMIT`, `VM_KASKO`). Araç görselleri temsilî çizimlerdir; gerçek fotoğraf eklemek için görseller `app/assets/` içine konur ve ilgili araca `photos: ['assets/…']` yazılır.

### Marketplace Konut (taslak)
Ev aramadan tapuda ipotek tesisine ve kredinin satıcıya ödenmesine kadar tek akış. Test senaryosu: İstanbul Kadıköy, daire, 3+1, 2020 yapımı, brüt 135 / net 115 m², 8.000.000 TL; peşinat 3.000.000 TL, kredi 5.000.000 TL, 120 ay. Tahsis: özel sektör çalışanı, aylık net gelir 150.000 TL. TAKBİS: kendi evi yok, eşinin / çocuğunun 1 adet, hisse %40 → BSMV yok, LTV yüksek, sorgu herkese. Ana sayfadaki aramadan ("konut", "ev al", "daire", "ipotek", "ekspertiz", "tapu", "tahsis", "takbis") ya da `#konut` ile açılır.
- **İlk giriş:** Marketplace Konut ilk açıldığında ana ekrandan önce kısa bir tanıtım gelir: ev arama, konut karşılaştırma, kredi simülasyonu, başvuru ve değerlendirme takibi; başlamadan önce tahsis bilgilerinin güncelleneceği ve TAKBİS bilgilerinin ilk kez alınacağı anlatılır. **Başla** → Tahsis → TAKBİS → Marketplace ana ekranı. Sonraki girişlerde doğrudan ana ekran açılır. İlk giriş bilgisi yalnızca bellekte tutulur: sayfa yenilenince ya da `#konut-tanitim` açılınca (başvuru yoksa) tanıtım yeniden gösterilir.
- **Tahsis bilgileri:** kimlik ve temel bilgiler (ad soyad, T.C. kimlik no, doğum tarihi ve yeri, medeni durum, uyruk, telefon, e-posta, adres) salt okunurdur. Meslek ve gelir bilgileri (meslek, unvan, çalışma durumu, işveren, sektör, çalışma süresi, aylık net gelir, eşin geliri, diğer gelir) **Düzenle** ile güncellenir; kaydedilince güncellenen alanlar eski değerleriyle birlikte üstte özetlenir ve **Onayla** ile onaylanır. Test verisinde eşin geliri de 150.000 TL'dir; hane geliri (300.000 TL) simülasyona ve başvuruya taşınır.
- **TAKBİS bilgileri:** sorular tek tek ve cevaba göre sorulur: (1) ‘Hasarlı’ tipi dışında bir evin var mı? (2) Eşinin ya da çocuğunun var mı? (3) Evin hisse oranı (yalnızca gerektiğinde). Cevaplar Yok / 1 adet / 2 ve üzeri; hisse oranı yüzde olarak yazılır ya da hızlı seçilir. Bir cevap değişince artık geçerli olmayan cevaplar silinir ve sonuç yeniden hesaplanır. Sonuç ekranı cevapları, BSMV, LTV ve TAKBİS sorgu kapsamını gösterir; **Marketplace'e Geç** ile ana ekrana gidilir, bilgiler başvuruda tekrar sorulmaz.

  | # | Kendi evi | Eş / çocuk | Hisse | BSMV | LTV | TAKBİS sorgusu |
  |---|---|---|---|---|---|---|
  | 1 | Yok | Yok | – | Yok | Yüksek | Herkese |
  | 2 | Yok | 1 adet | %50 altı | Yok | Yüksek | Herkese |
  | 3 | Yok | 1 adet | %50 üstü | Yok | Düşük | Müşteriye |
  | 4 | Yok | 2 ve üzeri | – | Yok | Düşük | Müşteriye |
  | 5 | 1 adet | Yok | %50 altı | Var | Yüksek | Herkese |
  | 6 | 1 adet | Yok | %50 üstü | Var | Düşük | N/A |
  | 7 | 1 adet | 1 adet | – | Var | Düşük | N/A |
  | 8 | 2 ve üzeri | – | – | Var | Düşük | N/A |

  Kurallar: müşterinin kendi evi varsa BSMV var. Hanede ev yoksa ya da tek ev ve hisse %50'nin altındaysa LTV yüksek, diğer durumlarda düşük. LTV yüksekse sorgu herkese; BSMV yok ve LTV düşükse müşteriye; BSMV var ve LTV düşükse N/A. Tabloda olmayan "kendi evi 1 adet, eşinin / çocuğunun 2 ve üzeri" durumu bu kurallarla sonuçlanır (BSMV var, LTV düşük, N/A). **Hisse tam %50** için otomatik sonuç üretilmez, "manuel değerlendirme gerekiyor" gösterilir; hesaplamalarda temkinli olarak düşük LTV kullanılır.
- **Ev arama:** sıfır / ikinci el, şehir ve ilçe, en az–en çok fiyat, oda sayısı; detaylı filtrelerde konut tipi, brüt m² aralığı ve bina yaşı. Popüler lokasyonlar (ilan sayısı, ortalama m² fiyatı), öne çıkan konutlar, yeni ilanlar.
- **İlanlar:** fotoğraf ve fiyat öne çıkar; başlık, konum, m², oda, bina yaşı, kat, satıcı / emlak ofisi ve örnek aylık taksit. m² fiyatı bölge ortalamasıyla karşılaştırılır. Fiyat, metrekare, m² fiyatı, konum ve yeniliğe göre sıralama, filtre sayfası, favoriler, 3 konuta kadar yan yana karşılaştırma.
- **Konut detayı:** geniş galeri ve küçük resimler (dış görünüm, salon, mutfak, yatak odası, kat planı), fiyat ve m² fiyatı, brüt / net m², oda, bina yaşı, kat, ısıtma ve diğer özellikler, temsilî konum haritası ve yakın çevre, satıcı / emlak ofisi, favori, **Kredi Simülasyonu Yap**.
- **Kredi simülasyonu:** peşinat kaydırıcısı ve hızlı peşinat seçimi, vade 36 / 60 / 96 / 120 ay; aylık taksit, toplam faiz ve toplam geri ödeme anlık güncellenir. Asgari peşinat ve kredi / değer sınırı TAKBİS'teki LTV'ye göre belirlenir (yüksek → en az %25 peşinat, düşük → en az %50); BSMV varsa faize eklenir, KKDF alınmaz. Gelir tahsis bilgilerinden gelir (simülasyonda değiştirilebilir); **ödeme kapasitesi** (borç / gelir oranı, örnek üst sınır %50; aşılırsa başvuru yerine önerilen plan gösterilir), en fazla 3 senaryo karşılaştırması, ödeme planı ve tahmini masraflar (tahsis ücreti, ekspertiz, tapu harcı, DASK).
- **Kredi başvurusu:** onaylanan tahsis bilgileri ve TAKBİS cevapları / sonuçları otomatik gelir, tekrar sorulmaz (tahsis buradan da düzenlenebilir). Başvuru güvenli kanaldan yapıldığı için müşteri bilgileri maskelenmez; ad soyad ve T.C. kimlik no açık görünür (kurgusal kişi, geçersiz T.C. kimlik no). **Tapu fotokopisini satıcı önceden yüklemiştir:** müşteri belge yüklemez, belge "sistemde mevcut" görünür ve **Görüntüle** ile açılır (yükleyen, tarih, banka kontrolü). Konut ve başvuru özeti, üç onay, **Başvuruyu Tamamla**.
- **Başvuru takibi ve nihai onay:** başvuru no, tarih, durum, aşama göstergesi (başvuru → değerlendirme → ekspertiz → nihai onay). İlk kredi değerlendirmesi adım adım ilerler; olumlu sonuçlanınca banka ekspertizi başlatır. Ekspertiz raporu yüklenip bankaca onaylanınca **nihai kredi onayı** gösterilir: onaylanan tutar, vade, faiz, BSMV, aylık taksit, toplam geri ödeme, onay durumu ve geçerlilik tarihi. **Tapu ve İpotek Adımlarına Geç** ile devam edilir.
- **Ekspertiz:** ekspertizi banka başlatır; müşteriye firma seçimi ya da randevu oluşturma adımı gösterilmez. İlk girişte bankanın oluşturduğu talep, atanan değerleme kuruluşu ve uzmanı, randevu tarihi ve saati, "ekspertiz devam ediyor" durumu. Ekrandan çıkıp başvuru takibine (ya da tekrar ekspertize) girildiğinde rapor yüklenmiş ve bankaca onaylanmış görünür: ekspertiz değeri (8.150.000 TL), rapor tarihi, krediye uygunluk, onay durumu ve rapor özeti.
- **Tapu ve ipotek:** nihai onaydan sonra açılır. Tapu durumu, ipotek tesis durumu, şube ve şube randevusu, gerekli belgeler, kullandırım durumu ve tamamlanacak işlemler: şube randevusu ve sözleşme imzası → DASK poliçesi (Allianz Türkiye, Tek Çekim varsayılan) ve tapu harcı ödemesi → tapu randevusu → tapu devri ve ipotek tesisi → kredinin satıcıya aktarılması → **Konut kredin kullandırıldı** başarı ekranı.
- **Demo kontrolleri:** ipotek ekranında zamana bağlı adımları ilerletir; takip, ekspertiz ve ipotek ekranlarında demoyu sıfırlar (tanıtım, tahsis ve TAKBİS bilgileri korunur). Doğrudan hash ile açılan ekranlarda tanıtım atlanır, tahsis ve TAKBİS test verileriyle dolar: `#konut-takip` ilk değerlendirme sürerken, `#konut-ekspertiz` randevusu belirlenmiş ekspertizle, `#konut-ipotek` nihai onaylı başvuruyla, `#konut-tamam` tamamlanmış süreçle açılır.
- İlanlar, emlak ofisleri, değerleme kuruluşu, bölge ortalamaları, faiz, LTV ve BSMV oranları, masraflar, müşteri ve tahsis bilgileri ile ekspertiz değeri demo / **örnek** veridir (`app.js` içinde `KN_HOMES`, `KN_SELLERS`, `KN_AVG_M2`, `KN_RATE`, `KN_LTV` — yüksek %75, düşük %50, `KN_BSMV` — %15, `KN_FEES`, `KN_VALUER`, `KN_PROFILE`, `KN_TAHSIS0`). Konut görselleri temsilî çizimlerdir; gerçek fotoğraf eklemek için görseller `app/assets/` içine konur ve ilgili ilana `photos: ['assets/…']` yazılır (galeri sırası: dış görünüm, salon, mutfak, yatak odası, kat planı).

### Akıllı İşletme Sermayesi Finansmanı (taslak)
Kredi değil, işletme finansman platformu: işletmenin para giriş ve çıkışlarını izler, yapay zekâ ile analiz eder, finansman ihtiyacını ve zamanını önceden belirler, işletmeye özel teklifleri karşılaştırıp tek akışta başvurtur. Demo işletme: ABC Teknoloji ve Ticaret A.Ş. (perakende, KOBİ, 19 çalışan; yetkili Selçuk İmre). Ana sayfadaki aramadan ("işletme", "işletme sermayesi", "ticari", "kobi", "finansman", "nakit akışı", "tedarikçi") ya da `#isletme` ile açılır. Demo tarihi 11 Kasım 2026'dır; veriler 10 Kasım 2026 itibarıyla günceldir.
- **Test verisi (son 3 ay, Ağustos–Ekim 2026, aylık ortalama):** girişler POS satışları 1.200.000, sipariş gelirleri 450.000, diğer tahsilatlar 150.000 TL; çıkışlar fatura 300.000, maaş 500.000, tedarikçi 650.000, diğer giderler 100.000 TL. Brief'in test verisinde olmayan **nakit girişleri** için örnek 100.000 TL eklendi; bu yüzden aylık ortalama giriş 1.900.000, çıkış 1.550.000, net +350.000 TL'dir. Dönem karşılaştırmaları için 24 aylık (Kasım 2024–Ekim 2026) demo seri vardır.
- **İşletme Finansmanı ana ekranı:** işletme adı, analiz dönemi, net nakit akışı ve aylık ortalaması, toplam giriş / çıkış, net marj; aylık giriş-çıkış grafiği (giriş turkuaz, çıkış turuncu, altında aylık net), en güçlü / en zayıf ay; girenler ve çıkanlar için dağılım çubuğu ve kategori satırları. Belirgin **Yapay Zekâ ile Finansal Analiz Et** aksiyonu; analizden sonra sağlık puanı, finansman ihtiyacı, riskli dönem ve **sana özel finansman önerileri** kartları. Devam eden başvuru varsa üstte durumu görünür.
- **Analiz dönemi:** son 1 / 3 / 6 / 12 ay ya da son 12 ay içinden ay aralığı (başlangıç ve bitiş ayına dokunulur, tek ay da seçilebilir). Ana ekran ve hareketler aynı dönemi kullanır.
- **Finansal hareketler:** Şirkete Girenler / Şirketten Çıkanlar sekmeleri; toplam, işlem adedi, aylık ortalama; giriş-çıkış karşılaştırma grafiği; kategori kartlarında toplam, işlem adedi, pay ve aylık değişim (dönemin son ayı / önceki ay). **Karşılaştır** açılınca seçilen dönem hemen önceki eşit uzunluktaki dönemle karşılaştırılır (giriş, çıkış, net ve kategori bazında). Kategoriye dokununca işlem listesi o kategoriye süzülür; liste aylara göre gruplanır, 20'şer işlem açılır.
- **Yapay zekâ finansal analiz:** gerçek LLM deneyimi gibi tek satır, adım adım değişen "düşünme" metni ve **Analizi Durdur**; ekrandan çıkılsa da sürer, bitince bildirim gelir. Sonuçta doğal dilde özet (kopyala, 👍/👎, "yapay zekâ hata yapabilir" uyarısı), finansal sağlık puanı (66/100) ve 4 alt gösterge, gelir-gider dengesi (ortalama gelir/gider, net, oran), nakit akışı eğilimi (son 6 ay + 4 ay tahmin), finansman ihtiyacı (500.000 TL, Aralık başından önce, 6 ay), 120 günlük bakiye tahmini ve **olası nakit açığı dönemleri** (5–14 Aralık en düşük −430.000 TL; 20 Aralık; 5–8 Ocak), finansmanlı senaryo çizgisi (aç / kapa), risk göstergeleri ve öneriler.
- **Kişiselleştirilmiş finansman önerileri:** 5 alternatif, uygunluk puanına göre: kısa vadeli işletme sermayesi (500.000 TL, 6 ay — yapay zekâ önerisi), nakit akışı destek finansmanı (600.000 TL limit, kullandıkça faiz), esnek geri ödemeli işletme finansmanı (ilk 2 ay yalnızca faiz), tedarikçi ödeme finansmanı (90 gün, tedarikçiye doğrudan ödeme), fatura ödeme finansmanı. Her teklifte tür, tutar, vade, tahmini maliyet, aylık ödeme, geri ödeme koşulu ve **"Neden bu öneri?"** gerekçesi.
- **Teklif karşılaştırma:** en fazla 3 teklif yan yana: tutar, maliyet, aylık faiz, vade, ödeme periyodu, aylık ödeme, toplam geri ödeme, erken ödeme, kullanım alanı, uygunluk; en avantajlı değerler yeşil, yapay zekâ yorumu, **Seç** ile teklif seçimi.
- **Finansman detayı ve başvuru:** işletme bilgileri (unvan, vergi no, faaliyet, yetkili, adres, kullandırım hesabı), son 3 ayın finansal görünümü, talep edilen tutar (− / +, önerilenden sapınca uyarı) ve vade seçimi; faiz, BSMV, tahsis ücreti, aylık taksit, toplam maliyet ve toplam geri ödeme anlık güncellenir; geri ödeme planı, başvuru özeti, üç onay, Face ID ikonlu **Başvuruyu Tamamla**.
- **Başvuru ve finansman takibi:** başvuru no ve tarihi, talep edilen finansman, durum; 5 adımlı ilerleme (başvuru → değerlendirme → onay → kullandırım → geri ödeme). Otomatik ön değerlendirme adım adım ilerler → onay detayları → **Sözleşmeyi Onayla ve Kullan** (Face ID simülasyonu) → tutar işletme hesabına aktarılır; kullanılan finansman tutarı, kalan anapara, sıradaki ödeme ve geri ödeme planı (ödendi / sıradaki / bekliyor). Nakit akışı desteğinde **Limitten Kullan** ile kullanılan tutar artar; tedarikçi finansmanında tutar tedarikçiye ödenir. **Demo kontrolleri:** değerlendirmeyi tamamla, sonraki ödemeyi yap (1 ay ileri), demoyu sıfırla (analiz korunur).
- **Doğrudan açılan ekranlar:** `#isletme-analiz`, `#isletme-oneriler`, `#isletme-karsilastir`, `#isletme-basvuru` analiz tamamlanmış halde; `#isletme-takip` değerlendirmesi süren 500.000 TL / 6 ay işletme sermayesi başvurusuyla açılır.
- İşletme, hareketler, analiz metinleri, tahminler, teklifler ve oranlar demo / **örnek** veridir; gerçek hesap, POS, yapay zekâ, teklif veya kredi süreci yoktur (`app.js` içinde `BF_BIZ`, `BF_SERIES`, `BF_FC`, `BF_OFFERS` — faiz oranları örnek, BSMV %5, tahsis ücreti binde 5, güvenlik payı `BF_BUFFER` %15).

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
