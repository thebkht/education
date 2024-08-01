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
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";
import { AuthService } from "@/services/auth";
import { IUser } from "@/interfaces/auth";
import AuthMiddleware from "@/middlewares/auth";

const inter = Inter({ subsets: ["latin"] });

const getServerSidePropsFunction = async (
  context: GetServerSidePropsContext,
) => {
  let courses = await axios.get<any>(`courses/all`);
  let teachers = await axios.get<any>(`accounts/teachers`);
  const cookies = parseCookies(context);
  const token = cookies.token;
  let user;

  try {
    user = await AuthService.me(token);
  } catch (error) {
    user = null;
  }

  if (!!context?.query?.code) {
    try {
      const user = await AuthService.login(token);
      context.res.setHeader("Set-Cookie", [
        `token=${user?.token}; Max-Age=${24 * 60 * 60}; Path=/; HttpOnly; SameSite=Strict`,
      ]);
      return {
        redirect: {
          destination: "/courses",
          permanent: false,
        },
      };
    } catch (error) {
      return {
        props: {
          courses: courses.data,
          teachers: teachers.data,
          user: null,
        },
      };
    }
  }

  return {
    props: {
      courses: courses.data,
      teachers: teachers.data,
      user: user ?? null,
    },
  };
};

type HomeProps = {
  courses: CourseDetail[];
  teachers: Teacher[];
  user: IUser | null;
};

export default function Home({ courses, teachers, user }: HomeProps) {
  return (
    <>
      <Metadata />
      <div className={`${inter.className} flex flex-col gap-5`}>
        <Navbar user={user} />
        <Hero />
        <Facts />
        <div className="mx-auto flex flex-col justify-center gap-[120px]">
          <CoursesSection courses={courses} user={user} />
          <InstructorSection teachers={teachers} />
          <TestimonialSection />
        </div>
        <Footer />
      </div>
    </>
  );
}

export const getServerSideProps = AuthMiddleware(
  getServerSidePropsFunction,
  true,
);
