"use client";

import { Player } from "@remotion/player";
import Link from "next/link";
import { useMemo, useState, type FC } from "react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Reveal } from "@/components/film/Reveal";
import { useLeadModal } from "@/components/rooms/LeadModalProvider";
import { Button } from "@/components/ui/Button";
import { videosPage } from "@/content/videos";
import { CreateLaunch } from "@/remotion/compositions/CreateLaunch";
import { HomeFilm } from "@/remotion/compositions/HomeFilm";
import { OperateLaunch } from "@/remotion/compositions/OperateLaunch";
import { TransformLaunch } from "@/remotion/compositions/TransformLaunch";
import {
  COMPOSITION_IDS,
  COMPOSITION_META,
  type CompositionId,
} from "@/remotion/lib/timing";
import { cn } from "@/lib/cn";

const COMPONENTS: Record<CompositionId, FC> = {
  HomeFilm,
  CreateLaunch,
  TransformLaunch,
  OperateLaunch,
};

export function LaunchPlayer() {
  const [selected, setSelected] = useState<CompositionId>("HomeFilm");
  const { openLead } = useLeadModal();
  const meta = COMPOSITION_META[selected];
  const film = videosPage.films[selected];
  const Component = useMemo(() => COMPONENTS[selected], [selected]);

  return (
    <div className="videos-page__shell relative overflow-hidden">
      <div className="videos-page__glow videos-page__glow--a" aria-hidden />
      <div className="videos-page__glow videos-page__glow--b" aria-hidden />
      <div className="videos-page__grain" aria-hidden />

      <div className="film-container relative z-10 flex items-center justify-between gap-4 pt-8">
        <BrandLogo href="/" surface="dark" compact priority />
        <Button
          type="button"
          size="sm"
          variant="onDark"
          onClick={() =>
            openLead({ path: "walkthrough", sourceScene: "videos-page" })
          }
        >
          {videosPage.cta}
        </Button>
      </div>

      <header className="film-container relative z-10 pb-10 pt-16 md:pb-14 md:pt-24">
        <Reveal>
          <h1 className="display text-[clamp(2.75rem,7vw,5.5rem)] text-on-dark">
            {videosPage.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-on-dark/70 md:text-xl">
            {videosPage.description}
          </p>
          <p className="mt-3 text-sm text-on-dark/45">{videosPage.soundHint}</p>
        </Reveal>
      </header>

      <div className="film-container relative z-10">
        <Reveal delayMs={80}>
          <nav
            className="videos-page__tabs"
            aria-label="Select a film"
          >
            {COMPOSITION_IDS.map((id) => {
              const active = id === selected;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSelected(id)}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "videos-page__tab",
                    active && "videos-page__tab--active",
                  )}
                >
                  {videosPage.films[id].label}
                </button>
              );
            })}
          </nav>
        </Reveal>
      </div>

      <Reveal delayMs={120} className="relative z-10 mt-8 md:mt-10">
        <div className="videos-page__theater">
          <div className="videos-page__stage">
            <Player
              key={selected}
              component={Component}
              durationInFrames={meta.durationInFrames}
              compositionWidth={meta.width}
              compositionHeight={meta.height}
              fps={meta.fps}
              style={{ width: "100%", aspectRatio: "16 / 9" }}
              controls
              autoPlay={false}
              loop
              initiallyMuted={false}
              acknowledgeRemotionLicense
            />
          </div>
        </div>
      </Reveal>

      <section className="film-container relative z-10 grid gap-10 py-14 md:grid-cols-[1.4fr_1fr] md:py-20">
        <Reveal delayMs={40}>
          <p className="max-w-xl text-lg text-on-dark/65 md:text-xl">
            {film.synopsis}
          </p>
        </Reveal>

        <Reveal delayMs={100}>
          <div className="flex h-full flex-col justify-end gap-4 border-t border-on-dark/15 pt-8 md:border-t-0 md:border-l md:pl-10 md:pt-0">
            <p className="text-on-dark/55">
              Prefer a live conversation? We will walk your team through the
              platform against a real enterprise workflow.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                variant="onDark"
                onClick={() =>
                  openLead({
                    path: "walkthrough",
                    sourceScene: "videos-page",
                  })
                }
              >
                {videosPage.cta}
              </Button>
              <Button asChild variant="onDarkSecondary">
                <Link href="/runtime">{videosPage.ctaSecondary}</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
