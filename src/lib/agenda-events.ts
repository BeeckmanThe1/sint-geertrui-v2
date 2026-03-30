import agendaData from "@/content/agenda/events.json";

export type AgendaCategory = "agenda" | "concerts" | "community";

export type AgendaEventItem = {
  id: string;
  category: AgendaCategory;
  seed: string;
  key: string;
};

const CATEGORY_SET = new Set<string>(["agenda", "concerts", "community"]);

export function isAgendaCategory(value: string | undefined): value is AgendaCategory {
  return value != null && CATEGORY_SET.has(value);
}

export function getAgendaPageSize(): number {
  return agendaData.pageSize;
}

export function getAllAgendaItems(): AgendaEventItem[] {
  return agendaData.items.map((row) => ({
    id: row.id,
    category: row.category as AgendaCategory,
    seed: row.seed,
    key: row.key,
  }));
}

export function filterByCategory(
  items: AgendaEventItem[],
  category: AgendaCategory,
): AgendaEventItem[] {
  return items.filter((item) => item.category === category);
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
