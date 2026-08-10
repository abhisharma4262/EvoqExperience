import React from "react";
import { AbsoluteFill, interpolate, Series, useCurrentFrame } from "remotion";
import { rooms } from "../../../content/rooms";
import {
  CameraPush,
  ChipRow,
  FloatingCard,
  KineticLine,
  ModeStamp,
  OutcomeFinale,
  SceneShell,
  Soundtrack,
} from "../../components/cinematic";
import { colors } from "../../lib/brand";
import { PRODUCT_SECTION_FRAMES } from "../../lib/timing";

const prompt =
  "Build me a direct booking channel that competes with OTAs: one that plans, books, and manages multi-leg trips.";

const agents = [
  "Discovering requirements…",
  "Generating schema…",
  "Provisioning environment…",
  "Writing API contracts…",
  "Deploying preview…",
];

const Open: React.FC = () => (
  <SceneShell accent={colors.accent}>
    <CameraPush amount={1.08}>
      <div>
        <ModeStamp label="Create" />
        <div style={{ marginTop: 120 }}>
          <KineticLine size={140} delay={8}>
            Create
          </KineticLine>
          <KineticLine
            size={40}
            delay={24}
            weight={500}
            color="rgba(246,243,240,0.75)"
          >
            Build what comes next — with governed agents.
          </KineticLine>
        </div>
      </div>
    </CameraPush>
  </SceneShell>
);

const Pressure: React.FC = () => {
  const room = rooms.create;
  const frame = useCurrentFrame();
  const strike = frame > 70;

  return (
    <SceneShell>
      <ModeStamp label="Create" />
      <div style={{ marginTop: 56 }}>
        <KineticLine size={64} delay={4}>
          {room.moment}
        </KineticLine>
      </div>
      <ChipRow items={room.oldWay} delay={28} strike={strike} />
      {strike ? (
        <div style={{ marginTop: 40 }}>
          <KineticLine size={34} delay={0} color={colors.highlightOnDark}>
            The old way breaks under the deadline.
          </KineticLine>
        </div>
      ) : null}
    </SceneShell>
  );
};

const Brief: React.FC = () => {
  const frame = useCurrentFrame();
  const typed = Math.floor(
    interpolate(frame, [10, 140], [0, prompt.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  return (
    <SceneShell accent="#09A78D">
      <ModeStamp label="Create" />
      <KineticLine size={42} delay={4} color={colors.highlightOnDark}>
        Brief the work itself
      </KineticLine>
      <div
        style={{
          marginTop: 40,
          borderRadius: 28,
          border: "1px solid rgba(82,224,129,0.28)",
          background: "rgba(6,20,22,0.75)",
          padding: 40,
          minHeight: 360,
          boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
        }}
      >
        <div
          style={{
            fontSize: 18,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(246,243,240,0.45)",
            marginBottom: 24,
          }}
        >
          Chief Digital Officer · prompt
        </div>
        <p
          className="remotion-mono"
          style={{
            margin: 0,
            fontSize: 34,
            lineHeight: 1.5,
            color: colors.onDark,
          }}
        >
          {prompt.slice(0, typed)}
          <span
            style={{
              display: "inline-block",
              width: 3,
              height: 28,
              marginLeft: 4,
              background: colors.accentOnDark,
              opacity: frame % 18 < 10 ? 1 : 0.15,
              verticalAlign: "middle",
            }}
          />
        </p>
      </div>
    </SceneShell>
  );
};

const Swarm: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, 220], [8, 92], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const agentCount = Math.min(
    agents.length,
    Math.floor(
      interpolate(frame, [10, 160], [0, agents.length], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    ),
  );

  const positions = [
    { x: 80, y: 220, rotate: -3 },
    { x: 620, y: 180, rotate: 2 },
    { x: 1120, y: 240, rotate: -2 },
    { x: 220, y: 480, rotate: 3 },
    { x: 900, y: 500, rotate: -1 },
  ];

  return (
    <SceneShell>
      <ModeStamp label="Create" />
      <KineticLine size={48} delay={2}>
        Agents at work
      </KineticLine>
      <div style={{ position: "relative", flex: 1, marginTop: 24, minHeight: 520 }}>
        {agents.slice(0, agentCount).map((agent, index) => {
          const pos = positions[index]!;
          return (
            <FloatingCard
              key={agent}
              x={pos.x}
              y={pos.y}
              delay={index * 10}
              rotate={pos.rotate}
              width={380}
            >
              <div
                style={{
                  fontSize: 16,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: colors.accentOnDark,
                  marginBottom: 10,
                }}
              >
                Agent {index + 1}
              </div>
              <div style={{ fontSize: 26 }}>{agent}</div>
            </FloatingCard>
          );
        })}
      </div>
      <div style={{ marginTop: 12 }}>
        <div
          style={{
            height: 12,
            borderRadius: 999,
            background: "rgba(246,243,240,0.12)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: `linear-gradient(90deg, ${colors.accent}, ${colors.accentOnDark})`,
              boxShadow: `0 0 24px ${colors.accentOnDark}`,
            }}
          />
        </div>
      </div>
    </SceneShell>
  );
};

const Governed: React.FC = () => {
  const frame = useCurrentFrame();
  const lines = [
    "[policy] data residency: approved",
    "[audit] agent.schema.write: allowed",
    "[policy] human approval gate: preview deploy",
    "[audit] environment.provision: complete",
  ];

  return (
    <SceneShell accent={colors.accentOnDark}>
      <ModeStamp label="Create" />
      <KineticLine size={56} delay={4}>
        Governed all the way to preview
      </KineticLine>
      <div style={{ marginTop: 40, display: "grid", gap: 16, maxWidth: 980 }}>
        {lines.map((line, index) => {
          const start = 16 + index * 14;
          const opacity = interpolate(frame, [start, start + 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const x = interpolate(frame, [start, start + 12], [-24, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={line}
              className="remotion-mono"
              style={{
                opacity,
                transform: `translateX(${x}px)`,
                borderRadius: 18,
                border: "1px solid rgba(82,224,129,0.25)",
                background: "rgba(12,34,38,0.7)",
                padding: "18px 24px",
                fontSize: 26,
                color: colors.onDark,
              }}
            >
              {line}
            </div>
          );
        })}
      </div>
      {frame > 90 ? (
        <div
          style={{
            marginTop: 36,
            display: "inline-flex",
            borderRadius: 18,
            background: colors.accentOnDark,
            color: colors.darkBg,
            padding: "16px 26px",
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          Preview environment ready
        </div>
      ) : null}
    </SceneShell>
  );
};

const Close: React.FC = () => {
  const room = rooms.create;
  return (
    <OutcomeFinale
      mode="Create"
      outcome={room.outcome}
      quote={room.quote}
      attribution={room.quoteAttribution}
    />
  );
};

export const CreateFilm: React.FC = () => {
  const f = PRODUCT_SECTION_FRAMES.create;
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
          <Brief />
        </Series.Sequence>
        <Series.Sequence durationInFrames={f.actionB}>
          <Swarm />
        </Series.Sequence>
        <Series.Sequence durationInFrames={f.governed}>
          <Governed />
        </Series.Sequence>
        <Series.Sequence durationInFrames={f.close}>
          <Close />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
