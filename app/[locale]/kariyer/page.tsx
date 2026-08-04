import type { Metadata } from "next";
import { dilAlternatifleri } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Kariyer" });
  return {
    title: t("baslik"),
    alternates: dilAlternatifleri("/kariyer", locale),
  };
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
          <p className="bolum__eylem">
            <Link className="btn btn--dolu" href="/iletisim">
              {t("basvur")}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
