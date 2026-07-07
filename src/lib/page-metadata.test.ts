import { buildPageAlternates } from "@/lib/page-metadata";
import { SITE_URL } from "@/lib/site";

describe("buildPageAlternates", () => {
  it("uses prefixed default-locale URLs for canonical and x-default", () => {
    expect(buildPageAlternates("nl", "/agenda")).toEqual({
      canonical: `${SITE_URL}/nl/agenda`,
      languages: {
        nl: `${SITE_URL}/nl/agenda`,
        fr: `${SITE_URL}/fr/agenda`,
        en: `${SITE_URL}/en/agenda`,
        "x-default": `${SITE_URL}/nl/agenda`,
      },
    });
  });

  it("uses locale-specific path segments", () => {
    expect(buildPageAlternates("fr", "/history")).toEqual({
      canonical: `${SITE_URL}/fr/histoire`,
      languages: {
        nl: `${SITE_URL}/nl/geschiedenis`,
        fr: `${SITE_URL}/fr/histoire`,
        en: `${SITE_URL}/en/history`,
        "x-default": `${SITE_URL}/nl/geschiedenis`,
      },
    });
  });
});
