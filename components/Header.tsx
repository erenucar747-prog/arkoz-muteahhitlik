import fs from "node:fs";
import path from "node:path";
import { getTranslations } from "next-intl/server";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  const t = await getTranslations("Nav");
  const ortak = await getTranslations("Ortak");
  // İnline SVG: footer'daki .st0 beyaz boyama kuralıyla uyum için dosyadan okunur
  const logoHtml = fs.readFileSync(
    path.join(process.cwd(), "public", "marka", "logo-header.svg"),
    "utf8"
  );

  const linkler = [
    { href: "/hakkimizda", etiket: t("hakkimizda") },
    { href: "/projelerimiz", etiket: t("projeler") },
    { href: "/sektorler", etiket: t("sektorler") },
    { href: "/bizden-haberler", etiket: t("haberler") },
    { href: "/iletisim", etiket: t("iletisim") },
  ];

  return (
    <HeaderClient
      logoHtml={logoHtml}
      linkler={linkler}
      anasayfa={t("anasayfa")}
      menu={t("menu")}
      dilDegistir={t("dilDegistir")}
      tel={ortak("tel")}
    />
  );
}
