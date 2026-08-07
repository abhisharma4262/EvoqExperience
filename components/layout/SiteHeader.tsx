"use client";

import { navigation } from "@/content/navigation";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { useLeadModal } from "@/components/rooms/LeadModalProvider";

export function SiteHeader() {
  const { openLead } = useLeadModal();

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-transparent liquid-glass-header backdrop-blur-xl backdrop-saturate-150">
      <div className="film-container flex h-16 items-center justify-between">
        <BrandLogo href="/" surface="light" compact priority />
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
