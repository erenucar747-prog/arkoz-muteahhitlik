# Arkoz Müteahhitlik — Araştırma Notları

> **Durum:** Bilgi toplama aşaması. Site henüz yapılmıyor.
> **Tarih:** 2026-07-28
> **Kaynak:** 3 bağımsız araştırma ajanı, birincil kaynaklardan (mevzuat.gov.tr, Resmî Gazete, kurum siteleri) doğrulanmış.

⚠️ **KURAL:** Bu dosyada "DOĞRULANMADI" olarak işaretlenen hiçbir bilgi siteye konulmayacak. Reklam Kurulu 2026'nın ilk 7 ayında yanıltıcı reklam için 185M TL ceza kesti.

---

## 1. Rakip Analizi — Ana Stratejik Bulgu

14 gerçek rakip site incelendi (Ümraniye/İstanbul müteahhit + geliştirici).

### Hiçbir rakipte olmayan güven sinyalleri

| Güven sinyali | Rakiplerde |
|---|---|
| **Müteahhitlik Yetki Belge Numarası** | **0 / 14** |
| Dernek üyeliği (TMB/İNDER/KONUTDER/GYODER) | **0 / 14** |
| Doğrulanabilir ISO belgesi | **0 / 14** |
| Ekip / kurucu fotoğrafı | **0 / 14** |
| Arsa/bina değer hesaplayıcı | **0 / 14** |
| Mahalle bazlı içerik sayfası | **0 / 14** |
| Banka / finansman ortağı | **0 / 14** |
| KVKK onayı olan form | 4 / 14 |
| Müşteri yorumu (testimonial) | 1 / 14 |
| Kurumsal müşteri logosu | 1 / 14 (Aksa: TOKİ, KGM, 2 belediye) |

**Rakiplerin kullandığı tek sinyal: "X yıldır sektörde" — 13/14.** Yeni bir şirket bunu kullanamaz.

**→ FIRSAT:** Yetki belge numarasını + grup harfini + e-Devlet'ten nasıl doğrulanacağını yayınlamak **sektörde ilk** olur. Sicili olmayan bir şirket için doğrulanabilir belge, iddia edilen tecrübeden daha güçlüdür.

**İronik detay:** Tektaş Kentsel Dönüşüm sitesinde `/muteahhit-sorgulama` sayfası var — ziyaretçiye "müteahhidini sorgula" diyor, ama kendi belge numarasını yayınlamıyor.

### İki farklı site arketipi

**Müteahhit arketipi** (arsa/daire sahibine *süreç* satar):
Global Proje İnşaat · Aygünler (kentseldonus.com) · Tektaş · Aksa İnşaat Yapı · Ayazoğlu · Reyapı · Anıl İnşaat · Everans Yapı (*merkezi Ümraniye Tepeüstü*)
Nav: Hizmetler → Süreç/Rehber → Bölgeler → Teklif Al

**Geliştirici arketipi** (alıcıya *bitmiş daire* satar):
Sur Yapı · Nef · Ege Yapı · Dumankaya · Sinpaş · Ege Grup Yapı
Nav: Kurumsal → Projeler → Basın Odası → Kariyer

### Sayfa sıklıkları (n=14)
Hakkımızda 14 · İletişim 14 · Projeler 11 · Blog 10 · Hizmetler 6 · KVKK footer 6 · Basında Biz 5 · "Ücretsiz Teklif" CTA 4 · İlçe sayfaları 3 · Referanslar 1

Anasayfa: hero slider ~10 · proje grid ~9 · "Neden Biz" 7 · adım adım süreç 4/8 · lead form 5 · SSS 4 · sayaç 3

### Diğer boşluklar
- **Bloglar 10/14 var ama %100 genel** — tek bir yazı bile belirli mahalle/sokak/projeye bağlı değil
- İlçe bazlı sayfa sadece 3/14. **Benchmark: Global Proje** — 12 gerçek `/hizmet-bolgeleri/{ilçe}` sayfası, Ümraniye dahil
- **Mahalle bazlı sayfa: 0/14**
- En iyi form: Aygünler 3 adımlı — İlçe/Mahalle/Ada-Parsel + **E-İmar PDF yükleme** + bina yaşı → hizmet türü → iletişim
- Site kırılganlığı yaygın: denenen ~20 siteden 1 domain askıya alınmış, 1 anasayfa 404 (ozanli.com — Ümraniye firması), 1 DNS ölü, 2 site (atakurinsaat.com, kentsel-donusum.net) crawler'a 403 dönüyor

---

## 2. Ümraniye — Pazar Verileri

### Demografi
- **Nüfus 728.913** (2025) — İstanbul'un **4. en kalabalık ilçesi** · yıllık artış ~%0,15
- **46 km²**, yoğunluk ~15.500/km²
- **35 mahalle** (belediye + Vikipedi) — ⚠️ İBB sayfası 38 diyor, çelişki çözülmedi
- 1963 belediye, **1987 ilçe** → yapı stoku ağırlıklı 1980'ler-90'lar gecekondu/ıslah-imar dokusu

