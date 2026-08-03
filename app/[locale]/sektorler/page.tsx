import type { Metadata } from "next";
import { dilAlternatifleri } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { sektorler, tumProjeler, type Dil } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Sektorler" });
  return {
    title: t("baslik"),
    alternates: dilAlternatifleri("/sektorler", locale),
  };
}

export default async function Sektorler({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const dil = locale as Dil;
  const t = await getTranslations("Sektorler");
  const projeler = tumProjeler();

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
          <div className="sektor-izgara sektor-izgara--numarali">
            {Object.entries(sektorler()).map(([anahtar, s]) => {
              const adet = projeler.filter(
                (p) => p.category === anahtar
              ).length;
              return (
                <Link
                  key={anahtar}
                  className="sektor-kart"
                  href={`/sektorler/${anahtar}`}
                >
                  <h2>{s.ad[dil]}</h2>
                  <p>{s.istatistik[dil]}</p>
                  <p className="sektor-kart__vurgu">
                    {t("projeSayisi", { adet })}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
