import type { ModeId } from "@/content/offerings";
import { cn } from "@/lib/cn";

const previews: Record<
  ModeId,
  { title: string; chips: string[]; metric: string; tone: string }
> = {
  create: {
    title: "Build console",
    chips: ["Requirements", "Schema", "Preview env", "Deploy"],
    metric: "Fri 4:12 PM · Preview ready",
    tone: "from-accent/15 via-bg to-bg",
  },
  transform: {
    title: "Assessment map",
    chips: ["Data model", "Automations", "Debt", "Security"],
    metric: "Elapsed 07:59 · Complete",
    tone: "from-accent-alt/15 via-bg to-bg",
  },
  operate: {
    title: "Operations board",
    chips: ["Triaged", "Routed", "Resolved", "Escalated"],
    metric: "11 auto · 1 human",
    tone: "from-[color-mix(in_srgb,var(--color-accent)_20%,white)] via-bg to-bg",
  },
};

export function ModePreview({
  mode,
  className,
}: {
  mode: ModeId;
  className?: string;
}) {
  const preview = previews[mode];

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[1.25rem] border border-accent-alt/15 bg-gradient-to-br p-5 shadow-[0_8px_32px_rgba(12,34,38,0.06)]",
        preview.tone,
        className,
      )}
      role="img"
      aria-label={`${preview.title} placeholder visual`}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-text-secondary">
          {preview.title}
        </p>
        <span className="h-2 w-2 rounded-full bg-accent" />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2">
        {preview.chips.map((chip) => (
          <div
            key={chip}
            className="rounded-xl border border-accent-alt/15 bg-surface/90 px-3 py-4 text-sm text-text-primary"
          >
            {chip}
          </div>
        ))}
      </div>
      <p className="mt-5 font-mono text-xs text-text-muted">{preview.metric}</p>
    </div>
  );
}
