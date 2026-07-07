import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LegalDocPage } from "@/components/legal/LegalDocPage";
import { buildPageMetadata } from "@/lib/page-metadata";

type CookiesPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: CookiesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cookiesPage" });

  return buildPageMetadata(locale, "/cookies", {
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function CookiesPage({ params }: CookiesPageProps) {
  const { locale } = await params;

  return <LegalDocPage locale={locale} namespace="cookiesPage" />;
}
