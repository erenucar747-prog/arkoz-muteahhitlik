"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
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
  }, []);

  const kapat = useCallback(() => {
    kutu.current?.close();
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
          if (e.target === kutu.current) kapat();
        }}
        onClose={() => setAktif(null)}
      >
        {aktif && (
          <img
            className="lightbox__resim"
            src={aktif.src}
            alt={altOnEk}
            width={aktif.w}
            height={aktif.h}
            style={{ maxWidth: aktif.w }}
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
      </dialog>
    </>
  );
}
