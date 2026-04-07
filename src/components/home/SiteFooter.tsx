import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type SiteFooterProps = {
  locale: string;
};

export async function SiteFooter({ locale }: SiteFooterProps) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const pages = await getTranslations({ locale, namespace: "pages" });

  return (
    <footer className="bg-[#a8a08c] text-zinc-900">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-3 sm:px-8 sm:py-14">
        <nav
          aria-label={t("ariaNav")}
          className="flex flex-col gap-2 text-sm font-semibold"
        >
          <Link className="w-fit hover:underline" href="/agenda" locale={locale}>
            {nav("agenda")}
          </Link>
          <Link className="w-fit hover:underline" href="/history" locale={locale}>
            {nav("history")}
          </Link>
          <Link className="w-fit hover:underline" href="/contact" locale={locale}>
            {nav("contact")}
          </Link>
        </nav>
        <div className="flex flex-col gap-2 text-sm font-semibold">
          <Link className="w-fit hover:underline" href="/privacy" locale={locale}>
            {pages("privacy")}
          </Link>
          <Link className="w-fit hover:underline" href="/cookies" locale={locale}>
            {pages("cookies")}
          </Link>
        </div>
        <address className="not-italic sm:text-right">
          <span className="block text-sm font-semibold leading-relaxed">
            {t("addressLine1")}
          </span>
          <span className="block text-sm font-semibold leading-relaxed">
            {t("addressLine2")}
          </span>
        </address>
      </div>
    </footer>
  );
}
