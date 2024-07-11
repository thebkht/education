import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import { Hero } from "@/components/hero";
import { Facts } from "@/components/facts";
import { CoursesSection } from "@/components/home/courses-section";
import { InstructorSection } from "@/components/instructors-section";
import { TestimonialSection } from "@/components/testimonials-section";
import Footer from "@/components/layout/Footer";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Avtomobil yo'llari ilmiy-tadqiqot instituti",
}

export default function Home() {
  return (
    <>
      <div className={`${inter.className} flex flex-col gap-8`}>
        <Header />
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
