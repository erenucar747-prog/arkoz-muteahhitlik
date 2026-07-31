import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "en"],
  defaultLocale: "tr",
  localePrefix: "as-needed", // TR kökte (/projelerimiz), EN /en altında
  localeDetection: false,
});
