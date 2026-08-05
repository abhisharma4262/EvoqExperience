"use client";

import Link from "next/link";
import {
  Folder,
  LayoutGrid,
  Settings,
  Plus,
  FileText,
  Sparkles,
} from "lucide-react";

const segments = [
  { label: "All Projects", count: 4, color: "#64748b" },
  { label: "HealthTech Div", count: 1, color: "#8b5cf6" },
  { label: "Logistics Div", count: 1, color: "#22c55e" },
  { label: "Energy & Infra", count: 1, color: "#14b8a6" },
  { label: "Fintech Div", count: 1, color: "#f97316" },
] as const;

const projects = [
  {
    title: "HealthGuard - Smart Vitals Monitor",
    description:
      "AI-assisted vitals monitoring platform for hospital networks with real-time anomaly detection and clinician alerts.",
    status: "Review",
    statusClass: "bg-amber-100 text-amber-800",
    division: "HealthTech Div",
    divisionClass: "bg-violet-100 text-violet-700",
    files: 4,
    avatars: ["#7c3aed", "#2563eb", "#db2777"],
  },
  {
    title: "ShopFlow - Enterprise Inventory AI",
    description:
      "Demand forecasting and warehouse orchestration for multi-site retail operations with automated replenishment.",
    status: "In Progress",
    statusClass: "bg-sky-100 text-sky-800",
    division: "Logistics Div",
    divisionClass: "bg-emerald-100 text-emerald-700",
    files: 6,
    avatars: ["#059669", "#0ea5e9"],
  },
  {
    title: "GridSmart - Energy Yield Optimization",
    description:
      "Predictive load balancing and yield optimization across renewable energy assets and regional grids.",
    status: "Draft",
    statusClass: "bg-slate-100 text-slate-700",
    division: "Energy & Infra",
    divisionClass: "bg-teal-100 text-teal-700",
    files: 2,
    avatars: ["#0d9488", "#64748b", "#f59e0b"],
  },
  {
    title: "FinStream - Real-time Market Overlay",
    description:
      "Live market signal overlays for portfolio teams with risk gates, compliance checks, and explainable AI.",
    status: "Done",
    statusClass: "bg-emerald-100 text-emerald-800",
    division: "Fintech Div",
    divisionClass: "bg-orange-100 text-orange-700",
    files: 5,
    avatars: ["#ea580c", "#4f46e5"],
  },
] as const;

export function AiProductCoach() {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-[#f4f7fb] text-[#0f172a]">
      <header className="z-30 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-slate-200/80 bg-white px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <Link
            href="/studio"
            className="shrink-0 text-sm text-slate-500 transition hover:text-slate-900"
          >
            ← Back to Studio
          </Link>
          <span className="hidden h-4 w-px bg-slate-200 sm:block" aria-hidden />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-tight">
              AI Product Coach
            </p>
            <p className="hidden truncate text-xs text-slate-500 sm:block">
              Plan your vision before you build
            </p>
          </div>
        </div>
        <Link
          href="/"
          className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 transition hover:border-slate-300 sm:px-4 sm:text-sm"
        >
          Home
        </Link>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside className="flex w-[15.5rem] shrink-0 flex-col bg-[#0b1f3a] text-white sm:w-[16.5rem]">
          <div className="flex items-center gap-2.5 px-5 py-5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
              <Sparkles className="h-4 w-4 text-sky-200" strokeWidth={2} />
            </span>
            <div className="leading-tight">
              <p className="text-[11px] font-bold tracking-[0.16em]">EVOQ</p>
              <p className="text-[12px] font-medium text-white/85">
                AI Product Coach
              </p>
            </div>
          </div>

          <nav className="px-3">
            <SidebarItem icon={Folder} label="Projects" active />
            <SidebarItem icon={LayoutGrid} label="Templates" />
            <SidebarItem icon={Settings} label="Settings" />
          </nav>

          <div className="mt-8 px-5">
            <p className="mb-3 text-[10px] font-semibold tracking-[0.18em] text-white/45">
              SEGMENTS
            </p>
            <ul className="space-y-2.5">
              {segments.map((segment) => (
                <li key={segment.label}>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2.5 rounded-md px-1 py-0.5 text-left text-[13px] text-white/80 transition hover:text-white"
                  >
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ background: segment.color }}
                    />
                    <span className="truncate">
                      {segment.label}{" "}
                      <span className="text-white/40">({segment.count})</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto border-t border-white/10 px-4 py-4">
            <div className="flex items-center gap-3">
              <div
                className="h-9 w-9 shrink-0 rounded-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #94a3b8 0%, #334155 100%)",
                }}
                aria-hidden
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">Alex Morgan</p>
                <p className="truncate text-[11px] text-white/50">
                  Principal Product Lead
                </p>
              </div>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 overflow-auto bg-[#f5f7fb] px-6 py-7 sm:px-8 lg:px-10">
          <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-[1.75rem]">
                Active Projects
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Manage product innovations across the Enterprise ecosystem.
              </p>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#1d4ed8] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#1e40af]"
            >
              <Plus className="h-4 w-4" strokeWidth={2.25} />
              New Project
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.title}
                className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${project.statusClass}`}
                  >
                    {project.status}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${project.divisionClass}`}
                  >
                    {project.division}
                  </span>
                </div>
                <h2 className="text-[15px] font-semibold leading-snug text-slate-900">
                  {project.title}
                </h2>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-500">
                  {project.description}
                </p>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                  <div className="flex -space-x-2">
                    {project.avatars.map((color) => (
                      <span
                        key={color}
                        className="h-7 w-7 rounded-full border-2 border-white"
                        style={{ background: color }}
                      />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-violet-600">
                    <FileText className="h-3.5 w-3.5" />
                    {project.files} High Relevance Files
                  </span>
                </div>
              </article>
            ))}

            <button
              type="button"
              className="flex min-h-[13.5rem] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 bg-transparent text-slate-400 transition hover:border-slate-400 hover:text-slate-600"
            >
              <Plus className="h-8 w-8" strokeWidth={1.5} />
              <span className="text-sm font-medium">Create New Project</span>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarItem({
  icon: Icon,
  label,
  active = false,
}: {
  icon: typeof Folder;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={
        active
          ? "mb-1 flex w-full items-center gap-2.5 rounded-lg bg-[#dbeafe] px-3 py-2.5 text-sm font-medium text-[#1e3a8a]"
          : "mb-1 flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-white/75 transition hover:bg-white/5 hover:text-white"
      }
    >
      <Icon className="h-4 w-4" strokeWidth={2} />
      {label}
    </button>
  );
}
