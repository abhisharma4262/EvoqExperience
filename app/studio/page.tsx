import type { Metadata } from "next";
import { StudioLanding } from "@/components/studio/StudioLanding";

export const metadata: Metadata = {
  title: "Dream It. Build It.",
  description:
    "Dream It. Build It. is Evoq Studio — where agents draft, wire, and preview applications, and you decide what ships.",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  return <StudioLanding />;
}
