/** Site-wide constants for metadata and branding. */
export const SITE_NAME = "Sint-Geertruikerk Leuven";

export const SITE_DESCRIPTION_NL =
  "Ontdek geschiedenis, restauratie en activiteiten van de Sint-Geertruikerk in Leuven.";

/** Canonical origin for sitemap, robots, and absolute metadata URLs. */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    return `https://${vercelUrl.replace(/\/$/, "")}`;
  }

  return "http://localhost:3000";
}
