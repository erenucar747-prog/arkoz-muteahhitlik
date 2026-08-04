import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollFX from "@/components/ScrollFX";
import "../globals.css";

const workSans = Work_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-work",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://arkoz-muteahhitlik.vercel.app"
    ),
    title: {
      default: "Arkoz Müteahhitlik",
      template: "%s — Arkoz Müteahhitlik",
    },
    description: t("aciklama"),
    openGraph: {
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      siteName: "Arkoz Müteahhitlik",
      title: "Arkoz Müteahhitlik",
      description: t("aciklama"),
      images: ["/projeler/arsim-yali-zeytinburnu/aerial-day.jpg"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("Ortak");

  const kokUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://arkoz-muteahhitlik.vercel.app";
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Arkoz Müteahhitlik",
    url: kokUrl,
    logo: `${kokUrl}/marka/logo-mark.svg`,
    foundingDate: "1998",
    telephone: "+90 216 466 16 10",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Şerifali Mah. Türker Cad. No:35 Arkoz İş Merkezi",
      addressLocality: "Ümraniye",
      addressRegion: "İstanbul",
      addressCountry: "TR",
    },
  };

  return (
    <html lang={locale} className={workSans.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <NextIntlClientProvider>
          <a className="atlama" href="#icerik">
            {t("atlama")}
          </a>
          <ScrollFX />
          <Header />
          <main id="icerik">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
