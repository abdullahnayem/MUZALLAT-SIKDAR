import { getLocale } from "next-intl/server";
import { MediaImage } from "@/components/media/MediaImage";
import { media } from "@/data/media";
import type { Project } from "@/data/projects";
import { getService } from "@/data/services";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { pick } from "@/lib/localize";

/** Portfolio card. Real company photographs only. */
export async function ProjectCard({
  project,
  ratio = "aspect-[4/5]",
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
  priority,
  className,
}: {
  project: Project;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const locale = await getLocale();
  const service = getService(project.service);

  return (
    <article className={cn("group relative isolate overflow-hidden bg-ink", className)}>
      <MediaImage
        media={media[project.image]}
        ratio={ratio}
        sizes={sizes}
        priority={priority}
        zoom
      />
      <div
        className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/20 to-transparent"
        aria-hidden
      />
      <div className="on-dark absolute inset-x-0 bottom-0 p-6 text-ivory">
        {service && (
          <p className="eyebrow mb-2">{pick(service.title, locale)}</p>
        )}
        <h3 className="display text-2xl sm:text-[1.7rem]">
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0"
          >
            {pick(project.title, locale)}
          </Link>
        </h3>
      </div>
    </article>
  );
}
