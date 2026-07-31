/**
 * PHOTO GALLERY — single source of truth for the homepage gallery preview
 * and the /gallery page.
 *
 * HOW TO ADD A PHOTO
 *   1. Drop the image file into /public/gallery/  (e.g. RP17.jpeg)
 *   2. Add an entry below with its src, alt text, and pixel width/height.
 *      (width/height reserve space so there's no layout shift while it loads.)
 *   3. Save — it appears on /gallery automatically, and on the homepage
 *      preview if it's within the first several entries.
 *
 * INTENTIONALLY EXCLUDED from the gallery (present in /public/gallery/ but
 * not listed here on purpose):
 *   - RV1.mp4  → used as the homepage hero background video (see HeroVideo)
 *   - RP2.jpeg → excluded per content owner's request
 *
 * Filenames are non-descriptive (RP1, RP3, …), so alt text is generic but
 * varied — describing church life rather than the literal file.
 */

export interface GalleryPhoto {
  /** Path under /public — e.g. "/gallery/RP1.jpeg" */
  src: string;
  /** Alt text describing the photo (screen readers + lightbox caption). */
  alt: string;
  /** Intrinsic pixel dimensions — used to reserve space (no layout shift). */
  width: number;
  height: number;
}

export const galleryPhotos: GalleryPhoto[] = [
  { src: "/gallery/RP1.jpeg", alt: "Worship at Rescue Church", width: 1600, height: 924 },
  { src: "/gallery/RP9.jpeg", alt: "A moment of prayer during service", width: 911, height: 1600 },
  { src: "/gallery/RP3.jpeg", alt: "Rescue Church congregation gathered", width: 1600, height: 900 },
  { src: "/gallery/RP12.jpeg", alt: "Lifting hands in praise", width: 1066, height: 1600 },
  { src: "/gallery/RP4.jpeg", alt: "Fellowship at Rescue Church", width: 1600, height: 942 },
  { src: "/gallery/RP7.jpeg", alt: "Sunday service in Staten Island", width: 1600, height: 1066 },
  { src: "/gallery/RP10.jpeg", alt: "Worship leader on stage", width: 939, height: 1600 },
  { src: "/gallery/RP5.jpeg", alt: "The church family together", width: 1600, height: 942 },
  { src: "/gallery/RP13.jpeg", alt: "Community gathering at Rescue Church", width: 1600, height: 1066 },
  { src: "/gallery/RP15.jpeg", alt: "Youth ministry in action", width: 1066, height: 1600 },
  { src: "/gallery/RP6.jpeg", alt: "A warm welcome at Rescue Church", width: 1600, height: 939 },
  { src: "/gallery/RP8.jpeg", alt: "Celebrating faith together", width: 1600, height: 900 },
  { src: "/gallery/RP16.jpeg", alt: "Rescue Church community", width: 1600, height: 1066 },
  { src: "/gallery/RP11.jpeg", alt: "Worship and the Word", width: 1600, height: 900 },
  { src: "/gallery/RP14.jpeg", alt: "Serving Staten Island and beyond", width: 1600, height: 1066 },
];
