"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export default function LanguageSwitcher({ etiket }: { etiket: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const hedef = locale === "tr" ? "en" : "tr";

  return (
    <Link className="dil" href={pathname} locale={hedef} aria-label={etiket}>
      {hedef.toUpperCase()}
    </Link>
  );
}
