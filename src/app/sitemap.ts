import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { routing } from "@/i18n/routing";
import { localePath } from "@/lib/seo";

const staticPaths = ["/", "/about", "/services", "/projects", "/gallery", "/blog", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...staticPaths,
    ...services.map((s) => `/services/${s.slug}`),
    ...projects.map((p) => `/projects/${p.slug}`),
    ...blogPosts.map((p) => `/blog/${p.slug}`),
  ];

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${site.url}${localePath(locale, path)}`,
      changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "/" ? 1 : path.split("/").length > 2 ? 0.6 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${site.url}${localePath(l, path)}`]),
        ),
      },
    })),
  );
}
