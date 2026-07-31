# -*- coding: utf-8 -*-
"""Faz 1 — Eski CMS'ten (arkoz.wscp.net) tam içerik göçü.
Çıktı: content/projects/<slug>.json, content/pages/*.json, content/sectors.json,
content/offices.json, content/_ledger/images.json, public/projeler/<slug>/*.jpg
Kural: metin birebir; yalnız marka adı 'Arkoz Müteahhitlik' olarak uyarlanır (rapora düşer).
"""
import json, os, re, ssl, sys, io, time
import urllib.request
from html import unescape

BASE = "https://arkoz.wscp.net"
KOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTENT = os.path.join(KOK, "content")
PUBLIC = os.path.join(KOK, "public", "projeler")
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130.0"}
CTX = ssl.create_default_context()

RAPOR = {"projeler": 0, "en_eksik": [], "marka_degisimi": [], "hatalar": [], "gorsel": 0}

def fetch(url, binary=False):
    req = urllib.request.Request(url, headers=UA)
    for deneme in range(3):
        try:
            with urllib.request.urlopen(req, context=CTX, timeout=40) as r:
                data = r.read()
                return data if binary else data.decode("utf-8", "ignore")
        except Exception as e:
            if deneme == 2:
                RAPOR["hatalar"].append(f"{url} :: {e}")
                return None
            time.sleep(1.5)

def temizle_metin(html_parca):
    """HTML parçasından paragraf listesi çıkar."""
    parags = re.findall(r"<(?:p|h6)[^>]*>(.*?)</(?:p|h6)>", html_parca, re.S)
    out = []
    for p in parags:
        t = re.sub(r"<[^>]+>", " ", p)
        t = unescape(re.sub(r"\s+", " ", t)).strip()
        if t and t.lower() not in ("metin", "&nbsp;"):
            out.append(t)
    return out

def marka(metin, yer):
    """Marka adaptasyonu — birebir kural, rapora yaz."""
    yeni = metin
    for eski in ["ARKOZ Dış Ticaret", "Arkoz Dış Ticaret", "ARKOZ DIŞ TİCARET",
                 "ARKOZ Foreign Trade", "Arkoz Foreign Trade"]:
        if eski in yeni:
            RAPOR["marka_degisimi"].append(f"{yer}: '{eski}'")
            yeni = yeni.replace(eski, "Arkoz Müteahhitlik")
    return yeni

def govde_al(html, dil):
    """Detay sayfası gövdesi: başlıktan 'Diğer ... Projelerimiz' bölümüne kadar."""
    # ana içerik bloğu: project-details / section içindeki p'ler
    kes = re.split(r"(?i)Diğer\s+[^<]*Projelerimiz|Other\s+[^<]*Projects", html)[0]
    # sayfanın üst nav çöpünü at: son büyük başlıktan sonrasını al
    m = list(re.finditer(r"<h1[^>]*>|<h2[^>]*class=\"[^\"]*section-title", kes))
    if m:
        kes = kes[m[-1].start():]
    return temizle_metin(kes)

def gorseller_al(html):
    cover = None
    m = re.search(r"/Upload/Sayfalar/([^\"'\s>]+\.(?:jpe?g|png|webp))", html, re.I)
    if m:
        cover = "/Upload/Sayfalar/" + m.group(1)
    galeri = list(dict.fromkeys(re.findall(r"/Upload/Galeri/Buyuk/[^\"'\s>]+\.(?:jpe?g|png|webp)", html, re.I)))
    return cover, galeri

def slugify_dosya(url):
    return re.sub(r"[^a-zA-Z0-9._-]", "_", url.split("/")[-1])

def indir(url, hedef_klasor, ad):
    os.makedirs(hedef_klasor, exist_ok=True)
    yol = os.path.join(hedef_klasor, ad)
    if not os.path.exists(yol):
        data = fetch(BASE + url if url.startswith("/") else url, binary=True)
        if not data or len(data) < 3000:
            return None
        with open(yol, "wb") as f:
            f.write(data)
    try:
        from PIL import Image
        im = Image.open(yol)
        RAPOR["gorsel"] += 1
        return {"dosya": ad, "w": im.width, "h": im.height, "bayt": os.path.getsize(yol)}
    except Exception:
        os.remove(yol)
        return None

def baslik_al(html):
    for pat in [r"<h2 class=\"color-sector-style\">([^<]+)</h2>",
                r"<h1[^>]*>([^<]+)</h1>",
                r"<title>([^<|]+)"]:
        m = re.search(pat, html)
        if m:
            return unescape(m.group(1)).strip()
    return None

# ---------------------------------------------------------------- 1) proje listesi
print(">> Proje listesi çekiliyor...")
liste_html = fetch(f"{BASE}/projelerimiz")
slugs = list(dict.fromkeys(re.findall(r"/projelerimiz/([a-z0-9_-]+)", liste_html)))
print(f"   {len(slugs)} proje slug bulundu")

