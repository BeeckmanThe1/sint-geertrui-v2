import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { HistoryArchiveGallery } from "@/components/history/HistoryArchiveGallery";
import { buildPageMetadata } from "@/lib/page-metadata";

type HistoryGalleryPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: HistoryGalleryPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "history.galleryPage" });

  return buildPageMetadata(locale, "/history/gallery", {
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default function HistoryGalleryPage() {
  return <HistoryArchiveGallery />;
}
