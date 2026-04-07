/**
 * Paths under /public for the history page archival carousel (oude-doos assets).
 * Order is stable for predictable navigation.
 *
 * Bump `CACHE_BUST` when JPEGs in /public/images/history/gallery/ are replaced
 * so browsers and CDNs fetch the new files instead of a stale cache entry.
 */
export const HISTORY_GALLERY_CACHE_BUST = "1";

const PATHS = [
  "/images/history/gallery/IMG_1341.jpg",
  "/images/history/gallery/IMG_1343.jpg",
  "/images/history/gallery/IMG_1344.jpg",
  "/images/history/gallery/IMG_1346.jpg",
  "/images/history/gallery/IMG_1347.jpg",
  "/images/history/gallery/IMG_1348.jpg",
  "/images/history/gallery/IMG_1350.jpg",
  "/images/history/gallery/IMG_1354.jpg",
  "/images/history/gallery/IMG_1356.jpg",
  "/images/history/gallery/IMG_1357.jpg",
] as const;

function withCacheBust(path: string): string {
  return `${path}?v=${HISTORY_GALLERY_CACHE_BUST}`;
}

export const HISTORY_GALLERY: string[] = PATHS.map((path) => withCacheBust(path));
