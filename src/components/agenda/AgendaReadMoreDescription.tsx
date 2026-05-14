"use client";

import { useTranslations } from "next-intl";
import { useId, useState } from "react";

/** Descriptions shorter than this stay a single block (no toggle). */
const READ_MORE_MIN_CHARS = 200;

type AgendaReadMoreDescriptionProps = {
  text: string;
  /** Matches the card panel so the fade blends out. */
  variant: "agenda" | "home" | "homeHighlighted";
};

const fadeFromClass: Record<AgendaReadMoreDescriptionProps["variant"], string> = {
  agenda: "from-[#f5eedc]",
  home: "from-[#c9b896]",
  homeHighlighted: "from-[#d2b896]",
};

export function AgendaReadMoreDescription({ text, variant }: AgendaReadMoreDescriptionProps) {
  const t = useTranslations("agenda");
  const id = useId();
  const [expanded, setExpanded] = useState(false);
  const collapsible = text.length >= READ_MORE_MIN_CHARS;

  if (!collapsible) {
    return (
      <p className="min-h-0 flex-1 max-w-prose text-pretty text-sm leading-relaxed text-zinc-800/95 whitespace-pre-line">
        {text}
      </p>
    );
  }

  const fade = fadeFromClass[variant];

  if (expanded) {
    return (
      <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
        <div className="min-h-0 min-w-0 flex-1">
          <p
            className="max-w-prose text-pretty text-sm leading-relaxed text-zinc-800/95 whitespace-pre-line"
            id={`${id}-desc`}
          >
            {text}
          </p>
        </div>
        <button
          aria-controls={`${id}-desc`}
          aria-expanded
          className="mt-1.5 shrink-0 cursor-pointer text-left text-sm font-semibold text-zinc-900 underline decoration-zinc-600/45 underline-offset-[3px] hover:decoration-zinc-900"
          onClick={() => setExpanded(false)}
          type="button"
        >
          {t("readLess")}
        </button>
      </div>
    );
  }

  return (
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
        aria-controls={`${id}-desc`}
        aria-expanded={false}
        className="mt-1.5 shrink-0 cursor-pointer text-left text-sm font-semibold text-zinc-900 underline decoration-zinc-600/45 underline-offset-[3px] hover:decoration-zinc-900"
        onClick={() => setExpanded(true)}
        type="button"
      >
        {t("readMore")}
      </button>
    </div>
  );
}
