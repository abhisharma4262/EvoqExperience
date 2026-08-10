import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { colors, remotionBrand } from "../lib/brand";

export function Stage({
  children,
  dark = false,
  style,
}: {
  children: React.ReactNode;
  dark?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="remotion-root"
      style={{
        background: dark ? colors.darkBg : colors.bg,
        color: dark ? colors.onDark : colors.textPrimary,
        padding: 80,
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function FadeIn({
  children,
  delay = 0,
  duration = 20,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  style?: React.CSSProperties;
}) {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(frame, [delay, delay + duration], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ opacity, transform: `translateY(${translateY}px)`, ...style }}>
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <p
      style={{
        margin: 0,
        fontSize: 22,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: dark ? colors.accentOnDark : colors.textMuted,
        fontWeight: 600,
      }}
    >
      {children}
    </p>
  );
}

export function Title({
  children,
  dark = false,
  size = 72,
}: {
  children: React.ReactNode;
  dark?: boolean;
  size?: number;
}) {
  return (
    <h1
      style={{
        margin: "20px 0 0",
        fontSize: size,
        lineHeight: 1.1,
        fontWeight: 650,
        letterSpacing: "-0.02em",
        color: dark ? colors.onDark : colors.textPrimary,
        maxWidth: 1400,
      }}
    >
      {children}
    </h1>
  );
}

export function Body({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <p
      style={{
        margin: "28px 0 0",
        fontSize: 32,
        lineHeight: 1.45,
        color: dark ? "rgba(246,243,240,0.78)" : colors.textSecondary,
        maxWidth: 1100,
      }}
    >
      {children}
    </p>
  );
}

export function Panel({
  children,
  style,
  dark = false,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  dark?: boolean;
}) {
  return (
    <div
      style={{
        borderRadius: 28,
        border: dark
          ? "1px solid rgba(82,224,129,0.22)"
          : "1px solid rgba(51,112,119,0.18)",
        background: dark ? "rgba(22,52,57,0.75)" : colors.surface,
        padding: 36,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function BrandMark({ dark = false }: { dark?: boolean }) {
  return (
    <div
      style={{
        fontSize: 28,
        fontWeight: 700,
        letterSpacing: "0.08em",
        color: dark ? colors.accentOnDark : colors.accentAlt,
      }}
    >
      {remotionBrand.name}
    </div>
  );
}

export function ProgressBar({
  value,
  accent = colors.accent,
}: {
  value: number;
  accent?: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      style={{
        height: 10,
        borderRadius: 999,
        background: "rgba(51,112,119,0.12)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${clamped}%`,
          height: "100%",
          background: accent,
          borderRadius: 999,
        }}
      />
    </div>
  );
}
