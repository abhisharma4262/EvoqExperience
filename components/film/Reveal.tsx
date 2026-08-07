"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { prefersReducedMotion } from "@/lib/motion";

export function Reveal({
  children,
  className,
  delayMs = 0,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style: CSSProperties | undefined =
    delayMs > 0 && visible
      ? { transitionDelay: `${delayMs}ms` }
      : delayMs > 0 && !visible
        ? { transitionDelay: "0ms" }
        : undefined;

  return (
    <div
      ref={ref}
      style={style}
      className={cn(
        "transition-all duration-[700ms] ease-[var(--ease-out-expo)]",
        visible ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
