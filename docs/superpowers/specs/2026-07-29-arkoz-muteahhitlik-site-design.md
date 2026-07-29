# Arkoz Müteahhitlik Tanıtım Sitesi — Onaylı Tasarım

> Durum: **Eren tarafından onaylandı (v2, 2026-07-29)**
> Yayın: github.com/erenucar747-prog/arkoz-muteahhitlik → GitHub Pages
> Stack: Vanilla HTML/CSS/JS, framework yok, build adımı yok

## Amaç
Arkoz Müteahhitlik'in kurumsal tanıtım vitrini: şirket kim, hangi projeleri yapmış/yapıyor, nerede, nasıl ulaşılır. E-ticaret yok, form backend'i yok, KVKK/yasal sayfa yok (CLAUDE.md kuralı).

## Onaylı Kararlar (brainstorming çıktısı)
| Karar | Değer |
|---|---|
| Marka rengi | **#D80100** kırmızı (mevcut Arkoz kimliği) |
| Sayfa sayısı | **4** — proje metinleri 35–55 kelime olduğu için detay sayfaları açılmadı (Eren kuralı) |
| Marka adı | Sitede her yerde **"Arkoz Müteahhitlik"** — "Dış Ticaret" hiçbir görünür metinde geçmeyecek |
| İletişim | +90 216 466 16 10 · info@arkozdisticaret.com.tr · adres + Google Maps embed. WhatsApp/sosyal medya YOK |
| Belgeler bölümü | Şimdilik YOK — belge no gelirse tek commit'le eklenecek |
| Görsel kuralı | **Sadece net görseller.** 330×230 galeri görselleri kullanılmayacak. Binary kopya, yeniden sıkıştırma yok |
| Fabrika görseli | KESİNLİKLE YOK (Ağrı Çimento, Gazbeton tesisi vb. elendi) |

## Sayfalar

### index.html
1. **Hero:** ARSİM `aerial-day.jpg` (1920×1357) tam genişlik + koyu degrade overlay · H1 "Arkoz Müteahhitlik" · slogan "Girişimci, Yenilikçi ve Öncüyüz" · 2 CTA: "Projelerimiz" (kırmızı dolu) + "İletişim" (kontur)
2. **Tanıtım:** Hakkımızda özeti (2 paragraf, Müteahhitlik uyarlamalı) + iş merkezi fotoğrafı (1DC03969.png)
3. **Projeler vitrini:** 4 proje kartı (ARSİM ilk) → projeler.html
4. **CTA bandı:** kırmızı zemin · "Bilgi Hattı +90 216 466 16 10" · "Bize Ulaşın" butonu

### kurumsal.html
- Tam Hakkımızda metni (~280 kelime; kaynak: mevcut site, marka adı uyarlanmış)
- **Değerlerimiz** — 4 kart: Birlikte üretmenin gücü / Girişimci-yenilikçi-öncü / Ülke ve toplum için değer / Sürdürülebilirlik
- Sloganlar: "İnsanlar için İnsanlar hakkında düşünmek" · "Maliyetin üstüne çıkmamak, zamanı uzatmamak"
- İş merkezi görseli

### projeler.html — 4 proje, tam genişlik bölümler
| Sıra | Proje | Künye | Görseller |
|---|---|---|---|
| 1 | **ARSİM Yalı Zeytinburnu** | Sümer Mah. kentsel dönüşüm alanı, Zeytinburnu/İstanbul · 6 konut + 1 ofis bloğu · 1.983 daire · daire tipleri tablosu (1+1 366×55,55m² / 2+1 329×72,80m² / 2+1 AM 877×96,70m² / 2+1 dubleks 82×110,60m² / 3+1 329×120,45m²) · yeşil avlular, çatı bahçeleri, ticari zemin, yürüyüş promenadı | 8 render, 1920×1357 |
| 2 | Green Diamond | 70.000 m² yaşam kompleksi, Avrupa standartları | green-big.jpg 1170×530 |
| 3 | Green Budapeşt | Tiflis merkez · 11.700 m² · 350 daire · 2014 başlangıç | buda-big.jpg 1170×530 |
| 4 | Elit | Nahçıvan merkez · 3 blok (15+10+10 kat) · 170 daire · 2008–2010, tamamlandı | elit-big.jpg 1170×530 |

