import { PersonalHero } from "@/components/personal/PersonalHero";
import { AboutMe } from "@/components/personal/AboutMe";
import { Interests } from "@/components/personal/Interests";
import { Values } from "@/components/personal/Values";
import { MediaShelf } from "@/components/personal/MediaShelf";
import { BlogPreview } from "@/components/personal/BlogPreview";
import { PersonalFooter } from "@/components/personal/PersonalFooter";
import { PersonalNav } from "@/components/personal/PersonalNav";

export const metadata = {
  title: "Me | Satyam",
  description: "The human behind the code. Life, interests, values, and everything in between.",
};

export default function PersonalPage() {
  return (
    <main className="bg-[#FDF8F3] text-[#2D2A26] min-h-screen overflow-x-hidden">
      <PersonalNav />
      <PersonalHero />
      <AboutMe />
      <Interests />
      <Values />
      <MediaShelf />
      <BlogPreview />
      <PersonalFooter />
    </main>
  );
}
