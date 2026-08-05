"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import {
  coordinationMesh,
  meshBrandMarks,
  type MeshBrandId,
  type MeshPeerId,
} from "@/content/coordinationMesh";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;
const TOUR_MS = 2600;
const RESUME_MS = 5200;

const CX = 480;
const CY = 290;
const PEER_R = 36;
const CONTEXT_R = 56;

const PEER_POS: Record<MeshPeerId, { x: number; y: number }> = {
  people: { x: 278, y: 128 },
  agents: { x: 682, y: 128 },
  systems: { x: 792, y: 290 },
  data: { x: 682, y: 452 },
  workflows: { x: 278, y: 452 },
  governance: { x: 168, y: 290 },
};

const SAT_POS: Record<string, { x: number; y: number }> = {
  slack: { x: 64, y: 118 },
  okta: { x: 56, y: 290 },
  sap: { x: 210, y: 575 },
  salesforce: { x: 370, y: 592 },
  snowflake: { x: 530, y: 592 },
  servicenow: { x: 690, y: 575 },
  aws: { x: 904, y: 200 },
  mulesoft: { x: 912, y: 360 },
};

type FocusId = MeshPeerId | "context" | string;

function shorten(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  insetA: number,
  insetB: number,
) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  return {
    x1: x1 + ux * insetA,
    y1: y1 + uy * insetA,
    x2: x2 - ux * insetB,
    y2: y2 - uy * insetB,
  };
}

function quadPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  bend = 0.18,
) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  return `M ${x1} ${y1} Q ${mx - dy * bend} ${my + dx * bend} ${x2} ${y2}`;
}

function relatedSet(focus: FocusId): Set<string> {
  const related = new Set<string>([focus]);
  if (focus === "context") {
    coordinationMesh.peers.forEach((p) => related.add(p.id));
    coordinationMesh.satellites.forEach((s) => related.add(s.id));
    return related;
  }
  if ((PEER_POS as Record<string, unknown>)[focus]) {
    related.add("context");
    coordinationMesh.chords.forEach(([a, b]) => {
      if (a === focus || b === focus) {
        related.add(a);
        related.add(b);
      }
    });
    coordinationMesh.satellites.forEach((s) => {
      if ((s.attaches as readonly string[]).includes(focus)) {
        related.add(s.id);
      }
    });
    return related;
  }
  const sat = coordinationMesh.satellites.find((s) => s.id === focus);
  if (sat) {
    sat.attaches.forEach((id) => related.add(id));
    related.add("context");
  }
  return related;
}

function PeerIcon({ id, x, y }: { id: MeshPeerId; x: number; y: number }) {
  const s = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (id) {
    case "people":
      return (
        <g transform={`translate(${x} ${y})`} className="text-accent-alt">
          <circle {...s} cx={-7} cy={-6} r={5} />
          <circle {...s} cx={8} cy={-5} r={4.5} />
          <path {...s} d="M-16 11c0-6 4-9 9-9s9 3 9 9" />
          <path {...s} d="M1 11c0-5 3-8 7-8s7 3 7 8" />
        </g>
      );
    case "agents":
      return (
        <g transform={`translate(${x} ${y})`} className="text-accent-alt">
          <rect {...s} x={-12} y={-10} width={24} height={20} rx={6} />
          <circle cx={-5} cy={-2} r={2} className="fill-accent-alt" />
          <circle cx={5} cy={-2} r={2} className="fill-accent-alt" />
          <path {...s} d="M-5 5h10M-16 -2h-4M16 -2h4M0 -14v-4" />
          <circle cx={0} cy={-20} r={2} className="fill-accent-alt" />
        </g>
      );
    case "systems":
      return (
        <g transform={`translate(${x} ${y})`} className="text-accent-alt">
          <rect {...s} x={-13} y={-14} width={26} height={8} rx={2} />
          <rect {...s} x={-13} y={-3} width={26} height={8} rx={2} />
          <rect {...s} x={-13} y={8} width={26} height={8} rx={2} />
          <circle cx={-7} cy={-10} r={1.4} className="fill-accent-alt" />
          <circle cx={-7} cy={1} r={1.4} className="fill-accent-alt" />
          <circle cx={-7} cy={12} r={1.4} className="fill-accent-alt" />
        </g>
      );
    case "data":
      return (
        <g transform={`translate(${x} ${y})`} className="text-accent-alt">
          <ellipse {...s} cx={0} cy={-10} rx={12} ry={4} />
          <path {...s} d="M-12 -10v8c0 2.5 5 4 12 4s12-1.5 12-4v-8" />
          <path {...s} d="M-12 -2c0 2.5 5 4 12 4s12-1.5 12-4" />
          <path {...s} d="M-12 4c0 2.5 5 4 12 4s12-1.5 12-4" />
          <path {...s} d="M-12 4v6c0 2.5 5 4 12 4s12-1.5 12-4v-6" />
        </g>
      );
    case "workflows":
      return (
        <g transform={`translate(${x} ${y})`} className="text-accent-alt">
          <rect {...s} x={-14} y={-12} width={12} height={8} rx={1.5} />
          <rect {...s} x={2} y={-4} width={12} height={8} rx={1.5} />
          <rect {...s} x={-14} y={4} width={12} height={8} rx={1.5} />
          <path {...s} d="M-2 -8h4M2 -8v8M-2 8h4" />
        </g>
      );
    case "governance":
      return (
        <g transform={`translate(${x} ${y})`} className="text-accent-alt">
          <path {...s} d="M0 -14l14 5v9c0 8-6 13-14 16-8-3-14-8-14-16v-9z" />
          <path {...s} d="M-5 1l4 4 8-9" />
        </g>
      );
    default:
      return null;
  }
}

