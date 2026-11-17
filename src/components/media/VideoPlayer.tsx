"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

/**
 * Click-to-play video. Nothing is downloaded until the visitor presses play, so videos never
 * affect page speed or autoplay for people who prefer reduced motion. The poster is the fallback.
 */
export function VideoPlayer({
  src,
  poster,
  width,
  height,
  title,
  playLabel,
}: {
  src: string;
  poster: string;
  width: number;
  height: number;
  title: string;
  playLabel: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className="relative mx-auto w-full overflow-hidden bg-ink"
      style={{ aspectRatio: `${width} / ${height}`, maxWidth: width * 1.1 }}
    >
      {playing ? (
        <video
          src={src}
          poster={poster}
          controls
          autoPlay
          muted
          playsInline
          preload="metadata"
          aria-label={title}
          className="size-full object-cover"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`${playLabel}: ${title}`}
          className="group on-dark relative block size-full"
        >
          <Image
            src={poster}
            alt=""
            fill
            sizes="(min-width: 1024px) 360px, 80vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-ink/25 transition-colors group-hover:bg-ink/10" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-gold text-ink shadow-xl transition-transform group-hover:scale-110">
              <Play aria-hidden className="size-7 translate-x-0.5 rtl:-translate-x-0.5 rtl:-scale-x-100" fill="currentColor" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
