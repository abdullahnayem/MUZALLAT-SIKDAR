import { Check } from "lucide-react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { MediaImage } from "@/components/media/MediaImage";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { media } from "@/data/media";
import { getProject, projects } from "@/data/projects";
import { getService } from "@/data/services";
import { routing } from "@/i18n/routing";
import { pick, pickList } from "@/lib/localize";
import { absoluteUrl, buildMetadata, localePath } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

/** Only the listed slugs/locales exist; anything else gets a real 404 (see app/global-not-found.tsx). */
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const image = media[project.image];
  return buildMetadata({
    locale,
    path: `/projects/${slug}`,
    title: pick(project.title, locale),
    description: pick(project.summary, locale),
    image: {
      src: image.src,
      width: image.width,
      height: image.height,
      alt: pick(image.alt, locale),
    },
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations("projectsPage");
  const common = await getTranslations("common");
  const nav = await getTranslations("nav");
  const service = getService(project.service);
  const title = pick(project.title, locale);
  const image = media[project.image];

  const related = projects
    .filter(
      (p) =>
        p.slug !== project.slug &&
        (p.service === project.service ||
          p.alsoServices?.includes(project.service) ||
          project.alsoServices?.includes(p.service)),
    )
    .slice(0, 3);
  const more =
    related.length > 0
      ? related
      : projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    name: project.title.en,
    description: project.summary.en,
    contentUrl: absoluteUrl(image.src),
    url: absoluteUrl(localePath(locale, `/projects/${slug}`)),
    creditText: "MUZALLAT SIKDAR",
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero
        title={title}
        subtitle={pick(project.summary, locale)}
        crumbs={[
          { label: nav("projects"), href: "/projects" },
          { label: title },
        ]}
      />

      <Section labelledBy="project-details">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <Reveal>
            {/* Real company photograph: shown at its natural proportions, never cropped to a card. */}
            <MediaImage
              media={image}
              ratio={
                image.height > image.width * 1.2
                  ? "aspect-[3/4]"
                  : image.height === image.width || image.width / image.height < 1.1
                    ? "aspect-square"
                    : "aspect-[4/3]"
              }
              // Low-resolution originals are capped so they are never stretched past their size.
              className={image.width < 900 ? "max-w-xl" : undefined}
              sizes="(min-width: 1024px) 60vw, 100vw"
              priority
            />
          </Reveal>
          <Reveal delay={100}>
            <h2 id="project-details" className="display text-3xl sm:text-4xl">
              {t("detailsTitle")}
            </h2>
            <div className="rule-gold mt-5 w-20" aria-hidden />
            <p className="mt-6 text-lg leading-relaxed text-stone">
              {pick(project.summary, locale)}
            </p>

            <dl className="mt-8 divide-y divide-charcoal/15 border-y border-charcoal/15">
              {service && (
                <div className="flex justify-between gap-6 py-4">
                  <dt className="text-stone">{common("service")}</dt>
                  <dd className="text-end font-semibold">
                    {pick(service.title, locale)}
                  </dd>
                </div>
              )}
              {project.location && (
                <div className="flex justify-between gap-6 py-4">
                  <dt className="text-stone">{common("location")}</dt>
                  <dd className="text-end font-semibold">{pick(project.location, locale)}</dd>
                </div>
              )}
              {project.year && (
                <div className="flex justify-between gap-6 py-4">
                  <dt className="text-stone">{common("year")}</dt>
                  <dd className="text-end font-semibold">{project.year}</dd>
                </div>
              )}
            </dl>

            <h3 className="eyebrow mb-4 mt-10">{common("features")}</h3>
            <ul className="space-y-3">
              {pickList(project.features, locale).map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check aria-hidden className="mt-1 size-5 shrink-0 text-gold-deep" strokeWidth={2} />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact">{common("requestQuote")}</ButtonLink>
              <ButtonLink href="/projects" variant="outline-dark">
                {common("backToProjects")}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="sand" labelledBy="related-title">
        <Reveal>
          <SectionHeading id="related-title" title={common("relatedProjects")} />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <ProjectCard project={p} ratio="aspect-[4/3]" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBanner title={t("ctaTitle")} text={t("ctaText")} />
    </>
  );
}
