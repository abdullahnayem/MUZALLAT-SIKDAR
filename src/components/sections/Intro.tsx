import { Check } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { MediaImage } from "@/components/media/MediaImage";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { media } from "@/data/media";

export async function Intro() {
  const t = await getTranslations("home.intro");
  const points = t.raw("points") as string[];

  return (
    <Section labelledBy="intro-title">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
        <Reveal>
          <p className="eyebrow mb-4">{t("eyebrow")}</p>
          <h2 id="intro-title" className="display text-4xl sm:text-5xl lg:text-[3.4rem]">
            {t("title")}
          </h2>
          <div className="rule-gold mt-6 w-24" aria-hidden />
          <p className="mt-8 text-lg leading-relaxed text-stone">{t("p1")}</p>
          <p className="mt-5 text-lg leading-relaxed text-stone">{t("p2")}</p>
          <ul className="mt-8 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <Check aria-hidden className="mt-1 size-5 shrink-0 text-gold-deep" strokeWidth={2} />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <ButtonLink href="/about" variant="outline-dark">
              {t("cta")}
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={120} className="relative">
          <div className="relative pe-10 pb-12">
            <MediaImage
              media={media.realCarportWhite}
              ratio="aspect-[4/5]"
              sizes="(min-width: 1024px) 40vw, 90vw"
            />
            <div className="absolute bottom-0 end-0 w-1/2 border-8 border-ivory">
              <MediaImage
                media={media.realParkingGrey}
                ratio="aspect-[4/3]"
                sizes="(min-width: 1024px) 20vw, 45vw"
              />
            </div>
            <div
              aria-hidden
              className="absolute -start-4 -top-4 -z-10 size-2/3 border border-gold"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
