import type { CompositionId } from "@/remotion/lib/timing";

export const videosPage = {
  title: "Evoq videos",
  description: "See how Evoq makes enterprise knowledge executable.",
  soundHint: "Press play with sound on.",
  cta: "Book a walkthrough",
  ctaSecondary: "How execution works",
  films: {
    HomeFilm: {
      label: "Evoq",
      synopsis:
        "AI is rewriting how work gets done, Evoq turns knowledge into execution leaders can trust",
    },
    CreateLaunch: {
      label: "Create",
      synopsis:
        "From business intent to production systems. Watch Create turn requirements, context, and governance into software that ships.",
    },
    TransformLaunch: {
      label: "Transform",
      synopsis:
        "Modernize without losing control. See Transform migrate and rebuild complex estates while policy and oversight stay attached to every step.",
    },
    OperateLaunch: {
      label: "Operate",
      synopsis:
        "Keep the enterprise running. Operate shows how executable knowledge coordinates people, agents, and systems when the work never stops.",
    },
  } satisfies Record<
    CompositionId,
    {
      label: string;
      synopsis: string;
    }
  >,
} as const;
