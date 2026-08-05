import { home } from "@/content/home";
import { sectionAnchors } from "@/content/acts";
import { CoordinationMesh } from "@/components/visuals/CoordinationMesh";
import { metrics } from "@/content/metrics";
import { CountUp } from "@/components/film/CountUp";

export function SectionEvoq() {
  const s = home.evoq;
  const spotlight = metrics.filter((m) =>
    ["transformation", "roi", "ttm"].includes(m.id),
  );

  return (
    <section
      id={sectionAnchors.evoq}
      className="band-light film-section"
    >
      <div className="film-container space-y-14">
        <div className="max-w-3xl">
          <p
            className="liquid-glass-chip text-accent-alt"
            style={{
              backdropFilter: "blur(12px) saturate(140%)",
              WebkitBackdropFilter: "blur(12px) saturate(140%)",
            }}
          >
            {s.eyebrow}
          </p>
          <h2 className="display mt-5 text-[clamp(2rem,4.5vw,3.5rem)]">
            {s.title}
          </h2>
          <p className="mt-6 text-lg text-text-secondary md:text-xl">
            {s.body}
          </p>
        </div>

        <CoordinationMesh />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {s.pillars.map((pillar) => (
            <div
              key={pillar.name}
              className="border-t border-accent-alt/20 pt-4"
            >
              <p className="display text-lg">{pillar.name}</p>
              <p className="mt-2 text-sm text-text-muted">{pillar.line}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-8 border-t border-accent-alt/15 pt-10 md:flex-row md:items-start md:justify-between md:gap-10">
          {spotlight.map((metric) => (
            <div key={metric.id} className="shrink-0">
              <p className="display text-5xl text-accent-alt md:text-[3.25rem]">
                {metric.numericValue ? (
                  <CountUp
                    value={metric.numericValue}
                    suffix={metric.suffix ?? ""}
                  />
                ) : (
                  metric.value
                )}
              </p>
              <p className="mt-3 whitespace-nowrap text-[0.95rem] text-text-secondary md:text-[1.05rem]">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
