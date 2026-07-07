import type { Metadata } from "next";
import type { AppPathname } from "@/i18n/pathnames";
import { DEFAULT_LOCALE, LOCALES } from "@/i18n/pathnames";
import { getSiteUrl } from "@/lib/site";
import { getLocalizedPath } from "@/lib/site-paths";

type PageMetaInput = Pick<Metadata, "title" | "description">;

/** Canonical URL and hreflang alternates for a localized route. */
export function buildPageAlternates(
  locale: string,
  pathname: AppPathname,
): NonNullable<Metadata["alternates"]> {
  const baseUrl = getSiteUrl();
  const canonicalPath = getLocalizedPath(locale, pathname);
  const defaultPath = getLocalizedPath(DEFAULT_LOCALE, pathname);

  const languages = Object.fromEntries(
    LOCALES.map((loc) => [loc, `${baseUrl}${getLocalizedPath(loc, pathname)}`]),
  );

  return {
    canonical: `${baseUrl}${canonicalPath}`,
    languages: {
      ...languages,
      "x-default": `${baseUrl}${defaultPath}`,
    },
  };
}

/** Page metadata with a self-referencing canonical and consistent hreflang URLs. */
export function buildPageMetadata(
  locale: string,
  pathname: AppPathname,
  meta: PageMetaInput,
): Metadata {
  return {
    ...meta,
    alternates: buildPageAlternates(locale, pathname),
  };
}
