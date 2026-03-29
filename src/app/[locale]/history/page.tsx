import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { HistoryArticle } from "@/components/history/HistoryArticle";
import { HistoryBookCarousel } from "@/components/history/HistoryBookCarousel";
import { HistoryHero } from "@/components/history/HistoryHero";

type HistoryPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: HistoryPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "history" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function HistoryPage({ params }: HistoryPageProps) {
  const { locale } = await params;

  return (
    <div className="bg-[#bdb7a6]">
      <HistoryHero locale={locale} />
      <HistoryArticle locale={locale} />
      <HistoryBookCarousel />
    </div>
  );
}
