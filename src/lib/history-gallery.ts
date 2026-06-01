/**
 * Paths under /public for the history page archival carousel (oude-doos assets).
 * Order is stable for predictable navigation.
 *
 * Bump `CACHE_BUST` when JPEGs in /public/images/history/gallery/ are replaced
 * so browsers and CDNs fetch the new files instead of a stale cache entry.
 */
export const HISTORY_GALLERY_CACHE_BUST = "2";

const PATHS = [
  "/images/history/gallery/IMG_1343.jpeg",
  "/images/history/gallery/IMG_1344.jpeg",
  "/images/history/gallery/IMG_1346.jpeg",
  "/images/history/gallery/IMG_1347.jpeg",
  "/images/history/gallery/IMG_1348.jpeg",
  "/images/history/gallery/IMG_1350.jpeg",
  "/images/history/gallery/IMG_1354.jpeg",
  "/images/history/gallery/IMG_1356.jpeg",
  "/images/history/gallery/IMG_1357.jpeg",
] as const;

function withCacheBust(path: string): string {
  return `${path}?v=${HISTORY_GALLERY_CACHE_BUST}`;
}

export const HISTORY_GALLERY: string[] = PATHS.map((path) => withCacheBust(path));
