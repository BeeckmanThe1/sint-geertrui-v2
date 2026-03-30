import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
  AGENDA_CATEGORY_IMAGE_SEEDS,
  formatAgendaDate,
  type AgendaEventItem,
} from "@/lib/agenda-events";

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
        const seed = AGENDA_CATEGORY_IMAGE_SEEDS[item.category];
        const src = `https://picsum.photos/seed/${encodeURIComponent(seed)}/640/480`;
        const formattedDate = formatAgendaDate(item.date, locale);
        return (
          <article
            className="flex h-full min-h-0 flex-col overflow-hidden rounded-sm shadow-sm shadow-black/5"
            key={item.id}
          >
            <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-zinc-400/50">
              <Image
                alt={t("imageAlt")}
                className="object-cover"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                src={src}
              />
            </div>
            <div className="flex flex-1 flex-col justify-start bg-[#f5eedc] px-4 py-4 text-zinc-900">
              <p className="text-sm leading-snug">
                <span className="font-semibold tabular-nums">{formattedDate}</span>
                <span className="mx-2 font-light text-zinc-600">|</span>
                <span className="font-semibold">{item.title}</span>
              </p>
              <p className="mt-2 text-sm leading-snug text-zinc-800">{item.description}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
