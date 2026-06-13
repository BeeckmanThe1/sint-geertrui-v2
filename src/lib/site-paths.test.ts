import { getLocalizedPath } from "@/lib/site-paths";

describe("getLocalizedPath", () => {
  it("builds home and shared segment paths", () => {
    expect(getLocalizedPath("nl", "/")).toBe("/nl");
    expect(getLocalizedPath("fr", "/agenda")).toBe("/fr/agenda");
  });

  it("uses locale-specific segments from routing", () => {
    expect(getLocalizedPath("nl", "/restoration")).toBe("/nl/restauratie");
    expect(getLocalizedPath("fr", "/restoration")).toBe("/fr/restauration");
    expect(getLocalizedPath("en", "/history")).toBe("/en/history");
    expect(getLocalizedPath("nl", "/history")).toBe("/nl/geschiedenis");
  });
});
