"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

const prompt =
  "Build me a direct booking channel that competes with OTAs: one that plans, books, and manages multi-leg trips.";

const agents = [
  "Discovering requirements…",
  "Generating schema…",
  "Provisioning environment…",
  "Writing API contracts…",
  "Deploying preview…",
];

export function CreateDemo() {
  const [typed, setTyped] = useState("");
  const [agentIndex, setAgentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showGovernance, setShowGovernance] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setTyped(prompt);
      setAgentIndex(agents.length);
      setProgress(100);
      setDone(true);
      return;
    }

    let i = 0;
    const typeTimer = window.setInterval(() => {
      i += 1;
      setTyped(prompt.slice(0, i));
      if (i >= prompt.length) window.clearInterval(typeTimer);
    }, 28);

    const agentTimer = window.setInterval(() => {
      setAgentIndex((prev) => Math.min(agents.length, prev + 1));
    }, 2200);

    const progressTimer = window.setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(100, prev + 2);
        if (next >= 100) setDone(true);
        return next;
      });
    }, 600);

    return () => {
      window.clearInterval(typeTimer);
      window.clearInterval(agentTimer);
      window.clearInterval(progressTimer);
    };
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-3xl border border-accent-alt/15 bg-bg p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-text-muted">
          Chief Digital Officer
        </p>
        <p className="mt-4 min-h-32 font-mono text-sm leading-relaxed text-text-primary">
          {typed}
          <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-accent" />
        </p>
      </div>

      <div className="rounded-3xl border border-accent-alt/15 bg-surface p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-text-muted">
          Agents at work
        </p>
        <ul className="mt-4 space-y-3">
          {agents.map((status, index) => (
            <li
              key={status}
              className={cn(
                "rounded-2xl border px-4 py-3 text-sm transition-opacity",
                index < agentIndex
                  ? "border-accent/30 bg-accent/5 text-text-primary opacity-100"
                  : "border-accent-alt/10 text-text-muted opacity-40",
              )}
            >
              {status}
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <div className="h-2 overflow-hidden rounded-full bg-accent-alt/10">
          <div
            className="h-full bg-accent transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => setShowGovernance((v) => !v)}
            className="text-sm text-accent-alt link-sweep"
          >
            {showGovernance ? "Hide governance events" : "Show governance events"}
          </button>
          {done ? (
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="rounded-2xl border border-accent/30 bg-accent/5 px-4 py-2 text-sm text-text-primary"
            >
              Preview environment ready
            </a>
          ) : null}
        </div>
        {showGovernance ? (
          <div className="rounded-2xl border border-accent-alt/15 bg-bg p-4 font-mono text-xs text-text-secondary">
            <p>[policy] data residency: approved</p>
            <p>[audit] agent.schema.write: allowed</p>
            <p>[policy] human approval gate: preview deploy</p>
            <p>[audit] environment.provision: complete</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
