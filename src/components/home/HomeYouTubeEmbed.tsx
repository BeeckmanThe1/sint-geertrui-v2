"use client";

type HomeYouTubeEmbedProps = {
  heading: string;
  iframeTitle: string;
  embedBaseSrc: string;
  videoId: string;
  posterAlt: string;
};

/**
 * Full viewport-width player. The iframe mounts only after this block intersects
 * the viewport so nothing loads or plays until the user scrolls here.
 */
export function HomeYouTubeEmbed({
  heading,
  iframeTitle,
  embedBaseSrc,
  videoId,
  posterAlt,
}: HomeYouTubeEmbedProps) {
  const posterSrc = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <section className="overflow-x-hidden bg-[#d4d0c4] py-14 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <h2 className="text-center font-serif text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
          {heading}
        </h2>
      </div>

      <div
        className="relative left-1/2 mt-8 w-screen max-w-[100vw] -translate-x-1/2 bg-zinc-900 shadow-lg"
      >
        <div className="relative aspect-video w-full">
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
              referrerPolicy="strict-origin-when-cross-origin"
              src={embedBaseSrc}
              title={iframeTitle}
            />
        </div>
      </div>
    </section>
  );
}
