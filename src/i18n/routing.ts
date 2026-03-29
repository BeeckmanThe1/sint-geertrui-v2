import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["nl", "fr", "en"],
  defaultLocale: "nl",
  pathnames: {
    "/": "/",
    "/agenda": "/agenda",
    "/restauratie": "/restauratie",
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
