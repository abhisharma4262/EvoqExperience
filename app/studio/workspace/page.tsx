import type { Metadata } from "next";
import { Suspense } from "react";
import { StudioWorkspace } from "@/components/studio/StudioWorkspace";

export const metadata: Metadata = {
  title: "Studio · Dream It. Build It.",
  robots: { index: false, follow: false },
};

export default function StudioWorkspacePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[var(--studio-bg)] text-[var(--studio-muted)]">
          Opening studio…
        </div>
      }
    >
      <StudioWorkspace />
    </Suspense>
  );
}
