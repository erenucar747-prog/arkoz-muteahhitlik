"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
  duraklatEtiketi,
  oynatEtiketi,
}: {
  slaytlar: HeroSlayt[];
  etiket: string;
  duraklatEtiketi: string;
  oynatEtiketi: string;
}) {
  const [aktif, setAktif] = useState(0);
  const [duraklatildi, setDuraklatildi] = useState(false);
  const hoverDuraklat = useRef(false);
  const sayi = slaytlar.length;

  // `aktif` bağımlılığı kasıtlı: manuel seçim sayacı sıfırlar (yarış önlenir)
  useEffect(() => {
    if (sayi < 2 || duraklatildi) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const zamanlayici = setInterval(() => {
      if (!hoverDuraklat.current) setAktif((a) => (a + 1) % sayi);
    }, SURE);
    return () => clearInterval(zamanlayici);
  }, [sayi, duraklatildi, aktif]);

  return (
    <div
      className="hero__gorsel hero-slider"
      role="group"
      aria-roledescription="carousel"
      aria-label={etiket}
      onMouseEnter={() => (hoverDuraklat.current = true)}
      onMouseLeave={() => (hoverDuraklat.current = false)}
      onFocus={() => (hoverDuraklat.current = true)}
      onBlur={() => (hoverDuraklat.current = false)}
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
          aria-roledescription="slide"
          aria-label={`${s.ad} (${i + 1}/${sayi})`}
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
          {/* WCAG 2.2.2: otomatik oynatma için görünür durdurma kontrolü */}
          <button
            type="button"
            className="hero-slider__durdur"
            aria-pressed={duraklatildi}
            aria-label={duraklatildi ? oynatEtiketi : duraklatEtiketi}
            onClick={() => setDuraklatildi((d) => !d)}
          >
            {duraklatildi ? "▶" : "❚❚"}
          </button>
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
