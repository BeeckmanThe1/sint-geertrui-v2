import { getTranslations } from "next-intl/server";

type RestauratiePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function RestauratiePage({ params }: RestauratiePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });

  return (
    <main className="mx-auto min-h-[calc(100vh-65px)] w-full max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-semibold">{t("restauratie")}</h1>
    </main>
  );
}
