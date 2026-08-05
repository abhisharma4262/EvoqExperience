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
    question: "What if the next product launch didn’t need a project plan?",
    scenario: {
      lines: [
        "Monday, 9:14 AM. A Chief Digital Officer asks for a direct booking channel that can compete with the OTAs.",
        "By Friday, it’s in production, with governance attached to every step.",
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
    line: "Modernize what already runs",
    question: "What if a two-month assessment was done before lunch?",
    scenario: {
      lines: [
        "A retail bank’s Salesforce assessment used to take two months.",
        "With EVOQ, it takes eight hours, and the map is more accurate than the last consulting cycle.",
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
    line: "Run what can’t fail",
    question: "What if operations improved while they ran?",
    scenario: {
      lines: [
        "A P&C insurer opens Monday to find weekend claims volume already triaged, routed, and, where policy allowed, settled.",
        "No pager storm. Every action explainable.",
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
