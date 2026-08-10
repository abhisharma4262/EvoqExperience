import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, remotionBrand } from "../lib/brand";

export function Soundtrack() {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const volume = interpolate(
    frame,
    [0, 18, durationInFrames - 45, durationInFrames],
    [0, 0.55, 0.55, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Wallpaper — Kevin MacLeod (incompetech.com), CC BY 4.0 — peppy electronic demo bed
  return (
    <Audio src={staticFile("audio/launch-bed.mp3")} volume={volume} loop />
  );
}

export function FilmBackground({
  accent = colors.accent,
  intensity = 1,
}: {
  accent?: string;
  intensity?: number;
}) {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, 300], [0, 40], {
    extrapolateRight: "extend",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 90% at ${50 + Math.sin(drift / 40) * 8}% ${40 + Math.cos(drift / 55) * 6}%, ${accent}22 0%, ${colors.darkBg} 42%, #061416 100%)`,
      }}
    >
      <AbsoluteFill
        style={{
          opacity: 0.22 * intensity,
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(229,253,132,0.18), transparent 35%), radial-gradient(circle at 80% 70%, rgba(82,224,129,0.16), transparent 40%)",
          transform: `translateY(${drift * 0.15}px)`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          opacity: 0.05,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
        }}
      />
    </AbsoluteFill>
  );
}

export function KineticLine({
  children,
  delay = 0,
  size = 78,
  color = colors.onDark,
  weight = 650,
}: {
  children: React.ReactNode;
  delay?: number;
  size?: number;
  color?: string;
  weight?: number;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 90, mass: 0.8 },
  });
  const y = interpolate(enter, [0, 1], [48, 0]);
  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const blur = interpolate(enter, [0, 1], [8, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        filter: `blur(${blur}px)`,
        fontSize: size,
        lineHeight: 1.08,
        fontWeight: weight,
        letterSpacing: "-0.03em",
        color,
        maxWidth: 1500,
      }}
    >
      {children}
    </div>
  );
}

export function ModeStamp({
  label,
  delay = 0,
}: {
  label: string;
  delay?: number;
}) {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        display: "inline-flex",
        alignItems: "center",
        gap: 14,
        fontSize: 22,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: colors.accentOnDark,
        fontWeight: 700,
      }}
    >
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: 999,
          background: colors.accentOnDark,
          boxShadow: `0 0 18px ${colors.accentOnDark}`,
        }}
      />
      {remotionBrand.name} · {label}
    </div>
  );
}

export function ChipRow({
  items,
  delay = 0,
  strike = false,
}: {
  items: string[];
  delay?: number;
  strike?: boolean;
}) {
  const frame = useCurrentFrame();

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 36 }}>
      {items.map((item, index) => {
        const start = delay + index * 8;
        const opacity = interpolate(frame, [start, start + 14], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const y = interpolate(frame, [start, start + 14], [20, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={item}
            style={{
              opacity,
              transform: `translateY(${y}px)`,
              borderRadius: 999,
              border: "1px solid rgba(246,243,240,0.18)",
              background: "rgba(246,243,240,0.06)",
              padding: "14px 22px",
              fontSize: 24,
              color: strike ? "rgba(246,243,240,0.45)" : colors.onDark,
              textDecoration: strike ? "line-through" : "none",
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}

export function FloatingCard({
  children,
  x,
  y,
  delay = 0,
  width = 420,
  rotate = 0,
}: {
  children: React.ReactNode;
  x: number;
  y: number;
  delay?: number;
  width?: number;
  rotate?: number;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 16, stiffness: 80 },
  });
  const float = Math.sin((frame + delay) / 18) * 6;
  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const scale = interpolate(enter, [0, 1], [0.92, 1]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + float,
        width,
        opacity,
        transform: `scale(${scale}) rotate(${rotate}deg)`,
        borderRadius: 24,
        border: "1px solid rgba(82,224,129,0.28)",
        background: "rgba(12,34,38,0.82)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
        backdropFilter: "blur(10px)",
        padding: 24,
        color: colors.onDark,
      }}
    >
      {children}
    </div>
  );
}

export function SceneShell({
  children,
  accent,
}: {
  children: React.ReactNode;
  accent?: string;
}) {
  const frame = useCurrentFrame();
  const fadeOut = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      <FilmBackground accent={accent} />
      <AbsoluteFill style={{ padding: "72px 88px" }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
}

export function CameraPush({
  children,
  amount = 1.06,
}: {
  children: React.ReactNode;
  amount?: number;
}) {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 120], [1, amount], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ transform: `scale(${scale})` }}>{children}</AbsoluteFill>
  );
}

export function OutcomeFinale({
  mode,
  outcome,
  quote,
  attribution,
}: {
  mode: string;
  outcome: string;
  quote: string;
  attribution: string;
}) {
  return (
    <SceneShell>
      <ModeStamp label={mode} />
      <div style={{ marginTop: 48 }}>
        <KineticLine size={70} delay={6}>
          {outcome}
        </KineticLine>
      </div>
      <div style={{ marginTop: 48, maxWidth: 1200 }}>
        <KineticLine size={36} delay={22} weight={500} color="rgba(246,243,240,0.82)">
          “{quote}”
        </KineticLine>
        <KineticLine size={24} delay={34} weight={500} color={colors.highlightOnDark}>
          {attribution}
        </KineticLine>
      </div>
      <div
        style={{
          position: "absolute",
          left: 88,
          bottom: 72,
          fontSize: 28,
          letterSpacing: "0.12em",
          fontWeight: 700,
          color: colors.accentOnDark,
        }}
      >
        {remotionBrand.name}
      </div>
    </SceneShell>
  );
}
