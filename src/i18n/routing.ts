import { defineRouting } from "next-intl/routing";
import { DEFAULT_LOCALE, LOCALES, pathnames } from "./pathnames";

export const routing = defineRouting({
  locales: [...LOCALES],
  defaultLocale: DEFAULT_LOCALE,
  // Do not follow Accept-Language / locale cookie so first visit uses Dutch unless the URL is /fr or /en.
  localeDetection: false,
  localePrefix: "always",
  // next-intl's Link header uses unprefixed x-default URLs that redirect; we set hreflang in page metadata.
  alternateLinks: false,
  pathnames,
});
