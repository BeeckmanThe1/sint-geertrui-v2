import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { AgendaEventItem } from "@/lib/agenda-events";

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
    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {items.map((item) => {
        const src = `https://picsum.photos/seed/${item.seed}/640/480`;
        return (
          <article
            className="overflow-hidden rounded-sm shadow-sm shadow-black/5"
            key={item.id}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-400/50">
              <Image
                alt={t("imageAlt")}
                className="object-cover"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                src={src}
              />
            </div>
            <div className="bg-[#f5eedc] px-4 py-4 text-zinc-900">
              <p className="text-sm leading-snug">
                <span className="font-semibold tabular-nums">
                  {t(`events.${item.key}.date`)}
                </span>
                <span className="mx-2 font-light text-zinc-600">|</span>
                <span>{t(`events.${item.key}.description`)}</span>
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
