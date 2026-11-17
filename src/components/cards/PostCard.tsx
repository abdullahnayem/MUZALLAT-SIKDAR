import { ArrowRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { MediaImage } from "@/components/media/MediaImage";
import type { BlogPost } from "@/data/blog";
import { media } from "@/data/media";
import { Link } from "@/i18n/navigation";
import { formatDate } from "@/lib/format";
import { pick } from "@/lib/localize";

export async function PostCard({ post }: { post: BlogPost }) {
  const locale = await getLocale();
  const t = await getTranslations("common");

  return (
    <article className="group relative flex h-full flex-col bg-white ring-1 ring-charcoal/10 transition-shadow duration-500 hover:shadow-xl hover:shadow-charcoal/10">
      <MediaImage
        media={media[post.image]}
        ratio="aspect-[16/10]"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        badge="illustrative"
        zoom
      />
      <div className="flex flex-1 flex-col p-7">
        <time dateTime={post.date} className="text-sm text-stone">
          {formatDate(post.date, locale)}
        </time>
        <h3 className="display mt-3 text-2xl sm:text-[1.7rem]">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {pick(post.title, locale)}
          </Link>
        </h3>
        <p className="mt-3 flex-1 leading-relaxed text-stone">
          {pick(post.excerpt, locale)}
        </p>
        <span className="label mt-6 inline-flex items-center gap-2 text-gold-deep">
          {t("readArticle")}
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
          />
        </span>
      </div>
    </article>
  );
}
