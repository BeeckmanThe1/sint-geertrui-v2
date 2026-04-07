import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    // Omit `search` so local `src` may include `?v=` cache-bust (default pattern uses
    // search: "" and rejects any query string on `next/image`).
    localPatterns: [{ pathname: "**" }],
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "fastly.picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/**" },
    ],
  },
};

export default withNextIntl(nextConfig);
