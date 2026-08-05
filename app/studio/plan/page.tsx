import type { Metadata } from "next";
import { AiProductCoach } from "@/components/studio/AiProductCoach";

export const metadata: Metadata = {
  title: "AI Product Coach",
  description:
    "Plan your vision with Evoq AI Product Coach — shape product requirements before you build in Studio.",
  robots: { index: false, follow: false },
};

export default function StudioPlanPage() {
  return <AiProductCoach />;
}
