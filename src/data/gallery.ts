/**
 * PHOTO GALLERY — single source of truth for the homepage gallery section
 * and the /gallery page.
 *
 * HOW TO ADD A PHOTO
 *   1. Add the image file to /public/gallery/   (e.g. photo-09.jpg)
 *   2. Add an entry below: { src: "/gallery/photo-09.jpg", alt: "Description" }
 *   3. Save — it appears on the homepage gallery and /gallery automatically.
 *
 * Missing files never break the site: the GalleryTile component shows a
 * branded placeholder tile for any entry whose image hasn't been uploaded yet.
 *
 * The homepage shows the FIRST 6 entries; /gallery shows all of them.
 */

export interface GalleryPhoto {
  /** Path under /public — e.g. "/gallery/photo-01.jpg" */
  src: string;
  /** Alt text describing the photo (used by screen readers and the lightbox). */
  alt: string;
}

export const galleryPhotos: GalleryPhoto[] = [
  { src: "/gallery/photo-01.jpg", alt: "Sunday worship service" },
  { src: "/gallery/photo-02.jpg", alt: "Christ Chasers youth group" },
  { src: "/gallery/photo-03.jpg", alt: "Congregation in prayer" },
  { src: "/gallery/photo-04.jpg", alt: "Worship team leading praise" },
  { src: "/gallery/photo-05.jpg", alt: "Church family fellowship" },
  { src: "/gallery/photo-06.jpg", alt: "Community outreach event" },
  { src: "/gallery/photo-07.jpg", alt: "Baptism celebration" },
  { src: "/gallery/photo-08.jpg", alt: "Bilingual service gathering" },
];
