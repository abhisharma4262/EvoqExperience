"use client";

import { useState } from "react";
import { home } from "@/content/home";
import { orbits } from "@/content/orbits";
import { sectionAnchors } from "@/content/acts";
import {
  caseStudies,
  getCaseStudiesByMode,
} from "@/content/caseStudies";
import { CaseStoryTile } from "@/components/home/CaseStoryTile";
import { Reveal } from "@/components/film/Reveal";
import { cn } from "@/lib/cn";
import type { ModeId } from "@/content/offerings";

type TabId = ModeId | "all";

const tabs: { id: TabId; label: string }[] = [
  { id: "all", label: "All" },
  ...orbits.map((orbit) => ({ id: orbit.mode as TabId, label: orbit.label })),
];

export function SectionStories() {
  const s = home.stories;
  const [active, setActive] = useState<TabId>("all");

  const stories =
    active === "all" ? caseStudies : getCaseStudiesByMode(active);

  return (
    <section id={sectionAnchors.stories} className="band-light film-section">
      <div className="film-container space-y-12">
        <div className="max-w-3xl">
          <Reveal>
            <p
              className="liquid-glass-chip"
              style={{
                backdropFilter: "blur(12px) saturate(140%)",
                WebkitBackdropFilter: "blur(12px) saturate(140%)",
              }}
            >
              {s.eyebrow}
            </p>
          </Reveal>
          <Reveal delayMs={80}>
            <h2 className="display mt-5 text-[clamp(2rem,4vw,3.25rem)]">
              {s.title}
            </h2>
          </Reveal>
        </div>

        <Reveal delayMs={200}>
          <div
            className="flex flex-wrap gap-2 border-b border-accent-alt/15 pb-4"
            role="tablist"
            aria-label="Client stories by mode"
          >
            {tabs.map((tab) => {
              const selected = tab.id === active;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(tab.id)}
                  className={cn(
                    "rounded-full px-5 py-2.5 text-sm transition-all",
                    selected
                      ? "bg-dark-bg text-on-dark shadow-[0_8px_24px_rgba(12,34,38,0.18)]"
                      : "border border-white/50 bg-white/35 text-text-secondary shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-md hover:text-text-primary",
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div
          role="tabpanel"
          key={active}
          className={cn(
            "grid gap-5",
            active === "all"
              ? "md:grid-cols-2 xl:grid-cols-3"
              : "md:grid-cols-3",
          )}
        >
          {stories.map((story, index) => (
            <CaseStoryTile key={story.id} story={story} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
