import { HomeShell } from "@/components/home/HomeShell";
import { ProgressRail } from "@/components/layout/ProgressRail";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { FilmProvider } from "@/lib/film/FilmProvider";

export default function HomePage() {
  return (
    <FilmProvider>
      <ScrollProgress />
      <SiteHeader />
      <ProgressRail />
      <HomeShell />
    </FilmProvider>
  );
}
