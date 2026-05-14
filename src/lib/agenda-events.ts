/** Concert rows; community parish programme. Per-locale copies: `.en.json` / `.fr.json`; Dutch in `*.json`. */
import concertsEn from "@/content/agenda/concerts.en.json";
import concertsFr from "@/content/agenda/concerts.fr.json";
import concertsNl from "@/content/agenda/concerts.json";
import communityEn from "@/content/agenda/community.en.json";
import communityFr from "@/content/agenda/community.fr.json";
import communityNl from "@/content/agenda/community.json";

type AgendaJsonBundle = typeof communityNl;

function getCommunityBundle(locale: string): AgendaJsonBundle {
  if (locale === "en") {
    return communityEn;
  }
  if (locale === "fr") {
    return communityFr;
  }
  return communityNl;
}

function getConcertsBundle(locale: string): AgendaJsonBundle {
  if (locale === "en") {
    return concertsEn;
  }
  if (locale === "fr") {
    return concertsFr;
  }
  return concertsNl;
}

export type AgendaCategory = "agenda" | "concerts" | "community";

export type AgendaEventItem = {
  id: string;
  category: AgendaCategory;
  title: string;
  description: string;
  /** ISO YYYY-MM-DD */
  date: string;
  /** Optional: public path (`/images/...`) or `https://` URL; if omitted, cards show no image. */
  imageUrl?: string;
  /** When true, eligible for the home “highlighted” strip (future dates only). */
  highlighted?: boolean;
};

const CATEGORY_SET = new Set<string>(["agenda", "concerts", "community"]);

export function isAgendaCategory(value: string | undefined): value is AgendaCategory {
  return value != null && CATEGORY_SET.has(value);
}

export function getAgendaPageSize(locale: string = "nl"): number {
  const community = getCommunityBundle(locale);
  const concerts = getConcertsBundle(locale);
  return community.pageSize ?? concerts.pageSize ?? 9;
}

function mapRow(row: {
  id: string;
  category: string;
  title: string;
  description: string;
  date: string;
  imageUrl?: string | null;
  highlighted?: boolean | null;
}): AgendaEventItem {
  const imageUrl = row.imageUrl?.trim();
  return {
    id: row.id,
    category: row.category as AgendaCategory,
    title: row.title,
    description: row.description,
    date: row.date,
    ...(imageUrl ? { imageUrl } : {}),
    ...(row.highlighted === true ? { highlighted: true } : {}),
  };
}

export function getAllAgendaItems(locale: string = "nl"): AgendaEventItem[] {
  const community = getCommunityBundle(locale).events.map(mapRow);
  const concerts = getConcertsBundle(locale).events.map(mapRow);
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

function selectUpcomingBand(
  source: AgendaEventItem[],
  limit: number,
  excludeIds?: Set<string>,
): AgendaEventItem[] {
  const today = getTodayIsoInAgendaTimezone();
  const todayKey = agendaDateKey(today);
  let candidates = source.filter((item) => agendaDateKey(item.date) >= todayKey);
  if (excludeIds?.size) {
    candidates = candidates.filter((item) => !excludeIds.has(item.id));
  }
  const cap = Math.max(0, limit);
  const soonest = [...candidates].sort(sortDateAscIdAsc).slice(0, cap);
  soonest.sort(sortDateDescIdAsc);
  return soonest;
}

/** Next `limit` soonest events on or after today (Belgium), displayed newest-first like the agenda archive. */
export function getUpcomingAgendaItems(limit: number, locale: string = "nl"): AgendaEventItem[] {
  return selectUpcomingBand(getAllAgendaItems(locale), limit);
}

/** Highlighted rows (JSON `highlighted: true`), same ordering cap as the home preview strip. */
export function getHighlightedAgendaItems(limit: number, locale: string = "nl"): AgendaEventItem[] {
  return selectUpcomingBand(
    getAllAgendaItems(locale).filter((item) => item.highlighted === true),
    limit,
  );
}

/**
 * Home preview: highlighted strip first; upcoming strip excludes those ids so cards are not
 * duplicated.
 */
export function getHomeAgendaPreviewRows(locale: string = "nl"): {
  highlighted: AgendaEventItem[];
  upcoming: AgendaEventItem[];
} {
  const highlighted = getHighlightedAgendaItems(AGENDA_FUTURE_CAP, locale);
  const excludeIds = new Set(highlighted.map((h) => h.id));
  const upcoming = selectUpcomingBand(getAllAgendaItems(locale), AGENDA_FUTURE_CAP, excludeIds);
  return { highlighted, upcoming };
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
