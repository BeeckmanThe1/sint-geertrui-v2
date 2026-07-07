import { getTranslations } from "next-intl/server";
import { AgendaEventCardBody } from "@/components/agenda/AgendaEventCardBody";
import { AgendaEventCardMedia } from "@/components/agenda/AgendaEventCardMedia";
import { formatAgendaDate, type AgendaEventItem } from "@/lib/agenda-events";

type AgendaEventGridProps = {
  locale: string;
  items: AgendaEventItem[];
};

export async function AgendaEventGrid({ locale, items }: AgendaEventGridProps) {
  const t = await getTranslations({ locale, namespace: "agenda" });

  if (items.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-zinc-700">{t("empty")}</p>
    );
  }

  return (
    <div className="grid items-stretch gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {items.map((item) => {
        const formattedDate = formatAgendaDate(item.date, locale);
        return (
          <article
            className="flex h-full min-h-0 flex-row overflow-hidden rounded-md border border-zinc-900/10 bg-[#f5eedc] shadow-md shadow-black/[0.07] ring-1 ring-white/35"
            key={item.id}
          >
            <AgendaEventCardBody
              description={item.description}
              formattedDate={formattedDate}
              isoDate={item.date}
              title={item.title}
              variant="agenda"
            />
            <AgendaEventCardMedia
              alt={t("imageAlt")}
              imageUrl={item.imageUrl}
              placement="right"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </article>
        );
      })}
    </div>
  );
}
