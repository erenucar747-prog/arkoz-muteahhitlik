import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { dilAlternatifleri } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Dil, Yerel } from "@/lib/content";

type Sube = {
  sehir: Yerel;
  ulke: Yerel;
  adres?: Yerel | null;
  tel: string | null;
  merkez?: boolean;
};

const HARITA_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.2318514530652!2d29.149798115667494!3d40.99829827930179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cacf464f315d83%3A0x92753c4c77449ee4!2zxZ5lcmlmYWxpLCBUw7xya2VyIENkLiBObzozNSwgMzQ3NzUgRHVkdWxsdSBPc2Ivw5xtcmFuaXllL8Swc3RhbmJ1bA!5e0!3m2!1str!2str!4v1679916491706!5m2!1str!2str";

function subeler(): Sube[] {
  return JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "content", "offices.json"),
      "utf8"
    )
  ) as Sube[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Iletisim" });
  return {
    title: t("baslik"),
    alternates: dilAlternatifleri("/iletisim", locale),
  };
}

export default async function Iletisim({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const dil = locale as Dil;
  const t = await getTranslations("Iletisim");

  return (
    <>
      <div className="sayfa-bas">
        <div className="kapsayici sayfa-bas__ic">
          <p className="ustbaslik">{t("ustbaslik")}</p>
          <h1>{t("baslik")}</h1>
        </div>
      </div>

      <section className="bolum">
        <div className="kapsayici iletisim__izgara">
          <div>
            <h2 className="baslik-buyuk">{t("merkezBaslik")}</h2>
            <div className="metin-govde">
              <p>{t("adres")}</p>
              <p>
                <a href="tel:+902164661610">+90 216 466 16 10</a>
              </p>
            </div>
          </div>
          <div className="harita">
            <iframe
              src={HARITA_SRC}
              title={t("haritaBaslik")}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="bolum bolum--krem">
        <div className="kapsayici">
          <div className="bolum-bas">
            <p className="ustbaslik">{t("subelerUst")}</p>
            <h2 className="baslik-buyuk">{t("subelerBaslik")}</h2>
          </div>
          <div className="sektor-izgara">
            {subeler().map((s, i) => (
              <div className="sektor-kart" key={i}>
                <h3>
                  {s.sehir[dil]} — {s.ulke[dil]}
                </h3>
                {s.adres && <p>{s.adres[dil]}</p>}
                {s.tel && (
                  <p className="sektor-kart__vurgu">
                    <a href={`tel:${s.tel.replace(/\s/g, "")}`}>{s.tel}</a>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
