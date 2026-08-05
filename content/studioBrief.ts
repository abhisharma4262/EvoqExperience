export type BriefChoice = {
  id: string;
  label: string;
};

export type StudioBriefAnswers = {
  description: string;
  helpChips: string[];
  helpOther: string;
  audience: string;
  audienceOther: string;
  priorities: string[];
  prioritiesOther: string;
  readiness: string;
  readinessOther: string;
  selectedNameId: string;
  customName: string;
};

export const briefHelpChips: BriefChoice[] = [
  { id: "book", label: "Book or buy something" },
  { id: "find", label: "Find information" },
  { id: "requests", label: "Manage requests / approvals" },
  { id: "track", label: "Track progress or status" },
  { id: "serve", label: "Serve customers / partners" },
];

export const briefAudienceOptions: BriefChoice[] = [
  { id: "customers", label: "Customers or guests" },
  { id: "employees", label: "Your employees / internal teams" },
  { id: "partners", label: "Business partners or vendors" },
  { id: "both", label: "Both customers and staff" },
];

export const briefPriorityOptions: BriefChoice[] = [
  { id: "polished", label: "Looks polished and easy to try" },
  { id: "real-flow", label: "Handles real requests / bookings / data" },
  { id: "roles", label: "Different people see different things" },
  { id: "payments", label: "Payments or checkout" },
  { id: "share", label: "Ready to share as a demo link" },
];

export const briefReadinessOptions: BriefChoice[] = [
  { id: "rough", label: "Rough draft I can react to quickly" },
  { id: "stakeholder", label: "Solid demo for stakeholders" },
  { id: "pilot", label: "Close to something we could pilot with real users" },
];

export const briefNameSuggestions = [
  { id: "harbor-direct", label: "Harbor Direct" },
  { id: "stayline", label: "Stayline" },
  { id: "guestpath", label: "GuestPath" },
] as const;

export const studioBriefDefaults: StudioBriefAnswers = {
  description:
    "Let guests search stays, pick a room, and book direct — without calling the hotel.",
  helpChips: ["book"],
  helpOther: "",
  audience: "customers",
  audienceOther: "",
  priorities: ["polished", "share"],
  prioritiesOther: "",
  readiness: "stakeholder",
  readinessOther: "",
  selectedNameId: "harbor-direct",
  customName: "",
};

export const briefSteps = [
  {
    id: "description",
    title: "What do you want this app to help with?",
    hint: "A sentence or two is enough. You can edit anytime.",
  },
  {
    id: "audience",
    title: "Who will use it?",
    hint: "This helps us shape the experience for the right people.",
  },
  {
    id: "priorities",
    title: "What’s most important in the first version?",
    hint: "Pick up to two. We’ll focus the first build on these.",
  },
  {
    id: "readiness",
    title: "How finished should “ready to share” feel?",
    hint: "Sets how polished the first preview should be.",
  },
  {
    id: "name",
    title: "Pick a working name",
    hint: "Suggested from your description — change it whenever you like.",
  },
] as const;

export type BriefStepId = (typeof briefSteps)[number]["id"];

function labelFor(
  options: BriefChoice[],
  id: string,
  otherText: string,
): string {
  if (id === "other") {
    return otherText.trim() || "Other";
  }
  return options.find((o) => o.id === id)?.label ?? id;
}

export function resolveBriefAppName(answers: StudioBriefAnswers): string {
  if (answers.selectedNameId === "custom") {
    const custom = answers.customName.trim();
    return custom || "Untitled application";
  }
  return (
    briefNameSuggestions.find((n) => n.id === answers.selectedNameId)?.label ??
    "Untitled application"
  );
}

export function buildBriefPrompt(answers: StudioBriefAnswers): string {
  const name = resolveBriefAppName(answers);
  const audience = labelFor(
    briefAudienceOptions,
    answers.audience,
    answers.audienceOther,
  );
  const readiness = labelFor(
    briefReadinessOptions,
    answers.readiness,
    answers.readinessOther,
  );

  const priorityLabels = answers.priorities
    .map((id) =>
      id === "other"
        ? answers.prioritiesOther.trim() || "Other"
        : briefPriorityOptions.find((o) => o.id === id)?.label,
    )
    .filter((label): label is string => Boolean(label));

  const chipLabels = answers.helpChips
    .map((id) => briefHelpChips.find((c) => c.id === id)?.label)
    .filter(Boolean);
  if (answers.helpOther.trim()) {
    chipLabels.push(answers.helpOther.trim());
  }

  const lines = [
    `Build ${name}: ${answers.description.trim()}`,
    "",
    `Audience: ${audience}.`,
    priorityLabels.length
      ? `First version priorities: ${priorityLabels.join("; ")}.`
      : null,
    `Ready-to-share bar: ${readiness}.`,
    chipLabels.length ? `Focus areas: ${chipLabels.join(", ")}.` : null,
  ].filter((line): line is string => line !== null);

  return lines.join("\n");
}

export function buildBriefSubtitle(answers: StudioBriefAnswers): string {
  const audience = labelFor(
    briefAudienceOptions,
    answers.audience,
    answers.audienceOther,
  );
  const readiness = labelFor(
    briefReadinessOptions,
    answers.readiness,
    answers.readinessOther,
  );
  return `${audience} · ${readiness}`;
}
