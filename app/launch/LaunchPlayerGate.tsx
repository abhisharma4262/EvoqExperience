"use client";

import dynamic from "next/dynamic";

const LaunchPlayer = dynamic(
  () =>
    import("./LaunchPlayer").then((mod) => ({ default: mod.LaunchPlayer })),
  {
    ssr: false,
    loading: () => (
      <div className="film-container flex min-h-[70vh] items-center justify-center py-24">
        <div className="videos-page__loading" aria-live="polite">
          <span className="videos-page__loading-mark" />
          Preparing the screening…
        </div>
      </div>
    ),
  },
);

export function LaunchPlayerGate() {
  return <LaunchPlayer />;
}
