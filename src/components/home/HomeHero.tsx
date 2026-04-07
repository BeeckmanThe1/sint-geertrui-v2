import Image from "next/image";
import { getTranslations } from "next-intl/server";

const HERO_IMAGE_SRC = "/images/home/sint-geertrui-kerk.jpg";

type HomeHeroProps = {
  locale: string;
};

export async function HomeHero({ locale }: HomeHeroProps) {
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <section className="relative isolate min-h-[min(85vh,720px)] w-full overflow-hidden bg-zinc-900">
      <h1 className="sr-only">{t("metaTitle")}</h1>
      <Image
        alt={t("hero.imageAlt")}
        className="object-cover opacity-[0.92]"
        fill
        priority
        sizes="100vw"
        src={HERO_IMAGE_SRC}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40"
      />
      <div className="relative z-10 mx-auto flex min-h-[min(85vh,720px)] w-full max-w-7xl flex-col items-center justify-center px-5 py-16 sm:px-8">
        <div
          className="max-w-lg rounded-sm bg-white px-6 py-6 shadow-lg sm:px-8 sm:py-8 md:max-w-xl"
          id="missie"
        >
          <blockquote className="border-none p-0">
            <p className="whitespace-pre-line text-pretty text-sm leading-relaxed text-zinc-700 sm:text-base">
              {t("hero.missionBody")}
            </p>
            <footer className="mt-4 text-right text-sm font-medium text-zinc-600 not-italic">
              {t("hero.missionAuthor")}
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
