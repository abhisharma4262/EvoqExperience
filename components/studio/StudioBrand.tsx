"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { useStudioTheme } from "@/components/studio/StudioThemeProvider";
import { cn } from "@/lib/cn";

type StudioBrandProps = {
  href?: string;
  className?: string;
  /** Compact mark for the workspace rail */
  compact?: boolean;
};

const STUDIO_LETTERS = ["S", "T", "U", "D", "I", "O"] as const;

export function StudioBrand({
  href = "/studio",
  className,
  compact = false,
}: StudioBrandProps) {
  const { theme } = useStudioTheme();

  if (compact) {
    return (
      <BrandLogo
        href={href}
        surface={theme === "dark" ? "dark" : "light"}
        compact
        className={className}
        priority
        label="EVOQ Studio"
      />
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "studio-brand group inline-flex w-[7.5rem] flex-col items-stretch gap-1 sm:w-[9rem]",
        className,
      )}
      aria-label="EVOQ Studio"
    >
      <BrandLogo
        href={null}
        surface={theme === "dark" ? "dark" : "light"}
        priority
        label="EVOQ"
        className="!max-w-none h-8 w-full sm:h-9"
      />
      <span className="studio-brand__studio" aria-hidden>
        <span className="studio-brand__flare" />
        <span className="studio-brand__studio-text">
          {STUDIO_LETTERS.map((letter) => (
            <span key={letter}>{letter}</span>
          ))}
        </span>
      </span>
    </Link>
  );
}
