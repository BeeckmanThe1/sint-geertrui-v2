"use client";

import { useLocale, useTranslations } from "next-intl";
import { getPathname, Link, usePathname } from "@/i18n/navigation";

const navItems = [
  { href: "/agenda", key: "agenda" as const },
  { href: "/restauratie", key: "restauratie" as const },
  { href: "/history", key: "history" as const },
  { href: "/contact", key: "contact" as const },
] as const;

type MainNavHref = (typeof navItems)[number]["href"];

const localeItems = [
  { code: "nl" as const, label: "NL" },
  { code: "fr" as const, label: "FR" },
  { code: "en" as const, label: "EN" },
];

function linkClassName(active: boolean) {
  if (active) {
    return "text-sm font-semibold text-white underline decoration-white/70 underline-offset-[6px]";
  }
  return "text-sm font-medium text-white hover:opacity-90 transition-opacity";
}

function localeClassName(active: boolean) {
  if (active) {
    return "text-xs font-bold text-white";
  }
  return "text-xs font-semibold text-white/65 hover:text-white transition-colors";
}

export function SiteNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const locale = useLocale();

  const pathActive = (canonicalHref: MainNavHref) => {
    const localized = getPathname({ href: canonicalHref, locale });
    return (
      pathname === localized || pathname.startsWith(`${localized}/`)
    );
  };

  return (
    <header className="w-full bg-[#b3b098] shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.06)]">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-4 px-5 py-4 sm:px-8 sm:py-5">
        <Link
          className="shrink-0 text-white outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/80"
          href="/"
        >
          <span className="block text-[0.8125rem] font-semibold leading-snug tracking-wide sm:text-sm">
            {t("brandLine1")}
          </span>
          <span className="block text-[0.8125rem] font-semibold leading-snug tracking-wide sm:text-sm">
            {t("brandLine2")}
          </span>
        </Link>

        <div className="flex min-w-0 flex-1 flex-wrap items-center justify-end gap-x-1 gap-y-2 sm:gap-x-2">
          <nav
            aria-label={t("ariaMain")}
            className="flex flex-wrap items-center justify-end gap-x-5 sm:gap-x-8 md:gap-x-10"
          >
            {navItems.map((item) => (
              <Link
                className={linkClassName(pathActive(item.href))}
                href={item.href}
                key={item.key}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div
            aria-hidden
            className="mx-2 hidden h-4 w-px shrink-0 bg-white/35 sm:block"
          />

          <div className="flex items-center gap-2 sm:gap-3">
            {localeItems.map((item) => (
              <Link
                className={localeClassName(item.code === locale)}
                href="/"
                key={item.code}
                locale={item.code}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
