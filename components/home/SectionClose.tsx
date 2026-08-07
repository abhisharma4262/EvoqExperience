"use client";

import Link from "next/link";
import { home } from "@/content/home";
import { sectionAnchors } from "@/content/acts";
import { Button } from "@/components/ui/Button";
import { useLeadModal } from "@/components/rooms/LeadModalProvider";
import { Reveal } from "@/components/film/Reveal";

export function SectionClose() {
  const s = home.close;
  const { openLead } = useLeadModal();

  return (
    <section id={sectionAnchors.close} className="band-light film-section">
      <div className="film-container space-y-12">
        <div className="max-w-3xl">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.18em] text-text-secondary">
              {s.eyebrow}
            </p>
          </Reveal>
          <Reveal delayMs={80}>
            <h2 className="display mt-5 text-[clamp(2rem,4vw,3.25rem)]">
              {s.title}
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          <Reveal delayMs={120}>
            <div className="flex h-full flex-col justify-between gap-8 border-t border-accent-alt/20 pt-8">
              <div>
                <h3 className="display text-2xl">{s.walkthrough.title}</h3>
                <p className="mt-3 text-text-secondary">{s.walkthrough.body}</p>
              </div>
              <Button
                type="button"
                onClick={() =>
                  openLead({ path: "walkthrough", sourceScene: "close" })
                }
              >
                {s.walkthrough.cta}
              </Button>
            </div>
          </Reveal>
          <Reveal delayMs={200}>
            <div className="flex h-full flex-col justify-between gap-8 border-t border-accent-alt/20 pt-8">
              <div>
                <h3 className="display text-2xl">{s.deepDive.title}</h3>
                <p className="mt-3 text-text-secondary">{s.deepDive.body}</p>
              </div>
              <Button asChild variant="secondary">
                <Link href="/runtime">{s.deepDive.cta}</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
