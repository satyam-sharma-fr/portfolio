import { EstimateWizard } from "@/components/estimate/EstimateWizard";

export const metadata = {
  title: "Free Project Estimate | Satyam — AI Automation Engineer",
  description:
    "Get an instant, AI-powered estimate for your project. Answer a few quick questions and receive a detailed time and cost breakdown — completely free.",
};

export default function EstimatePage() {
  return (
    <main className="bg-[#0A0A0A] text-white min-h-screen">
      <EstimateWizard />
    </main>
  );
}
