import type { L } from "@/lib/localize";

/** Single source of truth for verified company details. Do not add unverified facts here. */
export const site = {
  name: "MUZALLAT SIKDAR",
  nameAr: "مظلات سيكدار",
  country: { en: "Kuwait", ar: "الكويت" } satisfies L,
  phoneDisplay: "+965 9903 9678",
  phoneHref: "tel:+96599039678",
  whatsappHref: "https://wa.me/96599039678",
  whatsappNumber: "96599039678",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
    /\/$/,
    "",
  ),
} as const;

/** WhatsApp link, optionally with a prefilled message. */
export function whatsappLink(message?: string): string {
  return message
    ? `${site.whatsappHref}?text=${encodeURIComponent(message)}`
    : site.whatsappHref;
}
