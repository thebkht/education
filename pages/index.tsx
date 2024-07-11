import Image from "next/image";
import { Inter } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Facts } from "@/components/facts";
import { CoursesSection } from "@/components/courses-section";
import { InstructorSection } from "@/components/instructors-section";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className={`${inter.className} flex flex-col gap-8`}>
        <SiteHeader />
        <Hero />
        <Facts />
        <div className="flex flex-col max-w-[1440px] gap-[120px] justify-center">
          <CoursesSection />
          <InstructorSection />
        </div>
      </div>
    </>
  );
}
