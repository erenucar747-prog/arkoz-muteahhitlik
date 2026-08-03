import type { MetadataRoute } from "next";
import { sektorler, tumProjeler } from "@/lib/content";

const KOK_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://arkoz-muteahhitlik.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const statik = [
    "",
    "/hakkimizda",
    "/projelerimiz",
    "/sektorler",
    "/bizden-haberler",
    "/kariyer",
    "/iletisim",
  ];

  const ciftler: { tr: string; en: string }[] = [
    ...statik.map((y) => ({ tr: y, en: y })),
    ...Object.keys(sektorler()).map((k) => ({
      tr: `/sektorler/${k}`,
      en: `/sektorler/${k}`,
    })),
    ...tumProjeler().map((p) => ({
      tr: `/projelerimiz/${p.slug}`,
      en: `/projelerimiz/${p.slug}`,
    })),
  ];

  return ciftler.flatMap(({ tr, en }) => {
    // hreflang karşılıklı olmalı: her iki girdide de aynı dil haritası
    const diller = {
      tr: `${KOK_URL}${tr || "/"}`,
      en: `${KOK_URL}/en${en}`,
    };
    return [
      { url: diller.tr, alternates: { languages: diller } },
      { url: diller.en, alternates: { languages: diller } },
    ];
  });
}
