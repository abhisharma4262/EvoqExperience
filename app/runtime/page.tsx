"use client";

import { runtimePage } from "@/content/runtimePage";
import { CoordinationMesh } from "@/components/visuals/CoordinationMesh";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Button } from "@/components/ui/Button";
import { useLeadModal } from "@/components/rooms/LeadModalProvider";

export default function RuntimePage() {
  const { openLead } = useLeadModal();

  return (
    <main className="band-light">
      <div className="film-container space-y-16 py-24">
        <div className="flex items-center justify-between gap-4">
          <BrandLogo href="/" surface="light" compact priority />
          <Button
            type="button"
            size="sm"
            onClick={() =>
              openLead({
                path: "runtime-deep-dive",
                sourceScene: "runtime-page",
              })
            }
          >
            {runtimePage.cta}
          </Button>
        </div>

        <header className="max-w-3xl space-y-6">
          <h1 className="display text-[clamp(2.25rem,5vw,4rem)]">
            {runtimePage.title}
          </h1>
          <p className="text-lg text-text-secondary">{runtimePage.subtitle}</p>
        </header>

        <CoordinationMesh />

        <div className="grid gap-10 md:grid-cols-2">
          {runtimePage.sections.map((section) => (
            <section
              key={section.id}
              className="border-t border-accent-alt/20 pt-6"
            >
              <h2 className="display text-2xl">{section.title}</h2>
              <p className="mt-3 text-text-secondary">{section.body}</p>
            </section>
          ))}
        </div>

        <Button
          type="button"
          size="lg"
          onClick={() =>
            openLead({
              path: "walkthrough",
              sourceScene: "runtime-page",
            })
          }
        >
          {runtimePage.cta}
        </Button>
      </div>
    </main>
  );
}