### Yapı stoku — ticari açıdan en önemli veri
| Yapım dönemi | Bina | Oran |
|---|---|---|
| 1980 öncesi | 5.448 | %10 |
| 1980–2000 | 28.279 | **%54** |
| 2000 sonrası | 18.885 | %36 |

**33.727 bina (~2/3) 2000 öncesi** — yani modern deprem yönetmeliğinden önce.
*Kaynak: İBB / Kandilli "Ümraniye Olası Deprem Kayıp Tahminleri"*

Mw 7.5 senaryosu: 105 çok ağır + 534 ağır hasarlı bina, 3.626 orta, 10.656 hafif; 42 ölüm.
En yüksek hasar beklenen mahalleler: **Cemil Meriç, Necip Fazıl**

### Kentsel dönüşüm (Başkan İsmet Yıldırım, 28.07.2025)
- 2014–2025: **3.812 riskli yapı** tespit (~19.000 bağımsız bölüm)
- **3.538 yıkıldı** · **2.342 yeni yapı ruhsatı**
- 9.324 bina / 34.890 bağımsız bölüm doğrudan dönüşüm projeleri içinde (toplam ~56.000 bina)
- ~74,77 milyon TL kira yardımı (4 yılda)

**Öncelikli mahalleler:** Topağacı, Hekimbaşı, İnkılap, Dumlupınar, Kazım Karabekir, İstiklal, Adem Yavuz, Aşağı/Yukarı Dudullu, Huzur, Cemil Meriç, Ihlamurkuyu, Tepeüstü, Parseller

**İki makro bölge:**
- **Karabekir** — 2.780.307 m², 6 proje alanı, ~630 etap, ~**61.350** planlanan bağımsız bölüm
- **Dudullu** — ~250 etap, ~**22.650** planlanan bağımsız bölüm

**Bayrak projeler:**
- **Topağacı** — temel 17.03.2024; 53.154 m², 174 bina yıkıldı, **1.174 konut**, 109.518 m² satılabilir, 426 hak sahibi. Muvafakat %67 (yasal eşik %51)
- **Hekimbaşı** — 101 parselde 111 riskli bina yıkıldı; 18 blok, **591 konut + 28 ticari** = 619 birim (teslim Nisan 2026)
- **Elmalıkent** — 62.503 m² riskli alan ilanı (Kasım 2020) ⚠️ **17.11.2021'de idare mahkemesi iptal etti** (teknik inceleme eksikliği). Dikkatli yazılmalı.

### Ümraniye'nin kullanılmayan avantajları (hiçbir rakip sitede yok)
- **İstanbul Finans Merkezi Ümraniye'de** — resmî adres: Finanskent Mahallesi Finans Caddesi No: 46/3, Ümraniye/İstanbul (ifm.gov.tr)
- **M12 Göztepe–Ümraniye metrosu** — 13 km, sürücüsüz; istasyonlar: Finans Merkezi, Site, Atakent, Çarşı, SBÜ Hastanesi, Kazım Karabekir
- **Dudullu OSB** — 265 ha, 296 parsel, 145 fabrika, 15.287 çalışan; ayrıca 12 sanayi sitesi, ~5.360 işletme, 24.336 çalışan
- Emlak Konut GYO Tepeüstü/İnkılap arsa ihalesi (23.379 m², emsal 1,50) — Haziran 2026'da yeniden ihalede

### "Yarısı Bizden" (Cumhurbaşkanı kararı 22.02.2024, 39 ilçe)
| | Hibe | Kredi | Taşınma | Toplam |
|---|---|---|---|---|
| Konut (1.) | 875.000 TL | 875.000 TL | 125.000 TL | **1.875.000 TL** |
| İş yeri (1.) | 437.500 TL | 437.500 TL | — | 875.000 TL |

%30/%30/%30/%10 hakediş bazlı ödeme · geri ödeme ruhsattan 2 yıl sonra başlar, 10 yıl vade, ilk yıl faizsiz
⚠️ **Son tarih: 31.12.2026'ya kadar riskli yapı belgesi alanlar.** Belediyenin Ekim 2024 sayfası eski 700.000 TL rakamlarını gösteriyor — 2025+ rakamları kullan.

### Fiyat verisi (sadece bu güvenilir)
TCMB Konut Fiyat Endeksi Nisan 2026: ülke +%1,8 aylık, **+%26,6 yıllık nominal, −%4,3 reel**; İstanbul +%26,2 nominal. Yeni kiracı kira endeksi İstanbul +%36,2.
Türkiye 2026 Ç1 ruhsat: bina +%19,6, daire +%37,0

**Bakan Murat Kurum (08.05.2025):** İstanbul'da 8.070.000 konut, **3.393.000'i 2000 ve öncesi**, **600.000'i acil dönüşüm gerektiriyor**

