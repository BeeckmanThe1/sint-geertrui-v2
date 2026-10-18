"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useId } from "react";
import { createPortal } from "react-dom";

type HistoryGalleryLightboxProps = {
  open: boolean;
  index: number;
  images: string[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

/**
 * Full-screen archive viewer — calm typography, large contain-fit image, discreet controls
 * (inspired by huisdewarande.be/omgeving browsing feel).
 */
export function HistoryGalleryLightbox({
  open,
  index,
  images,
  onClose,
  onPrev,
  onNext,
}: HistoryGalleryLightboxProps) {
  const t = useTranslations("history");
  const titleId = useId();
  const total = images.length;
  const src = images[index] ?? "";

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
      if (event.key === "ArrowLeft") {
        onPrev();
      }
      if (event.key === "ArrowRight") {
        onNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, onNext, onPrev, open]);

  useEffect(() => {
    if (!open) {
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open || total === 0 || !src) {
    return null;
  }

  return createPortal(
    <div
      aria-labelledby={titleId}
      aria-modal="true"
      className="fixed inset-0 z-[100] flex flex-col bg-[#1a1814]/92 backdrop-blur-[2px]"
      onClick={onClose}
      role="dialog"
    >
      <div className="flex shrink-0 items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <h2 className="font-serif text-sm font-medium tracking-wide text-[#f0ebe3]/90 sm:text-base" id={titleId}>
          {t("dialogTitle")}
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-xs tabular-nums tracking-wider text-[#f0ebe3]/70 sm:text-sm">
            {index + 1} / {total}
          </span>
          <button
            aria-label={t("closeLabel")}
            className="rounded-full px-3 py-1.5 text-sm font-medium text-[#f0ebe3]/90 ring-1 ring-white/25 transition hover:bg-white/10"
            onClick={onClose}
            type="button"
          >
            {t("closeLabel")}
          </button>
        </div>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-8 sm:px-10"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          aria-label={t("prevLabel")}
          className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full text-2xl text-[#f0ebe3]/85 transition hover:bg-white/10 sm:left-4"
          onClick={onPrev}
          type="button"
        >
          ‹
        </button>

        <div className="relative h-full max-h-[min(78vh,820px)] w-full max-w-5xl">
          <Image
            alt={t("carouselImageAlt", { current: index + 1, total })}
            className="object-contain"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 64rem"
            src={src}
          />
        </div>

        <button
          aria-label={t("nextLabel")}
          className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full text-2xl text-[#f0ebe3]/85 transition hover:bg-white/10 sm:right-4"
          onClick={onNext}
          type="button"
        >
          ›
        </button>
      </div>

      <p className="shrink-0 px-5 pb-6 text-center text-xs tracking-wide text-[#f0ebe3]/55 sm:text-sm">
        {t("lightboxHint")}
      </p>
    </div>,
    document.body,
  );
}
