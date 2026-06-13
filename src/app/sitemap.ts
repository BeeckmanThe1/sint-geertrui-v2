import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getLocalizedPath, SITEMAP_PATHNAMES } from "@/lib/site-paths";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();

  return routing.locales.flatMap((locale) =>
    SITEMAP_PATHNAMES.map((pathname) => {
      const languages = Object.fromEntries(
        routing.locales.map((alternateLocale) => [
          alternateLocale,
          `${baseUrl}${getLocalizedPath(alternateLocale, pathname)}`,
        ]),
      );

      return {
        url: `${baseUrl}${getLocalizedPath(locale, pathname)}`,
        lastModified: new Date(),
        changeFrequency: pathname === "/" ? "weekly" : "monthly",
        priority: pathname === "/" ? 1 : 0.8,
        alternates: {
          languages: {
            ...languages,
            "x-default": `${baseUrl}${getLocalizedPath(routing.defaultLocale, pathname)}`,
          },
        },
      };
    }),
  );
}
