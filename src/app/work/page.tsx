import { WorkHero } from "@/components/work/WorkHero";
import { Introduction } from "@/components/work/Introduction";
import { Services } from "@/components/work/Services";
import { Process } from "@/components/work/Process";
import { Projects } from "@/components/work/Projects";
import { Tools } from "@/components/work/Tools";
import { WhyChoose } from "@/components/work/WhyChoose";
import { WorkContact } from "@/components/work/WorkContact";
import { SideNav } from "@/components/work/SideNav";

export const metadata = {
  title: "Work | Satyam — AI Automation Engineer",
  description: "I build AI chatbots, voice agents, and workflow automations that run your business 24/7. From lead generation to customer support — intelligent systems that save time and scale.",
};

export default function WorkPage() {
  return (
    <main className="bg-[#0A0A0A] text-white min-h-screen">
      <SideNav />

      {/* Boxes live inside WorkHero but overflow into intro & services */}
      <div className="overflow-x-hidden">
        <WorkHero />
        <Introduction />
        <Services />
      </div>

      <Process />
      <Projects />
      <Tools />
      <WhyChoose />
      <WorkContact />
    </main>
  );
}
