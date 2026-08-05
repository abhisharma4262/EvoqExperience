"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  readStudioTheme,
  writeStudioTheme,
  type StudioTheme,
} from "@/lib/studio-theme";

type StudioThemeContextValue = {
  theme: StudioTheme;
  setTheme: (theme: StudioTheme) => void;
  toggleTheme: () => void;
  ready: boolean;
};

const StudioThemeContext = createContext<StudioThemeContextValue | null>(null);

export function StudioThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<StudioTheme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setThemeState(readStudioTheme());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.dataset.studioTheme = theme;
    writeStudioTheme(theme);
  }, [theme, ready]);

  const setTheme = useCallback((next: StudioTheme) => {
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme, ready }),
    [theme, setTheme, toggleTheme, ready],
  );

  return (
    <StudioThemeContext.Provider value={value}>
      <div
        className="studio-shell min-h-screen"
        data-studio-theme={theme}
      >
        {children}
      </div>
    </StudioThemeContext.Provider>
  );
}

export function useStudioTheme() {
  const ctx = useContext(StudioThemeContext);
  if (!ctx) {
    throw new Error("useStudioTheme must be used within StudioThemeProvider");
  }
  return ctx;
}
