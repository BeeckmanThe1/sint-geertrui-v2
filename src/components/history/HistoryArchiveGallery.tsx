"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { Link } from "@/i18n/navigation";
import { HISTORY_GALLERY } from "@/lib/history-gallery";
import { HistoryGalleryLightbox } from "@/components/history/HistoryGalleryLightbox";

const galleryList = [...HISTORY_GALLERY];

/**
 * Archive grid inspired by Unsplash / huisdewarande.be/omgeving:
 * intro + multi-column masonry of framed photos; click opens the lightbox.
 */
export function HistoryArchiveGallery() {
  const t = useTranslations("history.galleryPage");
  const tShared = useTranslations("history");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + galleryList.length) % galleryList.length);
  }, []);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % galleryList.length);
  }, []);

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <div className="bg-[#f4f1ea]">
      <div className="mx-auto w-full max-w-6xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
        <Link
          className="text-sm font-medium text-zinc-600 underline decoration-zinc-400/60 underline-offset-4 transition hover:text-zinc-900"
          href="/history"
        >
          {t("backToHistory")}
        </Link>

        <header className="mt-8 max-w-2xl sm:mt-10">
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-zinc-700 sm:text-lg">
            {t("intro")}
          </p>
        </header>

        {galleryList.length === 0 ? (
          <p className="mt-12 text-sm text-zinc-600">{tShared("bookEmptyFallback")}</p>
        ) : (
          <ul className="mt-12 columns-1 gap-5 p-0 sm:mt-14 sm:columns-2 sm:gap-6 lg:columns-3 lg:gap-6">
            {galleryList.map((src, i) => (
              <li className="mb-5 break-inside-avoid list-none sm:mb-6" key={src}>
                <button
                  aria-label={tShared("carouselImageAlt", {
                    current: i + 1,
                    total: galleryList.length,
                  })}
                  className="group block w-full cursor-pointer overflow-hidden rounded-md bg-white p-2 shadow-[0_8px_24px_rgba(40,32,20,0.1)] ring-1 ring-black/[0.04] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(40,32,20,0.14)]"
                  onClick={() => openAt(i)}
                  type="button"
                >
                  <Image
                    alt={tShared("carouselImageAlt", {
                      current: i + 1,
                      total: galleryList.length,
                    })}
                    className="h-auto w-full rounded-[2px]"
                    height={1500}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    src={src}
                    width={1200}
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <HistoryGalleryLightbox
        images={galleryList}
        index={index}
        onClose={() => setOpen(false)}
        onNext={goNext}
        onPrev={goPrev}
        open={open}
      />
    </div>
  );
}
