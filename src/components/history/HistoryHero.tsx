import Image from "next/image";
import { getTranslations } from "next-intl/server";

const HERO_SRC = "/images/history/hero.jpg";

type HistoryHeroProps = {
  locale: string;
};

export async function HistoryHero({ locale }: HistoryHeroProps) {
  const t = await getTranslations({ locale, namespace: "history" });

  return (
    <div className="relative h-[min(52vw,220px)] w-full sm:h-[min(48vw,340px)] md:h-[min(50vw,440px)]">
      <Image
        alt={t("heroAlt")}
        className="object-cover"
        fill
        priority
        sizes="100vw"
        src={HERO_SRC}
      />
    </div>
  );
}
