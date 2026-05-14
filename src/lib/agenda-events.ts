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

/** Max upcoming rows on `/agenda` (same count as the home preview strip). */
export const AGENDA_FUTURE_CAP = 3;

function agendaDateKey(iso: string): number {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!match) {
    return 0;
  }
  const [, y, mo, d] = match;
  return Number(y) * 10000 + Number(mo) * 100 + Number(d);
}

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

function sortDateDescIdAsc(a: AgendaEventItem, b: AgendaEventItem): number {
  const byKey = agendaDateKey(b.date) - agendaDateKey(a.date);
  if (byKey !== 0) {
    return byKey;
  }
  return a.id.localeCompare(b.id);
}

function sortDateAscIdAsc(a: AgendaEventItem, b: AgendaEventItem): number {
  const byKey = agendaDateKey(a.date) - agendaDateKey(b.date);
  if (byKey !== 0) {
    return byKey;
  }
  return a.id.localeCompare(b.id);
}

/** Next `limit` soonest events on or after today (Belgium), displayed newest-first like the agenda archive. */
export function getUpcomingAgendaItems(limit: number): AgendaEventItem[] {
  const today = getTodayIsoInAgendaTimezone();
  const todayKey = agendaDateKey(today);
  const upcoming = getAllAgendaItems().filter((item) => agendaDateKey(item.date) >= todayKey);
  const cap = Math.max(0, limit);
  const soonest = [...upcoming].sort(sortDateAscIdAsc).slice(0, cap);
  soonest.sort(sortDateDescIdAsc);
  return soonest;
}

/**
 * Pick the soonest `futureCap` upcoming events, then order that band and the archive with the
 * same comparator: newest date first (new → old).
 */
export function buildAgendaTabOrder(
  subset: AgendaEventItem[],
  todayIso: string,
  futureCap: number = AGENDA_FUTURE_CAP,
): AgendaEventItem[] {
  const todayKey = agendaDateKey(todayIso);
  const upcoming = subset.filter((item) => agendaDateKey(item.date) >= todayKey);
  const past = subset.filter((item) => agendaDateKey(item.date) < todayKey);
  const cap = Math.max(0, futureCap);
  const soonest = [...upcoming].sort(sortDateAscIdAsc).slice(0, cap);
  soonest.sort(sortDateDescIdAsc);
  past.sort(sortDateDescIdAsc);
  return [...soonest, ...past];
}

/**
 * Items for the active agenda tab. `agenda` is the combined view (community + concerts);
 * other tabs show a single category only. See {@link buildAgendaTabOrder}.
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
  return buildAgendaTabOrder(subset, today, AGENDA_FUTURE_CAP);
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
