"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { studio } from "@/content/studio";
import { Button } from "@/components/ui/Button";
import { StudioBrand } from "@/components/studio/StudioBrand";
import { StudioThemeToggle } from "@/components/studio/StudioThemeToggle";
import { StudioRuntimeOrbit } from "@/components/studio/StudioRuntimeOrbit";
import { useStudioTheme } from "@/components/studio/StudioThemeProvider";
import { readStudioSession } from "@/lib/studio-auth";

const floatCards = [
  {
    title: "Agents",
    line: "4 running · schema + UI",
    x: "8%",
    y: "18%",
    delay: 0,
  },
  {
    title: "Example preview",
    line: "Aurora Direct · sample app",
    x: "72%",
    y: "22%",
    delay: 0.4,
  },
  {
    title: "Agent evals",
    line: "policy · quality · gates",
    x: "14%",
    y: "68%",
    delay: 0.8,
  },
  {
    title: "Deploy",
    line: "eu-west-1 · ready",
    x: "68%",
    y: "70%",
    delay: 1.2,
  },
];

export function StudioLanding() {
  const { theme } = useStudioTheme();
  const [signedIn, setSignedIn] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);

  useEffect(() => {
    setSignedIn(Boolean(readStudioSession()));
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const id = window.setInterval(() => {
      setHighlightIndex((prev) => (prev + 1) % 3);
    }, 1000);

    return () => window.clearInterval(id);
  }, []);

  const primaryHref = signedIn ? "/studio/workspace" : "/studio/login";
  const auroraHref = signedIn
    ? "/studio/workspace?project=aurora-direct"
    : "/studio/login?next=/studio/workspace&project=aurora-direct";

  const primaryVariant = theme === "dark" ? "onDark" : "primary";
  const secondaryVariant = theme === "dark" ? "onDarkSecondary" : "secondary";

  const ctaButtons = [
    { href: "/studio/plan", label: studio.planCta },
    { href: primaryHref, label: studio.launchCta },
    { href: auroraHref, label: studio.exampleCta },
  ] as const;

  return (
    <div className="studio-landing relative min-h-screen overflow-hidden">
      <div className="studio-landing__grid" aria-hidden />
      <div className="studio-landing__glow studio-landing__glow--a" aria-hidden />
      <div className="studio-landing__glow studio-landing__glow--b" aria-hidden />

      <header className="relative z-20 flex items-center justify-between px-6 py-5 md:px-10">
        <StudioBrand />
        <div className="flex items-center gap-2 sm:gap-3">
          <StudioThemeToggle />
          <Link
            href="/create"
            className="hidden text-sm text-[var(--studio-muted)] transition hover:text-[var(--studio-text)] sm:inline"
          >
            ← Back to Create
          </Link>
          <Link
            href="/?scene=modes#section-modes"
            className="hidden text-sm text-[var(--studio-muted)] transition hover:text-[var(--studio-text)] md:inline"
          >
            Site home
          </Link>
          <Button asChild variant={primaryVariant} size="sm">
            <Link href={signedIn ? "/studio/workspace" : "/studio/login"}>
              {signedIn ? "Studio" : "Sign in"}
            </Link>
          </Button>
        </div>
      </header>

      <main className="relative z-20 mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col items-center justify-center px-6 pb-24 pt-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 text-xs uppercase tracking-[0.28em] text-[var(--studio-landing-eyebrow)]"
        >
          Create · Execution studio
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="display max-w-4xl text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.95] text-[var(--studio-text)]"
        >
          {studio.tagline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-xl text-base text-[var(--studio-muted)] md:text-lg"
        >
          {studio.landingSubcopy}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {ctaButtons.map((cta, index) => {
            const highlighted = highlightIndex === index;
            return (
              <Button
                key={cta.label}
                asChild
                variant={highlighted ? primaryVariant : secondaryVariant}
                size="lg"
                className="transition-[background-color,border-color,color,box-shadow,transform] duration-500 ease-out data-[highlighted=true]:scale-[1.03] data-[highlighted=true]:shadow-[0_10px_28px_color-mix(in_srgb,var(--studio-accent)_28%,transparent)]"
                data-highlighted={highlighted ? "true" : "false"}
              >
                <Link href={cta.href}>{cta.label}</Link>
              </Button>
            );
          })}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="mt-4 max-w-md text-xs text-[var(--studio-subtle)]"
        >
          Aurora Direct is a sample project included so you can preview a finished
          build before starting your own.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-16 w-full max-w-3xl"
        >
          <StudioRuntimeOrbit />
        </motion.div>
      </main>

      {floatCards.map((card) => (
        <motion.div
          key={card.title}
          className="studio-float-card absolute z-10 hidden md:block"
          style={{ left: card.x, top: card.y }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { delay: 0.8 + card.delay, duration: 0.6 },
            y: {
              delay: 1.2 + card.delay,
              duration: 5 + card.delay,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          aria-hidden
        >
          <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--studio-landing-eyebrow)]">
            {card.title}
          </p>
          <p className="mt-1 text-sm text-[var(--studio-text)]">{card.line}</p>
        </motion.div>
      ))}
    </div>
  );
}
