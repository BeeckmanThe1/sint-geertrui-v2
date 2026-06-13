import { defineRouting } from "next-intl/routing";
import { pathnames } from "./pathnames";

export const routing = defineRouting({
  locales: ["nl", "fr", "en"],
  defaultLocale: "nl",
  // Do not follow Accept-Language / locale cookie so first visit uses Dutch unless the URL is /fr or /en.
  localeDetection: false,
  pathnames,
});
