import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { services } from "@/data/services";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/localize";
import { Container } from "@/components/ui/Container";
import { HeaderNav } from "./HeaderNav";

export async function Header() {
  const locale = await getLocale();
  const a11y = await getTranslations("a11y");
  const navServices = services.map((s) => ({
    slug: s.slug,
    title: pick(s.title, locale),
  }));

  return (
    <header className="on-dark sticky top-0 z-50 border-b border-white/10 bg-ink">
      <Container className="flex h-16 items-center justify-between gap-4 xl:h-20">
        {/*
          The supplied logo is used unmodified. Its artwork sits inside generous black padding,
          so the image box matches the header height while the visible mark stays a standard size.
        */}
        <Link
          href="/"
          aria-label={a11y("homeLogo")}
          className="-ms-3 block shrink-0"
        >
          <Image
            src="/images/brand/logo.png"
            alt="MUZALLAT SIKDAR مظلات سيكدار"
            width={2048}
            height={682}
            priority
            quality={90}
            sizes="(min-width: 1280px) 240px, 192px"
            className="h-16 w-auto xl:h-20"
          />
        </Link>
        <HeaderNav services={navServices} />
      </Container>
    </header>
  );
}
