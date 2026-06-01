"use client";

import { useTranslations } from "next-intl";
import { useEffect, useId } from "react";
import { createPortal } from "react-dom";

type AgendaEventDescriptionDialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  formattedDate: string;
  isoDate: string;
  description: string;
};

export function AgendaEventDescriptionDialog({
  open,
  onClose,
  title,
  formattedDate,
  isoDate,
  description,
}: AgendaEventDescriptionDialogProps) {
  const t = useTranslations("agenda");
  const titleId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  useEffect(() => {
    if (!open) {
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div
      aria-labelledby={titleId}
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 sm:p-6"
      onClick={onClose}
      role="dialog"
    >
      <div
        className="relative flex max-h-[min(88vh,720px)] w-full max-w-2xl flex-col overflow-hidden rounded-md border border-[#4a4234]/20 bg-[#ebe4d6] shadow-xl shadow-black/20"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[#4a4234]/15 px-5 py-4 sm:px-6">
          <div className="min-w-0 pr-2">
            <time
              className="block text-xs font-medium uppercase tracking-[0.12em] text-zinc-500 tabular-nums"
              dateTime={isoDate}
            >
              {formattedDate}
            </time>
            <h2
              className="mt-1 font-serif text-lg font-semibold leading-snug tracking-tight text-zinc-900 sm:text-xl"
              id={titleId}
            >
              {title}
            </h2>
          </div>
          <button
            aria-label={t("closeLabel")}
            className="shrink-0 rounded-sm px-3 py-1.5 text-sm font-semibold text-zinc-800 ring-1 ring-[#4a4234]/25 transition hover:bg-[#d2c9b8]"
            onClick={onClose}
            type="button"
          >
            {t("closeLabel")}
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 sm:px-6 sm:py-5">
          <p className="max-w-prose text-pretty text-sm leading-relaxed text-zinc-800/95 whitespace-pre-line sm:text-base">
            {description}
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
