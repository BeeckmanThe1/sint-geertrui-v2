import Image from "next/image";
import { getTranslations } from "next-intl/server";

type Volunteer = {
  name: string;
  role: string;
  blurb: string;
};

function asVolunteers(raw: unknown): Volunteer[] {
  if (!Array.isArray(raw)) {
    return [];
  }
  return raw.map((item) => {
    const v = item as Record<string, unknown>;
    return {
      name: String(v.name ?? ""),
      role: String(v.role ?? ""),
      blurb: String(v.blurb ?? ""),
    };
  });
}

type ContactViewProps = {
  locale: string;
};

export async function ContactView({ locale }: ContactViewProps) {
  const t = await getTranslations({ locale, namespace: "contact" });
  const volunteers = asVolunteers(t.raw("volunteers"));

  return (
    <div className="bg-[#1a1814] text-zinc-100">
      <section className="relative min-h-[88vh] w-full">
        <Image
          alt={t("heroImageAlt")}
          className="object-cover"
          fill
          priority
          sizes="100vw"
          src="/images/contact/inside.png"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[#1a1814] via-[#1a1814]/75 via-45% to-transparent"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(212,175,55,0.18),transparent_55%)]" />
        <div className="relative z-10 flex min-h-[88vh] flex-col justify-end px-6 pb-16 pt-28 sm:px-10 sm:pb-20 lg:px-14">
          <p className="mb-3 max-w-xl font-medium uppercase tracking-[0.35em] text-amber-200/90 text-xs sm:text-sm">
            {t("heroTagline")}
          </p>
          <h1 className="max-w-4xl font-serif text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {t("heroTitle")}
          </h1>
        </div>
      </section>

      <section className="relative z-20 -mt-8 rounded-t-3xl bg-[#f2e8d8] px-6 py-14 text-zinc-900 shadow-[0_-24px_60px_rgba(0,0,0,0.35)] sm:px-10 sm:py-16 lg:px-14">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-pretty text-base leading-relaxed sm:text-lg">{t("intro")}</p>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-start">
          <div className="rounded-2xl border border-zinc-800/10 bg-white/60 p-8 shadow-lg backdrop-blur-sm">
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-zinc-900">
              {t("visitTitle")}
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-zinc-800">
              {t("visitBody")}
            </p>
            <div className="mt-8 border-t border-zinc-800/10 pt-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-600">
                {t("addressLabel")}
              </p>
              <p className="mt-2 font-medium text-zinc-900">{t("addressLine1")}</p>
              <p className="text-zinc-800">{t("addressLine2")}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-900/15 bg-gradient-to-br from-[#c4a574]/25 to-[#8b6914]/10 p-8 shadow-lg">
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-zinc-900">
              {t("timesTitle")}
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-zinc-800">
              {t("timesBody")}
            </p>
            <div
              aria-hidden
              className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-amber-900/30 to-transparent"
            />
            <p className="mt-8 text-center text-xs italic text-zinc-600">{t("disclaimer")}</p>
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-6xl">
          <h2 className="text-center font-serif text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            {t("volunteersTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-pretty text-zinc-700">
            {t("volunteersIntro")}
          </p>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {volunteers.map((person, i) => (
              <li
                className="group relative overflow-hidden rounded-2xl border border-zinc-800/10 bg-white/80 p-6 shadow-md transition hover:border-amber-900/25 hover:shadow-xl"
                key={`${person.name}-${i}`}
              >
                <span
                  aria-hidden
                  className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-amber-400/15 transition group-hover:bg-amber-400/25"
                />
                <p className="relative text-xs font-semibold uppercase tracking-widest text-amber-900/80">
                  {person.role}
                </p>
                <p className="relative mt-3 font-serif text-xl font-semibold text-zinc-900">
                  {person.name}
                </p>
                <p className="relative mt-3 text-pretty text-sm leading-relaxed text-zinc-700">
                  {person.blurb}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
