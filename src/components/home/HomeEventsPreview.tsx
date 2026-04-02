import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { formatAgendaDate, getUpcomingAgendaItems } from "@/lib/agenda-events";

const PREVIEW_LIMIT = 3;

type HomeEventsPreviewProps = {
  locale: string;
};

export async function HomeEventsPreview({ locale }: HomeEventsPreviewProps) {
  const t = await getTranslations({ locale, namespace: "home" });
  const upcoming = getUpcomingAgendaItems(PREVIEW_LIMIT);

  return (
    <section className="bg-[#d4d0c4] py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 className="text-center font-serif text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
          {t("events.title")}
        </h2>
        <div className="relative mt-10 md:mt-14">
          {upcoming.length === 0 ? (
            <p className="mx-auto max-w-xl py-6 text-center text-sm leading-relaxed text-zinc-700">
              {t("events.emptyUpcoming")}
            </p>
          ) : (
            <div className="grid items-stretch gap-7 md:grid-cols-3 md:gap-8 md:pr-14">
              {upcoming.map((item) => {
                const src = `https://picsum.photos/seed/${encodeURIComponent(`sg-home-${item.id}`)}/480/320`;
                const formattedDate = formatAgendaDate(item.date, locale);
                return (
                  <article
                    className="flex h-full min-h-0 flex-col overflow-hidden rounded-sm bg-transparent shadow-none"
                    key={item.id}
                  >
                    <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-zinc-400/80">
                      <Image
                        alt={t("events.imageAlt")}
                        className="object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        src={src}
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-start bg-[#c9b896] px-4 py-4 text-zinc-900">
                      <p className="text-sm leading-snug">
                        <span className="font-semibold tabular-nums">{formattedDate}</span>
                        <span className="mx-2 font-light text-zinc-700">|</span>
                        <span className="font-semibold">{item.title}</span>
                      </p>
                      <p className="mt-2 text-sm leading-snug text-zinc-800">{item.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
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
