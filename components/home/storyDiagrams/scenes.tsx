import {
  Bubble,
  Edge,
  IconAgent,
  IconCart,
  IconCase,
  IconCheck,
  IconCrm,
  IconDoc,
  IconEscalate,
  IconGate,
  IconHeal,
  IconMonolith,
  IconPerson,
  IconPlugin,
  IconQuote,
  IconRunbook,
  IconScore,
  IconShield,
  IconSystem,
  IconTelemetry,
  IconTicket,
  Packet,
  SceneFrame,
  StatusBadge,
  type SceneProps,
} from "./primitives";

/** Chat transcript — stacked bubbles, not a horizontal pipeline */
export function EnrollmentScene({ playing }: SceneProps) {
  return (
    <SceneFrame
      playing={playing}
      variant="chat"
      label="Parent chats with an AI agent that enrolls them in the membership system in minutes"
    >
      <rect x={18} y={16} width={180} height={136} rx={14} className="story-chat-panel" />
      <text x={30} y={34} className="story-scene-caption">
        Conversation
      </text>

      <g className="story-chat-msg story-beat-1" transform="translate(30 48)">
        <rect width={130} height={28} rx={10} className="story-chat-bubble story-chat-bubble--user" />
        <text x={12} y={18} className="story-chat-text">
          How do we enroll?
        </text>
      </g>
      <g className="story-chat-msg story-beat-2" transform="translate(48 86)">
        <rect width={140} height={28} rx={10} className="story-chat-bubble story-chat-bubble--agent" />
        <text x={12} y={18} className="story-chat-text">
          I’ll guide you…
        </text>
      </g>

      <g className="story-chat-side" transform="translate(230 40)">
        <circle r={22} className="story-soft-node story-actor-pulse" />
        <g transform="translate(0 -2)" className="story-actor-icon story-actor--agent">
          <IconAgent />
        </g>
        <text y={38} textAnchor="middle" className="story-actor-label">
          AI Agent
        </text>
      </g>

      <g className="story-beat-3" transform="translate(230 118)">
        <circle r={18} className="story-soft-node story-soft-node--ok" />
        <g className="story-actor-icon story-actor--ok">
          <IconCheck />
        </g>
        <text y={34} textAnchor="middle" className="story-actor-label">
          Enrolled
        </text>
      </g>
      <StatusBadge x={108} y={148} text="25m → 5m" className="story-beat-3 story-badge--accent" />
    </SceneFrame>
  );
}

/** Plugin inject — checkout frame with plug sliding in */
export function CheckoutScene({ playing }: SceneProps) {
  return (
    <SceneFrame
      playing={playing}
      variant="inject"
      label="Shopper checkout injects a BNPL plugin, risk agent approves, and merchant CRM syncs funding"
    >
      <rect x={24} y={28} width={150} height={110} rx={12} className="story-checkout-frame" />
      <text x={36} y={48} className="story-scene-caption">
        Checkout
      </text>
      <g transform="translate(70 78)" className="story-actor-icon">
        <IconCart />
      </g>
      <text x={99} y={112} textAnchor="middle" className="story-checkout-total story-beat-1">
        $248.00
      </text>

      <g className="story-plugin-plug story-beat-2" transform="translate(150 78)">
        <rect x={0} y={-16} width={52} height={32} rx={8} className="story-plugin-body" />
        <g transform="translate(26 0)" className="story-actor-icon story-actor--agent">
          <IconPlugin />
        </g>
        <text y={28} textAnchor="middle" className="story-actor-label">
          BNPL
        </text>
      </g>

      <Edge d="M202 78 H230" className="story-edge--a" />
      <g transform="translate(262 42)" className="story-beat-3">
        <circle r={20} className="story-soft-node" />
        <g className="story-actor-icon">
          <IconCrm />
        </g>
        <text y={34} textAnchor="middle" className="story-actor-label">
          CRM
        </text>
      </g>
      <g transform="translate(262 118)" className="story-beat-3">
        <circle r={20} className="story-soft-node story-soft-node--ok" />
        <g className="story-actor-icon story-actor--ok">
          <IconShield />
        </g>
        <text y={34} textAnchor="middle" className="story-actor-label">
          Risk OK
        </text>
      </g>
      <StatusBadge x={99} y={150} text="Offer in-cart" className="story-beat-4 story-badge--accent" />
    </SceneFrame>
  );
}

