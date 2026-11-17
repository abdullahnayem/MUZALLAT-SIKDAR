import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { PostCard } from "@/components/cards/PostCard";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { blogPosts } from "@/data/blog";

export async function LatestPosts({ exclude }: { exclude?: string }) {
  const t = await getTranslations("home.blog");
  const posts = blogPosts.filter((p) => p.slug !== exclude).slice(0, 3);

  return (
    <Section labelledBy="blog-title">
      <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
        <Reveal>
          <SectionHeading
            id="blog-title"
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Reveal>
        <Reveal className="hidden sm:block">
          <ButtonLink href="/blog" variant="outline-dark">
            {t("cta")}
            <ArrowRight aria-hidden className="size-4 rtl:rotate-180" />
          </ButtonLink>
        </Reveal>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 90} className="h-full">
            <PostCard post={post} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
