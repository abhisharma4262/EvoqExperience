import { home } from "@/content/home";
import { sectionAnchors } from "@/content/acts";
import { ShiftAccelerationGlass } from "@/components/visuals/ShiftAccelerationGlass";

export function SectionIndustry() {
  const s = home.industry;

  return (
    <section
      id={sectionAnchors.industry}
      className="relative min-h-[88svh] overflow-hidden bg-bg"
    >
      <ShiftAccelerationGlass />
      <div className="film-container relative z-[1] flex min-h-[88svh] flex-col justify-center py-24">
        <p
          className="liquid-glass-chip"
          style={{
            backdropFilter: "blur(12px) saturate(140%)",
            WebkitBackdropFilter: "blur(12px) saturate(140%)",
          }}
        >
          {s.eyebrow}
        </p>
        <h1 className="display mt-7 max-w-4xl text-[clamp(2.5rem,6vw,4.75rem)] text-text-primary">
          {s.title}
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-text-secondary md:text-xl">
          The speed of AI innovation is{" "}
          <span className="word-mark">accelerating</span>. It has changed how
          enterprises <span className="word-mark">operate</span>. The work is
          increasingly performed by <span className="word-mark">people</span>,{" "}
          <span className="word-mark">software</span>, and{" "}
          <span className="word-mark">agents</span>, working together.
        </p>
      </div>
    </section>
  );
}
