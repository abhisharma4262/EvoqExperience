import { home } from "@/content/home";
import { sectionAnchors } from "@/content/acts";
import { ScatteredToolsField } from "@/components/visuals/ScatteredToolsField";

export function SectionChallenge() {
  const s = home.challenge;

  return (
    <section
      id={sectionAnchors.challenge}
      className="band-transition film-section overflow-visible"
    >
      <div className="film-container grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12">
        <div>
          <p
            className="liquid-glass-chip"
            style={{
              backdropFilter: "blur(12px) saturate(140%)",
              WebkitBackdropFilter: "blur(12px) saturate(140%)",
            }}
          >
            {s.eyebrow}
          </p>
          <h2 className="display mt-6 max-w-xl text-[clamp(2rem,4vw,3.25rem)] [text-shadow:0_1px_0_rgba(255,255,255,0.3)]">
            {s.title}
          </h2>
          <ul className="mt-8 space-y-3">
            {s.points.map((point) => (
              <li
                key={point}
                className="border-l-2 border-accent/40 pl-4 text-base text-text-secondary md:text-lg"
              >
                {point}
              </li>
            ))}
          </ul>
          <p className="display mt-8 max-w-md text-xl text-text-primary md:text-2xl">
            {s.close}
          </p>
        </div>

        <div className="relative min-h-[22rem] w-full overflow-visible sm:min-h-[26rem] lg:min-h-[32rem]">
          <ScatteredToolsField />
        </div>
      </div>
    </section>
  );
}
