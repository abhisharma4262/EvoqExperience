import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors } from "../../lib/brand";

export function ContinuumVisual() {
  const frame = useCurrentFrame();
  const pulse = interpolate(frame % 60, [0, 30, 60], [0.55, 1, 0.55]);
  const nodes = [
    { x: 80, y: 120, label: "Intent" },
    { x: 280, y: 70, label: "Context" },
    { x: 480, y: 140, label: "Action" },
    { x: 680, y: 90, label: "Outcome" },
  ];

  return (
    <svg width={820} height={260} viewBox="0 0 820 260">
      <path
        d="M80 120 C220 40, 360 200, 480 140 S640 40, 680 90"
        fill="none"
        stroke={colors.accent}
        strokeWidth={3}
        opacity={0.55}
      />
      {nodes.map((node, index) => {
        const appear = interpolate(frame, [index * 12, index * 12 + 18], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <g key={node.label} opacity={appear}>
            <circle
              cx={node.x}
              cy={node.y}
              r={22}
              fill="rgba(12,34,38,0.9)"
              stroke={colors.accentOnDark}
              strokeWidth={2}
            />
            <circle
              cx={node.x}
              cy={node.y}
              r={8}
              fill={colors.accentOnDark}
              opacity={pulse}
            />
            <text
              x={node.x}
              y={node.y + 48}
              textAnchor="middle"
              fill={colors.onDark}
              fontSize={20}
              fontFamily="Segoe UI, sans-serif"
            >
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function KnowledgeVisual() {
  const frame = useCurrentFrame();
  const rings = [70, 110, 150];

  return (
    <svg width={420} height={420} viewBox="0 0 420 420">
      <circle cx={210} cy={210} r={36} fill={colors.accent} />
      <text
        x={210}
        y={218}
        textAnchor="middle"
        fill={colors.onDark}
        fontSize={18}
        fontWeight={700}
        fontFamily="Segoe UI, sans-serif"
      >
        EVOQ
      </text>
      {rings.map((radius, index) => {
        const spin = (frame * (0.8 + index * 0.25)) % 360;
        return (
          <g key={radius} transform={`rotate(${spin} 210 210)`}>
            <circle
              cx={210}
              cy={210}
              r={radius}
              fill="none"
              stroke={colors.accentAlt}
              strokeWidth={1.5}
              strokeDasharray="8 10"
              opacity={0.45}
            />
            <circle
              cx={210 + radius}
              cy={210}
              r={10}
              fill={index % 2 === 0 ? colors.accent : colors.chart1}
            />
          </g>
        );
      })}
    </svg>
  );
}

export function ModesVisual() {
  const frame = useCurrentFrame();
  const modes = [
    { label: "Create", x: 120, y: 180 },
    { label: "Transform", x: 360, y: 90 },
    { label: "Operate", x: 600, y: 180 },
  ];
  const active = Math.floor(frame / 45) % modes.length;

  return (
    <svg width={760} height={300} viewBox="0 0 760 300">
      <circle
        cx={360}
        cy={160}
        r={48}
        fill={colors.darkBg}
        stroke={colors.accentOnDark}
        strokeWidth={3}
      />
      <text
        x={360}
        y={168}
        textAnchor="middle"
        fill={colors.onDark}
        fontSize={20}
        fontWeight={700}
        fontFamily="Segoe UI, sans-serif"
      >
        Engine
      </text>
      {modes.map((mode, index) => {
        const isActive = index === active;
        return (
          <g key={mode.label}>
            <line
              x1={360}
              y1={160}
              x2={mode.x}
              y2={mode.y}
              stroke={isActive ? colors.accent : colors.accentAlt}
              strokeWidth={isActive ? 3 : 1.5}
              opacity={isActive ? 0.9 : 0.35}
            />
            <circle
              cx={mode.x}
              cy={mode.y}
              r={isActive ? 42 : 34}
              fill={isActive ? "rgba(82,224,129,0.18)" : "rgba(246,243,240,0.06)"}
              stroke={isActive ? colors.accentOnDark : colors.accentAlt}
              strokeWidth={2}
            />
            <text
              x={mode.x}
              y={mode.y + 6}
              textAnchor="middle"
              fill={colors.onDark}
              fontSize={20}
              fontWeight={650}
              fontFamily="Segoe UI, sans-serif"
            >
              {mode.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
