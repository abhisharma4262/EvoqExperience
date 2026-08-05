import { SectionIndustry } from "@/components/home/SectionIndustry";
import { SectionChallenge } from "@/components/home/SectionChallenge";
import { SectionEvoq } from "@/components/home/SectionEvoq";
import { SectionModes } from "@/components/home/SectionModes";
import { SectionCompounding } from "@/components/home/SectionCompounding";
import { SectionStories } from "@/components/home/SectionStories";
import { SectionClose } from "@/components/home/SectionClose";

export function HomeShell() {
  return (
    <main>
      <div id="act-1">
        <SectionIndustry />
        <SectionChallenge />
      </div>
      <div id="act-2">
        <SectionEvoq />
        <SectionModes />
      </div>
      <div id="act-3">
        <SectionCompounding />
        <SectionStories />
        <SectionClose />
      </div>
    </main>
  );
}
