import { Quote } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { testimonials } from "@/data/testimonials";
import { pick } from "@/lib/localize";

/** Renders only when real testimonials exist in data/testimonials.ts. */
export async function Testimonials() {
  if (testimonials.length === 0) return null;
  const locale = await getLocale();
  const t = await getTranslations("home.testimonials");

  return (
    <Section tone="sand" labelledBy="testimonials-title">
      <Reveal>
        <SectionHeading
          id="testimonials-title"
          eyebrow={t("eyebrow")}
          title={t("title")}
          align="center"
        />
      </Reveal>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {testimonials.map((item) => (
          <Reveal key={item.name}>
            <figure className="h-full bg-white p-8 ring-1 ring-charcoal/10">
              <Quote aria-hidden className="size-8 text-gold-deep" strokeWidth={1.3} />
              <blockquote className="mt-4 text-lg leading-relaxed">
                {pick(item.quote, locale)}
              </blockquote>
              <figcaption className="mt-6 text-sm text-stone">
                <span className="font-semibold text-charcoal">{item.name}</span>
                {item.role && <> · {pick(item.role, locale)}</>}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
