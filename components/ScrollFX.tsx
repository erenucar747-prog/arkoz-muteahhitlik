"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { usePathname } from "@/i18n/navigation";

/** Yumuşak kaydırma (Lenis) + bölüm reveal koreografisi.
 *  Gizleme sınıfları JS ile eklenir: JS yoksa içerik daima görünür (SEO/no-JS). */
const HEDEFLER = [
  ".bolum-bas",
  ".tanitim__izgara > *",
  ".sektor-izgara > *",
  ".vitrin > *",
  ".rakamlar__izgara > *",
  ".degerler > *",
  ".otel-liste > *",
  ".kurumsal__izgara > *",
  ".iletisim__izgara > *",
  ".galeri > *",
].join(", ");

export default function ScrollFX() {
  const pathname = usePathname();

  // Lenis — bir kez kurulur
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, duration: 1.05 });
    return () => lenis.destroy();
  }, []);

  // Reveal — rota değişiminde yeniden taranır
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elemanlar = Array.from(
      document.querySelectorAll<HTMLElement>(HEDEFLER)
    ).filter((el) => !el.dataset.reveal);
    if (!elemanlar.length) return;

    // Aynı ebeveyn içindeki sıra → kademeli gecikme
    for (const el of elemanlar) {
      const kardesler = Array.from(el.parentElement?.children ?? []);
      const sira = Math.max(0, kardesler.indexOf(el));
      el.dataset.reveal = "bekliyor";
      el.style.setProperty("--reveal-sira", String(Math.min(sira, 8)));
    }

    const io = new IntersectionObserver(
      (girisler) => {
        for (const g of girisler) {
          if (g.isIntersecting) {
            (g.target as HTMLElement).dataset.reveal = "goster";
            io.unobserve(g.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    elemanlar.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
