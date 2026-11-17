import { Check } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

/** Shown on the homepage until real customer testimonials exist. */
export async function Commitments() {
  const t = await getTranslations("home.commitments");
  const items = t.raw("items") as string[];

  return (
    <Section tone="sand" className="py-16 sm:py-20 lg:py-24" labelledBy="commitments-title">
      <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow mb-4">{t("eyebrow")}</p>
          <h2 id="commitments-title" className="display text-4xl sm:text-5xl">
            {t("title")}
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <ul className="divide-y divide-charcoal/15 border-y border-charcoal/15">
            {items.map((item) => (
              <li key={item} className="flex items-center gap-4 py-5 text-lg">
                <span className="flex size-8 shrink-0 items-center justify-center bg-ink text-gold">
                  <Check aria-hidden className="size-4" strokeWidth={2.2} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
