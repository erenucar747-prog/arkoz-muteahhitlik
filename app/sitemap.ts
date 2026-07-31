import type { MetadataRoute } from "next";
import { sektorler, tumProjeler } from "@/lib/content";

const KOK_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

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

  const yollar = [
    ...statik,
    ...Object.keys(sektorler()).map((k) => `/sektorler/${k}`),
    ...tumProjeler().map((p) => `/projelerimiz/${p.slug}`),
  ];

  return yollar.flatMap((yol) => [
    {
      url: `${KOK_URL}${yol || "/"}`,
      alternates: {
        languages: {
          tr: `${KOK_URL}${yol || "/"}`,
          en: `${KOK_URL}/en${yol}`,
        },
      },
    },
    { url: `${KOK_URL}/en${yol}` },
  ]);
}
