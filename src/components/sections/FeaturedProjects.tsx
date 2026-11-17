import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { getProject } from "@/data/projects";

const featuredSlugs = [
  "curved-roof-parking-shade",
  "laser-cut-panel-carport",
  "tensioned-fabric-parking-shade",
  "slatted-pergola-led-lighting",
];

export async function FeaturedProjects() {
  const t = await getTranslations("home.featured");
  const featured = featuredSlugs.flatMap((s) => getProject(s) ?? []);

  return (
    <Section labelledBy="featured-title">
      <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
        <Reveal>
          <SectionHeading
            id="featured-title"
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Reveal>
        <Reveal className="hidden sm:block">
          <ButtonLink href="/projects" variant="outline-dark">
            {t("cta")}
            <ArrowRight aria-hidden className="size-4 rtl:rotate-180" />
          </ButtonLink>
        </Reveal>
      </div>
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((p, i) => (
          <Reveal key={p.slug} delay={i * 80}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
      <div className="mt-10 sm:hidden">
        <ButtonLink href="/projects" variant="outline-dark" className="w-full">
          {t("cta")}
        </ButtonLink>
      </div>
    </Section>
  );
}
