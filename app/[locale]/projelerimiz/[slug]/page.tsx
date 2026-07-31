import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Gallery from "@/components/Gallery";
import KunyeTable from "@/components/KunyeTable";
import TipTablosu from "@/components/TipTablosu";
import {
  govde,
  projeGetir,
  sektorler,
  tumProjeler,
  type Dil,
} from "@/lib/content";

export function generateStaticParams() {
  return tumProjeler().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const proje = projeGetir(decodeURIComponent(slug));
  if (!proje) return {};
  const dil = locale as Dil;
  return { title: proje.title[dil], description: proje.summary[dil] };
}

export default async function ProjeDetay({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const dil = locale as Dil;
  const proje = projeGetir(decodeURIComponent(slug));
  if (!proje) notFound();

  const t = await getTranslations("Projeler");
  const sektor = sektorler()[proje.category];
  const paragraflar = govde(proje, dil);

  return (
    <>
      <div className="sayfa-bas">
        <div className="kapsayici sayfa-bas__ic">
          {sektor && <p className="ustbaslik">{sektor.ad[dil]}</p>}
          <h1>{proje.title[dil]}</h1>
        </div>
      </div>

      <article className="bolum">
        <div className="kapsayici">
          {proje.cover && (
            <div className="proje__kapak">
              <img
                src={proje.cover.src}
                alt={proje.title[dil]}
                width={proje.cover.w}
                height={proje.cover.h}
                fetchPriority="high"
              />
            </div>
          )}

          <div className="proje__izgara">
            <div className="metin-govde">
              {proje.summary[dil] && (
                <p className="alinti">{proje.summary[dil]}</p>
              )}
              {paragraflar.map((par, i) => (
                <p key={i}>{par}</p>
              ))}
            </div>
            <aside>
              <KunyeTable kunye={proje.kunye} dil={dil} />
              {proje.tipTablosu && (
                <TipTablosu
                  satirlar={proje.tipTablosu}
                  dil={dil}
                  baslik={t("tipBaslik")}
                  kolonlar={{
                    tip: t("tipKolon"),
                    adet: t("adetKolon"),
                    m2: t("m2Kolon"),
                  }}
                />
              )}
            </aside>
          </div>

          <Gallery
            gorseller={proje.gallery}
            altOnEk={proje.title[dil]}
            kapatEtiketi={t("kapat")}
          />
        </div>
      </article>
    </>
  );
}
