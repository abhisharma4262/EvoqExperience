import type { ReactNode } from "react";
import { StudioThemeProvider } from "@/components/studio/StudioThemeProvider";

export default function StudioLayout({ children }: { children: ReactNode }) {
  return <StudioThemeProvider>{children}</StudioThemeProvider>;
}
