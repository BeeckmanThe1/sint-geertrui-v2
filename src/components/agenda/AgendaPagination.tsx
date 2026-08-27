import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buildPaginationRange } from "@/lib/pagination-range";
import type { AgendaCategory } from "@/lib/agenda-events";

type AgendaPaginationProps = {
  locale: string;
  filter: AgendaCategory;
  page: number;
  totalPages: number;
};

export async function AgendaPagination({
  locale,
  filter,
  page,
  totalPages,
}: AgendaPaginationProps) {
  const t = await getTranslations({ locale, namespace: "agenda.pagination" });
  const range = buildPaginationRange(page, totalPages);

  if (range.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label={t("aria")}
      className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2 py-12 text-sm text-zinc-900"
    >
      {range.map((item, idx) => (
        <span className="inline-flex items-center" key={`${item.type}-${idx}`}>
          {idx > 0 ? (
            <span aria-hidden className="mx-1 select-none text-zinc-500">
              -
            </span>
          ) : null}
          {item.type === "ellipsis" ? (
            <span
              aria-hidden
              className="min-w-[1.25rem] px-0.5 text-center tabular-nums text-zinc-500"
            >
              …
            </span>
          ) : item.page === page ? (
            <span className="min-w-[1.25rem] text-center font-bold tabular-nums underline decoration-zinc-700 underline-offset-4">
              {item.page}
            </span>
          ) : (
            <Link
              className="min-w-[1.25rem] text-center font-medium tabular-nums text-zinc-800 transition hover:underline"
              href={{ pathname: "/agenda", query: { filter, page: String(item.page) } }}
              scroll={false}
            >
              {item.page}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
