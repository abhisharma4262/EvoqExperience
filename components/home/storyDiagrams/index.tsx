"use client";

import type { ComponentType } from "react";
import type { SceneProps } from "./primitives";
import {
  AdmissionsScene,
  CheckoutScene,
  EnrollmentScene,
  FraudScene,
  IncidentsScene,
  OnboardingScene,
  PlatformScene,
  RulesScene,
  SupportScene,
} from "./scenes";

const scenes: Record<string, ComponentType<SceneProps>> = {
  "enrollment-in-five": EnrollmentScene,
  "finance-inside-checkout": CheckoutScene,
  "admissions-in-an-hour": AdmissionsScene,
  "platform-that-keeps-pace": PlatformScene,
  "rules-that-answer": RulesScene,
  "onboarding-without-friction": OnboardingScene,
  "incidents-that-heal": IncidentsScene,
  "fraud-in-the-moment": FraudScene,
  "support-without-escalation": SupportScene,
};

export function StoryDiagram({
  storyId,
  playing,
}: {
  storyId: string;
  playing: boolean;
}) {
  const Scene = scenes[storyId];
  if (!Scene) {
    return (
      <div
        className="story-scene mt-auto flex h-[168px] items-center justify-center rounded-xl border border-accent-alt/12 text-sm text-text-muted"
        role="img"
        aria-label="Story diagram unavailable"
      >
        Diagram coming soon
      </div>
    );
  }
  return <Scene playing={playing} />;
}
