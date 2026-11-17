import { getTranslations, setRequestLocale } from "next-intl/server";
import { PostCard } from "@/components/cards/PostCard";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { blogPosts } from "@/data/blog";
import { pageMetadata } from "@/lib/page-meta";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(locale, "blog");
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blogPage");
  const nav = await getTranslations("nav");

  return (
    <>
      <PageHero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        crumbs={[{ label: nav("blog") }]}
      />
      <Section>
        <p className="mb-10 max-w-2xl text-stone">{t("guidanceNote")}</p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 80} className="h-full">
              <PostCard post={post} />
            </Reveal>
          ))}
        </div>
      </Section>
      <CtaBanner title={t("ctaTitle")} text={t("ctaText")} />
    </>
  );
}
