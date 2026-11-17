import { MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/localize";

const companyLinks = [
  { key: "about", href: "/about" },
  { key: "projects", href: "/projects" },
  { key: "gallery", href: "/gallery" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
] as const;

export async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const a11y = await getTranslations("a11y");

  const linkClass = "inline-block py-1.5 text-mist transition-colors hover:text-gold";

  return (
    <footer className="on-dark bg-ink pb-28 pt-16 text-ivory sm:pb-12 lg:pt-20">
      <Container>
        <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" aria-label={a11y("homeLogo")} className="-ms-3 inline-block">
              <Image
                src="/images/brand/logo.png"
                alt="MUZALLAT SIKDAR مظلات سيكدار"
                width={2048}
                height={682}
                quality={90}
                sizes="240px"
                className="h-20 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-sm leading-relaxed text-mist">{t("blurb")}</p>
          </div>

          <div>
            <h2 className="label mb-4 text-gold">{t("services")}</h2>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className={linkClass}>
                    {pick(s.title, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="label mb-4 text-gold">{t("company")}</h2>
            <ul>
              {companyLinks.map((l) => (
                <li key={l.key}>
                  <Link href={l.href} className={linkClass}>
                    {nav(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="label mb-4 text-gold">{t("contact")}</h2>
            <ul className="space-y-3 text-mist">
              <li>
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center gap-3 py-1 transition-colors hover:text-gold"
                >
                  <Phone aria-hidden className="size-4 text-gold" strokeWidth={1.6} />
                  <span dir="ltr">{site.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 py-1 transition-colors hover:text-gold"
                >
                  <WhatsAppIcon className="size-5" />
                  {nav("whatsapp")}
                </a>
              </li>
              <li className="flex items-center gap-3 py-1">
                <MapPin aria-hidden className="size-4 text-gold" strokeWidth={1.6} />
                {pick(site.country, locale)}
              </li>
            </ul>
          </div>
        </div>

        <p className="pt-8 text-sm text-mist">
          © {new Date().getFullYear()} {locale === "ar" ? site.nameAr : site.name}. {t("rights")}
        </p>
      </Container>
    </footer>
  );
}
