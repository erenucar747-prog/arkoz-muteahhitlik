import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ProjectCard from "@/components/ProjectCard";
import { sektorler, tumProjeler, type Dil } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Projeler" });
  return { title: t("baslik") };
}

export default async function Projelerimiz({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const dil = locale as Dil;
  const t = await getTranslations("Projeler");

  const sektorListesi = Object.entries(sektorler());
  const projeler = tumProjeler();

  return (
    <>
      <div className="sayfa-bas">
        <div className="kapsayici sayfa-bas__ic">
          <p className="ustbaslik">{t("ustbaslik")}</p>
          <h1>{t("baslik")}</h1>
        </div>
      </div>

      {sektorListesi.map(([anahtar, sektor], i) => {
        const grup = projeler.filter((p) => p.category === anahtar);
        if (!grup.length) return null;
        return (
          <section
            key={anahtar}
            id={anahtar}
            className={`bolum${i % 2 === 1 ? " bolum--krem" : ""}`}
          >
            <div className="kapsayici">
              <div className="bolum-bas">
                <p className="ustbaslik">{sektor.istatistik[dil]}</p>
                <h2 className="baslik-buyuk">{sektor.ad[dil]}</h2>
              </div>
              <div className="vitrin">
                {grup.map((p) => (
                  <ProjectCard
                    key={p.slug}
                    proje={p}
                    dil={dil}
                    kategoriAd={sektor.ad[dil]}
                  />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
