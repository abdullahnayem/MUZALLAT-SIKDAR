import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildMetadata } from "./seo";

type PageKey = "home" | "about" | "services" | "projects" | "gallery" | "blog" | "contact";

const paths: Record<PageKey, string> = {
  home: "/",
  about: "/about",
  services: "/services",
  projects: "/projects",
  gallery: "/gallery",
  blog: "/blog",
  contact: "/contact",
};

/** Localized metadata for the static top-level pages, driven by messages/*.json -> meta.<page>. */
export async function pageMetadata(locale: string, key: PageKey): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildMetadata({
    locale,
    path: paths[key],
    title: t(`${key}.title`),
    description: t(`${key}.description`),
    absoluteTitle: key === "home",
  });
}
