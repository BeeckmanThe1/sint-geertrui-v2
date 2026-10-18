/**
 * Paths under /public for the history archival gallery (book teaser, lightbox, archive page).
 * Order is stable for predictable navigation.
 *
 * Bump `CACHE_BUST` when files in /public/images/history/gallery/ are replaced
 * so browsers and CDNs fetch the new files instead of a stale cache entry.
 */
export const HISTORY_GALLERY_CACHE_BUST = "3";

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
  "/images/history/gallery/archive-1914-street.jpg",
  "/images/history/gallery/archive-city-view.png",
  "/images/history/gallery/archive-ruins-wide.png",
  "/images/history/gallery/archive-ruins-spire.png",
  "/images/history/gallery/archive-tower-damage.png",
] as const;

function withCacheBust(path: string): string {
  return `${path}?v=${HISTORY_GALLERY_CACHE_BUST}`;
}

export const HISTORY_GALLERY: string[] = PATHS.map((path) => withCacheBust(path));

export function getHistoryGalleryCount(): number {
  return HISTORY_GALLERY.length;
}
