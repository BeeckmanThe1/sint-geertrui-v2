"use client";

import { AgendaEventDescriptionDialog } from "@/components/agenda/AgendaEventDescriptionDialog";
import { useTranslations } from "next-intl";
import { useId, useState } from "react";

/** Descriptions shorter than this stay a single block (no toggle). */
const READ_MORE_MIN_CHARS = 200;

type AgendaReadMoreDescriptionProps = {
  text: string;
  /** Matches the card panel so the fade blends out. */
  variant: "agenda" | "home" | "homeHighlighted";
  eventTitle: string;
  formattedDate: string;
  isoDate: string;
};

const fadeFromClass: Record<AgendaReadMoreDescriptionProps["variant"], string> = {
  agenda: "from-[#f5eedc]",
  home: "from-[#c9b896]",
  homeHighlighted: "from-[#d2b896]",
};

export function AgendaReadMoreDescription({
  text,
  variant,
  eventTitle,
  formattedDate,
  isoDate,
}: AgendaReadMoreDescriptionProps) {
  const t = useTranslations("agenda");
  const id = useId();
  const [dialogOpen, setDialogOpen] = useState(false);
  const collapsible = text.length >= READ_MORE_MIN_CHARS;

  if (!collapsible) {
    return (
      <p className="min-h-0 flex-1 max-w-prose text-pretty text-sm leading-relaxed text-zinc-800/95 whitespace-pre-line">
        {text}
      </p>
    );
  }

  const fade = fadeFromClass[variant];

  return (
    <>
      <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
        <div className="relative min-h-0 flex-1 overflow-hidden">
          <p
            className="max-w-prose text-pretty text-sm leading-relaxed text-zinc-800/95 whitespace-pre-line line-clamp-5"
            id={`${id}-desc`}
          >
            {text}
          </p>
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t to-transparent ${fade}`}
          />
        </div>
        <button
          aria-haspopup="dialog"
          className="mt-1.5 shrink-0 cursor-pointer text-left text-sm font-semibold text-zinc-900 underline decoration-zinc-600/45 underline-offset-[3px] hover:decoration-zinc-900"
          onClick={() => setDialogOpen(true)}
          type="button"
        >
          {t("readMore")}
        </button>
      </div>
      <AgendaEventDescriptionDialog
        description={text}
        formattedDate={formattedDate}
        isoDate={isoDate}
        onClose={() => setDialogOpen(false)}
        open={dialogOpen}
        title={eventTitle}
      />
    </>
  );
}
