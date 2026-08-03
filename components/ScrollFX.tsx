"use client";

import { useEffect, useLayoutEffect } from "react";
import Lenis from "lenis";
import { usePathname } from "@/i18n/navigation";

// Rota geçişlerinde bir karelik görünüp-gizlenme titremesini önler (paint öncesi damgala)
const useIzoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

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
  useIzoLayoutEffect(() => {
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

    // Klavye güvencesi: gizli bir öğeye odaklanılırsa anında göster (WCAG 2.4.7)
    const odakKurtar = (e: FocusEvent) => {
      const el = (e.target as HTMLElement).closest?.(
        '[data-reveal="bekliyor"]'
      ) as HTMLElement | null;
      if (el) el.dataset.reveal = "goster";
    };
    document.addEventListener("focusin", odakKurtar);

    return () => {
      io.disconnect();
      document.removeEventListener("focusin", odakKurtar);
      // Hiçbir öğe kalıcı gizli kalmasın (rota değişimi/temizlik güvencesi)
      document
        .querySelectorAll<HTMLElement>('[data-reveal="bekliyor"]')
        .forEach((el) => {
          el.dataset.reveal = "goster";
        });
    };
  }, [pathname]);

  return null;
}
