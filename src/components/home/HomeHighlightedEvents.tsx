import { getTranslations } from "next-intl/server";
import { HomeAgendaEventCardsSection } from "@/components/home/HomeAgendaEventCardsSection";
import type { AgendaEventItem } from "@/lib/agenda-events";

type HomeHighlightedEventsProps = {
  locale: string;
  items: AgendaEventItem[];
};

export async function HomeHighlightedEvents({ locale, items }: HomeHighlightedEventsProps) {
  if (items.length === 0) {
    return null;
  }

  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <HomeAgendaEventCardsSection
      agendaLinkAria={t("events.nextEventsAria")}
      imageAlt={t("events.imageAlt")}
      items={items}
      locale={locale}
      title={t("highlighted.title")}
      tone="highlighted"
    />
  );
}
