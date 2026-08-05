"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { z } from "zod";
import { forms, type LeadPath } from "@/content/forms";
import { Button } from "@/components/ui/Button";

const leadSchema = z.object({
  name: z.string().min(1),
  company: z.string().min(1),
  email: z.string().email(),
  note: z.string().optional(),
  path: z.enum(["walkthrough", "runtime-deep-dive"]),
  offeringSlug: z.string().optional(),
  sourceScene: z.string().optional(),
});

type LeadOpenArgs = {
  path: LeadPath;
  offeringSlug?: string;
  sourceScene?: string;
};

type LeadModalContextValue = {
  openLead: (args: LeadOpenArgs) => void;
};

const LeadModalContext = createContext<LeadModalContextValue | null>(null);

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState<LeadPath>("walkthrough");
  const [offeringSlug, setOfferingSlug] = useState<string | undefined>();
  const [sourceScene, setSourceScene] = useState<string | undefined>();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  const openLead = useCallback((args: LeadOpenArgs) => {
    setPath(args.path);
    setOfferingSlug(args.offeringSlug);
    setSourceScene(args.sourceScene);
    setStatus("idle");
    setOpen(true);
  }, []);

  const value = useMemo(() => ({ openLead }), [openLead]);

  async function onSubmit(formData: FormData) {
    setStatus("loading");
    const payload = {
      name: String(formData.get("name") ?? ""),
      company: String(formData.get("company") ?? ""),
      email: String(formData.get("email") ?? ""),
      note: String(formData.get("note") ?? ""),
      path,
      offeringSlug,
      sourceScene,
    };

    const parsed = leadSchema.safeParse(payload);
    if (!parsed.success) {
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const title =
    path === "walkthrough"
      ? forms.lead.titleWalkthrough
      : forms.lead.titleDeepDive;

  return (
    <LeadModalContext.Provider value={value}>
      {children}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-dark-bg/50 backdrop-blur-sm" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(92vw,32rem)] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-accent-alt/15 bg-surface p-8 shadow-[0_12px_48px_rgba(12,34,38,0.08)] focus:outline-none">
            <Dialog.Title className="display text-2xl text-text-primary">
              {title}
            </Dialog.Title>
            <Dialog.Description className="mt-3 text-sm text-text-secondary">
              {forms.lead.subtitle}
            </Dialog.Description>

            {status === "success" ? (
              <p className="mt-8 text-text-primary">{forms.lead.success}</p>
            ) : (
              <form
                className="mt-8 flex flex-col gap-4"
                action={onSubmit}
              >
                <label className="flex flex-col gap-1 text-sm">
                  <span>{forms.lead.fields.name.label}</span>
                  <input
                    name="name"
                    required
                    placeholder={forms.lead.fields.name.placeholder}
                    className="rounded-2xl border border-accent-alt/20 bg-bg px-4 py-3"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm">
                  <span>{forms.lead.fields.company.label}</span>
                  <input
                    name="company"
                    required
                    placeholder={forms.lead.fields.company.placeholder}
                    className="rounded-2xl border border-accent-alt/20 bg-bg px-4 py-3"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm">
                  <span>{forms.lead.fields.email.label}</span>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder={forms.lead.fields.email.placeholder}
                    className="rounded-2xl border border-accent-alt/20 bg-bg px-4 py-3"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm">
                  <span>{forms.lead.fields.note.label}</span>
                  <textarea
                    name="note"
                    rows={3}
                    placeholder={forms.lead.fields.note.placeholder}
                    className="rounded-2xl border border-accent-alt/20 bg-bg px-4 py-3"
                  />
                </label>
                {status === "error" ? (
                  <p className="text-sm text-red-700">{forms.lead.error}</p>
                ) : null}
                <Button type="submit" disabled={status === "loading"}>
                  {forms.lead.submit}
                </Button>
              </form>
            )}

            <Dialog.Close asChild>
              <button
                type="button"
                className="absolute right-4 top-4 text-sm text-text-muted link-sweep"
                aria-label="Close"
              >
                Close
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </LeadModalContext.Provider>
  );
}

export function useLeadModal() {
  const ctx = useContext(LeadModalContext);
  if (!ctx) {
    throw new Error("useLeadModal must be used within LeadModalProvider");
  }
  return ctx;
}
