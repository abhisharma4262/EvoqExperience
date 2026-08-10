"use client";

import { useState, type MouseEvent } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import {
  getCategoriesWithArchetypes,
  modeArchetypeIntros,
  type Archetype,
} from "@/content/archetypes";
import type { ModeId } from "@/content/offerings";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/film/Reveal";
import { useLeadModal } from "@/components/rooms/LeadModalProvider";
import { cn } from "@/lib/cn";

function ComponentChips({
  items,
  tone,
}: {
  items: string[];
  tone: "live" | "roadmap";
}) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            "rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-wide",
            tone === "live"
              ? "border-accent-on-dark/25 bg-accent-on-dark/10 text-accent-on-dark"
              : "border-accent-alt/20 bg-accent/5 text-accent-alt",
          )}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function ArchetypeTile({
  archetype,
  mode,
  onExplore,
  index,
}: {
  archetype: Archetype;
  mode: ModeId;
  onExplore: (archetype: Archetype) => void;
  index: number;
}) {
  const { openLead } = useLeadModal();
  const isLive = archetype.status === "live";

  function handleLead(event: MouseEvent) {
    event.stopPropagation();
    openLead({
      path: "walkthrough",
      offeringSlug: archetype.id,
      sourceScene: `${mode}-archetype`,
    });
  }

  return (
    <Reveal delayMs={Math.min(index * 60, 240)} className="h-full">
      <article
        className={cn(
          "archetype-tile group relative flex h-full min-h-[22.5rem] flex-col overflow-hidden rounded-[1.35rem] p-6",
          "transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-out-expo)]",
          "focus-within:outline-none focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2",
          isLive
            ? "archetype-tile--live bg-dark-bg text-on-dark hover:-translate-y-0.5 hover:shadow-[0_20px_48px_rgba(12,34,38,0.28)]"
            : "archetype-tile--roadmap border border-accent-alt/18 bg-surface hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-[0_16px_40px_rgba(12,34,38,0.08)]",
        )}
      >
        {isLive ? (
          <>
            <div className="archetype-tile__glow" aria-hidden />
            <div className="archetype-tile__grid" aria-hidden />
          </>
        ) : (
          <div className="archetype-tile__roadmap-wash" aria-hidden />
        )}

        <div className="relative flex flex-1 flex-col">
          <div className="flex items-start justify-between gap-3">
            <p
              className={cn(
                "text-[10px] uppercase tracking-[0.18em]",
                isLive ? "text-accent-on-dark" : "text-accent",
              )}
            >
              {isLive ? "Available now" : "On the roadmap"}
            </p>
            <button
              type="button"
              onClick={() => onExplore(archetype)}
              className={cn(
                "shrink-0 text-sm transition-colors",
                isLive
                  ? "text-on-dark/45 hover:text-accent-on-dark"
                  : "text-text-muted hover:text-accent",
              )}
              aria-label={`Explore ${archetype.name}`}
            >
              →
            </button>
          </div>

          <h3
            className={cn(
              "display mt-3 text-[1.2rem] leading-snug md:text-[1.3rem]",
              isLive ? "text-on-dark" : "text-text-primary",
            )}
          >
            {archetype.name}
          </h3>

          <p
            className={cn(
              "mt-3 flex-1 text-sm leading-relaxed",
              isLive ? "text-on-dark/70" : "text-text-secondary",
            )}
          >
            {archetype.problem}
          </p>

          <p
            className={cn(
              "mt-4 text-sm font-medium",
              isLive ? "text-accent-on-dark" : "text-text-primary",
            )}
          >
            {archetype.outcome}
          </p>

          <div
            className={cn(
              "mt-4 border-t pt-4",
              isLive ? "border-on-dark/10" : "border-accent-alt/12",
            )}
          >
            <ComponentChips
              items={archetype.components}
              tone={isLive ? "live" : "roadmap"}
            />
          </div>

          <div className="mt-5">
            {isLive ? (
              archetype.href ? (
                <Button asChild variant="onDark" size="sm" className="w-full">
                  <Link href={archetype.href}>
                    {archetype.ctaLabel ?? "Explore"} →
                  </Link>
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="onDark"
                  size="sm"
                  className="w-full"
                  onClick={handleLead}
                >
                  {archetype.ctaLabel ?? "Explore"} →
                </Button>
              )
            ) : (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={handleLead}
              >
                Reserve a conversation →
              </Button>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function ModeArchetypeCatalog({ mode }: { mode: ModeId }) {
  const categories = getCategoriesWithArchetypes(mode);
  const { openLead } = useLeadModal();
  const [active, setActive] = useState<Archetype | null>(null);
  const title =
    mode === "create" ? "Create" : mode === "transform" ? "Transform" : "Operate";

  return (
    <section
      aria-label={`${title} archetypes`}
      className="archetype-catalog space-y-12"
    >
      <h2 className="display max-w-3xl text-[clamp(1.75rem,3.2vw,2.35rem)] text-text-primary">
        {modeArchetypeIntros[mode]}
      </h2>

      <div className="space-y-14">
        {categories.map((category, categoryIndex) => (
          <div key={category.id} className="space-y-5">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-accent-alt/12 pb-4">
              <div>
                <p className="font-mono text-[11px] tracking-[0.14em] text-accent">
                  {String(categoryIndex + 1).padStart(2, "0")}
                </p>
                <h3 className="display mt-1 text-xl text-text-primary md:text-2xl">
                  {category.label}
                </h3>
              </div>
              <p className="max-w-md text-sm text-text-muted">{category.line}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {category.items.map((archetype, index) => (
                <ArchetypeTile
                  key={archetype.id}
                  archetype={archetype}
                  mode={mode}
                  index={index}
                  onExplore={setActive}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <Dialog.Root
        open={Boolean(active)}
        onOpenChange={(open) => !open && setActive(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-dark-bg/45 backdrop-blur-[2px]" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(92vw,34rem)] -translate-x-1/2 -translate-y-1/2 rounded-[1.75rem] border border-accent-alt/10 bg-surface p-8 shadow-[0_24px_80px_rgba(12,34,38,0.18)] focus:outline-none">
            {active ? (
              <>
                <p className="text-[11px] uppercase tracking-[0.16em] text-text-muted">
                  {active.status === "live"
                    ? "Available now"
                    : "On the roadmap"}
                </p>
                <Dialog.Title className="display mt-2 text-2xl">
                  {active.name}
                </Dialog.Title>
                <Dialog.Description className="mt-4 text-text-secondary">
                  {active.problem}
                </Dialog.Description>
                <p className="mt-5 text-sm font-medium text-text-primary">
                  {active.outcome}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                  {active.composition}
                </p>
                <div className="mt-5 border-t border-accent-alt/10 pt-4">
                  <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-text-muted">
                    Blocks in play
                  </p>
                  <ComponentChips items={active.components} tone="roadmap" />
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  {active.status === "live" && active.href ? (
                    <Button asChild>
                      <Link href={active.href}>
                        {active.ctaLabel ?? "Explore"} →
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={() => {
                        const slug = active.id;
                        setActive(null);
                        openLead({
                          path: "walkthrough",
                          offeringSlug: slug,
                          sourceScene: `${mode}-archetype`,
                        });
                      }}
                    >
                      {active.status === "live"
                        ? `${active.ctaLabel ?? "Explore"} →`
                        : "Reserve a conversation →"}
                    </Button>
                  )}
                </div>
              </>
            ) : null}
            <Dialog.Close asChild>
              <button
                type="button"
                className="absolute right-4 top-4 text-sm text-text-muted transition-colors hover:text-text-primary"
              >
                Close
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
