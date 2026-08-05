import type { Metadata } from "next";
import { Suspense } from "react";
import { StudioLoginForm } from "@/components/studio/StudioLoginForm";

export const metadata: Metadata = {
  title: "Sign in · Dream It. Build It.",
  robots: { index: false, follow: false },
};

export default function StudioLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[var(--studio-bg)] text-[var(--studio-muted)]">
          Loading…
        </div>
      }
    >
      <StudioLoginForm />
    </Suspense>
  );
}
