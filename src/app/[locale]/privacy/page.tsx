import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LegalDocPage } from "@/components/legal/LegalDocPage";
import { buildPageMetadata } from "@/lib/page-metadata";

type PrivacyPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacyPage" });

  return buildPageMetadata(locale, "/privacy", {
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;

  return <LegalDocPage locale={locale} namespace="privacyPage" />;
}
