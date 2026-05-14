import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type SiteFooterProps = {
  locale: string;
};

function belgianMobileToTel(display: string): string {
  const digits = display.replace(/\s/g, "");
  if (digits.startsWith("0")) {
    return `+32${digits.slice(1)}`;
  }
  return digits;
}

export async function SiteFooter({ locale }: SiteFooterProps) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const pages = await getTranslations({ locale, namespace: "pages" });
  const email = t("ipEmail");
  const phoneDisplay = t("ipPhone");
  const telHref = belgianMobileToTel(phoneDisplay);

  return (
    <footer className="bg-[#a8a08c] text-zinc-900">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-14">
        <div className="grid max-w-7xl gap-10 sm:grid-cols-3">
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
        <section
          aria-label={t("ipAria")}
          className="mt-10 border-t border-zinc-900/15 pt-8 text-xs leading-relaxed text-zinc-800/95 sm:text-sm"
        >
          <p className="max-w-3xl text-pretty">{t("ipLine1")}</p>
          <p className="mt-3 max-w-3xl text-pretty">
            {t("ipLine2Lead")}{" "}
            <span className="font-semibold text-zinc-900">{t("ipContactName")}</span>
            {": "}
            <a
              className="font-medium text-zinc-900 underline decoration-zinc-700/50 underline-offset-2 hover:decoration-zinc-900"
              href={`mailto:${email}`}
            >
              {email}
            </a>
            <span aria-hidden className="text-zinc-600">
              {" · "}
            </span>
            <a
              className="font-medium text-zinc-900 underline decoration-zinc-700/50 underline-offset-2 hover:decoration-zinc-900"
              href={`tel:${telHref}`}
            >
              {phoneDisplay}
            </a>
            .
          </p>
        </section>
      </div>
    </footer>
  );
}
