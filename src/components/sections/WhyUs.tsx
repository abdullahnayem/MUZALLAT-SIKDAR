import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";

type Item = { title: string; text: string };

export async function WhyUs() {
  const t = await getTranslations("home.why");
  const items = t.raw("items") as Item[];

  return (
    <Section tone="dark" labelledBy="why-title">
      <Reveal>
        <SectionHeading
          id="why-title"
          tone="dark"
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
      </Reveal>
      <ul className="mt-14 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-6">
        {items.map((item, i) => (
          <li
            key={item.title}
            // Five items: three across, then two wider cells; never leaves an empty cell.
            className={`bg-ink p-8 lg:p-10 ${
              i < 3
                ? "lg:col-span-2"
                : i === items.length - 1 && items.length % 2 === 1
                  ? "sm:col-span-2 lg:col-span-3"
                  : "lg:col-span-3"
            }`}
          >
            <Reveal delay={(i % 3) * 80}>
              <span className="display text-5xl text-gold/70" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="display mt-4 text-2xl text-ivory sm:text-[1.7rem]">
                {item.title}
              </h3>
              <p className="mt-3 leading-relaxed text-mist">{item.text}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
