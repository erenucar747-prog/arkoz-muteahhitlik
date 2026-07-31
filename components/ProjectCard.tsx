import { Link } from "@/i18n/navigation";
import type { Dil, Proje } from "@/lib/content";

export default function ProjectCard({
  proje,
  dil,
  kategoriAd,
  genis = false,
}: {
  proje: Proje;
  dil: Dil;
  kategoriAd: string;
  genis?: boolean;
}) {
  const gorsel = proje.cover ?? proje.gallery[0];
  if (!gorsel) return null;

  return (
    <Link
      className={`proje-kart${genis ? " proje-kart--genis" : ""}`}
      href={`/projelerimiz/${proje.slug}`}
    >
      <img
        src={gorsel.src}
        alt={proje.title[dil]}
        width={gorsel.w}
        height={gorsel.h}
        loading="lazy"
      />
      <div className="proje-kart__yazi">
        <h3 className="proje-kart__ad">{proje.title[dil]}</h3>
        <p className="proje-kart__meta">{kategoriAd}</p>
      </div>
    </Link>
  );
}
