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
      <div className="film-container">
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col justify-between gap-8 border-t border-accent-alt/20 pt-8">
              <div>
                <h2 className="display text-2xl">{s.walkthrough.title}</h2>
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
          <Reveal delayMs={80}>
            <div className="flex h-full flex-col justify-between gap-8 border-t border-accent-alt/20 pt-8">
              <div>
                <h2 className="display text-2xl">{s.deepDive.title}</h2>
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
