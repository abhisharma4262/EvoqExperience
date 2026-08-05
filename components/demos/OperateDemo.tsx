"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Incident = {
  id: string;
  label: string;
  status: "new" | "routing" | "resolved" | "escalated";
};

const seed: Incident[] = [
  { id: "i1", label: "FNOL-1042", status: "new" },
  { id: "i2", label: "FNOL-1043", status: "new" },
  { id: "i3", label: "FNOL-1044", status: "new" },
];

export function OperateDemo() {
  const [incidents, setIncidents] = useState<Incident[]>(seed);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setIncidents([
        { id: "i1", label: "FNOL-1042", status: "resolved" },
        { id: "i2", label: "FNOL-1043", status: "resolved" },
        { id: "i3", label: "FNOL-1044", status: "escalated" },
        { id: "i4", label: "FNOL-1045", status: "resolved" },
      ]);
      return;
    }
    if (paused) return;

    let tick = 0;
    const timer = window.setInterval(() => {
      tick += 1;
      setIncidents((prev) => {
        const next = prev.map((item, index) => {
          if (index === tick % prev.length) {
            if (item.status === "new") return { ...item, status: "routing" as const };
            if (item.status === "routing") {
              return {
                ...item,
                status:
                  item.id === "i3"
                    ? ("escalated" as const)
                    : ("resolved" as const),
              };
            }
          }
          return item;
        });
        if (tick % 5 === 0 && next.length < 8) {
          next.push({
            id: `i${next.length + 1}`,
            label: `FNOL-104${next.length + 2}`,
            status: "new",
          });
        }
        return [...next];
      });
    }, 1600);

    return () => window.clearInterval(timer);
  }, [paused]);

  const autoResolved = incidents.filter((i) => i.status === "resolved").length;
  const escalated = incidents.filter((i) => i.status === "escalated").length;

  return (
    <div className="space-y-4 rounded-3xl border border-accent-alt/15 bg-bg p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs uppercase tracking-[0.16em] text-text-muted">
          Operations runtime
        </p>
        <button
          type="button"
          onClick={() => setPaused((v) => !v)}
          className="text-sm text-accent-alt link-sweep"
        >
          {paused ? "Resume" : "Pause and explain"}
        </button>
      </div>

      <p className="font-mono text-sm text-text-secondary">
        This session: {incidents.length} incidents · {autoResolved} auto-resolved
        · {escalated} escalated to human
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {(["new", "routing", "resolved"] as const).map((column) => (
          <div key={column} className="rounded-2xl border border-accent-alt/10 p-4">
            <p className="mb-3 text-xs uppercase tracking-[0.14em] text-text-muted">
              {column}
            </p>
            <div className="space-y-2">
              {incidents
                .filter((i) =>
                  column === "resolved"
                    ? i.status === "resolved" || i.status === "escalated"
                    : i.status === column,
                )
                .map((incident) => (
                  <div
                    key={incident.id}
                    className={cn(
                      "rounded-xl px-3 py-2 text-sm",
                      incident.status === "escalated"
                        ? "bg-highlight-on-dark/20 text-text-primary"
                        : "bg-surface text-text-secondary",
                    )}
                  >
                    {incident.label}
                    {incident.status === "escalated" ? " · human" : ""}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {paused ? (
        <div className="rounded-2xl border border-accent/20 bg-accent/5 p-4 text-sm text-text-secondary">
          Agent routed FNOL using severity policy `claims.fnol.auto-triage`.
          Settlement allowed under policy threshold; escalations retain human
          oversight with full audit trail.
        </div>
      ) : null}
    </div>
  );
}
