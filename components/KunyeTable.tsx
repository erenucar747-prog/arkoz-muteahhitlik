import type { Dil, KunyeSatiri } from "@/lib/content";

export default function KunyeTable({
  kunye,
  dil,
}: {
  kunye: KunyeSatiri[];
  dil: Dil;
}) {
  if (!kunye.length) return null;

  return (
    <dl className="kunye">
      {kunye.map((satir, i) => (
        <div className="kunye__satir" key={i}>
          <dt>{satir.label[dil]}</dt>
          <dd>{satir.value[dil]}</dd>
        </div>
      ))}
    </dl>
  );
}
