import { getTranslations } from "next-intl/server";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { services } from "@/data/services";

export async function ServicesGrid({
  heading,
  exclude,
}: {
  /** Overrides the default homepage heading. */
  heading?: { eyebrow?: string; title: string; subtitle?: string };
  /** Hide one service (e.g. the one being viewed). */
  exclude?: string;
}) {
  const t = await getTranslations("home.services");
  const list = services.filter((s) => s.slug !== exclude);
  const wide = list.length % 3 === 2 || list.length === 5;

  return (
    <Section tone="sand" labelledBy="services-title">
      <Reveal>
        <SectionHeading
          id="services-title"
          eyebrow={heading ? heading.eyebrow : t("eyebrow")}
          title={heading?.title ?? t("title")}
          subtitle={heading ? heading.subtitle : t("subtitle")}
        />
      </Reveal>
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
        {list.map((s, i) => {
          // Five services: 3 across, then 2 wider cards. Otherwise an even grid.
          const span = wide
            ? i < 3
              ? "lg:col-span-2"
              : "lg:col-span-3"
            : list.length === 4
              ? "lg:col-span-3"
              : "lg:col-span-2";
          return (
            <Reveal key={s.slug} delay={(i % 3) * 90} className={span}>
              <ServiceCard
                service={s}
                index={services.findIndex((x) => x.slug === s.slug)}
                className="h-full"
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
              />
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
