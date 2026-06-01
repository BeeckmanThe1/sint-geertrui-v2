import Image from "next/image";
import { getTranslations } from "next-intl/server";

const CONTACT_HERO_SRC = "/images/contact/inside.png";
const CONTACT_KOOR_SRC = "/images/contact/gertrokoor.jpg";
const PASTORALE_ZONE_KERKNET_URL =
  "https://www.kerknet.be/organisatie/pastorale-zone-leuven-aan-de-dijle";

function belgianDisplayPhoneToTel(display: string): string {
  const digits = display.replace(/\s/g, "");
  if (digits.startsWith("0")) {
    return `+32${digits.slice(1)}`;
  }
  return digits;
}

type ContactViewProps = {
  locale: string;
};

type KerkraadMember = {
  name: string;
  role?: string;
  email?: string;
  phone?: string;
};

export async function ContactView({ locale }: ContactViewProps) {
  const t = await getTranslations({ locale, namespace: "contact" });
  const membersRaw = t.raw("gemeenschapsploeg.members");
  const members = Array.isArray(membersRaw) ? (membersRaw as string[]) : [];
  const kerkraadRaw = t.raw("kerkfabriek.members");
  const kerkraadMembers: KerkraadMember[] = Array.isArray(kerkraadRaw)
    ? (kerkraadRaw as KerkraadMember[])
    : [];

  return (
    <>
      <section className="relative isolate min-h-[min(55vh,520px)] w-full overflow-hidden bg-zinc-900 sm:min-h-[min(62vh,580px)]">
        <Image
          alt={t("hero.imageAlt")}
          className="object-cover opacity-[0.93]"
          fill
          priority
          sizes="100vw"
          src={CONTACT_HERO_SRC}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/50"
        />
        <div className="relative z-10 mx-auto flex min-h-[min(55vh,520px)] w-full max-w-7xl flex-col justify-end px-5 pb-12 pt-24 sm:min-h-[min(62vh,580px)] sm:px-8 sm:pb-14 sm:pt-28">
          <div className="max-w-2xl">
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {t("hero.title")}
            </h1>
            <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-white/90 sm:text-lg">
              {t("hero.lead")}
            </p>
          </div>
        </div>
      </section>

      <div className="bg-zinc-100">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <article className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-black/5 sm:p-10">
              <h2 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
                {t("addressCard.title")}
              </h2>
              <address className="not-italic mt-5 text-base leading-relaxed text-zinc-800">
                <span className="block font-semibold">{t("addressCard.line1")}</span>
                <span className="block font-semibold">{t("addressCard.line2")}</span>
              </address>
              <p className="mt-4 text-pretty text-sm leading-relaxed text-zinc-600 sm:text-base">
                {t("addressCard.body")}
              </p>
              <a
                className="mt-6 inline-flex rounded-full bg-[#a8a08c] px-5 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm ring-1 ring-black/10 transition hover:bg-[#9c9480]"
                href={t("addressCard.mapUrl")}
                rel="noopener noreferrer"
                target="_blank"
              >
                {t("addressCard.mapLink")}
              </a>
            </article>

            <article className="rounded-xl bg-[#bdb7a6] p-8 shadow-sm ring-1 ring-black/10 sm:p-10">
              <h2 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
                {t("visitCard.title")}
              </h2>
              <div className="mt-5 space-y-4 text-pretty text-base leading-relaxed text-zinc-800">
                <p>{t("visitCard.p1")}</p>
                <p>{t("visitCard.p2")}</p>
                <p className="font-semibold text-zinc-900">{t("visitCard.p3")}</p>
                <p>{t("visitCard.openingHours")}</p>
              </div>
            </article>
          </div>

          <section className="mt-12 rounded-xl bg-white p-8 shadow-sm ring-1 ring-black/5 sm:mt-14 sm:p-10">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
              {t("gemeenschapsploeg.title")}
            </h2>
            <p className="mt-4 max-w-3xl text-pretty text-base leading-relaxed text-zinc-800 sm:text-lg">
              {t.rich("gemeenschapsploeg.body", {
                zone: (chunks) => (
                  <a
                    className="font-medium text-zinc-900 underline decoration-zinc-600 underline-offset-4 transition hover:decoration-zinc-900"
                    href={PASTORALE_ZONE_KERKNET_URL}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>
            <h3 className="mt-8 text-xs font-semibold uppercase tracking-wide text-zinc-500">
              {t("gemeenschapsploeg.membersHeading")}
            </h3>
            <ul className="mt-4 grid list-none gap-x-8 gap-y-2 sm:grid-cols-2" role="list">
              {members.map((name) => (
                <li key={name} className="text-base text-zinc-800">
                  {name}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12 rounded-xl bg-[#bdb7a6] p-8 shadow-sm ring-1 ring-black/10 sm:mt-14 sm:p-10">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
              {t("kerkfabriek.title")}
            </h2>
            <p className="mt-4 max-w-3xl text-pretty text-base leading-relaxed text-zinc-800 sm:text-lg">
              {t("kerkfabriek.body")}
            </p>
            <p className="mt-6 font-medium text-zinc-900">{t("kerkfabriek.membersIntro")}</p>
            <ul className="mt-4 border-t border-black/10" role="list">
              {kerkraadMembers.map((member) => (
                <li
                  key={member.name}
                  className="border-b border-black/10 py-4 last:border-b-0"
                >
                  <span className="font-medium text-zinc-900">{member.name}</span>
                  {member.role ? (
                    <span className="mt-0.5 block text-sm text-zinc-700">{member.role}</span>
                  ) : null}
                  {member.email || member.phone ? (
                    <span className="mt-1 flex flex-col gap-1">
                      {member.email ? (
                        <a
                          className="inline-block w-fit text-sm font-medium text-zinc-900 underline decoration-zinc-600 underline-offset-4 transition hover:decoration-zinc-900"
                          href={`mailto:${member.email}`}
                        >
                          {member.email}
                        </a>
                      ) : null}
                      {member.phone ? (
                        <a
                          className="inline-block w-fit text-sm font-medium text-zinc-900 underline decoration-zinc-600 underline-offset-4 transition hover:decoration-zinc-900"
                          href={`tel:${belgianDisplayPhoneToTel(member.phone)}`}
                        >
                          {member.phone}
                        </a>
                      ) : null}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 sm:mt-14">
            <div className="lg:grid lg:grid-cols-2 lg:items-stretch">
              <div className="relative aspect-[4/3] min-h-[220px] w-full lg:aspect-auto lg:min-h-[380px]">
                <Image
                  alt={t("koor.imageAlt")}
                  className="object-cover"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  src={CONTACT_KOOR_SRC}
                />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-10">
                <h2 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
                  {t("koor.title")}
                </h2>
                <p className="mt-4 text-pretty text-base leading-relaxed text-zinc-800 sm:text-lg whitespace-pre-line">
                  {t("koor.body")}
                </p>
              </div>
            </div>
          </section>

          <section className="mt-12 rounded-xl border border-black/10 bg-white/90 px-8 py-8 backdrop-blur-sm sm:mt-14 sm:px-10 sm:py-10">
            <h2 className="text-lg font-semibold text-zinc-900 sm:text-xl">
              {t("reachCard.title")}
            </h2>
            <p className="mt-3 max-w-3xl text-pretty text-sm leading-relaxed text-zinc-700 sm:text-base">
              {t("reachCard.body")}
            </p>
            <dl className="mt-6 grid max-w-xl gap-5 sm:grid-cols-2 sm:gap-8">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  {t("reachCard.emailLabel")}
                </dt>
                <dd className="mt-1.5">
                  <a
                    className="text-base font-medium text-zinc-900 underline decoration-zinc-400 underline-offset-4 transition hover:decoration-zinc-700"
                    href={`mailto:${t("reachCard.email")}`}
                  >
                    {t("reachCard.email")}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  {t("reachCard.phoneLabel")}
                </dt>
                <dd className="mt-1.5">
                  <a
                    className="text-base font-medium text-zinc-900 underline decoration-zinc-400 underline-offset-4 transition hover:decoration-zinc-700"
                    href={`tel:${belgianDisplayPhoneToTel(t("reachCard.phone"))}`}
                  >
                    {t("reachCard.phone")}
                  </a>
                </dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
    </>
  );
}
