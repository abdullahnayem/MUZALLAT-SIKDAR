import { ClipboardList, Hammer, PencilRuler, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";

type Step = { title: string; text: string };
const icons = [ClipboardList, PencilRuler, Hammer, ShieldCheck];

export async function Process() {
  const t = await getTranslations("home.process");
  const steps = t.raw("steps") as Step[];

  return (
    <Section tone="sand" labelledBy="process-title">
      <Reveal>
        <SectionHeading
          id="process-title"
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
          align="center"
        />
      </Reveal>
      <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {steps.map((step, i) => {
          const Icon = icons[i] ?? ClipboardList;
          return (
            <li key={step.title} className="relative">
              <Reveal delay={i * 90}>
                <div className="flex items-center gap-4">
                  <span className="flex size-14 shrink-0 items-center justify-center border border-gold-deep/50 bg-ivory text-gold-deep">
                    <Icon aria-hidden className="size-6" strokeWidth={1.4} />
                  </span>
                  {i < steps.length - 1 && (
                    <span
                      aria-hidden
                      className="hidden h-px flex-1 bg-gold-deep/30 lg:block"
                    />
                  )}
                </div>
                <p className="mt-6 text-sm text-gold-deep tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="display mt-1 text-2xl sm:text-[1.7rem]">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-stone">{step.text}</p>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
