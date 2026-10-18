"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { Link } from "@/i18n/navigation";
import { HISTORY_GALLERY } from "@/lib/history-gallery";
import { HistoryGalleryLightbox } from "@/components/history/HistoryGalleryLightbox";
import bookDecor from "./book.png";
import clsx from "clsx";

const galleryList = [...HISTORY_GALLERY];

/** Layout matches the book graphic at this viewport width; narrower viewports scale the teaser down proportionally. */
const BOOK_TEASER_REF_VIEWPORT_PX = 860;
const BOOK_TEASER_BASE_SCALE = 1.1;

export function HistoryBookCarousel({ transform }: { transform: string }) {
  const t = useTranslations("history");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const hasImages = galleryList.length > 0;
  const previewSrc = galleryList[0] ?? "";

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + galleryList.length) % galleryList.length);
  }, []);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % galleryList.length);
  }, []);

  if (!hasImages) {
    return (
      <section
        aria-label={t("bookSectionLabel")}
        className="absolute border-t border-black/10 px-5 py-12 sm:px-8 sm:py-14"
      >
        <p className="mx-auto max-w-3xl text-center text-sm text-zinc-700">
          {t("bookEmptyFallback")}
        </p>
      </section>
    );
  }

  return (
    <section
      aria-label={t("bookSectionLabel")}
      className="absolute left-1/2 top-1/2"
      style={{
        transform: `translate(-41%, -46%) rotate(-18deg) scale(calc(${BOOK_TEASER_BASE_SCALE} * min(1, 100vw / ${BOOK_TEASER_REF_VIEWPORT_PX}px)))`,
      }}
    >
      <div
        className={clsx(
          "mx-auto flex h-full max-w-5xl cursor-pointer flex-col items-center gap-6 rounded-[15px] opacity-50 filter md:flex-row md:items-center md:justify-center md:gap-10 lg:gap-14",
          transform,
        )}
      >
        <button
          aria-haspopup="dialog"
          aria-label={t("bookOpenLabel")}
          className="group relative aspect-[560/360] w-[min(26rem,62vw)] shrink-0 cursor-pointer overflow-hidden rounded-sm border-4 border-black shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:pointer-events-none disabled:opacity-50"
          disabled={!hasImages}
          onClick={() => {
            setIndex(0);
            setOpen(true);
          }}
          type="button"
        >
          {/* Preview is often portrait; fixed landscape slot + object-cover keeps it on the book page. */}
          <Image
            alt={t("bookTeaserAlt")}
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
            fill
            sizes="(max-width: 512px) 100vw, 512px"
            src={previewSrc}
          />
        </button>
      </div>

      <HistoryGalleryLightbox
        images={galleryList}
        index={index}
        onClose={() => setOpen(false)}
        onNext={goNext}
        onPrev={goPrev}
        open={open}
      />
    </section>
  );
}

export function HistoryBookCarouselWrapper() {
  const t = useTranslations("history");

  return (
    <section
      aria-label={t("bookSectionLabel")}
      className="relative block overflow-hidden rounded-t-xl"
    >
      <Image
        alt={t("bookTeaserAlt")}
        className="h-auto w-full"
        src={bookDecor}
        unoptimized
      />
      <p className="pointer-events-none absolute right-3 top-3 z-20 max-w-[min(100%,18rem)] text-right text-sm font-medium text-white/95 drop-shadow-[0_1px_3px_rgb(0_0_0_/_0.6)] sm:right-5 sm:top-5 sm:max-w-[22rem] sm:text-base">
        {t("albumTitle")}
      </p>
      <HistoryBookCarousel transform="" />
      <div className="absolute inset-x-0 bottom-0 z-20 flex justify-center bg-gradient-to-t from-black/55 to-transparent px-4 pb-5 pt-12">
        <Link
          className="rounded-full bg-white/95 px-5 py-2.5 text-sm font-semibold text-zinc-900 shadow-md transition hover:bg-white"
          href="/history/gallery"
        >
          {t("viewAllArchive")}
        </Link>
      </div>
    </section>
  );
}
