import { ArrowRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { MediaImage } from "@/components/media/MediaImage";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { media } from "@/data/media";
import type { Service } from "@/data/services";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { pick } from "@/lib/localize";

export async function ServiceCard({
  service,
  index,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  className,
}: {
  service: Service;
  index: number;
  sizes?: string;
  className?: string;
}) {
  const locale = await getLocale();
  const t = await getTranslations("common");

  return (
    <article
      className={cn(
        "group relative flex flex-col bg-white ring-1 ring-charcoal/10 transition-shadow duration-500 hover:shadow-xl hover:shadow-charcoal/10",
        className,
      )}
    >
      <MediaImage
        media={media[service.hero]}
        ratio="aspect-[16/10]"
        sizes={sizes}
        zoom
      />
      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-center justify-between">
          <ServiceIcon name={service.icon} className="size-8 text-gold-deep" />
          <span className="text-sm tabular-nums text-stone">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h3 className="display mt-5 text-3xl">
          <Link
            href={`/services/${service.slug}`}
            className="after:absolute after:inset-0"
          >
            {pick(service.title, locale)}
          </Link>
        </h3>
        <p className="mt-3 flex-1 leading-relaxed text-stone">
          {pick(service.short, locale)}
        </p>
        <span className="label mt-6 inline-flex items-center gap-2 text-gold-deep">
          {t("learnMore")}
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
          />
        </span>
      </div>
    </article>
  );
}