/** Before → after timer — time is the hero */
export function AdmissionsScene({ playing }: SceneProps) {
  return (
    <SceneFrame
      playing={playing}
      variant="timer"
      label="Applicant asks a status agent, documents are verified by Doc AI, and admissions CRM updates"
    >
      <g className="story-timer-before story-beat-1" transform="translate(70 78)">
        <circle r={36} className="story-timer-ring story-timer-ring--before" />
        <text textAnchor="middle" y={-4} className="story-timer-value">
          5d
        </text>
        <text textAnchor="middle" y={14} className="story-actor-label">
          Before
        </text>
      </g>

      <path
        d="M118 78 H150"
        className="story-edge story-edge--a"
        markerEnd="url(#story-arrow)"
      />
      <defs>
        <marker id="story-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" className="story-arrow-head" />
        </marker>
      </defs>

      <g className="story-timer-after story-beat-2" transform="translate(198 78)">
        <circle r={36} className="story-timer-ring story-timer-ring--after" />
        <text textAnchor="middle" y={-4} className="story-timer-value story-timer-value--ok">
          1h
        </text>
        <text textAnchor="middle" y={14} className="story-actor-label">
          After
        </text>
      </g>

      <g className="story-beat-3" transform="translate(280 48)">
        <circle r={16} className="story-soft-node story-soft-node--ok" />
        <g className="story-actor-icon story-actor--ok">
          <IconDoc />
        </g>
        <text y={30} textAnchor="middle" className="story-actor-label">
          Verified
        </text>
      </g>
      <g className="story-beat-4" transform="translate(280 118)">
        <circle r={16} className="story-soft-node" />
        <g className="story-actor-icon">
          <IconCrm />
        </g>
        <text y={30} textAnchor="middle" className="story-actor-label">
          CRM
        </text>
      </g>
      <StatusBadge x={134} y={148} text="Agent + Doc AI" className="story-beat-2 story-badge--accent" />
    </SceneFrame>
  );
}

/** Morph split — monolith cracks into pods, vertical CI rail */
export function PlatformScene({ playing }: SceneProps) {
  return (
    <SceneFrame
      playing={playing}
      variant="morph"
      label="Monolith splits into service pods, passes a security gate through the pipeline, then goes live"
    >
      <g className="story-mono story-beat-1" transform="translate(48 84)">
        <rect x={-22} y={-40} width={44} height={80} rx={8} className="story-mono-body" />
        <g className="story-actor-icon">
          <IconMonolith />
        </g>
        <text y={52} textAnchor="middle" className="story-actor-label">
          Monolith
        </text>
      </g>

      <path d="M78 50 Q110 40 130 56" className="story-crack story-beat-2" />
      <path d="M78 84 Q110 84 130 84" className="story-crack story-beat-2" />
      <path d="M78 118 Q110 128 130 112" className="story-crack story-beat-2" />

      <g className="story-pods story-beat-2" transform="translate(158 84)">
        <g transform="translate(0 -28)">
          <rect x={-14} y={-12} width={28} height={24} rx={6} className="story-pod" />
        </g>
        <g transform="translate(0 0)">
          <rect x={-14} y={-12} width={28} height={24} rx={6} className="story-pod" />
        </g>
        <g transform="translate(0 28)">
          <rect x={-14} y={-12} width={28} height={24} rx={6} className="story-pod" />
        </g>
        <text y={58} textAnchor="middle" className="story-actor-label">
          Pods
        </text>
      </g>

      <rect x={198} y={28} width={14} height={112} rx={7} className="story-ci-rail story-beat-3" />
      <Packet playing={playing} path="M205 36 V132" className="story-packet--accent" begin="0s" dur="2.8s" />
      <text x={205} y={156} textAnchor="middle" className="story-actor-label">
        CI
      </text>

      <g className="story-beat-3" transform="translate(268 84)">
        <circle r={24} className="story-soft-node story-soft-node--ok" />
        <g className="story-actor-icon story-actor--ok">
          <IconShield />
        </g>
        <text y={40} textAnchor="middle" className="story-actor-label">
          Gate
        </text>
      </g>
      <StatusBadge x={268} y={28} text="99.99%" className="story-beat-4 story-badge--ok" />
    </SceneFrame>
  );
}

