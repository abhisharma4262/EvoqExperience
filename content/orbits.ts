import type { ModeId } from "./offerings";
import type { MediaSlotContent } from "./offerings";

export type OrbitContent = {
  mode: ModeId;
  question: string;
  label: string;
  line: string;
  scenario: {
    lines: string[];
    visual?: MediaSlotContent;
  };
  doorway: string;
  returnTarget: "transform" | "operate" | "compounding";
  href: "/create" | "/transform" | "/operate";
};

export const orbits: OrbitContent[] = [
  {
    mode: "create",
    label: "Create",
    line: "Build what comes next",
    question: "What if the next capability didn’t wait on a project plan?",
    scenario: {
      lines: [
        "Monday, 9:14 AM. A Chief Digital Officer asks for a direct booking channel that can compete with the OTAs.",
        "By Friday, it’s in production, with enterprise context and governance attached to every step.",
      ],
      visual: {
        alt: "Create mode: product build console",
        aspectRatio: "16 / 10",
      },
    },
    doorway: "Step inside Create",
    returnTarget: "transform",
    href: "/create",
  },
  {
    mode: "transform",
    label: "Transform",
    line: "Modernise what already exists",
    question: "What if modernisation reused what the enterprise already knows?",
    scenario: {
      lines: [
        "A retail bank’s Salesforce assessment used to take two months.",
        "With Evoq, it takes eight hours, and the map carries institutional context the last consulting cycle missed.",
      ],
      visual: {
        alt: "Transform mode: modernization assessment console",
        aspectRatio: "16 / 10",
      },
    },
    doorway: "Step inside Transform",
    returnTarget: "operate",
    href: "/transform",
  },
  {
    mode: "operate",
    label: "Operate",
    line: "Operate what is critical",
    question: "What if operations improved while they ran?",
    scenario: {
      lines: [
        "A P&C insurer opens Monday to find weekend claims volume already triaged, routed, and, where policy allowed, settled.",
        "No pager storm. Every action is explainable and grounded in how the enterprise actually works.",
      ],
      visual: {
        alt: "Operate mode: autonomous operations console",
        aspectRatio: "16 / 10",
      },
    },
    doorway: "Step inside Operate",
    returnTarget: "compounding",
    href: "/operate",
  },
];

export function getOrbit(mode: ModeId): OrbitContent {
  const orbit = orbits.find((o) => o.mode === mode);
  if (!orbit) throw new Error(`Unknown orbit: ${mode}`);
  return orbit;
}
