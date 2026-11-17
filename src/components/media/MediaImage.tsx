import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import type { Media } from "@/data/media";
import { cn } from "@/lib/cn";
import { pick } from "@/lib/localize";

type Props = {
  media: Media;
  sizes: string;
  priority?: boolean;
  /** Tailwind aspect-ratio class, e.g. "aspect-[4/3]". */
  ratio?: string;
  className?: string;
  imgClassName?: string;
  /** Label for AI images. `false` hides it (only for purely decorative backgrounds). */
  badge?: "inspiration" | "illustrative" | false;
  /** Gentle zoom when an ancestor with `group` is hovered. */
  zoom?: boolean;
  quality?: 75 | 90;
};

/**
 * The single place images are rendered. AI-generated images are always labelled,
 * so they can never be mistaken for completed company projects.
 */
export async function MediaImage({
  media,
  sizes,
  priority,
  ratio = "aspect-[4/3]",
  className,
  imgClassName,
  badge = "inspiration",
  zoom,
  quality,
}: Props) {
  const locale = await getLocale();
  const t = await getTranslations("media");
  const label = media.kind === "ai" && badge ? t(badge) : null;

  return (
    <div className={cn("relative overflow-hidden bg-sand", ratio, className)}>
      <Image
        src={media.src}
        alt={pick(media.alt, locale)}
        fill
        sizes={sizes}
        priority={priority}
        quality={quality}
        className={cn(
          "object-cover",
          zoom && "transition-transform duration-700 ease-out group-hover:scale-[1.04]",
          imgClassName,
        )}
      />
      {label && (
        <span className="pointer-events-none absolute bottom-3 start-3 bg-ink/80 px-2.5 py-1 text-[0.68rem] font-medium text-gold backdrop-blur-sm">
          {label}
        </span>
      )}
    </div>
  );
}