# kategori eşlemesi: her sektör sayfasındaki proje listelerinden
print(">> Kategoriler çekiliyor...")
SEKTOR_SLUG = {}
sektor_tanim = {}
ana = fetch(f"{BASE}/")
sektor_linkleri = list(dict.fromkeys(re.findall(r'href="(/sektorler/[a-z0-9_-]+)"[^>]*>([^<]+)<', ana)))
for url, ad in sektor_linkleri:
    s_html = fetch(BASE + url)
    if not s_html:
        continue
    kslug = url.split("/")[-1]
    sektor_tanim[kslug] = {"ad": {"tr": unescape(ad).strip()}, "url": url,
                           "aciklama": {"tr": govde_al(s_html, "tr")[:3]}}
    for ps in re.findall(r"/projelerimiz/([a-z0-9_-]+)", s_html):
        SEKTOR_SLUG.setdefault(ps, kslug)
print(f"   {len(sektor_tanim)} sektör: {list(sektor_tanim)}")

# ---------------------------------------------------------------- 2) projeler TR+EN
os.makedirs(os.path.join(CONTENT, "projects"), exist_ok=True)
ledger = {}
for i, slug in enumerate(slugs, 1):
    tr_html = fetch(f"{BASE}/projelerimiz/{slug}")
    if not tr_html:
        continue
    en_html = fetch(f"{BASE}/en/project/{slug}")
    baslik_tr = baslik_al(tr_html) or slug
    baslik_en = baslik_al(en_html) if en_html else None
    govde_tr = [marka(p, f"{slug}(tr)") for p in govde_al(tr_html, "tr")]
    govde_en = [marka(p, f"{slug}(en)") for p in (govde_al(en_html, "en") if en_html else [])]
    if not govde_en:
        RAPOR["en_eksik"].append(slug)
    cover_url, galeri_urls = gorseller_al(tr_html)

    hedef = os.path.join(PUBLIC, slug)
    cover = None
    if cover_url:
        bilgi = indir(cover_url, hedef, "cover" + os.path.splitext(cover_url)[1].lower())
        if bilgi:
            cover = {"src": f"/projeler/{slug}/{bilgi['dosya']}", "w": bilgi["w"], "h": bilgi["h"]}
            ledger[cover["src"]] = {"w": bilgi["w"], "h": bilgi["h"]}
    galeri = []
    for gi, gurl in enumerate(galeri_urls[:10], 1):
        bilgi = indir(gurl, hedef, f"g-{gi:02d}" + os.path.splitext(gurl)[1].lower())
        if bilgi:
            kayit = {"src": f"/projeler/{slug}/{bilgi['dosya']}", "w": bilgi["w"], "h": bilgi["h"]}
            if bilgi["w"] < 600:
                kayit["thumbOnly"] = True
            galeri.append(kayit)
            ledger[kayit["src"]] = {"w": bilgi["w"], "h": bilgi["h"]}

    proje = {
        "slug": slug, "slugEn": slug,
        "category": SEKTOR_SLUG.get(slug, "insaat"),
        "flagship": False,
        "title": {"tr": marka(baslik_tr, slug), "en": marka(baslik_en, slug) if baslik_en else marka(baslik_tr, slug)},
        "body": {"tr": govde_tr, "en": govde_en},
        "cover": cover, "gallery": galeri,
        "sources": {"tr": f"{BASE}/projelerimiz/{slug}", "en": f"{BASE}/en/project/{slug}" if en_html else None},
    }
    with io.open(os.path.join(CONTENT, "projects", f"{slug}.json"), "w", encoding="utf-8") as f:
        json.dump(proje, f, ensure_ascii=False, indent=1)
    RAPOR["projeler"] += 1
    print(f"   [{i:02d}/{len(slugs)}] {slug}  tr:{len(govde_tr)}p en:{len(govde_en)}p galeri:{len(galeri)}")

# ---------------------------------------------------------------- 3) statik sayfalar
print(">> Statik sayfalar...")
os.makedirs(os.path.join(CONTENT, "pages"), exist_ok=True)
STATIK = {
    "hakkimizda": ("/hakkimizda", "/en/about"),
    "kariyer": ("/kariyer", "/en/career"),
    "referanslar": ("/referanslar", "/en/references"),
    "bizden-haberler": ("/bizden-haberler", "/en/news"),
}
for ad, (tr_u, en_u) in STATIK.items():
    tr_h = fetch(BASE + tr_u)
    en_h = fetch(BASE + en_u)
    veri = {
        "slug": ad,
        "title": {"tr": baslik_al(tr_h) if tr_h else ad, "en": baslik_al(en_h) if en_h else None},
        "body": {"tr": [marka(p, f"{ad}(tr)") for p in (govde_al(tr_h, "tr") if tr_h else [])],
                 "en": [marka(p, f"{ad}(en)") for p in (govde_al(en_h, "en") if en_h else [])]},
        "sources": {"tr": BASE + tr_u, "en": BASE + en_u if en_h else None},
    }
    with io.open(os.path.join(CONTENT, "pages", f"{ad}.json"), "w", encoding="utf-8") as f:
        json.dump(veri, f, ensure_ascii=False, indent=1)
    print(f"   {ad}: tr {len(veri['body']['tr'])}p / en {len(veri['body']['en'])}p")

