"use client";

import Link from "next/link";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { rooms } from "@/content/rooms";
import { getOrbit } from "@/content/orbits";
import { navigation } from "@/content/navigation";
import type { ModeId } from "@/content/offerings";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Button } from "@/components/ui/Button";
import { RoomStoriesStrip } from "@/components/rooms/RoomStoriesStrip";
import { ModeArchetypeCatalog } from "@/components/rooms/ModeArchetypeCatalog";

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
      router.push(homeHref(target));
    },
    [router],
  );

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
          <div className="flex items-center gap-5">
            <BrandLogo href="/" surface="light" compact priority />
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-text-secondary">
                {room.title}
              </p>
              <p className="mt-1 text-sm text-accent-alt">{orbit.line}</p>
            </div>
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

        <ModeArchetypeCatalog mode={mode} />

        <RoomStoriesStrip mode={mode} />
      </div>
    </div>
  );
}
