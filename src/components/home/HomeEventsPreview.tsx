import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const CARD_IMAGE_SRC = [
  "https://picsum.photos/seed/sg-home-event-1/480/320",
  "https://picsum.photos/seed/sg-home-event-2/480/320",
  "https://picsum.photos/seed/sg-home-event-3/480/320",
] as const;

const CARD_KEYS = ["card1", "card2", "card3"] as const;

type HomeEventsPreviewProps = {
  locale: string;
};

export async function HomeEventsPreview({ locale }: HomeEventsPreviewProps) {
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <section className="bg-[#d4d0c4] py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 className="text-center font-serif text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
          {t("events.title")}
        </h2>
        <div className="relative mt-10 md:mt-14">
          <div className="grid items-stretch gap-7 md:grid-cols-3 md:gap-8 md:pr-14">
            {CARD_KEYS.map((key, index) => (
              <article
                className="flex h-full min-h-0 flex-col overflow-hidden rounded-sm bg-transparent shadow-none"
                key={key}
              >
                <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-zinc-400/80">
                  <Image
                    alt={t("events.imageAlt")}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    src={CARD_IMAGE_SRC[index]}
                  />
                </div>
                <div className="flex flex-1 flex-col justify-start bg-[#c9b896] px-4 py-4 text-zinc-900">
                  <p className="text-sm leading-snug">
                    <span className="font-semibold tabular-nums">
                      {t(`events.${key}.date`)}
                    </span>
                    <span className="mx-2 font-light text-zinc-700">|</span>
                    <span>{t(`events.${key}.description`)}</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 flex justify-center md:absolute md:right-0 md:top-1/2 md:mt-0 md:-translate-y-1/2 md:justify-end">
            <Link
              aria-label={t("events.nextEventsAria")}
              className="inline-flex min-h-12 min-w-12 items-center justify-center text-3xl font-bold leading-none text-zinc-900 transition hover:opacity-65"
              href="/agenda"
              locale={locale}
            >
              →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
