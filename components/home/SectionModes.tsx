"use client";

import { useState } from "react";
import Link from "next/link";
import { home } from "@/content/home";
import { orbits } from "@/content/orbits";
import { sectionAnchors } from "@/content/acts";
import { Button } from "@/components/ui/Button";
import { ModePreview } from "@/components/visuals/ModePreview";
import { cn } from "@/lib/cn";
import type { ModeId } from "@/content/offerings";

export function SectionModes() {
  const s = home.modes;
  const [active, setActive] = useState<ModeId>("create");
  const orbit = orbits.find((o) => o.mode === active)!;

  return (
    <section
      id={sectionAnchors.modes}
      className="band-light film-section"
    >
      <div className="film-container space-y-12">
        <div className="max-w-3xl">
          <p
            className="liquid-glass-chip"
            style={{
              backdropFilter: "blur(12px) saturate(140%)",
              WebkitBackdropFilter: "blur(12px) saturate(140%)",
            }}
          >
            {s.eyebrow}
          </p>
          <h2 className="display mt-5 text-[clamp(2rem,4vw,3.25rem)]">
            {s.title}
          </h2>
          <p className="mt-5 text-lg text-text-secondary">{s.intro}</p>
        </div>

        <div
          className="flex flex-wrap gap-2 border-b border-accent-alt/15 pb-4"
          role="tablist"
          aria-label="EVOQ modes"
        >
          {orbits.map((item) => {
            const selected = item.mode === active;
            return (
              <button
                key={item.mode}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(item.mode)}
                className={cn(
                  "rounded-full px-5 py-2.5 text-sm transition-all",
                  selected
                    ? "bg-dark-bg text-on-dark shadow-[0_8px_24px_rgba(12,34,38,0.18)]"
                    : "border border-white/50 bg-white/35 text-text-secondary shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-md hover:text-text-primary",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="space-y-6">
            <p className="text-sm font-medium text-accent-alt">{orbit.line}</p>
            <h3 className="display text-[clamp(1.75rem,3vw,2.5rem)]">
              {orbit.question}
            </h3>
            {orbit.scenario.lines.map((line) => (
              <p key={line} className="text-lg text-text-secondary">
                {line}
              </p>
            ))}
            <Button asChild size="lg">
              <Link href={orbit.href} scroll={false}>
                {orbit.doorway}
              </Link>
            </Button>
          </div>
          <ModePreview mode={active} />
        </div>
      </div>
    </section>
  );
}
