import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { HistoryArticle } from "@/components/history/HistoryArticle";
import { HistoryBookCarouselWrapper } from "@/components/history/HistoryBookCarousel";

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

export default async function HistoryPage() {
  return (
    <div className="bg-zinc-100">
      <div className="mx-auto w-full max-w-[65rem] bg-[#bdb7a6] py-16">
        <HistoryArticle/>

        <HistoryBookCarouselWrapper/>
      </div>
    </div>
  );
}
