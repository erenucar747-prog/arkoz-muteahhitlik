import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import KunyeTable from "@/components/KunyeTable";
import { govde, sayfaGetir, type Dil } from "@/lib/content";

// v1 sitede Eren onayıyla yayınlanan değer kartları
const DEGERLER = [
  {
    baslik: {
      tr: "Birlikte üretmenin gücüne inanırız",
      en: "We believe in the power of producing together",
    },
    metin: {
      tr: "Çalışanlarımızın eğitimini ve kişisel gelişimini şirket kültürümüzün bir parçası olarak görür; potansiyellerini en iyi şekilde ortaya koyabilecekleri katılımcı bir şirket kültürü ve ortamı için çalışırız.",
      en: "We see the training and personal development of our employees as part of our company culture, and work for a participatory environment where they can realise their full potential.",
    },
  },
  {
    baslik: {
      tr: "Girişimci, yenilikçi ve öncüyüz",
      en: "Enterprising, innovative and pioneering",
    },
    metin: {
      tr: "Girişimcilikle harekete geçirdiğimiz tüm faaliyetlerimizde yenilikçiliğe ve yaratıcılığa değer veririz. Teknolojiye, tasarıma ve Ar-Ge'ye yatırım yapar; değişimin öncüsü, ilklerin adresi olmak için çalışırız.",
      en: "We value innovation and creativity in everything we set in motion. We invest in technology, design and R&D, and strive to lead change and pioneer firsts.",
    },
  },
  {
    baslik: {
      tr: "Ülke ve toplum için değer yaratırız",
      en: "We create value for country and society",
    },
    metin: {
      tr: "Yaptığımız tüm işlerin ve hayata geçirdiğimiz tüm projelerin ülkemiz ve toplumumuz için ortak bir değer yaratmasını hedefleriz.",
      en: "We aim for every job we do and every project we realise to create shared value for our country and society.",
    },
  },
  {
    baslik: {
      tr: "Sürdürülebilirlik anlayışıyla yönetiriz",
      en: "We manage with sustainability in mind",
    },
    metin: {
      tr: "Daha yaşanabilir bir dünya için tüm faaliyetlerimizin sürdürülebilirlik stratejimize uygunluğunu gözetiriz.",
      en: "For a more liveable world, we ensure all our activities align with our sustainability strategy.",
    },
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const sayfa = sayfaGetir("hakkimizda");
  return { title: sayfa.title[locale as Dil] };
}

export default async function Hakkimizda({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const dil = locale as Dil;
  const t = await getTranslations("Hakkimizda");
  const sayfa = sayfaGetir("hakkimizda");

  return (
    <>
      <div className="sayfa-bas">
        <div className="kapsayici sayfa-bas__ic">
          <p className="ustbaslik">{t("ustbaslik")}</p>
          <h1>{sayfa.title[dil]}</h1>
        </div>
      </div>

      <section className="bolum">
        <div className="kapsayici kurumsal__izgara">
          <div>
            {/* Kuruluş yılı — ARSİM görseli rakamların içinde (foto-maske) */}
            <p className="yil-maske" aria-hidden="true">
              1998
            </p>
            <div className="metin-govde">
              {govde(sayfa, dil).map((par, i) => (
                <p key={i}>{par}</p>
              ))}
            </div>
          </div>
          <div className="kurumsal__gorsel">
            <figure>
              {/* 1024×683 doğal boyut; figcaption zaten tanımlıyor — alt boş (tekrar önleme) */}
              <Image
                src="/marka/is-merkezi.png"
                alt=""
                width={1024}
                height={683}
                sizes="(max-width: 1023px) 100vw, 480px"
              />
              <figcaption>{t("isMerkeziAlt")}</figcaption>
            </figure>
            {sayfa.kunye && (
              <div className="bolum__eylem">
                <KunyeTable kunye={sayfa.kunye} dil={dil} />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bolum bolum--krem">
        <div className="kapsayici">
          <div className="bolum-bas">
            <p className="ustbaslik">{t("degerlerUst")}</p>
            <h2 className="baslik-buyuk">{t("degerlerBaslik")}</h2>
          </div>
          <div className="degerler">
            {DEGERLER.map((d, i) => (
              <article className="deger-kart" key={i}>
                <h3>{d.baslik[dil]}</h3>
                <p>{d.metin[dil]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
