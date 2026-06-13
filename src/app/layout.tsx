import type { Metadata } from "next";
import { SITE_DESCRIPTION_NL, SITE_NAME } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION_NL,
  verification: {
    google: "YsxlVx8Q70FdW49F3dWdw-Vv87NX137NP6S5omzuku8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
