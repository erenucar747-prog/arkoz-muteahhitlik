# CLAUDE.md — Arkoz Müteahhitlik

## Proje
- Arkoz Müteahhitlik için *tanıtım web sitesi* (kurumsal vitrin; e-ticaret yok, KVKK/yasal metin yok).
- Repo: github.com/erenucar747-prog/arkoz-muteahhitlik — Vercel'de yayınlanır
  (push → otomatik deploy). Eski GitHub Pages yayını Faz 12'de kapatılacak.
- Bağımsız proje: Arkoz GazBeton sitesiyle veya diğer projelerle KARIŞTIRMA.
- Yanıtlar ve site içeriği Türkçe.

## İçerik Kuralı (EN ÖNEMLİ)
- Bilgi UYDURMA. Sadece Eren'in ilettiği doğrulanmış bilgiler kullanılır:
  şirket künyesi, hizmet listesi, belgeler (YAMBİS yetki no vb.), iletişim
  kanalları, logo/kurumsal renkler.
- Beklenen materyal listesi: 1) marka kimliği (logo, renkler) 2) şirket bilgileri
  3) hizmetler + açıklamaları 4) belgeler/yeterlilikler 5) iletişim kanalları
  (WhatsApp, Google Maps, e-posta).
- Eksik bilgi varsa sahte içerik/placeholder ile doldurma — Eren'e sor.
- Kurumsal kimlik GazBeton ile aynı olacaksa onay geldikten sonra:
  indigo #201060 + yaprak yeşili #58B040. Onay gelmeden varsayma.

## Teknoloji
- Next.js (App Router, TypeScript) + next-intl (TR kökte, EN /en altında). Tailwind YOK.
- Stil: app/globals.css (onaylı Swiss sistem, BEM) + yeni bileşenlerde CSS Modules.
- İçerik katmanı: content/ altında JSON (projects/, pages/, news/, sectors.json,
  offices.json, _ledger/images.json) — CMS yok; lib/content.ts tipli loader.
- Görseller: public/projeler/<slug>/ ve public/marka/. KURAL: hiçbir görsel doğal
  genişliğinin ÜZERİNDE render edilmez; w<600 görsel yalnız thumbnail (thumbOnly).
- Doğrulama scripti: python scripts/validate_content.py (0 ihlal şartı).
- Responsive zorunlu; mobil öncelikli düşün.

## Çalışma Akışı
- Her yaratıcı/tasarım/feature işinden ÖNCE brainstorming skill — küçük işte bile.
- Web görev zinciri (uygun olanları seç, ilgilileri daima kapsa):
  find-skills → design-direction → ui-ux-pro-max → frontend-design →
  web-design-guidelines (bitti demeden önce) → webapp-testing.
- İş "Faz" numaralarıyla ilerler (Faz 1, Faz 2...) — her faz tek commit'lik odaklı iş.
- SADECE istenen elemanı değiştir; işaret edilmeyen buton/menü/layout'a dokunma,
  "daha güzel olur" diye başka yeri elleme.

## Doğrulama
- "Bitti" demeden önce Playwright ile ekran görüntüsü al ve görüntüyü mutlaka OKU.
- Üç genişlikte kontrol: mobil (390px) + tablet (768px) + masaüstü (1440px).
- Eksik/hatalı iş teslim etme; her şeyi çift kontrol et.

## Git Akışı
- Bu repoda HER değişiklikten sonra, görev sonunda otomatik:
  git add <değişen dosyalar> + Conventional Commit mesajı + git push origin main.
- Branch yok, PR yok, onay sorma. git add -A KULLANMA (sadece değişen dosyalar).
- --no-verify ve force-push yasak.
- Sadece Eren "commit'leme / push'lama" derse atla.
