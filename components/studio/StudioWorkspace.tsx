"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Activity,
  Bell,
  Bot,
  ChevronRight,
  Code2,
  Database,
  Eye,
  FileCode2,
  FolderKanban,
  Home,
  LayoutTemplate,
  LogOut,
  Monitor,
  PanelLeft,
  Rocket,
  Send,
  Settings,
  Smartphone,
  Tablet,
  X,
} from "lucide-react";
import { studio } from "@/content/studio";
import { BookingAppPreview } from "@/components/studio/BookingAppPreview";
import { StudioBrand } from "@/components/studio/StudioBrand";
import { StudioThemeToggle } from "@/components/studio/StudioThemeToggle";
import {
  clearStudioSession,
  readStudioSession,
  type StudioSession,
} from "@/lib/studio-auth";
import { cn } from "@/lib/cn";
import { prefersReducedMotion } from "@/lib/motion";

type ChatMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  text: string;
};

type ViewMode = "preview" | "code" | "database";
type Device = "desktop" | "tablet" | "mobile";
type NavId = (typeof studio.sidebarNav)[number]["id"];

const codeSnippet = `// app/page.tsx — Aurora Direct (example)
export default function Home() {
  return (
    <main>
      <Hero
        title="Book direct. Keep the margin."
        cta="Search stays"
      />
      <BookingSearch
        multiLeg
        inventory={rooms}
      />
    </main>
  );
}`;

const navIcons: Record<string, ReactNode> = {
  folders: <FolderKanban className="h-4 w-4" />,
  files: <FileCode2 className="h-4 w-4" />,
  bot: <Bot className="h-4 w-4" />,
  activity: <Activity className="h-4 w-4" />,
  rocket: <Rocket className="h-4 w-4" />,
  settings: <Settings className="h-4 w-4" />,
};

