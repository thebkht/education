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
import { CourseDetail, Teacher } from "@/lib/types";
import { axios } from "@/api/interseptors";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps = async () => {
  const courses = await axios.get("/courses/all");

  const teachers = await axios.get("/accounts/teachers");
  return {
    props: {
      courses: courses.data,
      teachers: teachers.data,
    },
  };
};

type HomeProps = {
  courses: CourseDetail[];
  teachers: Teacher[];
};

export default function Home({ courses, teachers }: HomeProps) {
  return (
    <>
      <Metadata />
      <div className={`${inter.className} flex flex-col gap-5`}>
        <Navbar />
        <Hero />
        <Facts />
        <div className="mx-auto flex flex-col justify-center gap-[120px]">
          <CoursesSection courses={courses} />
          <InstructorSection teachers={teachers} />
          <TestimonialSection />
        </div>
        <Footer />
      </div>
    </>
  );
}
