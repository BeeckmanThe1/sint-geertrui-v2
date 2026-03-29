import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { SiteNav } from "@/components/SiteNav";
import { routing } from "@/i18n/routing";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "nav" });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SiteNav
        labels={{
          home: t("home"),
          agenda: t("agenda"),
          restauratie: t("restauratie"),
          geschiedenis: t("geschiedenis"),
          contact: t("contact"),
        }}
        locale={locale}
      />
      {children}
    </NextIntlClientProvider>
  );
}
