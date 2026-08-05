"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

const rows = [
  { agent: "Intent", status: "Captured", detail: "Direct booking channel" },
  { agent: "Context", status: "Bound", detail: "CRM · Pricing · Inventory" },
  { agent: "Engineering", status: "Building", detail: "API contracts · Preview" },
  { agent: "Governance", status: "Watching", detail: "Policy checks live" },
];

export function RuntimeConsole({ className }: { className?: string }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = window.setInterval(() => {
      setActive((v) => (v + 1) % rows.length);
    }, 1800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[1.5rem] border border-accent-alt/15 bg-surface shadow-[0_12px_48px_rgba(12,34,38,0.08)]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-accent-alt/10 bg-bg/80 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          <span className="text-xs font-medium tracking-wide text-text-secondary">
            EVOQ Console
          </span>
        </div>
        <span className="font-mono text-[11px] text-text-muted">
          execution · live
        </span>
      </div>

      <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-3 p-5">
          {rows.map((row, index) => (
            <div
              key={row.agent}
              className={cn(
                "flex items-center justify-between rounded-2xl border px-4 py-3 transition-colors duration-300",
                index === active
                  ? "border-accent/40 bg-accent/5"
                  : "border-accent-alt/10 bg-bg/50",
              )}
            >
              <div>
                <p className="text-sm font-medium text-text-primary">
                  {row.agent}
                </p>
                <p className="text-xs text-text-muted">{row.detail}</p>
              </div>
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-[11px]",
                  index === active
                    ? "bg-accent text-text-primary"
                    : "bg-accent-alt/10 text-text-secondary",
                )}
              >
                {row.status}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-accent-alt/10 bg-dark-bg p-5 text-on-dark md:border-l md:border-t-0">
          <p className="text-[11px] uppercase tracking-[0.16em] text-accent-on-dark">
            Flow
          </p>
          <p className="mt-3 display text-2xl leading-tight">
            Request → Agents → Systems → Governed outcome
          </p>
          <div className="mt-8 space-y-3">
            {["ERP", "CRM", "Data", "Cloud"].map((system, i) => (
              <div key={system} className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-accent to-transparent opacity-70" />
                <span
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs",
                    i === active % 4
                      ? "border-accent-on-dark text-accent-on-dark"
                      : "border-on-dark/20 text-on-dark/60",
                  )}
                >
                  {system}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-8 font-mono text-[11px] text-on-dark/55">
            policy.as.code · human oversight · reusable patterns
          </p>
        </div>
      </div>
    </div>
  );
}
