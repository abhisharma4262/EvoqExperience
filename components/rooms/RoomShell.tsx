"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { rooms } from "@/content/rooms";
import { getOrbit } from "@/content/orbits";
import { navigation } from "@/content/navigation";
import type { ModeId } from "@/content/offerings";
import { Button } from "@/components/ui/Button";
import { RuntimeConsole } from "@/components/visuals/RuntimeConsole";
import { SidecarStrip } from "@/components/rooms/SidecarStrip";
import { RoomStoriesStrip } from "@/components/rooms/RoomStoriesStrip";

const CreateDemo = dynamic(
  () => import("@/components/demos/CreateDemo").then((m) => m.CreateDemo),
  { ssr: false },
);
const TransformDemo = dynamic(
  () =>
    import("@/components/demos/TransformDemo").then((m) => m.TransformDemo),
  { ssr: false },
);
const OperateDemo = dynamic(
  () => import("@/components/demos/OperateDemo").then((m) => m.OperateDemo),
  { ssr: false },
);

function homeHref(target: "modes" | "compounding") {
  if (target === "compounding") {
    return "/?scene=compounding#section-compounding";
  }
  return "/?scene=modes#section-modes";
}

export function RoomShell({
  mode,
  variant = "overlay",
}: {
  mode: ModeId;
  variant?: "overlay" | "page";
}) {
  const room = rooms[mode];
  const orbit = getOrbit(mode);
  const router = useRouter();

  const leaveRoom = useCallback(
    (target: "modes" | "compounding" = "modes") => {
      // ModalSlot clears stale intercepting overlays once pathname is "/".
      router.push(homeHref(target));
    },
    [router],
  );

  function returnForward() {
    if (mode === "create") {
      router.push("/studio");
      return;
    }
    leaveRoom(
      orbit.returnTarget === "compounding" ? "compounding" : "modes",
    );
  }

  useEffect(() => {
    if (variant !== "overlay") return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        leaveRoom("modes");
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [variant, leaveRoom]);

  return (
    <div
      className={
        variant === "overlay"
          ? "fixed inset-0 z-50 overflow-y-auto bg-bg"
          : "min-h-screen bg-bg"
      }
      role="dialog"
      aria-modal={variant === "overlay" ? true : undefined}
      aria-label={`${room.title} Room`}
    >
      <div className="film-container space-y-14 py-14">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-text-secondary">
              {room.title}
            </p>
            <p className="mt-1 text-sm text-accent-alt">{orbit.line}</p>
          </div>
          {variant === "page" ? (
            <Button asChild variant="ghost">
              <Link href={homeHref("modes")}>{navigation.enterJourney}</Link>
            </Button>
          ) : (
            <Button
              type="button"
              variant="ghost"
              onClick={() => leaveRoom("modes")}
            >
              Close
            </Button>
          )}
        </div>

        <section className="max-w-3xl space-y-4">
          <h1 className="display text-[clamp(2rem,4.5vw,3.25rem)]">
            {room.moment}
          </h1>
          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
            {room.oldWay.map((item) => (
              <p key={item} className="text-text-muted">
                {item}
              </p>
            ))}
          </div>
        </section>

        <RuntimeConsole />

        <section aria-label={room.demoAriaLabel} className="space-y-4">
          <p className="text-xs uppercase tracking-[0.16em] text-text-muted">
            Inside the work
          </p>
          {mode === "create" ? <CreateDemo /> : null}
          {mode === "transform" ? <TransformDemo /> : null}
          {mode === "operate" ? <OperateDemo /> : null}
        </section>

        <section className="space-y-4 border-t border-accent-alt/15 pt-10">
          <h2 className="display text-[clamp(1.75rem,3vw,2.5rem)]">
            {room.outcome}
          </h2>
          <blockquote className="max-w-2xl text-lg text-text-secondary">
            “{room.quote}”
            <footer className="mt-3 text-sm text-text-muted">
              {room.quoteAttribution}
            </footer>
          </blockquote>
        </section>

        <SidecarStrip mode={mode} />

        <RoomStoriesStrip mode={mode} />

        <Button type="button" size="lg" onClick={returnForward}>
          {navigation.returnToJourney}
        </Button>
      </div>
    </div>
  );
}
