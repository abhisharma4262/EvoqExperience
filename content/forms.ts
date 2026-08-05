export type LeadPath = "walkthrough" | "runtime-deep-dive";

export const forms = {
  lead: {
    titleWalkthrough: "Book an executive walkthrough",
    titleDeepDive: "Explore the runtime deep-dive",
    subtitle:
      "Tell us who you are. We’ll follow up with a focused conversation, not a generic demo queue.",
    fields: {
      name: { label: "Name", placeholder: "Your name" },
      company: { label: "Company", placeholder: "Organization" },
      email: { label: "Work email", placeholder: "you@company.com" },
      note: {
        label: "What should we focus on?",
        placeholder: "Optional context for the conversation",
      },
    },
    submit: "Request conversation",
    success: "Thank you. We’ll be in touch shortly.",
    error: "Something went wrong. Please try again.",
  },
} as const;
