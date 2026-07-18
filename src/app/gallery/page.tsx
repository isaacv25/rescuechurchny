"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { GalleryTile } from "@/components/GalleryTile";
import { Stagger, StaggerItem } from "@/components/Motion";
import { useT } from "@/lib/i18n/LocaleProvider";
import { galleryPhotos } from "@/data/gallery";

export default function GalleryPage() {
  const t = useT();
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  return (
    <div>
      <section className="bg-ink py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow={t.gallery.eyebrow} title={t.gallery.title} subtitle={t.gallery.pageIntro} light />
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        <Stagger stagger={0.06} className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {galleryPhotos.map((photo, idx) => (
            <StaggerItem key={photo.src} variant="zoomIn" className="aspect-square">
              <GalleryTile
                photo={photo}
                comingSoonLabel={t.gallery.comingSoon}
                onOpen={() => setLightboxIndex(idx)}
                className="h-full w-full"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={galleryPhotos.map((p) => ({ src: p.src, alt: p.alt }))}
      />
    </div>
  );
}
