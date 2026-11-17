import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MediaImage } from "@/components/media/MediaImage";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { media } from "@/data/media";
import { services } from "@/data/services";
import { cn } from "@/lib/cn";
import { pick } from "@/lib/localize";
import { pageMetadata } from "@/lib/page-meta";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(locale, "services");
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("servicesPage");
  const common = await getTranslations("common");
  const nav = await getTranslations("nav");

  return (
    <>
      <PageHero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        crumbs={[{ label: nav("services") }]}
      />

      <Section className="pb-8 sm:pb-10 lg:pb-12">
        <p className="max-w-2xl text-lg leading-relaxed text-stone">{t("intro")}</p>
      </Section>

      {services.map((s, i) => (
        <section
          key={s.slug}
          aria-labelledby={`svc-${s.slug}`}
          className={cn(
            "py-14 sm:py-16 lg:py-20",
            i % 2 === 0 ? "bg-ivory" : "bg-sand",
          )}
        >
          <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
            <Reveal className={cn(i % 2 === 1 && "lg:order-2")}>
              <MediaImage
                media={media[s.hero]}
                ratio="aspect-[4/3]"
                sizes="(min-width: 1024px) 45vw, 100vw"
                priority={i === 0}
              />
            </Reveal>
            <Reveal delay={100}>
              <ServiceIcon name={s.icon} className="size-9 text-gold-deep" />
              <h2 id={`svc-${s.slug}`} className="display mt-5 text-4xl sm:text-5xl">
                {pick(s.title, locale)}
              </h2>
              <div className="rule-gold mt-5 w-20" aria-hidden />
              <p className="mt-6 text-lg leading-relaxed text-stone">
                {pick(s.short, locale)}
              </p>
              <ul className="mt-6 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {s.offerings.map((o) => (
                  <li key={o.title.en} className="flex items-start gap-3">
                    <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rotate-45 bg-gold-deep" />
                    {pick(o.title, locale)}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <ButtonLink href={`/services/${s.slug}`} variant="outline-dark">
                  {common("learnMore")}
                  <ArrowRight aria-hidden className="size-4 rtl:rotate-180" />
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <CtaBanner />
    </>
  );
}
