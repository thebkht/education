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

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps = async () => {
  const resCourses = await fetch(`${process.env.API_URL}/courses/all`);
  const courseData = await resCourses.json();

  const resTeachers = await fetch(`${process.env.API_URL}/accounts/teachers`);
  const teacherData = await resTeachers.json();
  return {
    props: {
      courses: courseData,
      teachers: teacherData,
    },
  };
}

type HomeProps = {
  courses: CourseDetail[];
  teachers: Teacher[];
}

export default function Home({ courses, teachers }: HomeProps) {
  return (
    <>
      <Metadata />
      <div className={`${inter.className} flex flex-col gap-5`}>
        <Navbar />
        <Hero />
        <Facts />
        <div className="flex flex-col gap-[120px] justify-center mx-auto">
          <CoursesSection courses={courses} />
          <InstructorSection teachers={teachers} />
          <TestimonialSection />
        </div>
        <Footer />
      </div>
    </>
  );
}
