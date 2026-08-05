"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { studio } from "@/content/studio";
import { Button } from "@/components/ui/Button";
import { StudioBrand } from "@/components/studio/StudioBrand";
import { StudioThemeToggle } from "@/components/studio/StudioThemeToggle";
import { useStudioTheme } from "@/components/studio/StudioThemeProvider";
import {
  displayNameFromEmail,
  writeStudioSession,
} from "@/lib/studio-auth";

export function StudioLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme } = useStudioTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nextPath = useMemo(() => {
    const next = searchParams.get("next");
    if (next && next.startsWith("/studio")) return next;
    return "/studio/workspace";
  }, [searchParams]);

  const project = searchParams.get("project");
  const primaryVariant = theme === "dark" ? "onDark" : "primary";

  function completeSignIn(signedEmail: string) {
    writeStudioSession({
      email: signedEmail,
      name: displayNameFromEmail(signedEmail),
      signedInAt: Date.now(),
    });
    const target =
      project === "aurora-direct"
        ? `${nextPath}?project=aurora-direct`
        : nextPath;
    router.push(target);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    if (!email.includes("@") || password.length < 4) {
      setError("Enter a valid email and a password of at least 4 characters.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    completeSignIn(email.trim());
  }

  function ssoSignIn(provider: string) {
    setLoading(true);
    completeSignIn(`${provider.toLowerCase()}.guest@evoq.demo`);
  }

  return (
    <div className="flex min-h-screen bg-[var(--studio-bg)] text-[var(--studio-text)]">
      <div className="relative hidden w-[46%] overflow-hidden border-r border-[var(--studio-border)] lg:block">
        <div className="studio-landing__grid opacity-60" aria-hidden />
        <div className="studio-landing__glow studio-landing__glow--a" aria-hidden />
        <div className="relative z-10 flex h-full flex-col justify-between p-10">
          <div className="flex items-center justify-between gap-3">
            <StudioBrand />
            <StudioThemeToggle />
          </div>
          <div>
            <p className="display text-4xl text-[var(--studio-text)]">
              {studio.tagline}
            </p>
            <p className="mt-4 max-w-sm text-sm text-[var(--studio-muted)]">
              Sign in to open {studio.studioName} — projects, agents, previews,
              and governance in one place.
            </p>
            {project === "aurora-direct" ? (
              <p className="mt-4 rounded-xl border border-[var(--studio-border)] bg-[var(--studio-accent-soft)] px-3 py-2 text-xs text-[var(--studio-accent-bright)]">
                You&apos;ll open the example project{" "}
                <strong>Aurora Direct</strong> after sign-in.
              </p>
            ) : null}
          </div>
          <p className="text-xs text-[var(--studio-subtle)]">EVOQ · Create mode</p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center justify-between gap-3 lg:hidden">
            <StudioBrand />
            <StudioThemeToggle />
          </div>

          <h1 className="display text-3xl text-[var(--studio-text)]">Sign in</h1>
          <p className="mt-2 text-sm text-[var(--studio-muted)]">{studio.loginHint}</p>

          <div className="mt-8 grid gap-3">
            <button
              type="button"
              disabled={loading}
              onClick={() => ssoSignIn("Google")}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[var(--studio-border-strong)] bg-[var(--studio-panel)] text-sm text-[var(--studio-text)] transition hover:bg-[var(--studio-hover)] disabled:opacity-50"
            >
              Continue with Google
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => ssoSignIn("Microsoft")}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[var(--studio-border-strong)] bg-[var(--studio-panel)] text-sm text-[var(--studio-text)] transition hover:bg-[var(--studio-hover)] disabled:opacity-50"
            >
              Continue with Microsoft
            </button>
          </div>

          <div className="my-6 flex items-center gap-3 text-xs text-[var(--studio-subtle)]">
            <span className="h-px flex-1 bg-[var(--studio-border)]" />
            or email
            <span className="h-px flex-1 bg-[var(--studio-border)]" />
          </div>

          <form className="space-y-4" onSubmit={onSubmit}>
            <label className="block text-sm">
              <span className="text-[var(--studio-muted)]">Work email</span>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[var(--studio-border-strong)] bg-[var(--studio-input)] px-4 py-3 text-[var(--studio-text)] outline-none ring-[var(--studio-accent)] placeholder:text-[var(--studio-subtle)] focus:ring-2"
                placeholder="you@company.com"
              />
            </label>
            <label className="block text-sm">
              <span className="text-[var(--studio-muted)]">Password</span>
              <input
                type="password"
                autoComplete="current-password"
                required
                minLength={4}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[var(--studio-border-strong)] bg-[var(--studio-input)] px-4 py-3 text-[var(--studio-text)] outline-none ring-[var(--studio-accent)] placeholder:text-[var(--studio-subtle)] focus:ring-2"
                placeholder="••••••••"
              />
            </label>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <Button
              type="submit"
              variant={primaryVariant}
              className="w-full"
              disabled={loading}
            >
              {loading ? "Signing in…" : "Sign in to Studio"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--studio-subtle)]">
            <Link
              href="/studio"
              className="link-sweep text-[var(--studio-muted)]"
            >
              ← Back to landing
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
