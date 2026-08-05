export type ModeId = "create" | "transform" | "operate";

export type MediaSlotContent = {
  src?: string;
  alt: string;
  aspectRatio?: string;
  caption?: string;
};

export type Offering = {
  slug: string;
  mode: ModeId;
  name: string;
  flagship: boolean;
  scenarioLine: string;
  metricId?: string;
  screenshot?: MediaSlotContent;
};

export const offerings: Offering[] = [
  {
    slug: "mvp-as-a-service",
    mode: "create",
    name: "MVP-as-a-Service",
    flagship: true,
    scenarioLine:
      "A Chief Digital Officer opens a chat Monday morning. By Friday, a new channel is in production.",
    metricId: "mvp",
  },
  {
    slug: "requirements-as-a-service",
    mode: "create",
    name: "Requirements-as-a-Service",
    flagship: false,
    scenarioLine:
      "Discovery that used to take weeks becomes a governed conversation in days.",
    metricId: "discovery",
  },
  {
    slug: "agentic-engineering",
    mode: "create",
    name: "Agentic Engineering",
    flagship: false,
    scenarioLine:
      "Engineering agents draft, test, and wire; humans decide what ships.",
  },
  {
    slug: "data-ai-analytics",
    mode: "create",
    name: "Data · AI · Analytics",
    flagship: false,
    scenarioLine:
      "Data products stop waiting on projects and start compounding with every engagement.",
  },
  {
    slug: "salesforce-consulting-as-a-service",
    mode: "transform",
    name: "Salesforce Consulting-as-a-Service",
    flagship: true,
    scenarioLine:
      "A two-month Salesforce assessment finishes before lunch, and is more accurate.",
    metricId: "salesforce",
  },
  {
    slug: "ai-led-modernization",
    mode: "transform",
    name: "AI-led Modernization",
    flagship: false,
    scenarioLine:
      "Legacy systems are mapped, risked, and rewired with a governed modernization path.",
  },
  {
    slug: "eval-as-a-service",
    mode: "transform",
    name: "EVAL-as-a-Service",
    flagship: false,
    scenarioLine:
      "Evaluation becomes continuous evidence, not a one-time slide deck.",
  },
  {
    slug: "quality-engineering",
    mode: "transform",
    name: "Quality Engineering",
    flagship: false,
    scenarioLine:
      "Quality shifts left into the runtime. Defects never become operations debt.",
  },
  {
    slug: "ai-native-support",
    mode: "operate",
    name: "AI-Native Support",
    flagship: true,
    scenarioLine:
      "Weekend volume is triaged, routed, and settled, with every action explainable.",
  },
  {
    slug: "autonomous-diagnostics",
    mode: "operate",
    name: "Autonomous Diagnostics",
    flagship: false,
    scenarioLine:
      "Incidents are diagnosed before humans are paged. Escalation is the exception.",
  },
  {
    slug: "continuous-quality",
    mode: "operate",
    name: "Continuous Quality",
    flagship: false,
    scenarioLine:
      "Production quality is observed, scored, and improved on every cycle.",
  },
  {
    slug: "operational-intelligence",
    mode: "operate",
    name: "Operational Intelligence",
    flagship: false,
    scenarioLine:
      "Operations stop reporting after the fact and start steering in real time.",
  },
];

export function getOfferingsByMode(mode: ModeId): Offering[] {
  return offerings.filter((o) => o.mode === mode);
}

export function getFlagship(mode: ModeId): Offering {
  const flagship = offerings.find((o) => o.mode === mode && o.flagship);
  if (!flagship) {
    throw new Error(`No flagship for mode: ${mode}`);
  }
  return flagship;
}

export function getSidecarOfferings(mode: ModeId): Offering[] {
  return offerings.filter((o) => o.mode === mode && !o.flagship);
}
