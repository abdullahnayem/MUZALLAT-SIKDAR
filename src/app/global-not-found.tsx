import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_Arabic } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});
const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Page not found | الصفحة غير موجودة",
  robots: { index: false, follow: false },
};

/**
 * Served (with a real 404 status) for any URL that matches no route.
 * The visitor's language is unknown here, so the page is bilingual.
 */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${cormorant.variable} ${notoArabic.variable}`}>
      <body className="on-dark flex min-h-screen items-center justify-center bg-ink px-6 text-center text-ivory">
        <main>
          <p className="eyebrow mb-4">404</p>
          <h1 className="display text-5xl sm:text-6xl">Page not found</h1>
          <p lang="ar" dir="rtl" className="mt-4 font-[family-name:var(--font-arabic)] text-3xl font-bold">
            الصفحة غير موجودة
          </p>
          <div className="rule-gold mx-auto mt-8 w-24" aria-hidden />
          <p className="mx-auto mt-6 max-w-md text-mist">
            The page you are looking for does not exist or has moved.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/en"
              className="label inline-flex min-h-12 items-center justify-center bg-gold px-8 py-3 text-ink"
            >
              English
            </Link>
            <Link
              href="/ar"
              lang="ar"
              className="label inline-flex min-h-12 items-center justify-center border border-white/45 px-8 py-3 text-ivory"
            >
              العربية
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
