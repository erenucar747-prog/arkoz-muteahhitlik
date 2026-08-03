"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";

export type HeroSlayt = {
  href: string;
  src: string;
  w: number;
  h: number;
  ad: string;
  stat: string;
};

const SURE = 5500;

export default function HeroSlider({
  slaytlar,
  etiket,
}: {
  slaytlar: HeroSlayt[];
  etiket: string;
}) {
  const [aktif, setAktif] = useState(0);
  const duraklat = useRef(false);
  const sayi = slaytlar.length;

  const ilerle = useCallback(
    () => setAktif((a) => (a + 1) % sayi),
    [sayi]
  );

  useEffect(() => {
    if (sayi < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const zamanlayici = setInterval(() => {
      if (!duraklat.current) ilerle();
    }, SURE);
    return () => clearInterval(zamanlayici);
  }, [ilerle, sayi]);

  return (
    <div
      className="hero__gorsel hero-slider"
      role="group"
      aria-roledescription="carousel"
      aria-label={etiket}
      onMouseEnter={() => (duraklat.current = true)}
      onMouseLeave={() => (duraklat.current = false)}
      onFocus={() => (duraklat.current = true)}
      onBlur={() => (duraklat.current = false)}
    >
      {slaytlar.map((s, i) => (
        <Link
          key={s.href}
          href={s.href}
          className={`hero-slider__slayt${
            i === aktif ? " hero-slider__slayt--aktif" : ""
          }`}
          tabIndex={i === aktif ? 0 : -1}
          aria-hidden={i !== aktif}
        >
          <Image
            src={s.src}
            alt={s.ad}
            width={s.w}
            height={s.h}
            sizes="(max-width: 1023px) 100vw, 640px"
            priority={i === 0}
          />
          <span className="hero-slider__yazi">
            <span className="hero-slider__stat">{s.stat}</span>
            <span className="hero-slider__ad">{s.ad}</span>
          </span>
        </Link>
      ))}
      {sayi > 1 && (
        <div className="hero-slider__noktalar">
          {slaytlar.map((s, i) => (
            <button
              key={s.href}
              type="button"
              className={`hero-slider__nokta${
                i === aktif ? " hero-slider__nokta--aktif" : ""
              }`}
              aria-label={s.ad}
              aria-current={i === aktif}
              onClick={() => setAktif(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
