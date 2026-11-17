import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat, Noto_Sans_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/ui/JsonLd";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { localeDir, routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/seo";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});
// Standard, neutral Arabic sans-serif (falls back to Tahoma/Arial, the usual Arabic web defaults).
const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

/** Namespaces needed by client components (keeps the client payload small). */
const clientNamespaces = [
  "a11y",
  "nav",
  "lang",
  "media",
  "common",
  "contact",
  "projectsPage",
  "galleryPage",
  "error",
] as const;

/** Only the listed slugs/locales exist; anything else gets a real 404 (see app/global-not-found.tsx). */
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#070707",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(site.url),
    title: { default: t("home.title"), template: `%s | ${t("siteName")}` },
    applicationName: t("siteName"),
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const all = await getMessages();
  const messages = Object.fromEntries(
    clientNamespaces.map((ns) => [ns, (all as Record<string, unknown>)[ns]]),
  );
  const a11y = await getTranslations({ locale, namespace: "a11y" });

  const fontClasses =
    locale === "ar"
      ? notoArabic.variable
      : `${cormorant.variable} ${montserrat.variable}`;

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": absoluteUrl("/#business"),
    name: site.name,
    alternateName: site.nameAr,
    url: absoluteUrl(`/${locale}`),
    telephone: "+96599039678",
    logo: absoluteUrl("/images/brand/logo.png"),
    image: absoluteUrl("/images/brand/logo.png"),
    areaServed: { "@type": "Country", name: "Kuwait" },
    address: { "@type": "PostalAddress", addressCountry: "KW" },
    knowsAbout: services.map((s) => s.title.en),
  };

  return (
    <html lang={locale} dir={localeDir(locale)} className={fontClasses}>
      <body className="flex min-h-screen flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a href="#main" className="skip-link">
            {a11y("skipToContent")}
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <FloatingContact />
        </NextIntlClientProvider>
        <JsonLd data={localBusiness} />
      </body>
    </html>
  );
}
