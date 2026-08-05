import Link from "next/link";
import { home } from "@/content/home";
import { sectionAnchors } from "@/content/acts";

export function SectionCompounding() {
  const s = home.compounding;

  return (
    <section
      id={sectionAnchors.compounding}
      className="band-dark film-section"
    >
      <div className="film-container grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-accent-on-dark">
            {s.eyebrow}
          </p>
          <h2 className="display mt-5 text-[clamp(2rem,4vw,3.25rem)] text-on-dark">
            {s.title}
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-on-dark/75">{s.body}</p>
          <Link
            href="/#section-stories"
            className="mt-8 inline-block text-sm text-on-dark/70 link-sweep"
          >
            See client stories
          </Link>
        </div>
        <div className="space-y-4">
          {[
            "More engagements",
            "More patterns",
            "More reuse",
            "Faster outcomes",
          ].map((step, index) => (
            <div
              key={step}
              className="rounded-2xl border border-on-dark/15 bg-on-dark/5 px-5 py-4"
              style={{ opacity: 1 - index * 0.08 }}
            >
              <p className="font-mono text-xs text-accent-on-dark">
                0{index + 1}
              </p>
              <p className="mt-1 display text-xl text-on-dark">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