Her bölüm: büyük görsel + künye tablosu + açıklama paragrafı. ARSİM bölümünde ek mini galeri (renderlar 1920px olduğu için lightbox SERBEST).

### iletisim.html
- Adres kartı: Şerifali Mah. Türker Cad. No:35 Arkoz İş Merkezi, Ümraniye/İstanbul
- `tel:` linkli telefon, `mailto:` linkli e-posta
- Google Maps iframe (koordinat: 40.99829, 29.14979 — mevcut siteden embed URL)

## Marka / Logo
- `logo.svg` (812×209 viewBox, 16 path): path 1–5 = ARKOZ harfleri, 6–10 = altıgen işaret, **11–16 = "DIŞ TİCARET" alt yazısı → ÇIKARILACAK**
- Yerine "MÜTEAHHİTLİK" — Work Sans, kırmızı #D80100, harf aralıklı (orijinal hiyerarşiyi taklit eder)
- Font: **Work Sans** (Google Fonts, ağırlıklar 300–800 arası ihtiyaca göre)
- Nötr renkler: koyu metin #333029 · gövde #84827C · krem zemin #F6F2EB · koyu zemin #252525

## Teknik Mimari
```
index.html  kurumsal.html  projeler.html  iletisim.html
css/style.css          — tek dosya, BEM, CSS değişkenleri :root'ta
js/main.js             — mobil menü, scroll header, IntersectionObserver reveal, lightbox (yalnız ARSİM)
assets/marka/          — logo işlenmiş SVG + iş merkezi
assets/projeler/       — 3 big + arsim/ 8 render
```
- Responsive kırılımlar: **390 / 768 / 1440**
- Erişilebilirlik: semantik etiketler, alt metinleri, `aria-label`, klavye ile gezilebilir menü, kontrast ≥ 4.5:1
- Performans: `loading="lazy"` (hero hariç), `defer` script, `transform/opacity` animasyon, `prefers-reduced-motion` desteği

## Güvenlik Kuralları (Eren talebi: "kod güvenli ve düzgün")
- Inline event handler yok, `eval`/`innerHTML` ile kullanıcı verisi yok (statik site — girdi yüzeyi zaten yok)
- Dış link: `rel="noopener noreferrer"` — tek dış kaynak Google Maps iframe + Google Fonts
- API anahtarı / gizli bilgi kod içinde YOK (geçmiş Arkoz kuralı)
- `git add -A` yasak, `--no-verify` yasak, force-push yasak

## İçerik Kaynakları (uydurma yok)
| İçerik | Kaynak |
|---|---|
| Hakkımızda + Değerler | arkoz.wscp.net/hakkimizda (birebir, marka adı uyarlanır) |
| 3 eski proje metni | arkoz.wscp.net/projelerimiz/* (birebir) |
| ARSİM verileri | arsim-three.vercel.app (Eren yönlendirdi) |
| İletişim | arkoz.wscp.net/iletisim (Eren onayıyla aynen) |

⚠️ Not: arsim sitesi geliştirici olarak "MAQRO Construction & SİMTAY İnşaat" yazıyor; Eren'in talimatıyla sitede Arkoz Müteahhitlik projesi olarak sunulacak.
⚠️ "Gürcistan'da 9 yıldır (2013'ten bu yana)" ifadesi eski metinden — sitede "2013'ten bu yana" biçiminde kullanılacak, "9 yıl" sabit sayısı KULLANILMAYACAK (2026'da yanlış).

## Test / Tamamlanma Kriterleri (Faz 5)
1. Playwright: 390 / 768 / 1440 tam sayfa ekran görüntüleri — dördü de sayfa başına
2. Görüntüler Read ile bizzat incelenecek: taşma, kırık görsel, bulanıklık kontrolü
3. Console'da 0 hata · tüm iç linkler çalışıyor · tel/mailto doğru
4. Görsel netlik kontrolü: her görsel kendi doğal boyutunun üzerine ölçeklenmiyor
5. `verification-before-completion`: kanıtsız "bitti" denmeyecek

## Yayın
Her faz = 1 Conventional Commit → `git push origin main` (otomatik, onay sorulmaz). GitHub Pages `main` kökünden yayınlıyor; ilk push'tan sonra site https://erenucar747-prog.github.io/arkoz-muteahhitlik/ adresinde.
