"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * Story film for Section Evoq — three beats:
 * 1) Knowledge is fragmented
 * 2) Evoq gathers it
 * 3) Work becomes executable
 *
 * Readable HTML type on a free stage (no card). Motion tells the claim.
 */
const KNOWLEDGE = [
  { id: "process", label: "Business processes", sx: 2, sy: 10, ex: 14, ey: 20 },
  { id: "eng", label: "Engineering decisions", sx: 22, sy: 0, ex: 4, ey: 40 },
  { id: "commit", label: "Customer commitments", sx: 40, sy: 14, ex: 16, ey: 58 },
  { id: "reg", label: "Regulatory requirements", sx: 6, sy: 56, ex: 2, ey: 76 },
  { id: "ops", label: "Operational experience", sx: 30, sy: 74, ex: 22, ey: 90 },
] as const;

const OUTCOMES = [
  { label: "Intent", detail: "becomes action" },
  { label: "Decisions", detail: "stay governed" },
  { label: "Delivery", detail: "runs end to end" },
  { label: "Learning", detail: "compounds next time" },
] as const;

export function ExecutableKnowledgeFilm({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
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
      { threshold: 0.28 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const active = live && !reduced;

  return (
    <div
      ref={rootRef}
      className={cn(
        "ek-story",
        active && "ek-story--live",
        reduced && "ek-story--reduced",
        className,
      )}
      role="img"
      aria-label="Fragmented enterprise knowledge gathers into Evoq and becomes continuous executable work"
    >
      <div className="ek-story__glow" aria-hidden />

      <div className="ek-story__stage">
        {/* Act labels */}
        <p className="ek-story__beat ek-story__beat--1">Enterprise knowledge is fragmented</p>
        <p className="ek-story__beat ek-story__beat--2">Evoq makes it connected and governed</p>
        <p className="ek-story__beat ek-story__beat--3">So work becomes executable</p>

        {/* Knowledge chips — scatter, then settle toward Evoq */}
        {KNOWLEDGE.map((chip, i) => (
          <div
            key={chip.id}
            className={`ek-story__chip ek-story__chip--${i}`}
            style={
              {
                ["--sx" as string]: `${chip.sx}%`,
                ["--sy" as string]: `${chip.sy}%`,
                ["--ex" as string]: `${chip.ex}%`,
                ["--ey" as string]: `${chip.ey}%`,
                ["--i" as string]: i,
              } as CSSProperties
            }
          >
            {chip.label}
          </div>
        ))}

        {/* Convergence lines (SVG) */}
        <svg className="ek-story__mesh" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id={`${uid}-line`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#09A78D" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#09A78D" stopOpacity="0.75" />
            </linearGradient>
          </defs>
          {KNOWLEDGE.map((chip, i) => (
            <path
              key={chip.id}
              className={`ek-story__spoke ek-story__spoke--${i}`}
              d={`M ${chip.ex + 12} ${chip.ey + 4} Q 42 ${chip.ey * 0.55 + 28} 48 50`}
              fill="none"
              stroke={`url(#${uid}-line)`}
              strokeWidth="0.45"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        {/* Evoq hinge */}
        <div className="ek-story__core">
          <div className="ek-story__core-aura" aria-hidden />
          <div className="ek-story__core-ring" aria-hidden />
          <div className="ek-story__core-disc">
            <span>Evoq</span>
          </div>
        </div>

        {/* Executable outcome — blooms to the right */}
        <div className="ek-story__result">
          <p className="ek-story__result-kicker">Executable work</p>
          <ul className="ek-story__result-list">
            {OUTCOMES.map((item, i) => (
              <li
                key={item.label}
                className={`ek-story__result-item ek-story__result-item--${i}`}
                style={{ ["--i" as string]: i }}
              >
                <span className="ek-story__result-label">{item.label}</span>
                <span className="ek-story__result-detail">{item.detail}</span>
              </li>
            ))}
          </ul>
          <div className="ek-story__orbit" aria-hidden>
            <span className="ek-story__orbit-dot" />
          </div>
        </div>
      </div>

      <p className="ek-story__claim ek-story__claim--1">Knowledge stays trapped.</p>
      <p className="ek-story__claim ek-story__claim--2">Evoq turns it into context for action.</p>
      <p className="ek-story__claim ek-story__claim--3">
        Enterprise knowledge becomes executable.
      </p>
    </div>
  );
}