function ContextIcon({ x, y }: { x: number; y: number }) {
  const pts = Array.from({ length: 7 }, (_, i) => {
    const a = (Math.PI * 2 * i) / 7 - Math.PI / 2;
    return [Math.cos(a) * 16, Math.sin(a) * 16] as const;
  });
  return (
    <g transform={`translate(${x} ${y})`} className="text-accent-alt">
      <polygon
        points={pts.map(([px, py]) => `${px},${py}`).join(" ")}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
      />
      <path
        d={pts.map(([px, py]) => `M0,0 L${px},${py}`).join(" ")}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
        opacity={0.7}
      />
      <circle cx={0} cy={0} r={3} className="fill-accent" />
    </g>
  );
}

function BrandMark({
  brand,
  active,
}: {
  brand: MeshBrandId;
  active: boolean;
}) {
  const mark = meshBrandMarks[brand];
  const color = active ? mark.color : "#6a807e";
  // Wordmark brands that collapse poorly at 14px — use a letter tile.
  if (brand === "sap" || brand === "aws" || brand === "mulesoft") {
    const letter =
      brand === "sap" ? "S" : brand === "aws" ? "A" : "M";
    return (
      <span
        aria-hidden
        style={{
          display: "grid",
          placeItems: "center",
          width: 16,
          height: 16,
          borderRadius: 4,
          background: active ? color : "#d7e4e1",
          color: active ? "#fff" : "#5f7a78",
          fontSize: 9,
          fontWeight: 700,
          lineHeight: 1,
          flexShrink: 0,
        }}
      >
        {letter}
      </span>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      width={14}
      height={14}
      aria-hidden
      style={{ display: "block", flexShrink: 0 }}
    >
      <path
        d={mark.path}
        fill={color}
        style={{ transition: "fill 320ms ease" }}
      />
    </svg>
  );
}

/** Steady packets — opacity stays high mid-path (no flicker). */
function Packet({
  pathId,
  delay,
  duration,
  reduced,
}: {
  pathId: string;
  delay: number;
  duration: number;
  reduced: boolean;
}) {
  if (reduced) return null;
  return (
    <circle r={3.5} className="fill-accent" opacity={0.9}>
      <animateMotion
        dur={`${duration}s`}
        begin={`${delay}s`}
        repeatCount="indefinite"
      >
        <mpath href={`#${pathId}`} />
      </animateMotion>
    </circle>
  );
}

function statusCopy(focus: FocusId): string {
  if (focus === "context") {
    return "Context attached to every action across the mesh";
  }
  const peer = coordinationMesh.peers.find((p) => p.id === focus);
  if (peer) {
    const sats = coordinationMesh.satellites
      .filter((s) => (s.attaches as readonly string[]).includes(peer.id))
      .map((s) => s.label);
    return sats.length
      ? `${peer.detail} · wired to ${sats.join(", ")}`
      : peer.detail;
  }
  const sat = coordinationMesh.satellites.find((s) => s.id === focus);
  if (sat) {
    return `${sat.label} (${sat.role}) · into ${sat.attaches.join(" · ")}`;
  }
  return "";
}

export function CoordinationMesh({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.35 });
  const [reduced, setReduced] = useState(false);
  const [tourIndex, setTourIndex] = useState(0);
  const [pinned, setPinned] = useState<FocusId | null>(null);
  const [live, setLive] = useState(false);
  const resumeTimer = useRef<number | null>(null);

  const focus: FocusId =
    pinned ?? coordinationMesh.tour[tourIndex] ?? "context";
  const related = relatedSet(focus);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (!inView) return;
    const t = window.setTimeout(() => setLive(true), reduced ? 0 : 700);
    return () => window.clearTimeout(t);
  }, [inView, reduced]);

  // Auto-tour while nothing is pinned
  useEffect(() => {
    if (!inView || reduced || pinned) return;
    const id = window.setInterval(() => {
      setTourIndex((i) => (i + 1) % coordinationMesh.tour.length);
    }, TOUR_MS);
    return () => window.clearInterval(id);
  }, [inView, reduced, pinned]);

  function pin(id: FocusId) {
    setPinned(id);
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => {
      setPinned(null);
    }, RESUME_MS);
  }

  useEffect(() => {
    return () => {
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    };
  }, []);

  const isLit = (id: string) => related.has(id);
  const edgeLit = (a: string, b: string) => related.has(a) && related.has(b);

  return (
    <div
      ref={rootRef}
      className={cn("coordination-mesh relative w-full", className)}
    >
      <svg
        viewBox="0 0 960 640"
        className="mx-auto h-auto w-full max-w-5xl"
        role="img"
        aria-label="EVOQ coordination mesh with Context at the center, peer capabilities, and enterprise systems including Salesforce, SAP, ServiceNow, Snowflake, Okta, and AWS."
      >
        <defs>
          <radialGradient id={`${uid}-glow`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#09A78D" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#09A78D" stopOpacity="0" />
          </radialGradient>
          <filter id={`${uid}-soft`} x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="3"
              floodColor="#0C2226"
              floodOpacity="0.08"
            />
          </filter>
        </defs>

        {[1, 2, 3].map((i) => (
          <motion.ellipse
            key={i}
            cx={CX}
            cy={CY + 40}
            rx={210 + i * 95}
            ry={78 + i * 32}
            fill="none"
            stroke="#d7e4e1"
            strokeWidth={1.2}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.5 - i * 0.1 } : { opacity: 0 }}
            transition={{ delay: 0.08 * i, duration: 0.7, ease: EASE }}
          />
        ))}

        <ellipse
          cx={CX}
          cy={CY}
          rx={200}
          ry={160}
          fill={`url(#${uid}-glow)`}
          opacity={0.85}
        />

        {/* Context → peer spokes: solid, stable (no dash flicker) */}
        {coordinationMesh.peers.map((peer, i) => {
          const p = PEER_POS[peer.id];
          const line = shorten(CX, CY, p.x, p.y, CONTEXT_R + 4, PEER_R + 4);
          const pathId = `${uid}-spoke-${peer.id}`;
          const d = `M ${line.x1} ${line.y1} L ${line.x2} ${line.y2}`;
          const lit = edgeLit("context", peer.id);
          return (
            <g key={peer.id}>
              <path id={pathId} d={d} fill="none" />
              <motion.path
                d={d}
                fill="none"
                stroke="#09A78D"
                strokeWidth={lit ? 2 : 1.35}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  inView
                    ? { pathLength: 1, opacity: lit ? 0.9 : 0.22 }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{
                  pathLength: {
                    delay: 0.3 + i * 0.05,
                    duration: 0.65,
                    ease: EASE,
                  },
                  opacity: { duration: 0.45, ease: "easeInOut" },
                  strokeWidth: { duration: 0.35 },
                }}
              />
              {live && lit ? (
                <Packet
                  pathId={pathId}
                  delay={0.2 + i * 0.15}
                  duration={2.8}
                  reduced={reduced}
                />
              ) : null}
            </g>
          );
        })}

        {/* Peer mesh chords */}
        {coordinationMesh.chords.map(([a, b], i) => {
          const pa = PEER_POS[a];
          const pb = PEER_POS[b];
          const line = shorten(pa.x, pa.y, pb.x, pb.y, PEER_R + 3, PEER_R + 3);
          const d = quadPath(
            line.x1,
            line.y1,
            line.x2,
            line.y2,
            i % 2 === 0 ? 0.15 : -0.12,
          );
          const pathId = `${uid}-chord-${a}-${b}`;
          const lit = edgeLit(a, b);
          const isGov = a === "governance" || b === "governance";
          return (
            <g key={`${a}-${b}`}>
              <path id={pathId} d={d} fill="none" />
              <motion.path
                d={d}
                fill="none"
                stroke={isGov ? "#337077" : "#7eb9a8"}
                strokeWidth={lit ? 1.85 : 1.25}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  inView
                    ? { pathLength: 1, opacity: lit ? 0.8 : 0.14 }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{
                  pathLength: {
                    delay: 0.5 + i * 0.04,
                    duration: 0.7,
                    ease: EASE,
                  },
                  opacity: { duration: 0.4, ease: "easeInOut" },
                }}
              />
              {live && lit ? (
                <Packet
                  pathId={pathId}
                  delay={0.4 + i * 0.2}
                  duration={3.4}
                  reduced={reduced}
                />
              ) : null}
            </g>
          );
        })}

        {/* Satellite tethers — strengthen when involved */}
        {coordinationMesh.satellites.map((sat, i) => {
          const sp = SAT_POS[sat.id];
          const primary = sat.attaches[0];
          const tp = PEER_POS[primary];
          if (!sp || !tp) return null;
          const line = shorten(sp.x, sp.y, tp.x, tp.y, 28, PEER_R + 6);
          const pathId = `${uid}-sat-${sat.id}`;
          const d = `M ${line.x1} ${line.y1} L ${line.x2} ${line.y2}`;
          const lit = isLit(sat.id);
          return (
            <g key={sat.id}>
              <path id={pathId} d={d} fill="none" />
              <motion.path
                d={d}
                fill="none"
                stroke="#09A78D"
                strokeWidth={lit ? 1.7 : 1.1}
                strokeDasharray={lit ? "0" : "3 5"}
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={
                  inView
                    ? { opacity: lit ? 0.85 : 0.12 }
                    : { opacity: 0 }
                }
                transition={{ duration: 0.4, ease: "easeInOut", delay: lit ? 0 : 0.02 }}
              />
              {live && lit ? (
                <Packet
                  pathId={pathId}
                  delay={0.1 + i * 0.12}
                  duration={2.4}
                  reduced={reduced}
                />
              ) : null}
            </g>
          );
        })}

        {/* Peers */}
        {coordinationMesh.peers.map((peer, i) => {
          const p = PEER_POS[peer.id];
          const lit = isLit(peer.id);
          const focused = focus === peer.id;
          return (
            <motion.g
              key={peer.id}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={
                inView
                  ? { opacity: lit ? 1 : 0.3, scale: focused ? 1.04 : 1 }
                  : { opacity: 0, scale: 0.88 }
              }
              transition={{
                delay: pinned ? 0 : 0.15 + i * 0.05,
                duration: 0.45,
                ease: EASE,
              }}
              style={{ transformOrigin: `${p.x}px ${p.y}px` }}
              className="cursor-pointer"
              onClick={() => pin(peer.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  pin(peer.id);
                }
              }}
              tabIndex={0}
              role="button"
              aria-pressed={focused}
              aria-label={`${peer.label}: ${peer.detail}`}
            >
              {focused ? (
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={PEER_R + 7}
                  fill="none"
                  stroke="#09A78D"
                  strokeWidth={1.4}
                  opacity={0.4}
                />
              ) : null}
              <circle
                cx={p.x}
                cy={p.y}
                r={PEER_R}
                fill="#ffffff"
                stroke={lit ? "#09A78D" : "#e2ecea"}
                strokeWidth={focused ? 2.25 : lit ? 1.75 : 1.4}
                filter={`url(#${uid}-soft)`}
              />
              <PeerIcon id={peer.id} x={p.x} y={p.y - 2} />
              <text
                x={p.x}
                y={p.y + PEER_R + 20}
                textAnchor="middle"
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  fill: lit ? "#0C2226" : "#8a9a98",
                  fontFamily:
                    "var(--font-geist-sans), ui-sans-serif, sans-serif",
                  transition: "fill 320ms ease",
                }}
              >
                {peer.label}
              </text>
            </motion.g>
          );
        })}

        {/* Context hub */}
        <motion.g
          initial={{ opacity: 0, scale: 0.82 }}
          animate={
            inView
              ? {
                  opacity: isLit("context") ? 1 : 0.3,
                  scale: focus === "context" ? 1.03 : 1,
                }
              : { opacity: 0, scale: 0.82 }
          }
          transition={{ delay: 0.05, duration: 0.55, ease: EASE }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
          className="cursor-pointer"
          onClick={() => pin("context")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              pin("context");
            }
          }}
          tabIndex={0}
          role="button"
          aria-pressed={focus === "context"}
          aria-label="Context: shared across every action"
        >
          <circle
            cx={CX}
            cy={CY}
            r={CONTEXT_R + 8}
            fill="none"
            stroke="#09A78D"
            strokeWidth={1}
            opacity={focus === "context" ? 0.35 : 0.18}
          />
          <circle
            cx={CX}
            cy={CY}
            r={CONTEXT_R}
            fill="#ffffff"
            stroke={isLit("context") ? "#09A78D" : "#d7e6e2"}
            strokeWidth={focus === "context" ? 2.25 : 1.75}
            filter={`url(#${uid}-soft)`}
          />
          <ContextIcon x={CX} y={CY - 10} />
          <text
            x={CX}
            y={CY + 22}
            textAnchor="middle"
            style={{
              fontSize: 15,
              fontWeight: 600,
              fill: "#0C2226",
              fontFamily: "var(--font-geist-sans), ui-sans-serif, sans-serif",
            }}
          >
            {coordinationMesh.context.label}
          </text>
        </motion.g>

        <text
          x={CX}
          y={CY + CONTEXT_R + 22}
          textAnchor="middle"
          style={{
            fontSize: 11,
            fontWeight: 500,
            fill: "#337077",
            fontFamily: "var(--font-geist-sans), ui-sans-serif, sans-serif",
            opacity: inView ? 0.9 : 0,
          }}
        >
          {coordinationMesh.context.caption}
        </text>

        {/* Brand satellites — foreignObject for crisp logos + labels */}
        {coordinationMesh.satellites.map((sat, i) => {
          const sp = SAT_POS[sat.id];
          if (!sp) return null;
          const lit = isLit(sat.id);
          const focused = focus === sat.id;
          const w = 108;
          const h = 36;
          return (
            <motion.g
              key={sat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={
                inView
                  ? {
                      opacity: lit ? 1 : 0.28,
                      y: focused ? -3 : 0,
                      scale: focused ? 1.06 : lit ? 1.02 : 1,
                    }
                  : { opacity: 0, y: 10 }
              }
              transition={{
                delay: pinned ? 0 : 0.85 + i * 0.04,
                duration: 0.4,
                ease: EASE,
              }}
              style={{ transformOrigin: `${sp.x}px ${sp.y}px` }}
              className="cursor-pointer"
              onClick={() => pin(sat.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  pin(sat.id);
                }
              }}
              tabIndex={0}
              role="button"
              aria-pressed={focused}
              aria-label={`${sat.label}, ${sat.role}`}
            >
              <rect
                x={sp.x - w / 2}
                y={sp.y - h / 2}
                width={w}
                height={h}
                rx={h / 2}
                fill="#ffffff"
                stroke={lit ? "#09A78D" : "#dce8e5"}
                strokeWidth={focused ? 1.9 : lit ? 1.5 : 1.2}
                filter={`url(#${uid}-soft)`}
              />
              <foreignObject
                x={sp.x - w / 2 + 10}
                y={sp.y - 10}
                width={w - 16}
                height={20}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    height: "100%",
                    fontFamily:
                      "var(--font-geist-sans), ui-sans-serif, sans-serif",
                  }}
                >
                  <BrandMark brand={sat.brand} active={lit} />
                  <div style={{ minWidth: 0, lineHeight: 1.1 }}>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: lit ? "#0C2226" : "#7a8c8a",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {sat.label}
                    </div>
                    <div
                      style={{
                        fontSize: 9,
                        color: lit ? "#337077" : "#9aadaa",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {sat.role}
                    </div>
                  </div>
                </div>
              </foreignObject>
            </motion.g>
          );
        })}
      </svg>

      <p
        className="mt-2 text-center font-mono text-[11px] text-text-muted"
        aria-live="polite"
      >
        {pinned
          ? `${statusCopy(focus)} · click elsewhere or wait to resume tour`
          : statusCopy(focus)}
      </p>
    </div>
  );
}
