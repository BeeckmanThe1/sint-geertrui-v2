import Image from "next/image";

type AgendaEventCardMediaProps = {
  /** Public path (`/images/...`) or absolute `https://` URL from agenda JSON. */
  imageUrl: string | undefined;
  alt: string;
  sizes?: string;
  /** `right` keeps text aligned when some cards lack images; `top` stacks image above body. */
  placement?: "top" | "right";
  /** `wide` gives side thumbnails more room (e.g. home highlights strip). */
  imageSize?: "default" | "wide";
};

/**
 * Optional card image. Omitted when `imageUrl` is missing so cards stay text-only.
 * Local paths use optimized `next/image`; other URLs use `next/image` with `unoptimized` (no
 * `remotePatterns` entry required for JSON-hosted links).
 */
export function AgendaEventCardMedia({
  imageUrl,
  alt,
  sizes,
  placement = "right",
  imageSize = "default",
}: AgendaEventCardMediaProps) {
  const trimmed = imageUrl?.trim();
  if (!trimmed) {
    return null;
  }

  const boxClass =
    placement === "right"
      ? imageSize === "wide"
        ? "relative w-28 shrink-0 self-stretch overflow-hidden bg-zinc-400/50 sm:w-36 md:w-44"
        : "relative w-[5.5rem] shrink-0 self-stretch overflow-hidden bg-zinc-400/50 sm:w-28 lg:w-32"
      : "relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-zinc-400/50";
  const resolvedSizes = sizes ?? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

  if (trimmed.startsWith("/")) {
    return (
      <div className={boxClass}>
        <Image
          alt={alt}
          className="object-cover"
          fill
          sizes={resolvedSizes}
          src={trimmed}
        />
      </div>
    );
  }

  return (
    <div className={boxClass}>
      <Image
        alt={alt}
        className="object-cover"
        fill
        sizes={resolvedSizes}
        src={trimmed}
        unoptimized
      />
    </div>
  );
}
