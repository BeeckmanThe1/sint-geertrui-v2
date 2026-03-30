import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
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

  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label={t("aria")}
      className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2 py-12 text-sm text-zinc-900"
    >
      {pages.map((n, idx) => (
        <span className="inline-flex items-center" key={n}>
          {idx > 0 ? (
            <span aria-hidden className="mx-1 select-none text-zinc-500">
              -
            </span>
          ) : null}
          {n === page ? (
            <span className="min-w-[1.25rem] text-center font-bold tabular-nums underline decoration-zinc-700 underline-offset-4">
              {n}
            </span>
          ) : (
            <Link
              className="min-w-[1.25rem] text-center font-medium tabular-nums text-zinc-800 transition hover:underline"
              href={{ pathname: "/agenda", query: { filter, page: String(n) } }}
              scroll={false}
            >
              {n}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
