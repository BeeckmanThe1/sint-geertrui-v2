import clsx from "clsx";
import { AgendaReadMoreDescription } from "@/components/agenda/AgendaReadMoreDescription";

export type AgendaEventCardBodyProps = {
  formattedDate: string;
  /** ISO `YYYY-MM-DD` for `<time dateTime>`. */
  isoDate: string;
  title: string;
  description: string;
  /** `agenda` = agenda page; `home` = home upcoming strip; `homeHighlighted` = “In de kijker” strip. */
  variant?: "agenda" | "home" | "homeHighlighted";
};

const panelClass: Record<NonNullable<AgendaEventCardBodyProps["variant"]>, string> = {
  agenda: "bg-transparent",
  home: "bg-[#c9b896]",
  homeHighlighted: "bg-[#d2b896]",
};

/**
 * Text stack for agenda cards (with or without image). Description supports `\n\n` paragraph
 * breaks via `whitespace-pre-line`.
 */
export function AgendaEventCardBody({
  formattedDate,
  isoDate,
  title,
  description,
  variant = "agenda",
}: AgendaEventCardBodyProps) {
  return (
    <div
      className={clsx(
        "flex min-h-0 min-w-0 flex-1 flex-col border-l-[3px] border-l-[#6b5f45]/45 pl-4 pr-4 py-4",
        panelClass[variant],
      )}
    >
      <time
        className="block shrink-0 text-xs font-medium uppercase tracking-[0.12em] text-zinc-500 tabular-nums"
        dateTime={isoDate}
      >
        {formattedDate}
      </time>
      <h3 className="mt-1.5 shrink-0 font-serif text-base font-semibold leading-snug tracking-tight text-zinc-900">
        {title}
      </h3>
      <div className="mt-2.5 flex min-h-0 flex-1 flex-col">
        <AgendaReadMoreDescription text={description} variant={variant} />
      </div>
    </div>
  );
}
