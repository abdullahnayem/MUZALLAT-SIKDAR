import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MediaImage } from "@/components/media/MediaImage";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { LatestPosts } from "@/components/sections/LatestPosts";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { blogPosts, getPost } from "@/data/blog";
import { media } from "@/data/media";
import { site } from "@/data/site";
import { routing } from "@/i18n/routing";
import { formatDate } from "@/lib/format";
import { pick } from "@/lib/localize";
import { absoluteUrl, buildMetadata, localePath } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

/** Only the listed slugs/locales exist; anything else gets a real 404 (see app/global-not-found.tsx). */
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    blogPosts.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const image = media[post.image];
  return buildMetadata({
    locale,
    path: `/blog/${slug}`,
    title: pick(post.title, locale),
    description: pick(post.excerpt, locale),
    type: "article",
    image: {
      src: image.src,
      width: image.width,
      height: image.height,
      alt: pick(image.alt, locale),
    },
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPost(slug);
  if (!post) notFound();

  const t = await getTranslations("blogPage");
  const common = await getTranslations("common");
  const nav = await getTranslations("nav");
  const title = pick(post.title, locale);
  const image = media[post.image];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title.en,
    description: post.excerpt.en,
    inLanguage: locale,
    datePublished: post.date,
    mainEntityOfPage: absoluteUrl(localePath(locale, `/blog/${slug}`)),
    image: absoluteUrl(image.src),
    author: { "@type": "Organization", name: site.name },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: absoluteUrl("/images/brand/logo.png") },
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero
        title={title}
        subtitle={`${common("published")}: ${formatDate(post.date, locale)}`}
        crumbs={[{ label: nav("blog"), href: "/blog" }, { label: title }]}
      />

      <Section className="pb-12 sm:pb-16 lg:pb-20">
        <Container narrow className="px-0 sm:px-0 lg:px-0">
          <MediaImage
            media={image}
            ratio="aspect-[16/9]"
            sizes="(min-width: 1024px) 896px, 100vw"
            badge="illustrative"
            priority
          />
          <p className="mt-8 text-xl leading-relaxed text-charcoal">
            {pick(post.excerpt, locale)}
          </p>
          <div className="mt-10 space-y-12">
            {post.sections.map((section) => (
              <section key={section.heading.en}>
                <h2 className="display text-3xl sm:text-4xl">
                  {pick(section.heading, locale)}
                </h2>
                <div className="rule-gold mt-4 w-16" aria-hidden />
                <div className="mt-5 space-y-4 text-lg leading-relaxed text-stone">
                  {section.body.map((p) => (
                    <p key={p.en}>{pick(p, locale)}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
          <p className="mt-12 border-t border-charcoal/15 pt-6 text-sm text-stone">
            {t("guidanceNote")}
          </p>
          <div className="mt-8">
            <ButtonLink href="/blog" variant="outline-dark">
              {common("backToBlog")}
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <LatestPosts exclude={post.slug} />
      <CtaBanner title={t("ctaTitle")} text={t("ctaText")} />
    </>
  );
}
