/**
 * Coordination mesh — the signature runtime diagram.
 * Context is the substrate; peers coordinate as a mesh;
 * enterprise / external systems sit at the edge and light with their peers.
 */

export type MeshPeerId =
  | "people"
  | "agents"
  | "systems"
  | "data"
  | "workflows"
  | "governance";

export type MeshBrandId =
  | "salesforce"
  | "sap"
  | "snowflake"
  | "servicenow"
  | "okta"
  | "aws"
  | "mulesoft"
  | "slack";

export const coordinationMesh = {
  context: {
    id: "context" as const,
    label: "Context",
    caption: "shared across every action",
  },
  peers: [
    {
      id: "people" as const,
      label: "People",
      detail: "Operators, experts, decision-makers",
    },
    {
      id: "agents" as const,
      label: "Agents",
      detail: "AI that drafts, routes, and acts",
    },
    {
      id: "systems" as const,
      label: "Systems",
      detail: "Systems of record — ERP, CRM, core",
    },
    {
      id: "data" as const,
      label: "Data",
      detail: "Operational truth in motion",
    },
    {
      id: "workflows" as const,
      label: "Workflows",
      detail: "How work is sequenced end to end",
    },
    {
      id: "governance" as const,
      label: "Governance",
      detail: "Policy and oversight on every edge",
    },
  ],
  /** Auto-tour order when the visitor is not interacting. */
  tour: [
    "context",
    "people",
    "agents",
    "systems",
    "data",
    "workflows",
    "governance",
  ] as const satisfies ReadonlyArray<MeshPeerId | "context">,
  /** Peer-to-peer chords (mesh, not a pipeline). */
  chords: [
    ["people", "agents"],
    ["agents", "systems"],
    ["systems", "data"],
    ["data", "workflows"],
    ["workflows", "governance"],
    ["governance", "people"],
    ["people", "workflows"],
    ["agents", "workflows"],
    ["agents", "governance"],
    ["systems", "workflows"],
  ] as const satisfies ReadonlyArray<readonly [MeshPeerId, MeshPeerId]>,
  /**
   * Edge systems — real platforms enterprises already run.
   * attaches = which peer nodes light when this system is in focus (and vice versa).
   */
  satellites: [
    {
      id: "sap" as const,
      brand: "sap" as const,
      label: "SAP",
      role: "ERP",
      kind: "enterprise" as const,
      attaches: ["systems", "data"] as const,
      region: "bottom" as const,
    },
    {
      id: "salesforce" as const,
      brand: "salesforce" as const,
      label: "Salesforce",
      role: "CRM",
      kind: "enterprise" as const,
      attaches: ["systems", "people"] as const,
      region: "bottom" as const,
    },
    {
      id: "snowflake" as const,
      brand: "snowflake" as const,
      label: "Snowflake",
      role: "Data",
      kind: "enterprise" as const,
      attaches: ["data", "systems"] as const,
      region: "bottom" as const,
    },
    {
      id: "servicenow" as const,
      brand: "servicenow" as const,
      label: "ServiceNow",
      role: "ITSM",
      kind: "enterprise" as const,
      attaches: ["workflows", "governance"] as const,
      region: "bottom" as const,
    },
    {
      id: "okta" as const,
      brand: "okta" as const,
      label: "Okta",
      role: "Identity",
      kind: "enterprise" as const,
      attaches: ["governance", "people"] as const,
      region: "left" as const,
    },
    {
      id: "aws" as const,
      brand: "aws" as const,
      label: "AWS",
      role: "Cloud",
      kind: "enterprise" as const,
      attaches: ["systems", "agents"] as const,
      region: "right" as const,
    },
    {
      id: "mulesoft" as const,
      brand: "mulesoft" as const,
      label: "MuleSoft",
      role: "APIs",
      kind: "external" as const,
      attaches: ["agents", "systems"] as const,
      region: "right" as const,
    },
    {
      id: "slack" as const,
      brand: "slack" as const,
      label: "Slack",
      role: "Collab",
      kind: "external" as const,
      attaches: ["people", "workflows"] as const,
      region: "left" as const,
    },
  ],
} as const;

