"use client";

import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

type NavLink = { href: string; etiket: string };

export default function HeaderClient({
  logoHtml,
  linkler,
  anasayfa,
  menuAc,
  dilDegistir,
  tel,
}: {
  logoHtml: string;
  linkler: NavLink[];
  anasayfa: string;
  menuAc: string;
  dilDegistir: string;
  tel: string;
}) {
  const [acik, setAcik] = useState(false);
  const [dolu, setDolu] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const guncelle = () => setDolu(window.scrollY > 8);
    guncelle();
    window.addEventListener("scroll", guncelle, { passive: true });
    return () => window.removeEventListener("scroll", guncelle);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("kilitli", acik);
    return () => document.body.classList.remove("kilitli");
  }, [acik]);

  useEffect(() => {
    setAcik(false);
  }, [pathname]);

  useEffect(() => {
    const dinle = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAcik(false);
    };
    document.addEventListener("keydown", dinle);
    return () => document.removeEventListener("keydown", dinle);
  }, []);

  return (
    <header className={`header${dolu ? " header--dolu" : ""}`}>
      <div className="kapsayici header__ic">
        <Link
          className="header__logo"
          href="/"
          aria-label={anasayfa}
          dangerouslySetInnerHTML={{ __html: logoHtml }}
        />
        <nav className={`nav${acik ? " nav--acik" : ""}`} id="ana-nav">
          {linkler.map((l) => (
            <Link
              key={l.href}
              className="nav__link"
              href={l.href}
              aria-current={pathname === l.href ? "page" : undefined}
            >
              {l.etiket}
            </Link>
          ))}
          <a className="nav__tel" href={`tel:${tel.replace(/\s/g, "")}`}>
            {tel}
          </a>
          <LanguageSwitcher etiket={dilDegistir} />
        </nav>
        <button
          className="hamburger"
          aria-expanded={acik}
          aria-controls="ana-nav"
          aria-label={menuAc}
          onClick={() => setAcik(!acik)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
