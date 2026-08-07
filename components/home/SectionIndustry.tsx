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
            That&apos;s only part of the story. The bigger shift isn&apos;t better
            software. It&apos;s how{" "}
            <span className="word-mark">work</span> runs across the{" "}
            <span className="word-mark">enterprise</span>.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
