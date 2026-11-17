"use client";

import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { LanguageSwitcher } from "./LanguageSwitcher";

export type NavService = { slug: string; title: string };

const links = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "projects", href: "/projects" },
  { key: "gallery", href: "/gallery" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
] as const;

export function HeaderNav({ services }: { services: NavService[] }) {
  const t = useTranslations("nav");
  const a11y = useTranslations("a11y");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLLIElement>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Escape closes menus; outside click closes the desktop dropdown.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const linkClass = (active: boolean) =>
    cn(
      "label relative inline-flex min-h-11 items-center py-2 transition-colors hover:text-gold",
      active ? "text-gold" : "text-ivory",
    );

  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="flex flex-1 items-center justify-end gap-2 xl:gap-6">
      {/* Desktop navigation */}
      <nav aria-label={a11y("mainNav")} className="hidden xl:block">
        <ul className="flex items-center gap-7">
          {links.map(({ key, href }) =>
            key === "services" ? (
              <li
                key={key}
                ref={menuRef}
                className="relative flex items-center"
                onMouseEnter={() => setMenuOpen(true)}
                onMouseLeave={() => setMenuOpen(false)}
              >
                <Link
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={linkClass(isActive(href))}
                  onClick={() => setMenuOpen(false)}
                >
                  {t(key)}
                </Link>
                <button
                  type="button"
                  aria-label={a11y("servicesMenu")}
                  aria-expanded={menuOpen}
                  aria-controls="services-menu"
                  onClick={() => setMenuOpen((v) => !v)}
                  className="-ms-1 inline-flex size-8 items-center justify-center text-ivory hover:text-gold"
                >
                  <ChevronDown
                    aria-hidden
                    className={cn(
                      "size-4 transition-transform duration-300",
                      menuOpen && "rotate-180",
                    )}
                  />
                </button>
                {menuOpen && (
                  <div
                    id="services-menu"
                    className="absolute start-0 top-full z-50 w-72 border-t-2 border-gold bg-charcoal py-3 shadow-2xl shadow-black/40"
                  >
                    <ul>
                      {services.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/services/${s.slug}`}
                            onClick={() => setMenuOpen(false)}
                            className="block px-6 py-3 text-[0.95rem] text-ivory transition-colors hover:bg-ink hover:text-gold"
                          >
                            {s.title}
                          </Link>
                        </li>
                      ))}
                      <li className="mt-2 border-t border-white/10 pt-2">
                        <Link
                          href="/services"
                          onClick={() => setMenuOpen(false)}
                          className="block px-6 py-3 text-[0.95rem] text-gold transition-colors hover:bg-ink"
                        >
                          {t("allServices")}
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            ) : (
              <li key={key}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={linkClass(isActive(href))}
                >
                  {t(key)}
                </Link>
              </li>
            ),
          )}
        </ul>
      </nav>

      <LanguageSwitcher />

      <a
        href={site.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="label hidden min-h-11 items-center gap-2 bg-gold px-5 py-2 text-ink transition-colors hover:bg-ivory sm:inline-flex"
      >
        <WhatsAppIcon className="size-6" />
        {t("whatsapp")}
      </a>

      <button
        type="button"
        aria-label={mobileOpen ? a11y("closeMenu") : a11y("openMenu")}
        aria-expanded={mobileOpen}
        aria-controls="mobile-nav"
        onClick={() => setMobileOpen((v) => !v)}
        className="inline-flex size-11 items-center justify-center text-ivory transition-colors hover:text-gold xl:hidden"
      >
        {mobileOpen ? (
          <X aria-hidden className="size-6" strokeWidth={1.5} />
        ) : (
          <Menu aria-hidden className="size-6" strokeWidth={1.5} />
        )}
      </button>

      {/* Mobile navigation */}
      {mobileOpen && (
        <nav
          id="mobile-nav"
          aria-label={a11y("mobileNav")}
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-ink px-6 pb-10 pt-6 xl:hidden"
        >
          <ul className="divide-y divide-white/10">
            {links.map(({ key, href }) => (
              <li key={key}>
                <Link
                  href={href}
                  onClick={closeMobile}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={cn(
                    "display block py-4 text-3xl transition-colors hover:text-gold",
                    isActive(href) ? "text-gold" : "text-ivory",
                  )}
                >
                  {t(key)}
                </Link>
                {key === "services" && (
                  <ul className="mb-4 space-y-1 border-s border-gold/40 ps-5">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          onClick={closeMobile}
                          className="block py-2 text-base text-mist transition-colors hover:text-gold"
                        >
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="label inline-flex min-h-12 items-center justify-center gap-2 bg-gold px-5 py-3 text-ink"
            >
              <WhatsAppIcon className="size-6" />
              {t("whatsapp")}
            </a>
            <a
              href={site.phoneHref}
              className="label inline-flex min-h-12 items-center justify-center gap-2 border border-white/45 px-5 py-3 text-ivory"
            >
              <Phone aria-hidden className="size-4" />
              <span dir="ltr">{site.phoneDisplay}</span>
            </a>
          </div>
        </nav>
      )}
    </div>
  );
}
