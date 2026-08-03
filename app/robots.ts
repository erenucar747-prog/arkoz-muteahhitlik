import type { MetadataRoute } from "next";

const KOK_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://arkoz-muteahhitlik.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${KOK_URL}/sitemap.xml`,
  };
}
