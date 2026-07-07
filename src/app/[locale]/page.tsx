import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { HomeEventsPreview } from "@/components/home/HomeEventsPreview";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeHighlightedEvents } from "@/components/home/HomeHighlightedEvents";
import { HomePanorama } from "@/components/home/HomePanorama";
import { HomeYouTube } from "@/components/home/HomeYouTube";
import { getHomeAgendaPreviewRows } from "@/lib/agenda-events";
import { buildPageMetadata } from "@/lib/page-metadata";

type LocaleHomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: LocaleHomePageProps): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale: await getLocale(), namespace: "home" });

  return buildPageMetadata(locale, "/", {
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function LocaleHomePage({ params }: LocaleHomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const resolvedLocale = await getLocale();
  const { highlighted, upcoming } = getHomeAgendaPreviewRows(resolvedLocale);

  return (
    <>
      <HomeHero locale={resolvedLocale} />
      <HomeHighlightedEvents items={highlighted} locale={resolvedLocale} />
      <HomeEventsPreview items={upcoming} locale={resolvedLocale} />
      <HomeYouTube locale={resolvedLocale} />
      <HomePanorama locale={resolvedLocale} />
    </>
  );
}