/** Graph cascade — assistant at center, radial nodes */
export function RulesScene({ playing }: SceneProps) {
  return (
    <SceneFrame
      playing={playing}
      variant="graph"
      label="Analyst asks an AI assistant that lights an impact path across a rules graph and returns an answer"
    >
      <Edge d="M160 84 L96 40" className="story-graph-edge story-graph-edge--1" />
      <Edge d="M160 84 L224 40" className="story-graph-edge story-graph-edge--2" />
      <Edge d="M160 84 L70 110" className="story-graph-edge story-graph-edge--3" />
      <Edge d="M160 84 L250 110" className="story-graph-edge story-graph-edge--4" />
      <Edge d="M160 84 L160 140" className="story-graph-edge story-graph-edge--1" />

      <g className="story-beat-1" transform="translate(160 84)">
        <circle r={28} className="story-soft-node story-soft-node--agent story-actor-pulse" />
        <g className="story-actor-icon story-actor--agent">
          <IconAgent />
        </g>
        <text y={44} textAnchor="middle" className="story-actor-label">
          Assistant
        </text>
      </g>

      <circle cx={96} cy={40} r={12} className="story-graph-node story-graph-node--1" />
      <circle cx={224} cy={40} r={12} className="story-graph-node story-graph-node--2" />
      <circle cx={70} cy={110} r={12} className="story-graph-node story-graph-node--3" />
      <circle cx={250} cy={110} r={12} className="story-graph-node story-graph-node--4" />
      <circle cx={160} cy={140} r={12} className="story-graph-node story-graph-node--5" />

      <Bubble x={160} y={18} text="Impact of rule X?" className="story-beat-1" />
      <StatusBadge x={160} y={158} text="3 brands in blast radius" className="story-beat-3 story-badge--accent" />
    </SceneFrame>
  );
}

/** Hub-and-spoke — 360 at center */
export function OnboardingScene({ playing }: SceneProps) {
  return (
    <SceneFrame
      playing={playing}
      variant="hub"
      label="Seller uses CPQ to quote, systems connect merchant 360 and ERP, then the merchant activates"
    >
      <Edge d="M160 84 L70 40" className="story-spoke story-spoke--1" />
      <Edge d="M160 84 L250 40" className="story-spoke story-spoke--2" />
      <Edge d="M160 84 L70 128" className="story-spoke story-spoke--3" />
      <Edge d="M160 84 L250 128" className="story-spoke story-spoke--4" />

      <g transform="translate(160 84)" className="story-hub story-beat-2">
        <circle r={32} className="story-hub-core" />
        <g className="story-actor-icon">
          <IconCrm />
        </g>
        <text y={48} textAnchor="middle" className="story-actor-label">
          Merchant 360
        </text>
      </g>

      <g className="story-beat-1" transform="translate(70 40)">
        <circle r={18} className="story-soft-node" />
        <g className="story-actor-icon">
          <IconPerson />
        </g>
        <text y={32} textAnchor="middle" className="story-actor-label">
          Seller
        </text>
      </g>
      <g className="story-beat-1" transform="translate(250 40)">
        <circle r={18} className="story-soft-node" />
        <g className="story-actor-icon">
          <IconQuote />
        </g>
        <text y={32} textAnchor="middle" className="story-actor-label">
          CPQ
        </text>
      </g>
      <g className="story-beat-3" transform="translate(70 128)">
        <circle r={18} className="story-soft-node" />
        <g className="story-actor-icon">
          <IconSystem />
        </g>
        <text y={32} textAnchor="middle" className="story-actor-label">
          ERP
        </text>
      </g>
      <g className="story-beat-3" transform="translate(250 128)">
        <circle r={18} className="story-soft-node story-soft-node--ok" />
        <g className="story-actor-icon story-actor--ok">
          <IconCheck />
        </g>
        <text y={32} textAnchor="middle" className="story-actor-label">
          Active
        </text>
      </g>
    </SceneFrame>
  );
}

/** Health pulse — waveform goes amber → heal → green */
export function IncidentsScene({ playing }: SceneProps) {
  return (
    <SceneFrame
      playing={playing}
      variant="pulse"
      label="Booking services spike, telemetry alerts a triage agent, and a heal action restores green health"
    >
      <path
        d="M24 90 L60 90 L72 50 L88 120 L104 70 L120 90 L160 90 L176 55 L192 115 L208 75 L224 90 L296 90"
        className="story-waveform story-waveform--warn"
        fill="none"
      />
      <path
        d="M24 90 L60 90 L72 50 L88 120 L104 70 L120 90 L160 90 L176 55 L192 115 L208 75 L224 90 L296 90"
        className="story-waveform story-waveform--ok story-beat-3"
        fill="none"
      />

      <g className="story-beat-1" transform="translate(70 36)">
        <circle r={14} className="story-soft-node story-soft-node--warn" />
        <g className="story-actor-icon story-actor--warn">
          <IconTelemetry />
        </g>
        <text y={28} textAnchor="middle" className="story-actor-label">
          Spike
        </text>
      </g>

      <g className="story-beat-2 story-actor-pulse" transform="translate(160 36)">
        <circle r={16} className="story-soft-node story-soft-node--agent" />
        <g className="story-actor-icon story-actor--agent">
          <IconAgent />
        </g>
        <text y={30} textAnchor="middle" className="story-actor-label">
          Triage
        </text>
      </g>

      <g className="story-beat-3" transform="translate(250 36)">
        <circle r={16} className="story-soft-node story-soft-node--ok" />
        <g className="story-actor-icon story-actor--ok">
          <IconHeal />
        </g>
        <text y={30} textAnchor="middle" className="story-actor-label">
          Heal
        </text>
      </g>

      <StatusBadge x={160} y={148} text="Service restored" className="story-beat-4 story-badge--ok" />
    </SceneFrame>
  );
}

