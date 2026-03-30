import { getMessages, getTranslations } from "next-intl/server";
import { HomeYouTubeEmbed } from "@/components/home/HomeYouTubeEmbed";

type HomeMessages = {
  home?: {
    youtube?: {
      embedSrc?: string;
    };
  };
};

type HomeYouTubeProps = {
  locale: string;
};

/** YouTube video ID from embed URL `.../embed/VIDEO_ID?...` */
function youtubeVideoIdFromEmbedUrl(url: string): string | null {
  const match = url.match(/\/embed\/([^/?&]+)/);
  return match?.[1] ?? null;
}

export async function HomeYouTube({ locale }: HomeYouTubeProps) {
  const t = await getTranslations({ locale, namespace: "home" });
  const messages = (await getMessages({ locale })) as HomeMessages;
  const embedSrc = messages.home?.youtube?.embedSrc?.trim() ?? "";

  if (!embedSrc) {
    return null;
  }

  const videoId = youtubeVideoIdFromEmbedUrl(embedSrc);
  if (!videoId) {
    return null;
  }

  return (
    <HomeYouTubeEmbed
      embedBaseSrc={embedSrc}
      heading={t("youtube.title")}
      iframeTitle={t("youtube.iframeTitle")}
      posterAlt={t("youtube.posterAlt")}
      videoId={videoId}
    />
  );
}
