import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["nl", "fr", "en"],
  defaultLocale: "nl",
  // Do not follow Accept-Language / locale cookie so first visit uses Dutch unless the URL is /fr or /en.
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/agenda": "/agenda",
    "/restoration": {
      nl: "/restauratie",
      fr: "/restauration",
      en: "/restoration",
    },
    "/contact": "/contact",
    "/privacy": "/privacy",
    "/cookies": "/cookies",
    "/history": {
      nl: "/geschiedenis",
      fr: "/histoire",
      en: "/history",
    },
  },
});
