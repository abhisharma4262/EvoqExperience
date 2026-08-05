"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

const stages = [
  "Discover",
  "Schema",
  "APIs",
  "UI",
  "Preview",
  "Agent evals",
  "Govern",
] as const;

const packets = [
  { ring: "outer", duration: "7s", delay: "0s", reverse: false },
  { ring: "outer", duration: "9s", delay: "2.4s", reverse: true },
  { ring: "mid", duration: "6.2s", delay: "0.8s", reverse: true },
  { ring: "mid", duration: "8s", delay: "3.1s", reverse: false },
  { ring: "inner", duration: "4.8s", delay: "1.2s", reverse: false },
  { ring: "inner", duration: "5.6s", delay: "2.8s", reverse: true },
] as const;

export function StudioRuntimeOrbit({ className }: { className?: string }) {
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const motionReduced = prefersReducedMotion();
    setReduced(motionReduced);
    if (motionReduced) return;
    const id = window.setInterval(() => {
      setActive((v) => (v + 1) % stages.length);
    }, 1400);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className={cn(
        "studio-runtime-orbit relative mx-auto aspect-square w-full max-w-md",
        className,
      )}
      aria-hidden
      data-reduced={reduced ? "true" : "false"}
    >
      <div className="studio-runtime-orbit__halo" />
      <div className="studio-runtime-orbit__ring studio-runtime-orbit__ring--outer" />
      <div className="studio-runtime-orbit__ring studio-runtime-orbit__ring--mid" />
      <div className="studio-runtime-orbit__ring studio-runtime-orbit__ring--inner" />
      <div className="studio-runtime-orbit__sweep" />

      {packets.map((packet, index) => (
        <span
          key={`${packet.ring}-${index}`}
          className={cn(
            "studio-runtime-orbit__arm",
            `studio-runtime-orbit__arm--${packet.ring}`,
            packet.reverse && "studio-runtime-orbit__arm--rev",
          )}
          style={{
            animationDuration: packet.duration,
            animationDelay: packet.delay,
          }}
        >
          <span className="studio-runtime-orbit__packet" />
        </span>
      ))}

      <div className="studio-runtime-orbit__core">
        <span className="studio-runtime-orbit__pulse" />
        <span className="text-[10px] uppercase tracking-[0.22em] text-[var(--studio-landing-eyebrow)]">
          Runtime
        </span>
        <span className="mt-1 text-lg font-medium text-[var(--studio-text)]">
          Live
        </span>
        <span className="mt-1 font-mono text-[10px] text-[var(--studio-accent-bright)]">
          {stages[active]}
        </span>
      </div>

      {stages.map((label, i) => {
        const angle = (i / stages.length) * Math.PI * 2 - Math.PI / 2;
        const radius = 42;
        const left = 50 + Math.cos(angle) * radius;
        const top = 50 + Math.sin(angle) * radius;
        const isActive = i === active;
        return (
          <div
            key={label}
            className={cn(
              "studio-runtime-orbit__node",
              isActive && "studio-runtime-orbit__node--active",
            )}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              animationDelay: `${i * 0.28}s`,
            }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
}
