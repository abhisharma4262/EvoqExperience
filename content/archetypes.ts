import type { ModeId } from "./offerings";

export type ArchetypeCategory = {
  id: string;
  label: string;
  line: string;
};

export type ArchetypeStatus = "live" | "roadmap";

export type Archetype = {
  id: string;
  mode: ModeId;
  categoryId: string;
  name: string;
  /** The enterprise moment this solves */
  problem: string;
  /** What the engagement produces */
  outcome: string;
  /** Short component labels shown on the tile (3–4 max) */
  components: string[];
  status: ArchetypeStatus;
  /** CTA label for live paths */
  ctaLabel?: string;
  /** Deep-link when the live CTA launches work directly */
  href?: string;
  /** Longer composition for the detail panel */
  composition: string;
};

export const modeArchetypeIntros: Record<ModeId, string> = {
  create:
    "From idea to governed product. Explore how leaders create with EVOQ.",
  transform:
    "From legacy truth to governed change. Explore how leaders transform with EVOQ.",
  operate:
    "From critical work to explainable execution. Explore how leaders operate with EVOQ.",
};

export const archetypeCategoriesByMode: Record<ModeId, ArchetypeCategory[]> = {
  create: [
    {
      id: "intent",
      label: "From intent",
      line: "Turn a brief into governed requirements and a buildable plan.",
    },
    {
      id: "delivery",
      label: "Through delivery",
      line: "Put agents on rails so engineering ships continuously.",
    },
    {
      id: "evidence",
      label: "With Trust",
      line: "Prove quality and agent behavior across each agentic run.",
    },
  ],
  transform: [
    {
      id: "see",
      label: "See the estate",
      line: "Understand what systems do before deciding what changes.",
    },
    {
      id: "change",
      label: "Change with control",
      line: "Modernize, decompose, and rebuild on a governed path.",
    },
    {
      id: "prove",
      label: "Prove the shift",
      line: "Make quality and risk evidence part of every transformation wave.",
    },
  ],
  operate: [
    {
      id: "know",
      label: "Keep systems known",
      line: "Living knowledge so support never depends on who is in the room.",
    },
    {
      id: "run",
      label: "Run what is critical",
      line: "Diagnose, route, and resolve with agents that stay explainable.",
    },
    {
      id: "trust",
      label: "Stay accountable",
      line: "Monitor agent behavior and keep operations audit-ready.",
    },
  ],
};

