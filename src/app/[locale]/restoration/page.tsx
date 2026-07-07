import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/lib/page-metadata";
import { SITE_NAME } from "@/lib/site";

/** Sint-Geertruikerk carillon — https://www.youtube.com/watch?v=9lWuVFcJBM4 */
const CARILLON_YOUTUBE_EMBED_SRC =
  "https://www.youtube.com/embed/9lWuVFcJBM4?rel=0&playsinline=1&modestbranding=1";

type RestorationSectionProps = {
  title: string;
  description: string;
  image?: {
    alt: string;
    src: string;
    width: number;
    height: number;
  };
  reverse?: boolean;
  imageMaxWidthClass?: string;
  toneClass?: string;
};

function RestorationSection({
  title,
  description,
  image,
  reverse = false,
  imageMaxWidthClass = "md:max-w-[20rem]",
  toneClass = "bg-transparent",
}: RestorationSectionProps) {
  return (
    <section className={`-mx-8 mt-10 sm:-mx-10 sm:mt-12 lg:-mx-12 ${toneClass}`}>
      <div className="px-8 py-8 sm:px-10 sm:py-10 lg:px-12">
        <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-10">
          <div className={reverse ? "md:order-2" : ""}>
            <h2 className="mb-4 text-xl font-semibold tracking-tight sm:text-2xl">
              {title}
            </h2>
            <p className="text-pretty text-base leading-relaxed sm:text-lg">
              {description}
            </p>
          </div>

          {image ? (
            <figure className={reverse ? "md:order-1" : ""}>
              <div className="flex justify-center">
                <Image
                  alt={image.alt}
                  className={`h-auto w-full max-w-[16rem] object-contain sm:max-w-[18rem] ${imageMaxWidthClass}`}
                  height={image.height}
                  sizes="(max-width: 768px) 80vw, 34vw"
                  src={image.src}
                  width={image.width}
                />
              </div>
            </figure>
          ) : null}
        </div>
      </div>
    </section>
  );
}

type RestorationPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: RestorationPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "restoration" });

  return buildPageMetadata(locale, "/restoration", {
    title: `${t("title")} | ${SITE_NAME}`,
    description: t("intro"),
  });
}

export default async function RestorationPage({ params }: RestorationPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "restoration" });

  return (
    <div className="bg-zinc-100">
      <main className="mx-auto min-h-[calc(100vh-65px)] w-full max-w-[65rem] bg-[#bdb7a6] px-8 py-12 text-zinc-900 sm:px-10 sm:py-16 lg:px-12">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("title")}
        </h1>

        <section className="mt-8 max-w-3xl">
          <p className="text-base leading-relaxed sm:text-lg">{t("intro")}</p>
        </section>

        <RestorationSection
          description={t("sections.spire.body")}
          image={{
            alt: t("sections.spire.imageAlt"),
            height: 616,
            src: "/images/restoration/article/image3.jpg",
            width: 462,
          }}
          toneClass="bg-[#c8c2b2]"
          title={t("sections.spire.title")}
        />

        <RestorationSection
          description={t("sections.towerBody.body")}
          image={{
            alt: t("sections.towerBody.imageAlt"),
            height: 640,
            src: "/images/restoration/article/image5.jpg",
            width: 480,
          }}
          reverse
          toneClass=""
          title={t("sections.towerBody.title")}
        />

        <RestorationSection
          description={t("sections.humidity.body")}
          image={{
            alt: t("sections.humidity.imageAlt"),
            height: 640,
            src: "/images/restoration/article/image4.jpg",
            width: 480,
          }}
          toneClass="bg-[#c8c2b2]"
          title={t("sections.humidity.title")}
        />

        <RestorationSection
          description={t("sections.heatingStability.body")}
          image={{
            alt: t("sections.heatingStability.imageAlt"),
            height: 640,
            src: "/images/restoration/article/image7.jpg",
            width: 480,
          }}
          reverse
          toneClass=""
          title={t("sections.heatingStability.title")}
        />

        <RestorationSection
          description={t("sections.roof.body")}
          image={{
            alt: t("sections.roof.imageAlt"),
            height: 1161,
            src: "/images/restoration/article/image6.png",
            width: 861,
          }}
          imageMaxWidthClass="md:max-w-[20rem]"
          toneClass="bg-[#c8c2b2]"
          title={t("sections.roof.title")}
        />

        <RestorationSection
          description={t("sections.carillon.body")}
          image={{
            alt: t("sections.carillon.imageAlt"),
            height: 640,
            src: "/images/restoration/article/image2.jpg",
            width: 480,
          }}
          reverse
          toneClass=""
          title={t("sections.carillon.title")}
        />

        <section
          aria-labelledby="restoration-carillon-video-heading"
          className="mt-10 sm:mt-12"
        >
          <h2
            className="mb-4 text-center text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl"
            id="restoration-carillon-video-heading"
          >
            {t("sections.carillon.videoTitle")}
          </h2>
          <div className="relative mx-auto aspect-video w-full max-w-3xl overflow-hidden rounded-lg bg-zinc-900 shadow-lg ring-1 ring-black/10">
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
              referrerPolicy="strict-origin-when-cross-origin"
              src={CARILLON_YOUTUBE_EMBED_SRC}
              title={t("sections.carillon.videoIframeTitle")}
            />
          </div>
        </section>

        <section className="mt-12">
          <h2 className="mb-5 text-xl font-semibold tracking-tight sm:mb-6 sm:text-2xl">
            {t("outro.title")}
          </h2>
          <p className="max-w-3xl text-base leading-relaxed sm:text-lg">
            {t("outro.body")}
          </p>
        </section>
      </main>
    </div>
  );
}
