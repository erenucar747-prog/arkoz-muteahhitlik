import type { Metadata } from "next";

/** Sayfa bazlı canonical + karşılıklı hreflang (TR kökte, EN /en altında). */
export function dilAlternatifleri(
  yol: string,
  locale: string
): Metadata["alternates"] {
  const tr = yol || "/";
  const en = `/en${yol}`;
  return {
    canonical: locale === "en" ? en : tr,
    languages: { tr, en },
  };
}
