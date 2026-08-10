import { SectionIndustry } from "@/components/home/SectionIndustry";
import { SectionChallenge } from "@/components/home/SectionChallenge";
import { SectionWork } from "@/components/home/SectionWork";
import { SectionEvoq } from "@/components/home/SectionEvoq";
import { SectionModes } from "@/components/home/SectionModes";
import { SectionCompounding } from "@/components/home/SectionCompounding";
import { SectionClose } from "@/components/home/SectionClose";

export function HomeShell() {
  return (
    <main>
      <div id="story-shift">
        <SectionIndustry />
      </div>
      <div id="story-execution">
        <SectionChallenge />
        <SectionWork />
      </div>
      <div id="story-evoq">
        <SectionEvoq />
        <SectionModes />
      </div>
      <div id="story-next">
        <SectionCompounding />
        <SectionClose />
      </div>
    </main>
  );
}
