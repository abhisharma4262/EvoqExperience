"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

const categories = [
  "Data model",
  "Automations",
  "Integrations",
  "Technical debt",
  "Security",
  "Governance",
];

const clockSteps = ["00:47", "01:23", "03:04", "07:59"];

export function TransformDemo() {
  const [progress, setProgress] = useState<number[]>(
    categories.map(() => 0),
  );
  const [clockIndex, setClockIndex] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setProgress(categories.map(() => 100));
      setClockIndex(clockSteps.length - 1);
      setShowSummary(true);
      return;
    }

    const speeds = [3.2, 2.1, 2.7, 1.8, 2.4, 2.9];
    const timer = window.setInterval(() => {
      setProgress((prev) => {
        const next = prev.map((value, i) =>
          Math.min(100, value + speeds[i]!),
        );
        if (next.every((v) => v >= 100)) {
          setShowSummary(true);
          window.clearInterval(timer);
        }
        return next;
      });
    }, 180);

    const clockTimer = window.setInterval(() => {
      setClockIndex((prev) => Math.min(clockSteps.length - 1, prev + 1));
    }, 2800);

    return () => {
      window.clearInterval(timer);
      window.clearInterval(clockTimer);
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-accent-alt/15 bg-bg p-6">
          <p className="text-xs uppercase tracking-[0.16em] text-text-muted">
            Legacy Salesforce org
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {["Objects", "Workflows", "Integrations", "Custom code"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-accent-alt/20 px-4 py-6 text-center text-sm text-text-secondary"
                >
                  {item}
                </div>
              ),
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-accent-alt/15 bg-surface p-6">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.16em] text-text-muted">
              Assessment progress
            </p>
            <p className="font-mono text-sm text-accent-alt">
              Elapsed: {clockSteps[clockIndex]}
            </p>
          </div>
          <ul className="mt-6 space-y-3">
            {categories.map((category, index) => (
              <li key={category}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{category}</span>
                  <span className="text-text-muted">
                    {Math.round(progress[index] ?? 0)}%
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-accent-alt/10">
                  <div
                    className="h-full bg-accent transition-all duration-300"
                    style={{ width: `${progress[index] ?? 0}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {showSummary ? (
        <div className="rounded-3xl border border-accent/25 bg-accent/5 p-6">
          <p className="display text-xl">Assessment summary</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveSection(category)}
                className="rounded-full border border-accent-alt/20 bg-surface px-4 py-2 text-sm hover:border-accent"
              >
                {category}
              </button>
            ))}
          </div>
          {activeSection ? (
            <p className="mt-4 text-sm text-text-secondary">
              {activeSection}: placeholder detail for founder-supplied findings.
              Risk scored, owners mapped, remediation path draft ready.
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
