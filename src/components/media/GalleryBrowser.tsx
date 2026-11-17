"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { VideoPlayer } from "./VideoPlayer";

export type GalleryImage = {
  id: string;
  kind: "real" | "ai";
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type GalleryVideo = {
  id: string;
  src: string;
  poster: string;
  width: number;
  height: number;
  title: string;
  caption: string;
};

type Tab = "all" | "real" | "inspiration" | "videos";

export function GalleryBrowser({
  images,
  videos,
}: {
  images: GalleryImage[];
  videos: GalleryVideo[];
}) {
  const t = useTranslations("galleryPage");
  const media = useTranslations("media");
  const a11y = useTranslations("a11y");
  const [tab, setTab] = useState<Tab>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const shown = images.filter((img) =>
    tab === "all" ? true : tab === "real" ? img.kind === "real" : img.kind === "ai",
  );
  const showImages = tab !== "videos";
  const showVideos = tab === "all" || tab === "videos";

  const tabs: { value: Tab; label: string }[] = [
    { value: "all", label: t("all") },
    { value: "real", label: t("real") },
    { value: "inspiration", label: t("inspiration") },
    { value: "videos", label: t("videos") },
  ];

  const badgeFor = (kind: GalleryImage["kind"]) =>
    kind === "ai" ? media("inspiration") : media("realProject");

  // Keep the native <dialog> in sync with state.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (openIndex !== null && !dialog.open) dialog.showModal();
    if (openIndex === null && dialog.open) dialog.close();
  }, [openIndex]);

  const step = (dir: 1 | -1) =>
    setOpenIndex((i) =>
      i === null ? i : (i + dir + shown.length) % shown.length,
    );

  const current = openIndex !== null ? shown[openIndex] : null;

  return (
    <div>
      <div role="group" aria-label={t("tabsLabel")} className="flex flex-wrap gap-2">
        {tabs.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            aria-pressed={tab === value}
            onClick={() => setTab(value)}
            className={cn(
              "label min-h-11 border px-5 py-2 transition-colors",
              tab === value
                ? "border-ink bg-ink text-ivory"
                : "border-charcoal/25 text-charcoal hover:border-ink hover:bg-ink hover:text-ivory",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {(tab === "all" || tab === "inspiration") && (
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-stone">{t("note")}</p>
      )}

      {showImages && (
        <ul className="mt-8 columns-2 gap-3 md:columns-3 lg:columns-4">
          {shown.map((img, i) => (
            <li key={img.id} className="mb-3 break-inside-avoid">
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-label={`${t("viewImage")}: ${img.alt}`}
                className="group relative block w-full overflow-hidden bg-sand"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  loading="lazy"
                  className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <span
                  className={cn(
                    "pointer-events-none absolute bottom-2 start-2 px-2 py-0.5 text-[0.68rem] font-medium",
                    img.kind === "ai" ? "bg-ink/80 text-gold" : "bg-gold text-ink",
                  )}
                >
                  {badgeFor(img.kind)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {showVideos && videos.length > 0 && (
        <div className={cn(showImages ? "mt-16" : "mt-8")}>
          <h2 className="display text-3xl sm:text-4xl">{t("videos")}</h2>
          <p className="mt-2 text-sm text-stone">{t("videoNote")}</p>
          <ul className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v) => (
              <li key={v.id}>
                <VideoPlayer
                  src={v.src}
                  poster={v.poster}
                  width={v.width}
                  height={v.height}
                  title={v.title}
                  playLabel={t("play")}
                />
                <h3 className="mt-4 font-semibold">{v.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-stone">{v.caption}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <dialog
        ref={dialogRef}
        onClose={() => setOpenIndex(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setOpenIndex(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(document.dir === "rtl" ? -1 : 1);
          if (e.key === "ArrowLeft") step(document.dir === "rtl" ? 1 : -1);
        }}
        aria-label={current?.alt}
        className="on-dark m-auto max-h-[96vh] w-[min(96vw,1200px)] bg-transparent p-0 backdrop:bg-ink/92"
      >
        {current && (
          <div className="relative flex flex-col items-center">
            <Image
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="96vw"
              className="max-h-[82vh] w-auto max-w-full object-contain"
            />
            <div className="mt-3 flex w-full items-center justify-between gap-4 px-1 text-sm text-ivory">
              <p>{current.alt}</p>
              <span
                className={cn(
                  "shrink-0 px-2 py-0.5 text-[0.7rem] font-medium",
                  current.kind === "ai" ? "bg-ink text-gold ring-1 ring-gold/40" : "bg-gold text-ink",
                )}
              >
                {badgeFor(current.kind)}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOpenIndex(null)}
              aria-label={a11y("closeLightbox")}
              className="absolute end-1 top-1 flex size-11 items-center justify-center bg-ink/80 text-ivory hover:text-gold"
            >
              <X aria-hidden className="size-5" />
            </button>
            {shown.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label={a11y("previous")}
                  className="absolute start-1 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center bg-ink/80 text-ivory hover:text-gold"
                >
                  <ChevronLeft aria-hidden className="size-6 rtl:rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label={a11y("next")}
                  className="absolute end-1 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center bg-ink/80 text-ivory hover:text-gold"
                >
                  <ChevronRight aria-hidden className="size-6 rtl:rotate-180" />
                </button>
              </>
            )}
          </div>
        )}
      </dialog>
    </div>
  );
}
