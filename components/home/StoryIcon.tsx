"use client";

import type { CaseStoryIcon } from "@/content/caseStudies";
import { cn } from "@/lib/cn";

const size = 22;

export function StoryIcon({
  icon,
  className,
}: {
  icon: CaseStoryIcon;
  className?: string;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: cn("shrink-0", className),
    "aria-hidden": true as const,
  };

  switch (icon) {
    case "chat":
      return (
        <svg {...common}>
          <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H11l-4 3v-3H6.5A2.5 2.5 0 0 1 4 13.5v-7Z" />
          <path d="M8 9h8M8 12h5" />
        </svg>
      );
    case "checkout":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 10h18" />
          <path d="M7 14h4" />
        </svg>
      );
    case "admissions":
      return (
        <svg {...common}>
          <path d="M4 19V7l8-3 8 3v12" />
          <path d="M9 19v-6h6v6" />
          <path d="M4 10h16" />
        </svg>
      );
    case "platform":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "rules":
      return (
        <svg {...common}>
          <circle cx="6" cy="6" r="2.2" />
          <circle cx="18" cy="6" r="2.2" />
          <circle cx="12" cy="18" r="2.2" />
          <path d="M8 7.2 10.5 15M16 7.2 13.5 15M8.2 6h7.6" />
        </svg>
      );
    case "onboarding":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
          <path d="M17 11v6M14 14h6" />
        </svg>
      );
    case "heal":
      return (
        <svg {...common}>
          <path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10Z" />
          <path d="M12 9v5M9.5 11.5h5" />
        </svg>
      );
    case "fraud":
      return (
        <svg {...common}>
          <path d="M12 3 20 7v5c0 5-3.4 8.4-8 9.5C7.4 20.4 4 17 4 12V7l8-4Z" />
          <path d="M9 12.5 11 14.5 15.5 10" />
        </svg>
      );
    case "support":
      return (
        <svg {...common}>
          <path d="M4 12a8 8 0 0 1 16 0" />
          <path d="M4 12v3.5A1.5 1.5 0 0 0 5.5 17H7v-5H4Z" />
          <path d="M20 12v3.5a1.5 1.5 0 0 1-1.5 1.5H17v-5h3Z" />
          <path d="M12 19v2M10 21h4" />
        </svg>
      );
    default:
      return null;
  }
}
