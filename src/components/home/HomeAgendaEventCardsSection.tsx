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

function highlightedCardsGridClass(count: number): string {
  if (count === 1) {
    return "mx-auto max-w-2xl";
  }
  if (count === 2) {
    return "mx-auto max-w-5xl md:grid-cols-2";
  }
  return "mx-auto max-w-7xl md:grid-cols-3";
}

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
            <div
              className={clsx(
                "grid items-stretch gap-7 md:gap-8",
                tone === "highlighted"
                  ? highlightedCardsGridClass(items.length)
                  : "md:grid-cols-3 md:pr-14",
              )}
            >
              {items.map((item) => {
                const formattedDate = formatAgendaDate(item.date, locale);
                const isHighlighted = tone === "highlighted";
                return (
                  <article
                    className={clsx(
                      "flex h-full min-h-0 w-full flex-row overflow-hidden rounded-md border",
                      articleToneClass[tone],
                    )}
                    key={item.id}
                  >
                    <AgendaEventCardBody
                      description={item.description}
                      formattedDate={formattedDate}
                      isoDate={item.date}
                      title={item.title}
                      variant={cardBodyVariant[tone]}
                    />
                    <AgendaEventCardMedia
                      alt={imageAlt}
                      imageSize={isHighlighted ? "wide" : "default"}
                      imageUrl={item.imageUrl}
                      placement="right"
                      sizes={
                        isHighlighted
                          ? "(max-width: 768px) 40vw, 22rem"
                          : "(max-width: 768px) 100vw, 33vw"
                      }
                    />
                  </article>
                );
              })}
            </div>
          )}
          <div
            className={clsx(
              "mt-8 flex justify-center md:absolute md:top-1/2 md:mt-0 md:-translate-y-1/2",
              tone === "highlighted" ? "md:right-8" : "md:right-0 md:justify-end",
            )}
          >
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
