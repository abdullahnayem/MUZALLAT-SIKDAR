import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { media } from "@/data/media";
import { services } from "@/data/services";
import { pick } from "@/lib/localize";

export async function Hero() {
  const locale = await getLocale();
  const t = await getTranslations("home.hero");
  const m = await getTranslations("media");
  const hero = media.heroGarden;

  return (
    <section className="on-dark relative isolate flex h-[calc(100svh-4rem)] max-h-[940px] min-h-[620px] flex-col justify-end overflow-hidden bg-ink text-ivory xl:h-[calc(100svh-5rem)]">
      {/* Decorative scene; mirrored in RTL so the copy sits on the open side of the image. */}
      <Image
        src={hero.src}
        alt={pick(hero.alt, locale)}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[65%_50%] rtl:-scale-x-100"
      />
      <div
        className="absolute inset-0 -z-10 bg-linear-to-r from-ink/90 via-ink/55 to-ink/5 rtl:bg-linear-to-l"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-linear-to-t from-ink/85 to-transparent"
        aria-hidden
      />

      <Container className="pb-28 pt-24 sm:pb-24">
        <div className="max-w-3xl">
          <p className="eyebrow mb-5">{t("eyebrow")}</p>
          <h1 className="display text-[2.3rem] leading-[1.08] sm:text-6xl lg:text-7xl">
            {t("title")}
          </h1>
          <div className="rule-gold mt-6 w-28 sm:mt-8" aria-hidden />
          <p className="mt-6 sm:mt-7 max-w-xl text-lg leading-relaxed text-ivory/85 sm:text-xl">
            {t("subtitle")}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/services">{t("ctaServices")}</ButtonLink>
            <ButtonLink href="/contact" variant="outline-light">
              {t("ctaContact")}
            </ButtonLink>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/15 bg-ink/60 backdrop-blur-sm">
        <Container className="flex items-center justify-between gap-6 py-4">
          <ul className="hidden flex-wrap items-center gap-x-6 gap-y-1 text-sm text-ivory/80 md:flex">
            {services.map((s, i) => (
              <li key={s.slug} className="flex items-center gap-6">
                {i > 0 && (
                  <span aria-hidden className="size-1 rotate-45 bg-gold" />
                )}
                {pick(s.title, locale)}
              </li>
            ))}
          </ul>
          <p className="text-xs text-mist md:ms-auto">{m("illustrative")}</p>
        </Container>
      </div>
    </section>
  );
}
