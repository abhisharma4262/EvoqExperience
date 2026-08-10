import type { Metadata } from "next";
import { LaunchPlayerGate } from "./LaunchPlayerGate";

export const metadata: Metadata = {
  title: "Evoq videos | EVOQ",
  description:
    "Watch cinematic films that show how Evoq makes enterprise knowledge executable across Create, Transform, and Operate.",
  openGraph: {
    title: "Evoq videos | EVOQ",
    description:
      "Short films for enterprise leaders—see how Evoq turns intent and context into governed execution.",
  },
};

export default function LaunchPage() {
  return (
    <main className="videos-page min-h-screen bg-dark-bg text-on-dark">
      <LaunchPlayerGate />
    </main>
  );
}
