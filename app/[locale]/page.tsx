import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ProjectCard from "@/components/ProjectCard";
import {
  govde,
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
  // Vitrin: amiral hariç, kapak ≥1000px olanlardan kategori başına 1 proje
  const adaylar = projeler
    .filter((p) => !p.flagship && p.cover && p.cover.w >= 1000)
    .sort(
      (a, b) => b.cover!.w * b.cover!.h - a.cover!.w * a.cover!.h
    );
  const secim: typeof adaylar = [];
  const gorulenKategori = new Set<string>(
    amiral ? [amiral.category] : []
  );
  for (const p of adaylar) {
    if (gorulenKategori.has(p.category)) continue;
    gorulenKategori.add(p.category);
    secim.push(p);
    if (secim.length === 4) break;
  }

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
            <img
              src="/marka/is-merkezi.png"
              alt={t("isMerkeziAlt")}
              width={1024}
              height={683}
              loading="lazy"
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
          <div className="sektor-izgara">
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
                genis
              />
            )}
            {secim.map((p) => (
              <ProjectCard
                key={p.slug}
                proje={p}
                dil={dil}
                kategoriAd={sektorAd(p.category)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA bandı */}
      <section className="cta">
        <div className="kapsayici cta__ic">
          <h2 className="cta__baslik">{t("ctaBaslik")}</h2>
          <div className="hero__butonlar" style={{ marginTop: 0 }}>
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
