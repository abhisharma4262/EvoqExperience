"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const ROOM_PATHS = new Set(["/create", "/transform", "/operate"]);

/**
 * Intercepting-route soft navigations can leave the @modal parallel slot
 * stuck after the URL has already returned home. Only render room overlays
 * while the pathname is actually a room.
 */
export function ModalSlot({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (!ROOM_PATHS.has(pathname)) {
    return null;
  }
  return children;
}
