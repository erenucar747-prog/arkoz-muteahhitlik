# Arkoz Müteahhitlik Tanıtım Sitesi — Uygulama Planı

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task (inline, bu oturumda; FAZ 3 sırasında frontend-design + design-taste-frontend skill rehberliği zorunlu). Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Arkoz Müteahhitlik için 4 sayfalık, Swiss-stil, vanilla HTML/CSS/JS kurumsal tanıtım sitesini GitHub Pages'te yayınlamak.

**Architecture:** Statik çok sayfalı site; tek `css/style.css` (BEM + CSS değişkenleri), tek `js/main.js` (menü/scroll/reveal/lightbox), sayfa başına bir HTML. Header/footer her sayfada aynen tekrarlanır (build adımı yok). Görseller binary kopya — yeniden sıkıştırma yok.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, clamp), ES6 (IntersectionObserver), Google Fonts (Work Sans), GitHub Pages.

## Global Constraints (spec'ten — her görevde geçerli)

- Sitede görünür hiçbir yerde **"Dış Ticaret"** geçmeyecek; marka her yerde **"Arkoz Müteahhitlik"** (e-posta adresi istisna: `info@arkozdisticaret.com.tr` — Eren onaylı).
- **Bilgi uydurma YOK.** Tüm metinler ICERIK.md/spec'teki doğrulanmış kaynaklardan. "9 yıldır" gibi sabit yıl sayısı kullanılmaz; "2013'ten bu yana" kullanılır.
- **Sadece net görseller:** arsim/ 8 render (1920×1357), 3 proje big'i (1170×530), iş merkezi (1024×683), SVG logo. 330×230'lar ve `about-style2-image.jpg` (stok) KULLANILMAZ. Fabrika görseli KESİNLİKLE YOK.
- Görseller `<img width height loading="lazy" decoding="async" alt="...">` ile (hero hariç lazy; hero `fetchpriority="high"`). Doğal boyutunun üzerine ölçekleme YOK.
- Renk/font tokenları: `--kirmizi:#D80100 · --murekkep:#333029 · --govde:#55524B · --soluk:#84827C (yalnız ≥18px metin) · --krem:#F6F2EB · --koyu:#252525 · --cizgi:#E5E0D8` · Work Sans 300/400/600/800.
- Erişilebilirlik: kontrast ≥4.5:1, görünür focus, klavye menü, `prefers-reduced-motion`, dokunma hedefi ≥44px.
- Güvenlik: inline event handler yok, `eval` yok, dış linkte `rel="noopener noreferrer"`, API anahtarı yok.
- Git: görev sonunda `git add <dosyalar>` (asla `-A`) + Conventional Commit + `git push origin main`. `--no-verify`/force-push yasak.
- Responsive kırılımlar: **390 / 768 / 1440** (CSS breakpoint'leri: 767px altı mobil, 768–1023 tablet, 1024+ masaüstü).
- KVKK/yasal sayfa, form backend'i, çerez banner'ı YOK (tanıtım sitesi, veri toplamıyor).

## Dosya Haritası

```
index.html            — hero + tanıtım + proje vitrini + CTA bandı
kurumsal.html         — tam hakkımızda + değerler 4 kart
projeler.html         — ARSİM (amiral) + Green Diamond + Green Budapeşt + Elit
iletisim.html         — adres/tel/e-posta + Google Maps
css/style.css         — tokens, base, header/footer, bileşenler, sayfa bölümleri
js/main.js            — mobil menü, scroll header, reveal, ARSİM lightbox
assets/marka/logo-mark.svg        — yalnız altıgen işaret (favicon + süs)
assets/marka/logo-header.svg      — işaret+ARKOZ+MÜTEAHHİTLİK tam kilit (inline de kullanılacak)
assets/projeler/…                 — mevcut (değişmez)
```

---

### Task 1: Logo SVG işleme

**Files:** Create `assets/marka/logo-mark.svg`, `assets/marka/logo-header.svg` · kaynak: `assets/marka/logo.svg` (dokunulmaz)

**Interfaces — Produces:** `logo-header.svg` (viewBox `0 0 812 209`; işaret+ARKOZ path'leri + `<text>MÜTEAHHİTLİK</text>`), `logo-mark.svg` (viewBox işarete kırpık, favicon için).

- [ ] **Step 1:** Python ile `logo.svg`'yi ayrıştır: 16 path'ten alt satır (subtitle) path'lerini tespit et — `d` özniteliği `M` başlangıç Y'si > 130 olanlar (11–16). Bunları çıkar; kalan 10 path (işaret 6–10 + ARKOZ 1–5) `logo-header.svg` gövdesi olur. Path'lere kaynak SVG'deki fill/class değerleri aynen taşınır (fill yoksa `<style>` bloğu aynen kopyalanır).
- [ ] **Step 2:** `logo-header.svg`'ye alt yazıyı ekle:
```xml
<text x="298" y="192" font-family="'Work Sans',Arial,sans-serif" font-weight="700"
      font-size="52" letter-spacing="10" fill="#D80100">MÜTEAHHİTLİK</text>
```
(x/y/size, Eren'in gönderdiği referans logodaki hizaya göre görsel doğrulamada ±ayarlanır — metin ve renk sabittir.)
- [ ] **Step 3:** `logo-mark.svg`: yalnız 6–10 path'leri; viewBox işaret sınırlarına kırp (yaklaşık `0 40 180 155` — render'da doğrulanır).
- [ ] **Step 4 (doğrulama):** Geçici `logo-test.html` yaz (beyaz+koyu zeminde her iki SVG), `python -m http.server` + Playwright screenshot, **Read ile bak**: harfler tam mı, MÜTEAHHİTLİK kırmızı ve hizalı mı, işarette kırpılma var mı. Referans logo görüntüsüyle karşılaştır. Test dosyasını sil.
- [ ] **Step 5:** `git add assets/marka/logo-mark.svg assets/marka/logo-header.svg && git commit -m "feat: Arkoz Müteahhitlik logo kilidi (SVG)" && git push origin main`

### Task 2: CSS temeli + header/footer iskeleti

**Files:** Create `css/style.css`

**Interfaces — Produces:** tüm BEM sınıfları (aşağıda); sayfa görevleri bu sınıfları aynen kullanır.

- [ ] **Step 1:** `css/style.css` — tokens/base/layout (tam içerik):
```css
:root{
  --kirmizi:#D80100; --kirmizi-koyu:#B00100;
  --murekkep:#333029; --govde-renk:#55524B; --soluk:#84827C;
  --krem:#F6F2EB; --koyu:#252525; --cizgi:#E5E0D8; --beyaz:#FFF;
  --font:'Work Sans',system-ui,sans-serif;
  --s1:.5rem; --s2:1rem; --s3:1.5rem; --s4:2.5rem; --s5:4rem; --s6:6rem;
  --genislik:1200px;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font:400 1rem/1.65 var(--font);color:var(--govde-renk);background:var(--beyaz);-webkit-font-smoothing:antialiased}
img{max-width:100%;height:auto;display:block}
a{color:inherit;text-decoration:none}
h1,h2,h3{color:var(--murekkep);line-height:1.12;font-weight:800;letter-spacing:-.02em}
.kapsayici{max-width:var(--genislik);margin-inline:auto;padding-inline:clamp(1.25rem,4vw,2.5rem)}
.bolum{padding-block:clamp(3.5rem,9vw,7rem)}
.bolum--krem{background:var(--krem)}
.ustbaslik{display:inline-flex;align-items:center;gap:.75rem;color:var(--kirmizi);
  font-weight:600;font-size:.8125rem;letter-spacing:.18em;text-transform:uppercase;margin-bottom:var(--s3)}
.ustbaslik::before{content:"";width:2.5rem;height:2px;background:var(--kirmizi)}
.baslik-buyuk{font-size:clamp(2rem,5vw,3.5rem)}
:focus-visible{outline:3px solid var(--kirmizi);outline-offset:3px}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}html{scroll-behavior:auto}}
```
- [ ] **Step 2:** Header/nav/footer sınıfları (tam CSS — plan uzunluğu için özet başlıklar, tam kod bu adımda yazılır): `.header` (sticky, beyaz, alt 1px çizgi; `.header--dolu` scroll durumunda gölge), `.header__logo svg{height:44px}`, `.nav` masaüstü yatay / mobil tam ekran panel (`.nav--acik`), `.nav__link` (aktif sayfada `aria-current="page"` + kırmızı alt çizgi), `.nav__tel` (kırmızı dolu buton, min-height 44px), `.hamburger` (44×44, 3 çizgi → X animasyonu, `aria-expanded`), `.footer` (koyu zemin, 3 kolon: logo-beyaz varyant/adres+tel+mail/nav tekrar; altta `© 2026 Arkoz Müteahhitlik`).
- [ ] **Step 3:** Buton + kart + reveal sınıfları: `.btn`, `.btn--dolu` (kırmızı, hover koyu kırmızı, 150ms), `.btn--kontur`; `.reveal{opacity:0;translate:0 14px;transition:.35s ease-out}` `.reveal--goster{opacity:1;translate:0}`; `.kunye` (tanım tablosu: `display:grid;grid-template-columns:auto 1fr;border-top:2px solid var(--murekkep)` satır çizgili).
- [ ] **Step 4:** Commit: `git add css/style.css && git commit -m "feat: tasarım tokenları + iskelet CSS" && git push origin main`

### Task 3: js/main.js

**Files:** Create `js/main.js`

- [ ] **Step 1:** Tam içerik:
```js
(() => {
  'use strict';
  // Mobil menü
  const btn = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  if (btn && nav) {
    btn.addEventListener('click', () => {
      const acik = nav.classList.toggle('nav--acik');
      btn.setAttribute('aria-expanded', String(acik));
      document.body.classList.toggle('kilitli', acik); // overflow:hidden
    });
    nav.addEventListener('click', e => {
      if (e.target.closest('a')) { nav.classList.remove('nav--acik'); btn.setAttribute('aria-expanded','false'); document.body.classList.remove('kilitli'); }
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && nav.classList.contains('nav--acik')) btn.click();
    });
  }
  // Scroll header
  const header = document.querySelector('.header');
  if (header) {
    const g = () => header.classList.toggle('header--dolu', scrollY > 8);
    g(); addEventListener('scroll', g, { passive: true });
  }
  // Reveal
  const revealler = document.querySelectorAll('.reveal');
  if (revealler.length && 'IntersectionObserver' in window &&
      !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver(girisler => girisler.forEach(g => {
      if (g.isIntersecting) { g.target.classList.add('reveal--goster'); io.unobserve(g.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    revealler.forEach(el => io.observe(el));
  } else revealler.forEach(el => el.classList.add('reveal--goster'));
  // Lightbox (yalnız projeler.html — ARSİM galerisi)
  const galeri = document.querySelector('.galeri');
  const lb = document.querySelector('.lightbox');
  if (galeri && lb) {
    const img = lb.querySelector('.lightbox__resim');
    const kapat = () => { lb.close(); };
    galeri.addEventListener('click', e => {
      const a = e.target.closest('a[data-buyuk]');
      if (!a) return;
      e.preventDefault();
      img.src = a.dataset.buyuk;
      img.alt = a.querySelector('img')?.alt || '';
      lb.showModal();
    });
    lb.addEventListener('click', e => { if (e.target === lb || e.target.closest('.lightbox__kapat')) kapat(); });
  }
})();
```
(`.lightbox` bir `<dialog>` — ESC ücretsiz gelir, odak tuzağı native.)
- [ ] **Step 2 (doğrulama):** Sayfalar hazır olana dek konsolda `node --check js/main.js` ile sözdizimi doğrula.
- [ ] **Step 3:** Commit+push (`feat: temel etkileşimler`).

### Task 4: index.html

**Files:** Create `index.html`

- [ ] **Step 1:** `<head>`: `lang="tr"`, charset, viewport, `<title>Arkoz Müteahhitlik — İnşaat ve Konut Projeleri</title>`, `<meta name="description" content="Arkoz Müteahhitlik: İstanbul Zeytinburnu ARSİM Yalı başta olmak üzere konut ve yaşam projeleri. Girişimci, yenilikçi ve öncüyüz.">`, OG etiketleri (`og:image` = `assets/projeler/arsim/aerial-day.jpg`), favicon `logo-mark.svg`, preconnect + Work Sans linki, `css/style.css`, `<script src="js/main.js" defer>`.
- [ ] **Step 2:** Header (tüm sayfalarda aynı; aktif linkte `aria-current`):
```html
<header class="header">
  <div class="kapsayici header__ic">
    <a class="header__logo" href="index.html" aria-label="Arkoz Müteahhitlik anasayfa"><!-- logo-header.svg INLINE --></a>
    <button class="hamburger" aria-expanded="false" aria-controls="menu" aria-label="Menüyü aç/kapat"><span></span><span></span><span></span></button>
    <nav class="nav" id="menu" aria-label="Ana menü">
      <a class="nav__link" href="index.html" aria-current="page">Anasayfa</a>
      <a class="nav__link" href="kurumsal.html">Kurumsal</a>
      <a class="nav__link" href="projeler.html">Projeler</a>
      <a class="nav__link" href="iletisim.html">İletişim</a>
      <a class="nav__tel btn btn--dolu" href="tel:+902164661610">+90 216 466 16 10</a>
    </nav>
  </div>
</header>
```
- [ ] **Step 3:** Hero (asimetrik Swiss):
```html
<section class="hero">
  <div class="kapsayici hero__izgara">
    <div class="hero__metin">
      <p class="ustbaslik">İstanbul · Tiflis · Nahçıvan</p>
      <h1 class="hero__baslik">Arkoz<br>Müteahhitlik</h1>
      <p class="hero__slogan">Girişimci, Yenilikçi ve Öncüyüz</p>
      <div class="hero__butonlar">
        <a class="btn btn--dolu" href="projeler.html">Projelerimiz</a>
        <a class="btn btn--kontur" href="iletisim.html">İletişim</a>
      </div>
    </div>
    <figure class="hero__gorsel">
      <img src="assets/projeler/arsim/aerial-day.jpg" width="1920" height="1357"
           fetchpriority="high" decoding="async"
           alt="ARSİM Yalı Zeytinburnu konut projesinin havadan görünümü — Marmara kıyısında altı konut bloğu">
    </figure>
  </div>
</section>
```
`.hero__baslik{font-size:clamp(2.75rem,8vw,5.5rem);letter-spacing:-.03em}`; görsel sağda kenara taşar (masaüstü `grid-template-columns:5fr 7fr`; mobilde görsel üstte).
- [ ] **Step 4:** Tanıtım bölümü — `01 / Kurumsal` numaralı Swiss başlık; metin (kaynak: hakkımızda, uyarlanmış):
> "2013'ten bu yana Gürcistan'da faaliyet gösteren Arkoz Müteahhitlik; inşaat, imalat, perakende ve otel sektörlerinde faaliyet gösteren en büyük beş yabancı yatırımcıdan biridir."
> "İnşaat sektörü, grubumuzun en çok odaklandığı lokomotif alandır. Hırslı mühendis ekibimizle küresel pazarda faaliyet gösteriyor, coğrafi kapsamımızı genişletmeye devam ediyoruz."
Yanında iş merkezi görseli (`1DC03969.png` → `assets/marka/is-merkezi.png` olarak kopyalanır, width/height 1024×683, alt: "Arkoz İş Merkezi — Şerifali, Ümraniye"). "Devamı" linki → kurumsal.html.
- [ ] **Step 5:** Proje vitrini — `02 / Projeler`; 4 kart (`.proje-kart`): ARSİM (aerial-marina.jpg) / Green Diamond (green-big) / Green Budapeşt (buda-big) / Elit (elit-big). Kart: görsel + ad + tek satır künye ("Zeytinburnu, İstanbul · 1.983 daire" / "70.000 m² yaşam kompleksi" / "Tiflis · 350 daire" / "Nahçıvan · 170 daire") + tümü `projeler.html#<id>`'ye link. Hepsi `loading="lazy"`.
- [ ] **Step 6:** CTA bandı: kırmızı zemin, beyaz metin — "Projeleriniz için bizimle iletişime geçin" + beyaz kontur `tel:` butonu "+90 216 466 16 10" + footer.
- [ ] **Step 7 (doğrulama):** `python -m http.server 8080` → Playwright 390/1440 screenshot → **Read ile incele** (taşma, kırık görsel, kontrast). Console 0 hata.
- [ ] **Step 8:** Commit+push (`feat: anasayfa`).

### Task 5: kurumsal.html

**Files:** Create `kurumsal.html`

- [ ] **Step 1:** Head (title: "Kurumsal — Arkoz Müteahhitlik"; description kısa) + Task 4 header (aria-current → Kurumsal).
- [ ] **Step 2:** Sayfa başlığı bandı (krem): `ustbaslik "Kurumsal"` + H1 "Hakkımızda".
- [ ] **Step 3:** Ana metin — ICERIK.md'deki tam hakkımızda, marka uyarlamalı; sıralı bölümler: giriş 2 paragraf + misyon/vizyon 2 paragraf + slogan vurgusu (`<blockquote class="alinti">` "İnsanlar için İnsanlar hakkında düşünmek" — "Maliyetin üstüne çıkmamak, zamanı uzatmamak"). Yanda iş merkezi görseli + kırmızı çizgi detayı.
- [ ] **Step 4:** Değerlerimiz — 4 `.deger-kart` (krem zemin, sol 3px kırmızı kenar): başlık+metin birebir kaynak: "Birlikte üretmenin gücüne inanırız", "Girişimci, yenilikçi ve öncüyüz", "Ülke ve toplum için değer yaratma hedefiyle çalışırız", "Faaliyetlerimizi sürdürülebilirlik anlayışıyla yönetiriz" (+kaynak açıklama cümleleri).
- [ ] **Step 5:** Footer + doğrulama (390/1440 screenshot + Read) + commit+push (`feat: kurumsal sayfası`).

### Task 6: projeler.html

**Files:** Create `projeler.html`

- [ ] **Step 1:** Head (title "Projeler — Arkoz Müteahhitlik") + header (aria-current → Projeler) + krem başlık bandı (H1 "Projelerimiz").
- [ ] **Step 2:** **ARSİM Yalı Zeytinburnu** (`id="arsim"`, amiral bölüm): tam genişlik `aerial-day.jpg`; başlık + `ustbaslik "Zeytinburnu, İstanbul — Sümer Mahallesi kentsel dönüşüm alanı"`; açıklama (kaynak arsim sitesi): "Modern Yaşamın Yeni Mimarisi — İstanbul'un yerleşik kent dokusuyla yeniden yorumlanan çağdaş mimari; Marmara kıyısı ile tarihi yarımada arasında konumlanıyor. Yeşil avlular, çatı bahçeleri, çocuk oyun alanları, açık spor alanları, sosyal teraslar; zemin katta kafe, restoran ve mağazalar; yaya promenadı ve marina yakınlığı."
Künye (`.kunye`): Konum / Blok: 6 konut + 1 ofis / Toplam 1.983 daire. Daire tipleri tablosu (`<table>` başlıklarıyla): 1+1 366·55,55 m² / 2+1 329·72,80 m² / 2+1 Ayrı Mutfak 877·96,70 m² / 2+1 Dubleks 82·110,60 m² / 3+1 329·120,45 m².
Galeri: kalan 7 render `.galeri` grid'inde (`a[data-buyuk]` → `<dialog class="lightbox">`); her `<img>` 1920×1357 width/height + lazy + Türkçe alt.
- [ ] **Step 3:** Green Diamond (`id="green-diamond"`, krem bölüm): green-big.jpg + künye (Kapsam: 70.000 m² / Durum: metne sadık "inşa ediliyor") + kaynak açıklaması.
- [ ] **Step 4:** Green Budapeşt (`id="green-budapest"`): buda-big.jpg + künye (Tiflis merkez / 11.700 m² / 350 daire / 2014'te başlandı) + açıklama.
- [ ] **Step 5:** Elit (`id="elit"`, krem): elit-big.jpg + künye (Nahçıvan merkez / 3 blok — 15+10+10 kat / 170 daire / 2008–2010, tamamlandı) + açıklama (otopark, çocuk parkları, rekreasyon — kaynaktan).
- [ ] **Step 6:** `<dialog class="lightbox">` markup + footer; doğrulama (390/1440 + lightbox aç-kapa testi + Read) + commit+push (`feat: projeler sayfası`).

### Task 7: iletisim.html

**Files:** Create `iletisim.html`

- [ ] **Step 1:** Head (title "İletişim — Arkoz Müteahhitlik") + header (aria-current) + krem başlık bandı (H1 "İletişim").
- [ ] **Step 2:** İki kolon: solda `.kunye` — Adres: "Şerifali Mah. Türker Cad. No:35 Arkoz İş Merkezi, Ümraniye / İstanbul" · Telefon: `<a href="tel:+902164661610">+90 216 466 16 10</a>` · E-posta: `<a href="mailto:info@arkozdisticaret.com.tr">info@arkozdisticaret.com.tr</a>` · Çalışma saatleri: "Hafta içi 08:30 – 18:30". Sağda harita:
```html
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.2318514530652!2d29.149798115667494!3d40.99829827930179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cacf464f315d83%3A0x92753c4c77449ee4!2zxZ5lcmlmYWxpLCBUw7xya2VyIENkLiBObzozNSwgMzQ3NzUgRHVkdWxsdSBPc2Ivw5xtcmFuaXllL8Swc3RhbmJ1bA!5e0!3m2!1str!2str!4v1679916491706!5m2!1str!2str"
  width="600" height="450" style="border:0" loading="lazy" allowfullscreen
  referrerpolicy="no-referrer-when-downgrade" title="Arkoz İş Merkezi konumu — Google Haritalar"></iframe>
```
- [ ] **Step 3:** Footer + doğrulama + commit+push (`feat: iletişim sayfası`).

### Task 8: Bütünleşik kontrol (FAZ 3 kapanışı)

- [ ] Tüm sayfalarda header/footer bayt-bayt aynı mı (aktif link hariç) — `diff` ile kontrol.
- [ ] `is-merkezi.png` kopyalandı mı; hiçbir sayfada 330×230 görsel veya `about-style2-image` referansı yok — `grep` ile doğrula.
- [ ] "Dış Ticaret" ve "DIŞ TİCARET" hiçbir HTML'de geçmiyor (e-posta adresi `mailto:` hariç) — `grep -i "dış ticaret" *.html`.
- [ ] Commit+push (`chore: bütünlük kontrolleri`).

*(FAZ 4 impeccable + web-design-guidelines ve FAZ 5 webapp-testing + verification-before-completion protokol gereği planın DIŞINDA, sırayla çalışır.)*

## Self-Review Sonucu
- Spec kapsaması: 4 sayfa ✓ logo ✓ görsel kuralı ✓ marka kuralı ✓ güvenlik ✓ maps ✓ meta/OG ✓ — boşluk yok.
- Placeholder taraması: "TBD/TODO/sonra doldur" yok; tüm metinler gerçek kaynak kopyası.
- Tip tutarlılığı: sınıf adları (`.kunye`, `.galeri`, `.lightbox`, `.reveal`, `.nav--acik`) görevler arası birebir aynı ✓.
