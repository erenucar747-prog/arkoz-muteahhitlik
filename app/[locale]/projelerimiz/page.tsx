import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ProjectCard from "@/components/ProjectCard";
import {
  govde,
  sektorler,
  tumProjeler,
  UST_GRUPLAR,
  type Dil,
  type Proje,
} from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Projeler" });
  return { title: t("baslik") };
}

function OtelSatiri({
  proje,
  dil,
  detay,
  ters,
}: {
  proje: Proje;
  dil: Dil;
  detay: string;
  ters: boolean;
}) {
  const gorsel = proje.cover ?? proje.gallery[0];
  const paragraflar = govde(proje, dil);
  return (
    <article className={`otel-satir${ters ? " otel-satir--ters" : ""}`}>
      {gorsel && (
        <Link
          className="otel-satir__gorsel"
          href={`/projelerimiz/${proje.slug}`}
        >
          <img
            src={gorsel.src}
            alt={proje.title[dil]}
            width={gorsel.w}
            height={gorsel.h}
            loading="lazy"
          />
        </Link>
      )}
      <div>
        <h4 className="otel-satir__baslik">{proje.title[dil]}</h4>
        {paragraflar[0] && <p>{paragraflar[0]}</p>}
        <p className="otel-satir__link">
          <Link className="btn btn--kontur" href={`/projelerimiz/${proje.slug}`}>
            {detay}
          </Link>
        </p>
      </div>
    </article>
  );
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

  const sektorListesi = sektorler();
  const projeler = tumProjeler();

  return (
    <>
      <div className="sayfa-bas">
        <div className="kapsayici sayfa-bas__ic">
          <p className="ustbaslik">{t("ustbaslik")}</p>
          <h1>{t("baslik")}</h1>
        </div>
      </div>

      {UST_GRUPLAR.map((grup, gi) => {
        const no = String(gi + 1).padStart(2, "0");
        return (
          <section
            key={grup.anahtar}
            id={grup.anahtar}
            className={`bolum${gi % 2 === 1 ? " bolum--krem" : ""}`}
          >
            <div className="kapsayici">
              <div className="bolum-bas">
                <p className="ustbaslik">{no}</p>
                <h2 className="baslik-buyuk">{grup.ad[dil]}</h2>
              </div>

              {grup.anahtar === "oteller" ? (
                <div className="otel-liste">
                  {projeler
                    .filter((p) => grup.kategoriler.includes(p.category))
                    .map((p, i) => (
                      <OtelSatiri
                        key={p.slug}
                        proje={p}
                        dil={dil}
                        detay={t("detay")}
                        ters={i % 2 === 1}
                      />
                    ))}
                </div>
              ) : (
                grup.kategoriler.map((kategori) => {
                  const sektor = sektorListesi[kategori];
                  const alt = projeler.filter(
                    (p) => p.category === kategori
                  );
                  if (!alt.length) return null;
                  return (
                    <div key={kategori} className="altgrup">
                      {sektor && grup.kategoriler.length > 1 && (
                        <h3 className="altgrup__baslik">
                          {sektor.ad[dil]}
                          <span className="altgrup__istatistik">
                            {sektor.istatistik[dil]}
                          </span>
                        </h3>
                      )}
                      <div className="vitrin">
                        {alt.map((p) => (
                          <ProjectCard
                            key={p.slug}
                            proje={p}
                            dil={dil}
                            kategoriAd={sektor ? sektor.ad[dil] : ""}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}
