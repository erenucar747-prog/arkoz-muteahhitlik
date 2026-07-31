import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function Anasayfa({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Anasayfa");

  return (
    <section className="hero">
      <div className="kapsayici hero__izgara">
        <div>
          <h1 className="hero__baslik">
            {t("baslik")}
            <img
              className="hero__nokta"
              src="/marka/logo-mark.svg"
              alt=""
              width={24}
              height={24}
            />
          </h1>
          <p className="hero__slogan">{t("slogan")}</p>
        </div>
        <div className="hero__gorsel">
          {/* 1920×1357 doğal boyut — doğal genişliğin üzerinde render edilmez */}
          <img
            src="/projeler/arsim-yali-zeytinburnu/aerial-day.jpg"
            alt={t("heroAlt")}
            width={1920}
            height={1357}
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
