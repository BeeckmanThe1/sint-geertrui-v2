import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AgendaEventGrid } from "@/components/agenda/AgendaEventGrid";
import { AgendaPagination } from "@/components/agenda/AgendaPagination";
import { AgendaSubNav } from "@/components/agenda/AgendaSubNav";
import type { AgendaCategory } from "@/lib/agenda-events";
import {
  filterByCategory,
  getAgendaPageSize,
  getAllAgendaItems,
  getTotalPages,
  isAgendaCategory,
  paginateItems,
} from "@/lib/agenda-events";

type AgendaPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ filter?: string; page?: string }>;
};

export async function generateMetadata({
  params,
}: AgendaPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "agenda" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function AgendaPage({ params, searchParams }: AgendaPageProps) {
  const { locale } = await params;
  const sp = await searchParams;

  const filter: AgendaCategory = isAgendaCategory(sp.filter)
    ? sp.filter
    : "agenda";

  const parsedPage = parseInt(sp.page ?? "1", 10);
  const pageSize = getAgendaPageSize();
  const allItems = getAllAgendaItems();
  const filtered = filterByCategory(allItems, filter);
  const totalPages = getTotalPages(filtered.length, pageSize);
  const rawPage = Number.isFinite(parsedPage) ? parsedPage : 1;
  const page = Math.min(Math.max(1, rawPage), totalPages);
  const pageItems = paginateItems(filtered, page, pageSize);

  return (
    <div className="bg-[#d1cdc1]">
      <AgendaSubNav active={filter} />
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <AgendaEventGrid items={pageItems} locale={locale} />
        <AgendaPagination
          filter={filter}
          locale={locale}
          page={page}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
