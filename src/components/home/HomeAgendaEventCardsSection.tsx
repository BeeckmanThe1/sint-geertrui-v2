import clsx from "clsx";
import { AgendaEventCardBody } from "@/components/agenda/AgendaEventCardBody";
import { AgendaEventCardMedia } from "@/components/agenda/AgendaEventCardMedia";
import { Link } from "@/i18n/navigation";
import { formatAgendaDate, type AgendaEventItem } from "@/lib/agenda-events";

type HomeAgendaEventCardsSectionProps = {
  locale: string;
  title: string;
  /** Shown when `items` is empty (e.g. no upcoming events). Omit to render nothing when empty. */
  emptyMessage?: string;
  imageAlt: string;
  agendaLinkAria: string;
  items: AgendaEventItem[];
  /** `highlighted` = “In de kijker” strip (distinct from upcoming). */
  tone?: "default" | "highlighted";
};

const sectionToneClass: Record<NonNullable<HomeAgendaEventCardsSectionProps["tone"]>, string> = {
  default: "bg-[#d4d0c4]",
  highlighted:
    "border-y border-[#5c5346]/25 bg-[#b8ae9e] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]",
};

const articleToneClass: Record<NonNullable<HomeAgendaEventCardsSectionProps["tone"]>, string> = {
  default:
    "border-zinc-900/10 bg-[#e8e2d2] shadow-md shadow-black/[0.06] ring-1 ring-white/35",
  highlighted:
    "border-[#4a4234]/25 bg-[#e8e0d0] shadow-lg shadow-black/[0.1] ring-2 ring-[#6b5f45]/25",
};

const titleToneClass: Record<NonNullable<HomeAgendaEventCardsSectionProps["tone"]>, string> = {
  default: "text-zinc-900",
  highlighted: "text-[#1f1c18]",
};

const cardBodyVariant: Record<NonNullable<HomeAgendaEventCardsSectionProps["tone"]>, "home" | "homeHighlighted"> = {
  default: "home",
  highlighted: "homeHighlighted",
};

/**
 * Shared three-column event cards + agenda link (home “strip” layout).
 */
export function HomeAgendaEventCardsSection({
  locale,
  title,
  emptyMessage,
  imageAlt,
  agendaLinkAria,
  items,
  tone = "default",
}: HomeAgendaEventCardsSectionProps) {
  const isEmpty = items.length === 0;
  if (isEmpty && emptyMessage == null) {
    return null;
  }

  return (
    <section className={clsx("py-14 sm:py-20", sectionToneClass[tone])}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2
          className={clsx(
            "text-center font-serif text-2xl font-semibold tracking-tight sm:text-3xl",
            titleToneClass[tone],
          )}
        >
          {title}
        </h2>
        <div className="relative mt-10 md:mt-14">
          {isEmpty ? (
            <p className="mx-auto max-w-xl py-6 text-center text-sm leading-relaxed text-zinc-700">
              {emptyMessage}
            </p>
          ) : (
            <div className="grid items-stretch gap-7 md:grid-cols-3 md:gap-8 md:pr-14">
              {items.map((item) => {
                const formattedDate = formatAgendaDate(item.date, locale);
                return (
                  <article
                    className={clsx(
                      "flex h-full min-h-0 flex-col overflow-hidden rounded-md border",
                      articleToneClass[tone],
                    )}
                    key={item.id}
                  >
                    <AgendaEventCardMedia
                      alt={imageAlt}
                      imageUrl={item.imageUrl}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <AgendaEventCardBody
                      description={item.description}
                      formattedDate={formattedDate}
                      isoDate={item.date}
                      title={item.title}
                      variant={cardBodyVariant[tone]}
                    />
                  </article>
                );
              })}
            </div>
          )}
          <div className="mt-8 flex justify-center md:absolute md:right-0 md:top-1/2 md:mt-0 md:-translate-y-1/2 md:justify-end">
            <Link
              aria-label={agendaLinkAria}
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
