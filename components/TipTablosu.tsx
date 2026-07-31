import type { Dil, TipSatiri } from "@/lib/content";

export default function TipTablosu({
  satirlar,
  dil,
  baslik,
  kolonlar,
}: {
  satirlar: TipSatiri[];
  dil: Dil;
  baslik: string;
  kolonlar: { tip: string; adet: string; m2: string };
}) {
  if (!satirlar.length) return null;

  return (
    <table className="tip-tablo">
      <caption>{baslik}</caption>
      <thead>
        <tr>
          <th scope="col">{kolonlar.tip}</th>
          <th scope="col">{kolonlar.adet}</th>
          <th scope="col">{kolonlar.m2}</th>
        </tr>
      </thead>
      <tbody>
        {satirlar.map((s, i) => (
          <tr key={i}>
            <td>{typeof s.tip === "string" ? s.tip : s.tip[dil]}</td>
            <td>{s.adet}</td>
            <td>{s.m2}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
