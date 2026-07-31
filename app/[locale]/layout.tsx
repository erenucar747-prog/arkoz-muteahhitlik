import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";

const workSans = Work_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-work",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    default: "Arkoz Müteahhitlik",
    template: "%s — Arkoz Müteahhitlik",
  },
};

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

  return (
    <html lang={locale} className={workSans.variable}>
      <body>
        <NextIntlClientProvider>
          <a className="atlama" href="#icerik">
            {t("atlama")}
          </a>
          <Header />
          <main id="icerik">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
