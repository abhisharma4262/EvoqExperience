"use client";

import { home } from "@/content/home";
import { sectionAnchors } from "@/content/acts";
import { ExecutionContinuumFilm } from "@/components/visuals/ExecutionContinuumFilm";
import { Reveal } from "@/components/film/Reveal";

export function SectionWork() {
  const s = home.work;

  return (
    <section
      id={sectionAnchors.work}
      className="band-light film-section overflow-visible"
    >
      <div className="film-container grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
        <div>
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
            <h2 className="display mt-6 max-w-xl text-[clamp(2rem,4vw,3.25rem)]">
              {s.title}
            </h2>
          </Reveal>
          <Reveal delayMs={140}>
            <p className="mt-6 text-lg text-text-secondary md:text-xl">{s.body}</p>
          </Reveal>
        </div>
        <Reveal delayMs={120}>
          <ExecutionContinuumFilm />
        </Reveal>
      </div>
    </section>
  );
}
