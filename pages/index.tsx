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
import { CourseDetail, FeedbackList, Stats, Teacher } from "@/lib/types";
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
  let courses = await axios.get<CourseDetail>(`courses/all`);
  let teachers = await axios.get<Teacher>(`accounts/teachers`);
  const stats = await axios.get<Stats>(`courses/stats`);
  const feedback = await axios.get<FeedbackList>(`/tests/feedbacks`);
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
          stats: stats.data,
        },
      };
    }
  }

  return {
    props: {
      courses: courses.data,
      teachers: teachers.data,
      user: user ?? null,
      stats: stats.data,
      feedback: feedback.data,
    },
  };
};

type HomeProps = {
  courses: CourseDetail[];
  teachers: Teacher[];
  user: IUser | null;
  stats: Stats;
  feedback: FeedbackList;
};

export default function Home({
  courses,
  teachers,
  user,
  stats,
  feedback,
}: HomeProps) {
  return (
    <>
      <Metadata />
      <div className={`${inter.className} flex flex-col gap-5`}>
        <Navbar user={user} />
        <Hero />
        <Facts stats={stats} />
        <div className="mx-auto flex flex-col justify-center gap-[120px]">
          <CoursesSection courses={courses} user={user} />
          <InstructorSection teachers={teachers} />
          {feedback.count > 0 && <TestimonialSection data={feedback} />}
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
