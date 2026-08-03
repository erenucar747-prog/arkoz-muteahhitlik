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

  return ciftler.flatMap(({ tr, en }) => [
    {
      url: `${KOK_URL}${tr || "/"}`,
      alternates: {
        languages: {
          tr: `${KOK_URL}${tr || "/"}`,
          en: `${KOK_URL}/en${en}`,
        },
      },
    },
    { url: `${KOK_URL}/en${en}` },
  ]);
}
