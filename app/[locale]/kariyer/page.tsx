import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Kariyer" });
  return { title: t("baslik") };
}

export default async function Kariyer({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Kariyer");

  return (
    <>
      <div className="sayfa-bas">
        <div className="kapsayici sayfa-bas__ic">
          <p className="ustbaslik">{t("ustbaslik")}</p>
          <h1>{t("baslik")}</h1>
        </div>
      </div>

      <section className="bolum">
        <div className="kapsayici">
          <div className="metin-govde">
            <p>{t("metin")}</p>
          </div>
          <p style={{ marginTop: "var(--s4)" }}>
            <a
              className="btn btn--dolu"
              href="mailto:info@arkozdisticaret.com.tr"
            >
              {t("basvur")}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
