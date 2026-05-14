import Image from "next/image";

type AgendaEventCardMediaProps = {
  /** Public path (`/images/...`) or absolute `https://` URL from agenda JSON. */
  imageUrl: string | undefined;
  alt: string;
  sizes?: string;
};

/**
 * Optional card image. Omitted when `imageUrl` is missing so cards stay text-only.
 * Local paths use optimized `next/image`; other URLs use `next/image` with `unoptimized` (no
 * `remotePatterns` entry required for JSON-hosted links).
 */
export function AgendaEventCardMedia({ imageUrl, alt, sizes }: AgendaEventCardMediaProps) {
  const trimmed = imageUrl?.trim();
  if (!trimmed) {
    return null;
  }

  const box =
    "relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-zinc-400/50";
  const resolvedSizes = sizes ?? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

  if (trimmed.startsWith("/")) {
    return (
      <div className={box}>
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
    <div className={box}>
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
