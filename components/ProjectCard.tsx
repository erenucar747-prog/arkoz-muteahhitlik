import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { projeYolu, type Dil, type Proje } from "@/lib/content";

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

  return (
    <Link
      className={`proje-kart${genis ? " proje-kart--genis" : ""}${
        gorsel ? "" : " proje-kart--yazi"
      }`}
      href={`/projelerimiz/${projeYolu(proje, dil)}`}
    >
      {gorsel && (
        <Image
          src={gorsel.src}
          alt={proje.title[dil]}
          width={gorsel.w}
          height={gorsel.h}
          sizes={
            genis
              ? "(max-width: 1199px) 100vw, 1120px"
              : "(max-width: 767px) 100vw, (max-width: 1199px) 45vw, 360px"
          }
        />
      )}
      <div className="proje-kart__yazi">
        <h3 className="proje-kart__ad">{proje.title[dil]}</h3>
        <p className="proje-kart__meta">{kategoriAd}</p>
      </div>
    </Link>
  );
}
