import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type SceneProps = {
  playing: boolean;
};

export function SceneFrame({
  playing,
  label,
  children,
  className,
  variant,
}: {
  playing: boolean;
  label: string;
  children: ReactNode;
  className?: string;
  variant?: string;
}) {
  return (
    <div
      className={cn(
        "story-scene mt-auto overflow-hidden rounded-xl border border-accent-alt/12 bg-gradient-to-br from-white/55 via-bg/40 to-accent/5",
        playing ? "is-playing" : "is-idle",
        variant ? `story-scene--${variant}` : "",
        className,
      )}
      role="img"
      aria-label={label}
    >
      <svg
        viewBox="0 0 320 168"
        className="story-scene-svg h-[168px] w-full"
        aria-hidden
      >
        {children}
      </svg>
    </div>
  );
}

export function Actor({
  x,
  y,
  label,
  tone = "default",
  className,
  children,
}: {
  x: number;
  y: number;
  label: string;
  tone?: "default" | "agent" | "system" | "warn" | "ok" | "danger" | "dim";
  className?: string;
  children: ReactNode;
}) {
  return (
    <g
      className={cn("story-actor", `story-actor--${tone}`, className)}
      transform={`translate(${x} ${y})`}
    >
      <rect
        x={-28}
        y={-22}
        width={56}
        height={44}
        rx={12}
        className="story-actor-shell"
      />
      <g className="story-actor-icon" transform="translate(0 -4)">
        {children}
      </g>
      <text
        y={28}
        textAnchor="middle"
        className="story-actor-label fill-current"
      >
        {label}
      </text>
    </g>
  );
}

export function Edge({
  d,
  className,
}: {
  d: string;
  className?: string;
}) {
  return (
    <path
      d={d}
      className={cn("story-edge", className)}
      fill="none"
      strokeLinecap="round"
    />
  );
}

export function Packet({
  path,
  className,
  dur = "5s",
  begin = "0s",
  playing,
}: {
  path: string;
  className?: string;
  dur?: string;
  begin?: string;
  playing: boolean;
}) {
  return (
    <circle r={3.5} className={cn("story-packet", className)}>
      {playing ? (
        <animateMotion
          dur={dur}
          begin={begin}
          repeatCount="indefinite"
          path={path}
          keyPoints="0;1"
          keyTimes="0;1"
          calcMode="linear"
        />
      ) : null}
    </circle>
  );
}

export function Bubble({
  x,
  y,
  text,
  className,
}: {
  x: number;
  y: number;
  text: string;
  className?: string;
}) {
  const width = Math.max(36, text.length * 6.2 + 14);
  return (
    <g
      className={cn("story-bubble", className)}
      transform={`translate(${x} ${y})`}
    >
      <rect
        x={-width / 2}
        y={-11}
        width={width}
        height={20}
        rx={8}
        className="story-bubble-shell"
      />
      <text textAnchor="middle" y={3.5} className="story-bubble-text">
        {text}
      </text>
    </g>
  );
}

export function StatusBadge({
  x,
  y,
  text,
  className,
}: {
  x: number;
  y: number;
  text: string;
  className?: string;
}) {
  const width = Math.max(40, text.length * 5.8 + 16);
  return (
    <g
      className={cn("story-badge", className)}
      transform={`translate(${x} ${y})`}
    >
      <rect
        x={-width / 2}
        y={-9}
        width={width}
        height={18}
        rx={9}
        className="story-badge-shell"
      />
      <text textAnchor="middle" y={3.5} className="story-badge-text">
        {text}
      </text>
    </g>
  );
}

