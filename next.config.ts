import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // eski CMS'in /teklif rotası — form yok, iletişime kalıcı yönlendirme
      { source: "/teklif", destination: "/iletisim", permanent: true },
      { source: "/en/teklif", destination: "/en/iletisim", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
