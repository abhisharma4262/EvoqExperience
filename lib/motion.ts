"use client";

import { brand } from "@/content/brand";

export const motionTokens = brand.motion;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export const easeOutExpo = motionTokens.ease;
