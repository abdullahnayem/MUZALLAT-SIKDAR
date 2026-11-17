import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  GalleryBrowser,
  type GalleryImage,
  type GalleryVideo,
} from "@/components/media/GalleryBrowser";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { media, type Media } from "@/data/media";
import { videos } from "@/data/videos";
import { pick } from "@/lib/localize";
import { pageMetadata } from "@/lib/page-meta";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(locale, "gallery");
}

export default async function GalleryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("galleryPage");
  const nav = await getTranslations("nav");

  // Real photographs first, then clearly separated illustrative (AI) images.
  const entries = Object.entries(media) as [string, Media][];
  const ordered = [
    ...entries.filter(([, m]) => m.kind === "real"),
    ...entries.filter(([, m]) => m.kind === "ai"),
  ];
  const images: GalleryImage[] = ordered.map(([id, m]) => ({
    id,
    kind: m.kind,
    src: m.src,
    width: m.width,
    height: m.height,
    alt: pick(m.alt, locale),
  }));

  const galleryVideos: GalleryVideo[] = videos.map((v) => ({
    id: v.id,
    src: v.src,
    poster: v.poster,
    width: v.width,
    height: v.height,
    title: pick(v.title, locale),
    caption: pick(v.caption, locale),
  }));

  return (
    <>
      <PageHero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        crumbs={[{ label: nav("gallery") }]}
      />
      <Section>
        <GalleryBrowser images={images} videos={galleryVideos} />
      </Section>
      <CtaBanner />
    </>
  );
}
