import { getMessages, getTranslations } from "next-intl/server";

type HomeMessages = {
  home?: {
    panorama?: {
      embedSrc?: string;
    };
  };
};

type HomePanoramaProps = {
  locale: string;
};

export async function HomePanorama({ locale }: HomePanoramaProps) {
  const t = await getTranslations({ locale, namespace: "home" });
  const messages = (await getMessages({ locale })) as HomeMessages;
  const embedSrc = messages.home?.panorama?.embedSrc?.trim() ?? "";

  return (
    <section className="bg-[#e5e3da] py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 className="text-center font-serif text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
          {t("panorama.title")}
        </h2>
        <div className="relative mt-8 w-full overflow-hidden rounded-sm bg-zinc-300/80 shadow-inner ring-1 ring-black/5">
          <div className="aspect-video w-full">
            {embedSrc ? (
              <iframe
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full border-0"
                src={embedSrc}
                title={t("panorama.iframeTitle")}
              />
            ) : (
              <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-2 bg-zinc-200/90 px-6 py-12 text-center">
                <p className="max-w-md text-sm leading-relaxed text-zinc-700">
                  {t("panorama.fallbackHint")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
