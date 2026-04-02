/** Generated from `concerts-and-events.csv` — run `npm run agenda:build`. */
import concertsData from "@/content/agenda/concerts.json";
/** Parish / community programme: edit `community.json` (`category` must be `community`). */
import communityData from "@/content/agenda/community.json";

export type AgendaCategory = "agenda" | "concerts" | "community";

/** Picsum seed per category (one stable image per filter tab). */
export const AGENDA_CATEGORY_IMAGE_SEEDS: Record<AgendaCategory, string> = {
  agenda: "lorem-ipsum-dolor-sit-amet-agenda",
  concerts: "lorem-ipsum-dolor-sit-amet-concerts",
  community: "lorem-ipsum-dolor-sit-amet-community",
};

export type AgendaEventItem = {
  id: string;
  category: AgendaCategory;
  title: string;
  description: string;
  /** ISO YYYY-MM-DD */
  date: string;
};

const CATEGORY_SET = new Set<string>(["agenda", "concerts", "community"]);

export function isAgendaCategory(value: string | undefined): value is AgendaCategory {
  return value != null && CATEGORY_SET.has(value);
}

export function getAgendaPageSize(): number {
  return communityData.pageSize ?? concertsData.pageSize ?? 9;
}

function mapRow(row: {
  id: string;
  category: string;
  title: string;
  description: string;
  date: string;
}): AgendaEventItem {
  return {
    id: row.id,
    category: row.category as AgendaCategory,
    title: row.title,
    description: row.description,
    date: row.date,
  };
}

export function getAllAgendaItems(): AgendaEventItem[] {
  const community = communityData.events.map(mapRow);
  const concerts = concertsData.events.map(mapRow);
  return [...community, ...concerts];
}

const AGENDA_PREVIEW_TIMEZONE = "Europe/Brussels";

function getTodayIsoInAgendaTimezone(): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: AGENDA_PREVIEW_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const y = parts.find((p) => p.type === "year")?.value;
  const m = parts.find((p) => p.type === "month")?.value;
  const d = parts.find((p) => p.type === "day")?.value;
  if (y == null || m == null || d == null) {
    throw new Error("Could not resolve calendar date for agenda preview");
  }
  return `${y}-${m}-${d}`;
}

/** Next `limit` events on or after today (Belgium), soonest first. */
export function getUpcomingAgendaItems(limit: number): AgendaEventItem[] {
  const today = getTodayIsoInAgendaTimezone();
  const upcoming = getAllAgendaItems()
    .filter((item) => item.date >= today)
    .sort((a, b) => {
      const byDate = a.date.localeCompare(b.date);
      if (byDate !== 0) {
        return byDate;
      }
      return a.id.localeCompare(b.id);
    });
  return upcoming.slice(0, Math.max(0, limit));
}

/**
 * Items for the active agenda tab. `agenda` is the combined view (community + concerts);
 * other tabs show a single category only. Results are sorted by date, then id.
 */
export function filterAgendaItems(
  items: AgendaEventItem[],
  filter: AgendaCategory,
): AgendaEventItem[] {
  const today = getTodayIsoInAgendaTimezone();
  let subset: AgendaEventItem[];
  if (filter === "agenda") {
    subset = items.filter(
      (item) => item.category === "community" || item.category === "concerts",
    );
  } else {
    subset = items.filter((item) => item.category === filter);
  }
  return [...subset].sort((a, b) => {
    const aUpcoming = a.date >= today;
    const bUpcoming = b.date >= today;
    if (aUpcoming !== bUpcoming) {
      return aUpcoming ? -1 : 1;
    }
    if (aUpcoming && bUpcoming) {
      const byDate = a.date.localeCompare(b.date);
      if (byDate !== 0) {
        return byDate;
      }
      return a.id.localeCompare(b.id);
    }
    const byDateDesc = b.date.localeCompare(a.date);
    if (byDateDesc !== 0) {
      return byDateDesc;
    }
    return b.id.localeCompare(a.id);
  });
}

export function paginateItems<T>(items: T[], page: number, pageSize: number): T[] {
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

export function getTotalPages(itemCount: number, pageSize: number): number {
  if (itemCount <= 0) {
    return 1;
  }
  return Math.ceil(itemCount / pageSize);
}

/** Display date for agenda cards (locale-aware, dotted day.month.year for nl/fr). */
export function formatAgendaDate(isoDate: string, locale: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) {
    return isoDate;
  }
  const [, year, month, day] = match;
  if (locale === "en") {
    return `${month}/${day}/${year}`;
  }
  return `${day}.${month}.${year}`;
}
