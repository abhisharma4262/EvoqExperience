import type { ModeId } from "./offerings";

export type CaseStoryIcon =
  | "chat"
  | "checkout"
  | "admissions"
  | "platform"
  | "rules"
  | "onboarding"
  | "heal"
  | "fraud"
  | "support";

export type CaseStory = {
  id: string;
  mode: ModeId;
  /** Short, catchy title */
  title: string;
  /** Masked client descriptor — never a legal name */
  client: string;
  /** Logo path under /public; empty = monogram placeholder */
  logoSrc?: string;
  /** What we did — the intervention, in plain consulting language */
  did: string;
  /** Big outcome figure shown as hero metric (e.g. "85%") */
  outcomeValue: string;
  /** Optional numeric for count-up when value is a plain integer */
  outcomeNumeric?: number;
  outcomeSuffix?: string;
  /** Short outcome label under the figure */
  outcomeLabel: string;
  /** What changed — business consequence */
  result: string;
  icon: CaseStoryIcon;
};

export const caseStudies: CaseStory[] = [
  // ── Create ──────────────────────────────────────────────
  {
    id: "enrollment-in-five",
    mode: "create",
    title: "Enrollment in five",
    client: "National youth membership organization",
    did: "Built a conversational AI agent that guides families through membership signup and completes backend enrollment steps.",
    outcomeValue: "80%",
    outcomeNumeric: 80,
    outcomeSuffix: "%",
    outcomeLabel: "faster membership enrollment",
    result:
      "A 25-minute form path became a five-minute conversation families finish.",
    icon: "chat",
  },
  {
    id: "finance-inside-checkout",
    mode: "create",
    title: "Finance inside checkout",
    client: "5th-largest U.S. bank",
    did: "Embedded buy-now-pay-later into merchant checkout and automated underwriting into the CRM the moment a plugin installs.",
    outcomeValue: "85%",
    outcomeNumeric: 85,
    outcomeSuffix: "%",
    outcomeLabel: "faster merchant onboarding",
    result:
      "Merchants go live without manual credentialing; checkout approvals rose with the offer in-cart.",
    icon: "checkout",
  },
  {
    id: "admissions-in-an-hour",
    mode: "create",
    title: "Admissions in an hour",
    client: "National education network",
    did: "Deployed an admissions agent for status questions and AI document verification on the application CRM.",
    outcomeValue: "1 hr",
    outcomeLabel: "document checks, down from 5 days",
    result:
      "Staff stop drowning in status tickets; applicants move while documents still clear.",
    icon: "admissions",
  },

  // ── Transform ───────────────────────────────────────────
  {
    id: "platform-that-keeps-pace",
    mode: "transform",
    title: "Platform that keeps pace",
    client: "5th-largest U.S. bank",
    did: "Broke payment monoliths into guarded microservices with continuous delivery and security in the release path.",
    outcomeValue: "60%",
    outcomeNumeric: 60,
    outcomeSuffix: "%",
    outcomeLabel: "faster feature delivery",
    result:
      "Cross-product releases ship without betting the platform; availability held at 99.99%.",
    icon: "platform",
  },
  {
    id: "rules-that-answer",
    mode: "transform",
    title: "Rules that answer back",
    client: "Major vacation-ownership brand",
    did: "Connected pricing and inventory rules into a queryable graph so analysts ask impact questions in plain language.",
    outcomeValue: "70%",
    outcomeNumeric: 70,
    outcomeSuffix: "%",
    outcomeLabel: "less manual impact analysis",
    result:
      "A rule change’s blast radius across brands is visible before anyone publishes it.",
    icon: "rules",
  },
  {
    id: "onboarding-without-friction",
    mode: "transform",
    title: "Onboarding without friction",
    client: "Global food & retail delivery platform",
    did: "Unified merchant onboarding on one CRM, with guided quoting and live links into contracts and ERP.",
    outcomeValue: "2×",
    outcomeNumeric: 2,
    outcomeSuffix: "×",
    outcomeLabel: "improvement in merchant retention",
    result:
      "Sellers stop juggling tools; merchants activate faster and stay.",
    icon: "onboarding",
  },

  // ── Operate ─────────────────────────────────────────────
  {
    id: "incidents-that-heal",
    mode: "operate",
    title: "Incidents that heal",
    client: "Global entertainment & hospitality leader",
    did: "Wired journey telemetry to an AI triage layer that can restart and clear failing booking services on its own.",
    outcomeValue: "60%",
    outcomeNumeric: 60,
    outcomeSuffix: "%",
    outcomeLabel: "faster incident triage",
    result:
      "Guest journeys recover before pager storms; humans handle exceptions, not every blip.",
    icon: "heal",
  },
  {
    id: "fraud-in-the-moment",
    mode: "operate",
    title: "Fraud in the moment",
    client: "Major U.S. payments platform",
    did: "Scored transactions in the authorization window and blocked high-risk ones before settlement, with cases for investigators.",
    outcomeValue: "$10M+",
    outcomeLabel: "annual fraud loss avoided",
    result:
      "Fraud is stopped in-flight, not discovered in last night’s batch.",
    icon: "fraud",
  },
  {
    id: "support-without-escalation",
    mode: "operate",
    title: "Support without escalation",
    client: "Global foodservice distribution network",
    did: "Stood up 24×7 triage with runbooks so most platform incidents resolve at the first touch.",
    outcomeValue: "87%",
    outcomeNumeric: 87,
    outcomeSuffix: "%",
    outcomeLabel: "tickets resolved without escalation",
    result:
      "Global data operations stay up across time zones without a hero queue.",
    icon: "support",
  },
];

export function getCaseStudiesByMode(mode: ModeId): CaseStory[] {
  return caseStudies.filter((story) => story.mode === mode);
}

export function getCaseStudy(id: string): CaseStory | undefined {
  return caseStudies.find((story) => story.id === id);
}
