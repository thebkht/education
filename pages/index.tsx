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
import { CourseDetail } from "@/lib/types";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.API_URL}/courses/all`);
  const data = await res.json();
  return {
    props: {
      courses: data,
    },
  };
}

type HomeProps = {
  courses: CourseDetail[];
}

export default function Home({ courses }: HomeProps) {
  return (
    <>
      <Metadata />
      <div className={`${inter.className} flex flex-col gap-5`}>
        <Navbar />
        <Hero />
        <Facts />
        <div className="flex flex-col gap-[120px] justify-center mx-auto">
          <CoursesSection courses={courses} />
          <InstructorSection />
          <TestimonialSection />
        </div>
        <Footer />
      </div>
    </>
  );
}