export const archetypes: Archetype[] = [
  // ── Create ──────────────────────────────────────────────
  {
    id: "greenfield-agentic-product-build",
    mode: "create",
    categoryId: "intent",
    name: "Agentic Product Build",
    problem:
      "The board wants a working product, not another deck. The clock is already running.",
    outcome: "Concept to governed MVP on the execution studio.",
    components: [
      "AI Product Coach",
      "AEO",
      "Context Engine",
      "Agent Eval",
    ],
    status: "live",
    ctaLabel: "Start building",
    href: "/studio",
    composition:
      "AI Product Coach shapes the brief into delivery-ready artifacts. Intelligent Ingestion and Context Engine hold project memory. AEO orchestrates coding agents through Intent2Delivery. Agentic QE and Agent Eval keep the build auditable as it ships.",
  },
  {
    id: "requirements-as-a-service",
    mode: "create",
    categoryId: "intent",
    name: "Requirements-as-a-Service",
    problem:
      "Discovery still takes weeks, and the artifacts go stale before engineering starts.",
    outcome: "Governed BRDs, PRDs, and testable scenarios in days.",
    components: [
      "AI Product Coach",
      "Intelligent Ingestion",
      "Test Scenario Agent",
    ],
    status: "live",
    ctaLabel: "Shape the brief",
    href: "/studio",
    composition:
      "Ingest source material, validate relevance in Context Engine, and let AI Product Coach produce templated requirements. Test Scenario Agent converts intent into executable scenarios so engineering inherits clarity, not ambiguity.",
  },
  {
    id: "product-to-engineering-handoff",
    mode: "create",
    categoryId: "intent",
    name: "Product-to-Engineering Handoff",
    problem:
      "Specs, tickets, and tests never line up, so delivery reinvents the brief.",
    outcome: "One shared context from product intent through orchestrated build.",
    components: [
      "AI Product Coach",
      "Test Scenario Agent",
      "I2D / AEO",
      "Agent Eval",
    ],
    status: "roadmap",
    composition:
      "Product Coach locks intent. Scenario Agent derives acceptance. I2D keeps coding agents on that rail. Agent Eval checks whether agents stay faithful to the brief as work progresses.",
  },
  {
    id: "continuous-agentic-feature-factory",
    mode: "create",
    categoryId: "delivery",
    name: "Continuous Agentic Feature Factory",
    problem:
      "The backlog never clears because every increment restarts handoffs and context loss.",
    outcome: "A repeatable agentic loop: specify, build, prove, ship.",
    components: [
      "AI Product Coach",
      "AEO",
      "Agentic QE",
      "Agent Eval",
    ],
    status: "roadmap",
    composition:
      "Live specs feed AEO. Perpetual context keeps agents productive across sprints. Agentic QE gates each increment. Agent Eval monitors coding-agent quality so velocity does not trade away trust.",
  },
  {
    id: "governed-ai-coding-harness",
    mode: "create",
    categoryId: "delivery",
    name: "Governed AI Coding Harness",
    problem:
      "Teams already use Cursor, Claude, or Copilot without rails, audit, or repeatability.",
    outcome: "An enterprise harness that keeps agents on a governed delivery path.",
    components: [
      "I2D Engine",
      "Context Engine",
      "AEO",
      "Agent Eval",
    ],
    status: "roadmap",
    composition:
      "Intent2Delivery sits as the MCP orchestration brain over coding agents. Context Engine supplies memory. AEO packages the path. Agent Eval and AI Code Quality make every agent run measurable.",
  },
  {
    id: "platform-capability-factory",
    mode: "create",
    categoryId: "delivery",
    name: "Platform Capability Factory",
    problem:
      "Every new initiative rebuilds ingestion, memory, orchestration, and quality from scratch.",
    outcome: "One shared create platform consumed by every product team.",
    components: [
      "Intelligent Ingestion",
      "Context Engine",
      "I2D",
      "Agent Eval",
    ],
    status: "roadmap",
    composition:
      "Stand up the foundation once: ingestion, context, orchestration, quality, and eval. Each Create engagement compounds on shared capability instead of starting over.",
  },
  {
    id: "enterprise-context-knowledge-layer-create",
    mode: "create",
    categoryId: "delivery",
    name: "Enterprise Context / Knowledge Layer",
    problem:
      "Every AI initiative restarts without shared memory, so context never compounds.",
    outcome: "A durable ingestion and context fabric reused across every create engagement.",
    components: ["Intelligent Ingestion", "Context Engine"],
    status: "roadmap",
    composition:
      "Normalize briefs, docs, and references through Intelligent Ingestion into Context Engine so product, engineering, and quality agents share one enterprise memory.",
  },
  {
    id: "data-ai-product-build",
    mode: "create",
    categoryId: "evidence",
    name: "Data · AI · Analytics Product Build",
    problem:
      "Data products wait on projects, then ship without architecture-aware proof.",
    outcome: "Governed data and AI products with schema-aware test strategy.",
    components: [
      "Intelligent Ingestion",
      "AI Product Coach",
      "AEO",
      "Technical Test Strategy",
    ],
    status: "live",
    ctaLabel: "Build with data",
    composition:
      "Ingest and specify the data product, build through AEO, and let Technical Test Strategy plus Agentic QE define synthetic data and validation around real schemas. Agent Eval stays in the loop when agentic pipelines run.",
  },
  {
    id: "agent-guardrail-readiness",
    mode: "create",
    categoryId: "evidence",
    name: "Agent Guardrail & Readiness Gate",
    problem:
      "Leadership wants to scale agents into creation, but not without promotion gates.",
    outcome: "Agents only advance when eval thresholds pass.",
    components: [
      "Agent Eval",
      "I2D",
      "Context Engine",
      "Technical Test Strategy",
    ],
    status: "roadmap",
    composition:
      "Define golden tasks and thresholds in Agent Eval. Wire them into the I2D path so coding and product agents cannot promote until readiness evidence clears, before the first production user sees them.",
  },
  {
    id: "continuous-agent-evaluation-create",
    mode: "create",
    categoryId: "evidence",
    name: "Continuous Agent Evaluation",
    problem:
      "Model, prompt, or tool changes silently break the agents that just built your product.",
    outcome: "Ongoing scores, drift detection, and regression blocks for agent fleets.",
    components: ["Agent Eval", "Context Engine", "AI Code Quality"],
    status: "live",
    ctaLabel: "Evaluate agents",
    composition:
      "Treat Agent Eval as a first-class create control: golden suites, scoring, and behavioral regression whenever the agent stack changes, so Create stays trustworthy after day one.",
  },
  {
    id: "audit-ready-agentic-delivery",
    mode: "create",
    categoryId: "evidence",
    name: "Audit-Ready Agentic Delivery",
    problem:
      "Regulated teams need evidence of how AI built software, not just the code that shipped.",
    outcome: "Checkpoints, artifact lineage, test proof, and agent evaluation as one trail.",
    components: [
      "AEO",
      "I2D",
      "Context Engine",
      "Agent Eval",
    ],
    status: "roadmap",
    composition:
      "AEO and I2D keep delivery on rails with human checkpoints. Context Engine holds lineage. Agentic QE and Agent Eval attach quality and agent scores so every create path stays audit-ready.",
  },

  // ── Transform ───────────────────────────────────────────
  {
    id: "application-assessment",
    mode: "transform",
    categoryId: "see",
    name: "Application Assessment",
    problem:
      "One critical system needs a governed read before modernization, not a full portfolio program.",
    outcome: "Documentation, dependency context, and risk clarity for a single application.",
    components: [
      "Intelligent Ingestion",
      "Code to Clarity",
      "Code to Insight",
      "Context Engine",
    ],
    status: "live",
    ctaLabel: "Assess the application",
    composition:
      "Ingest one application's sources, recover structure and logic with Code to Clarity, map dependencies with Code to Insight, and hold the assessment in Context Engine so leaders can decide the next move on that system alone.",
  },
  {
    id: "application-portfolio-assessment",
    mode: "transform",
    categoryId: "see",
    name: "Application Portfolio Assessment",
    problem:
      "Leadership needs a ranked view of what to keep, retire, or modernize across the estate.",
    outcome: "A governed portfolio map with risk, coupling, and complexity scored across many applications.",
    components: [
      "Intelligent Ingestion",
      "Code to Clarity",
      "Code to Insight",
      "Context Engine",
    ],
    status: "live",
    ctaLabel: "Map the estate",
    composition:
      "Ingest the application estate, document each system with Code to Clarity, and graph dependencies with Code to Insight. Context Engine holds the living assessment leaders can act on.",
  },
  {
    id: "brownfield-knowledge-recovery",
    mode: "transform",
    categoryId: "see",
    name: "Brownfield Knowledge Recovery",
    problem:
      "Docs are missing, SMEs are retiring, and no one trusts what the code still does.",
    outcome: "Structured documentation and searchable memory recovered from the codebase.",
    components: [
      "Code to Clarity",
      "Context Engine",
      "Intelligent Ingestion",
    ],
    status: "live",
    ctaLabel: "Recover the knowledge",
    composition:
      "Code to Clarity reverse-engineers brownfield systems into Confluence-ready documentation. Intelligent Ingestion and Context Engine make that knowledge durable and reusable for every next wave.",
  },
  {
    id: "legacy-impact-blast-radius",
    mode: "transform",
    categoryId: "see",
    name: "Legacy Impact & Blast-Radius Analysis",
    problem:
      "No one can answer what breaks if a change ships, so risk decisions stay political.",
    outcome: "Dependency and blast-radius visibility for CAB, release, and modernization calls.",
    components: ["Code to Insight", "Context Engine", "Code to Clarity"],
    status: "live",
    ctaLabel: "See the blast radius",
    composition:
      "Code to Insight maps interdependencies in Neo4j. Code to Clarity explains the logic behind the edges. Context Engine keeps impact analysis available for every change conversation.",
  },
  {
    id: "ma-due-diligence-tech-assessment",
    mode: "transform",
    categoryId: "see",
    name: "M&A / Due Diligence Tech Assessment",
    problem:
      "Buyers need fast truth on acquired systems before the diligence window closes.",
    outcome: "Rapid inventory, documentation, and dependency risk maps under time pressure.",
    components: [
      "Intelligent Ingestion",
      "Code to Clarity",
      "Code to Insight",
      "Context Engine",
    ],
    status: "roadmap",
    composition:
      "Ingest the acquired estate, recover docs with Code to Clarity, graph risk with Code to Insight, and hold diligence findings in Context Engine for the deal team.",
  },
  {
    id: "enterprise-context-knowledge-layer-transform",
    mode: "transform",
    categoryId: "see",
    name: "Enterprise Context / Knowledge Layer",
    problem:
      "Transformation programs restart discovery because there is no shared system memory.",
    outcome: "A reusable context layer that feeds every assessment and modernization wave.",
    components: ["Intelligent Ingestion", "Context Engine"],
    status: "roadmap",
    composition:
      "Intelligent Ingestion and Context Engine become the shared memory for portfolio, documentation, and modernization work so each transform wave compounds.",
  },
  {
    id: "application-modernization",
    mode: "transform",
    categoryId: "change",
    name: "Application Modernization",
    problem:
      "Legacy must be replaced, but leadership will not fund a blind rewrite.",
    outcome: "A governed path from recovered truth to a modernized target system.",
    components: [
      "Code to Clarity",
      "Code to Insight",
      "AEO",
      "Agent Eval",
    ],
    status: "live",
    ctaLabel: "Modernize with control",
    composition:
      "Clarity and Insight recover system truth. AI Product Coach and Context Engine define the target. AEO rebuilds through Intent2Delivery. Agentic QE and Agent Eval keep each modernization wave auditable.",
  },
  {
    id: "monolith-service-decomposition",
    mode: "transform",
    categoryId: "change",
    name: "Monolith to Service Decomposition",
    problem:
      "The monolith is too risky to rewrite in one shot and too costly to leave alone.",
    outcome: "Service seams, extraction waves, and agentic rebuilds with proof at each cut.",
    components: [
      "Code to Insight",
      "Code to Clarity",
      "AEO",
      "Agent Eval",
    ],
    status: "roadmap",
    ctaLabel: "Find the seams",
    composition:
      "Insight finds decomposition seams. Clarity documents domains. AEO extracts and rebuilds slices. Agent Eval monitors agent-led decomposition quality as the monolith shrinks.",
  },
  {
    id: "brownfield-feature-extension",
    mode: "transform",
    categoryId: "change",
    name: "Brownfield Feature Extension",
    problem:
      "The business needs a new capability on a system nobody fully understands.",
    outcome: "Understand, specify, extend, and prove change inside the living estate.",
    components: [
      "Code to Clarity",
      "Code to Insight",
      "AEO",
      "Agentic QE",
    ],
    status: "roadmap",
    ctaLabel: "Extend with clarity",
    composition:
      "Recover context first, specify the extension, implement through AEO, and prove with Agentic QE and Agent Eval so brownfield change does not create the next dark zone.",
  },
  {
    id: "mainframe-legacy-language-modernization",
    mode: "transform",
    categoryId: "change",
    name: "Mainframe / Legacy Language Modernization",
    problem:
      "Critical workloads still sit on aging languages and platforms that the enterprise cannot rewrite blindly.",
    outcome: "Understand, map, rewrite, and prove modernization for legacy language estates.",
    components: [
      "Code to Clarity",
      "Code to Insight",
      "AEO",
      "Agent Eval",
    ],
    status: "roadmap",
    composition:
      "Clarity and Insight recover logic and dependencies. AEO drives the governed rewrite. Technical Test Strategy, Agentic QE, and Agent Eval prove parity across each cutover wave.",
  },
  {
    id: "vendor-package-replacement",
    mode: "transform",
    categoryId: "change",
    name: "Vendor / Package Replacement",
    problem:
      "A COTS or custom package must be replaced without losing the behavior the business depends on.",
    outcome: "Recovered rules, a redefined target, rebuild, and parity proof.",
    components: [
      "Code to Clarity",
      "Code to Insight",
      "AI Product Coach",
      "AEO",
    ],
    status: "roadmap",
    composition:
      "Recover behavior and rules, redefine the target with Product Coach, rebuild through AEO, and prove parity with Agentic QE and Agent Eval.",
  },
  {
    id: "agentic-qe-transformation",
    mode: "transform",
    categoryId: "prove",
    name: "Agentic QE Transformation",
    problem:
      "Manual QA and brittle suites are blocking modernization and release velocity.",
    outcome: "Autonomous test design, data, scripts, and execution across the stack.",
    components: [
      "Agentic QE",
      "Test Scenario Agent",
      "Technical Test Strategy",
      "AI Code Quality",
    ],
    status: "roadmap",
    ctaLabel: "Transform quality",
    composition:
      "Technical Test Strategy sets architecture-aware plans. Scenario Agent turns requirements into executable cases. Agentic QE generates data and scripts. AI Code Quality and Agent Eval keep the quality system itself trustworthy.",
  },
  {
    id: "requirements-to-test-readiness",
    mode: "transform",
    categoryId: "prove",
    name: "Requirements-to-Test Readiness",
    problem:
      "Business intent never becomes executable tests before the release pressure hits.",
    outcome: "A clean line from requirements to structured, runnable scenarios.",
    components: [
      "AI Product Coach",
      "Test Scenario Agent",
      "Agentic QE",
      "AI Code Quality",
    ],
    status: "roadmap",
    ctaLabel: "Make intent testable",
    composition:
      "Product Coach locks requirements. Test Scenario Agent translates them into scenarios. Agentic QE and AI Code Quality take those scenarios into automation and evidence.",
  },
  {
    id: "continuous-modernization-factory",
    mode: "transform",
    categoryId: "prove",
    name: "Continuous Modernization Factory",
    problem:
      "Modernization keeps restarting as projects instead of compounding as a program.",
    outcome: "Wave-based assess, document, rebuild, prove, and evaluate loops.",
    components: [
      "Code to Insight",
      "Code to Clarity",
      "AEO",
      "Agent Eval",
    ],
    status: "roadmap",
    ctaLabel: "Run the next wave",
    composition:
      "Each wave uses Insight and Clarity to see, AEO to change, Agentic QE to prove, and Agent Eval to keep the agent fleet honest across the program.",
  },
  {
    id: "synthetic-data-test-data-factory",
    mode: "transform",
    categoryId: "prove",
    name: "Synthetic Data & Test Data Factory",
    problem:
      "Teams cannot test safely in regulated or PII-heavy environments.",
    outcome: "Architecture-aware synthetic data structures and generation at scale.",
    components: [
      "Technical Test Strategy",
      "Agentic QE",
      "Context Engine",
      "Intelligent Ingestion",
    ],
    status: "roadmap",
    composition:
      "Technical Test Strategy defines schemas and coverage. Agentic QE generates synthetic data aligned to real architecture while Context Engine keeps constraints available.",
  },
  {
    id: "regression-suite-modernization",
    mode: "transform",
    categoryId: "prove",
    name: "Regression Suite Modernization",
    problem:
      "Brittle manual and legacy suites block releases and modernization waves.",
    outcome: "Regenerated scenarios and scripts ready for enterprise execution.",
    components: [
      "Code to Clarity",
      "Test Scenario Agent",
      "Agentic QE",
      "AI Code Quality",
    ],
    status: "roadmap",
    composition:
      "Recover intent from code and docs, regenerate scenarios with Test Scenario Agent, and rebuild automation through Agentic QE and AI Code Quality.",
  },
  {
    id: "shift-left-quality-agentic-delivery",
    mode: "transform",
    categoryId: "prove",
    name: "Shift-Left Quality in Agentic Delivery",
    problem:
      "Agents ship change without quality evidence baked into the delivery path.",
    outcome: "Quality design, automation, and agent eval inside every delivery step.",
    components: [
      "I2D / AEO",
      "Agentic QE",
      "AI Code Quality",
      "Agent Eval",
    ],
    status: "roadmap",
    composition:
      "Wire Test Scenario Agent, Agentic QE, AI Code Quality, and Agent Eval into the I2D path so quality and agent behavior are proven before promotion.",
  },
  {
    id: "release-change-risk-assessment",
    mode: "transform",
    categoryId: "prove",
    name: "Release / Change Risk Assessment",
    problem:
      "Releases lack impact evidence, so change boards decide without a system map.",
    outcome: "Hotspot-aware risk views with scoped tests and execution proof.",
    components: [
      "Code to Insight",
      "Code to Clarity",
      "Technical Test Strategy",
      "AI Code Quality",
    ],
    status: "roadmap",
    composition:
      "Insight and Clarity identify hotspots. Technical Test Strategy scopes the proof. AI Code Quality executes the evidence the release needs.",
  },
  {
    id: "test-strategy-complex-architectures",
    mode: "transform",
    categoryId: "prove",
    name: "Test Strategy for Complex Architectures",
    problem:
      "Generic test plans fail against real architecture, schemas, and integrations.",
    outcome: "Architecture-aware test strategy ready for agentic execution.",
    components: [
      "Technical Test Strategy Agent",
      "Code to Insight",
      "Context Engine",
      "Agentic QE",
    ],
    status: "roadmap",
    composition:
      "Technical Test Strategy Agent designs around architecture and schemas. Insight and Context Engine ground the plan. Agentic QE takes it into execution.",
  },

  // ── Operate ─────────────────────────────────────────────
  {
    id: "support-knowledge-refresh",
    mode: "operate",
    categoryId: "know",
    name: "Support Knowledge Base Continuous Refresh",
    problem:
      "Runbooks and Confluence drift from production code until every incident becomes archaeology.",
    outcome: "Support knowledge that stays current with the systems it describes.",
    components: [
      "Code to Clarity",
      "Intelligent Ingestion",
      "Context Engine",
    ],
    status: "roadmap",
    ctaLabel: "Refresh the knowledge",
    composition:
      "Code to Clarity regenerates structured documentation from the live estate. Ingestion and Context Engine keep support memory synchronized instead of stale.",
  },
  {
    id: "engineering-onboarding-acceleration",
    mode: "operate",
    categoryId: "know",
    name: "Engineering Onboarding Acceleration",
    problem:
      "New joiners take months to become useful because system truth lives in people's heads.",
    outcome: "Day-one ramp through docs, dependency maps, and searchable context.",
    components: ["Code to Clarity", "Code to Insight", "Context Engine"],
    status: "roadmap",
    ctaLabel: "Accelerate onboarding",
    composition:
      "Clarity and Insight give every new engineer a governed map of the systems they will touch. Context Engine makes that knowledge searchable from the first day.",
  },
  {
    id: "api-integration-landscape",
    mode: "operate",
    categoryId: "know",
    name: "API & Integration Landscape Mapping",
    problem:
      "Integration debt is invisible until an outage reveals contracts nobody owned.",
    outcome: "A living map of interfaces, dependencies, and operational contracts.",
    components: ["Code to Insight", "Code to Clarity", "Context Engine"],
    status: "live",
    ctaLabel: "Map the integrations",
    composition:
      "Insight graphs interfaces and dependencies. Clarity documents contracts. Context Engine keeps the landscape available for ops, change, and incident response.",
  },
  {
    id: "enterprise-context-knowledge-layer-operate",
    mode: "operate",
    categoryId: "know",
    name: "Enterprise Context / Knowledge Layer",
    problem:
      "Operations reinvents context on every incident because there is no shared system memory.",
    outcome: "Persistent operational context that support and diagnostic agents can trust.",
    components: ["Intelligent Ingestion", "Context Engine"],
    status: "roadmap",
    composition:
      "Ingestion and Context Engine hold living operational memory so support, diagnostics, and eval reuse the same truth instead of rebuilding it under pressure.",
  },
  {
    id: "ai-native-application-support",
    mode: "operate",
    categoryId: "run",
    name: "AI-Native Application Support",
    problem:
      "Support still depends on heroes, stale runbooks, and unexplained fixes.",
    outcome: "Explainable triage, diagnosis, and resolution grounded in system truth.",
    components: [
      "Code to Clarity",
      "Code to Insight",
      "Context Engine",
      "Agent Eval",
    ],
    status: "roadmap",
    ctaLabel: "Run AI-native support",
    composition:
      "Living docs, dependency graphs, and context power support agents. Agent Eval monitors those agents so operations stay explainable under load.",
  },
  {
    id: "incident-blast-radius-assist",
    mode: "operate",
    categoryId: "run",
    name: "Incident Blast-Radius & Root-Cause Assist",
    problem:
      "Incidents take too long to localize because blast radius is guessed, not mapped.",
    outcome: "Faster localization with graph-backed impact and diagnostic context.",
    components: [
      "Code to Insight",
      "Context Engine",
      "Code to Clarity",
      "Agent Eval",
    ],
    status: "roadmap",
    ctaLabel: "Trace the incident",
    composition:
      "Insight shows blast radius. Clarity and Context Engine supply the diagnostic narrative. Agent Eval tracks whether diagnostic agents remain reliable over time.",
  },
  {
    id: "production-agentic-app-monitoring",
    mode: "operate",
    categoryId: "run",
    name: "Production Agentic App Monitoring",
    problem:
      "Agentic applications run live without behavioral guardrails once they leave the lab.",
    outcome: "Runtime monitoring of agent decisions, tools, and outcomes in production.",
    components: [
      "Agent Eval",
      "Context Engine",
      "Code to Insight",
      "Agentic Engineering",
    ],
    status: "roadmap",
    ctaLabel: "Monitor live agents",
    composition:
      "Agent Eval watches production agent behavior. Context Engine and Insight make failures explainable. Operations teams see drift before customers do.",
  },
  {
    id: "continuous-agent-evaluation-operate",
    mode: "operate",
    categoryId: "trust",
    name: "Continuous Agent Evaluation",
    problem:
      "Nobody can prove the agents running operations are still good after the last model change.",
    outcome: "Golden tasks, scoring, drift detection, and promotion gates for agent fleets.",
    components: ["Agent Eval", "Context Engine", "AI Code Quality"],
    status: "live",
    ctaLabel: "Evaluate agents",
    composition:
      "Stand up Agent Eval as an operating control plane: continuous suites, scores, and regression blocks whenever prompts, models, or tools change.",
  },
  {
    id: "agent-behavior-regression",
    mode: "operate",
    categoryId: "trust",
    name: "Agent Behavior Regression Control",
    problem:
      "A prompt or model upgrade silently breaks workflows that operations depend on.",
    outcome: "Regression blocks before agent-stack changes reach production.",
    components: ["Agent Eval", "Context Engine", "I2D / AEO", "Agentic QE"],
    status: "roadmap",
    ctaLabel: "Block agent regressions",
    composition:
      "Re-run eval suites on every agent-stack change. Pair with Agentic QE where needed so behavioral regressions never become production incidents.",
  },
  {
    id: "compliance-evidence-pack",
    mode: "operate",
    categoryId: "trust",
    name: "Compliance Evidence Pack",
    problem:
      "Auditors want proof from requirement to action to agent decision, and ops cannot assemble it fast.",
    outcome: "Linked evidence across intent, execution, tests, and agent evaluation.",
    components: [
      "Context Engine",
      "Agent Eval",
      "AI Code Quality",
      "Code to Clarity",
    ],
    status: "roadmap",
    ctaLabel: "Assemble the evidence",
    composition:
      "Context Engine holds the lineage. Clarity, quality results, and Agent Eval scores become an evidence pack operations can hand to audit without a war room.",
  },
  {
    id: "audit-ready-agentic-operations",
    mode: "operate",
    categoryId: "trust",
    name: "Audit-Ready Agentic Delivery",
    problem:
      "When agents run critical work, auditors still ask how decisions were made and governed.",
    outcome: "An operating evidence trail across actions, context, tests, and agent scores.",
    components: [
      "Context Engine",
      "Agent Eval",
      "AI Code Quality",
      "AEO",
    ],
    status: "roadmap",
    composition:
      "Context Engine preserves lineage. Agent Eval and AI Code Quality attach behavioral and quality proof so agentic operations stay audit-ready without a scramble.",
  },
];

export function getArchetypesByMode(mode: ModeId): Archetype[] {
  return archetypes.filter((a) => a.mode === mode);
}

export function getCategoriesWithArchetypes(mode: ModeId) {
  const items = getArchetypesByMode(mode);
  return archetypeCategoriesByMode[mode]
    .map((category) => ({
      ...category,
      items: items.filter((a) => a.categoryId === category.id),
    }))
    .filter((c) => c.items.length > 0);
}

/** @deprecated Prefer getCategoriesWithArchetypes("create") */
export function getCreateCategoriesWithArchetypes() {
  return getCategoriesWithArchetypes("create");
}
