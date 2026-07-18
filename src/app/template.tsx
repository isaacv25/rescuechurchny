"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Page-transition fade: template.tsx remounts on every route change, so each
 * page fades in (opacity 0 → 1, 0.2s). Header/Footer live in layout.tsx and
 * are untouched. Static passthrough when reduced motion is requested.
 */
export default function Template({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}
