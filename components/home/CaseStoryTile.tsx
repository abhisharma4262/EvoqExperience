"use client";

import { useEffect, useRef, useState } from "react";
import type { CaseStory } from "@/content/caseStudies";
import { StoryIcon } from "@/components/home/StoryIcon";
import { StoryDiagram } from "@/components/home/storyDiagrams";
import { CountUp } from "@/components/film/CountUp";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

function ClientMark({
  client,
  logoSrc,
}: {
  client: string;
  logoSrc?: string;
}) {
  const initials = client
    .split(/\s+/)
    .filter((w) => /^[A-Za-z0-9]/.test(w))
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  if (logoSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logoSrc}
        alt=""
        className="h-8 w-auto max-w-[7.5rem] object-contain opacity-80"
      />
    );
  }

  return (
    <span
      className="story-client-mark inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-accent-alt/20 bg-white/50 px-2.5 font-mono text-[0.7rem] tracking-wide text-accent-alt"
      aria-hidden
    >
      {initials || "EV"}
    </span>
  );
}

export function CaseStoryTile({
  story,
  index = 0,
}: {
  story: CaseStory;
  index?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setVisible(true);
      setPlaying(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          setPlaying(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={cn(
        "story-tile group flex h-full flex-col gap-4 rounded-[1.35rem] border border-accent-alt/15 bg-gradient-to-br from-white/70 via-white/45 to-accent/5 p-5 shadow-[0_10px_36px_rgba(12,34,38,0.05)] backdrop-blur-md md:gap-5 md:p-6",
        visible ? "is-visible" : "",
      )}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <ClientMark client={story.client} logoSrc={story.logoSrc} />
          <p className="mt-2 text-xs text-text-muted">{story.client}</p>
        </div>
        <span
          className="story-tile-icon inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent-alt/15 bg-white/60 text-accent-alt"
          aria-hidden
        >
          <StoryIcon icon={story.icon} />
        </span>
      </header>

      <div>
        <h3 className="story-title display text-[1.35rem] font-medium leading-snug text-text-primary md:text-[1.45rem]">
          {story.title}
        </h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-text-secondary">
          <span className="font-medium text-text-primary">What we did. </span>
          {story.did}
        </p>
      </div>

      <div className="border-t border-accent-alt/10 pt-4">
        <p className="story-outcome display text-[clamp(2.1rem,3.5vw,2.75rem)] leading-none tracking-tight">
          {story.outcomeNumeric != null ? (
            <CountUp
              value={story.outcomeNumeric}
              suffix={story.outcomeSuffix ?? ""}
            />
          ) : (
            <strong className="font-semibold">{story.outcomeValue}</strong>
          )}
        </p>
        <p className="mt-2 text-sm font-medium text-text-secondary">
          {story.outcomeLabel}
        </p>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-text-secondary">
          <span className="font-medium text-text-primary">What changed. </span>
          {story.result}
        </p>
      </div>

      <StoryDiagram storyId={story.id} playing={playing} />
    </article>
  );
}
