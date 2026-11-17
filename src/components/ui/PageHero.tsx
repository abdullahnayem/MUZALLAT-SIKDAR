import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import type { Media } from "@/data/media";
import { pick } from "@/lib/localize";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { Container } from "./Container";

/** Dark page header with breadcrumbs. Pass `image` for a photographic header. */
export async function PageHero({
  title,
  subtitle,
  crumbs,
  image,
  eyebrow,
}: {
  title: string;
  subtitle?: string;
  crumbs: Crumb[];
  image?: Media;
  eyebrow?: string;
}) {
  const locale = await getLocale();

  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink text-ivory">
      {image && (
        <>
          <Image
            src={image.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover opacity-60 rtl:-scale-x-100"
            aria-hidden
          />
          <div
            className="absolute inset-0 -z-10 bg-linear-to-r from-ink/90 via-ink/60 to-ink/20 rtl:bg-linear-to-l"
            aria-hidden
          />
        </>
      )}
      <Container className="py-16 sm:py-20 lg:py-28">
        <Breadcrumbs items={crumbs} />
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <h1 className="display max-w-4xl text-5xl sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        <div className="rule-gold mt-8 w-28" aria-hidden />
        {subtitle && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist sm:text-xl">
            {subtitle}
          </p>
        )}
        {image && (
          <span className="sr-only">{pick(image.alt, locale)}</span>
        )}
      </Container>
      {image?.kind === "ai" && (
        <p className="absolute bottom-3 end-4 bg-ink/80 px-2.5 py-1 text-[0.68rem] font-medium text-gold">
          {await getTranslations("media").then((t) => t("inspiration"))}
        </p>
      )}
    </section>
  );
}
