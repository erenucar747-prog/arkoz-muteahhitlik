"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Gorsel } from "@/lib/content";

export default function Gallery({
  gorseller,
  altOnEk,
  kapatEtiketi,
}: {
  gorseller: Gorsel[];
  altOnEk: string;
  kapatEtiketi: string;
}) {
  const [aktif, setAktif] = useState<Gorsel | null>(null);
  const kutu = useRef<HTMLDialogElement>(null);

  const ac = useCallback((g: Gorsel) => {
    setAktif(g);
    kutu.current?.showModal();
    document.body.classList.add("kilitli"); // arka plan kaydırma kilidi
  }, []);

  const kapat = useCallback(() => {
    kutu.current?.close();
  }, []);

  // Kapanış hangi yoldan gelirse gelsin (ESC/cancel/close()) kilidi bırak:
  // event'e değil `open` özniteliğinin kendisine bağlanıyoruz
  useEffect(() => {
    const d = kutu.current;
    if (!d) return;
    const temizle = () => {
      if (!d.open) {
        setAktif(null);
        document.body.classList.remove("kilitli");
      }
    };
    d.addEventListener("close", temizle);
    const mo = new MutationObserver(temizle);
    mo.observe(d, { attributes: true, attributeFilter: ["open"] });
    return () => {
      d.removeEventListener("close", temizle);
      mo.disconnect();
      document.body.classList.remove("kilitli");
    };
  }, []);

  if (!gorseller.length) return null;

  return (
    <>
      <div className="galeri">
        {gorseller.map((g, i) => (
          <button key={g.src} type="button" onClick={() => ac(g)}>
            <Image
              src={g.src}
              alt={`${altOnEk} — ${i + 1}`}
              width={g.w}
              height={g.h}
              sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 270px"
            />
          </button>
        ))}
      </div>
      <dialog
        ref={kutu}
        className="lightbox"
        onClick={(e) => {
          const hedef = e.target as HTMLElement;
          if (hedef === kutu.current || hedef.classList.contains("lightbox__fon"))
            kapat();
        }}
      >
        <div className="lightbox__fon">
          {aktif && (
            /* eslint-disable-next-line @next/next/no-img-element -- lightbox bilinçli olarak orijinal dosyayı gösterir */
            <img
              className="lightbox__resim"
              src={aktif.src}
              alt={altOnEk}
              width={aktif.w}
              height={aktif.h}
              style={{ maxWidth: `min(${aktif.w}px, 96vw)` }}
            />
          )}
          <button
            type="button"
            className="lightbox__kapat"
            onClick={kapat}
            aria-label={kapatEtiketi}
          >
            ×
          </button>
        </div>
      </dialog>
    </>
  );
}
