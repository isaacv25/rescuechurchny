"use client";

import { useState } from "react";
import Image from "next/image";
import type { LeaderEntry } from "@/lib/i18n/types";

function initials(name: string) {
  return name
    .replace(/["""]/g, "")
    .split(" ")
    .filter((w) => w.length > 1 && /^[A-ZÁÉÍÓÚÑ]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

export function LeaderCard({ leader }: { leader: LeaderEntry }) {
  // Track whether the photo failed to load; if so, fall back to initials avatar.
  // This means missing files in /public/leaders/ never break the layout.
  const [imgError, setImgError] = useState(false);

  const showPhoto = !!leader.photoPath && !imgError;

  return (
    <div className="flex flex-col items-center rounded-2xl border border-ink/8 bg-white p-6 text-center shadow-sm shadow-ink/5">
      {showPhoto ? (
        <div className="relative h-16 w-16 overflow-hidden rounded-full">
          <Image
            src={leader.photoPath!}
            alt={leader.name}
            fill
            sizes="64px"
            className="object-cover"
            onError={() => setImgError(true)}
          />
        </div>
      ) : (
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-coral/10 text-lg font-semibold text-coral-dark">
          {initials(leader.name) || leader.name[0]}
        </div>
      )}
      <h3 className="mt-4 text-base font-semibold text-ink">{leader.name}</h3>
      <p className="mt-1 text-sm text-charcoal">{leader.role}</p>
    </div>
  );
}
