"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  briefAudienceOptions,
  briefHelpChips,
  briefNameSuggestions,
  briefPriorityOptions,
  briefReadinessOptions,
  briefSteps,
  studioBriefDefaults,
  type StudioBriefAnswers,
} from "@/content/studioBrief";
import { Button } from "@/components/ui/Button";
import { StudioBrand } from "@/components/studio/StudioBrand";
import { StudioThemeToggle } from "@/components/studio/StudioThemeToggle";
import { useStudioTheme } from "@/components/studio/StudioThemeProvider";
import { readStudioSession } from "@/lib/studio-auth";
import { writeStudioBrief } from "@/lib/studio-brief";
import { cn } from "@/lib/cn";

const TOTAL_STEPS = briefSteps.length;

function ChoiceTile({
  selected,
  label,
  onClick,
}: {
  selected: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "rounded-2xl border px-4 py-3.5 text-left text-sm transition",
        selected
          ? "border-[var(--studio-accent)]/50 bg-[var(--studio-accent-soft)] text-[var(--studio-text)] shadow-[0_0_0_1px_color-mix(in_srgb,var(--studio-accent)_35%,transparent)]"
          : "border-[var(--studio-border)] bg-[var(--studio-panel)] text-[var(--studio-muted)] hover:border-[var(--studio-border-strong)] hover:text-[var(--studio-text)]",
      )}
    >
      {label}
    </button>
  );
}

function OtherField({
  selected,
  onSelect,
  value,
  onChange,
  placeholder,
}: {
  selected: boolean;
  onSelect: () => void;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border px-4 py-3.5 transition",
        selected
          ? "border-[var(--studio-accent)]/50 bg-[var(--studio-accent-soft)]"
          : "border-[var(--studio-border)] bg-[var(--studio-panel)]",
      )}
    >
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className={cn(
          "text-sm",
          selected
            ? "text-[var(--studio-text)]"
            : "text-[var(--studio-muted)] hover:text-[var(--studio-text)]",
        )}
      >
        Other
      </button>
      {selected ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="mt-2 w-full rounded-xl border border-[var(--studio-border)] bg-[var(--studio-input)] px-3 py-2 text-sm text-[var(--studio-text)] outline-none ring-[var(--studio-accent)] placeholder:text-[var(--studio-subtle)] focus:ring-2"
        />
      ) : null}
    </div>
  );
}