export function StudioWorkspace() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [session, setSession] = useState<StudioSession | null>(null);
  const [ready, setReady] = useState(false);
  const [projectOpen, setProjectOpen] = useState(
    () => searchParams.get("project") === "aurora-direct",
  );
  const [nav, setNav] = useState<NavId>("projects");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [view, setView] = useState<ViewMode>("preview");
  const [device, setDevice] = useState<Device>("desktop");
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [building, setBuilding] = useState(false);
  const [agentStep, setAgentStep] = useState(-1);
  const [previewVariant, setPreviewVariant] = useState<"default" | "enhanced">(
    "default",
  );
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [unread, setUnread] = useState(
    studio.notifications.filter((n) => n.unread).length,
  );
  const [selectedFile, setSelectedFile] = useState<string>(
    studio.files[0]?.path ?? "",
  );
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = readStudioSession();
    if (!current) {
      const project = searchParams.get("project");
      const q = project
        ? `?next=/studio/workspace&project=${project}`
        : "?next=/studio/workspace";
      router.replace(`/studio/login${q}`);
      return;
    }
    setSession(current);
    setReady(true);
  }, [router, searchParams]);

  useEffect(() => {
    if (!projectOpen) return;
    setMessages(
      studio.chatSeed.map((m, i) => ({
        id: `seed-${i}`,
        role: m.role,
        text: m.text,
      })),
    );
  }, [projectOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, agentStep, building]);

  const openAurora = useCallback(() => {
    setProjectOpen(true);
    setNav("files");
    setView("preview");
    router.replace("/studio/workspace?project=aurora-direct");
  }, [router]);

  const startBlank = useCallback(() => {
    setProjectOpen(false);
    setMessages([]);
    setPrompt("");
    setPreviewVariant("default");
    setView("preview");
    router.replace("/studio/workspace");
  }, [router]);

  function signOut() {
    clearStudioSession();
    router.push("/studio");
  }

  async function submitPrompt(event?: FormEvent) {
    event?.preventDefault();
    const text = prompt.trim();
    if (!text || building) return;

    if (!projectOpen) {
      setProjectOpen(true);
      router.replace("/studio/workspace?project=aurora-direct");
    }

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setPrompt("");
    setBuilding(true);
    setAgentStep(0);
    setView("preview");

    const reduced = prefersReducedMotion();
    const steps = studio.agentSteps;

    for (let i = 0; i < steps.length; i += 1) {
      setAgentStep(i);
      if (!reduced) {
        await new Promise((r) => setTimeout(r, 650));
      }
    }

    setPreviewVariant("enhanced");
    setMessages((prev) => [
      ...prev,
      {
        id: `a-${Date.now()}`,
        role: "assistant",
        text: `Applied your brief across search, itinerary, and governance gates. Preview updated — multi-leg planner is now visible in the guest UI.`,
      },
    ]);
    setBuilding(false);
    setAgentStep(-1);
    setUnread((n) => n + 1);
  }

  if (!ready || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--studio-bg)] text-[var(--studio-muted)]">
        Opening studio…
      </div>
    );
  }

  return (
    <div className="studio-workspace flex h-[100dvh] overflow-hidden">
      <aside className="flex w-14 shrink-0 flex-col items-center border-r border-[var(--studio-border)] bg-[var(--studio-rail)] py-3">
        <button
          type="button"
          onClick={() => setSidebarOpen((v) => !v)}
          className="mb-3 rounded-lg p-2 text-[var(--studio-muted)] hover:bg-[var(--studio-hover)] hover:text-[var(--studio-text)]"
          aria-label="Toggle sidebar"
        >
          <PanelLeft className="h-4 w-4" />
        </button>
        <nav className="flex flex-1 flex-col gap-1">
          {studio.sidebarNav.map((item) => (
            <button
              key={item.id}
              type="button"
              title={item.label}
              onClick={() => {
                setNav(item.id);
                setSidebarOpen(true);
              }}
              className={cn(
                "rounded-lg p-2 transition",
                nav === item.id
                  ? "bg-[var(--studio-active)] text-[var(--studio-accent-bright)]"
                  : "text-[var(--studio-muted)] hover:bg-[var(--studio-hover)] hover:text-[var(--studio-text)]",
              )}
            >
              {navIcons[item.icon]}
            </button>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => {
            setNotificationsOpen((v) => !v);
            setUserMenuOpen(false);
            setUnread(0);
          }}
          className="relative mb-2 rounded-lg p-2 text-[var(--studio-muted)] hover:bg-[var(--studio-hover)] hover:text-[var(--studio-text)]"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          {unread > 0 ? (
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[var(--studio-chip)]" />
          ) : null}
        </button>
      </aside>

      {sidebarOpen ? (
        <aside className="flex w-64 shrink-0 flex-col border-r border-[var(--studio-border)] bg-[var(--studio-panel)]">
          <div className="flex h-12 items-center justify-between border-b border-[var(--studio-border)] px-4">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--studio-muted)]">
              {studio.sidebarNav.find((n) => n.id === nav)?.label}
            </p>
            <button
              type="button"
              className="rounded p-1 text-[var(--studio-subtle)] hover:text-[var(--studio-text)]"
              onClick={() => setSidebarOpen(false)}
              aria-label="Collapse sidebar"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            {nav === "projects" || nav === "settings" ? (
              <div className="space-y-2">
                <p className="px-1 text-[11px] uppercase tracking-[0.14em] text-[var(--studio-subtle)]">
                  Included example
                </p>
                <button
                  type="button"
                  onClick={openAurora}
                  className={cn(
                    "w-full rounded-xl border p-3 text-left transition",
                    projectOpen
                      ? "border-[var(--studio-accent)]/40 bg-[var(--studio-accent-soft)]"
                      : "border-[var(--studio-border)] bg-[var(--studio-panel-soft)] hover:border-[var(--studio-border-strong)]",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-[var(--studio-text)]">
                      {studio.sampleProject.name}
                    </p>
                    <span className="rounded-full bg-[var(--studio-accent-soft)] px-2 py-0.5 text-[10px] font-medium text-[var(--studio-accent-bright)]">
                      Example
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[var(--studio-muted)]">
                    {studio.sampleProject.shortBlurb}
                  </p>
                  <p className="mt-2 text-[11px] text-[var(--studio-subtle)]">
                    Edited {studio.sampleProject.lastEdited}
                  </p>
                </button>
                <button
                  type="button"
                  onClick={startBlank}
                  className="w-full rounded-xl border border-dashed border-[var(--studio-border-strong)] bg-transparent p-3 text-left text-sm text-[var(--studio-muted)] transition hover:border-[var(--studio-accent)]/40 hover:text-[var(--studio-text)]"
                >
                  + New application
                </button>
              </div>
            ) : null}

            {nav === "files" ? (
              <ul className="space-y-0.5">
                {studio.files.map((file) => (
                  <li key={file.path}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(file.path);
                        setView("code");
                        if (!projectOpen) openAurora();
                      }}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 font-mono text-xs transition",
                        selectedFile === file.path
                          ? "bg-[var(--studio-hover)] text-[var(--studio-text)]"
                          : "text-[var(--studio-muted)] hover:bg-[var(--studio-hover)] hover:text-[var(--studio-text)]",
                      )}
                    >
                      <FileCode2 className="h-3.5 w-3.5 shrink-0 opacity-60" />
                      <span className="truncate">{file.path}</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}

            {nav === "agents" ? (
              <div className="space-y-2 text-sm">
                {[
                  ["Discovery", "Idle"],
                  ["Schema", "Ready"],
                  ["UI Composer", projectOpen ? "Attached" : "Waiting"],
                  ["Governance", "Watching"],
                ].map(([name, status]) => (
                  <div
                    key={name}
                    className="flex items-center justify-between rounded-xl border border-[var(--studio-border)] px-3 py-2"
                  >
                    <span className="text-[var(--studio-text)]">{name}</span>
                    <span className="text-xs text-[var(--studio-accent-bright)]">
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            ) : null}

            {nav === "runtime" ? (
              <div className="space-y-3 font-mono text-xs text-[var(--studio-muted)]">
                <p>[env] preview · eu-west-1</p>
                <p>[policy] data residency: approved</p>
                <p>[audit] agent.schema.write: allowed</p>
                <p>[gate] human approval: production</p>
                <p className="text-[var(--studio-accent-bright)]">
                  [status] healthy
                </p>
              </div>
            ) : null}

            {nav === "deploy" ? (
              <div className="space-y-3">
                <div className="rounded-xl border border-[var(--studio-border)] p-3">
                  <p className="text-sm text-[var(--studio-text)]">
                    Example preview
                  </p>
                  <p className="mt-1 font-mono text-xs text-[var(--studio-accent-bright)]">
                    {studio.sampleProject.url}
                  </p>
                  <button
                    type="button"
                    className="mt-3 w-full rounded-lg bg-[var(--studio-accent)] py-2 text-xs font-medium text-[#0c2226]"
                  >
                    Open preview URL
                  </button>
                </div>
                <button
                  type="button"
                  className="w-full rounded-xl border border-[var(--studio-border-strong)] py-2.5 text-sm text-[var(--studio-muted)]"
                >
                  Request production promote
                </button>
              </div>
            ) : null}
          </div>
        </aside>
      ) : null}

      <div className="relative flex min-w-0 flex-1 flex-col bg-[var(--studio-bg)]">
        <header className="flex h-12 shrink-0 items-center gap-3 border-b border-[var(--studio-border)] bg-[var(--studio-panel)]/90 px-4 backdrop-blur">
          <StudioBrand compact />
          <nav
            className="hidden items-center gap-1 text-xs text-[var(--studio-muted)] sm:flex"
            aria-label="Studio exit path"
          >
            <Link
              href="/studio"
              className="rounded-md px-2 py-1 hover:bg-[var(--studio-hover)] hover:text-[var(--studio-text)]"
            >
              Studio home
            </Link>
            <span aria-hidden className="text-[var(--studio-subtle)]">
              /
            </span>
            <Link
              href="/create"
              className="rounded-md px-2 py-1 hover:bg-[var(--studio-hover)] hover:text-[var(--studio-text)]"
            >
              Create
            </Link>
            <span aria-hidden className="text-[var(--studio-subtle)]">
              /
            </span>
            <Link
              href="/?scene=modes#section-modes"
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 hover:bg-[var(--studio-hover)] hover:text-[var(--studio-text)]"
            >
              <Home className="h-3 w-3" />
              Site home
            </Link>
          </nav>
          <div className="min-w-0 flex-1">
            <div className="flex min-w-0 items-center gap-2">
              <p className="truncate text-sm font-medium text-[var(--studio-text)]">
                {projectOpen
                  ? studio.sampleProject.name
                  : "Untitled application"}
              </p>
              {projectOpen ? (
                <span className="shrink-0 rounded-full bg-[var(--studio-accent-soft)] px-2 py-0.5 text-[10px] font-medium text-[var(--studio-accent-bright)]">
                  Example
                </span>
              ) : null}
            </div>
            <p className="truncate text-[11px] text-[var(--studio-subtle)]">
              {projectOpen
                ? `${studio.sampleProject.exampleLabel} · ${studio.sampleProject.stack.join(" · ")}`
                : "Blank canvas — describe what to build"}
            </p>
          </div>

          <StudioThemeToggle />

          <div className="hidden items-center rounded-lg border border-[var(--studio-border)] bg-[var(--studio-panel-soft)] p-0.5 sm:flex">
            {(
              [
                ["preview", Eye, "Preview"],
                ["code", Code2, "Code"],
                ["database", Database, "Database"],
              ] as const
            ).map(([id, Icon, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setView(id)}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs transition",
                  view === id
                    ? "bg-[var(--studio-hover)] text-[var(--studio-text)]"
                    : "text-[var(--studio-muted)] hover:text-[var(--studio-text)]",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-1 md:flex">
            {(
              [
                ["desktop", Monitor],
                ["tablet", Tablet],
                ["mobile", Smartphone],
              ] as const
            ).map(([id, Icon]) => (
              <button
                key={id}
                type="button"
                aria-label={id}
                onClick={() => setDevice(id)}
                className={cn(
                  "rounded-md p-1.5",
                  device === id
                    ? "bg-[var(--studio-hover)] text-[var(--studio-text)]"
                    : "text-[var(--studio-subtle)] hover:text-[var(--studio-text)]",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
              </button>
            ))}
          </div>

          <button
            type="button"
            className="rounded-lg bg-[var(--studio-publish)] px-3 py-1.5 text-xs font-semibold text-[var(--studio-publish-text)]"
          >
            Publish
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setUserMenuOpen((v) => !v);
                setNotificationsOpen(false);
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--studio-user-bubble)] text-xs font-medium text-white"
              aria-label="Account menu"
            >
              {session.name.slice(0, 1).toUpperCase()}
            </button>
            {userMenuOpen ? (
              <div className="absolute right-0 top-10 z-40 w-56 rounded-xl border border-[var(--studio-border)] bg-[var(--studio-panel)] p-2 shadow-2xl">
                <p className="px-2 py-1.5 text-xs text-[var(--studio-muted)]">
                  {session.email}
                </p>
                <Link
                  href="/studio"
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-[var(--studio-text)] hover:bg-[var(--studio-hover)]"
                  onClick={() => setUserMenuOpen(false)}
                >
                  Studio home
                </Link>
                <Link
                  href="/create"
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-[var(--studio-text)] hover:bg-[var(--studio-hover)]"
                  onClick={() => setUserMenuOpen(false)}
                >
                  Back to Create
                </Link>
                <Link
                  href="/?scene=modes#section-modes"
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-[var(--studio-text)] hover:bg-[var(--studio-hover)]"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <Home className="h-3.5 w-3.5" />
                  Site home
                </Link>
                <button
                  type="button"
                  onClick={signOut}
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-[var(--studio-text)] hover:bg-[var(--studio-hover)]"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Sign out
                </button>
              </div>
            ) : null}
          </div>
        </header>

        {notificationsOpen ? (
          <div className="absolute right-4 top-14 z-40 w-80 rounded-xl border border-[var(--studio-border)] bg-[var(--studio-panel)] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[var(--studio-border)] px-4 py-3">
              <p className="text-sm font-medium">Notifications</p>
              <button
                type="button"
                className="text-[var(--studio-subtle)]"
                onClick={() => setNotificationsOpen(false)}
                aria-label="Close notifications"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <ul className="max-h-80 overflow-y-auto p-2">
              {studio.notifications.map((n) => (
                <li
                  key={n.id}
                  className="rounded-lg px-3 py-2.5 hover:bg-[var(--studio-hover)]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm text-[var(--studio-text)]">{n.title}</p>
                    {n.unread ? (
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--studio-chip)]" />
                    ) : null}
                  </div>
                  <p className="mt-0.5 text-xs text-[var(--studio-muted)]">
                    {n.body}
                  </p>
                  <p className="mt-1 text-[10px] text-[var(--studio-subtle)]">
                    {n.time}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="flex min-h-0 flex-1">
          <section
            className={cn(
              "flex min-w-0 flex-col border-r border-[var(--studio-border)] bg-[var(--studio-bg)]",
              projectOpen ? "w-full max-w-md lg:w-[38%]" : "w-full",
            )}
          >
            {!projectOpen ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 py-10">
                <div className="studio-empty-pulse mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--studio-accent)]/30 bg-[var(--studio-accent-soft)]">
                  <LayoutTemplate className="h-6 w-6 text-[var(--studio-accent-bright)]" />
                </div>
                <h1 className="display text-center text-3xl text-[var(--studio-text)] md:text-4xl">
                  What should we build?
                </h1>
                <p className="mt-3 max-w-lg text-center text-sm text-[var(--studio-muted)]">
                  Start from a blank brief, or open{" "}
                  <strong className="font-medium text-[var(--studio-text)]">
                    Aurora Direct
                  </strong>
                  — an example project that shows a finished booking app with live
                  preview.
                </p>
                <form
                  onSubmit={submitPrompt}
                  className="mt-8 w-full max-w-2xl"
                >
                  <div className="rounded-2xl border border-[var(--studio-border-strong)] bg-[var(--studio-input)] p-3 shadow-[0_0_0_1px_var(--studio-accent-soft)] focus-within:border-[var(--studio-accent)]/50">
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      rows={4}
                      placeholder={studio.blankPromptPlaceholder}
                      className="w-full resize-none bg-transparent text-sm text-[var(--studio-text)] outline-none placeholder:text-[var(--studio-subtle)]"
                    />
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={openAurora}
                        className="text-xs text-[var(--studio-muted)] hover:text-[var(--studio-accent-bright)]"
                      >
                        Open example: Aurora Direct →
                      </button>
                      <button
                        type="submit"
                        disabled={!prompt.trim() || building}
                        className="inline-flex items-center gap-2 rounded-xl bg-[var(--studio-accent)] px-4 py-2 text-sm font-medium text-[#0c2226] disabled:opacity-40"
                      >
                        Build
                        <Send className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <>
                <div className="border-b border-[var(--studio-border)] bg-[var(--studio-accent-soft)] px-4 py-2 text-xs text-[var(--studio-accent-bright)]">
                  Viewing example project · {studio.sampleProject.name} — sample
                  hotel direct-booking app
                </div>
                <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={cn(
                        "rounded-2xl px-3.5 py-3 text-sm leading-relaxed",
                        m.role === "user"
                          ? "ml-6 bg-[var(--studio-user-bubble)] text-white"
                          : "mr-4 border border-[var(--studio-border)] bg-[var(--studio-assistant-bg)] text-[var(--studio-text)]",
                      )}
                    >
                      <p className="mb-1 text-[10px] uppercase tracking-[0.16em] text-[var(--studio-subtle)]">
                        {m.role === "user" ? "You" : "Agents"}
                      </p>
                      {m.text}
                    </div>
                  ))}
                  {building ? (
                    <div className="mr-4 rounded-2xl border border-[var(--studio-accent)]/25 bg-[var(--studio-accent-soft)] px-3.5 py-3">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--studio-accent-bright)]">
                        Agents at work
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {studio.agentSteps.map((step, i) => (
                          <li
                            key={step}
                            className={cn(
                              "flex items-center gap-2 text-xs",
                              i <= agentStep
                                ? "text-[var(--studio-text)]"
                                : "text-[var(--studio-subtle)]",
                            )}
                          >
                            <ChevronRight className="h-3 w-3" />
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  <div ref={chatEndRef} />
                </div>
                <form
                  onSubmit={submitPrompt}
                  className="border-t border-[var(--studio-border)] p-3"
                >
                  <div className="rounded-xl border border-[var(--studio-border-strong)] bg-[var(--studio-input)] p-2 focus-within:border-[var(--studio-accent)]/45">
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      rows={2}
                      placeholder="Ask for a change — layout, flow, policy, or data…"
                      className="w-full resize-none bg-transparent px-2 py-1.5 text-sm text-[var(--studio-text)] outline-none placeholder:text-[var(--studio-subtle)]"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          void submitPrompt();
                        }
                      }}
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={!prompt.trim() || building}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--studio-accent)] px-3 py-1.5 text-xs font-medium text-[#0c2226] disabled:opacity-40"
                      >
                        Send
                        <Send className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </form>
              </>
            )}
          </section>

          {projectOpen ? (
            <section className="hidden min-w-0 flex-1 flex-col bg-[var(--studio-rail)] lg:flex">
              <div className="flex h-9 items-center gap-2 border-b border-[var(--studio-border)] px-3 text-xs text-[var(--studio-subtle)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--studio-chip)]" />
                {view === "preview"
                  ? "Live preview · example app"
                  : view === "code"
                    ? selectedFile
                    : "Schema · bookings"}
              </div>
              <div className="relative min-h-0 flex-1 overflow-hidden p-3">
                {view === "preview" ? (
                  <div className="h-full overflow-hidden rounded-xl border border-[var(--studio-border)] bg-transparent">
                    <BookingAppPreview
                      variant={previewVariant}
                      device={device}
                    />
                  </div>
                ) : null}
                {view === "code" ? (
                  <pre className="h-full overflow-auto rounded-xl border border-[var(--studio-border)] bg-[var(--studio-code-bg)] p-4 font-mono text-xs leading-relaxed text-[var(--studio-code-text)]">
                    <code>{codeSnippet}</code>
                  </pre>
                ) : null}
                {view === "database" ? (
                  <div className="h-full overflow-auto rounded-xl border border-[var(--studio-border)] bg-[var(--studio-code-bg)] p-4 font-mono text-xs text-[var(--studio-code-text)]">
                    <p className="text-[var(--studio-chip)]">tables</p>
                    <p className="mt-3">bookings</p>
                    <p className="pl-3 text-[var(--studio-muted)]">
                      _id · guestId · propertyId · checkIn · checkOut · status
                    </p>
                    <p className="mt-3">itineraries</p>
                    <p className="pl-3 text-[var(--studio-muted)]">
                      _id · bookingId · legs[] · total · currency
                    </p>
                    <p className="mt-3">inventory</p>
                    <p className="pl-3 text-[var(--studio-muted)]">
                      _id · roomType · ratePlan · allotment · memberRate
                    </p>
                    <p className="mt-6 text-[var(--studio-subtle)]">
                      index by_guest · by_property_and_dates · by_status
                    </p>
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
