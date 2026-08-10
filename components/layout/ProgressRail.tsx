"use client";

import { useEffect, useState } from "react";
import { acts } from "@/content/acts";
import { useFilm } from "@/lib/film/FilmProvider";
import { cn } from "@/lib/cn";

export function ProgressRail() {
  const { activeAct, scrollToAct } = useFilm();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <nav
        aria-label="Page progress"
        className="pointer-events-none fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 md:block"
      >
        <div
          className="pointer-events-auto relative h-[min(36vh,240px)] w-3"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          aria-label={`${Math.round(progress * 100)} percent through the page`}
        >
          <span
            className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-text-muted/15"
            aria-hidden
          />

          <span
            className="absolute left-1/2 z-10 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-text-muted/40"
            style={{ top: `${progress * 100}%` }}
            aria-hidden
          />

          <ol className="absolute inset-0 z-20">
            {acts.map((act, index) => {
              const current = act.id === activeAct;
              const top =
                acts.length === 1 ? 0 : (index / (acts.length - 1)) * 100;

              return (
                <li
                  key={act.id}
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ top: `${top}%` }}
                >
                  <button
                    type="button"
                    onClick={() => scrollToAct(act.id)}
                    aria-current={current ? "step" : undefined}
                    aria-label={act.label}
                    className={cn(
                      "block rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                      current
                        ? "h-1.5 w-1.5 bg-text-muted/55"
                        : "h-1 w-1 bg-text-muted/25 hover:bg-text-muted/45",
                    )}
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </nav>

      <nav
        aria-label="Page progress mobile"
        className="pointer-events-none fixed inset-x-0 top-0 z-30 flex justify-center pt-3 md:hidden"
      >
        <ol className="pointer-events-auto flex items-center gap-2">
          {acts.map((act) => {
            const current = act.id === activeAct;
            return (
              <li key={act.id}>
                <button
                  type="button"
                  onClick={() => scrollToAct(act.id)}
                  aria-current={current ? "step" : undefined}
                  aria-label={act.label}
                  className={cn(
                    "block h-1 w-1 rounded-full transition-colors duration-200",
                    current ? "bg-text-muted/50" : "bg-text-muted/20",
                  )}
                />
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
