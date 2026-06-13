import { pathnames, SITEMAP_PATHNAMES, type AppPathname } from "@/i18n/pathnames";

export { SITEMAP_PATHNAMES, type AppPathname };

/** Localized URL path segment for a locale (e.g. `/nl/restauratie`). */
export function getLocalizedPath(locale: string, pathname: AppPathname): string {
  const config = pathnames[pathname];
  const segment = typeof config === "string" ? config : config[locale as keyof typeof config];

  if (segment === "/") {
    return `/${locale}`;
  }

  return `/${locale}${segment}`;
}
