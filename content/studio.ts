export const studio = {
  productName: "Dream It. Build It.",
  studioName: "Evoq Studio",
  tagline: "Dream It. Build It.",
  landingSubcopy:
    "An execution studio where agents draft, wire, and preview — and you decide what goes live.",
  planCta: "Plan your vision",
  launchCta: "Build with Evoq →",
  exampleCta: "Open example: Aurora Direct app",
  loginHint: "Demo access: any email and password works.",
  sampleProject: {
    id: "aurora-direct",
    name: "Aurora Direct",
    exampleLabel: "Example project",
    description:
      "Example: OTA-competitive direct booking for a global hotel group",
    shortBlurb:
      "A sample app you can open to see how a finished build looks — search, rooms, and booking preview.",
    stack: ["Next.js", "Convex", "Stripe", "Mapbox"],
    status: "Preview live",
    lastEdited: "2 hours ago",
    url: "aurora-direct.evoq.app",
  },
  blankPromptPlaceholder:
    "Describe the application you want to build — flows, users, constraints, and what ‘done’ looks like…",
  notifications: [
    {
      id: "n1",
      title: "Preview environment ready",
      body: "Example · Aurora Direct · eu-west-1 · policy gates passed",
      time: "12m ago",
      unread: true,
    },
    {
      id: "n2",
      title: "Agent run completed",
      body: "schema.write + api.contracts · 4 files changed",
      time: "2h ago",
      unread: true,
    },
    {
      id: "n3",
      title: "Governance checkpoint",
      body: "Human approval required before production promote",
      time: "Yesterday",
      unread: false,
    },
  ],
  sidebarNav: [
    { id: "projects", label: "Projects", icon: "folders" },
    { id: "files", label: "Files", icon: "files" },
    { id: "agents", label: "Agents", icon: "bot" },
    { id: "runtime", label: "Runtime", icon: "activity" },
    { id: "deploy", label: "Deploy", icon: "rocket" },
    { id: "settings", label: "Settings", icon: "settings" },
  ],
  files: [
    { path: "app/page.tsx", kind: "tsx" },
    { path: "app/search/page.tsx", kind: "tsx" },
    { path: "components/BookingSearch.tsx", kind: "tsx" },
    { path: "components/RoomCard.tsx", kind: "tsx" },
    { path: "convex/schema.ts", kind: "ts" },
    { path: "convex/bookings.ts", kind: "ts" },
    { path: "lib/pricing.ts", kind: "ts" },
  ],
  chatSeed: [
    {
      role: "user" as const,
      text: "Build me a direct booking channel that competes with OTAs: one that plans, books, and manages multi-leg trips.",
    },
    {
      role: "assistant" as const,
      text: "Scaffolded the example project Aurora Direct with search, room inventory, multi-leg itinerary, and a governed preview environment. Open the preview to walk the guest flow.",
    },
  ],
  agentSteps: [
    "Parsing intent & constraints…",
    "Generating domain schema…",
    "Wiring booking APIs…",
    "Composing guest UI…",
    "Deploying preview…",
  ],
} as const;

export type StudioNotification = (typeof studio.notifications)[number];
