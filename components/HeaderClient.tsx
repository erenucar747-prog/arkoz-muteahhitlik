"use client";

import { useEffect, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

type NavLink = { href: string; etiket: string };

export default function HeaderClient({
  logoHtml,
  linkler,
  anasayfa,
  menu,
  dilDegistir,
  tel,
}: {
  logoHtml: string;
  linkler: NavLink[];
  anasayfa: string;
  menu: string;
  dilDegistir: string;
  tel: string;
}) {
  const [acik, setAcik] = useState(false);
  const [dolu, setDolu] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const dugmeRef = useRef<HTMLButtonElement>(null);
  const acikRef = useRef(false);
  useEffect(() => {
    acikRef.current = acik;
  }, [acik]);

  useEffect(() => {
    const guncelle = () => setDolu(window.scrollY > 8);
    guncelle();
    window.addEventListener("scroll", guncelle, { passive: true });
    return () => window.removeEventListener("scroll", guncelle);
  }, []);

  // Menü açıkken: gövde kilidi + arkadaki içerik inert + odak ilk linke (WCAG 2.4.3)
  useEffect(() => {
    document.body.classList.toggle("kilitli", acik);
    const arkadakiler = [
      document.querySelector("main"),
      document.querySelector("footer"),
    ];
    if (acik) {
      arkadakiler.forEach((el) => el?.setAttribute("inert", ""));
      navRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    } else {
      arkadakiler.forEach((el) => el?.removeAttribute("inert"));
    }
    return () => {
      document.body.classList.remove("kilitli");
      arkadakiler.forEach((el) => el?.removeAttribute("inert"));
    };
  }, [acik]);

  useEffect(() => {
    const dinle = (e: KeyboardEvent) => {
      if (e.key === "Escape" && acikRef.current) {
        setAcik(false);
        dugmeRef.current?.focus();
      }
    };
    document.addEventListener("keydown", dinle);
    return () => document.removeEventListener("keydown", dinle);
  }, []);

  // Menü açıkken masaüstü genişliğine geçilirse kilidi bırak
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const dinle = () => {
      if (mq.matches) setAcik(false);
    };
    mq.addEventListener("change", dinle);
    return () => mq.removeEventListener("change", dinle);
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
        <nav
          ref={navRef}
          className={`nav${acik ? " nav--acik" : ""}`}
          id="ana-nav"
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) setAcik(false);
          }}
        >
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
          ref={dugmeRef}
          className="hamburger"
          aria-expanded={acik}
          aria-controls="ana-nav"
          aria-label={menu}
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
