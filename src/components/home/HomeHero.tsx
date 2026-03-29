import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const HERO_IMAGE_SRC = "/images/home/sint-geertrui-kerk.jpg";

type HomeHeroProps = {
  locale: string;
};

export async function HomeHero({ locale }: HomeHeroProps) {
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <section className="relative isolate min-h-[min(85vh,720px)] w-full overflow-hidden bg-zinc-900">
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
          <h1 className="text-balance text-xl font-semibold text-zinc-900 sm:text-2xl">
            {t("hero.missionTitle")}
          </h1>
          <p className="mt-4 text-pretty text-sm leading-relaxed text-zinc-700 sm:text-base">
            {t("hero.missionBody")}
          </p>
        </div>
        <div className="pointer-events-auto absolute bottom-6 right-5 z-20 max-w-[min(100%,22rem)] sm:bottom-10 sm:right-8">
          <Link
            className="inline-flex rounded-full bg-white px-4 py-2.5 text-center text-xs font-medium leading-snug text-zinc-900 shadow-md ring-1 ring-black/5 transition hover:bg-zinc-50 sm:px-5 sm:text-sm"
            href="/contact"
            locale={locale}
          >
            {t("newsletter.cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
