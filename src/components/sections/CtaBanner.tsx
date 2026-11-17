import { Phone } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ButtonAnchor } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { media } from "@/data/media";
import { site } from "@/data/site";

/** Strong closing call-to-action. Title/text default to the homepage copy. */
export async function CtaBanner({
  title,
  text,
}: {
  title?: string;
  text?: string;
}) {
  const t = await getTranslations("home.cta");
  const nav = await getTranslations("nav");
  const common = await getTranslations("common");

  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink py-24 text-ivory sm:py-28">
      <Image
        src={media.heroDusk.src}
        alt=""
        fill
        sizes="100vw"
        aria-hidden
        className="-z-20 object-cover opacity-35 rtl:-scale-x-100"
      />
      <div className="absolute inset-0 -z-10 bg-ink/60" aria-hidden />
      <Container narrow className="text-center">
        <Reveal>
          <h2 className="display text-4xl sm:text-5xl lg:text-6xl">
            {title ?? t("title")}
          </h2>
          <div className="rule-gold mx-auto mt-8 w-24" aria-hidden />
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ivory/80">
            {text ?? t("text")}
          </p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
            <ButtonAnchor href={site.whatsappHref} external>
              <WhatsAppIcon className="size-6" />
              {common("whatsappUs")}
            </ButtonAnchor>
            <ButtonAnchor href={site.phoneHref} variant="outline-light">
              <Phone aria-hidden className="size-4" />
              <span dir="ltr">{site.phoneDisplay}</span>
              <span className="sr-only">{nav("call")}</span>
            </ButtonAnchor>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
