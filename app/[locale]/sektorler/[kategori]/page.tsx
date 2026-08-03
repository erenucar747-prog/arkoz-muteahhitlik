import type { Metadata } from "next";
import { dilAlternatifleri } from "@/lib/seo";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ProjectCard from "@/components/ProjectCard";
import { sektorler, tumProjeler, type Dil } from "@/lib/content";

export function generateStaticParams() {
  return Object.keys(sektorler()).map((kategori) => ({ kategori }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; kategori: string }>;
}): Promise<Metadata> {
  const { locale, kategori } = await params;
  const sektor = sektorler()[kategori];
  if (!sektor) return {};
  return {
    title: sektor.ad[locale as Dil],
    alternates: dilAlternatifleri(`/sektorler/${kategori}`, locale),
  };
}

export default async function SektorDetay({
  params,
}: {
  params: Promise<{ locale: string; kategori: string }>;
}) {
  const { locale, kategori } = await params;
  setRequestLocale(locale);
  const dil = locale as Dil;
  const sektor = sektorler()[kategori];
  if (!sektor) notFound();

  const t = await getTranslations("Sektorler");
  const grup = tumProjeler().filter((p) => p.category === kategori);

  return (
    <>
      <div className="sayfa-bas">
        <div className="kapsayici sayfa-bas__ic">
          <p className="ustbaslik">{sektor.istatistik[dil]}</p>
          <h1>{sektor.ad[dil]}</h1>
        </div>
      </div>

      <section className="bolum">
        <div className="kapsayici">
          <div className="bolum-bas">
            <h2 className="baslik-buyuk">
              {t("projeSayisi", { adet: grup.length })}
            </h2>
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
    </>
  );
}
