import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { MediaImage } from "@/components/media/MediaImage";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { media } from "@/data/media";
import { projectsForService } from "@/data/projects";
import { getService, services } from "@/data/services";
import { routing } from "@/i18n/routing";
import { pick } from "@/lib/localize";
import { absoluteUrl, buildMetadata, localePath } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

/** Only the listed slugs/locales exist; anything else gets a real 404 (see app/global-not-found.tsx). */
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    services.map((s) => ({ locale, slug: s.slug })),
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const hero = media[service.hero];
  return buildMetadata({
    locale,
    path: `/services/${slug}`,
    title: pick(service.title, locale),
    description: pick(service.short, locale),
    image: {
      src: hero.src,
      width: hero.width,
      height: hero.height,
      alt: pick(hero.alt, locale),
    },
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const service = getService(slug);
  if (!service) notFound();

  const t = await getTranslations("servicesPage");
  const common = await getTranslations("common");
  const nav = await getTranslations("nav");
  const title = pick(service.title, locale);
  const related = projectsForService(service.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title.en,
    alternateName: service.title.ar,
    description: service.short.en,
    url: absoluteUrl(localePath(locale, `/services/${slug}`)),
    areaServed: { "@type": "Country", name: "Kuwait" },
    provider: { "@id": absoluteUrl("/#business") },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.title.en,
      itemListElement: service.offerings.map((o) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: o.title.en },
      })),
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero
        title={title}
        subtitle={pick(service.short, locale)}
        image={media[service.hero]}
        crumbs={[
          { label: nav("services"), href: "/services" },
          { label: title },
        ]}
      />

      <Section labelledBy="offer-title">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          <Reveal>
            <h2 id="offer-title" className="display text-4xl sm:text-5xl">
              {title}
            </h2>
            <div className="rule-gold mt-6 w-24" aria-hidden />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-stone">
              {service.description.map((p) => (
                <p key={p.en}>{pick(p, locale)}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow mb-5">{common("offerings")}</p>
            <ul className="divide-y divide-charcoal/15 border-y border-charcoal/15">
              {service.offerings.map((o) => (
                <li key={o.title.en} className="py-6">
                  <h3 className="display text-2xl sm:text-[1.7rem]">{pick(o.title, locale)}</h3>
                  <p className="mt-2 leading-relaxed text-stone">{pick(o.text, locale)}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="sand" labelledBy="work-title">
          <Reveal>
            <SectionHeading id="work-title" eyebrow={common("ourWork")} title={t("workTitle")} />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 80}>
                <ProjectCard project={p} ratio="aspect-[4/3]" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <Section tone={related.length > 0 ? "light" : "sand"} labelledBy="inspiration-title">
        <Reveal>
          <SectionHeading
            id="inspiration-title"
            eyebrow={common("inspiration")}
            title={t("illustrationsTitle")}
            subtitle={common("inspirationNote")}
          />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {service.illustrations.map((id, i) => (
            <Reveal key={id} delay={(i % 3) * 80}>
              <MediaImage
                media={media[id]}
                ratio="aspect-[4/3]"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </Reveal>
          ))}
        </div>
      </Section>

      <ServicesGrid
        exclude={service.slug}
        heading={{ title: common("otherServices") }}
      />
      <CtaBanner title={t("ctaTitle", { service: title })} text={t("ctaText")} />
    </>
  );
}
