import Image from "next/image";
import { getTranslations } from "next-intl/server";

type FigureSize = "default" | "prominent" | "prominentPlus";

type HistorySectionProps = {
  title: string;
  description: string | string[];
  image: {
    alt: string;
    src: string;
    width: number;
    height: number;
  };
  reverse?: boolean;
  toneClass?: string;
  imageMaxWidthClass?: string;
  /** default: sections 2 & 4 (tower + cloister, equal width); prominent: 1 & 3; prominentPlus: 5 (bombardement). */
  figureSize?: FigureSize;
};

function imageClassName(figureSize: FigureSize, imageMaxWidthClass: string): string {
  const radius = "rounded-lg";
  switch (figureSize) {
    case "prominentPlus":
      return `h-auto w-full max-w-[20rem] object-contain sm:max-w-[23rem] md:max-w-[27rem] lg:max-w-[30rem] ${radius}`;
    case "prominent":
      return `h-auto w-full max-w-[19rem] object-contain sm:max-w-[22rem] md:max-w-[26rem] lg:max-w-[28rem] ${radius}`;
    default:
      return `h-auto w-full max-w-[16rem] object-contain sm:max-w-[18rem] ${imageMaxWidthClass} ${radius}`;
  }
}

function imageSizesAttr(figureSize: FigureSize): string {
  if (figureSize === "default") {
    return "(max-width: 768px) 80vw, 34vw";
  }
  if (figureSize === "prominentPlus") {
    return "(max-width: 768px) 90vw, 44vw";
  }
  return "(max-width: 768px) 88vw, 42vw";
}

function HistorySection({
  title,
  description,
  image,
  reverse = false,
  toneClass = "bg-transparent",
  imageMaxWidthClass = "md:max-w-[20rem]",
  figureSize = "default",
}: HistorySectionProps) {
  const paragraphs = Array.isArray(description)
    ? description
    : [description];

  return (
    <section className={`-mx-8 mt-10 sm:-mx-10 sm:mt-12 lg:-mx-12 ${toneClass}`}>
      <div className="px-8 py-8 sm:px-10 sm:py-10 lg:px-12">
        <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-10">
          <div className={reverse ? "md:order-2" : ""}>
            <h2 className="mb-4 text-xl font-semibold tracking-tight sm:text-2xl">
              {title}
            </h2>
            <div className="space-y-4 text-pretty text-base leading-relaxed sm:text-lg">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <figure className={reverse ? "md:order-1" : ""}>
            <div className="flex justify-center">
              <Image
                alt={image.alt}
                className={imageClassName(figureSize, imageMaxWidthClass)}
                height={image.height}
                sizes={imageSizesAttr(figureSize)}
                src={image.src}
                width={image.width}
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}

function asParagraphs(raw: unknown): string[] {
  return Array.isArray(raw) ? raw.map(String) : [String(raw)];
}

export async function HistoryArticle() {
  const t = await getTranslations("history");

  return (
    <article className="w-full px-8 py-12 text-zinc-900 sm:px-10 sm:py-16 lg:px-12">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {t("article.title")}
      </h1>

      <HistorySection
        description={asParagraphs(t.raw("article.foundation.body"))}
        figureSize="prominent"
        image={{
          alt: t("article.foundation.imageAlt"),
          height: 291,
          src: "/images/history/article/image1.jpg",
          width: 356,
        }}
        title={t("article.foundation.title")}
      />

      <HistorySection
        description={asParagraphs(t.raw("article.tower.body"))}
        image={{
          alt: t("article.tower.imageAlt"),
          height: 540,
          src: "/images/history/article/image3.jpg",
          width: 342,
        }}
        reverse
        title={t("article.tower.title")}
        toneClass="bg-[#c8c2b2]"
      />

      <HistorySection
        description={asParagraphs(t.raw("article.thierry.body"))}
        figureSize="prominent"
        image={{
          alt: t("article.thierry.imageAlt"),
          height: 550,
          src: "/images/history/article/image2.jpg",
          width: 825,
        }}
        title={t("article.thierry.title")}
      />

      <HistorySection
        description={asParagraphs(t.raw("article.cloister.body"))}
        image={{
          alt: t("article.cloister.imageAlt"),
          height: 480,
          src: "/images/history/article/image5.jpg",
          width: 640,
        }}
        reverse
        title={t("article.cloister.title")}
        toneClass="bg-[#c8c2b2]"
      />

      <HistorySection
        description={asParagraphs(t.raw("article.bombardment.body"))}
        figureSize="prominentPlus"
        image={{
          alt: t("article.bombardment.imageAlt"),
          height: 590,
          src: "/images/history/article/image4.jpg",
          width: 743,
        }}
        title={t("article.bombardment.title")}
      />

      <p className="mt-10 text-pretty text-sm leading-relaxed text-zinc-700 sm:text-base">
        {t("article.sources")}
      </p>
    </article>
  );
}