---

## 3. Müteahhitlik Belgesi — ŞANTİYE-M (eski adı YAMBİS)

**Yönetmelik:** Yapı Müteahhitlerinin Sınıflandırılması ve Kayıtlarının Tutulması Hakkında Yönetmelik, RG **02.03.2019 / 30702**, yürürlük 02.06.2019. Dayanak: 3194 İmar Kanunu md. 28/8, 42, 44.

⚠️ **İSİM DEĞİŞİKLİĞİ:** 26.12.2024 / RG 32764 ile **"YAMBİS" → "ŞANTİYE-M"** (Müteahhitlik, Şantiye Şefliği ve Yetki Belgeli Yapı Ustaları Bilişim Sistemi). Sitede "Yapı Müteahhitliği Yetki Belge Numarası" yazılmalı; YAMBİS artık eski ad.

**15 grup:** A, B, B1, C, C1, D, D1, E, E1, F, F1, G, G1, H + geçici grup. A sınırsız; her alt grup üstlenebileceği yapı yaklaşık maliyetinde sınırlı.

**Şartlar** gruba göre değişir: iş deneyimi, usta + teknik personel sayısı (A grubu: 50+ usta, 8+ teknik personel; G1: 1+/1+), mali oranlar — **cari oran ≥ 0,75**, **öz kaynak oranı ≥ 0,15**, kısa vadeli banka borcu/öz kaynak < 0,75. **G, G1, H grupları mali yeterlilikten muaf.**
Belge geçerliliği **5 yıl**; yenilenmezse H grubuna düşer. Yeşil sertifikalı projeler iş deneyiminde %5 primli sayılır.

**Zorunlu kullanım — hukuken bağlayıcı cümle:**
> "Her müteahhidin yetki belgesi numarası alması esastır. Bu numaranın **yapı ruhsatında, yapı kullanma izin belgesinde ve yapım işleri sözleşmelerinde** kullanılması zorunludur."

Kamu yapım ihalelerinde de zorunlu yeterlik kriteri (Kamu İhale Genel Tebliği 53.4) — teklif açılışında, karardan önce ve imzada kontrol edilir.

**Doğrulama:** e-Devlet "Müteahhit Bilgileri Sorgulama" — turkiye.gov.tr/csb-muteahhit-bilgileri-sorgulama
⚠️ e-Devlet girişi gerektirir, siteden anonim deep-link yapılamaz. Eski `yambis.csb.gov.tr` artık çözümlenmiyor.

---

## 4. Kat Karşılığı İnşaat

**Hukuki nitelik:** karma/çifte tipli sözleşme — *eser sözleşmesi* (TBK 470 vd.) + *taşınmaz satış vaadi*

### ⭐ En kritik ticari bilgi: ŞEKİL ŞARTI
**Noterde "düzenleme şeklinde" yapılmalıdır.** Dayanak: TMK md. 706, TBK md. 237, Tapu Kanunu md. 26, Noterlik Kanunu md. 60 ve 89.

**İmza tasdiki YETERLİ DEĞİL** — noterin düzenlediği senet olmalı. Adi yazılı sözleşme **kesin hükümsüz (void)**.

*İstisna:* TMK md. 2 (dürüstlük kuralı) — ifa büyük ölçüde gerçekleşmişse şekil eksikliği ileri sürülemez.
Yargıtay 15. HD 14.05.1990 (989/4811-990/2181): noter *düzenlemesi* gerekir, imza tasdiki değil.
Yargıtay 15. HD 20.11.1986 (986/266-3930): karşılıklı kısmi ifa, geçersizlik iddiasını engeller.
Yargıtay 23. HD 2016/2342: arsa payı karşılığı sözleşmeler **Tüketici Kanunu dışında** — arsa sahibi "tüketici" değil.

### Arsa sahibinin talep etmesi önerilen korumalar
- **Teminat** — banka teminat mektubu ve/veya müteahhide devredilen paylar üzerine **arsa sahibi lehine ipotek**
- **Kademeli arsa payı devri** — tapu inşaat ilerlemesine bağlı devredilir, peşin değil
- **Cezai şart** — gecikme için, gerçekçi seviyede (mahkemeler fahiş cezaları indirir) ve **karşılıklı** (İNDER eşitlik ilkesini vurguluyor)
- Açık **teslim süresi** · **iskân/yapı kullanma izni** yükümlülüğü müteahhitte · inşaat süresince **kira yardımı**
- **Net/brüt m²** tanımı · **mahal listesi / teknik şartname** ek olarak
- Satış vaadinin tapuya **şerhi**
- Teminatlar **noter ihtarnamesi** ile talep edilmeli

### Paylaşım oranları (⚠️ bağlayıcı değil, gösterge)
| Bölge tipi | Arsa sahibi | Müteahhit |
|---|---|---|
| Yüksek talepli metropol merkez | %60–70 | %30–40 |
| Orta yoğunluklu kentsel | %55–65 | %35–45 |
| Düşük talepli | %45–55 | %45–55 |

