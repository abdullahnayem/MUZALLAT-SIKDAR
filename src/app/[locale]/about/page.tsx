import { getTranslations, setRequestLocale } from "next-intl/server";
import { MediaImage } from "@/components/media/MediaImage";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { media } from "@/data/media";
import { pageMetadata } from "@/lib/page-meta";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(locale, "about");
}

type Value = { title: string; text: string };

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const nav = await getTranslations("nav");
  const values = t.raw("values.items") as Value[];

  return (
    <>
      <PageHero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        crumbs={[{ label: nav("about") }]}
      />

      <Section labelledBy="story-title">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <figure>
              <MediaImage
                media={media.realCarportWhite}
                ratio="aspect-[4/5]"
                sizes="(min-width: 1024px) 40vw, 90vw"
                priority
              />
              <figcaption className="mt-3 text-sm text-stone">
                {t("story.photoCaption")}
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow mb-4">{t("story.eyebrow")}</p>
            <h2 id="story-title" className="display text-4xl sm:text-5xl lg:text-[3.4rem]">
              {t("story.title")}
            </h2>
            <div className="rule-gold mt-6 w-24" aria-hidden />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-stone">
              <p>{t("story.p1")}</p>
              <p>{t("story.p2")}</p>
              <p>{t("story.p3")}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="dark" labelledBy="values-title">
        <Reveal>
          <SectionHeading
            id="values-title"
            tone="dark"
            eyebrow={t("values.eyebrow")}
            title={t("values.title")}
          />
        </Reveal>
        <ul className="mt-14 grid gap-px bg-white/10 md:grid-cols-3">
          {values.map((v, i) => (
            <li key={v.title} className="bg-ink p-8 lg:p-10">
              <Reveal delay={i * 90}>
                <span aria-hidden className="display text-5xl text-gold/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display mt-4 text-2xl text-ivory sm:text-[1.7rem]">
                  {v.title}
                </h3>
                <p className="mt-3 leading-relaxed text-mist">{v.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <ServicesGrid
        heading={{ eyebrow: t("services.eyebrow"), title: t("services.title") }}
      />
      <CtaBanner />
    </>
  );
}
