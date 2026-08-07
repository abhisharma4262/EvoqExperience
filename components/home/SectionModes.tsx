"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { home } from "@/content/home";
import { orbits } from "@/content/orbits";
import { sectionAnchors } from "@/content/acts";
import {
  ModesEngineFilm,
  type ModesFilmMode,
} from "@/components/visuals/ModesEngineFilm";
import { Reveal } from "@/components/film/Reveal";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

const CYCLE: ModesFilmMode[] = ["create", "transform", "operate"];

export function SectionModes() {
  const s = home.modes;
  const [active, setActive] = useState<ModesFilmMode>("create");
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (manual || prefersReducedMotion()) return;
    const id = window.setInterval(() => {
      setActive((prev) => {
        const i = CYCLE.indexOf(prev);
        return CYCLE[(i + 1) % CYCLE.length] ?? "create";
      });
    }, 4200);
    return () => window.clearInterval(id);
  }, [manual]);

  function previewMode(mode: ModesFilmMode) {
    setManual(true);
    setActive(mode);
  }

  return (
    <section
      id={sectionAnchors.modes}
      className="band-light film-section overflow-x-clip"
    >
      <div className="film-container">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-12 xl:gap-16">
          <div className="max-w-xl">
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
            <Reveal delayMs={140}>
              <p className="mt-5 text-lg text-text-secondary md:text-xl">
                {s.intro}
              </p>
            </Reveal>

            <Reveal delayMs={200}>
              <nav
                className="mt-10 flex flex-wrap gap-2.5"
                aria-label="Execution entry points"
              >
                {orbits.map((item) => {
                  const selected = item.mode === active;
                  return (
                    <Link
                      key={item.mode}
                      href={item.href}
                      scroll={false}
                      className={cn(
                        "rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
                        selected
                          ? "bg-dark-bg text-white"
                          : "bg-white/70 text-text-secondary ring-1 ring-accent-alt/15 hover:text-text-primary",
                      )}
                      onMouseEnter={() => previewMode(item.mode)}
                      onFocus={() => previewMode(item.mode)}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </Reveal>
          </div>

          <Reveal delayMs={120} className="min-w-0">
            <ModesEngineFilm activeMode={active} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