# haber listesi (1 haber bekleniyor)
hab = fetch(f"{BASE}/bizden-haberler")
if hab:
    hslugs = list(dict.fromkeys(re.findall(r"/bizden-haberler/([a-z0-9_-]+)", hab)))
    os.makedirs(os.path.join(CONTENT, "news"), exist_ok=True)
    for hs in hslugs:
        h_tr = fetch(f"{BASE}/bizden-haberler/{hs}")
        h_en = fetch(f"{BASE}/en/news/{hs}")
        if not h_tr:
            continue
        cover_url, _ = gorseller_al(h_tr)
        hcover = None
        if cover_url:
            b = indir(cover_url, os.path.join(KOK, "public", "haberler", hs), "cover" + os.path.splitext(cover_url)[1].lower())
            if b:
                hcover = {"src": f"/haberler/{hs}/{b['dosya']}", "w": b["w"], "h": b["h"]}
        with io.open(os.path.join(CONTENT, "news", f"{hs}.json"), "w", encoding="utf-8") as f:
            json.dump({"slug": hs,
                       "title": {"tr": baslik_al(h_tr), "en": baslik_al(h_en) if h_en else None},
                       "body": {"tr": [marka(p, f"haber:{hs}") for p in govde_al(h_tr, "tr")],
                                "en": [marka(p, f"haber:{hs}(en)") for p in (govde_al(h_en, "en") if h_en else [])]},
                       "cover": hcover}, f, ensure_ascii=False, indent=1)
    print(f"   haber: {len(hslugs)} adet")

# ---------------------------------------------------------------- 4) sektorler + ofisler
for kslug, veri in sektor_tanim.items():
    veri["projeSayisi"] = sum(1 for v in SEKTOR_SLUG.values() if v == kslug)
with io.open(os.path.join(CONTENT, "sectors.json"), "w", encoding="utf-8") as f:
    json.dump(sektor_tanim, f, ensure_ascii=False, indent=1)

OFISLER = [
    {"sehir": {"tr": "İstanbul", "en": "Istanbul"}, "ulke": {"tr": "Türkiye", "en": "Türkiye"},
     "adres": {"tr": "Şerifali Mah. Türker Cad. No:35 Arkoz İş Merkezi, Ümraniye / İstanbul",
               "en": "Serifali Mah. Turker Cad. No:35 Arkoz Is Merkezi, Umraniye / Istanbul"},
     "tel": "+90 216 466 16 10", "merkez": True},
    {"sehir": {"tr": "Ankara", "en": "Ankara"}, "ulke": {"tr": "Türkiye", "en": "Türkiye"}, "tel": None},
    {"sehir": {"tr": "Nahçıvan", "en": "Nakhchivan"}, "ulke": {"tr": "Azerbaycan", "en": "Azerbaijan"}, "tel": "+994 36 545 00 20"},
    {"sehir": {"tr": "Bakü", "en": "Baku"}, "ulke": {"tr": "Azerbaycan", "en": "Azerbaijan"}, "tel": "+994 12 526 36 97"},
    {"sehir": {"tr": "Tiflis", "en": "Tbilisi"}, "ulke": {"tr": "Gürcistan", "en": "Georgia"}, "tel": "+995 32 200 09 09"},
    {"sehir": {"tr": "Kiev", "en": "Kyiv"}, "ulke": {"tr": "Ukrayna", "en": "Ukraine"}, "tel": "+380 674 74 20 44"},
]
with io.open(os.path.join(CONTENT, "offices.json"), "w", encoding="utf-8") as f:
    json.dump(OFISLER, f, ensure_ascii=False, indent=1)

# ---------------------------------------------------------------- 5) ledger + rapor
os.makedirs(os.path.join(CONTENT, "_ledger"), exist_ok=True)
with io.open(os.path.join(CONTENT, "_ledger", "images.json"), "w", encoding="utf-8") as f:
    json.dump(ledger, f, ensure_ascii=False, indent=1)
with io.open(os.path.join(CONTENT, "_ledger", "scrape-report.json"), "w", encoding="utf-8") as f:
    json.dump(RAPOR, f, ensure_ascii=False, indent=1)

print("\n===== RAPOR =====")
print(f"proje: {RAPOR['projeler']} | görsel: {RAPOR['gorsel']} | EN eksik: {len(RAPOR['en_eksik'])} | hata: {len(RAPOR['hatalar'])}")
print("EN eksik:", RAPOR["en_eksik"][:10], "..." if len(RAPOR["en_eksik"]) > 10 else "")
for h in RAPOR["hatalar"][:8]:
    print("HATA:", h)
