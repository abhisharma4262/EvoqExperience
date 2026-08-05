export type ActId = 1 | 2 | 3;
export type SectionId =
  | "industry"
  | "challenge"
  | "evoq"
  | "modes"
  | "compounding"
  | "stories"
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
    label: "Act 1: Context",
    shortLabel: "Context",
    sectionIds: ["industry", "challenge"],
    anchorId: "act-1",
  },
  {
    id: 2,
    label: "Act 2: EVOQ",
    shortLabel: "EVOQ",
    sectionIds: ["evoq", "modes"],
    anchorId: "act-2",
  },
  {
    id: 3,
    label: "Act 3: Next",
    shortLabel: "Next",
    sectionIds: ["compounding", "stories", "close"],
    anchorId: "act-3",
  },
];

export const sectionToAct: Record<SectionId, ActId> = {
  industry: 1,
  challenge: 1,
  evoq: 2,
  modes: 2,
  compounding: 3,
  stories: 3,
  close: 3,
};

export const sectionAnchors: Record<SectionId, string> = {
  industry: "section-industry",
  challenge: "section-challenge",
  evoq: "section-evoq",
  modes: "section-modes",
  compounding: "section-compounding",
  stories: "section-stories",
  close: "section-close",
};
