import { buildPaginationRange } from "./pagination-range";

function pages(range: ReturnType<typeof buildPaginationRange>): number[] {
  return range
    .filter((item) => item.type === "page")
    .map((item) => item.page);
}

describe("buildPaginationRange", () => {
  it("returns nothing for a single page", () => {
    expect(buildPaginationRange(1, 1)).toEqual([]);
  });

  it("shows all pages when total is within the visible cap", () => {
    expect(buildPaginationRange(3, 7)).toEqual([
      { type: "page", page: 1 },
      { type: "page", page: 2 },
      { type: "page", page: 3 },
      { type: "page", page: 4 },
      { type: "page", page: 5 },
      { type: "page", page: 6 },
      { type: "page", page: 7 },
    ]);
  });

  it("collapses the start of a long range", () => {
    expect(buildPaginationRange(1, 12)).toEqual([
      { type: "page", page: 1 },
      { type: "page", page: 2 },
      { type: "page", page: 3 },
      { type: "page", page: 4 },
      { type: "ellipsis" },
      { type: "page", page: 12 },
    ]);
  });

  it("shows a middle window with ellipses on both sides", () => {
    expect(buildPaginationRange(6, 12)).toEqual([
      { type: "page", page: 1 },
      { type: "ellipsis" },
      { type: "page", page: 5 },
      { type: "page", page: 6 },
      { type: "page", page: 7 },
      { type: "ellipsis" },
      { type: "page", page: 12 },
    ]);
  });

  it("collapses the end of a long range", () => {
    expect(buildPaginationRange(12, 12)).toEqual([
      { type: "page", page: 1 },
      { type: "ellipsis" },
      { type: "page", page: 9 },
      { type: "page", page: 10 },
      { type: "page", page: 11 },
      { type: "page", page: 12 },
    ]);
  });

  it("always includes the first and last page", () => {
    for (let page = 1; page <= 12; page += 1) {
      const range = buildPaginationRange(page, 12);
      expect(pages(range)).toEqual(
        expect.arrayContaining([1, 12]),
      );
    }
  });
});
