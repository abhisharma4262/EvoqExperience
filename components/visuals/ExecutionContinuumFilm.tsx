"use client";

import { useEffect, useId, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * Three-act film for Section Work — mirrors the “what’s shifting” slide:
 * 1) Intelligence multiplies around a glowing core
 * 2) Execution stays fragmented through a human bottleneck
 * 3) Work becomes one continuous loop on enterprise knowledge
 */
export function ExecutionContinuumFilm({ className }: { className?: string }) {
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
      { threshold: 0.32 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const active = live && !reduced;

  const intelCards = [
    { label: "Refactor checkout API", icon: "code", x: 52, y: 108, rot: -7 },
    { label: "Draft board brief", icon: "doc", x: 392, y: 100, rot: 6 },
    { label: "Why did conversion drop?", icon: "chart", x: 430, y: 208, rot: 3 },
    { label: "Explain churn spike", icon: "pie", x: 372, y: 318, rot: -4 },
    { label: "Summarize vendor risk", icon: "shield", x: 58, y: 312, rot: 5 },
    { label: "Generate schema migration", icon: "db", x: 28, y: 206, rot: -3 },
  ] as const;

  const loopNodes = [
    { label: "Intent", domain: "Business", icon: "target", angle: -90 },
    { label: "Decisions", domain: null, icon: "check", angle: -30 },
    { label: "Workflows", domain: null, icon: "flow", angle: 30 },
    { label: "Systems", domain: "Engineering", icon: "db", angle: 90 },
    { label: "Delivery", domain: null, icon: "plane", angle: 150 },
    { label: "Learning", domain: null, icon: "brain", angle: 210 },
  ] as const;

  const cx = 320;
  const cy = 208;
  const r = 118;

  function nodePos(angleDeg: number) {
    const a = (angleDeg * Math.PI) / 180;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  }

  return (
    <div
      ref={rootRef}
      className={cn(
        "continuum-film",
        active && "continuum-film--live",
        reduced && "continuum-film--reduced",
        className,
      )}
      role="img"
      aria-label="Intelligence multiplies, execution stays fragmented through people, then resolves into one continuous execution loop on enterprise knowledge"
    >
      <div className="continuum-film__haze" />
      <svg viewBox="0 0 640 480" className="continuum-film__svg" aria-hidden>
        <defs>
          <radialGradient id={`${uid}-core`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#09A78D" stopOpacity="0.45" />
            <stop offset="55%" stopColor="#09A78D" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#09A78D" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${uid}-human`} cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#09A78D" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#09A78D" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${uid}-flow`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#09A78D" stopOpacity="0" />
            <stop offset="40%" stopColor="#09A78D" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#52E081" stopOpacity="1" />
            <stop offset="100%" stopColor="#52E081" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${uid}-base`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#09A78D" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#337077" stopOpacity="0.08" />
          </linearGradient>
          <filter id={`${uid}-glow`} x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="3.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={`${uid}-soft`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <path
            id={`${uid}-orbit`}
            d={`M ${nodePos(-90).x} ${nodePos(-90).y}
              C ${nodePos(-60).x + 8} ${nodePos(-60).y - 18}, ${nodePos(-30).x + 18} ${nodePos(-30).y - 8}, ${nodePos(-30).x} ${nodePos(-30).y}
              C ${nodePos(0).x + 22} ${nodePos(0).y}, ${nodePos(30).x + 18} ${nodePos(30).y + 8}, ${nodePos(30).x} ${nodePos(30).y}
              C ${nodePos(60).x + 8} ${nodePos(60).y + 18}, ${nodePos(90).x} ${nodePos(90).y + 22}, ${nodePos(90).x} ${nodePos(90).y}
              C ${nodePos(120).x - 8} ${nodePos(120).y + 18}, ${nodePos(150).x - 18} ${nodePos(150).y + 8}, ${nodePos(150).x} ${nodePos(150).y}
              C ${nodePos(180).x - 22} ${nodePos(180).y}, ${nodePos(210).x - 18} ${nodePos(210).y - 8}, ${nodePos(210).x} ${nodePos(210).y}
              C ${nodePos(240).x - 8} ${nodePos(240).y - 18}, ${nodePos(-90).x} ${nodePos(-90).y - 22}, ${nodePos(-90).x} ${nodePos(-90).y} Z`}
          />
          <marker
            id={`${uid}-arrow`}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.2 L 8 5 L 0 8.8 Z" fill="#09A78D" opacity="0.7" />
          </marker>
        </defs>

        {/* ─── Act 1: Intelligence is multiplying ─── */}
        <g className="continuum-film__act continuum-film__act--1">
          <circle
            cx="320"
            cy="220"
            r="78"
            fill={`url(#${uid}-core)`}
            className="continuum-film__intel-glow"
          />
          <g className="continuum-film__star" filter={`url(#${uid}-glow)`}>
            <path
              d="M320 168 L332 208 L374 220 L332 232 L320 272 L308 232 L266 220 L308 208 Z"
              fill="#09A78D"
              opacity="0.95"
            />
            <circle cx="320" cy="220" r="10" fill="#F6F3F0" />
            <circle cx="320" cy="220" r="5" fill="#52E081" />
          </g>

          {intelCards.map((card, i) => {
            const mx = card.x + 78;
            const my = card.y + 18;
            return (
              <g key={card.label}>
                <line
                  x1={mx}
                  y1={my}
                  x2="320"
                  y2="220"
                  stroke="#09A78D"
                  strokeOpacity="0.16"
                  strokeWidth="1"
                  strokeDasharray="3 5"
                  className={`continuum-film__intel-spoke continuum-film__intel-spoke--${i}`}
                />
                <g transform={`translate(${card.x} ${card.y}) rotate(${card.rot})`}>
                  <g className={`continuum-film__intel-card continuum-film__intel-card--${i}`}>
                    <rect
                      width="188"
                      height="42"
                      rx="10"
                      fill="rgba(255,255,255,0.94)"
                      stroke="rgba(9,167,141,0.22)"
                      strokeWidth="1.1"
                    />
                    <g transform="translate(12 11)" fill="none" stroke="#09A78D" strokeWidth="1.45">
                      <CardIcon kind={card.icon} />
                    </g>
                    <text x="40" y="26" className="continuum-film__card-label">
                      {card.label}
                    </text>
                  </g>
                </g>
              </g>
            );
          })}

          <text x="320" y="52" textAnchor="middle" className="continuum-film__act-title">
            Intelligence is multiplying
          </text>
        </g>

        {/* ─── Act 2: Execution remains fragmented ─── */}
        <g className="continuum-film__act continuum-film__act--2">
          <text x="320" y="52" textAnchor="middle" className="continuum-film__act-title">
            Execution remains fragmented
          </text>

          {/* Business column */}
          <g className="continuum-film__column continuum-film__column--biz">
            <text x="118" y="98" textAnchor="middle" className="continuum-film__column-label">
              Business
            </text>
            {[
              { y: 128, icon: "chart" as const },
              { y: 186, icon: "people" as const },
              { y: 244, icon: "doc" as const },
            ].map((item, i) => (
              <g key={i} transform={`translate(76 ${item.y})`}>
                <rect
                  width="64"
                  height="42"
                  rx="9"
                  fill="rgba(255,255,255,0.85)"
                  stroke="rgba(9,167,141,0.2)"
                />
                <g transform="translate(20 9)" fill="none" stroke="#09A78D" strokeWidth="1.6">
                  <CardIcon kind={item.icon} />
                </g>
              </g>
            ))}
          </g>

          {/* Engineering column */}
          <g className="continuum-film__column continuum-film__column--eng">
            <text x="522" y="98" textAnchor="middle" className="continuum-film__column-label">
              Engineering
            </text>
            {[
              { y: 128, icon: "code" as const },
              { y: 186, icon: "db" as const },
              { y: 244, icon: "gear" as const },
            ].map((item, i) => (
              <g key={i} transform={`translate(500 ${item.y})`}>
                <rect
                  width="64"
                  height="42"
                  rx="9"
                  fill="rgba(255,255,255,0.85)"
                  stroke="rgba(51,112,119,0.22)"
                />
                <g transform="translate(20 9)" fill="none" stroke="#337077" strokeWidth="1.6">
                  <CardIcon kind={item.icon} />
                </g>
              </g>
            ))}
          </g>

          {/* Arrows into the human */}
          <g className="continuum-film__strain" filter={`url(#${uid}-soft)`}>
            {[148, 206, 264].map((y, i) => (
              <g key={`l-${i}`}>
                <path
                  d={`M 148 ${y} C 200 ${y - 4}, 250 ${210 + (y - 220) * 0.15}, 284 220`}
                  fill="none"
                  stroke="#09A78D"
                  strokeOpacity="0.45"
                  strokeWidth="1.4"
                  strokeDasharray="3 6"
                  markerEnd={`url(#${uid}-arrow)`}
                  className={`continuum-film__strain-line continuum-film__strain-line--${i}`}
                />
                <path
                  d={`M 492 ${y} C 440 ${y - 4}, 390 ${210 + (y - 220) * 0.15}, 356 220`}
                  fill="none"
                  stroke="#337077"
                  strokeOpacity="0.4"
                  strokeWidth="1.4"
                  strokeDasharray="3 6"
                  markerEnd={`url(#${uid}-arrow)`}
                  className={`continuum-film__strain-line continuum-film__strain-line--${i}`}
                />
              </g>
            ))}
          </g>

          {/* Human bottleneck */}
          <g className="continuum-film__human">
            <circle cx="320" cy="220" r="54" fill={`url(#${uid}-human)`} />
            <circle
              cx="320"
              cy="220"
              r="36"
              fill="rgba(255,255,255,0.88)"
              stroke="#09A78D"
              strokeWidth="1.4"
              strokeOpacity="0.35"
            />
            <g transform="translate(320 220)" fill="#09A78D">
              <circle cy="-12" r="8" />
              <path d="M0 -2 C-14 -2 -16 8 -16 16 L-16 22 L16 22 L16 16 C16 8 14 -2 0 -2 Z" />
            </g>

            {/* Role labels stacked around the person */}
            <g className="continuum-film__roles">
              <line x1="320" y1="158" x2="320" y2="184" stroke="#09A78D" strokeOpacity="0.28" />
              <g transform="translate(320 144)">
                <RoleChip icon="link" label="Coordinates systems" />
              </g>
              <line x1="320" y1="256" x2="320" y2="268" stroke="#09A78D" strokeOpacity="0.28" />
              <g transform="translate(320 282)">
                <RoleChip icon="scales" label="Makes decisions" />
              </g>
              <line x1="320" y1="296" x2="320" y2="308" stroke="#09A78D" strokeOpacity="0.28" />
              <g transform="translate(320 322)">
                <RoleChip icon="bulb" label="Carries knowledge" />
              </g>
            </g>
          </g>

          {/* Fragment pixels */}
          <g className="continuum-film__pixels" opacity="0.35">
            {[
              [96, 360],
              [128, 378],
              [160, 352],
              [470, 358],
              [502, 376],
              [534, 350],
              [220, 370],
              [420, 368],
            ].map(([px, py], i) => (
              <rect
                key={i}
                x={px}
                y={py}
                width="8"
                height="8"
                rx="1.5"
                fill={i % 2 ? "#337077" : "#09A78D"}
                className={`continuum-film__pixel continuum-film__pixel--${i}`}
              />
            ))}
          </g>
        </g>

        {/* ─── Act 3: Continuous execution ─── */}
        <g className="continuum-film__act continuum-film__act--3">
          <text x="320" y="44" textAnchor="middle" className="continuum-film__act-title">
            Continuous execution
          </text>

          {/* Enterprise knowledge foundation */}
          <g className="continuum-film__foundation">
            <ellipse
              cx="320"
              cy="392"
              rx="168"
              ry="22"
              fill={`url(#${uid}-base)`}
              stroke="#09A78D"
              strokeOpacity="0.28"
              strokeWidth="1.2"
            />
            <ellipse
              cx="320"
              cy="382"
              rx="168"
              ry="18"
              fill="rgba(246,243,240,0.92)"
              stroke="#09A78D"
              strokeOpacity="0.22"
              strokeWidth="1.1"
            />
            <g transform="translate(214 372)" fill="none" stroke="#09A78D" strokeWidth="1.4">
              <CardIcon kind="db" />
            </g>
            <text x="320" y="388" textAnchor="middle" className="continuum-film__foundation-label">
              Enterprise knowledge
            </text>
          </g>

          {/* Loop track */}
          <g className="continuum-film__loop">
            <use
              href={`#${uid}-orbit`}
              fill="none"
              stroke="#09A78D"
              strokeOpacity="0.12"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <use
              href={`#${uid}-orbit`}
              fill="none"
              stroke="#09A78D"
              strokeOpacity="0.4"
              strokeWidth="2"
              className="continuum-film__orbit-base"
            />
            <use
              href={`#${uid}-orbit`}
              fill="none"
              stroke={`url(#${uid}-flow)`}
              strokeWidth="3.2"
              strokeLinecap="round"
              className="continuum-film__orbit-flow"
            />

            {/* Curved arrow cues between nodes */}
            {loopNodes.map((node, i) => {
              const next = loopNodes[(i + 1) % loopNodes.length]!;
              const a1 = ((node.angle + 18) * Math.PI) / 180;
              const a2 = ((next.angle - 18) * Math.PI) / 180;
              const x1 = cx + (r + 2) * Math.cos(a1);
              const y1 = cy + (r + 2) * Math.sin(a1);
              const x2 = cx + (r + 2) * Math.cos(a2);
              const y2 = cy + (r + 2) * Math.sin(a2);
              let midAngle = (node.angle + next.angle) / 2;
              if (next.angle < node.angle) midAngle = (node.angle + next.angle + 360) / 2;
              const am = (midAngle * Math.PI) / 180;
              const mx = cx + (r + 14) * Math.cos(am);
              const my = cy + (r + 14) * Math.sin(am);
              return (
                <path
                  key={`arc-${node.label}`}
                  d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`}
                  fill="none"
                  stroke="#09A78D"
                  strokeOpacity="0.35"
                  strokeWidth="1.4"
                  markerEnd={`url(#${uid}-arrow)`}
                  className="continuum-film__arc"
                />
              );
            })}

            <circle
              r="5.5"
              fill="#52E081"
              filter={`url(#${uid}-glow)`}
              className="continuum-film__packet"
            >
              <animateMotion dur="7s" repeatCount="indefinite" rotate="auto">
                <mpath href={`#${uid}-orbit`} />
              </animateMotion>
            </circle>

            {/* Infinity + Execution center */}
            <g className="continuum-film__center">
              <text
                x="320"
                y="200"
                textAnchor="middle"
                className="continuum-film__infinity"
                filter={`url(#${uid}-glow)`}
              >
                ∞
              </text>
              <text x="320" y="224" textAnchor="middle" className="continuum-film__center-label">
                Execution
              </text>
            </g>

            {loopNodes.map((node, i) => {
              const { x, y } = nodePos(node.angle);
              const labelR = r + 34;
              const la = (node.angle * Math.PI) / 180;
              const lx = cx + labelR * Math.cos(la);
              const ly = cy + labelR * Math.sin(la);
              const domainR = r - 36;
              const dx = cx + domainR * Math.cos(la);
              const dy = cy + domainR * Math.sin(la) + (node.angle === -90 ? 10 : node.angle === 90 ? -6 : 0);

              return (
                <g
                  key={node.label}
                  className={`continuum-film__node continuum-film__node--${i}`}
                >
                  <circle
                    cx={x}
                    cy={y}
                    r="18"
                    fill="rgba(255,255,255,0.95)"
                    stroke="#09A78D"
                    strokeWidth="1.6"
                    className="continuum-film__node-core"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="24"
                    fill="#09A78D"
                    opacity="0.1"
                    className="continuum-film__node-halo"
                  />
                  <g
                    transform={`translate(${x - 9} ${y - 9})`}
                    fill="none"
                    stroke="#09A78D"
                    strokeWidth="1.5"
                  >
                    <CardIcon kind={node.icon} />
                  </g>
                  <text
                    x={lx}
                    y={ly + 4}
                    textAnchor="middle"
                    className="continuum-film__node-label"
                  >
                    {node.label}
                  </text>
                  {node.domain ? (
                    <text
                      x={dx}
                      y={dy}
                      textAnchor="middle"
                      className="continuum-film__domain"
                    >
                      {node.domain}
                    </text>
                  ) : null}
                </g>
              );
            })}
          </g>

        </g>
      </svg>

      <p className="continuum-film__endcap continuum-film__endcap--1">
        Intelligence everywhere
      </p>
      <p className="continuum-film__endcap continuum-film__endcap--2">
        Execution fragmented
      </p>
      <p className="continuum-film__endcap continuum-film__endcap--3">
        New ways of working
      </p>
    </div>
  );
}

function RoleChip({
  icon,
  label,
}: {
  icon: "link" | "scales" | "bulb";
  label: string;
}) {
  return (
    <g>
      <rect
        x="-78"
        y="-14"
        width="156"
        height="28"
        rx="8"
        fill="rgba(255,255,255,0.92)"
        stroke="rgba(9,167,141,0.2)"
      />
      <g transform="translate(-68 -7)" fill="none" stroke="#09A78D" strokeWidth="1.4">
        <CardIcon kind={icon} />
      </g>
      <text x="10" y="5" textAnchor="middle" className="continuum-film__role-label">
        {label}
      </text>
    </g>
  );
}

function CardIcon({
  kind,
}: {
  kind:
    | "code"
    | "doc"
    | "chart"
    | "pie"
    | "shield"
    | "db"
    | "people"
    | "gear"
    | "flow"
    | "target"
    | "check"
    | "plane"
    | "brain"
    | "link"
    | "scales"
    | "bulb";
}) {
  switch (kind) {
    case "code":
      return <path d="M7 4 L2 9 L7 14 M11 4 L16 9 L11 14" strokeLinecap="round" strokeLinejoin="round" />;
    case "doc":
      return (
        <>
          <rect x="3" y="2" width="12" height="14" rx="1.5" />
          <path d="M6 6h6M6 9h6M6 12h4" strokeLinecap="round" />
        </>
      );
    case "chart":
      return (
        <>
          <path d="M2 14 L6 8 L10 11 L16 4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 16h14" strokeLinecap="round" />
        </>
      );
    case "pie":
      return (
        <>
          <circle cx="9" cy="9" r="7" />
          <path d="M9 9 L9 2 A7 7 0 0 1 15.1 12 Z" fill="#09A78D" fillOpacity="0.25" stroke="none" />
        </>
      );
    case "shield":
      return <path d="M9 1.5 L15 4 V9 C15 13 12 15.5 9 16.5 C6 15.5 3 13 3 9 V4 Z" strokeLinejoin="round" />;
    case "db":
      return (
        <>
          <ellipse cx="9" cy="4" rx="6" ry="2.2" />
          <path d="M3 4 V13 C3 14.2 5.7 15.2 9 15.2 S15 14.2 15 13 V4" />
          <path d="M3 8.5 C3 9.7 5.7 10.7 9 10.7 S15 9.7 15 8.5" />
        </>
      );
    case "people":
      return (
        <>
          <circle cx="6.5" cy="6" r="2.4" />
          <circle cx="12.5" cy="6" r="2.4" />
          <path d="M2 15 C2 12 4.5 11 6.5 11 S11 12 11 15" />
          <path d="M8 15 C8 12 10.5 11 12.5 11 S17 12 17 15" />
        </>
      );
    case "gear":
      return (
        <>
          <circle cx="9" cy="9" r="3" />
          <path d="M9 1.5 L10.2 4.2 L13.2 3.4 L12.6 6.4 L15.5 7.2 L13.5 9.5 L15.5 11.8 L12.6 12.6 L13.2 15.6 L10.2 14.8 L9 17.5 L7.8 14.8 L4.8 15.6 L5.4 12.6 L2.5 11.8 L4.5 9.5 L2.5 7.2 L5.4 6.4 L4.8 3.4 L7.8 4.2 Z" />
        </>
      );
    case "flow":
      return (
        <>
          <rect x="6" y="1.5" width="6" height="4" rx="1" />
          <rect x="1.5" y="12.5" width="6" height="4" rx="1" />
          <rect x="10.5" y="12.5" width="6" height="4" rx="1" />
          <path d="M9 5.5 V9 M9 9 H4.5 V12.5 M9 9 H13.5 V12.5" strokeLinecap="round" />
        </>
      );
    case "target":
      return (
        <>
          <circle cx="9" cy="9" r="7" />
          <circle cx="9" cy="9" r="3.5" />
          <circle cx="9" cy="9" r="1.2" fill="#09A78D" stroke="none" />
        </>
      );
    case "check":
      return (
        <>
          <circle cx="9" cy="9" r="7" />
          <path d="M5.5 9.2 L8 11.7 L13 6.5" strokeLinecap="round" strokeLinejoin="round" />
        </>
      );
    case "plane":
      return <path d="M2 10 L16 3 L11 15 L9 10 Z M9 10 L16 3" strokeLinejoin="round" />;
    case "brain":
      return (
        <path
          d="M7 3.5 C4.5 3.5 3 5.5 3 7.5 C3 9 3.8 10.2 5 10.8 V14.5 H8 V11 H10 V14.5 H13 V10.8 C14.2 10.2 15 9 15 7.5 C15 5.2 13.2 3.5 11 3.5 C10.2 3.5 9.5 3.8 9 4.2 C8.5 3.8 7.8 3.5 7 3.5 Z"
          strokeLinejoin="round"
        />
      );
    case "link":
      return (
        <>
          <circle cx="5.5" cy="9" r="3" />
          <circle cx="12.5" cy="9" r="3" />
          <path d="M7.5 9 H10.5" strokeLinecap="round" />
        </>
      );
    case "scales":
      return (
        <>
          <path d="M9 2 V15 M4 15 H14" strokeLinecap="round" />
          <path d="M3 6 H15 M3 6 L5.5 11 H1.5 Z M15 6 L12.5 11 H17.5 Z" strokeLinejoin="round" />
        </>
      );
    case "bulb":
      return (
        <>
          <path d="M9 1.5 C5.8 1.5 3.5 4 3.5 7 C3.5 9.2 4.8 10.8 6.5 11.8 V14 H11.5 V11.8 C13.2 10.8 14.5 9.2 14.5 7 C14.5 4 12.2 1.5 9 1.5 Z" />
          <path d="M7 15.5 H11" strokeLinecap="round" />
        </>
      );
    default:
      return null;
  }
}
