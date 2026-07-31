"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Cinematic background video for the homepage hero.
 *
 * - Native <video> (autoPlay/muted/loop/playsInline) so iOS Safari will
 *   actually autoplay — non-muted autoplay is blocked there.
 * - preload="metadata" so it never blocks first paint.
 * - poster shows a clean branded frame before the video loads.
 * - On error (or a codec the browser can't play) we hide the <video> and the
 *   poster-colored background layer beneath stays — never a black box.
 * - prefers-reduced-motion: we do NOT autoplay; the poster image shows static.
 *
 * The consumer stacks copy on top and lays its own gradient overlay between
 * the video and the copy for legibility.
 */
export function HeroVideo({
  src,
  poster,
  className = "",
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  // Reliable mobile autoplay: the autoPlay attribute alone is ignored by some
  // mobile browsers (during scroll, or Low Power Mode). Force muted + call
  // play() ourselves and swallow the rejection (falls back to the poster).
  // Under reduced motion we pause instead and let the poster stand.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (reduced) {
      el.pause();
      return;
    }
    el.muted = true;
    const attempt = el.play();
    if (attempt && typeof attempt.catch === "function") {
      attempt.catch(() => {
        /* autoplay blocked — poster frame remains, no black box */
      });
    }
  }, [reduced]);

  // Static poster fallback: reduced motion, or the video errored.
  if (reduced || failed) {
    return (
      <div
        className={`absolute inset-0 h-full w-full bg-ink bg-cover bg-center ${className}`}
        style={{ backgroundImage: `url(${poster})` }}
        aria-hidden
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      onError={() => setFailed(true)}
      aria-hidden
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
