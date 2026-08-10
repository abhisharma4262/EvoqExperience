"use client";

import { home } from "@/content/home";
import { sectionAnchors } from "@/content/acts";
import { ShiftAccelerationGlass } from "@/components/visuals/ShiftAccelerationGlass";
import { Reveal } from "@/components/film/Reveal";

export function SectionIndustry() {
  const s = home.industry;

  return (
    <section
      id={sectionAnchors.industry}
      className="relative min-h-[88svh] overflow-hidden bg-bg"
    >
      <ShiftAccelerationGlass />
      <div className="film-container relative z-[1] flex min-h-[88svh] flex-col justify-center py-24">
        <Reveal>
          <h1 className="display max-w-4xl text-[clamp(2.5rem,6vw,4.75rem)] text-text-primary">
            {s.title}
          </h1>
        </Reveal>
        <Reveal delayMs={90}>
          <p className="mt-8 max-w-2xl text-lg text-text-secondary md:text-xl">
            What technology makes possible is expanding faster than organizations
            can make it real. Closing that distance is the{" "}
            <span className="word-mark">new frontier</span>.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
