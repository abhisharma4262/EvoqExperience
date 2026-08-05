"use client";

import Link from "next/link";
import { getCaseStudiesByMode } from "@/content/caseStudies";
import { CaseStoryTile } from "@/components/home/CaseStoryTile";
import type { ModeId } from "@/content/offerings";

export function RoomStoriesStrip({ mode }: { mode: ModeId }) {
  const stories = getCaseStudiesByMode(mode);

  return (
    <section className="space-y-6 border-t border-accent-alt/15 pt-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-text-muted">
            Client stories
          </p>
          <h2 className="display mt-2 text-[clamp(1.5rem,2.5vw,2rem)]">
            Related work in{" "}
            {mode === "create"
              ? "Create"
              : mode === "transform"
                ? "Transform"
                : "Operate"}
          </h2>
        </div>
        <Link
          href="/#section-stories"
          className="text-sm text-text-secondary link-sweep"
        >
          See all client stories
        </Link>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {stories.map((story, index) => (
          <CaseStoryTile key={story.id} story={story} index={index} />
        ))}
      </div>
    </section>
  );
}
