"use client";

import { Moon, Sun } from "lucide-react";
import { useStudioTheme } from "@/components/studio/StudioThemeProvider";
import { cn } from "@/lib/cn";

export function StudioThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useStudioTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition",
        "border-[var(--studio-border-strong)] text-[var(--studio-muted)] hover:text-[var(--studio-text)] hover:bg-[var(--studio-hover)]",
        className,
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
      <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}
