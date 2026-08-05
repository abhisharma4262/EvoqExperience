export const brand = {
  name: "EVOQ",
  tagline: "The execution runtime for the agentic enterprise.",
  positioning:
    "One execution system. Three modes of business reinvention.",
  /** Wordmark assets — use `light` on light UIs, `dark` on dark UIs. */
  logos: {
    /** Dark teal letters + green Q tail — for light backgrounds */
    light: "/brand/evoq-logo-light.png",
    /** Pale letters + green Q tail — for dark backgrounds */
    dark: "/brand/evoq-logo-dark.png",
  },
  colors: {
    bg: "#F6F3F0",
    surface: "#FFFFFF",
    textPrimary: "#0C2226",
    textSecondary: "#194247",
    textMuted: "#556670",
    accent: "#09A78D",
    accentAlt: "#337077",
    darkBg: "#0C2226",
    onDark: "#F6F3F0",
    accentOnDark: "#52E081",
    highlightOnDark: "#E5FD84",
    chart1: "#94DEA5",
    chart2: "#285C62",
    chart3: "#CBEBBD",
    chart4: "#163439",
  },
  typography: {
    display: "var(--font-geist-sans)",
    body: "var(--font-geist-sans)",
    mono: "var(--font-geist-mono)",
    scale: {
      displayXl: "clamp(2.5rem, 6vw, 6rem)",
      displayLg: "clamp(2.25rem, 5vw, 4.5rem)",
      displayMd: "clamp(2rem, 4vw, 3.5rem)",
      displaySm: "clamp(1.75rem, 3vw, 2.5rem)",
      title: "1.75rem",
      bodyLg: "1.25rem",
      body: "1.0625rem",
      bodySm: "1rem",
      caption: "0.875rem",
    },
  },
  space: {
    sectionDesktop: "10rem",
    sectionTablet: "6rem",
    sectionMobile: "4.5rem",
    gutter: "1.5rem",
    maxWidth: "80rem",
  },
  motion: {
    ease: "cubic-bezier(0.16, 1, 0.3, 1)",
    micro: 120,
    small: 240,
    medium: 400,
    large: 600,
    diagramIntro: 2000,
  },
  radius: {
    card: "1rem",
    panel: "1.5rem",
    pill: "999px",
  },
} as const;

export type Brand = typeof brand;
