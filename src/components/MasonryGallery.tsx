"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Stagger, StaggerItem } from "@/components/Motion";
import type { GalleryPhoto } from "@/data/gallery";

/**
 * Editorial masonry gallery — CSS `columns` so images keep their natural
 * aspect ratios and tile like a Pinterest board (zero dependencies, no CLS
 * because each tile reserves space via the image's intrinsic width/height).
 *
 * - Hover (desktop): tile scales to 1.04, lifts above neighbors (z-10 + shadow),
 *   and a dark gradient fades in with the caption sliding up. 250ms ease.
 * - Touch: no hover dependency — tapping opens the lightbox directly.
 * - Entrance: reuses the site's Stagger/StaggerItem zoom-in (reduced-motion safe).
 * - Click anything → full-screen lightbox (arrows, swipe, Esc, backdrop close).
 */
export function MasonryGallery({ photos }: { photos: GalleryPhoto[] }) {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <Stagger
        stagger={0.06}
        className="gap-3 [column-fill:_balance] columns-2 md:columns-3 lg:columns-4"
      >
        {photos.map((photo, i) => (
          <StaggerItem key={photo.src} variant="zoomIn" className="mb-3 break-inside-avoid">
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={photo.alt}
              className="group relative block w-full overflow-hidden rounded-2xl bg-cream shadow-sm shadow-ink/5 transition-[transform,box-shadow,z-index] duration-[250ms] ease-out hover:z-10 hover:scale-[1.04] hover:shadow-xl hover:shadow-ink/20"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="h-auto w-full"
              />
              {/* Caption reveal — hidden on touch-only devices where there is no hover */}
              <span className="pointer-events-none absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-ink/80 via-ink/30 to-transparent p-3 opacity-0 transition-opacity duration-[250ms] ease-out group-hover:opacity-100 sm:block">
                <span className="block translate-y-2 text-left text-xs font-medium text-white transition-transform duration-[250ms] ease-out group-hover:translate-y-0">
                  {photo.alt}
                </span>
              </span>
            </button>
          </StaggerItem>
        ))}
      </Stagger>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={photos.map((p) => ({ src: p.src, alt: p.alt, width: p.width, height: p.height }))}
      />
    </>
  );
}
