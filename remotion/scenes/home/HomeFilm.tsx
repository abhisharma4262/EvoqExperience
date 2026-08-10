import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Series,
  useCurrentFrame,
} from "remotion";
import { home } from "../../../content/home";
import {
  CameraPush,
  ChipRow,
  KineticLine,
  ModeStamp,
  SceneShell,
  Soundtrack,
} from "../../components/cinematic";
import { colors, remotionBrand } from "../../lib/brand";
import { HOME_SECTION_FRAMES } from "../../lib/timing";
import { ContinuumVisual, KnowledgeVisual, ModesVisual } from "./visuals";

const Open: React.FC = () => (
  <SceneShell accent={colors.accentOnDark}>
    <CameraPush amount={1.1}>
      <div>
        <ModeStamp label="Enterprise Execution" />
        <div style={{ marginTop: 140 }}>
          <KineticLine size={150} delay={6}>
            {remotionBrand.name}
          </KineticLine>
          <KineticLine
            size={40}
            delay={24}
            weight={500}
            color="rgba(246,243,240,0.78)"
          >
            {remotionBrand.tagline}
          </KineticLine>
        </div>
      </div>
    </CameraPush>
  </SceneShell>
);

const Industry: React.FC = () => (
  <SceneShell>
    <ModeStamp label="The shift" />
    <div style={{ marginTop: 48 }}>
      <KineticLine size={68} delay={4}>
        {home.industry.title}
      </KineticLine>
      <div style={{ marginTop: 28 }}>
        <KineticLine
          size={34}
          delay={22}
          weight={500}
          color="rgba(246,243,240,0.78)"
        >
          {home.industry.body}
        </KineticLine>
      </div>
    </div>
  </SceneShell>
);

const Challenge: React.FC = () => {
  const frame = useCurrentFrame();
  const gap = interpolate(frame, [20, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneShell accent={colors.highlightOnDark}>
      <ModeStamp label={home.challenge.eyebrow} />
      <div style={{ marginTop: 48 }}>
        <KineticLine size={64} delay={4}>
          {home.challenge.title}
        </KineticLine>
        <div style={{ marginTop: 28 }}>
          <KineticLine
            size={32}
            delay={20}
            weight={500}
            color="rgba(246,243,240,0.78)"
          >
            {home.challenge.body}
          </KineticLine>
        </div>
      </div>
      <div
        style={{
          marginTop: 56,
          display: "grid",
          gridTemplateColumns: "1fr 120px 1fr",
          alignItems: "center",
          maxWidth: 1100,
          opacity: gap,
        }}
      >
        <div
          style={{
            borderRadius: 22,
            border: "1px solid rgba(246,243,240,0.14)",
            padding: 28,
            fontSize: 28,
            color: "rgba(246,243,240,0.7)",
          }}
        >
          AI accelerates moments
        </div>
        <div
          style={{
            textAlign: "center",
            fontSize: 42,
            color: colors.highlightOnDark,
            fontWeight: 700,
          }}
        >
          →
        </div>
        <div
          style={{
            borderRadius: 22,
            border: `1px solid ${colors.accentOnDark}`,
            background: "rgba(82,224,129,0.12)",
            padding: 28,
            fontSize: 28,
            color: colors.onDark,
          }}
        >
          Execution creates outcomes
        </div>
      </div>
    </SceneShell>
  );
};

/** Local wrapper so Continuum can sit in flow without absolute coords */
function FlowCard({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame, [delay, delay + 16], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        borderRadius: 24,
        border: "1px solid rgba(82,224,129,0.28)",
        background: "rgba(12,34,38,0.82)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
        padding: 28,
      }}
    >
      {children}
    </div>
  );
}

const WorkScene: React.FC = () => (
  <SceneShell>
    <ModeStamp label={home.work.eyebrow} />
    <div
      style={{
        marginTop: 36,
        display: "grid",
        gridTemplateColumns: "1.05fr 0.95fr",
        gap: 36,
        alignItems: "center",
      }}
    >
      <div>
        <KineticLine size={56} delay={4}>
          {home.work.title}
        </KineticLine>
        <div style={{ marginTop: 24 }}>
          <KineticLine
            size={30}
            delay={18}
            weight={500}
            color="rgba(246,243,240,0.78)"
          >
            {home.work.body}
          </KineticLine>
        </div>
      </div>
      <FlowCard delay={20}>
        <ContinuumVisual />
      </FlowCard>
    </div>
  </SceneShell>
);

