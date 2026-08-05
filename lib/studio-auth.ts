export type StudioSession = {
  email: string;
  name: string;
  signedInAt: number;
};

const STORAGE_KEY = "evoq-studio-session";

export function readStudioSession(): StudioSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StudioSession;
    if (!parsed?.email || !parsed?.name) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeStudioSession(session: StudioSession): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function clearStudioSession(): void {
  window.localStorage.removeItem(STORAGE_KEY);
}

export function displayNameFromEmail(email: string): string {
  const local = email.split("@")[0] ?? "Builder";
  return local
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim() || "Builder";
}
