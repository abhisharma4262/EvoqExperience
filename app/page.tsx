import { HomeShell } from "@/components/home/HomeShell";
import { ActRail } from "@/components/layout/ActRail";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { FilmProvider } from "@/lib/film/FilmProvider";

export default function HomePage() {
  return (
    <FilmProvider>
      <ScrollProgress />
      <SiteHeader />
      <ActRail />
      <HomeShell />
    </FilmProvider>
  );
}
