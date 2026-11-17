import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Tone = "light" | "sand" | "dark";

const tones: Record<Tone, string> = {
  light: "bg-ivory text-charcoal",
  sand: "bg-sand text-charcoal",
  dark: "bg-ink text-ivory on-dark",
};

export function Section({
  tone = "light",
  id,
  className,
  containerClassName,
  children,
  labelledBy,
}: {
  tone?: Tone;
  id?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("py-20 sm:py-24 lg:py-32", tones[tone], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  id,
  align = "start",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  id?: string;
  align?: "start" | "center";
  tone?: Tone;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className={cn("eyebrow mb-4", tone === "dark" && "on-dark")}>
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className="display text-4xl sm:text-5xl lg:text-[3.4rem]"
      >
        {title}
      </h2>
      <div
        className={cn(
          "rule-gold mt-6 w-24",
          align === "center" && "mx-auto",
        )}
        aria-hidden
      />
      {subtitle && (
        <p
          className={cn(
            "mt-6 text-lg leading-relaxed",
            tone === "dark" ? "text-mist" : "text-stone",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