export function StudioBrief() {
  const router = useRouter();
  const { theme } = useStudioTheme();
  const [ready, setReady] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] =
    useState<StudioBriefAnswers>(studioBriefDefaults);

  useEffect(() => {
    if (!readStudioSession()) {
      router.replace("/studio/login?next=/studio/brief");
      return;
    }
    setReady(true);
  }, [router]);

  const primaryVariant = theme === "dark" ? "onDark" : "primary";
  const secondaryVariant = theme === "dark" ? "onDarkSecondary" : "secondary";
  const current = briefSteps[step] ?? briefSteps[0];
  const isLast = step === TOTAL_STEPS - 1;

  function patch(partial: Partial<StudioBriefAnswers>) {
    setAnswers((prev) => ({ ...prev, ...partial }));
  }

  function toggleChip(id: string) {
    setAnswers((prev) => {
      const has = prev.helpChips.includes(id);
      return {
        ...prev,
        helpChips: has
          ? prev.helpChips.filter((c) => c !== id)
          : [...prev.helpChips, id],
      };
    });
  }

  function togglePriority(id: string) {
    setAnswers((prev) => {
      const has = prev.priorities.includes(id);
      if (has) {
        return {
          ...prev,
          priorities: prev.priorities.filter((p) => p !== id),
        };
      }
      if (prev.priorities.length >= 2) {
        return {
          ...prev,
          priorities: [...prev.priorities.slice(1), id],
        };
      }
      return { ...prev, priorities: [...prev.priorities, id] };
    });
  }

  function goNext() {
    if (!isLast) {
      setStep((s) => s + 1);
      return;
    }
    writeStudioBrief(answers);
    router.push("/studio/workspace?from=brief");
  }

  function goBack() {
    if (step === 0) {
      router.push("/studio");
      return;
    }
    setStep((s) => s - 1);
  }

  function skipToStudio() {
    writeStudioBrief(answers);
    router.push("/studio/workspace?from=brief");
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--studio-bg)] text-[var(--studio-muted)]">
        Opening brief…
      </div>
    );
  }

  return (
    <div className="studio-landing relative min-h-screen overflow-hidden">
      <div className="studio-landing__grid" aria-hidden />
      <div className="studio-landing__glow studio-landing__glow--a" aria-hidden />
      <div className="studio-landing__glow studio-landing__glow--b" aria-hidden />

      <header className="relative z-20 flex items-center justify-between px-6 py-5 md:px-10">
        <StudioBrand />
        <div className="flex items-center gap-2 sm:gap-3">
          <StudioThemeToggle />
          <Link
            href="/studio"
            className="hidden text-sm text-[var(--studio-muted)] transition hover:text-[var(--studio-text)] sm:inline"
          >
            ← Back to Studio
          </Link>
          <Button
            type="button"
            variant={secondaryVariant}
            size="sm"
            onClick={skipToStudio}
          >
            Skip to Studio
          </Button>
        </div>
      </header>

      <main className="relative z-20 mx-auto flex min-h-[calc(100vh-5rem)] max-w-2xl flex-col justify-center px-6 pb-16 pt-6">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--studio-landing-eyebrow)]">
          Quick brief · Step {step + 1} of {TOTAL_STEPS}
        </p>

        <div className="mt-4 h-1 overflow-hidden rounded-full bg-[var(--studio-border)]">
          <div
            className="h-full rounded-full bg-[var(--studio-accent)] transition-[width] duration-500 ease-out"
            style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
          />
        </div>

        <h1 className="display mt-8 text-3xl text-[var(--studio-text)] md:text-4xl">
          {current.title}
        </h1>
        <p className="mt-3 text-sm text-[var(--studio-muted)]">{current.hint}</p>

        <div className="mt-8">
          {current.id === "description" ? (
            <div className="space-y-4">
              <textarea
                value={answers.description}
                onChange={(e) => patch({ description: e.target.value })}
                rows={4}
                className="w-full resize-none rounded-2xl border border-[var(--studio-border-strong)] bg-[var(--studio-input)] px-4 py-3.5 text-sm text-[var(--studio-text)] outline-none ring-[var(--studio-accent)] placeholder:text-[var(--studio-subtle)] focus:ring-2"
                placeholder="What should people be able to do?"
              />
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.14em] text-[var(--studio-subtle)]">
                  Optional focus
                </p>
                <div className="flex flex-wrap gap-2">
                  {briefHelpChips.map((chip) => {
                    const selected = answers.helpChips.includes(chip.id);
                    return (
                      <button
                        key={chip.id}
                        type="button"
                        onClick={() => toggleChip(chip.id)}
                        aria-pressed={selected}
                        className={cn(
                          "rounded-full border px-3 py-1.5 text-xs transition",
                          selected
                            ? "border-[var(--studio-accent)]/50 bg-[var(--studio-accent-soft)] text-[var(--studio-accent-bright)]"
                            : "border-[var(--studio-border)] text-[var(--studio-muted)] hover:text-[var(--studio-text)]",
                        )}
                      >
                        {chip.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.14em] text-[var(--studio-subtle)]">
                  Other (optional)
                </span>
                <input
                  type="text"
                  value={answers.helpOther}
                  onChange={(e) => patch({ helpOther: e.target.value })}
                  placeholder="Anything else we should know?"
                  className="w-full rounded-2xl border border-[var(--studio-border)] bg-[var(--studio-panel)] px-4 py-3 text-sm text-[var(--studio-text)] outline-none ring-[var(--studio-accent)] placeholder:text-[var(--studio-subtle)] focus:ring-2"
                />
              </label>
            </div>
          ) : null}

          {current.id === "audience" ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {briefAudienceOptions.map((option) => (
                <ChoiceTile
                  key={option.id}
                  label={option.label}
                  selected={answers.audience === option.id}
                  onClick={() =>
                    patch({ audience: option.id, audienceOther: "" })
                  }
                />
              ))}
              <OtherField
                selected={answers.audience === "other"}
                onSelect={() => patch({ audience: "other" })}
                value={answers.audienceOther}
                onChange={(audienceOther) =>
                  patch({ audience: "other", audienceOther })
                }
                placeholder="Who else will use it?"
              />
            </div>
          ) : null}

          {current.id === "priorities" ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {briefPriorityOptions.map((option) => (
                <ChoiceTile
                  key={option.id}
                  label={option.label}
                  selected={answers.priorities.includes(option.id)}
                  onClick={() => togglePriority(option.id)}
                />
              ))}
              <OtherField
                selected={answers.priorities.includes("other")}
                onSelect={() => togglePriority("other")}
                value={answers.prioritiesOther}
                onChange={(prioritiesOther) => {
                  setAnswers((prev) => {
                    const hasOther = prev.priorities.includes("other");
                    let priorities = prev.priorities;
                    if (!hasOther) {
                      priorities =
                        prev.priorities.length >= 2
                          ? [...prev.priorities.slice(1), "other"]
                          : [...prev.priorities, "other"];
                    }
                    return { ...prev, prioritiesOther, priorities };
                  });
                }}
                placeholder="Another priority for v1?"
              />
            </div>
          ) : null}

          {current.id === "readiness" ? (
            <div className="grid gap-3">
              {briefReadinessOptions.map((option) => (
                <ChoiceTile
                  key={option.id}
                  label={option.label}
                  selected={answers.readiness === option.id}
                  onClick={() =>
                    patch({ readiness: option.id, readinessOther: "" })
                  }
                />
              ))}
              <OtherField
                selected={answers.readiness === "other"}
                onSelect={() => patch({ readiness: "other" })}
                value={answers.readinessOther}
                onChange={(readinessOther) =>
                  patch({ readiness: "other", readinessOther })
                }
                placeholder="Describe the bar for “ready”"
              />
            </div>
          ) : null}

          {current.id === "name" ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {briefNameSuggestions.map((name) => (
                <ChoiceTile
                  key={name.id}
                  label={name.label}
                  selected={answers.selectedNameId === name.id}
                  onClick={() =>
                    patch({ selectedNameId: name.id, customName: "" })
                  }
                />
              ))}
              <div
                className={cn(
                  "rounded-2xl border px-4 py-3.5 transition sm:col-span-2",
                  answers.selectedNameId === "custom"
                    ? "border-[var(--studio-accent)]/50 bg-[var(--studio-accent-soft)]"
                    : "border-[var(--studio-border)] bg-[var(--studio-panel)]",
                )}
              >
                <button
                  type="button"
                  onClick={() => patch({ selectedNameId: "custom" })}
                  aria-pressed={answers.selectedNameId === "custom"}
                  className={cn(
                    "text-sm",
                    answers.selectedNameId === "custom"
                      ? "text-[var(--studio-text)]"
                      : "text-[var(--studio-muted)] hover:text-[var(--studio-text)]",
                  )}
                >
                  Use my own name
                </button>
                {answers.selectedNameId === "custom" ? (
                  <input
                    type="text"
                    value={answers.customName}
                    onChange={(e) =>
                      patch({
                        selectedNameId: "custom",
                        customName: e.target.value,
                      })
                    }
                    placeholder="Type a name"
                    className="mt-2 w-full rounded-xl border border-[var(--studio-border)] bg-[var(--studio-input)] px-3 py-2 text-sm text-[var(--studio-text)] outline-none ring-[var(--studio-accent)] placeholder:text-[var(--studio-subtle)] focus:ring-2"
                  />
                ) : null}
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-10 flex items-center justify-between gap-3">
          <Button
            type="button"
            variant={secondaryVariant}
            onClick={goBack}
            className="inline-flex items-center gap-1.5"
          >
            <ChevronLeft className="h-4 w-4" />
            {step === 0 ? "Landing" : "Back"}
          </Button>
          <Button
            type="button"
            variant={primaryVariant}
            onClick={goNext}
            className="inline-flex items-center gap-1.5"
          >
            {isLast ? "Continue to Studio" : "Next"}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <p className="mt-4 text-center text-xs text-[var(--studio-subtle)]">
          Prototype demo — answers are prefilled. Keep clicking Next.
        </p>
      </main>
    </div>
  );
}
