"use client";

import { useEffect, useRef, useState } from "react";

/** Görünür olunca 0'dan hedefe sayan rakam (rakamlar bandı).
 *  reduced-motion veya JS yoksa doğrudan hedef değer görünür. */
export default function Sayac({
  hedef,
  onEk = "",
  sonEk = "",
  ayrac,
}: {
  hedef: number;
  onEk?: string;
  sonEk?: string;
  /** binlik ayracı locale'i; yıl gibi düz sayılar için undefined bırak */
  ayrac?: "tr-TR" | "en-US";
}) {
  const kutu = useRef<HTMLSpanElement>(null);
  const [deger, setDeger] = useState(hedef);

  useEffect(() => {
    const el = kutu.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cerceve = 0;
    const io = new IntersectionObserver(
      (girisler) => {
        if (!girisler.some((g) => g.isIntersecting)) return;
        io.disconnect();
        const baslangic = performance.now();
        const SURE = 1200;
        const adim = (t: number) => {
          const oran = Math.min(1, (t - baslangic) / SURE);
          const yumusak = 1 - Math.pow(1 - oran, 3); // ease-out cubic
          setDeger(Math.round(hedef * yumusak));
          if (oran < 1) cerceve = requestAnimationFrame(adim);
        };
        setDeger(0);
        cerceve = requestAnimationFrame(adim);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(cerceve);
    };
  }, [hedef]);

  const metin = ayrac ? deger.toLocaleString(ayrac) : String(deger);

  return (
    <span ref={kutu}>
      {onEk}
      {metin}
      {sonEk}
    </span>
  );
}
