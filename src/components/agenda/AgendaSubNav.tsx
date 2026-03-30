"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { AgendaCategory } from "@/lib/agenda-events";

const FILTERS: { id: AgendaCategory; msgKey: "agenda" | "concerts" | "community" }[] = [
  { id: "agenda", msgKey: "agenda" },
  { id: "community", msgKey: "community" },
  { id: "concerts", msgKey: "concerts" },
];

type AgendaSubNavProps = {
  active: AgendaCategory;
};

export function AgendaSubNav({ active }: AgendaSubNavProps) {
  const t = useTranslations("agenda.filters");

  return (
    <div
      aria-label={t("aria")}
      className="border-b border-black/5 bg-[#b3ae9b] px-5 py-3 sm:px-8"
      role="navigation"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap gap-2">
        {FILTERS.map((item) => {
          const isActive = item.id === active;
          return (
            <Link
              className={
                isActive
                  ? "rounded-lg bg-[#e8e4d4] px-5 py-2 text-sm font-semibold text-zinc-900 shadow-sm ring-1 ring-black/5"
                  : "rounded-lg px-5 py-2 text-sm font-medium text-zinc-900/85 transition hover:bg-black/5"
              }
              href={{ pathname: "/agenda", query: { filter: item.id } }}
              key={item.id}
              scroll={false}
            >
              {t(item.msgKey)}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
