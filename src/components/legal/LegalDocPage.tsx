import { getTranslations } from "next-intl/server";

type LegalSection = {
  title: string;
  body: string;
};

export type LegalDocNamespace = "privacyPage" | "cookiesPage";

type LegalDocPageProps = {
  locale: string;
  namespace: LegalDocNamespace;
};

/**
 * Simple legal / information pages (privacy, cookies) driven by next-intl JSON.
 */
export async function LegalDocPage({ locale, namespace }: LegalDocPageProps) {
  const t = await getTranslations({ locale, namespace });
  const sections = t.raw("sections") as LegalSection[];

  return (
    <main className="mx-auto min-h-[calc(100vh-65px)] w-full max-w-3xl px-5 py-12 sm:px-8">
      <h1 className="font-serif text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-6 text-pretty text-base leading-relaxed text-zinc-700">{t("intro")}</p>
      <div className="mt-10 space-y-10">
        {sections.map((section, index) => (
          <section key={`${section.title}-${String(index)}`}>
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl">
              {section.title}
            </h2>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-zinc-700 sm:text-base whitespace-pre-line">
              {section.body}
            </p>
          </section>
        ))}
      </div>
      <p className="mt-12 text-xs leading-relaxed text-zinc-500">{t("footnote")}</p>
    </main>
  );
}
