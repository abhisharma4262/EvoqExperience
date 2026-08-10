import type { ModeId } from "./offerings";

export type RoomContent = {
  mode: ModeId;
  title: string;
  moment: string;
  oldWay: string[];
  outcome: string;
  quote: string;
  quoteAttribution: string;
  sidecarIntro: string;
  demoAriaLabel: string;
};

export const rooms: Record<ModeId, RoomContent> = {
  create: {
    mode: "create",
    title: "Create",
    moment: "The board wants a working demo by Monday. Today is Friday afternoon.",
    oldWay: ["6 people", "6 weeks", "4 tools", "2 handoffs"],
    outcome: "Concept to production: 5 days.",
    quote: "We stopped briefing agencies and started briefing the work itself.",
    quoteAttribution: "Chief Digital Officer, global hotel group",
    sidecarIntro: "Three more ways EVOQ creates",
    demoAriaLabel: "Create archetypes: compositions for building with agents",
  },
  transform: {
    mode: "transform",
    title: "Transform",
    moment: "Leadership wants the assessment answer before lunch, not in two months.",
    oldWay: ["12 workshops", "8 weeks", "3 consultants", "Stale slides"],
    outcome: "Assessment complete: 8 hours.",
    quote: "We walked in expecting a project. We walked out with a governed map.",
    quoteAttribution: "Chief Data Officer, retail bank",
    sidecarIntro: "Three more ways EVOQ transforms",
    demoAriaLabel: "Transform archetypes: compositions for modernizing with agents",
  },
  operate: {
    mode: "operate",
    title: "Operate",
    moment: "Monday morning. Weekend volume already moved, without a war room.",
    oldWay: ["Pager storms", "Opaque triage", "Slow settlement", "No audit trail"],
    outcome: "40% of weekend FNOL volume already resolved.",
    quote: "Operations finally feels like a system, not a hero culture.",
    quoteAttribution: "Head of Claims, P&C insurer",
    sidecarIntro: "Three more ways EVOQ operates",
    demoAriaLabel: "Operate archetypes: compositions for running critical work",
  },
};
