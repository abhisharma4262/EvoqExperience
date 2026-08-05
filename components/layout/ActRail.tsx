"use client";

import { acts } from "@/content/acts";
import { useFilm } from "@/lib/film/FilmProvider";
import { cn } from "@/lib/cn";

export function ActRail() {
  const { activeAct, scrollToAct } = useFilm();

  return (
    <>
      <nav
        aria-label="Act progress"
        className="pointer-events-none fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 md:block"
      >
        <ol className="pointer-events-auto flex flex-col items-center gap-3">
          {acts.map((act) => {
            const current = act.id === activeAct;
            return (
              <li key={act.id}>
                <button
                  type="button"
                  onClick={() => scrollToAct(act.id)}
                  aria-current={current ? "step" : undefined}
                  aria-label={act.label}
                  className="group rounded-full p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
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
        aria-label="Act progress mobile"
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
