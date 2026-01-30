import { WorkHero } from "@/components/work/WorkHero";
import { Introduction } from "@/components/work/Introduction";
import { Services } from "@/components/work/Services";
import { Process } from "@/components/work/Process";
import { Projects } from "@/components/work/Projects";
import { Tools } from "@/components/work/Tools";
import { Capabilities } from "@/components/work/Capabilities";
import { Philosophy } from "@/components/work/Philosophy";
import { WorkContact } from "@/components/work/WorkContact";
import { SideNav } from "@/components/work/SideNav";

export const metadata = {
  title: "Work | Satyam",
  description: "AI Automation Engineer - Building applications at the speed of thought using AI-powered tools and modern frameworks.",
};

export default function WorkPage() {
  return (
    <main className="bg-[#0A0A0A] text-white min-h-screen">
      <SideNav />
      <WorkHero />
      <Introduction />
      <Services />
      <Process />
      <Projects />
      <Tools />
      <Capabilities />
      <Philosophy />
      <WorkContact />
    </main>
  );
}
