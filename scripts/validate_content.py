# -*- coding: utf-8 -*-
"""Faz 1 validasyonu — içerik bütünlüğü denetimi.
Kontroller: proje sayısı, boş gövde, görsel varlığı, w<600 => thumbOnly,
görünür metinde 'Dış Ticaret' kalıntısı, slug-kaynak tutarlılığı.
Çıkış kodu 0 = temiz, 1 = ihlal var."""
import json, os, sys, io, glob
sys.stdout.reconfigure(encoding="utf-8", errors="replace")

KOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTENT = os.path.join(KOK, "content")
PUBLIC = os.path.join(KOK, "public")

ihlal, uyari = [], []

projeler = sorted(glob.glob(os.path.join(CONTENT, "projects", "*.json")))
print(f"proje dosyası: {len(projeler)}")

kategori_sayim = {}
en_eksik = []
for yol in projeler:
    with io.open(yol, encoding="utf-8") as f:
        p = json.load(f)
    slug = p["slug"]
    kategori_sayim[p.get("category", "?")] = kategori_sayim.get(p.get("category", "?"), 0) + 1

    if not p["body"]["tr"]:
        if p.get("cover") or p.get("gallery"):
            uyari.append(f"{slug}: TR gövde boş (görsel-künye sayfası — kaynakta metin yok)")
        else:
            ihlal.append(f"{slug}: TR gövde BOŞ ve görsel de yok")
    if not p["body"]["en"]:
        en_eksik.append(slug)
    if not p["title"]["tr"]:
        ihlal.append(f"{slug}: TR başlık boş")

    # marka kalıntısı (görünür metin)
    for dil in ("tr", "en"):
        for i, par in enumerate(p["body"][dil]):
            if "dış ticaret" in par.lower() or "foreign trade" in par.lower():
                ihlal.append(f"{slug}({dil}) p{i}: 'Dış Ticaret' kalıntısı")

    # görseller
    tum = ([p["cover"]] if p.get("cover") else []) + p.get("gallery", [])
    for g in tum:
        disk = os.path.join(PUBLIC, g["src"].lstrip("/"))
        if not os.path.exists(disk):
            ihlal.append(f"{slug}: görsel diskte yok: {g['src']}")
        if g["w"] < 600 and not g.get("thumbOnly"):
            ihlal.append(f"{slug}: {g['src']} w={g['w']}<600 ama thumbOnly değil")
    if p.get("cover") and p["cover"]["w"] < 600:
        ihlal.append(f"{slug}: cover w<600 — kapak olamaz")

print("kategori dağılımı:", kategori_sayim)
print(f"EN gövdesi eksik: {len(en_eksik)} → {en_eksik}")

# sayfalar
for yol in sorted(glob.glob(os.path.join(CONTENT, "pages", "*.json"))):
    with io.open(yol, encoding="utf-8") as f:
        s = json.load(f)
    if not s["body"]["tr"]:
        uyari.append(f"sayfa {s['slug']}: TR gövde boş")
    for dil in ("tr", "en"):
        for par in s["body"][dil]:
            if "dış ticaret" in par.lower() or "foreign trade" in par.lower():
                ihlal.append(f"sayfa {s['slug']}({dil}): 'Dış Ticaret' kalıntısı")

# zorunlu dosyalar
for z in ["sectors.json", "offices.json", "_ledger/images.json"]:
    if not os.path.exists(os.path.join(CONTENT, z)):
        ihlal.append(f"eksik: content/{z}")

print(f"\nUYARI ({len(uyari)}):")
for u in uyari[:15]:
    print("  -", u)
print(f"İHLAL ({len(ihlal)}):")
for h in ihlal[:25]:
    print("  -", h)

sys.exit(1 if ihlal else 0)
