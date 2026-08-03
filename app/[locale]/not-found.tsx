import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function BulunamadiSayfasi() {
  const t = await getTranslations("NotFound");

  return (
    <>
      <div className="sayfa-bas">
        <div className="kapsayici sayfa-bas__ic">
          <p className="ustbaslik">404</p>
          <h1>{t("baslik")}</h1>
        </div>
      </div>
      <section className="bolum">
        <div className="kapsayici">
          <div className="metin-govde">
            <p>{t("metin")}</p>
          </div>
          <p className="bolum__eylem">
            <Link className="btn btn--dolu" href="/">
              {t("anasayfa")}
            </Link>{" "}
            <Link className="btn btn--kontur" href="/projelerimiz">
              {t("projeler")}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
