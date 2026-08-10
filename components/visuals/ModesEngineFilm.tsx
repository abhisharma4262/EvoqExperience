"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { orbits } from "@/content/orbits";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

export type ModesFilmMode = "create" | "transform" | "operate";

type ModesEngineFilmProps = {
  className?: string;
  /** When set, highlights that outer doorway on the loop. */
  activeMode?: ModesFilmMode;
};

const CAPABILITIES = [
  { id: "context", label: "Context", icon: "context" },
  { id: "governance", label: "Governance", icon: "governance" },
  { id: "orchestration", label: "Orchestration", icon: "orchestration" },
  { id: "knowledge", label: "Knowledge", icon: "knowledge" },
] as const;

const MODES = [
  {
    id: "create" as const,
    label: "Create",
    line: "Build what comes next",
    icon: "create",
  },
  {
    id: "transform" as const,
    label: "Transform",
    line: "Modernise what exists",
    icon: "transform",
  },
  {
    id: "operate" as const,
    label: "Operate",
    line: "Run what is critical",
    icon: "operate",
  },
];

function CapIcon({ kind }: { kind: (typeof CAPABILITIES)[number]["icon"] }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (kind === "context") {
    return (
      <svg {...common} className="modes-film__icon">
        <circle cx="8" cy="8" r="2.2" fill="currentColor" stroke="none" />
        <circle cx="16" cy="8" r="2.2" fill="currentColor" stroke="none" />
        <circle cx="8" cy="16" r="2.2" fill="currentColor" stroke="none" />
        <circle cx="16" cy="16" r="2.2" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (kind === "knowledge") {
    return (
      <svg {...common} className="modes-film__icon">
        <path d="M4 6.5c2.2-1.2 4.4-1.2 6.5 0v11c-2.1-1.1-4.3-1.1-6.5 0V6.5Z" />
        <path d="M13.5 6.5c2.2-1.2 4.4-1.2 6.5 0v11c-2.1-1.1-4.3-1.1-6.5 0V6.5Z" />
      </svg>
    );
  }
  if (kind === "governance") {
    return (
      <svg {...common} className="modes-film__icon">
        <path d="M12 3.5 19 6.5v5.2c0 4.2-2.8 7.2-7 8.8-4.2-1.6-7-4.6-7-8.8V6.5L12 3.5Z" />
        <path d="m9.2 12.1 1.9 1.9 3.8-3.9" />
      </svg>
    );
  }
  return (
    <svg {...common} className="modes-film__icon">
      <circle cx="12" cy="6.5" r="2" />
      <circle cx="7" cy="16.5" r="2" />
      <circle cx="17" cy="16.5" r="2" />
      <path d="M12 8.5v3.2L8.4 14.8M12 11.7l3.6 3.1" />
    </svg>
  );
}

function ModeIcon({ kind }: { kind: (typeof MODES)[number]["icon"] }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (kind === "create") {
    return (
      <svg {...common} className="modes-film__mode-icon">
        <path d="M12 3.5 19.5 8v8L12 20.5 4.5 16V8L12 3.5Z" />
        <path d="M12 12v8.5M12 12 4.8 7.7M12 12l7.2-4.3" />
      </svg>
    );
  }
  if (kind === "transform") {
    return (
      <svg {...common} className="modes-film__mode-icon">
        <path d="m7 7 5 5-5 5" />
        <path d="m13 7 5 5-5 5" />
      </svg>
    );
  }
  return (
    <svg {...common} className="modes-film__mode-icon">
      <circle cx="12" cy="12" r="3.1" />
      <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6.1 6.1l1.6 1.6M16.3 16.3l1.6 1.6M17.9 6.1l-1.6 1.6M7.7 16.3l-1.6 1.6" />
    </svg>
  );
}

/**
 * Integrated execution diagram:
 * one Evoq engine core → shared capabilities → Create / Transform / Operate loop.
 */
export function ModesEngineFilm({
  className,
  activeMode = "create",
}: ModesEngineFilmProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const [live, setLive] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setLive(true);
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const active = live && !reduced;

  return (
    <div
      ref={rootRef}
      className={cn(
        "modes-film",
        active && "modes-film--live",
        reduced && "modes-film--reduced",
        `modes-film--focus-${activeMode}`,
        className,
      )}
    >
      <p className="sr-only">
        Evoq execution engine shared across Create, Transform, and Operate
      </p>
      <div className="modes-film__diagram">
        <svg
          className="modes-film__svg"
          viewBox="0 0 640 640"
          fill="none"
          aria-hidden
        >
          <defs>
            <radialGradient id="mf-core-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#52e081" stopOpacity="0.55" />
              <stop offset="45%" stopColor="#09a78d" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#09a78d" stopOpacity="0" />
            </radialGradient>
            <marker
              id="mf-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="4"
              orient="auto"
            >
              <path d="M0 0.5 L7 4 L0 7.5 Z" fill="#09a78d" />
            </marker>
          </defs>

          {/* Soft atmosphere */}
          <circle cx="320" cy="320" r="168" fill="url(#mf-core-glow)" />

          {/* Outer loop arcs: Create → Transform → Operate → Create */}
          <path
            className="modes-film__arc modes-film__arc--0"
            d="M 320 78 A 242 242 0 0 1 528 430"
            stroke="#09a78d"
            strokeWidth="5"
            strokeLinecap="round"
            markerEnd="url(#mf-arrow)"
          />
          <path
            className="modes-film__arc modes-film__arc--1"
            d="M 508 458 A 242 242 0 0 1 132 458"
            stroke="#09a78d"
            strokeWidth="5"
            strokeLinecap="round"
            markerEnd="url(#mf-arrow)"
          />
          <path
            className="modes-film__arc modes-film__arc--2"
            d="M 112 430 A 242 242 0 0 1 320 78"
            stroke="#09a78d"
            strokeWidth="5"
            strokeLinecap="round"
            markerEnd="url(#mf-arrow)"
          />

          {/* Inner dotted capability ring */}
          <circle
            className="modes-film__ring"
            cx="320"
            cy="320"
            r="118"
            stroke="#09a78d"
            strokeWidth="1.5"
            strokeDasharray="3 7"
            opacity="0.55"
          />

          {/* Spokes from core toward mode cards */}
          <line
            className="modes-film__spoke"
            x1="320"
            y1="320"
            x2="320"
            y2="118"
            stroke="#337077"
            strokeWidth="1.25"
            strokeDasharray="3 6"
            opacity="0.45"
          />
          <line
            className="modes-film__spoke"
            x1="320"
            y1="320"
            x2="500"
            y2="470"
            stroke="#337077"
            strokeWidth="1.25"
            strokeDasharray="3 6"
            opacity="0.45"
          />
          <line
            className="modes-film__spoke"
            x1="320"
            y1="320"
            x2="140"
            y2="470"
            stroke="#337077"
            strokeWidth="1.25"
            strokeDasharray="3 6"
            opacity="0.45"
          />
        </svg>

        <div className="modes-film__core">
          <div className="modes-film__core-glow" aria-hidden />
          <div className="modes-film__core-disc">
            <BrandLogo href={null} compact className="modes-film__logo" />
            <p className="modes-film__core-label">Evoq execution engine</p>
          </div>
        </div>

        {CAPABILITIES.map((cap) => (
          <div
            key={cap.id}
            className={`modes-film__cap modes-film__cap--${cap.id}`}
          >
            <span className="modes-film__cap-mark">
              <CapIcon kind={cap.icon} />
            </span>
            <span className="modes-film__cap-label">{cap.label}</span>
          </div>
        ))}

        {MODES.map((mode) => {
          const orbit = orbits.find((o) => o.mode === mode.id)!;
          return (
            <Link
              key={mode.id}
              href={orbit.href}
              scroll={false}
              className={cn(
                "modes-film__mode",
                `modes-film__mode--${mode.id}`,
                activeMode === mode.id && "modes-film__mode--active",
              )}
              aria-label={orbit.doorway}
            >
              <span className="modes-film__mode-mark">
                <ModeIcon kind={mode.icon} />
              </span>
              <div className="modes-film__mode-copy">
                <p className="modes-film__mode-label">
                  {mode.label}
                  <span className="modes-film__mode-go" aria-hidden>
                    →
                  </span>
                </p>
                <p className="modes-film__mode-line">{mode.line}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <p className="modes-film__claim">
        One execution engine across{" "}
        <Link
          href="/create"
          scroll={false}
          className="modes-film__claim-mode modes-film__claim-mode--create"
        >
          create
        </Link>
        ,{" "}
        <Link
          href="/transform"
          scroll={false}
          className="modes-film__claim-mode modes-film__claim-mode--transform"
        >
          transform
        </Link>
        , and{" "}
        <Link
          href="/operate"
          scroll={false}
          className="modes-film__claim-mode modes-film__claim-mode--operate"
        >
          operate
        </Link>
        .
      </p>
    </div>
  );
}
