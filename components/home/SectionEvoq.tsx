"use client";

import { home } from "@/content/home";
import { sectionAnchors } from "@/content/acts";
import { ExecutableKnowledgeFilm } from "@/components/visuals/ExecutableKnowledgeFilm";
import { Reveal } from "@/components/film/Reveal";

export function SectionEvoq() {
  const s = home.evoq;

  return (
    <section id={sectionAnchors.evoq} className="overflow-x-clip">
      {/* Need beat — dark band before the Evoq product intro */}
      <div className="band-dark film-section">
        <div className="film-container">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.18em] text-accent-on-dark">
              {s.eyebrow}
            </p>
          </Reveal>
          <div className="mt-10 grid items-stretch gap-8 lg:grid-cols-[minmax(0,1.2fr)_auto_minmax(0,0.9fr)] lg:gap-0">
            <Reveal delayMs={90} className="lg:pr-12 xl:pr-16">
              <h2 className="display text-[clamp(1.85rem,3.8vw,3.1rem)] text-on-dark">
                {s.needTitle}
              </h2>
            </Reveal>
            <div
              className="hidden w-px self-stretch bg-on-dark/25 lg:block"
              aria-hidden
            />
            <Reveal
              delayMs={160}
              className="border-t border-on-dark/25 pt-8 lg:border-t-0 lg:pl-12 lg:pt-0 xl:pl-16"
            >
              <p className="flex h-full items-center text-xl text-on-dark/75 md:text-2xl">
                {s.needBody}
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Product claim + diagram — diagram bleeds past the content column toward the right */}
      <div className="band-light film-section">
        <div className="film-container">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(16rem,22rem)_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[minmax(18rem,26rem)_minmax(0,1fr)]">
            <div className="max-w-md">
              <Reveal>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-alt">
                  {s.category}
                </p>
              </Reveal>
              <Reveal delayMs={80}>
                <h3 className="display mt-4 text-[clamp(1.85rem,3.8vw,3.1rem)]">
                  {s.title}
                </h3>
              </Reveal>
              <Reveal delayMs={150}>
                <p className="mt-6 text-lg text-text-secondary md:text-xl">
                  {s.body}
                </p>
              </Reveal>
            </div>

            <Reveal
              delayMs={120}
              className="min-w-0 lg:-mr-[max(0px,calc((100vw-var(--max-content))/2))] lg:pr-6"
            >
              <ExecutableKnowledgeFilm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
