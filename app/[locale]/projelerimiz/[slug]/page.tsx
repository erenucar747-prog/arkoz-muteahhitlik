import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Gallery from "@/components/Gallery";
import KunyeTable from "@/components/KunyeTable";
import ProjectCard from "@/components/ProjectCard";
import TipTablosu from "@/components/TipTablosu";
import {
  govde,
  projeGetir,
  projeYolu,
  sektorler,
  tumProjeler,
  type Dil,
} from "@/lib/content";

export function generateStaticParams() {
  // Ana slug + eski CMS takma adları (slugEn) — eski linkler kırılmasın;
  // canonical her zaman ana slug'ı gösterir
  const slugs = new Set<string>();
  for (const p of tumProjeler()) {
    slugs.add(p.slug);
    if (p.slugEn) slugs.add(p.slugEn);
  }
  return [...slugs].map((slug) => ({ slug }));
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
  const trYol = `/projelerimiz/${proje.slug}`;
  const enYol = `/en/projelerimiz/${proje.slug}`;
  return {
    title: proje.title[dil],
    description:
      proje.summary[dil] || govde(proje, dil)[0]?.slice(0, 160) || undefined,
    alternates: {
      canonical: dil === "en" ? enYol : trYol,
      languages: { tr: trYol, en: enYol },
    },
  };
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
  const nav = await getTranslations("Nav");
  const sektor = sektorler()[proje.category];
  const paragraflar = govde(proje, dil);

  // Aynı sektörden diğer projeler + önceki/sonraki gezinme
  const ayniSektor = tumProjeler().filter(
    (p) => p.category === proje.category
  );
  const konum = ayniSektor.findIndex((p) => p.slug === proje.slug);
  const onceki = konum > 0 ? ayniSektor[konum - 1] : null;
  const sonraki =
    konum < ayniSektor.length - 1 ? ayniSektor[konum + 1] : null;
  const benzerler = ayniSektor
    .filter((p) => p.slug !== proje.slug && (p.cover || p.gallery[0]))
    .slice(0, 3);

  const kokUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://arkoz-muteahhitlik.vercel.app";
  const onekYol = dil === "en" ? "/en" : "";
  const kirintiJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: nav("anasayfa"), item: `${kokUrl}${onekYol || "/"}` },
      { "@type": "ListItem", position: 2, name: t("baslik"), item: `${kokUrl}${onekYol}/projelerimiz` },
      { "@type": "ListItem", position: 3, name: proje.title[dil] },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(kirintiJsonLd) }}
      />
      <div className="sayfa-bas">
        <div className="kapsayici sayfa-bas__ic">
          <nav className="kirinti" aria-label="breadcrumb">
            <Link href="/">{nav("anasayfa")}</Link>
            <span aria-hidden="true"> / </span>
            <Link href="/projelerimiz">{t("baslik")}</Link>
          </nav>
          {sektor && <p className="ustbaslik">{sektor.ad[dil]}</p>}
          <h1>
            {proje.title[dil]}
            {/* eslint-disable-next-line @next/next/no-img-element -- küçük SVG marka işareti, optimizasyon gereksiz */}
            <img
              className="sayfa-bas__isaret"
              src="/marka/logo-mark.svg"
              alt=""
              width={28}
              height={32}
            />
          </h1>
        </div>
      </div>

      <article className="bolum">
        <div className="kapsayici">
          {proje.cover && (
            <div className="proje__kapak">
              <Image
                src={proje.cover.src}
                alt={proje.title[dil]}
                width={proje.cover.w}
                height={proje.cover.h}
                sizes="(max-width: 1279px) 100vw, 1120px"
                priority
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

          {/* Önceki / sonraki proje gezinmesi */}
          {(onceki || sonraki) && (
            <nav className="proje-gezinme" aria-label={t("gezinme")}>
              {onceki ? (
                <Link
                  className="proje-gezinme__link"
                  href={`/projelerimiz/${projeYolu(onceki)}`}
                >
                  <span className="proje-gezinme__yon">← {t("onceki")}</span>
                  <span className="proje-gezinme__ad">{onceki.title[dil]}</span>
                </Link>
              ) : (
                <span />
              )}
              {sonraki && (
                <Link
                  className="proje-gezinme__link proje-gezinme__link--sag"
                  href={`/projelerimiz/${projeYolu(sonraki)}`}
                >
                  <span className="proje-gezinme__yon">{t("sonraki")} →</span>
                  <span className="proje-gezinme__ad">{sonraki.title[dil]}</span>
                </Link>
              )}
            </nav>
          )}
        </div>
      </article>

      {/* Aynı sektörden projeler */}
      {benzerler.length > 0 && sektor && (
        <section className="bolum bolum--krem">
          <div className="kapsayici">
            <div className="bolum-bas">
              <p className="ustbaslik">{sektor.ad[dil]}</p>
              <h2 className="baslik-buyuk">{t("benzerBaslik")}</h2>
            </div>
            <div className="vitrin">
              {benzerler.map((p) => (
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
      )}
    </>
  );
}
