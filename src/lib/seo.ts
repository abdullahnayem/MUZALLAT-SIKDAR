import type { Metadata } from "next";
import { media } from "@/data/media";
import { site } from "@/data/site";
import { routing } from "@/i18n/routing";

/** `/en` + `/about` -> `/en/about`; `/en` for the home page. */
export function localePath(locale: string, path: string): string {
  return `/${locale}${path === "/" ? "" : path}`;
}

export function absoluteUrl(path: string): string {
  return `${site.url}${path}`;
}

const ogLocale: Record<string, string> = { en: "en_US", ar: "ar_KW" };

type BuildArgs = {
  locale: string;
  /** Path without locale, e.g. "/services/awnings". */
  path: string;
  title: string;
  description: string;
  /** Use the title as-is, without the "| Site name" suffix. */
  absoluteTitle?: boolean;
  image?: { src: string; width: number; height: number; alt: string };
  type?: "website" | "article";
};

export function buildMetadata({
  locale,
  path,
  title,
  description,
  absoluteTitle,
  image,
  type = "website",
}: BuildArgs): Metadata {
  const fallback = media.heroGarden;
  const og = image ?? {
    src: fallback.src,
    width: fallback.width,
    height: fallback.height,
    alt: locale === "ar" ? fallback.alt.ar : fallback.alt.en,
  };

  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = localePath(l, path);
  languages["x-default"] = localePath(routing.defaultLocale, path);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: localePath(locale, path), languages },
    openGraph: {
      type,
      title,
      description,
      url: localePath(locale, path),
      siteName: locale === "ar" ? site.nameAr : site.name,
      locale: ogLocale[locale] ?? "en_US",
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => ogLocale[l]),
      images: [{ url: og.src, width: og.width, height: og.height, alt: og.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [og.src],
    },
  };
}
