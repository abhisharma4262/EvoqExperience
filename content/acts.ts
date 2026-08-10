export type ActId = 1 | 2 | 3 | 4;
export type SectionId =
  | "industry"
  | "challenge"
  | "work"
  | "evoq"
  | "modes"
  | "compounding"
  | "close";

export type Act = {
  id: ActId;
  label: string;
  shortLabel: string;
  sectionIds: SectionId[];
  anchorId: string;
};

export const acts: Act[] = [
  {
    id: 1,
    label: "Shift",
    shortLabel: "Shift",
    sectionIds: ["industry"],
    anchorId: "story-shift",
  },
  {
    id: 2,
    label: "Execution",
    shortLabel: "Execution",
    sectionIds: ["challenge", "work"],
    anchorId: "story-execution",
  },
  {
    id: 3,
    label: "Evoq",
    shortLabel: "Evoq",
    sectionIds: ["evoq", "modes"],
    anchorId: "story-evoq",
  },
  {
    id: 4,
    label: "Next",
    shortLabel: "Next",
    sectionIds: ["compounding", "close"],
    anchorId: "story-next",
  },
];

export const sectionToAct: Record<SectionId, ActId> = {
  industry: 1,
  challenge: 2,
  work: 2,
  evoq: 3,
  modes: 3,
  compounding: 4,
  close: 4,
};

export const sectionAnchors: Record<SectionId, string> = {
  industry: "section-industry",
  challenge: "section-challenge",
  work: "section-work",
  evoq: "section-evoq",
  modes: "section-modes",
  compounding: "section-compounding",
  close: "section-close",
};
