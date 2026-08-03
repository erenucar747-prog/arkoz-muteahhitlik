import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // eski CMS'in /teklif rotası — form yok, iletişime kalıcı yönlendirme
      { source: "/teklif", destination: "/iletisim", permanent: true },
      { source: "/en/teklif", destination: "/en/iletisim", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
