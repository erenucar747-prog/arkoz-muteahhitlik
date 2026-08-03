import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Haberler" });
  return { title: t("baslik") };
}

export default async function BizdenHaberler({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Haberler");

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
          {/* Gerçek haber içeriği yayımlandığında content/news/ altından listelenecek */}
          <div className="metin-govde">
            <p>{t("bos")}</p>
          </div>
          <p className="bolum__eylem">
            <Link className="btn btn--kontur" href="/projelerimiz">
              {t("projelereGit")}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
