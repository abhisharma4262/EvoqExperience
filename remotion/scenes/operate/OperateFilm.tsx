import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Series,
  useCurrentFrame,
} from "remotion";
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

type Status = "new" | "routing" | "resolved" | "escalated";
type Incident = { id: string; label: string; status: Status };

function buildIncidents(frame: number): Incident[] {
  const tick = Math.floor(
    interpolate(frame, [0, 220], [0, 14], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const list: Incident[] = [
    { id: "i1", label: "FNOL-1042", status: "new" },
    { id: "i2", label: "FNOL-1043", status: "new" },
    { id: "i3", label: "FNOL-1044", status: "new" },
  ];

  for (let t = 1; t <= tick; t += 1) {
    const index = (t - 1) % list.length;
    const item = list[index]!;
    if (item.status === "new") list[index] = { ...item, status: "routing" };
    else if (item.status === "routing") {
      list[index] = {
        ...item,
        status: item.id === "i3" ? "escalated" : "resolved",
      };
    }
    if (t % 4 === 0 && list.length < 8) {
      list.push({
        id: `i${list.length + 1}`,
        label: `FNOL-104${list.length + 2}`,
        status: "new",
      });
    }
  }
  return list;
}

const Open: React.FC = () => (
  <SceneShell accent={colors.highlightOnDark}>
    <CameraPush amount={1.08}>
      <div>
        <ModeStamp label="Operate" />
        <div style={{ marginTop: 120 }}>
          <KineticLine size={120} delay={8}>
            Operate
          </KineticLine>
          <KineticLine
            size={40}
            delay={24}
            weight={500}
            color="rgba(246,243,240,0.75)"
          >
            Run critical work — without a war room.
          </KineticLine>
        </div>
      </div>
    </CameraPush>
  </SceneShell>
);

const Pressure: React.FC = () => {
  const room = rooms.operate;
  const frame = useCurrentFrame();
  const strike = frame > 70;

  return (
    <SceneShell>
      <ModeStamp label="Operate" />
      <div style={{ marginTop: 56 }}>
        <KineticLine size={60} delay={4}>
          {room.moment}
        </KineticLine>
      </div>
      <ChipRow items={room.oldWay} delay={28} strike={strike} />
      {strike ? (
        <div style={{ marginTop: 40 }}>
          <KineticLine size={34} delay={0} color={colors.highlightOnDark}>
            Hero culture is not a runtime.
          </KineticLine>
        </div>
      ) : null}
    </SceneShell>
  );
};

const LiveBoard: React.FC = () => {
  const frame = useCurrentFrame();
  const incidents = buildIncidents(frame);
  const autoResolved = incidents.filter((i) => i.status === "resolved").length;
  const escalated = incidents.filter((i) => i.status === "escalated").length;
  const columns = ["new", "routing", "resolved"] as const;

  return (
    <SceneShell accent={colors.accent}>
      <ModeStamp label="Operate" />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
          gap: 24,
        }}
      >
        <KineticLine size={46} delay={2}>
          Operations runtime — live
        </KineticLine>
        <div
          className="remotion-mono"
          style={{ fontSize: 24, color: "rgba(246,243,240,0.7)" }}
        >
          {incidents.length} incidents · {autoResolved} auto · {escalated} human
        </div>
      </div>
      <div
        style={{
          marginTop: 36,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 20,
        }}
      >
        {columns.map((column) => (
          <div
            key={column}
            style={{
              borderRadius: 24,
              border: "1px solid rgba(246,243,240,0.12)",
              background: "rgba(6,20,22,0.55)",
              padding: 22,
              minHeight: 420,
            }}
          >
            <div
              style={{
                fontSize: 18,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: colors.accentOnDark,
                marginBottom: 16,
              }}
            >
              {column}
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              {incidents
                .filter((i) =>
                  column === "resolved"
                    ? i.status === "resolved" || i.status === "escalated"
                    : i.status === column,
                )
                .map((incident, index) => {
                  const opacity = interpolate(
                    frame,
                    [index * 4, index * 4 + 10],
                    [0.4, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                  );
                  return (
                    <div
                      key={incident.id}
                      style={{
                        opacity,
                        borderRadius: 14,
                        padding: "14px 16px",
                        fontSize: 24,
                        background:
                          incident.status === "escalated"
                            ? "rgba(229,253,132,0.22)"
                            : "rgba(246,243,240,0.08)",
                        border:
                          incident.status === "escalated"
                            ? `1px solid ${colors.highlightOnDark}`
                            : "1px solid transparent",
                        color: colors.onDark,
                      }}
                    >
                      {incident.label}
                      {incident.status === "escalated" ? " · human" : ""}
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </SceneShell>
  );
};

const PolicyBeat: React.FC = () => (
  <SceneShell>
    <ModeStamp label="Operate" />
    <KineticLine size={52} delay={4}>
      Policy-shaped automation
    </KineticLine>
    <FloatingCard x={120} y={320} delay={18} width={760}>
      <div
        style={{
          fontSize: 18,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: colors.accentOnDark,
          marginBottom: 12,
        }}
      >
        Runtime explain
      </div>
      <div style={{ fontSize: 30, lineHeight: 1.45 }}>
        Agent routed FNOL using severity policy `claims.fnol.auto-triage`.
        Settlement under threshold. Escalations keep human oversight and a full
        audit trail.
      </div>
    </FloatingCard>
    <FloatingCard x={980} y={360} delay={34} width={420} rotate={2}>
      <div style={{ fontSize: 22, color: colors.highlightOnDark }}>Guardrails</div>
      <div style={{ marginTop: 14, fontSize: 26, lineHeight: 1.4 }}>
        Severity · threshold · human-in-loop · audit
      </div>
    </FloatingCard>
  </SceneShell>
);

const PulseStats: React.FC = () => {
  const frame = useCurrentFrame();
  const pct = Math.round(
    interpolate(frame, [0, 100], [0, 40], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  return (
    <SceneShell accent={colors.accentOnDark}>
      <ModeStamp label="Operate" />
      <KineticLine size={48} delay={2}>
        Weekend volume, already moving
      </KineticLine>
      <div
        style={{
          marginTop: 60,
          fontSize: 180,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          color: colors.accentOnDark,
          textShadow: `0 0 40px ${colors.accentOnDark}66`,
        }}
      >
        {pct}%
      </div>
      <KineticLine size={36} delay={16} weight={500} color="rgba(246,243,240,0.8)">
        of FNOL volume auto-resolved before the war room opens
      </KineticLine>
    </SceneShell>
  );
};

const Close: React.FC = () => {
  const room = rooms.operate;
  return (
    <OutcomeFinale
      mode="Operate"
      outcome={room.outcome}
      quote={room.quote}
      attribution={room.quoteAttribution}
    />
  );
};

export const OperateFilm: React.FC = () => {
  const f = PRODUCT_SECTION_FRAMES.operate;
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
          <LiveBoard />
        </Series.Sequence>
        <Series.Sequence durationInFrames={f.actionB}>
          <PolicyBeat />
        </Series.Sequence>
        <Series.Sequence durationInFrames={f.governed}>
          <PulseStats />
        </Series.Sequence>
        <Series.Sequence durationInFrames={f.close}>
          <Close />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
