import React from "react";
import { AbsoluteFill, interpolate, Series, useCurrentFrame } from "remotion";
import { rooms } from "../../../content/rooms";
import {
  CameraPush,
  ChipRow,
  KineticLine,
  ModeStamp,
  OutcomeFinale,
  SceneShell,
  Soundtrack,
} from "../../components/cinematic";
import { colors } from "../../lib/brand";
import { PRODUCT_SECTION_FRAMES } from "../../lib/timing";

const categories = [
  "Data model",
  "Automations",
  "Integrations",
  "Technical debt",
  "Security",
  "Governance",
];

const clockSteps = ["00:47", "01:23", "03:04", "07:59"];

const Open: React.FC = () => (
  <SceneShell accent={colors.accentAlt}>
    <CameraPush amount={1.08}>
      <div>
        <ModeStamp label="Transform" />
        <div style={{ marginTop: 120 }}>
          <KineticLine size={120} delay={8}>
            Transform
          </KineticLine>
          <KineticLine
            size={40}
            delay={24}
            weight={500}
            color="rgba(246,243,240,0.75)"
          >
            Modernise what exists — before lunch, not in two months.
          </KineticLine>
        </div>
      </div>
    </CameraPush>
  </SceneShell>
);

const Pressure: React.FC = () => {
  const room = rooms.transform;
  const frame = useCurrentFrame();
  const strike = frame > 70;

  return (
    <SceneShell>
      <ModeStamp label="Transform" />
      <div style={{ marginTop: 56 }}>
        <KineticLine size={60} delay={4}>
          {room.moment}
        </KineticLine>
      </div>
      <ChipRow items={room.oldWay} delay={28} strike={strike} />
      {strike ? (
        <div style={{ marginTop: 40 }}>
          <KineticLine size={34} delay={0} color={colors.highlightOnDark}>
            Workshops and slideware cannot keep pace.
          </KineticLine>
        </div>
      ) : null}
    </SceneShell>
  );
};

const LegacyScan: React.FC = () => {
  const frame = useCurrentFrame();
  const tiles = ["Objects", "Workflows", "Integrations", "Custom code"];
  const scanY = interpolate(frame, [0, 150], [0, 420], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneShell>
      <ModeStamp label="Transform" />
      <KineticLine size={48} delay={2}>
        Legacy Salesforce org under assessment
      </KineticLine>
      <div
        style={{
          marginTop: 40,
          position: "relative",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          maxWidth: 980,
        }}
      >
        {tiles.map((tile, index) => {
          const lit = frame > 20 + index * 12;
          return (
            <div
              key={tile}
              style={{
                borderRadius: 22,
                border: lit
                  ? "1px solid rgba(82,224,129,0.45)"
                  : "1px solid rgba(246,243,240,0.12)",
                background: lit
                  ? "rgba(9,167,141,0.14)"
                  : "rgba(246,243,240,0.04)",
                padding: "36px 28px",
                fontSize: 30,
                color: colors.onDark,
                boxShadow: lit ? `0 0 30px ${colors.accent}33` : "none",
              }}
            >
              {tile}
            </div>
          );
        })}
        <div
          style={{
            position: "absolute",
            left: -8,
            right: -8,
            top: scanY,
            height: 4,
            background: `linear-gradient(90deg, transparent, ${colors.highlightOnDark}, transparent)`,
            boxShadow: `0 0 20px ${colors.highlightOnDark}`,
          }}
        />
      </div>
    </SceneShell>
  );
};

const Assessment: React.FC = () => {
  const frame = useCurrentFrame();
  const speeds = [1.05, 0.78, 0.92, 0.7, 0.86, 0.98];
  const clockIndex = Math.min(
    clockSteps.length - 1,
    Math.floor(
      interpolate(frame, [10, 200], [0, clockSteps.length - 0.01], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    ),
  );

  return (
    <SceneShell accent={colors.accent}>
      <ModeStamp label="Transform" />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
          gap: 24,
        }}
      >
        <KineticLine size={48} delay={2}>
          Assessment in motion
        </KineticLine>
        <div
          className="remotion-mono"
          style={{ fontSize: 34, color: colors.highlightOnDark }}
        >
          Elapsed {clockSteps[clockIndex]}
        </div>
      </div>
      <div style={{ marginTop: 40, display: "grid", gap: 18, maxWidth: 1100 }}>
        {categories.map((category, index) => {
          const value = Math.min(
            100,
            interpolate(frame, [8, 210], [0, 100 * speeds[index]!], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          );
          return (
            <div key={category}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                  fontSize: 24,
                  color: colors.onDark,
                }}
              >
                <span>{category}</span>
                <span style={{ color: "rgba(246,243,240,0.55)" }}>
                  {Math.round(value)}%
                </span>
              </div>
              <div
                style={{
                  height: 10,
                  borderRadius: 999,
                  background: "rgba(246,243,240,0.1)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${value}%`,
                    height: "100%",
                    background: `linear-gradient(90deg, ${colors.accentAlt}, ${colors.accentOnDark})`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </SceneShell>
  );
};

const MapReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const highlight = Math.min(
    categories.length - 1,
    Math.floor(frame / 18) % categories.length,
  );

  return (
    <SceneShell>
      <ModeStamp label="Transform" />
      <KineticLine size={52} delay={2}>
        A governed map — not a slide deck
      </KineticLine>
      <div
        style={{
          marginTop: 40,
          display: "flex",
          flexWrap: "wrap",
          gap: 14,
          maxWidth: 1200,
        }}
      >
        {categories.map((category, index) => {
          const active = index === highlight;
          const opacity = interpolate(frame, [8 + index * 6, 20 + index * 6], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={category}
              style={{
                opacity,
                borderRadius: 999,
                border: active
                  ? `1px solid ${colors.accentOnDark}`
                  : "1px solid rgba(246,243,240,0.16)",
                background: active
                  ? "rgba(82,224,129,0.16)"
                  : "rgba(246,243,240,0.05)",
                padding: "16px 24px",
                fontSize: 24,
                color: colors.onDark,
                transform: active ? "scale(1.06)" : "scale(1)",
              }}
            >
              {category}
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 36 }}>
        <KineticLine size={30} delay={20} weight={500} color="rgba(246,243,240,0.8)">
          Risk scored. Owners mapped. Remediation path drafted.
        </KineticLine>
      </div>
    </SceneShell>
  );
};

const Close: React.FC = () => {
  const room = rooms.transform;
  return (
    <OutcomeFinale
      mode="Transform"
      outcome={room.outcome}
      quote={room.quote}
      attribution={room.quoteAttribution}
    />
  );
};

export const TransformFilm: React.FC = () => {
  const f = PRODUCT_SECTION_FRAMES.transform;
  return (
    <AbsoluteFill>
      <Soundtrack />
      <Series>
        <Series.Sequence durationInFrames={f.open}>
          <Open />
        </Series.Sequence>
        <Series.Sequence durationInFrames={f.pressure}>
          <Pressure />
        </Series.Sequence>
        <Series.Sequence durationInFrames={f.actionA}>
          <LegacyScan />
        </Series.Sequence>
        <Series.Sequence durationInFrames={f.actionB}>
          <Assessment />
        </Series.Sequence>
        <Series.Sequence durationInFrames={f.governed}>
          <MapReveal />
        </Series.Sequence>
        <Series.Sequence durationInFrames={f.close}>
          <Close />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
