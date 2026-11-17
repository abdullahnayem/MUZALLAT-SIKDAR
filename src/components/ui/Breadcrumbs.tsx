import { ChevronRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export type Crumb = { label: string; href?: string };

export async function Breadcrumbs({ items }: { items: Crumb[] }) {
  const t = await getTranslations("nav");
  const a11y = await getTranslations("a11y");
  const all: Crumb[] = [{ label: t("home"), href: "/" }, ...items];

  return (
    <nav aria-label={a11y("breadcrumb")} className="mb-8">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-mist">
        {all.map((item, i) => {
          const last = i === all.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="py-1 transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className="text-ivory">
                  {item.label}
                </span>
              )}
              {!last && (
                <ChevronRight
                  aria-hidden
                  className="size-3.5 opacity-60 rtl:rotate-180"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
