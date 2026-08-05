import type { Metadata } from "next";
import { StudioBrief } from "@/components/studio/StudioBrief";

export const metadata: Metadata = {
  title: "Quick brief · Dream It. Build It.",
  description:
    "Answer a few business questions before agents start building in Evoq Studio.",
  robots: { index: false, follow: false },
};

export default function StudioBriefPage() {
  return <StudioBrief />;
}
