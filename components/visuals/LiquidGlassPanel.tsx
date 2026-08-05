import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

type LiquidGlassPanelProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
};

const panelBlur: CSSProperties = {
  backdropFilter: "blur(18px) saturate(150%)",
  WebkitBackdropFilter: "blur(18px) saturate(150%)",
};

/** Refractive glass surface for content that benefits from a glass container. */
export function LiquidGlassPanel({
  children,
  className,
  as: Tag = "div",
}: LiquidGlassPanelProps) {
  return (
    <Tag className={cn("liquid-glass-panel", className)} style={panelBlur}>
      {children}
    </Tag>
  );
}