/** Brand mark paths (Simple Icons), rendered monochrome then tinted. */
export const meshBrandMarks: Record<
  MeshBrandId,
  { color: string; path: string }
> = {
  salesforce: {
    color: "#00A1E0",
    // simple-icons:salesforce
    path: "M10.006 5.415a4.195 4.195 0 0 1 3.045-1.306 4.18 4.18 0 0 1 3.67 2.279 3.625 3.625 0 0 1 1.304-.245 3.65 3.65 0 0 1 3.667 3.65 3.65 3.65 0 0 1-3.667 3.65h-.32A4.773 4.773 0 0 1 13.043 16.5a4.759 4.759 0 0 1-3.254-1.274 4.481 4.481 0 0 1-3.208 1.074 4.486 4.486 0 0 1-4.333-3.364 4.006 4.006 0 0 1-.846.09 3.91 3.91 0 0 1-3.667-3.65 3.91 3.91 0 0 1 3.667-3.65 3.9 3.9 0 0 1 1.02.135A4.194 4.194 0 0 1 10.006 5.415z",
  },
  sap: {
    color: "#0FAAFF",
    // simplified SAP wordmark block (readable at small size)
    path: "M0 8.5h2.4l1.2 3.6L4.9 8.5H7.2l-2.1 7H2.8L0 8.5zm8.2 0h6.1v1.9H10.5v1.1h3.4v1.8h-3.4v1.3h4v1.9H8.2V8.5zm7.5 0H24v1.9h-2.8V17h-2.4V10.4h-3.1V8.5z",
  },
  snowflake: {
    color: "#29B5E8",
    // simple-icons:snowflake
    path: "M21.5 13.5h-3.3l1.65 2.85-1.7.98L16.5 14.5v3.3h-2v-3.3l-1.65 2.83-1.7-.98L13.3 13.5H10v-2h3.3L11.65 8.65l1.7-.98L15 10.5V7.2h2v3.3l1.65-2.83 1.7.98L18.7 11.5H22v2h-.5zm-9.5 7.3-1.65-2.85-1.7.98 1.65 2.85L8.65 22.7l-1.7-.98L8.6 18.87H5.3v-2h3.3L6.95 14.04l1.7-.98L10.3 16.9V13.6h2v3.3l1.65-2.84 1.7.98-1.65 2.85H17.3v2h-3.3l1.65 2.85-1.7.98-1.65-2.83v3.3h-2v-3.3zM8.65 5.3 10.3 8.15l1.7-.98L10.35 4.32 11.7 2l1.7.98L11.75 5.83H15v2H11.7l1.65 2.85-1.7.98L10.3 7.83V11.1h-2V7.83L6.65 10.66l-1.7-.98L6.6 7.83H3.3v-2h3.3L4.95 3 6.65 2.02 8.3 4.85 8.65 5.3z",
  },
  servicenow: {
    color: "#81B5A1",
    // simple-icons:servicenow (simplified cloud mark)
    path: "M5.7 10.4c0-3.5 2.9-6.4 6.4-6.4 2.7 0 5 1.7 5.9 4.1.5-.2 1.1-.3 1.7-.3 2.7 0 4.9 2.2 4.9 4.9S22.4 17.6 19.7 17.6H7.4C4.2 17.6 1.6 15 1.6 11.8c0-2.6 1.7-4.8 4.1-5.6v4.2z",
  },
  okta: {
    color: "#007DC1",
    // simple-icons:okta
    path: "M12 0C5.389 0 0 5.35 0 12s5.35 12 12 12 12-5.35 12-12S18.611 0 12 0zm0 18c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z",
  },
  aws: {
    color: "#FF9900",
    // simple-icons:amazonaws (smile + wordmark simplified to smile arc for small size)
    path: "M6.76 17.64c2.92 1.7 6.75 2.67 10.2 2.67 2.4 0 4.88-.42 7.04-1.33.36-.15.66.2.35.48A13.94 13.94 0 0 1 12.7 22.8c-4.02 0-7.63-1.49-10.37-3.96-.24-.22-.02-.53.3-.42.3.1.6.2.9.28l3.23-1.06zm15.4-2.2c-.3-.38-1.82-.18-2.52-.09-.21.03-.24-.16-.05-.29 1.22-.86 3.23-.61 3.46-.32.23.29-.06 2.3-1.21 3.26-.18.15-.35.07-.27-.11.26-.58.85-1.88.59-2.45zM7.1 8.85V6.97c0-.2.15-.34.35-.34h1.6c.19 0 .35.14.35.34v1.8c0 .9-.37 1.35-1.15 1.35-.76 0-1.15-.45-1.15-1.27zm-.18 3.3h.9c.2 0 .33-.12.38-.3l.13-.58c.18.3.62.66 1.35.66 1.1 0 1.85-.7 1.85-2.02V6.97c0-.2.14-.34.34-.34h.85c.2 0 .34.14.34.34v4.72c0 .2-.14.34-.34.34h-.82c-.2 0-.34-.13-.35-.3v-.48c-.22.35-.68.72-1.38.72-1.28 0-2.15-.96-2.15-2.4V8.85h-.1zm6.9-3.28c-.74 0-1.22.32-1.45.58V6.97c0-.2.14-.34.34-.34h.86c.19 0 .34.14.34.34v5.18c0 .1-.03.2-.09.27l-.86.97c-.12.14-.3.2-.47.1l-.7-.36c-.14-.08-.17-.24-.06-.36l.8-.9c-.32-.3-.7-.66-1.4-.66-1.2 0-2.1 1-2.1 2.45 0 1.42.9 2.4 2.1 2.4.7 0 1.2-.3 1.5-.65.1.32.35.53.72.53h.78c.2 0 .3-.1.34-.26.2-.85.55-3.4.55-4.05 0-1.35-.55-2.2-1.7-2.2zm-.1 3.55c0 .55-.37.93-.86.93-.47 0-.85-.42-.85-.96 0-.52.38-.93.85-.93.5 0 .86.4.86.96zM3.1 12.57c0 .2-.14.34-.34.34H1.88c-.2 0-.34-.14-.34-.34V4.34c0-.2.14-.34.34-.34h.88c.2 0 .34.14.34.34v8.23zm18.55-.9-1.55.1c-.2.01-.32.2-.2.36 0 0 .8 1.02.8 2.2 0 2.15-1.93 3.15-3.8 3.15-2.2 0-3.55-1.35-3.55-3.4 0-2.3 1.55-3.55 3.85-3.55.7 0 1.35.1 1.85.35.2.1.2.28.15.35l-.55.85c-.05.1-.2.15-.32.1-.55-.2-1.1-.3-1.55-.3-1.35 0-2.3.85-2.3 2.15 0 1.25.85 2.1 2.3 2.1.95 0 1.7-.45 1.7-1.45 0-.1 0-.2-.02-.3-.55.03-2.25.12-2.25-.85 0-.55.4-.95 1.1-.98l1.7-.1c.2-.02.4.13.4.35v2.05c0 1.65-.95 3.35-3.55 3.35-2.4 0-4.35-1.55-4.35-4.45 0-2.85 1.95-4.55 4.55-4.55 1.05 0 1.9.22 2.35.4.15.05.25.2.2.35l-.3.9z",
  },
  mulesoft: {
    color: "#00A0DF",
    path: "M12 2L2 7.5V16.5L12 22l10-5.5V7.5L12 2zm0 2.3l7.2 3.95v7.5L12 19.7l-7.2-3.95v-7.5L12 4.3zm0 2.4L7 9.5v5l5 2.8 5-2.8v-5L12 6.7z",
  },
  slack: {
    color: "#4A154B",
    // simple-icons:slack
    path: "M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.27 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.522 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.522 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.27a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.522h-6.313z",
  },
};
