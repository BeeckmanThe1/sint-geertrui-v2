import { Link } from "@/i18n/navigation";

const navItems = [
  { href: "", key: "home" },
  { href: "/agenda", key: "agenda" },
  { href: "/restauratie", key: "restauratie" },
  { href: "/geschiedenis", key: "geschiedenis" },
  { href: "/contact", key: "contact" },
] as const;

const localeItems = [
  { code: "nl", label: "NL" },
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
];

type SiteNavProps = {
  locale: string;
  labels: {
    home: string;
    agenda: string;
    restauratie: string;
    geschiedenis: string;
    contact: string;
  };
};

export function SiteNav({ locale, labels }: SiteNavProps) {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <nav className="flex flex-wrap items-center gap-4">
          {navItems.map((item) => {
            const href = item.href || "/";
            const className = "text-sm font-medium text-zinc-800";

            return (
              <Link className={className} href={href} key={item.key} locale={locale}>
                {labels[item.key]}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          {localeItems.map((item) => (
            <Link
              className={`text-xs font-semibold ${locale === item.code ? "text-zinc-900" : "text-zinc-500"}`}
              href="/"
              key={item.code}
              locale={item.code}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
