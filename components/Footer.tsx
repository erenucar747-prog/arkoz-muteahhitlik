import fs from "node:fs";
import path from "node:path";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function Footer() {
  const t = await getTranslations("Footer");
  const nav = await getTranslations("Nav");
  const ortak = await getTranslations("Ortak");
  const logoHtml = fs.readFileSync(
    path.join(process.cwd(), "public", "marka", "logo-header.svg"),
    "utf8"
  );

  const linkler = [
    { href: "/hakkimizda", etiket: nav("hakkimizda") },
    { href: "/projelerimiz", etiket: nav("projeler") },
    { href: "/sektorler", etiket: nav("sektorler") },
    { href: "/bizden-haberler", etiket: nav("haberler") },
    { href: "/kariyer", etiket: nav("kariyer") },
    { href: "/referanslar", etiket: nav("referanslar") },
    { href: "/iletisim", etiket: nav("iletisim") },
  ];

  const yil = new Date().getFullYear();
  const tel = ortak("tel");

  return (
    <footer className="footer">
      <div className="kapsayici">
        <div className="footer__izgara">
          <div
            className="footer__logo"
            dangerouslySetInnerHTML={{ __html: logoHtml }}
          />
          <div>
            <h2 className="footer__baslik">{t("siteBaslik")}</h2>
            <ul className="footer__liste">
              {linkler.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.etiket}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="footer__baslik">{t("iletisimBaslik")}</h2>
            <ul className="footer__liste">
              <li>{t("adres")}</li>
              <li>
                <a href={`tel:${tel.replace(/\s/g, "")}`}>{tel}</a>
              </li>
              <li>
                <a href="mailto:info@arkozdisticaret.com.tr">
                  info@arkozdisticaret.com.tr
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__alt">
          <p>
            © {yil} Arkoz Müteahhitlik. {t("hak")}
          </p>
        </div>
      </div>
    </footer>
  );
}
