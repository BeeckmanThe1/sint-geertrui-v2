import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactView } from "@/components/contact/ContactView";
import { buildPageMetadata } from "@/lib/page-metadata";

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return buildPageMetadata(locale, "/contact", {
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;

  return <ContactView locale={locale} />;
}
