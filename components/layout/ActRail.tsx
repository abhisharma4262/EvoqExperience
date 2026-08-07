"use client";

import { acts } from "@/content/acts";
import { useFilm } from "@/lib/film/FilmProvider";
import { cn } from "@/lib/cn";

export function ActRail() {
  const { activeAct, scrollToAct } = useFilm();

  return (
    <>
      <nav
        aria-label="Story progress"
        className="pointer-events-none fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 md:block"
      >
        <ol className="pointer-events-auto flex flex-col items-end gap-4">
          {acts.map((act) => {
            const current = act.id === activeAct;
            return (
              <li key={act.id}>
                <button
                  type="button"
                  onClick={() => scrollToAct(act.id)}
                  aria-current={current ? "step" : undefined}
                  aria-label={act.label}
                  className="group flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span
                    className={cn(
                      "text-[0.65rem] uppercase tracking-[0.14em] transition-colors duration-[240ms]",
                      current
                        ? "text-text-primary"
                        : "text-text-muted/0 group-hover:text-text-muted",
                    )}
                  >
                    {act.shortLabel}
                  </span>
                  <span
                    className={cn(
                      "block w-0.5 rounded-full transition-all duration-[240ms]",
                      current
                        ? "h-6 bg-accent"
                        : "h-3 bg-accent-alt/35 group-hover:bg-accent/70",
                    )}
                  />
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <nav
        aria-label="Story progress mobile"
        className="fixed inset-x-0 top-0 z-30 flex justify-center gap-2 pt-3 md:hidden"
      >
        {acts.map((act) => {
          const current = act.id === activeAct;
          return (
            <button
              key={act.id}
              type="button"
              onClick={() => scrollToAct(act.id)}
              aria-current={current ? "step" : undefined}
              aria-label={act.label}
              className={cn(
                "h-2 w-2 rounded-full transition-colors duration-[240ms]",
                current ? "bg-accent" : "bg-accent-alt/30",
              )}
            />
          );
        })}
      </nav>
    </>
  );
}
