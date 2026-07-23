"use client";

/**
 * Sitewide motion primitives — the single home for the animation layer.
 *
 * Principles (keep these when adding motion anywhere):
 * - Scroll-reveals only for content entering the viewport from below; content
 *   above the fold animates on load (hero) or not at all.
 * - transform + opacity only — never height/width/margin/padding.
 * - Every primitive here respects prefers-reduced-motion via useReducedMotion()
 *   and renders static markup when reduced motion is requested.
 */

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = "easeOut";

/** Scroll-triggered fade-up: translateY 24px → 0, opacity 0 → 1, 0.5s. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Scroll-triggered fade only (no movement) — used for the footer. */
export function FadeIn({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

type StaggerVariant = "fadeUp" | "zoomIn" | "slideLeft";

const ITEM_VARIANTS: Record<StaggerVariant, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -24 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
  },
};

/**
 * Container that cascades its StaggerItem children in one after another.
 * Use on card grids: <Stagger className="grid ..."><StaggerItem>...</StaggerItem></Stagger>
 */
export function Stagger({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

/** One child of a Stagger container. Becomes the grid/flex item — pass layout classes here. */
export function StaggerItem({
  children,
  className,
  variant = "fadeUp",
}: {
  children: ReactNode;
  className?: string;
  variant?: StaggerVariant;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} variants={ITEM_VARIANTS[variant]}>
      {children}
    </motion.div>
  );
}

/**
 * Hero headline: words animate in one by one on load (opacity + slight rise).
 * Load animation is intentional here — the hero is above the fold, so
 * scroll-reveal would be backwards.
 */
export function HeroWords({ text, className }: { text: string; className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return <span className={className}>{text}</span>;

  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, idx) => (
        <motion.span
          key={`${word}-${idx}`}
          className="inline-block"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: idx * 0.1 }}
        >
          {word}
          {idx < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </span>
  );
}

/** Load-time fade for hero subtext/CTAs — fires after the headline words. */
export function HeroFade({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