const Evoq: React.FC = () => (
  <SceneShell accent={colors.accent}>
    <ModeStamp label={home.evoq.eyebrow} />
    <div
      style={{
        marginTop: 28,
        display: "grid",
        gridTemplateColumns: "1.15fr 0.85fr",
        gap: 28,
        alignItems: "center",
      }}
    >
      <div>
        <KineticLine size={56} delay={4}>
          {home.evoq.title}
        </KineticLine>
        <div style={{ marginTop: 18 }}>
          <KineticLine size={28} delay={16} color={colors.highlightOnDark}>
            {home.evoq.category}
          </KineticLine>
        </div>
        <div style={{ marginTop: 22 }}>
          <KineticLine
            size={30}
            delay={24}
            weight={500}
            color="rgba(246,243,240,0.78)"
          >
            {home.evoq.body}
          </KineticLine>
        </div>
      </div>
      <FlowCard delay={18}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <KnowledgeVisual />
        </div>
      </FlowCard>
    </div>
  </SceneShell>
);

const Modes: React.FC = () => (
  <SceneShell>
    <ModeStamp label={home.modes.eyebrow} />
    <div style={{ marginTop: 36 }}>
      <KineticLine size={54} delay={4}>
        {home.modes.title}
      </KineticLine>
      <div style={{ marginTop: 20 }}>
        <KineticLine
          size={32}
          delay={18}
          weight={500}
          color="rgba(246,243,240,0.78)"
        >
          {home.modes.intro}
        </KineticLine>
      </div>
    </div>
    <div style={{ marginTop: 36 }}>
      <FlowCard delay={24}>
        <ModesVisual />
      </FlowCard>
    </div>
  </SceneShell>
);

const Compounding: React.FC = () => {
  const items = ["Patterns", "Reuse", "Speed", "Smarter delivery"];
  return (
    <SceneShell accent={colors.accentOnDark}>
      <ModeStamp label={home.compounding.eyebrow} />
      <div style={{ marginTop: 48 }}>
        <KineticLine size={60} delay={4}>
          {home.compounding.title}
        </KineticLine>
        <div style={{ marginTop: 24 }}>
          <KineticLine
            size={32}
            delay={18}
            weight={500}
            color="rgba(246,243,240,0.78)"
          >
            {home.compounding.body}
          </KineticLine>
        </div>
      </div>
      <ChipRow items={items} delay={36} />
    </SceneShell>
  );
};

const Close: React.FC = () => (
  <SceneShell>
    <ModeStamp label="Next" />
    <div style={{ marginTop: 80 }}>
      <KineticLine size={72} delay={6}>
        {home.close.walkthrough.title}
      </KineticLine>
      <div style={{ marginTop: 24 }}>
        <KineticLine
          size={34}
          delay={20}
          weight={500}
          color="rgba(246,243,240,0.78)"
        >
          {remotionBrand.tagline}
        </KineticLine>
      </div>
    </div>
    <div style={{ marginTop: 48, display: "flex", gap: 18 }}>
      <div
        style={{
          borderRadius: 18,
          background: colors.accentOnDark,
          color: colors.darkBg,
          padding: "18px 28px",
          fontSize: 26,
          fontWeight: 700,
        }}
      >
        {home.close.walkthrough.cta}
      </div>
      <div
        style={{
          borderRadius: 18,
          border: `1px solid ${colors.accentOnDark}`,
          color: colors.onDark,
          padding: "18px 28px",
          fontSize: 26,
          fontWeight: 650,
        }}
      >
        {home.close.deepDive.cta}
      </div>
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

export const HomeFilmStory: React.FC = () => {
  const f = HOME_SECTION_FRAMES;
  return (
    <AbsoluteFill>
      <Soundtrack />
      <Series>
        <Series.Sequence durationInFrames={f.open}>
          <Open />
        </Series.Sequence>
        <Series.Sequence durationInFrames={f.industry}>
          <Industry />
        </Series.Sequence>
        <Series.Sequence durationInFrames={f.challenge}>
          <Challenge />
        </Series.Sequence>
        <Series.Sequence durationInFrames={f.work}>
          <WorkScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={f.evoq}>
          <Evoq />
        </Series.Sequence>
        <Series.Sequence durationInFrames={f.modes}>
          <Modes />
        </Series.Sequence>
        <Series.Sequence durationInFrames={f.compounding}>
          <Compounding />
        </Series.Sequence>
        <Series.Sequence durationInFrames={f.close}>
          <Close />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
