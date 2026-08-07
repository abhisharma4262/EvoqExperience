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
import { usePathname } from "next/navigation";
import {
  acts,
  sectionAnchors,
  type ActId,
  type SectionId,
} from "@/content/acts";

type FilmContextValue = {
  activeAct: ActId;
  activeSection: SectionId;
  setActiveSection: (section: SectionId) => void;
  scrollToSection: (section: SectionId) => void;
  scrollToAct: (act: ActId) => void;
};

const FilmContext = createContext<FilmContextValue | null>(null);

export function FilmProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState<SectionId>("industry");
  const pathname = usePathname();

  const activeAct = useMemo(() => {
    const act = acts.find((a) => a.sectionIds.includes(activeSection));
    return act?.id ?? 1;
  }, [activeSection]);

  const scrollToSection = useCallback((section: SectionId) => {
    const id = sectionAnchors[section];
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  const scrollToAct = useCallback(
    (actId: ActId) => {
      const act = acts.find((a) => a.id === actId);
      const first = act?.sectionIds[0];
      if (!first) return;
      scrollToSection(first);
    },
    [scrollToSection],
  );

  // Re-run when returning from room overlays (/create → /) so ?scene= scrolls again.
  useEffect(() => {
    if (pathname !== "/") return;
    const section = new URLSearchParams(window.location.search).get(
      "scene",
    ) as SectionId | null;
    if (section && sectionAnchors[section]) {
      requestAnimationFrame(() => scrollToSection(section));
    }
  }, [pathname, scrollToSection]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (!top?.target.id) return;
        const entry = Object.entries(sectionAnchors).find(
          ([, id]) => id === top.target.id,
        );
        if (entry) {
          setActiveSection(entry[0] as SectionId);
        }
      },
      { threshold: [0.35, 0.55], rootMargin: "-10% 0px -35% 0px" },
    );

    Object.values(sectionAnchors).forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const value = useMemo(
    () => ({
      activeAct,
      activeSection,
      setActiveSection,
      scrollToSection,
      scrollToAct,
    }),
    [activeAct, activeSection, scrollToSection, scrollToAct],
  );

  return <FilmContext.Provider value={value}>{children}</FilmContext.Provider>;
}

export function useFilm() {
  const ctx = useContext(FilmContext);
  if (!ctx) throw new Error("useFilm must be used within FilmProvider");
  return ctx;
}
