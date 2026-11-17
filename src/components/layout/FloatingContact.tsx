import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { getTranslations } from "next-intl/server";
import { site } from "@/data/site";

/** Compact floating actions, bottom inline-end, kept clear of the page content area. */
export async function FloatingContact() {
  const t = await getTranslations("floating");

  return (
    <div className="pointer-events-none fixed bottom-4 end-4 z-40 flex flex-col gap-3 pb-[env(safe-area-inset-bottom)] sm:bottom-6 sm:end-6">
      <a
        href={site.phoneHref}
        aria-label={t("call")}
        className="on-dark pointer-events-auto inline-flex size-12 items-center justify-center rounded-xl bg-ink text-gold shadow-lg shadow-black/30 ring-1 ring-gold/40 transition-transform hover:scale-105"
      >
        <Phone aria-hidden className="size-5" strokeWidth={1.8} />
      </a>
      <a
        href={site.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("whatsapp")}
        className="pointer-events-auto inline-flex size-12 items-center justify-center rounded-xl shadow-lg shadow-black/30 transition-transform hover:scale-105"
      >
        <WhatsAppIcon className="size-12" />
      </a>
    </div>
  );
}
