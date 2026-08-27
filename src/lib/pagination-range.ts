export type PaginationRangeItem =
  | { type: "page"; page: number }
  | { type: "ellipsis" };

/**
 * Builds a compact page list with ellipses when there are many pages.
 * Shows all pages when totalPages <= maxVisible; otherwise first, last,
 * and a window around the current page.
 */
export function buildPaginationRange(
  currentPage: number,
  totalPages: number,
  maxVisible = 7,
): PaginationRangeItem[] {
  if (totalPages <= 1) {
    return [];
  }

  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, index) => ({
      type: "page" as const,
      page: index + 1,
    }));
  }

  const items: PaginationRangeItem[] = [{ type: "page", page: 1 }];

  let start = Math.max(2, currentPage - 1);
  let end = Math.min(totalPages - 1, currentPage + 1);

  if (currentPage <= 3) {
    start = 2;
    end = 4;
  }

  if (currentPage >= totalPages - 2) {
    start = totalPages - 3;
    end = totalPages - 1;
  }

  if (start > 2) {
    items.push({ type: "ellipsis" });
  }

  for (let page = start; page <= end; page += 1) {
    items.push({ type: "page", page });
  }

  if (end < totalPages - 1) {
    items.push({ type: "ellipsis" });
  }

  items.push({ type: "page", page: totalPages });

  return items;
}
