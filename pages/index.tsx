import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import { Hero } from "@/components/home/hero";
import { Facts } from "@/components/home/facts";
import { CoursesSection } from "@/components/home/courses-section";
import { InstructorSection } from "@/components/home/instructors-section";
import { TestimonialSection } from "@/components/home/testimonials-section";
import Footer from "@/components/layout/Footer";
import Metadata from "@/components/Metadata";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Metadata />
      <div className={`${inter.className} flex flex-col gap-5`}>
        <Navbar />
        <Hero />
        <Facts />
        <div className="flex flex-col gap-[120px] justify-center mx-auto">
          <CoursesSection />
          <InstructorSection />
          <TestimonialSection />
        </div>
        <Footer />
      </div>
    </>
  );
}
