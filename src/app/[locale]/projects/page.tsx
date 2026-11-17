import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { ProjectFilter, type FilterItem } from "@/components/media/ProjectFilter";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { pick } from "@/lib/localize";
import { pageMetadata } from "@/lib/page-meta";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(locale, "projects");
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projectsPage");
  const nav = await getTranslations("nav");

  const items: FilterItem[] = projects.map((p, i) => ({
    key: p.slug,
    services: [p.service, ...(p.alsoServices ?? [])],
    node: (
      <ProjectCard
        project={p}
        ratio="aspect-[4/3]"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        priority={i < 3}
      />
    ),
  }));

  // Only offer filters for services that actually have real projects.
  const tabs = services
    .filter((s) => items.some((i) => i.services.includes(s.slug)))
    .map((s) => ({ value: s.slug, label: pick(s.title, locale) }));

  return (
    <>
      <PageHero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        crumbs={[{ label: nav("projects") }]}
      />
      <Section>
        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-stone">{t("intro")}</p>
        <ProjectFilter tabs={tabs} items={items} />
      </Section>
      <CtaBanner title={t("ctaTitle")} text={t("ctaText")} />
    </>
  );
}
