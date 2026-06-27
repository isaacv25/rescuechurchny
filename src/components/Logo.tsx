import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "horizontal" | "icon" | "stacked";
  theme?: "light" | "dark";
  className?: string;
  href?: string;
  priority?: boolean;
}

const sources: Record<string, { src: string; w: number; h: number }> = {
  horizontal: { src: "/brand/logo-horizontal.png", w: 1400, h: 412 },
  "horizontal-dark": { src: "/brand/logo-horizontal-dark.png", w: 1400, h: 412 },
  icon: { src: "/brand/logo-icon.png", w: 1400, h: 1575 },
  stacked: { src: "/brand/logo-stacked.png", w: 1400, h: 1187 },
  "stacked-dark": { src: "/brand/logo-stacked-dark.png", w: 1400, h: 1187 },
};

export function Logo({ variant = "horizontal", theme = "light", className, href = "/", priority }: LogoProps) {
  const key = variant === "icon" ? "icon" : theme === "dark" ? `${variant}-dark` : variant;
  const img = sources[key] ?? sources.horizontal;

  const content = (
    <Image
      src={img.src}
      alt="Rescue Church"
      width={img.w}
      height={img.h}
      priority={priority}
      className={className}
    />
  );

  return href ? (
    <Link href={href} aria-label="Rescue Church home" className="inline-flex">
      {content}
    </Link>
  ) : (
    content
  );
}
