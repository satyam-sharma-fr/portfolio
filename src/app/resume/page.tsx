import { SideNav } from "@/components/work/SideNav";
import { ResumeViewToggle } from "@/components/work/ResumeViewToggle";
import { ResumeView } from "@/components/work/ResumeView";

export const metadata = {
  title: "Resume | Satyam Sharma — AI Automation Engineer",
  description:
    "AI Automation Engineer with 7+ years of experience in business operations, growth, and building chatbots, voice agents, and workflow automations.",
};

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-white">
      <SideNav />
      <ResumeViewToggle />
      <ResumeView />
    </main>
  );
}
