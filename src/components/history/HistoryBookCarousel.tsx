"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useId, useState } from "react";
import { HISTORY_GALLERY } from "@/lib/history-gallery";
import bookDecor from "./book.png";
import clsx from "clsx";

const galleryList = [...HISTORY_GALLERY];

export function HistoryBookCarousel({transform}: {transform: string}) {
  const t = useTranslations("history");
  const titleId = useId();
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

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
      if (event.key === "ArrowLeft") {
        goPrev();
      }
      if (event.key === "ArrowRight") {
        goNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev, open]);

  useEffect(() => {
    if (!open) {
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!hasImages) {
    return (
      <section
        aria-label={t("bookSectionLabel")}
        className="border-t border-black/10 px-5 py-12 sm:px-8 sm:py-14 absolute"
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
      className="absolute left-0 top-0 h-[200px]"
    >
      <div className={clsx("mx-auto h-full flex max-w-5xl flex-col items-center gap-6 md:flex-row md:items-center md:justify-center md:gap-10 lg:gap-14 rounded-[15px] filter opacity-50 cursor-pointer", transform)}>
        <button
          aria-haspopup="dialog"
          aria-label={t("bookOpenLabel")}
          className="border-4 border-black rounded-lg cursor-pointer h-full group relative max-w-lg shrink-0 overflow-hidden rounded-sm shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:pointer-events-none disabled:opacity-50"
          disabled={!hasImages}
          onClick={() => setOpen(true)}
          type="button"
        >
          <Image
            alt={t("bookTeaserAlt")}
            className="h-auto max-h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
            height={360}
            src={previewSrc}
            width={560}
          />
        </button>
      </div>

      {open ? (
        <div
          aria-labelledby={titleId}
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
          onClick={() => setOpen(false)}
          role="dialog"
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-5xl flex-col gap-4"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="sr-only" id={titleId}>
              {t("dialogTitle")}
            </h2>
            <button
              aria-label={t("closeLabel")}
              className="absolute -right-1 -top-12 rounded-sm bg-white/10 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/20 sm:right-0 sm:top-0"
              onClick={() => setOpen(false)}
              type="button"
            >
              {t("closeLabel")}
            </button>

            <div className="relative aspect-[4/3] w-full max-h-[80vh] bg-zinc-900 sm:aspect-[3/2]">
              <Image
                alt={t("carouselImageAlt", {
                  current: index + 1,
                  total: galleryList.length,
                })}
                className="object-contain"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                src={galleryList[index]}
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <button
                aria-label={t("prevLabel")}
                className="rounded-sm bg-white/15 px-4 py-2 text-sm font-medium text-white hover:bg-white/25"
                onClick={goPrev}
                type="button"
              >
                {t("prevLabel")}
              </button>
              <span className="text-sm tabular-nums text-white/90">
                {index + 1} / {galleryList.length}
              </span>
              <button
                aria-label={t("nextLabel")}
                className="rounded-sm bg-white/15 px-4 py-2 text-sm font-medium text-white hover:bg-white/25"
                onClick={goNext}
                type="button"
              >
                {t("nextLabel")}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export function HistoryBookCarouselWrapper() {
  const t = useTranslations("history");

  return (
      <section
          aria-label={t("bookSectionLabel")}
          className="w-full relative block mx-auto justify-center max-w-[500px] overflow-hidden rounded-xl shadow-lg"
      >
        <Image
            alt={t("bookTeaserAlt")}
            className="h-auto w-full"
            height={bookDecor.height}
            src={bookDecor}
            width={bookDecor.width}
        />
        <HistoryBookCarousel
            transform="[transform:translateY(94px)_translateX(93px)_rotate(-39deg)_scale(0.75)_skew(0deg,13deg)]"/>
        <HistoryBookCarousel
            transform="[transform:translateY(31px)_translateX(236px)_rotate(-40deg)_scale(0.7)_skew(11deg,25deg)]"/>
      </section>
  );
}