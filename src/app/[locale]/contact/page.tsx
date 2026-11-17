import { MapPin, Phone } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { Section } from "@/components/ui/Section";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { pick } from "@/lib/localize";
import { pageMetadata } from "@/lib/page-meta";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(locale, "contact");
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const nav = await getTranslations("nav");
  const form = await getTranslations("contact.form");

  const serviceOptions = [
    ...services.map((s) => ({ value: s.slug, label: pick(s.title, locale) })),
    { value: "other", label: form("serviceOther") },
  ];

  const rows: {
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
    href?: string;
    external?: boolean;
  }[] = [
    {
      icon: <Phone aria-hidden className="size-5" strokeWidth={1.5} />,
      label: t("phoneLabel"),
      value: <span dir="ltr">{site.phoneDisplay}</span>,
      href: site.phoneHref,
    },
    {
      icon: null, // WhatsApp renders its own logo mark below
      label: t("whatsappLabel"),
      value: <span dir="ltr">{site.phoneDisplay}</span>,
      href: site.whatsappHref,
      external: true,
    },
    {
      icon: <MapPin aria-hidden className="size-5" strokeWidth={1.5} />,
      label: t("areaLabel"),
      value: t("areaValue"),
    },
  ];

  return (
    <>
      <PageHero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        crumbs={[{ label: nav("contact") }]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
          <Reveal>
            <div className="on-dark bg-ink p-8 text-ivory sm:p-10">
              <h2 className="display text-3xl sm:text-4xl">{t("infoTitle")}</h2>
              <div className="rule-gold mt-5 w-20" aria-hidden />
              <p className="mt-6 leading-relaxed text-mist">{t("infoText")}</p>
              <ul className="mt-8 space-y-6">
                {rows.map(({ icon, label, value, href, external }) => (
                  <li key={label} className="flex items-start gap-4">
                    {icon ? (
                      <span className="flex size-11 shrink-0 items-center justify-center border border-gold/40 text-gold">
                        {icon}
                      </span>
                    ) : (
                      <WhatsAppIcon className="size-11 shrink-0" />
                    )}
                    <div>
                      <p className="text-sm text-mist">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          {...(external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="mt-0.5 inline-block text-lg font-semibold transition-colors hover:text-gold"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="mt-0.5 text-lg font-semibold">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="display text-3xl sm:text-4xl">{t("formTitle")}</h2>
            <div className="rule-gold mb-8 mt-5 w-20" aria-hidden />
            <ContactForm
              serviceOptions={serviceOptions}
              whatsappNumber={site.whatsappNumber}
            />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
