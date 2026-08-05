"use client";

import { navigation } from "@/content/navigation";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { useFilm } from "@/lib/film/FilmProvider";
import { cn } from "@/lib/cn";
import { useLeadModal } from "@/components/rooms/LeadModalProvider";

export function SiteHeader() {
  const { headerVisible } = useFilm();
  const { openLead } = useLeadModal();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b border-transparent transition-all duration-[240ms] ease-[var(--ease-out-expo)]",
        headerVisible
          ? "liquid-glass-header translate-y-0 backdrop-blur-xl backdrop-saturate-150"
          : "pointer-events-none -translate-y-2 opacity-0",
      )}
    >
      <div className="film-container flex h-16 items-center justify-between">
        <BrandLogo
          href="/#section-industry"
          surface="light"
          compact
          priority
        />
        <Button
          type="button"
          size="sm"
          onClick={() =>
            openLead({ path: "walkthrough", sourceScene: "header" })
          }
        >
          {navigation.bookCta}
        </Button>
      </div>
    </header>
  );
}
