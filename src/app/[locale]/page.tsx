import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { HomeEventsPreview } from "@/components/home/HomeEventsPreview";
import { HomeHero } from "@/components/home/HomeHero";
import { HomePanorama } from "@/components/home/HomePanorama";
import { HomeYouTube } from "@/components/home/HomeYouTube";

type LocaleHomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: LocaleHomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function LocaleHomePage({ params }: LocaleHomePageProps) {
  const { locale } = await params;

  return (
    <>
      <HomeHero locale={locale} />
      <HomeEventsPreview locale={locale} />
      <HomeYouTube locale={locale} />
      <HomePanorama locale={locale} />
    </>
  );
}
