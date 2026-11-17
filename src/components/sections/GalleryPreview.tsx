import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { MediaImage } from "@/components/media/MediaImage";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { media, type MediaId } from "@/data/media";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

const tiles: { id: MediaId; className: string; ratio: string; sizes: string }[] = [
  {
    id: "realParkingVault",
    className: "col-span-2 md:row-span-2",
    ratio: "aspect-[4/3] md:aspect-auto md:h-full",
    sizes: "(min-width: 768px) 50vw, 100vw",
  },
  { id: "pergolaGarden", className: "", ratio: "aspect-square", sizes: "(min-width: 768px) 25vw, 50vw" },
  { id: "realCarportWhite", className: "", ratio: "aspect-square", sizes: "(min-width: 768px) 25vw, 50vw" },
  { id: "awningPatio", className: "", ratio: "aspect-square", sizes: "(min-width: 768px) 25vw, 50vw" },
  { id: "realParkingGrey", className: "", ratio: "aspect-square", sizes: "(min-width: 768px) 25vw, 50vw" },
];

export async function GalleryPreview() {
  const t = await getTranslations("home.gallery");

  return (
    <Section labelledBy="gallery-title">
      <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
        <Reveal>
          <SectionHeading
            id="gallery-title"
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Reveal>
        <Reveal className="hidden sm:block">
          <ButtonLink href="/gallery" variant="outline-dark">
            {t("cta")}
            <ArrowRight aria-hidden className="size-4 rtl:rotate-180" />
          </ButtonLink>
        </Reveal>
      </div>
      <Reveal className="mt-14">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
          {tiles.map((tile) => (
            <Link
              key={tile.id}
              href="/gallery"
              className={cn("group block", tile.className)}
            >
              <MediaImage
                media={media[tile.id]}
                ratio={tile.ratio}
                className="h-full"
                sizes={tile.sizes}
                zoom
              />
            </Link>
          ))}
        </div>
      </Reveal>
      <div className="mt-10 sm:hidden">
        <ButtonLink href="/gallery" variant="outline-dark" className="w-full">
          {t("cta")}
        </ButtonLink>
      </div>
    </Section>
  );
}
