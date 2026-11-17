"use client";

import { Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

/** Switches language while staying on the same route. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("lang");
  const a11y = useTranslations("a11y");
  const other = locale === "ar" ? "en" : "ar";

  return (
    <Link
      href={pathname}
      locale={other}
      hrefLang={other}
      lang={other}
      aria-label={a11y("switchToLanguage", { language: t("otherName") })}
      className={cn(
        "label inline-flex min-h-11 items-center gap-2 px-3 text-ivory transition-colors hover:text-gold",
        className,
      )}
    >
      <Globe aria-hidden className="size-4" strokeWidth={1.5} />
      <span>{t("otherName")}</span>
    </Link>
  );
}