Belirleyiciler: arsa değeri, emsal ve parsel birleştirme potansiyeli, inşaat maliyeti, zemin koşulları, ticari alan payı, finansman yükü.
⚠️ **Ümraniye'ye özel kamuya açık oran verisi YOK.**

### İNDER "Müteahhit Seçme Rehberi" — arsa sahibinin kontrol listesi
17 sayfa · Dr. Gülcemal Alhanlıoğlu, Av. Ali Güvenç Kiraz, İnş. Müh. Ayten Babaoğlu, Y. İnş. Müh. Çağdaş Aygün · önsöz: başkan Engin Keçeli, 6 Şubat 2023 depremine atıfla
[PDF](https://www.inder.org.tr/uploads/files/pages/muteahhit-secme-rehberi-11.pdf)

**Soru 11 — arsa sahibi neyi doğrulamalı:**
1. Müteahhidin **Müteahhitlik Yetki Belgesi** var mı (yambis.csb.gov.tr'den sorgula)
2. Geçmiş hukuki sorunlar, mali sorunlar, ihtilaflar
3. **Sigorta poliçeleri ve teminat mektupları**
4. Taşeron/tedarikçi ilişkilerinin sağlığı
5. İSG ve çevre uyumu

**Soru 12 — en sık yapılan hatalar:**
- Sadece teklif edilen m²'ye bakarak karar vermek
- İşçilik ve malzeme pahasına m² fiyatı odaklı seçim
- Sözleşme detayını atlamak — **özellikle kapsam, inşaat ruhsatının alınması, tamamlama ve iskân süreleri**, program ve değişiklik yönetimi
- Belgeleri doğrulamamak · zayıf iletişim
→ Avukat + teknik danışman tutulması öneriliyor

**Soru 15 — arsa sahibinin isteyebileceği teminatlar (ticari olarak çok kullanışlı):**
| Teminat | Tipik oran |
|---|---|
| Performans (kesin teminat) | işin bedelinin **%10**'u |
| Avans teminat mektubu | *(müteahhidin işi bırakması / iflası için)* |
| Sözleşme teminat mektupları | inşaat maliyetinin **%10–20**'si, başlangıçtan **iskâna kadar** tutulur |
| **İnşaat Teminat İpoteği** | müteahhidin kat karşılığı aldığı daire/dükkânlar üzerine |
| Kurumsal kefil | — |

⚠️ İNDER'e göre: 6306 riskli yapı şerhli parsellerde belediyeler **ruhsat aşamasında toplam inşaat maliyetinin %10'unu** teminat/nakit olarak, **arsa sahipleri adına** istiyor; müteahhide **ancak iskândan sonra** iade ediliyor.
*(Bu iddianın 6306 Uygulama Yönetmeliği'ndeki dayanak maddesi bulunamadı — teyit edilmeli.)*

**Soru 14:** Belge numarasını Bakanlık/belediye sorgu servisinden doğrula, meslek örgütlerine (İNDER) sor, teknik ekiple tanış, ekipman listesi iste.

### 6306 md. 6(13) — müteahhidin kendi payını satması sınırlı
Özel kişilerce yapılan uygulamalarda müteahhidin **kendi payına düşen bağımsız bölümleri satması yalnızca inşaat seviyesine göre ve idarenin izniyle** mümkün. İdare tamamlanma oranını (yerinde veya yapı denetim sistemi üzerinden) belirler ve tapuya bildirir; **bu oranın 10 puan altına kadar** olan bağımsız bölümler satılabilir.

---

## 5. Yasal Sorumluluk ve Garanti — DİKKAT

### ⚠️ "15 yıl garanti" iddiası YANLIŞ
İki ayrı rejim var, farklı süreler ve farklı başlangıç tarihleriyle. Tek bir sayıya indirmek **yanıltıcı olur**.

| Rejim | Süre | Başlangıç | Kapsam |
|---|---|---|---|
| **Yapı denetim** (4708 md. 3) | **15 yıl** taşıyıcı sistem / **2 yıl** diğer kısımlar | *yapı kullanma izni* | Müteahhitle **müteselsil**, kusur oranında |
| **Müteahhit** (TBK md. 478) | **5 yıl** taşınmaz yapı / **20 yıl** *ağır kusur* varsa | *teslim tarihi* | Müteahhidin kendi ayıp sorumluluğu |

**TBK md. 478 tam metin (doğrulanmış):**
> "Yüklenici ayıplı bir eser meydana getirmişse, bu sebeple açılacak davalar, teslim tarihinden başlayarak, taşınmaz yapılar dışındaki eserlerde **iki yılın**; taşınmaz yapılarda ise **beş yılın** ve yüklenicinin **ağır kusuru** varsa, ayıplı eserin niteliğine bakılmaksızın **yirmi yılın** geçmesiyle zamanaşımına uğrar."

**→ Dürüst çerçeve: TBK'ya dayan — 5 yıl, ağır kusurda 20 yıl. "15 yıl garanti" YAZMA.**

**TBK md. 475 — arsa sahibinin seçimlik hakları:** sözleşmeden dönme / bedelden indirim / ücretsiz onarım. ⚠️ Ancak: *"Eser, işsahibinin taşınmazı üzerinde yapılmış olup, sökülüp kaldırılması aşırı zarar doğuracaksa işsahibi, sözleşmeden dönme hakkını kullanamaz."* — binalarda dönme pratikte mümkün değil.

### Yapı Denetimi (4708, RG 13.07.2001 / 24461)
- Tüm 81 ilde geçerli — Bakanlar Kurulu Kararı 2010/624 (RG 13.07.2010 / 27640), yürürlük 01.01.2011
- ⚠️ **Muafiyet doğru metni:** *"Bodrum katı dışında en çok iki katlı ve yapı inşaat alanı toplam 200 m²'yi geçmeyen müstakil yapılar"* — "tek bodrum + zemin kat" DEĞİL
- Anti-dolanma: *"Birden fazla müstakil yapının bulunduğu parsellerde, bütün yapıların toplam yapı inşaat alanının 200 m²'yi geçmesi hâlinde de bu Kanun uygulanır."*
- 2023 sonrası: yeni yapılan bina 15 yıl içinde yıkılırsa denetçinin belgesi iptal edilir

### Sigorta
- **DASK zorunlu** — 6305 md. 10. **Tapu işlemleri DASK olmadan yapılamaz** (md. 11/2 — "yapamaz"). Elektrik/su aboneliğinde "kontrol edilir" (md. 11/3) — daha yumuşak ifade, abartılmamalı.
- **İnşaat All Risk (CAR)** — özel işlerde **zorunlu değil** (SEDDK "Zorunlu" listesinde yok). **Kamu ihalelerinde zorunlu** — 4735 md. 9 + Yapım İşleri Genel Şartnamesi md. 9.
  ⚠️ **Üçüncü şahıs mali mesuliyet temel teminatta DEĞİL** — ek sözleşme ile alınır (Genel Şartlar A.3/d).

### İSG (6331, RG 30.06.2012 / 28339)
- İnşaat **"Çok Tehlikeli"** — NACE Rev.2.1 (13.03.2025 / RG 32840 ile güncellendi). 41.00.01–41.00.05, 42.11–42.99, 43.11–43.23 hepsi Çok Tehlikeli.
- **→ A sınıfı iş güvenliği uzmanı zorunlu** (md. 8/5). Doğrulanabilir, siteye konabilir bir kredensiyel.
- 10+ çalışanlı çok tehlikeli işyerinde: iş güvenliği uzmanı + işyeri hekimi + diğer sağlık personeli (md. 6)
- Risk değerlendirmesi zorunlu (md. 10) · İSG maliyeti çalışana yansıtılamaz (md. 4/4)
- **Yapı İşlerinde İSG Yönetmeliği** — RG 05.10.2013 / 28786. Sağlık güvenlik koordinatörü + sağlık güvenlik planı zorunlu (md. 8). Ön bildirim: 30 işgünü + 20 çalışan aşımı veya 500 yevmiye.

### Enerji Kimlik Belgesi (EKB) — iskânın önkoşulu
Binalarda Enerji Performansı Yönetmeliği, RG 05.12.2008 / 27075, **md. 25(4) birebir:**
> "Bu belge, yeni binalar için **yapı kullanma izin belgesi alınması aşamasında** ilgili idarelere sunulur. Enerji Kimlik Belgesi düzenlenmeyen binalara ilgili idarelerce **yapı kullanma izin belgesi verilmez**."

- **10 yıl geçerli** (md. 25/2)
- Bina girişinde **görünür yerde asılı** olmalı (md. 25/6)
- Binanın tamamını kapsamalı (md. 25/8)
- Muafiyet: mücavir alan dışında **1.000 m² altı** binalar ve ruhsatsız yapılar (md. 25/9)

### 6331 md. 22 — İSG Kurulu
**50+ çalışan** ve **6 aydan uzun süreli sürekli iş** yapılan işyerlerinde **İSG kurulu kurulması zorunlu**. Asıl işveren / alt işveren koordinasyon kuralları uygulanır.

### 6502 md. 42 — Bina Tamamlama Sigortası (ön satış yapılırsa)
- md. 40(3): **yapı ruhsatı alınmadan** ön ödemeli satış sözleşmesi yapılamaz
- md. 41: tapuya tescil **veya** noter satış vaadi zorunlu
- **md. 42:** Bakanlıkça belirlenen proje büyüklüğünün üzerinde, satıcı ön satışa başlamadan önce **"bina tamamlama sigortası"** veya Bakanlıkça belirlenen diğer teminatı almak zorunda. ⭐ Bu teminat **iflas/tasfiye masasına dahil edilemez** — alıcı için güçlü koruma
- md. 43: 14 gün cayma hakkı

### ⚠️ DASK ile iskân arasında bağ YOK
6305 sayılı Kanun'da **yapı kullanma izni (iskân) için DASK şartı bulunmuyor.** DASK yalnızca tapu işlemlerine (md. 11/2, "yapamaz") ve elektrik/su aboneliği kontrolüne (md. 11/3, "kontrol edilir") bağlı. Yaygın bir yanlış bilgi — siteye "iskân için DASK gerekir" yazılmamalı.

---

## 6. Reklam ve Tüketici Mevzuatı

**Ticari Reklam ve Haksız Ticari Uygulamalar Yönetmeliği**, RG **10.01.2015 / 29232**
- **md. 7** — reklam **doğru ve dürüst** olmalı; yanıltıcı nitelik iddiaları yasak
- **md. 9 — ispat külfeti:** doğrulanabilir olgusal iddialar, ilgili üniversite bölümleri veya **akredite test kuruluşları** raporuyla kanıtlanmalı; kurum istediğinde belge sunulmalı
- "En iyi", "1 numara" gibi ifadeler ayrıca sayılmamış — md. 7 + md. 9 kapsamında kanıtlanamaz olgusal iddia olarak yakalanır

**→ PRATİK KURAL: Her sayısal veya karşılaştırmalı iddia belgelenebilir olmalı.**

**Reklam Kurulu 2026 ilk 7 ay: 21.000+ dosya, 185 milyon TL'yi aşan idari para cezası.** Emlak firmalarının ilanlarının kaldırılmasına karar verdi.

**Ön ödemeli konut satışı** (bitmeden satış yapılırsa) — RG 27.11.2014 / 29188 + 6502:
- Şekil: kat irtifakı tapuya tescilli yazılı sözleşme **veya** noter düzenleme şeklinde satış vaadi
- **Ön bilgilendirme formu** imzadan en az **1 gün** önce, min. 12 punto (md. 5)
- **Cayma hakkı 14 gün**, sebepsiz, cezasız; iade 14 gün içinde (md. 8)
- **Dönme hakkı** 24 aya kadar; iade **180 gün** içinde
- **30+ konutlu projelerde teminat zorunlu** (md. 12): bina tamamlama sigortası / banka teminat mektubu / hakediş sistemi / bağlı kredi
- **Azami teslim 48 ay** (7392 sayılı Kanun, RG 24.03.2022 ile 36→48). ⚠️ 2014 yönetmelik metni hâlâ "otuz altı ay" diyor — 48 kullan, 6502 md. 44'e dayan.

---

## 7. Dernek Üyelikleri — Gerçekçi Değerlendirme

| Kurum | Engel | Müteahhit için uygunluk |
|---|---|---|
| **ÇEDBİK** (2007, 25 kurucu üye → 100+ üye) | En düşük — yönetim kurulu onayı + aidat | ✅ Üyelik sayfasında **"Müteahhitlik, İnşaat Şirketleri"** açıkça yazılı. World Green Building Council üyesi |
| **İNDER** (1967, ~110 üye) | Düşük — **giriş 7.500 TL + yıllık 3.600 TL**, mevcut üye/YK üyesinden **3 referans**, 30 gün içinde YK kararı, ciro eşiği yok | ✅ Tüzük amacı literally *konut yapı müteahhitliği*. **EN UYGUN — maliyeti de çok düşük.** |
| **GYODER** (1999, ~272 üye) | Orta — **2 üye firmadan referans mektubu** zorunlu | ✅ Gayrimenkul geliştirme yapılıyorsa |
| **İNTES** (1964, ~216 üye) | Bilinmiyor — kriterler yayınlanmamış | Sektör doğru; telefonla sorulmalı (0312 441 43 50) |
| **KONUTDER** (2011, 24 üye) | Bilinmiyor — yayınlanmamış | ⚠️ Fiilen büyük markalı konut geliştiricileri |
| **TMB** (1952, 140 üye) | **Çok yüksek** | ⚠️ Sadece elit kademe — aşağıya bak |
| **İMSAD** (1984) | Orta — 2 referans | 🔴 **YANLIŞ KURUM** — aşağıya bak |

### 🔴 İMSAD — yanıltıcı iddia olur
İMSAD **inşaat MALZEMESİ sanayicileri** derneği. Asil (sanayici) üyelik üretim yapanlara. Müteahhit sadece **Fahri Katılımcı Üye** olabilir (Tüzük md. 7/B) — **oy hakkı yok, yönetim/denetim kuruluna giremez.** Müteahhit sitesinde düz "İMSAD üyesi" yazmak yanıltıcıdır.
*(Not: Arkoz **Gazbeton** — AAC üreticisi olarak — gerçek İMSAD üyeliğine uygun. Müteahhitlik şirketi değil.)*

### TMB — yeni şirket için imkânsız (2026 Üye Kabul Yönetmeliği)
- Mevcut **2 asil üyenin teklifi** (md. 3/g)
- Ölçek: son 10 yılda **9,4 milyar TL** iş **veya** devam eden **4 milyar TL** (md. 4/f, 2026 Ocak güncellemesi)
- **En az 5 yıldır faaliyet** (md. 4/d)
- ISO 9001 / 14001 / OHSAS 18001'den en az biri (md. 4/e)
- Yönetim Kurulu kararı **oybirliği** olmak zorunda (md. 6/A.2)
- **Giriş aidatı 500.000 TL + yıllık 330.000 TL** (2026, md. 9)
- ✅ Doğrulanmış negatif: **"müteahhitlik karnesi" derecesi şart DEĞİL** — ölçek testi tamamen parasal
- Alternatif hafif yol: **Sektörel Paydaşlık**

⚠️ **İNDER isim tutarsızlığı:** Tüzük "İstanbul İnşaatçılar Derneği" diyor, site "İnşaatçılar ve Gayrimenkul Geliştiricileri Derneği" diyor. Güvenli yazım: **"İNDER (İstanbul İnşaatçılar Derneği)"**. 1967 kuruluş yılı sadece sitede var, tüzükte yok.

**→ KURAL: Sahip olunmayan hiçbir üyelik siteye yazılmayacak. Bunlar başvurulacak şeyler, şu an sergilenecek şeyler değil.**

---

## 8. 6306 — Salt Çoğunluk Değişikliği

**7471 sayılı Kanun, RG 09.11.2023 / 32364:**
- **Kentsel Dönüşüm Başkanlığı** kuruldu
- Eski **2/3 çoğunluk → arsa payı bazında salt çoğunluk (%50+1)**
- Katılmayan maliklerin payları rayiç bedelden az olmamak üzere açık artırmayla satılır

**→ Ticari olarak en büyük değişiklik: tek bir malik artık projeyi bloke edemez.** Ümraniye Belediyesi de "%51" olarak teyit ediyor.
⚠️ mevzuat.gov.tr / RG PDF metin olarak render edilemedi — **birebir kanun alıntısı yok**, sadece yorum ve belediye teyidi var.

---

## 9. Çapraz Doğrulama — 4 Ajan Arası Çözülen Çelişkiler

4 bağımsız ajan çalıştı; birinin "doğrulanamadı" dediğini bir diğeri birincil kaynaktan doğruladı. Çözümler:

| Konu | Durum | Çözüm |
|---|---|---|
| **TBK md. 478** (5 yıl / 20 yıl ağır kusur) | ✅ **DOĞRULANDI** | 2 ajan bağımsız olarak mevzuat.gov.tr PDF'inden birebir metni çıkardı |
| **TMB kuruluş + üyelik şartları** | ✅ **DOĞRULANDI** | tmb.org.tr normal fetch'e 403 dönüyor; browser user-agent ile alındı. 2026 Üye Kabul Yönetmeliği PDF'i okundu |
| **ÇEDBİK / GYODER / İMSAD** | ✅ **DOĞRULANDI** | Kuruluş yılları, üye sayıları, üyelik kriterleri kurum sitelerinden alındı |
| **CAR kamu ihalelerinde zorunlu** | ✅ **DOĞRULANDI** | Bir ajan YİGŞ md. 9'u çekemedi; diğeri **4735 md. 9'u mevzuat.gov.tr'den** + YİGŞ'yi csb.gov.tr'den doğruladı. Kanuni dayanak sağlam |
| **İnşaat "Çok Tehlikeli"** | ✅ **DOĞRULANDI** | Bir ajan tebliği çekemedi; diğeri 13.03.2025 / RG 32840 ekini PyMuPDF ile render edip görsel olarak okudu |
| **4708 tüm 81 ilde** | ✅ **DOĞRULANDI** | BKK 2010/624, RG 13.07.2010 / 27640, yürürlük 01.01.2011 |
| **TMB üye sayısı** | ⚠️ Çelişkili | Bir ajan 140, diğeri 136 saydı (28.07.2026). İkisi de kendi sayımı — TMB resmî rakam yayınlamıyor. **"yaklaşık 140" yaz veya sayı verme** |
| **İNDER üyelik şartları** | ⚠️ Kısmen çelişkili | Bir ajan "referans yok" dedi (tüzük md. 3'e dayanarak), diğeri **"3 referans + 7.500 TL giriş + 3.600 TL yıllık"** buldu (yeni-uyelik sayfasından). **Sitedeki güncel bilgi daha güvenilir** |

---

## 10. DOĞRULANMADI — Siteye Konulmayacak

1. **TÜİK resmî Ümraniye 2025 nüfusu** — 728.913 ikincil kaynaklardan; nufusu.com kendini "amatör" tanımlıyor
2. **Mahalle sayısı** — belediye+Vikipedi 35, İBB 38. Çelişki çözülmedi
3. **2026 kira yardımı tutarları** — kaynaklar çelişiyor (9.000–10.500 TL/ay vs sabit 12.000 TL). Resmî Bakanlık rakamı bulunamadı. **Tutar yazma.** Süre (riskli yapıda 18 ay, riskli alanda 48 aya kadar) tutarlı ama resmî değil
4. **Mart 2026 TBDY tebliği** — birden fazla mühendislik sitesi 01.03.2026'da yürürlüğe girdiğini yazıyor (perde duvar, kolon oranı kuralları) ama **Resmî Gazete'de ve mevzuat.gov.tr'de bulunamadı** — hâlâ 17.07.2019 / 30834 görünüyor
5. **6306 md. 6 birebir metni** — salt çoğunluk değişikliği teyitli ama statü alıntısı alınamadı
6. **Grup bazlı m² / TL limitleri** — dolaşan rakamlar (B = ₺1.733.550.000; H ≈ 2.002 m²) ticari danışmanlık sitelerinden. Yetkili kaynak RG 03.02.2026 / 33157 — var olduğu teyitli, içeriği çıkarılmadı
7. **KVKK Çerez Uygulamaları Rehberi** — kvkk.gov.tr içerik döndürmedi. **Form/çerez banner'ı yapmadan önce mutlaka teyit et** (Arkoz uyum bağlamı)
8. **Ümraniye'ye özel m² fiyatları** — "71.648 TL/m²", "55.290 TL/m²" arama snippet'lerinden, sayfada teyit edilemedi. Endeksa JS-gated. **Tek sağlam fiyat verisi TCMB endeksi**
9. **Şantiye tabelası içeriği** — zorunlu alanları listeleyen her kaynak tabela imalatçısının pazarlama sayfası. Planlı Alanlar İmar Yönetmeliği'ndeki dayanak madde bulunamadı. *(Sözleşme/ruhsat kullanım zorunluluğu sağlam kaynaklı, tabela zorunluluğu değil)*
10. **Reklam Kurulu tek ihlal ceza aralığı** — sadece toplam (185M TL / 7 ay) kaynaklı
11. **19 pilot il listesi** — BKK 2010/624 sayı vermiyor, isim saymıyor. "19 pilot il" de, liste verme
12. **21.05.2025 / RG 32906 tebliği** — 3 NACE kodu yeniden sınıflandırdığı iddia ediliyor (hiçbiri inşaat değil), teyit edilmedi

**Metod notu:** WebFetch sunucu render'lı markdown döndürür — rakip sitelerin mobil uyumluluğu, sayfa hızı ve görsel kalitesi **değerlendirilmedi**. Widget sayıları (WhatsApp, JS form) alt sınır.

---

## 11. Arkoz Gazbeton — Mevcut Marka Sistemi (referans)

*Kaynak: C:\Users\ROG\Arkoz\CLAUDE.md*

- **Arkoz Gazbeton** — Havza, Samsun · 450.000 m³ kapasiteli tesis · arkozgazbeton.com.tr
- Ürünler: Arkoz Blok, Asmolen
- **Birincil renk: `#B8A88A`** (krem/bej) · koyu zemin `#0a0a0a`, `#111` · açık zemin `#ffffff`, `#f8f8f8`
- **Font: Inter** (300/400/600/700/900)
- Kartlar `border-radius: 12px` · butonlar `border-radius: 50px`
- **BEM** CSS metodolojisi (`blok__element--modifier`)
- Saf HTML/CSS/JS — framework yok · Three.js r128 (CDN) WebGL shader animasyonları
- Deploy: GitHub Actions → GitHub Pages (`gh-pages` branch)

### ⛔ Arkoz repo'sundan devralınan sert kurallar
- **Animasyonlar, renkler, görsel efektler değiştirilmez** — 2 ayrı oturumda revert ile pekiştirildi
- API anahtarı JS dosyasına yazılmaz
- İstenmeden ek özellik / "iyileştirme" eklenmez

---

## 12. Açık Sorular — Kullanıcıdan Beklenen

- [ ] **Arkoz Holding yapısı** — araştırma devam ediyor. Arkoz Müteahhitlik'in tam yasal ünvanı?
- [ ] **Arkoz İş Merkezi** tam adresi + Google Maps linki
- [ ] **Yetki belge numarası ve grubu** — varsa (sitenin en güçlü kozu)
- [ ] Şirketin kuruluş tarihi / faaliyet süresi
- [ ] Geçmiş projeler (varsa) — ada/parsel, m², birim sayısı, ruhsat/iskân tarihleri
- [ ] Fotoğraflar (kullanıcı gönderecek)
- [ ] Logo / marka dosyaları
- [ ] Hedef kitle: arsa sahibi mi, daire alıcısı mı, kamu ihalesi mi? (site arketipini belirler)
- [ ] Gazbeton ile ilişki: kardeş şirket olarak çapraz link verilecek mi?
