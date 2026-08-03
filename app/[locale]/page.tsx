import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ProjectCard from "@/components/ProjectCard";
import {
  govde,
  projeYolu,
  sayfaGetir,
  sektorler,
  tumProjeler,
  type Dil,
} from "@/lib/content";

export default async function Anasayfa({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const dil = locale as Dil;
  const t = await getTranslations("Anasayfa");
  const ortak = await getTranslations("Ortak");

  const hakkimizda = sayfaGetir("hakkimizda");
  const sektorListesi = Object.entries(sektorler());
  const projeler = tumProjeler();

  const amiral = projeler.find((p) => p.flagship);
  // Vitrin: bugüne kadarki EN BÜYÜK işler — künye verileriyle küratörlü liste
  const VITRIN: { slug: string; stat: { tr: string; en: string } }[] = [
    {
      slug: "nahcivan-su-altyapi-programi",
      stat: { tr: "600M$+ yatırım", en: "$600M+ investment" },
    },
    {
      slug: "azergold-altin-uretim-tesisi",
      stat: { tr: "160M$ yatırım", en: "$160M investment" },
    },
    {
      slug: "sagarejo-badiauri-yolu",
      stat: { tr: "155M$ · 26 km", en: "$155M · 26 km" },
    },
    {
      slug: "gence-kazak-otoyolu",
      stat: { tr: "140M$ · 48 km", en: "$140M · 48 km" },
    },
    {
      slug: "maqro-city-tbilisi",
      stat: {
        tr: "Gürcistan'ın en büyük konut yatırımı",
        en: "Georgia's largest housing investment",
      },
    },
    {
      slug: "ordubat-hes",
      stat: { tr: "36 MW kurulu güç", en: "36 MW installed capacity" },
    },
  ];
  const amiralStat = { tr: "1.983 daire · İstanbul", en: "1,983 apartments · İstanbul" };
  const secim = VITRIN.flatMap(({ slug, stat }) => {
    const p = projeler.find((x) => x.slug === slug);
    return p ? [{ proje: p, stat }] : [];
  });

  const sektorAd = (kategori: string) =>
    sektorListesi.find(([k]) => k === kategori)?.[1].ad[dil] ?? "";

  const tel = ortak("tel");

  return (
    <>
      {/* Hero */}
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
            <div className="hero__butonlar">
              <Link className="btn btn--dolu" href="/projelerimiz">
                {t("projelerBtn")}
              </Link>
              <Link className="btn btn--kontur" href="/iletisim">
                {t("iletisimBtn")}
              </Link>
            </div>
          </div>
          <Link
            className="hero__gorsel"
            href={
              amiral
                ? `/projelerimiz/${projeYolu(amiral, dil)}`
                : "/projelerimiz"
            }
            aria-label={t("heroAlt")}
          >
            {/* 1920×1357 doğal boyut — doğal genişliğin üzerinde render edilmez */}
            <Image
              src="/projeler/arsim-yali-zeytinburnu/aerial-day.jpg"
              alt={t("heroAlt")}
              width={1920}
              height={1357}
              sizes="(max-width: 1023px) 100vw, 640px"
              priority
            />
          </Link>
        </div>
      </section>

      {/* Tanıtım — hakkımızda özeti */}
      <section className="bolum bolum--krem">
        <div className="kapsayici tanitim__izgara">
          <div>
            <p className="ustbaslik">{t("hakkimizdaUst")}</p>
            <h2 className="baslik-buyuk">{hakkimizda.title[dil]}</h2>
            <div className="metin-govde">
              {govde(hakkimizda, dil)
                .slice(0, 2)
                .map((par, i) => (
                  <p key={i}>{par}</p>
                ))}
            </div>
            <p className="tanitim__link">
              <Link className="btn btn--kontur" href="/hakkimizda">
                {t("detay")}
              </Link>
            </p>
          </div>
          <figure>
            {/* 1024×683 doğal boyut */}
            <Image
              src="/marka/is-merkezi.png"
              alt={t("isMerkeziAlt")}
              width={1024}
              height={683}
              sizes="(max-width: 1023px) 100vw, 440px"
            />
          </figure>
        </div>
      </section>

      {/* Sektörler */}
      <section className="bolum">
        <div className="kapsayici">
          <div className="bolum-bas">
            <p className="ustbaslik">{t("sektorlerUst")}</p>
            <h2 className="baslik-buyuk">{t("sektorlerBaslik")}</h2>
          </div>
          <div className="sektor-izgara sektor-izgara--numarali">
            {sektorListesi.map(([anahtar, s]) => (
              <Link
                key={anahtar}
                className="sektor-kart"
                href={`/sektorler/${anahtar}`}
              >
                <h3>{s.ad[dil]}</h3>
                <p>{s.istatistik[dil]}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Öne çıkan projeler */}
      <section className="bolum bolum--krem">
        <div className="kapsayici">
          <div className="bolum-bas bolum-bas--satir">
            <div>
              <p className="ustbaslik">{t("projelerUst")}</p>
              <h2 className="baslik-buyuk">{t("projelerBaslik")}</h2>
            </div>
            <Link className="btn btn--kontur" href="/projelerimiz">
              {t("tumProjeler")}
            </Link>
          </div>
          <div className="vitrin">
            {amiral && (
              <ProjectCard
                proje={amiral}
                dil={dil}
                kategoriAd={sektorAd(amiral.category)}
                stat={amiralStat[dil]}
                genis
              />
            )}
            {secim.map(({ proje, stat }) => (
              <ProjectCard
                key={proje.slug}
                proje={proje}
                dil={dil}
                kategoriAd={sektorAd(proje.category)}
                stat={stat[dil]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA bandı */}
      <section className="cta">
        <div className="kapsayici cta__ic">
          <h2 className="cta__baslik">{t("ctaBaslik")}</h2>
          <div className="cta__butonlar">
            <a
              className="btn btn--kontur-beyaz"
              href={`tel:${tel.replace(/\s/g, "")}`}
            >
              {tel}
            </a>
            <Link className="btn btn--kontur-beyaz" href="/iletisim">
              {t("iletisimBtn")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
