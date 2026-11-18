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
6. **Worldcard ile öde** seç → **Öde** → **Yapı Kredi Mobil ile Onayla** (onay simülasyonu)
7. Başarı ekranı + Worldpuan kazanımı

Diğer uçtan uca akışlar: **Setur otonom senaryosu** (`#setur`), **Karekod ile Öde** (`#springboard`'dan başlar), **Birikim** (Yuvarla / Ekstreden / Maden), **Ödül Yolu**, **Harcama Bölüştür**, **Birlikte Kazan**, **Çatı Limit** (taslak — menü → Krediler), **Anlık Borç İzleme** (taslak — menü → Ödemeler), **Erken Maaş Erişimi** (taslak — arama), **Marketplace Taşıt** (taslak — arama), **Marketplace Konut** (taslak — arama).

### Ortak bileşenler: Ödeme, Hesaptan Ödeme ve İşlem Onay pop-up'ları
Uygulama genelinde birbirinden bağımsız üç ortak pop-up vardır: kartla **Ödeme pop-up**'ı, **Hesaptan Ödeme pop-up**'ı ve **İşlem Onay pop-up**'ı; ekranlar bunları parametreyle çağırır (`app.js` içinde `payPopOpen()`, `acctPopOpen()` ve `confirmPopOpen()`). Üçü de alttan açılan katmandır. Arkadaki ekran karartılır, kapanınca ekran kaldığı durumla görünür; işlem sürerken kapatılamaz.
- **Ödeme pop-up'ı:** ödeme türü, tutar, açıklama ve kısa bilgi; **Kredi Kartı** / **Banka Kartı** seçimi. Kredi kartlarında maskeli kart no, son kullanma tarihi ve kullanılabilir limit, taksit seçenekleri (varsayılan Tek Çekim, 2, 3, 6; ekran kendi seçeneklerini verebilir) ve seçime göre güncellenen aylık tutar. Banka kartlarında maskeli kart no ve bağlı hesap bakiyesi; taksit gösterilmez. **Ödemeyi Onayla** → başarılı durum (tutar, yöntem, kart, taksit, işlem no, tarih) → pop-up kendiliğinden kapanır, çağıran ekranın ödeme durumu güncellenir. Ekran, kullanılabilecek yöntemleri sınırlayabilir (`methods`). Limit / bakiye yetmezse "Ödeme gerçekleştirilemedi" gösterilir, para çekilmez; **Başka Kartla Dene** ile devam edilir. Örnek kartlar: Worldcard (limit 18.500 TL), Adios (300.000 TL), TLcard (Vadesiz TL Hesabım, 10.000 TL), Maaş Kartım (Maaş Hesabım, 2.000.000 TL); `PAY_CARDS`. Banka kartları bağlı oldukları hesabın bakiyesini kullanır; bakiye iki pop-up arasında ortaktır.
- **Hesaptan Ödeme pop-up'ı:** kartla ödeme pop-up'ı örnek alındı; ödeme yöntemi olarak **yalnızca hesaplar** listelenir (kredi kartı / banka kartı yoktur). Ödeme türü, başlık, açıklama, toplam tutar ve kısa not; her hesapta ad, tür, hesap no, maskeli IBAN, para birimi ve kullanılabilir bakiye. Tutarı karşılayan ilk TL hesap önceden seçilir, seçilen hesap vurgulanır ve altında ödeme sonrası bakiye görünür. Bakiye yetmezse satırda ve altta "yetersiz bakiye" uyarısı çıkar; yine de onaylanırsa "Ödeme gerçekleştirilemedi" gösterilir, para çekilmez, **Başka Hesapla Dene** ile devam edilir. Döviz hesabı TL ödemede seçilemez. **Ödemeyi Onayla** → kısa yükleme → başarı (tutar, hesap, **güncel bakiye**, işlem no, tarih) → pop-up kendiliğinden kapanır, çağıran ekranın durumu güncellenir. Parametreler: `title`, `desc`, `amount`, `type`, `note`, `okMsg`, `onPaid(res)` (ödeme başarılı olunca ekranın durumunu günceller), `onClose(res)`. Test hesapları (`PAY_ACCOUNTS`): Vadesiz TL Hesabım 10.000 TL, **Maaş Hesabım 2.000.000 TL** (ödeme testleri için), Vadesiz Euro Hesabım 1.250 €. Bakiyeler sayfa açık kaldığı sürece ödemelerle azalır, sayfa yenilenince başlangıç değerine döner.
- **İşlem Onay pop-up'ı:** checkpoint (check-circle) görseli, başlık, kısa açıklama, işlem özeti, **Onayla** / **Vazgeç** (metinler parametreyle değişir). Onaylanınca kapanır ve işlem tamamlanır; işlem yapılamazsa "İşlem tamamlanamadı" ve **Tekrar Dene** gösterilir.
- **Kontrol ve onay animasyonu:** önemli bir başvuru onaylandığında ayrı sayfa açmadan, ekranın üzerinde kısa bir kontrol ("Başvurunuz kontrol ediliyor…", "Bilgileriniz değerlendiriliyor…", kontrol listesi) ve ardından başarı (check-circle) animasyonu oynar (`checkAnimRun()`; Marketplace Taşıt başvurusu, Akıllı İşletme Finansmanı kullandırımı).
- **Kullanıldığı yerler:** Ödeme pop-up'ı: Marketplace Konut DASK, Marketplace Taşıt kasko primi ve **araç kaporası**. Hesaptan Ödeme pop-up'ı: Marketplace Taşıt **Güvenli Ödeme Sistemi**, **Çatı Limit** taksit ödemesi, **Anlık Borç İzleme** (seçilen kalemler). İşlem Onay pop-up'ı: iki marketplace'in **Başvuruyu Tamamla** adımı, Akıllı İşletme Finansmanı'nda vadeli mevduat / Sınırsız Hesap açılışı. Uygulamanın hiçbir ekranında Face ID logosu kullanılmaz; onay adımlarında check-circle ikonu kullanılır.

**Ekran geçişleri:** ileri gidilen ekran sağdan gelir, önceki ekran sola kayarak geride kalır. Geri butonunda ya da ekranın sol kenarından sağa kaydırınca (cihazın geri hareketi) mevcut ekran sağa kapanır, önceki ekran soldan gelir; geri dönülen ekran kaldığı kaydırma konumuyla ve yazılan bilgilerle açılır. Cihazda "hareketi azalt" açıksa kaydırma yerine kısa bir geçiş kullanılır.

Taslak özellikler ana sayfadaki **"Yapı Kredi Mobil'de Ara"** çubuğundan da açılır: arama ekranında **Önerilenler** altında "YENİ" etiketiyle görünürler; "çatı", "limit", "borç", "toplu", "ekstre", "maaş", "avans", "araç", "kasko" gibi kelimelerle aranabilirler (Türkçe karakter yazmadan da eşleşir).

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
| Anlık Borç İzleme (taslak) — Kasım Ayı sekmesi: son ödeme uyarıları, erken ödeme indirimi, kalem seçerek öde | `#borc-izleme` |
| Anlık Borç İzleme — Tüm Borçlar sekmesi (toplam borç yükü) | `#borc-izleme-tum` |
| Anlık Borç İzleme — borç detayı | `#borc-izleme-detay` |
| Anlık Borç İzleme — ödeme geçmişi | `#borc-izleme-gecmis` |
| Erken Maaş Erişimi (taslak) — ana ekran | `#erken-maas` |
| Erken Maaş Erişimi — tutar belirleme | `#erken-maas-tutar` |
| Erken Maaş Erişimi — koşullar ve geri ödeme | `#erken-maas-kosullar` |
| Erken Maaş Erişimi — başvuru özeti ve onay | `#erken-maas-onay` |
| Erken Maaş Erişimi — işlem sonucu | `#erken-maas-sonuc` |
| Erken Maaş Erişimi — işlem geçmişi ve geri ödemeler | `#erken-maas-gecmis` |
| Marketplace Taşıt (taslak) — araç arama | `#arac` |
| Marketplace Taşıt — ilanlar, fiyat karşılaştırma | `#arac-liste` |
| Marketplace Taşıt — araç detayı | `#arac-detay` |
| Marketplace Taşıt — kredi simülasyonu | `#arac-kredi` |
| Marketplace Taşıt — kredi başvurusu (kapora ödemesi zorunlu; onay ve kontrol animasyonundan sonra aynı ekranda "Başvurunuz Onaylandı") | `#arac-basvuru` |
| Marketplace Taşıt — kasko (başvurusu alınmış kredi için) | `#arac-kasko` |
| Marketplace Taşıt — kullandırım: gerekli belgeler (sözleşme onayı, Güvenli Ödeme Sistemi), noter, rehin (kaskosu yapılmış kredi için) | `#arac-kullandirim` |
| Marketplace Taşıt — kredi kullandırıldı (süreç tamamlandı) | `#arac-tamam` |
| Marketplace Konut (taslak) — ev arama (ilk girişte önce tanıtım açılır) | `#konut` |
| Marketplace Konut — ilk giriş tanıtımı (tanıtımı yeniden gösterir) | `#konut-tanitim` |
| Marketplace Konut — müşteri bilgileri (meslek ve gelir) | `#konut-tahsis` |
| Marketplace Konut — TAKBİS bilgileri | `#konut-takbis` |
| Marketplace Konut — ilanlar, fiyat karşılaştırma | `#konut-liste` |
| Marketplace Konut — konut detayı | `#konut-detay` |
| Marketplace Konut — konut kredisi simülasyonu | `#konut-kredi` |
| Marketplace Konut — kredi başvurusu | `#konut-basvuru` |
| Marketplace Konut — başvuru takibi (ilk değerlendirme sürerken açılır) | `#konut-takip` |
| Marketplace Konut — ekspertiz (randevusu belirlenmiş, devam ediyor) | `#konut-ekspertiz` |
| Marketplace Konut — kullandırım: şube randevusu, tapu devri (randevu tapu müdürlüğünce), ipotek (ekspertizi onaylı başvuruyla açılır) | `#konut-ipotek` |
| Marketplace Konut — kredi kullandırıldı (süreç tamamlandı) | `#konut-tamam` |
| Akıllı İşletme Finansmanı (taslak) — işletme finansal paneli | `#isletme` |
| Akıllı İşletme Finansmanı — finansal hareketler (girenler / çıkanlar) | `#isletme-hareketler` |
| Akıllı İşletme Finansmanı — Yapı Kredi Akıllı Asistanı analizi: finansman fırsatları, nakit yönetimi ve birikim önerileri (sonuçla açılır) | `#isletme-analiz` |
| Akıllı İşletme Finansmanı — yatırım fırsatı detayı (vadeli mevduat, Sınırsız Hesap, harcama / ekstre yuvarlama) | `#isletme-yatirim` |
| Akıllı İşletme Finansmanı — kişiselleştirilmiş finansman önerileri | `#isletme-oneriler` |
| Akıllı İşletme Finansmanı — önerileri karşılaştır (3 öneri seçili açılır) | `#isletme-karsilastir` |
| Akıllı İşletme Finansmanı — 1. aşama: Kredi Detay (Çatı Limit'ten kullanım; eski `#isletme-basvuru` buraya yönlenir) | `#isletme-kredi` |
| Akıllı İşletme Finansmanı — 2. aşama: kullandırım (kredi detayı belirlenmiş, sözleşme onayı bekliyor) | `#isletme-kullandirim` |
| Akıllı İşletme Finansmanı — finansman takibi (kullandırılmış finansmanla açılır) | `#isletme-takip` |
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
| Çatı Limit (taslak) — ana ekran | `#cati-limit` |
| Çatı Limit — limit dağılımı (toplam Çatı Limit üzerinden ürünlere dağıtım) | `#cati-limit-manage` |
| Çatı Limit — değişiklik onayı | `#cati-limit-confirm` |
| Çatı Limit — işlem sonucu | `#cati-limit-success` |
| Çatı Limit — 20.000 TL taksit ödendi, yeni limit ana limite eklendi (520.000 TL) | `#cati-limit-payment` |
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

### Anlık Borç İzleme (taslak)
Eski adı Toplu Borç Ödeme. Kredi kartı, esnek hesap (KMH), ihtiyaç, konut ve taşıt kredisi borçları tek ekranda, güncel olarak izlenir ve yönetilir; bu ayın borçları seçilerek ödenir. Yeni kredi ya da yapılandırma değildir; ürünlerin koşulları değişmez. Soldaki menü → **Ödemeler**'den ya da ana sayfadaki aramadan ("borç", "borç izleme", "ekstre", "son ödeme"; eski adla "toplu borç" da bulur) açılır. Demo tarihi 14 Kasım 2026'dır; kalan günler bu tarihe göre hesaplanır. Eski `#toplu-borc…` bağlantıları yeni ekranları açar.
- **İki sekme:** üstteki **Kasım Ayı** sekmesi bu ay ödenmesi gereken güncel borçları, **Tüm Borçlar** sekmesi genel borç yükünü gösterir; içerikler birbirine karışmaz, sekme değişince ekran yeniden açılmadan ilgili veriler gösterilir.
- **Kasım Ayı:** bu ay ödenecek toplam (78.000 TL), en yakın son ödeme, ürün bazında dağılım çubuğu ve her **borç kalemi** seçim kutusuyla. Son ödeme bilgileri: **Kredi Kartı "1 gün kaldı"**, **Taşıt Kredisi "2 gün kaldı"** (küçük uyarı etiketleri), **Konut Kredisi "20 Kasım"**, İhtiyaç Kredisi 25 Kasım, Esnek Hesap'ta sabit son ödeme yok. Başlangıçta tümü seçilidir; **Tümünü seç / Seçimi kaldır**. Hiç kalem seçili değilse ödeme butonu pasiftir.
- **Erken ödeme indirimi (örnek kampanya):** kalemin yanında indirim oranı ("%2 erken ödeme"), seçilince indirim tutarı ("−360,00 TL") görünür. Oran ödeme gününde son ödeme tarihine kalan süreye göre değişir: 5 gün ve daha önce %2, 3–4 gün %1,5, 1–2 gün %0,5, son gün indirim yok (Kredi Kartı %0,5, Konut %2, Taşıt %0,5, İhtiyaç %2; Esnek Hesap'ta yok). **Ödeme özeti** seçimle anında güncellenir: seçilen adet, borç tutarı, erken ödeme indirimi, **indirimli ödenecek tutar**, ödeme sonrası kalan borç. "Erken ödeme avantajı" alanı oranları ve kalemlerin indirimlerini açıklar. Oranlar `DEBT_EARLY` içindedir; gerçek ürün ya da faiz / erken kapama indirimi değildir.
- **Ödeme:** **Seçilenleri Öde** ortak **Hesaptan Ödeme pop-up**'ını seçilen kalemlerin **erken ödeme indirimi sonrası** toplamıyla açar; açıklamada kalemler ve indirimli tutarları, notta indirim ve borç tutarı yazar. Ödeme seçilen hesaptan yapılır (ör. Maaş Hesabım; Vadesiz TL Hesabım'ın 10.000 TL bakiyesi büyük ödemelere yetmez ve uyarı verir) ve hesabın bakiyesi ödenen tutar kadar azalır. Ödeme başarılı olunca yalnızca seçilen kalemler "Ödendi" olur; kalan borç, adet ve kazanılan indirim yeniden hesaplanır, seçilmeyen kalemler sonra ayrıca ödenebilir.
- **Tüm Borçlar:** toplam borç yükü (2.745.750 TL: kredilerde bu ay dahil kalan taksitlerin toplamı, kredi kartında dönem borcu + gelecek dönem taksitleri, esnek hesapta kullanılan tutar), borç kalemi adedi, kalan taksit sayısı ve aylık kredi taksitleri; ürün bazında dağılım çubuğu ve kartlar: **Konut Kredisi** 1.764.000, **Taşıt Kredisi** 570.000, **Diğer borçlar** (İhtiyaç Kredisi 362.500 + Esnek Hesap 8.000) 370.500, **Kredi Kartı** 41.250 TL; kredilerde kalan taksit, son taksit ve ödenen taksit ilerlemesi. Kasım'da ödenen kalemler bu sekmede de düşer (ör. konut taksiti ödenince 97 taksit kalır).
- **Borç detayı ve ödeme geçmişi:** ürün bazında borç, taksit, son ödeme ve erken ödeme bilgisi; önceki ödemeler (biri başarısız) ve yeni ödemeler (kalem sayısı, indirim); satıra dokununca işlem detayı.

### Erken Maaş Erişimi (taslak)
Maaş müşterisi, bu ayki net maaşının %25'ine (60.000 TL maaşta 15.000 TL) maaş gününü (30 Kasım) beklemeden erişir; tutar maaş günü maaştan otomatik geri ödenir. Ana sayfadaki aramadan ("maaş", "avans", "erken") ya da `#erken-maas` ile açılır.
- **Ana ekran:** hemen erişilebilecek tutar, net maaş, oran, üst limit, kullanılan/kalan, maaş günü, kısa bilgilendirme, **Erken Erişimi Başlat**.
- **Tutar belirleme:** kaydırma, +/−, tutar yazma ve hızlı tutarlar; talep sonrası kalan limit anlık güncellenir, limit üstü (ve 500 TL altı) talep kabul edilmez.
- **Koşullar:** tahsis ücreti, faiz, KKDF + BSMV, toplam geri ödeme, tarih ve yöntem; ön bilgilendirme ve sözleşme onayı. **Değerler örnektir** (iş kuralları kesinleşmedi) ve `app.js` içindeki `EWA_TERMS` nesnesinden değiştirilir.
- **Özet → sonuç:** check-circle ikonlu onay, aktarılan tutar, işlem no, güncel limit. **İşlem geçmişi:** önceki erişimler, geri ödeme durumları (bekliyor / geri ödendi) ve işlem detayı.

### Marketplace Taşıt (taslak)
Araç aramadan kredi kullandırımına kadar tek akış: Araç seçimi → Simülasyon → Başvuru → Kasko → Kullandırım → Kullandırım tamamlandı. Koç Topluluğu şirketleri üzerinden kurgulandı: tüm ilanlar Otokoç satış noktalarından gelir (sıfır araçlar Otokoç yetkili bayileri, ikinci el araçlar Otokoç 2. El); kasko teklifleri Allianz Türkiye'den. Demo aracı: Audi A4, 2022, 45.000 km, 2.000.000 TL; peşinat 800.000 TL, kredi 1.200.000 TL, 36 ay. Müşteri bilgileri: özel sektör çalışanı, lisans, aylık net gelir 300.000 TL. Ana sayfadaki aramadan ("araç", "araba", "taşıt", "kasko", "otokoç") ya da `#arac` ile açılır.
- **Araç arama:** sıfır / ikinci el, marka, model, en az–en çok fiyat; detaylı filtrelerde araç tipi, model yılı, kilometre, konum ve Otokoç satış noktası. Popüler markalar ve öne çıkan araçlar. Üstteki araç animasyonu bir Lottie animasyonudur (`app/assets/arac-hero.json`): yalnızca bu ekran açıkken oynar, cihazda hareket azaltma açıksa durağan görünür, yüklenemezse araç çizimi gösterilir.
- **İlanlar:** fotoğraf, yıl, km, fiyat, satıcı ve örnek aylık taksit; fiyat / yıl / km'ye göre sıralama, filtre sayfası, favoriler (kalp: boşken içi boş, favoride dolu; Marketplace Konut ile ortak bileşen), 3 araca kadar yan yana karşılaştırma (en avantajlı değer yeşil).
- **Araç detayı:** kaydırmalı galeri, özellikler, donanım, bayi bilgisi, favori, **Kredi Simülasyonu Yap**. Ön onay adımı yoktur.
- **Kredi simülasyonu:** Marketplace Konut simülasyonu örnek alınarak hazırlandı. Üstte araç (marka, model, model yılı, tip, satış fiyatı, görsel). Peşinat / kredi alanı Konut'taki yapının aynısıdır: **peşinat** giriş alanı, tek kaydırıcı ve hızlı peşinat oranları; altında bağlı **kredi tutarı** (peşinat + kredi = satış fiyatı) ve kredi / araç fiyatı göstergesi (üst limit işaretli). Kaydırıcı hareket ettikçe kredi, taksit ve diğer tutarlar anında güncellenir. Taşıt kredisi üst limiti **1.200.000 TL**: peşinat, senaryolar ve başvuruya aktarılan tutar bu sınırı aşan bir krediye izin vermez; ucuz araçlarda asgari %20 peşinat nedeniyle sınır daha düşük olabilir (ör. Toyota Corolla'da 890.000 TL). Vade 12 / 24 / 36 / 48 ay; aylık taksit, toplam faiz, KKDF + BSMV, finansman maliyeti ve toplam geri ödeme anlık güncellenir. **Ödeme kapasitesi** kayıtlı aylık net gelirle hesaplanır (taksit, gelire oranla ödeme yükü, örnek üst sınır %50; aşılırsa başvuru yerine önerilen plan gösterilir). Hazır senaryolar: düşük peşinat / yüksek kredi, dengeli, yüksek peşinat / düşük kredi (peşinat, kredi, vade, taksit, toplam geri ödeme; **Uygula**). Tahmini masraflar bilgilendirme amaçlıdır: kasko, noter, rehin tesis, kredi tahsis ücreti.
- **Kredi başvurusu:** Marketplace Konut başvurusu gibi sade: meslek ve gelir bilgileri (meslek, eğitim durumu, aylık net gelir; **Düzenle** ile ekranda güncellenir), simülasyondan gelen başvuru özeti (araç, fiyat, peşinat, kredi, vade, taksit, toplam geri ödeme), hemen altında **Kapora ödemesi** bloğu ve yalnızca **Aydınlatma Metni**.
- **Kapora (zorunlu):** blokta kaporanın ödeneceği araç ve satış noktası, kapora tutarı (araç fiyatının %2'si, 5.000 TL'ye yuvarlanır, 20.000–50.000 TL; Audi A4 için 40.000 TL — örnek, `VM_DEPOSIT`) ve ödeme durumu (**Ödeme Bekleniyor** / **Ödendi**). **Kapora Öde** ortak **Ödeme pop-up**'ını "Araç Kapora Ödemesi" açıklaması ve kapora tutarıyla açar (kredi kartı / banka kartı, taksit seçenekleri); ödeme başarılı olunca blok anında "Ödendi" olur (yöntem, kart, işlem no, tarih) ve **Başvuruyu Tamamla** aktifleşir. Kapora ödenmeden buton pasiftir; dokunulursa onay açılmaz, ekran kapora bloğuna kayar ve uyarı verir. Kapora araç bedelinden düşülür, başvuru onaylanmazsa iade edilir (bilgi metni). Başka bir araca geçilirse o araç için yeniden kapora gerekir.
- **Başvuruyu tamamlama:** **Başvuruyu Tamamla** ortak **İşlem Onay pop-up**'ını açar (başvuru özeti; **Onayla** / **Vazgeç** — vazgeçince girilen bilgiler korunur). Onaylanınca pop-up hemen kapanır ve aynı ekranın üzerinde kısa bir **kontrol animasyonu** başlar ("Başvurunuz kontrol ediliyor…" → "Bilgileriniz değerlendiriliyor…", kimlik ve gelir / KKB / araç ve satış noktası kontrolleri işaretlenir), ardından **onay animasyonu** (check-circle, "Başvurunuz onaylandı") gelir; toplam yaklaşık 3,5 saniye. Ayrı bir onay sayfası açılmaz; **aynı ekran** "Başvurunuz Onaylandı" durumuna döner: başvuru no, başvuru tarihi, durum "Onaylandı", onaylanan kredi tutarı, vade ve taksit, ödenen kapora, araç ve sonraki adım olan kasko bilgisi. **Kasko Adımına Geç** ile kaskoya geçilir.
- **Kasko:** Allianz Türkiye'nin Eko ve Kapsamlı paketleri (+ ek teminatlı seçenek), teminat detayı ve karşılaştırma. Ekranda ayrı bir prim ödemesi bölümü yoktur; **sigorta bilgileri** (sigortalı, araç, kasko paketi, kapsam, poliçe süresi, dain-i mürtehin, yıllık prim) ve bilgilendirme formu onayı görünür. **Onayla ve Öde** ortak **Ödeme pop-up**'ını kasko primiyle açar (kredi kartında Tek Çekim, 2, 3, 6, 9 taksit); ödeme başarılı olunca poliçe düzenlenir: "Ödemen alındı, poliçen düzenlendi", ödeme bilgileri (yöntem, kart, taksit, işlem no) ve kasko adımı tamamlandı. **Kullandırıma Geç** ile devam edilir.
- **Kullandırım:** şubeye gidilmez. Üstte onaylanan kredi tutarı, araç ve **Finansman özeti**; süreç göstergesi **Gerekli Belgeler → Noter → Rehin**. **1 · Gerekli Belgeler** adımının içeriği belge listesidir: **Taşıt Kredisi Sözleşmeleri** satırı ve hazır belgeler (kimlik, gelir, proforma fatura / satış sözleşmesi, araç bilgileri, kasko poliçesi — "Hazır"), sayaç ("5/6 tamamlandı"). T.C. kimlik kartı satırı ve ödemeler bölümü yoktur (tahsis, noter, rehin masrafları uygulamada ödenmez); yerleşim yeri belgesi ve maaş bordrosu istenmez, belge yükleme altyapısı (`VM_UPL_DOCS`) yeni bir belge eklenirse çalışır. Sözleşme satırına ya da **Sözleşmeleri İncele ve Onayla** butonuna dokununca küçük bir pop-up açılır: Taşıt Kredisi Sözleşmesi, Ön Bilgilendirme Formu ve Araç Rehni Sözleşmesi listelenir, her biri dokununca içeriğini açar; "Sözleşmeleri okudum, onaylıyorum" işaretlenince **Sözleşmeleri Onayla** aktifleşir. Onaylanınca pop-up kapanır, satır "Onaylandı" olur. Onay durumu ekranlar arasında korunur (tekrar açınca pop-up görüntüleme modundadır). Belge listesinin hemen altında **Güvenli Ödeme Sistemi** bloğu vardır: "Güvenli ödeme sistemine kalan tutarı aktar.", aktarılacak tutar (peşinat − ödenen kapora; Audi A4 için 800.000 − 40.000 = **760.000 TL**), durum **Ödeme Bekleniyor** / **Ödendi** ve **Öde** butonu. **Öde** ortak **Hesaptan Ödeme pop-up**'ını "Güvenli Ödeme Sistemi" başlığı, "Güvenli ödeme sistemine aktarılacak tutar" açıklaması ve kalan tutarla açar; ödeme başarılı olunca hesabın bakiyesi düşer (Maaş Hesabım 2.000.000 → 1.240.000 TL), blok "Ödendi" olur (hesap, işlem no, tarih), buton tamamlanmış duruma geçer. Sözleşmeler onaylanıp güvenli ödeme yapılınca adım tamamlanır; ödeme yapılmadan noter adımına geçilmez. **2 · Noter** sadeleştirildi: noter, alıcı / satıcı ve adres bilgileri gösterilmez; yalnızca **Noter İşlemi Bekleniyor** ve kısa bilgi. **3 · Rehin** (banka lehine rehin; tesis edilince kredi Otokoç Otomotiv hesabına aktarılır, kullandırım dekontu). Kasko burada tekrar ödenmez. Süreç **Taşıt kredin kullandırıldı** ekranıyla biter (tutar, araç, kredi bilgileri, kullandırım tarihi, işlem tamamlandı).
- **Demo kontrolleri:** kullandırım ekranında **Sonraki adıma geç** noter işlemini tamamlanmış kabul eder (noter "Tamamlandı"), ardından rehin kendiliğinden tesis edilir; başvuru ve kullandırım ekranlarında demoyu sıfırlar (müşteri bilgileri korunur). Doğrudan hash ile açılan ekranlar gereken durumu kendisi hazırlar: `#arac-kasko` başvurusu alınmış (kapora ödenmiş), `#arac-kullandirim` kaskosu yapılmış (sözleşme ve güvenli ödeme bekleyen), `#arac-tamam` tamamlanmış süreçle açılır; `#arac-basvuru` kapora ödenmemiş başvuruyla açılır.
- İlanlar, satış noktalarının konumları, teminat ayrıntıları, faiz, limit, masraflar ve primler demo / **örnek** veridir (`app.js` içinde `VM_DEALERS`, `VM_CARS`, `VM_RATE`, `VM_MAX_LOAN`, `VM_CAP`, `VM_FEES`, `VM_PROFILE`, `VM_KASKO`, `VM_UPL_DOCS`). Araç görselleri temsilî çizimlerdir; gerçek fotoğraf eklemek için görseller `app/assets/` içine konur ve ilgili araca `photos: ['assets/…']` yazılır.

### Marketplace Konut (taslak)
Ev aramadan kullandırıma (şube randevusu, tapu devri, ipotek) ve kredinin satıcıya ödenmesine kadar tek akış: Simülasyon → Başvuru → Ekspertiz → Kullandırım. Test senaryosu: İstanbul Kadıköy, daire, 3+1, 2020 yapımı, brüt 135 / net 115 m², 8.000.000 TL; peşinat 3.000.000 TL, kredi 5.000.000 TL, 120 ay. Müşteri bilgileri: özel sektör çalışanı, eğitim durumu lisans, aylık net gelir 300.000 TL. TAKBİS: kendi gayrimenkulü yok, eşinin / çocuğunun 1 adet, hisse %40 → (sistemde) BSMV yok, LTV yüksek, sorgu müşteri ve aile fertlerine; kullandırımda vukuatlı nüfus kayıt belgesi ve konut sahiplik beyan formu istenir. Ana sayfadaki aramadan ("konut", "ev al", "daire", "ipotek", "ekspertiz", "tapu", "takbis") ya da `#konut` ile açılır.
- **İlk giriş:** Marketplace Konut ilk açıldığında ana ekrandan önce kısa bir tanıtım gelir: ev arama, konut karşılaştırma, kredi simülasyonu, başvuru ve değerlendirme takibi; başlamadan önce müşteri bilgilerinin güncelleneceği ve TAKBİS bilgilerinin ilk kez alınacağı anlatılır. **Başla** → Müşteri Bilgileri → TAKBİS → Marketplace ana ekranı. Sonraki girişlerde doğrudan ana ekran açılır. İlk giriş bilgisi yalnızca bellekte tutulur: sayfa yenilenince ya da `#konut-tanitim` açılınca (başvuru yoksa) tanıtım yeniden gösterilir.
- **Müşteri bilgileri:** yalnızca meslek ve gelir bilgileri gösterilir (kimlik ve temel bilgiler bloğu yoktur): meslek, unvan / pozisyon, çalışma durumu, eğitim durumu (Lisans) ve aylık net gelir. **Düzenle** ile güncellenir; kaydedilince güncellenen alanlar eski değerleriyle birlikte üstte özetlenir ve **Onayla** ile onaylanır ("Bilgiler onaylandı"). İşveren, sektör ve diğer aylık gelir sorulmaz. Özel nitelikli veri sayıldığı için medeni durum, eşin aylık net geliri, işyerinde çalışma süresi ve aylık net hane geliri prototipte hiçbir yerde yoktur (ekran, form, mock veri, hesaplama, özet).
- **TAKBİS bilgileri:** ilk soruda bilgilendirme: "TAKBİS bilgilerin ilk kez alınıyor. Kredi limitiniz girdiğiniz bilgilere istinaden hesaplanacak olup kredi kullandırım aşamasında yapılacak TAKBİS sorgusunda farklı sonuç çıkması durumunda limitiniz veya BSMV tutarınız değişiklik gösterebilir." Sorular tek tek ve cevaba göre sorulur: (1) ‘Hasarlı’ tipi dışında bir gayrimenkulün var mı? (2) Eşinin ya da çocuğunun ‘hasarlı’ tipi dışında bir gayrimenkulü var mı? (3) Gayrimenkuldeki hisse oranı yüzde kaç? (yalnızca gerektiğinde). Cevaplar Yok / 1 adet / 2 ve üzeri; hisse oranı yüzde olarak yazılır ya da hızlı seçilir. Bir cevap değişince artık geçerli olmayan cevaplar silinir ve sonuç yeniden hesaplanır. **Sonuç ekranı sadedir:** cevaplar ve yalnızca sorgu bilgisi gösterilir — "Müşteri ve müşterinin aile fertlerine TAKBİS sorgusu yapılacaktır." (sorgu kapsamı herkese), "Müşteriye TAKBİS sorgusu yapılacaktır." (yalnızca müşteriye) ya da "TAKBİS sorgusu gerekmemektedir." BSMV, LTV ve case sonucu müşteriye gösterilmez; sistemde hesaplanmaya ve simülasyonda kullanılmaya devam eder. **Marketplace'e Geç** ile ana ekrana gidilir, bilgiler başvuruda tekrar sorulmaz.

  Karar tablosu (sistem içinde; müşteriye gösterilmez):

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

  Kurallar: müşterinin kendi evi varsa BSMV var. Müşteride ve eşinde / çocuğunda ev yoksa ya da tek ev ve hisse %50'nin altındaysa LTV yüksek, diğer durumlarda düşük. LTV yüksekse sorgu herkese; BSMV yok ve LTV düşükse müşteriye; BSMV var ve LTV düşükse N/A. Tabloda olmayan "kendi evi 1 adet, eşinin / çocuğunun 2 ve üzeri" durumu bu kurallarla sonuçlanır (BSMV var, LTV düşük, N/A). **Hisse tam %50** için otomatik sonuç üretilmez, "manuel değerlendirme gerekli" gösterilir; hesaplamalarda temkinli olarak düşük LTV kullanılır.
- **TAKBİS'e bağlı belgeler** (birbirinden bağımsız iki kural): sorgu müşteri ve aile fertlerini kapsıyorsa (kapsam herkese) **Vukuatlı Nüfus Kayıt Belgesi**; müşterinin S1 cevabı "Yok" ise **Konut Sahiplik Beyan Formu** istenir. İkisi birden de istenebilir. Belgeler başvuruda değil, **Kullandırım** ekranının gerekli belgeler bölümünde neden istendikleriyle görünür; **Yükle** ile (simülasyon) yüklenir, durum Yükle → Yüklendi → (şube randevusundan sonra) Onaylandı olarak izlenir.
- **Ev arama:** sıfır / ikinci el, şehir ve ilçe, en az–en çok fiyat, oda sayısı; detaylı filtrelerde konut tipi, brüt m² aralığı ve bina yaşı. Popüler lokasyonlar (ilan sayısı, ortalama m² fiyatı), öne çıkan konutlar, yeni ilanlar.
- **İlanlar:** fotoğraf ve fiyat öne çıkar; başlık, konum, m², oda, bina yaşı, kat, satıcı / emlak ofisi ve örnek aylık taksit. m² fiyatı bölge ortalamasıyla karşılaştırılır. Fiyat, metrekare, m² fiyatı, konum ve yeniliğe göre sıralama, filtre sayfası, favoriler (kalp: boşken içi boş, favoride dolu; Marketplace Taşıt ile ortak bileşen), 3 konuta kadar yan yana karşılaştırma.
- **Konut detayı:** geniş galeri ve küçük resimler (dış görünüm, salon, mutfak, yatak odası, kat planı), fiyat ve m² fiyatı, brüt / net m², oda, bina yaşı, kat, ısıtma ve diğer özellikler, temsilî konum haritası ve yakın çevre, satıcı / emlak ofisi, favori, **Kredi Simülasyonu Yap**.
- **Kredi simülasyonu:** peşinat kaydırıcısı ve hızlı peşinat seçimi, vade 36 / 60 / 96 / 120 ay; aylık taksit, toplam faiz ve toplam geri ödeme anlık güncellenir. Asgari peşinat ve kredi / değer sınırı TAKBİS sonucuna göre belirlenir (en az %25 ya da %50 peşinat; ekranda yalnızca "en fazla %75 / %50" sınırı görünür); BSMV varsa faize eklenir, KKDF alınmaz. **Ödeme kapasitesi yalnızca müşterinin kendi aylık net geliriyle** hesaplanır (müşteri bilgilerinden gelir, simülasyonda değiştirilebilir; borç / gelir oranı, örnek üst sınır %50; aşılırsa başvuru yerine önerilen plan gösterilir), en fazla 3 senaryo karşılaştırması, ödeme planı ve tahmini masraflar (tahsis ücreti, ekspertiz, tapu harcı, DASK).
- **Kredi başvurusu:** sade başvuru ekranı: meslek ve gelir bilgileri (yalnızca meslek, eğitim durumu ve aylık net gelir; buradan da düzenlenebilir), TAKBİS cevapları, sorgu bilgisi ve kullandırımda istenecek belgeler, başvuru özeti ve **Aydınlatma Metni**. TAKBİS bloğundaki **Düzenle** önceki cevaplarla TAKBİS sorularını açar (koşullu soru kuralları aynı); **Kaydet** ile karar ağacı yeniden çalışır: sorgu kapsamı, BSMV, kredi / değer sınırı ve belge gereksinimleri yeniden hesaplanır, peşinat gerekirse yeni sınıra çekilir ve başvuruda neyin değiştiği özetlenir. **Vazgeç** ya da geri ile çıkılırsa önceki cevaplar korunur. Müşteri bilgileri, konut bilgileri ve gerekli belgeler blokları yoktur; kredi sözleşmesi ve ön bilgilendirme onayları başvuruda istenmez (sözleşme kullandırımda, şube randevusunda imzalanır). Aydınlatma metni bağlantıdan görüntülenir; metnin altındaki **Okudum, Onaylıyorum** ya da onay kutusu ile onaylanır. Onay verilmeden **Başvuruyu Tamamla** pasiftir. **Başvuruyu Tamamla** ortak **İşlem Onay pop-up**'ını açar (konut, fiyat, peşinat, kredi, vade ve taksit özeti; **Onayla** / **Vazgeç** — vazgeçince girilen bilgiler korunur). Onaylanınca pop-up kapanır ve ayrı bir ekran açılmadan **aynı başvuru ekranı** "Başvurunuz Alındı" durumuna döner: başvuru no, tarih, güncel durum (Değerlendiriliyor → Ekspertiz sürüyor …), talep edilen kredi, seçilen konut ve sonraki adım. **Başvuru Takibine Geç** ile takibe geçilir.
- **Başvuru takibi:** başvuru no, tarih, durum ve değerlendirme aşaması; ayrı bir aşama bloğu ve belgeler bloğu yoktur, ilerleme üstteki adım göstergesinden izlenir. İlk kredi değerlendirmesi adım adım ilerler; olumlu sonuçlanınca banka ekspertizi başlatır ("ekspertiz bekleniyor"). Ayrı bir nihai onay ekranı yoktur.
- **Ekspertiz:** ekspertizi banka başlatır; müşteriye firma seçimi ya da randevu oluşturma adımı gösterilmez. İlk girişte bankanın oluşturduğu talep, atanan değerleme kuruluşu ve uzmanı, randevu tarihi ve saati, "ekspertiz devam ediyor" durumu. Ekrandan çıkıp başvuru takibine tekrar girildiğinde **doğrudan ekspertiz ekranı** açılır: rapor yüklendi, bankaca incelendi, onaylandı ve ekspertiz aşaması tamamlandı; ekspertiz değeri (8.150.000 TL), krediye uygunluk ve rapor özeti. **Kullandırım Adımlarına Geç** ile doğrudan kullandırıma geçilir.
- **Kullandırım:** ekspertiz onayından sonra açılır. Üstte onaylanan kredi tutarı; süreç göstergesi Kullandırım → Tapu Devri → İpotek. Tamamlanacak işlemler ayrı kartlarda izlenir: **Şube Randevusu** (kullandırım bilgi ve belgelerinin tamamlanması, DASK poliçesinin tamamlanması; gün ve saat seçimi, randevu durumu, sözleşme imzası), **Tapu Devri** (tapu randevusunu ilgili tapu müdürlüğü oluşturur; müşteri tarih ve saat seçmez, randevu bilgisi şube randevusu tamamlanınca kartta görünür, mülkiyetin devri izlenir) ve **İpotek** (Yapı Kredi lehine 1. derece; tesis edilince kredi satıcıya aktarılır, kullandırım dekontu). **Gerekli belgeler** bölümünde yüklenecek belgeler (Yükle), hazır belgeler (kimlik ve gelir bilgisi, satıcının yüklediği tapu fotokopisi, onaylı ekspertiz raporu — "Hazır"), randevuya getirilecekler ve **ödemeler**: yalnızca DASK poliçesi (Allianz Türkiye); tapu harcı uygulamada ödenmez. **Öde** ortak **Ödeme pop-up**'ını DASK açıklaması ve tutarıyla açar (kredi kartında Tek Çekim varsayılan); ödeme başarılı olunca kalem "Ödendi" olur. Şube randevusu belgeler yüklenip DASK ödenmeden tamamlanamaz. Süreç **Konut kredin kullandırıldı** başarı ekranıyla biter.
- **Demo kontrolleri:** kullandırım ekranında randevu günlerine geçer (şube randevusu — ardından tapu müdürlüğü tapu randevusunu oluşturur —, tapu devri; ipotek ardından kendiliğinden tesis edilir); takip, ekspertiz ve kullandırım ekranlarında demoyu sıfırlar (tanıtım, müşteri bilgileri ve TAKBİS cevapları korunur; yüklenen belgeler ve ödemeler silinir). Doğrudan hash ile açılan ekranlarda tanıtım atlanır, müşteri bilgileri ve TAKBİS test verileriyle dolar: `#konut-takip` ilk değerlendirme sürerken, `#konut-ekspertiz` randevusu belirlenmiş ekspertizle, `#konut-ipotek` ekspertizi onaylı başvuruyla (kullandırımın başında), `#konut-tamam` tamamlanmış süreçle açılır.
- İlanlar, emlak ofisleri, değerleme kuruluşu, bölge ortalamaları, faiz, LTV ve BSMV oranları, masraflar, müşteri bilgileri, belgeler ile ekspertiz değeri demo / **örnek** veridir (`app.js` içinde `KN_HOMES`, `KN_SELLERS`, `KN_AVG_M2`, `KN_RATE`, `KN_LTV` — yüksek %75, düşük %50, `KN_BSMV` — %15, `KN_FEES`, `KN_VALUER`, `KN_PROFILE`, `KN_TAHSIS0`, `KN_UPL_DOCS`). Konut görselleri temsilî çizimlerdir; gerçek fotoğraf eklemek için görseller `app/assets/` içine konur ve ilgili ilana `photos: ['assets/…']` yazılır (galeri sırası: dış görünüm, salon, mutfak, yatak odası, kat planı).

### Akıllı İşletme Sermayesi Finansmanı (taslak)
Kredi değil, işletme finansman platformu: işletmenin gelir ve giderlerini izler, Yapı Kredi Akıllı Asistanı ile analiz eder; yalnızca sorunları değil fırsatları da ortaya çıkarır (finansman fırsatları; nakit yönetimi ve birikim önerileri), işletmeye özel teklifleri karşılaştırır ve finansmanı işletmenin mevcut **Çatı Limit**'inden **Kredi Detay → Kullandırım** olarak iki adımda kullandırır; yeni bir kredi başvurusu veya başvuru onayı yoktur. Demo işletme: ABC Teknoloji ve Ticaret A.Ş. (perakende, KOBİ, 19 çalışan; yetkili Zeynep Sanıbelli). Ana sayfadaki aramadan ("işletme", "işletme sermayesi", "ticari", "kobi", "finansman", "nakit akışı", "tedarikçi") ya da `#isletme` ile açılır. Demo tarihi 11 Kasım 2026'dır; veriler 10 Kasım 2026 itibarıyla günceldir. Para hareketleri bankacılık diline uygun olarak **gelir / gider** diye adlandırılır (giriş / çıkış ifadesi kullanılmaz).
- **Test verisi (son 3 ay, Ağustos–Ekim 2026, aylık ortalama):** gelirler POS satışları 1.200.000, sipariş gelirleri 450.000, diğer tahsilatlar 150.000 TL; giderler fatura 300.000, maaş 500.000, tedarikçi 650.000, diğer giderler 100.000 TL. Brief'in test verisinde olmayan **nakit tahsilatlar** için örnek 100.000 TL eklendi; bu yüzden aylık ortalama gelir 1.900.000, gider 1.550.000, net +350.000 TL'dir. Dönem karşılaştırmaları için 24 aylık (Kasım 2024–Ekim 2026) demo seri vardır.
- **İşletme Finansmanı ana ekranı:** işletme adı, analiz dönemi, net nakit akışı ve aylık ortalaması, toplam gelir / gider, net marj; aylık gelir-gider grafiği (gelir turkuaz, gider turuncu, altında aylık net), en güçlü / en zayıf ay; gelirler ve giderler için dağılım çubuğu ve kategori satırları. Belirgin **Yapı Kredi Akıllı Asistanı ile Analiz Et** aksiyonu; analizden sonra sağlık puanı, finansman ihtiyacı, riskli dönem, finansman / yatırım fırsatı sayıları ve **sana özel finansman önerileri** kartları. Devam eden finansman işlemi varsa üstte durumu görünür.
- **Analiz dönemi:** son 1 / 3 / 6 / 12 ay ya da son 12 ay içinden ay aralığı (başlangıç ve bitiş ayına dokunulur, tek ay da seçilebilir). Ana ekran ve hareketler aynı dönemi kullanır.
- **Finansal hareketler:** **Gelirler** / **Giderler** sekmeleri; toplam, işlem adedi, aylık ortalama; gelir-gider karşılaştırma grafiği; kategori kartlarında toplam, işlem adedi, pay ve aylık değişim (dönemin son ayı / önceki ay). **Karşılaştır** açılınca seçilen dönem hemen önceki eşit uzunluktaki dönemle karşılaştırılır (gelir, gider, net ve kategori bazında). Kategoriye dokununca işlem listesi o kategoriye süzülür; liste aylara göre gruplanır, 20'şer işlem açılır.
- **Yapı Kredi Akıllı Asistanı analizi:** gerçek LLM deneyimi gibi tek satır, adım adım değişen "düşünme" metni ve **Analizi Durdur**; ekrandan çıkılsa da sürer, bitince bildirim gelir. Sonuçta doğal dilde özet (kopyala, 👍/👎, "Akıllı Asistan yapay zekâ ile çalışır ve hata yapabilir" uyarısı), finansal sağlık puanı (66/100) ve 4 alt gösterge, gelir-gider dengesi (ortalama gelir/gider, net, oran), nakit akışı eğilimi (son 6 ay + 4 ay tahmin), finansman ihtiyacı (500.000 TL, Aralık başından önce, 6 ay), 120 günlük bakiye tahmini ve **olası nakit açığı dönemleri** (5–14 Aralık en düşük −430.000 TL; 20 Aralık; 5–8 Ocak), finansmanlı senaryo çizgisi (aç / kapa), risk göstergeleri. Özet olumlu gelişmeleri de anlatır (son 12 ayda gelirler %35 arttı, 10/12 ay nakit fazlası; Ocak–Şubat beklenen bakiyenin vadeli mevduat / Sınırsız Hesap'ta değerlendirilmesi, harcama ve ekstre yuvarlama ile birikim).
- **Analiz sonuçları — iki kategori:** **Finansman Fırsatları** (olumsuz durumlar: Aralık nakit açığı, tedarikçi ödeme yoğunluğu, ödeme günlerinin çakışması → işletme sermayesi, tedarikçi finansmanı ve finansman gerektirmeyen öneri; her birinde gerekçe, dayandığı göstergeler ve **Teklifi incele**) ve **Yatırım Fırsatları** — revizyon 8'den itibaren makine, ekipman veya büyüme yatırımı değil, **nakit yönetimi ve birikim** odaklıdır: **Uzun Vadeli Nakit Fazlası → Vadeli Mevduat**, **Kısa Vadeli Nakit Fazlası → Sınırsız Hesap**, **Günlük Birikim → Harcama Yuvarlama** ("Günlük harcamalarınızı yukarı yuvarlayarak aradaki farkı birikime dönüştürebilirsiniz."), **Ekstre Üzerinden Birikim → Ekstre Yuvarlama** ("Kredi kartı ekstrenizi yuvarlayarak düzenli birikim oluşturabilirsiniz."). Her kartta kategori, başlık, kısa açıklama, **Dayanak** (hangi finansal duruma dayandığı), **Avantaj** ve aksiyon butonu; açılan / aktifleşen ürün kartta işaretlenir. Sekmeler ekran yeniden açılmadan değişir. Göstergeler demo veriden hesaplanır (`bfPos()`); oran ve getiriler örnektir, yatırım tavsiyesi değildir.
- **Yatırım fırsatı detayı:** önerinin kategorisi, ürünün kendi bilgileri, dayandığı finansal durum, "Neden bu öneri?", dikkat edilmesi gereken nokta ve diğer öneriler. **Vadeli Mevduat:** tutar (200 / 400 / 600 bin TL) ve vade seçenekleri (32 / 46 / 92 / 181 gün; örnek yıllık brüt faiz `BF_DEP_RATES`), tahmini getiri ve **vade sonunda oluşacak tutar** anında hesaplanır; **Vadeli Mevduat Hesabı Aç** İşlem Onay pop-up'ıyla hesabı açar (mock). **Sınırsız Hesap:** paranın her an erişilebilir olduğu (likidite), örnek günlük / aylık getiri; **Sınırsız Hesap Aç** (mock). **Harcama Yuvarlama / Ekstre Yuvarlama:** yuvarlanan tutarların değerlendirileceği alan seçilir — **Fon**, **Maden** veya **Mevduat** (Sınırsız Hesap) — ve tahmini aylık birikim görünür; **…Aktifleştir** uygulamadaki mevcut **Birikim** özelliğinin başvuru ekranını seçilen yöntem (Harcama Yuvarla / Ekstre Yuvarla) ve alanla açar, kart seçimi ve talimat onayıyla özellik aktifleşir. Aktif plan varsa fırsatta "Aktif · Fon / Maden / Mevduat" ve **Birikimi Yönet** görünür.
- **Kişiselleştirilmiş finansman önerileri:** 5 alternatif, uygunluk puanına göre: kısa vadeli işletme sermayesi (500.000 TL, 6 ay — Akıllı Asistan önerisi), nakit akışı destek finansmanı (600.000 TL limit, kullandıkça faiz), esnek geri ödemeli işletme finansmanı (ilk 2 ay yalnızca faiz), tedarikçi ödeme finansmanı (90 gün, tedarikçiye doğrudan ödeme), fatura ödeme finansmanı. Her kartta ürün adı, kısa açıklama, önerilen tutar, vade, aylık ödeme, tahmini maliyet, geri ödeme, **"Neden bu öneri?"** ve **Öneriyi Seç** butonu (seçilince "Seçildi", tekrar dokununca kaldırılır; en fazla 3). Alttaki buton seçime göre değişir: seçim yokken pasif **"Devam etmek için bir öneri seçin"**, bir öneri seçiliyken **Teklif Detayını Gör** (Kredi Detay), birden fazla seçiliyken **Önerileri Karşılaştır**.
- **Önerileri karşılaştır:** seçilen öneriler yan yana: finansman tutarı, vade, aylık taksit, toplam geri ödeme, finansman maliyeti, aylık faiz oranı, **işletmen için avantajı**, ödeme periyodu, erken ödeme, kullanım alanı, uygunluk; en avantajlı değerler yeşil, Akıllı Asistan yorumu. Üstteki çiplerle öneri eklenip çıkarılır; **Teklifi Seç** o teklifin Kredi Detay ekranını açar.
- **1. aşama — Kredi Detay** (eski Başvuru ekranı; `#isletme-kredi`): başvuru veya onay ekranı değildir; finansman işletmenin mevcut **Çatı Limit**'inden kullanılacağı için yalnızca kullanılacak finansmanın detayı belirlenir. Üstte iki adımlı gösterge (Kredi Detay → Kullandırım) ve seçilen teklif. **Finansman teklifi:** Marketplace Taşıt simülasyonundaki gibi tutar alanı ve **slider**; alt sınır teklifin alt sınırı, üst sınır teklifin üst sınırı ile **kullanılabilir Çatı Limit**'in küçüğü (demo: Çatı Limit 1.500.000 TL, diğer kullanımlar 800.000 TL, kullanılabilir 700.000 TL — `BF_CATI`); sınır dışı tutar uyarıyla sınıra çekilir. Altında Çatı Limit çubuğu: diğer kullanımlar, bu finansmanla kullanılacak tutar, kullanım sonrası kalan. **Geri ödeme planı:** vade seçenekleri, aylık faiz, aylık taksit, toplam faiz + BSMV, tahsis ücreti, finansman maliyeti, toplam geri ödeme ve ilk 3 taksit (**Tümü**); tutar veya vade değişince ekran yeniden açılmadan hesaplanır. **Kredi özeti:** ürün, finansman tutarı, vade, aylık taksit, toplam geri ödeme, **kullanılacak Çatı Limit tutarı**, kalan Çatı Limit, kullandırım hesabı. İşletme / müşteri bilgileri, finansal görünüm, Ön Bilgilendirme Formu ve başvuru ifadeleri kaldırıldı. **Kullandırım Adımına Geç** onay pop-up'ı veya animasyon olmadan doğrudan Kullandırım'ı açar. Kullandırım'dan dönülüp tutar / vade değiştirilirse sözleşmeler yeniden onay bekler.
- **2. aşama — Kullandırım:** Kredi Detay'daki teklif ve tutar kullanılır; belge, belge yükleme ya da bilgi girişi istenmez. Üstte kullandırılacak tutar ve durum, **Finansman özeti** ve **Çatı Limit kullanımı**. Sözleşmeler tek blokta toplanır: **İşletme Finansmanı Sözleşmeleri** (kısa açıklama, onay durumu, **İncele ve Onayla**). Buton Marketplace Taşıt'taki gibi bir pop-up açar: Genel Kredi Sözleşmesi, Finansman Sözleşmesi Eki, Ödeme Planı ve Masraf Bilgilendirmesi listelenir, her biri dokununca içeriğini açar ve her birinin altında "Okudum, onaylıyorum" kutusu vardır; üçü işaretlenince **Sözleşmeleri Onayla** aktifleşir (pop-up her açılışta işaretsiz başlar). Onaylanınca pop-up kapanır, blok "Onaylandı" olur (tarih, onay no) ve **Kullandırımı Tamamla** aktifleşir; öncesinde pasiftir (dokununca bloğa yönlendirir). Butona basılınca onaylar kontrol edilir, kısa kontrol animasyonu oynar, ardından aynı ekranda **Kullandırım tamamlandı**: aktarılan tutar (nakit akışı desteğinde limit tanımlama, tedarikçi finansmanında tedarikçiye ödeme), hesap, işlem no, tarih, ilk ödeme, **kullanılan ve kalan Çatı Limit** (ör. 500.000 TL kullanımla 800.000 → 1.300.000, kalan 200.000 TL); **Finansman Takibine Git**.
- **Finansman takibi:** kullandırımdan sonra: işlem no, işlem tarihi, finansman, durum, Çatı Limit (kullanılan / kalan); 3 adımlı ilerleme (Kredi Detay → Kullandırım → Geri ödeme), kullanılan tutar, kalan anapara, sıradaki ödeme ve geri ödeme planı (ödendi / sıradaki / bekliyor), bildirimler. Nakit akışı desteğinde **Limitten Kullan**. **Demo kontrolleri:** sonraki ödemeyi yap (1 ay ileri), demoyu sıfırla (analiz korunur, Çatı Limit başlangıç değerine döner).
- **Doğrudan açılan ekranlar:** `#isletme-analiz`, `#isletme-yatirim`, `#isletme-oneriler`, `#isletme-kredi` analiz tamamlanmış halde; `#isletme-karsilastir` 3 öneri seçili; `#isletme-kullandirim` kredi detayı belirlenmiş ve sözleşme onayı bekleyen, `#isletme-takip` kullandırılmış 500.000 TL / 6 ay işletme sermayesiyle açılır. Eski `#isletme-basvuru` bağlantısı Kredi Detay'ı açar.
- İşletme, hareketler, analiz metinleri, tahminler, teklifler ve oranlar demo / **örnek** veridir; gerçek hesap, POS, Akıllı Asistan, teklif veya kredi süreci yoktur (`app.js` içinde `BF_BIZ`, `BF_SERIES`, `BF_FC`, `BF_OFFERS` — faiz oranları örnek, BSMV %5, tahsis ücreti binde 5, güvenlik payı `BF_BUFFER` %15; `BF_CATI` işletme Çatı Limit'i; `BF_DEP_RATES`, `BF_FLEX_RATE` mevduat / Sınırsız Hesap örnek oranları).

### Widget Galerisi
Tüm YK widget çeşitleri tek ana-ekran yüzeyinde: karekod aksiyon kartı, bakiye, Worldpuan, aylık bütçe donut'u, Kartsız ATM, döviz & altın kurları. Karekodlu widget'lar dokununca ödeme akışını açar.

### Birikim hub'ı
Tek "Birikim" girişi altında 4 birikim türü × 3 yöntem matrisi (Harcama Yuvarla, Ekstreden, Maden; Transfer Et yöntemi dahil).

### Ödül Yolu / Harcama Bölüştür / Birlikte Kazan
Benim Dünyam altında level haritalı görev-ödül yolculuğu; FAST tabanlı harcama bölüştürme istekleri; ortak hedefle biriktirip TL ödül kazanılan Birlikte Kazan.

### Çatı Limit (taslak)
500.000 TL'lik tek ortak kredi limiti İhtiyaç Kredisi, Taşıt Kredisi ve Esnek Hesap (KMH) arasında dağıtılır. Soldaki menü → **Krediler**'den ya da ana sayfadaki aramadan ("çatı", "limit") açılır. Özelliğin eski adı Sky Limit'ti; eski `#sky-limit…` bağlantıları da Çatı Limit'i açar.
- **Ana ekran:** toplam / kullanılan / kullanılabilir limit, ürün bazında dağılım çubuğu (koyu: kullanılan, açık: kullanılabilir), **yaklaşan taksit 20.000 TL** (İhtiyaç Kredisi, 10 Kasım), son ödemeler ve açılan limitler.
- **Taksit ödemesi → yeni limit:** yaklaşan taksitte **Öde** ortak **Hesaptan Ödeme pop-up**'ını 20.000 TL ile açar; hesap seçilip **Ödemeyi Onayla** ile ödenir ve seçilen hesabın bakiyesi 20.000 TL azalır (yalnızca ödeme yöntemi değişti; iş kuralları aynı). Ödeme başarılı olunca İhtiyaç Kredisi borcu 20.000 TL azalır ve aynı tutar **yeni limit** olarak ana Çatı Limit'e eklenir: **500.000 → 520.000 TL** (limit artışı yalnızca onaylanan ödemeden sonra olur, taksit ikinci kez ödenmez). Sonuç ekranında yeni açılan limit, Toplam Çatı Limit (sayaçla 520.000 TL) ve ana limitte kalan (dağıtılabilir) 20.000 TL gösterilir. Ana ekrana dönünce toplam 520.000 TL, "+20.000 TL yeni limit eklendi" ve "Dağıtılmamış limit 20.000 TL" görünür; taksit kartı "ödendi"ye döner (sıradaki 10 Aralık).
- **Limiti Başka Ürüne Aktar / limit dağılımı:** kaydırarak, +/− ile ya da tutar yazarak dağıtım; dağıtılabilir toplam limit Çatı Limit'in tamamıdır (ödemeden sonra 520.000 TL). Bir ürüne verilen limit **ana limitte kalan** tutardan düşer, bir üründen azaltılan limit ana limite geri eklenir; bir ürünün limiti kullanılan tutarın altına inemez, dağıtılan toplam 520.000 TL'yi aşamaz (uyarı çıkar). Onaylanan dağılım ana ekranda ve ürün satırlarında hemen görünür.
- **Onay → sonuç:** önceki / yeni dağılım, ürün bazında değişiklikler, işlem özeti (dağıtılabilir toplam, ürünlere dağıtılan, ana limitte kalan); Vazgeç değişikliği iptal eder.
- **Senaryo geçicidir:** uygulama her yeniden açıldığında (sayfa yenilenince ya da tarayıcı uygulamayı önbellekten geri getirince) Çatı Limit başlangıç durumuna döner: 500.000 TL, ödenmemiş 20.000 TL taksit, ilk dağılım. Limit artışı ve dağıtımlar kalıcı değildir; sıfırlama yalnızca Çatı Limit'i etkiler (`skyFresh()`, `skyResetScenario()`).
