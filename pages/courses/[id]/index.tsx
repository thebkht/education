import { useRouter } from "next/router";
import CourseLayout from "@/components/layout/CourseLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import Button from "@/components/UI/Button";
import Metadata from "@/components/Metadata";
import { notFound } from "next/navigation";
import { CourseDetail, Module, StudentResult } from "@/lib/types";
import { IUser } from "@/interfaces/auth";
import { GetServerSidePropsContext } from "next";
import AuthMiddleware from "@/middlewares/auth";
import { axios } from "@/api/interseptors";
import { parseCookies } from "nookies";
import { getHeaders } from "@/helpers";
import { useState, useEffect } from "react";
import Header from "@/components/course/Header";
import CourseContent from "@/components/course/CourseContent";

export default function Page({
  course,
  user,
  modules,
  token,
  studentResults,
}: {
  course: CourseDetail;
  user: IUser;
  modules: Module[];
  token: string;
  studentResults: StudentResult[];
}) {
  const router = useRouter();
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setCompleted(modules.every((module) => module.completed));
  }, [modules]);

  const [completedTest, setCompletedTest] = useState<boolean>(false);
  useEffect(() => {
    if (studentResults.length > 0) {
      const result = studentResults.find(
        (result) => result.course.id === course.id && result.type == "1",
      );
      if (result) {
        setCompletedTest(result.finished);
      }
    }
  }, [studentResults, course]);

  if (!course) {
    return notFound();
  }

  return (
    <>
      <Metadata
        title={course.name}
        description={course.short_description}
        image={course.image.src}
        noFollow
      />
      <CourseLayout className="mx-auto" user={user}>
        <div className="mx-auto flex w-full max-w-[1064px] flex-1 flex-col gap-6 py-9">
          <Header course={course} />
          <div>
            <Tabs defaultValue="content" className="space-y-4">
              <TabsList className="gap-4">
                <TabsTrigger value="content">Содержание курса</TabsTrigger>
                <TabsTrigger value="overview">Обзор</TabsTrigger>
              </TabsList>
              <TabsContent
                value="content"
                className="space-y-4 border-none bg-transparent p-0"
              >
                <CourseContent
                  modules={modules}
                  token={token}
                  course={course}
                  completedTest={completedTest}
                />
                <Button className="w-full" disabled={!completed}>
                  Yakuniy testni boshlash
                </Button>
              </TabsContent>
              <TabsContent
                value="overview"
                className="space-y-4 p-4 text-second"
              >
                <h4 className="text-lg font-semibold">Описание курса</h4>
                <p className="text-sm">{course.description}</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CourseLayout>
    </>
  );
}

const getServerSidePropsFunction = async (
  context: GetServerSidePropsContext,
) => {
  const cookies = parseCookies(context);
  const token = cookies.token;
  const course = await axios.get(
    `courses/${context.params?.id}`,
    getHeaders(token),
  );
  const modules = await axios.get(
    `courses/modules?course=${context.params?.id}`,
    getHeaders(token),
  );
  const studentResults = await axios.get(
    "/tests/student-results",
    getHeaders(token),
  );
  return {
    props: {
      course: course.data,
      modules: modules.data,
      token,
      studentResults: studentResults.data,
    },
  };
};

export const getServerSideProps = AuthMiddleware(getServerSidePropsFunction);
