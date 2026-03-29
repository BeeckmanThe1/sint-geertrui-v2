import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

type HistoryArticleProps = {
  locale: string;
};

const linkClassName =
  "font-medium underline decoration-1 underline-offset-[3px] hover:opacity-80";

export async function HistoryArticle({ locale }: HistoryArticleProps) {
  const t = await getTranslations({ locale, namespace: "history" });

  const external = {
    abdij: (chunks: ReactNode) => (
      <a className={linkClassName} href="#">
        {chunks}
      </a>
    ),
    kanunniken: (chunks: ReactNode) => (
      <a className={linkClassName} href="#">
        {chunks}
      </a>
    ),
    hendrik: (chunks: ReactNode) => (
      <a className={linkClassName} href="#">
        {chunks}
      </a>
    ),
    leuven: (chunks: ReactNode) => (
      <a className={linkClassName} href="#">
        {chunks}
      </a>
    ),
  };

  return (
    <article className="mx-auto max-w-3xl px-5 py-12 text-zinc-900 sm:px-8 sm:py-14">
      <h1 className="mb-8 text-3xl font-semibold tracking-tight sm:text-4xl">
        {t("heading")}
      </h1>

      <p className="mb-6 text-pretty text-base leading-relaxed sm:text-lg">
        {t.rich("intro", external)}
      </p>

      <h2 className="mb-4 mt-8 text-xl font-semibold sm:mt-10 sm:text-2xl">
        {t("section1Title")}
      </h2>
      <p className="mb-6 text-pretty text-base leading-relaxed sm:text-lg">
        {t.rich("section1p1", external)}
      </p>
      <p className="mb-6 text-pretty text-base leading-relaxed sm:text-lg">
        {t.rich("section1p2", external)}
      </p>

      <h2 className="mb-4 mt-8 text-xl font-semibold sm:mt-10 sm:text-2xl">
        {t("section2Title")}
      </h2>
      <p className="mb-6 text-pretty text-base leading-relaxed sm:text-lg">
        {t("section2p1")}
      </p>
      <p className="text-pretty text-base leading-relaxed sm:text-lg">
        {t("section2p2")}
      </p>
    </article>
  );
}
