"use client";

import { useState } from "react";
import Image from "next/image";
import type { GalleryPhoto } from "@/data/gallery";

interface GalleryTileProps {
  photo: GalleryPhoto;
  /** Translated label shown inside the placeholder tile — pass t.gallery.comingSoon. */
  comingSoonLabel: string;
  /** Called when the tile is clicked AND its image actually loaded (placeholders don't open). */
  onOpen?: () => void;
  className?: string;
  sizes?: string;
}

/**
 * One gallery image with a branded fallback: if the file under /public/gallery/
 * is missing, an intentional-looking placeholder (ink background + logo icon)
 * renders instead — never a broken-image icon. Real images get a subtle
 * hover zoom; placeholders stay static.
 */
export function GalleryTile({ photo, comingSoonLabel, onOpen, className = "", sizes }: GalleryTileProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl bg-ink ${className}`}
        role="img"
        aria-label={comingSoonLabel}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink to-[#3a2420]" />
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative logo, native img avoids Next remote-size handling inside fill parents */}
        <img src="/brand/logo-icon.png" alt="" aria-hidden className="relative h-14 w-auto opacity-30" />
        <p className="relative text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/40">
          {comingSoonLabel}
        </p>
      </div>
    );
  }

  const image = (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes={sizes ?? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
      className="object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02]"
      onError={() => setError(true)}
    />
  );

  const tileClass = `group relative block overflow-hidden rounded-2xl bg-cream ${className}`;

  // Only render an interactive element when there's actually a click action
  // (the /gallery lightbox); homepage tiles are display-only.
  if (onOpen) {
    return (
      <button type="button" onClick={onOpen} className={`${tileClass} cursor-pointer`} aria-label={photo.alt}>
        {image}
      </button>
    );
  }

  return <div className={tileClass}>{image}</div>;
}
