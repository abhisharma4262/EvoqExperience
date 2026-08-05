export type StudioTheme = "light" | "dark";

const STORAGE_KEY = "evoq-studio-theme";

export function readStudioTheme(): StudioTheme {
  if (typeof window === "undefined") return "light";
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === "dark" || raw === "light") return raw;
  } catch {
    /* ignore */
  }
  return "light";
}

export function writeStudioTheme(theme: StudioTheme): void {
  window.localStorage.setItem(STORAGE_KEY, theme);
}