/** Stream + gate — packet rain, red packet blocked */
export function FraudScene({ playing }: SceneProps) {
  return (
    <SceneFrame
      playing={playing}
      variant="stream"
      label="Transaction stream is scored in real time, a gate blocks fraud, and a case is resolved"
    >
      <rect x={20} y={40} width={120} height={90} rx={10} className="story-stream-bed" />
      <text x={30} y={58} className="story-scene-caption">
        Live stream
      </text>

      {[48, 62, 76, 90, 104, 118].map((y, i) => (
        <Packet
          key={y}
          playing={playing}
          path={`M30 ${y} H130`}
          className={i === 3 ? "story-packet--danger" : "story-packet--fast"}
          begin={`${i * 0.25}s`}
          dur="1.8s"
        />
      ))}

      <rect x={152} y={36} width={18} height={98} rx={4} className="story-gate-bar story-beat-2" />
      <g transform="translate(161 20)" className="story-beat-2">
        <g className="story-actor-icon story-actor--danger">
          <IconGate />
        </g>
      </g>

      <g className="story-beat-1" transform="translate(210 70)">
        <circle r={20} className="story-soft-node story-soft-node--agent" />
        <g className="story-actor-icon story-actor--agent">
          <IconScore />
        </g>
        <text y={34} textAnchor="middle" className="story-actor-label">
          Score
        </text>
      </g>

      <g className="story-beat-3" transform="translate(280 70)">
        <rect x={-28} y={-22} width={56} height={44} rx={8} className="story-case-card" />
        <g className="story-actor-icon">
          <IconCase />
        </g>
        <text y={36} textAnchor="middle" className="story-actor-label">
          Case
        </text>
      </g>

      <StatusBadge x={161} y={150} text="Blocked in-flight" className="story-beat-3 story-badge--danger" />
    </SceneFrame>
  );
}

/** Fork ratio — thick resolve path vs thin escalate */
export function SupportScene({ playing }: SceneProps) {
  return (
    <SceneFrame
      playing={playing}
      variant="fork"
      label="Incidents are triaged with runbooks so most resolve locally while escalation stays rare"
    >
      <g transform="translate(40 70)">
        <circle r={20} className="story-soft-node" />
        <g className="story-actor-icon">
          <IconTicket />
        </g>
        <text y={36} textAnchor="middle" className="story-actor-label">
          Incident
        </text>
      </g>

      <path
        d="M68 70 C110 70 130 70 160 70 C200 70 230 70 260 70"
        className="story-fork-main"
        fill="none"
      />
      <path
        d="M160 78 C190 110 220 120 260 120"
        className="story-fork-rare story-beat-rare"
        fill="none"
      />

      <Packet playing={playing} path="M68 70 C110 70 130 70 160 70" begin="0s" dur="4.5s" />
      <Packet
        playing={playing}
        path="M160 70 C200 70 230 70 260 70"
        className="story-packet--ok"
        begin="1s"
        dur="4.5s"
      />

      <g transform="translate(160 48)" className="story-beat-1">
        <circle r={16} className="story-soft-node story-soft-node--agent" />
        <g className="story-actor-icon story-actor--agent">
          <IconRunbook />
        </g>
        <text y={30} textAnchor="middle" className="story-actor-label">
          Runbook
        </text>
      </g>

      <g transform="translate(280 70)" className="story-beat-2">
        <circle r={22} className="story-soft-node story-soft-node--ok" />
        <g className="story-actor-icon story-actor--ok">
          <IconCheck />
        </g>
        <text y={38} textAnchor="middle" className="story-actor-label">
          Resolved
        </text>
      </g>

      <g transform="translate(280 124)" className="story-beat-rare">
        <circle r={14} className="story-soft-node story-soft-node--dim" />
        <g className="story-actor-icon story-actor--dim">
          <IconEscalate />
        </g>
        <text y={28} textAnchor="middle" className="story-actor-label">
          Escalate
        </text>
      </g>

      <StatusBadge x={160} y={148} text="87% first-touch" className="story-beat-2 story-badge--ok" />
    </SceneFrame>
  );
}
