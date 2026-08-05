"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { getSidecarOfferings, type ModeId } from "@/content/offerings";
import { rooms } from "@/content/rooms";
import { MediaSlot } from "@/components/media/MediaSlot";
import { Button } from "@/components/ui/Button";
import { useLeadModal } from "@/components/rooms/LeadModalProvider";

export function SidecarStrip({ mode }: { mode: ModeId }) {
  const offerings = getSidecarOfferings(mode);
  const intro = rooms[mode].sidecarIntro;
  const { openLead } = useLeadModal();
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const active = offerings.find((o) => o.slug === activeSlug) ?? null;

  return (
    <div className="space-y-4">
      <p className="text-sm text-text-muted">{intro}</p>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {offerings.map((offering) => (
          <button
            key={offering.slug}
            type="button"
            onClick={() => setActiveSlug(offering.slug)}
            className="min-w-[16rem] rounded-2xl border border-accent-alt/15 bg-bg px-5 py-4 text-left transition-colors hover:border-accent"
          >
            <p className="text-sm font-medium text-text-primary">
              {offering.name}
            </p>
            <p className="mt-2 text-sm text-text-secondary">
              {offering.scenarioLine}
            </p>
          </button>
        ))}
      </div>

      <Dialog.Root
        open={Boolean(active)}
        onOpenChange={(open) => !open && setActiveSlug(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-dark-bg/40" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(92vw,36rem)] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-surface p-8 focus:outline-none">
            {active ? (
              <>
                <Dialog.Title className="display text-2xl">
                  {active.name}
                </Dialog.Title>
                <Dialog.Description className="mt-4 text-text-secondary">
                  {active.scenarioLine}
                </Dialog.Description>
                <div className="mt-6 space-y-3 text-sm text-text-secondary">
                  <p>1. The moment arrives for a named enterprise role.</p>
                  <p>2. The old way shows friction and delay.</p>
                  <p>3. EVOQ wires into systems already running.</p>
                  <p>4. Execution moves under governance.</p>
                  <p>5. The outcome compounds into the next engagement.</p>
                </div>
                <div className="mt-6">
                  <MediaSlot
                    src={active.screenshot?.src}
                    alt={
                      active.screenshot?.alt ??
                      `${active.name} scenario visual`
                    }
                    aspectRatio="16 / 9"
                  />
                </div>
                <div className="mt-6">
                  <Button
                    type="button"
                    onClick={() => {
                      setActiveSlug(null);
                      openLead({
                        path: "walkthrough",
                        offeringSlug: active.slug,
                        sourceScene: `${mode}-sidecar`,
                      });
                    }}
                  >
                    Book a walkthrough of this specifically
                  </Button>
                </div>
              </>
            ) : null}
            <Dialog.Close asChild>
              <button
                type="button"
                className="absolute right-4 top-4 text-sm text-text-muted"
              >
                Close
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
