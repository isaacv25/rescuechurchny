"use client";

import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { MasonryGallery } from "@/components/MasonryGallery";
import { useT } from "@/lib/i18n/LocaleProvider";
import { galleryPhotos } from "@/data/gallery";

export default function GalleryPage() {
  const t = useT();

  return (
    <div>
      <section className="bg-ink py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow={t.gallery.eyebrow} title={t.gallery.title} subtitle={t.gallery.pageIntro} light />
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        <MasonryGallery photos={galleryPhotos} />
      </Container>
    </div>
  );
}