function strokeProps() {
  return {
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
}

export function IconPerson() {
  return (
    <g {...strokeProps()}>
      <circle cx={0} cy={-3} r={4} />
      <path d="M-7 10c1.5-5 4-7 7-7s5.5 2 7 7" />
    </g>
  );
}

export function IconAgent() {
  return (
    <g {...strokeProps()}>
      <rect x={-7} y={-5} width={14} height={11} rx={3} />
      <circle cx={-3} cy={0} r={1.2} fill="currentColor" stroke="none" />
      <circle cx={3} cy={0} r={1.2} fill="currentColor" stroke="none" />
      <path d="M0 -9v4M-3 9h6" />
    </g>
  );
}

export function IconSystem() {
  return (
    <g {...strokeProps()}>
      <rect x={-8} y={-6} width={16} height={12} rx={2} />
      <path d="M-8 0h16M-3 10h6M0 6v4" />
    </g>
  );
}

export function IconCart() {
  return (
    <g {...strokeProps()}>
      <path d="M-8 -4h2l2 10h10l2-7H-4" />
      <circle cx={-2} cy={9} r={1.4} />
      <circle cx={6} cy={9} r={1.4} />
    </g>
  );
}

export function IconPlugin() {
  return (
    <g {...strokeProps()}>
      <path d="M-2 -8v4M2 -8v4M-6 -4h12v8a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V-4Z" />
    </g>
  );
}

export function IconCrm() {
  return (
    <g {...strokeProps()}>
      <rect x={-8} y={-7} width={16} height={14} rx={2} />
      <path d="M-8 -2h16M-3 3h6" />
    </g>
  );
}

export function IconDoc() {
  return (
    <g {...strokeProps()}>
      <path d="M-5 -8h7l5 5v11H-5Z" />
      <path d="M2 -8v5h5M-2 4h6M-2 7h4" />
    </g>
  );
}

export function IconMonolith() {
  return (
    <g {...strokeProps()}>
      <rect x={-7} y={-9} width={14} height={18} rx={2} />
      <path d="M-3 -4h6M-3 0h6M-3 4h6" />
    </g>
  );
}

export function IconPods() {
  return (
    <g {...strokeProps()} strokeWidth={1.5}>
      <rect x={-10} y={-8} width={7} height={7} rx={1.5} />
      <rect x={3} y={-8} width={7} height={7} rx={1.5} />
      <rect x={-3.5} y={2} width={7} height={7} rx={1.5} />
    </g>
  );
}

export function IconPipe() {
  return (
    <g {...strokeProps()}>
      <path d="M-9 0h6M-3 -4v8M3 -4v8M3 0h6" />
      <circle cx={-9} cy={0} r={2} />
      <circle cx={9} cy={0} r={2} />
    </g>
  );
}

export function IconShield() {
  return (
    <g {...strokeProps()}>
      <path d="M0 -9 8 -5v5c0 4.5-3 7.5-8 8.5C-3 7.5-8 4.5-8 0v-5Z" />
      <path d="M-3 0 0 3 5 -3" />
    </g>
  );
}

export function IconGraph() {
  return (
    <g {...strokeProps()} strokeWidth={1.5}>
      <circle cx={-6} cy={-5} r={2.2} />
      <circle cx={6} cy={-5} r={2.2} />
      <circle cx={0} cy={6} r={2.2} />
      <path d="M-4 -4 4 -4M-5 -3 -1 5M5 -3 1 5" />
    </g>
  );
}

export function IconQuote() {
  return (
    <g {...strokeProps()}>
      <rect x={-8} y={-7} width={16} height={14} rx={2} />
      <path d="M-4 -2h8M-4 2h5" />
    </g>
  );
}

export function IconTelemetry() {
  return (
    <g {...strokeProps()}>
      <path d="M-8 6  -3 -2 1 3 8 -6" />
      <path d="M5 -6h3v3" />
    </g>
  );
}

export function IconHeal() {
  return (
    <g {...strokeProps()}>
      <path d="M0 9s-6-3.5-6-8a3.4 3.4 0 0 1 6-2.2A3.4 3.4 0 0 1 6 1c0 4.5-6 8-6 8Z" />
      <path d="M0 -1v4M-2 1h4" />
    </g>
  );
}

export function IconStream() {
  return (
    <g {...strokeProps()}>
      <path d="M-9 -4h10M-9 0h14M-9 4h8" />
      <path d="M5 -4 9 0 5 4" />
    </g>
  );
}

export function IconScore() {
  return (
    <g {...strokeProps()}>
      <circle cx={0} cy={0} r={8} />
      <path d="M0 -8v8l5 3" />
    </g>
  );
}

export function IconGate() {
  return (
    <g {...strokeProps()}>
      <path d="M-2 -8h4v16h-4" />
      <path d="M2 -4h6M2 0h6M2 4h6" />
      <circle cx={-5} cy={0} r={2} />
    </g>
  );
}

export function IconCase() {
  return (
    <g {...strokeProps()}>
      <rect x={-8} y={-5} width={16} height={12} rx={2} />
      <path d="M-4 -5V-7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </g>
  );
}

export function IconTicket() {
  return (
    <g {...strokeProps()}>
      <path d="M-8 -5h16a2 2 0 0 1 0 4 2 2 0 0 1 0 4h-16a2 2 0 0 1 0-4 2 2 0 0 1 0-4Z" />
      <path d="M-2 -2v8" strokeDasharray="1.5 2" />
    </g>
  );
}

export function IconRunbook() {
  return (
    <g {...strokeProps()}>
      <path d="M-7 -8h10a4 4 0 0 1 4 4v12H-3a4 4 0 0 0-4 4" />
      <path d="M-3 -4h6M-3 0h6M-3 4h4" />
    </g>
  );
}

export function IconEscalate() {
  return (
    <g {...strokeProps()}>
      <path d="M0 -8 7 6H-7Z" />
      <path d="M0 -1v4M0 6.5v.5" />
    </g>
  );
}

export function IconCheck() {
  return (
    <g {...strokeProps()} strokeWidth={1.8}>
      <circle cx={0} cy={0} r={7} />
      <path d="M-3 0  -0.5 2.5 4 -3" />
    </g>
  );
}
