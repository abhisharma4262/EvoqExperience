import Image from "next/image";
import Link from "next/link";
import { brand } from "@/content/brand";
import { cn } from "@/lib/cn";

export type BrandLogoSurface = "light" | "dark";

type BrandLogoProps = {
  /** Background the logo sits on — picks the matching asset. */
  surface?: BrandLogoSurface;
  href?: string | null;
  className?: string;
  /** Compact mark for tight chrome (header, rails). */
  compact?: boolean;
  priority?: boolean;
  /** Accessible name when wrapped in a link; also used as image alt. */
  label?: string;
};

const size = {
  compact: { width: 88, height: 28, className: "h-6 max-w-[4.5rem]" },
  default: {
    width: 120,
    height: 36,
    className: "h-8 max-w-[7.5rem] sm:h-9 sm:max-w-[9rem]",
  },
} as const;

export function BrandLogo({
  surface = "light",
  href = "/",
  className,
  compact = false,
  priority = false,
  label = brand.name,
}: BrandLogoProps) {
  const dims = compact ? size.compact : size.default;
  const src = surface === "dark" ? brand.logos.dark : brand.logos.light;

  const image = (
    <Image
      src={src}
      alt={label}
      width={dims.width}
      height={dims.height}
      className={cn(
        "h-auto w-auto object-contain object-left",
        dims.className,
        className,
      )}
      priority={priority}
    />
  );

  if (href === null) return image;

  return (
    <Link
      href={href}
      className="inline-flex items-center"
      aria-label={label}
    >
      {image}
    </Link>
  );
}
