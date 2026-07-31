import fs from "node:fs";
import path from "node:path";

export type Dil = "tr" | "en";
export type Yerel = { tr: string; en: string };
export type Gorsel = { src: string; w: number; h: number; thumbOnly?: boolean };
export type KunyeSatiri = { label: Yerel; value: Yerel };
export type TipSatiri = { tip: string | Yerel; adet: number; m2: string };

export type Proje = {
  slug: string;
  slugEn: string;
  category: string;
  flagship?: boolean;
  title: Yerel;
  summary: Yerel;
  body: { tr: string[]; en: string[] };
  kunye: KunyeSatiri[];
  tipTablosu?: TipSatiri[];
  cover: Gorsel | null;
  gallery: Gorsel[];
};

export type Sektor = { ad: Yerel; istatistik: Yerel };

export type Sayfa = {
  slug: string;
  title: Yerel;
  body: { tr: string[]; en: string[] };
  kunye?: KunyeSatiri[];
};

const KOK = process.cwd();

function jsonOku<T>(...parcalar: string[]): T {
  const dosya = path.join(KOK, "content", ...parcalar);
  return JSON.parse(fs.readFileSync(dosya, "utf8")) as T;
}

let projeOnbellek: Proje[] | null = null;

/** Kaynak JSON'larda opsiyonel alanlar eksik olabilir — güvenli varsayılanlar doldurulur. */
function normalize(ham: Partial<Proje> & Record<string, unknown>): Proje {
  const summary = (ham.summary ?? {}) as Partial<Yerel>;
  const body = (ham.body ?? {}) as Partial<{ tr: string[]; en: string[] }>;
  return {
    ...(ham as Proje),
    summary: {
      tr: summary.tr ?? "",
      en: summary.en ?? summary.tr ?? "",
    },
    body: { tr: body.tr ?? [], en: body.en ?? [] },
    kunye: ham.kunye ?? [],
    gallery: ham.gallery ?? [],
    cover: ham.cover ?? null,
  };
}

export function tumProjeler(): Proje[] {
  if (!projeOnbellek) {
    const klasor = path.join(KOK, "content", "projects");
    projeOnbellek = fs
      .readdirSync(klasor)
      .filter((d) => d.endsWith(".json"))
      .map((d) =>
        normalize(
          JSON.parse(fs.readFileSync(path.join(klasor, d), "utf8"))
        )
      );
  }
  return projeOnbellek;
}

export function projeGetir(slug: string): Proje | undefined {
  return tumProjeler().find((p) => p.slug === slug || p.slugEn === slug);
}

export function sektorler(): Record<string, Sektor> {
  return jsonOku<Record<string, Sektor>>("sectors.json");
}

export function sayfaGetir(slug: string): Sayfa {
  return jsonOku<Sayfa>("pages", `${slug}.json`);
}

/** EN gövdesi boşsa TR'ye düşer (çeviri uydurulmaz — Faz 9 raporuna girer). */
export function govde(p: { body: { tr: string[]; en: string[] } }, dil: Dil): string[] {
  return dil === "en" && p.body.en.length ? p.body.en : p.body.tr;
}
