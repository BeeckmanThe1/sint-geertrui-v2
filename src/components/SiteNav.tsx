"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const navItems = [
  { href: "/agenda", key: "agenda" as const },
  { href: "/restoration", key: "restauratie" as const },
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
    return "shrink-0 border-b-2 border-white pb-0.5 text-sm font-bold text-white sm:text-base lg:text-lg";
  }
  return "shrink-0 border-b-2 border-transparent pb-0.5 text-sm font-semibold text-white/80 transition-colors hover:border-white/45 hover:text-white sm:text-base lg:text-lg";
}

function localeClassName(active: boolean) {
  if (active) {
    return "text-xs font-bold text-white sm:text-sm md:text-base";
  }
  return "text-xs font-semibold text-white/65 transition-colors hover:text-white sm:text-sm md:text-base";
}

export function SiteNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const locale = useLocale();

  const pathActive = (canonicalHref: MainNavHref) => {
    if (!pathname) {
      return false;
    }
    // `usePathname()` from next-intl is already the internal pathname (e.g. `/history`), not the
    // localized URL segment — so compare to `canonicalHref`, not `getPathname(...)`.
    return pathname === canonicalHref || pathname.startsWith(`${canonicalHref}/`);
  };

  return (
    <header className="w-full bg-[#b3b098] shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.06)]">
      <div
        className={[
          "mx-auto grid w-full max-w-7xl items-center gap-x-3 gap-y-3 px-4 py-3.5 sm:px-8 sm:py-4",
          "[grid-template-areas:'brand_locales'_'nav_nav']",
          "grid-cols-[minmax(0,1fr)_auto]",
          "md:grid-cols-[auto,minmax(0,1fr),auto,auto]",
          "md:[grid-template-areas:'brand_nav_sep_locales']",
          "md:gap-x-6 lg:gap-x-8 lg:py-5",
        ].join(" ")}
      >
        <Link
          className="[grid-area:brand] shrink-0 text-white outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/80"
          href="/"
        >
          <span className="block text-[0.8125rem] font-semibold leading-snug tracking-wide sm:text-sm">
            {t("brandLine1")}
          </span>
          <span className="block text-[0.8125rem] font-semibold leading-snug tracking-wide sm:text-sm">
            {t("brandLine2")}
          </span>
        </Link>

        <div className="[grid-area:locales] flex shrink-0 items-center justify-end gap-2 sm:gap-3">
          {localeItems.map((item) => (
            <Link
              className={localeClassName(item.code === locale)}
              href={pathname}
              key={item.code}
              locale={item.code}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <nav
          aria-label={t("ariaMain")}
          className={[
            "[grid-area:nav] flex min-w-0 flex-nowrap items-center gap-x-3 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-x-4",
            "[&::-webkit-scrollbar]:hidden",
            "md:flex-wrap md:justify-end md:overflow-visible md:pb-0 md:gap-x-6 lg:gap-x-8",
          ].join(" ")}
        >
          {navItems.map((item) => {
            const active = pathActive(item.href);
            return (
              <Link
                aria-current={active ? "page" : undefined}
                className={linkClassName(active)}
                href={item.href}
                key={item.key}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div
          aria-hidden
          className="[grid-area:sep] mx-1 hidden h-5 w-px shrink-0 self-center bg-white/35 md:block"
        />
      </div>
    </header>
  );
}
