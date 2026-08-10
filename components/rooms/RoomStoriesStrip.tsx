"use client";

import { getCaseStudiesByMode } from "@/content/caseStudies";
import { CaseStoryTile } from "@/components/home/CaseStoryTile";
import type { ModeId } from "@/content/offerings";

export function RoomStoriesStrip({ mode }: { mode: ModeId }) {
  const stories = getCaseStudiesByMode(mode);

  return (
    <section className="room-stories room-stories--create space-y-8 pt-4">
      <div className="room-stories__break" aria-hidden>
        <span className="room-stories__break-line" />
        <span className="room-stories__break-mark">Client stories</span>
        <span className="room-stories__break-line" />
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {stories.map((story, index) => (
          <CaseStoryTile key={story.id} story={story} index={index} />
        ))}
      </div>
    </section>
  );
}
