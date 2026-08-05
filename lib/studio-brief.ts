import {
  studioBriefDefaults,
  type StudioBriefAnswers,
} from "@/content/studioBrief";

const STORAGE_KEY = "evoq-studio-brief";

export function readStudioBrief(): StudioBriefAnswers | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StudioBriefAnswers>;
    return { ...studioBriefDefaults, ...parsed };
  } catch {
    return null;
  }
}

export function writeStudioBrief(answers: StudioBriefAnswers): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
}

export function clearStudioBrief(): void {
  window.localStorage.removeItem(STORAGE_KEY);
}
