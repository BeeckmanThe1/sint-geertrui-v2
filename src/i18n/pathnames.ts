/** Shared pathname map for next-intl routing and the sitemap. */
export const pathnames = {
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
} as const;

export type AppPathname = keyof typeof pathnames;

/** Routes exposed in `/sitemap.xml`. */
export const SITEMAP_PATHNAMES: AppPathname[] = [
  "/",
  "/agenda",
  "/restoration",
  "/contact",
  "/privacy",
  "/cookies",
  "/history",
];
