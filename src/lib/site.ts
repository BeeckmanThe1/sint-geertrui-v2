/** Site-wide constants for metadata and branding. */
export const SITE_NAME = "Sint-Geertruikerk Leuven";

export const SITE_DESCRIPTION_NL =
  "Ontdek geschiedenis, restauratie en activiteiten van de Sint-Geertruikerk in Leuven.";

/** Public production origin (no trailing slash). */
export const SITE_URL = "https://www.geertruikerk.be";

/** Canonical origin for sitemap, robots, and absolute metadata URLs. */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  return SITE_URL;
}
