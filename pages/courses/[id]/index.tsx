import { useRouter } from "next/router";
import CourseLayout from "@/components/layout/CourseLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import Button from "@/components/UI/Button";
import Metadata from "@/components/Metadata";
import { notFound } from "next/navigation";
import { CourseDetail, Module, StudentResult, TestResult } from "@/lib/types";
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
  finalTestResult,
  initialTestResult,
}: {
  course: CourseDetail;
  user: IUser;
  modules: Module[];
  token: string;
  finalTestResult: TestResult;
  initialTestResult: TestResult;
}) {
  if (!course) {
    return notFound();
  }

  return (
    <>
      <Metadata
        title={course.title}
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
                <TabsTrigger value="content">Kursi tarkibi</TabsTrigger>
                <TabsTrigger value="overview">Kurs haqida</TabsTrigger>
              </TabsList>
              <TabsContent
                value="content"
                className="space-y-4 border-none bg-transparent p-0"
              >
                <CourseContent
                  modules={modules}
                  token={token}
                  course={course}
                  initialTestResult={initialTestResult}
                  finalTestResult={finalTestResult}
                />
              </TabsContent>
              <TabsContent
                value="overview"
                className="space-y-4 p-4 text-second"
              >
                <h4 className="text-lg font-semibold">Описание курса</h4>
                <div
                  className="text-sm"
                  dangerouslySetInnerHTML={{ __html: course.description || "" }}
                ></div>
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
  const token = cookies["access_token"];
  const course = await axios.get(
    `courses/${context.params?.id}`,
    getHeaders(token),
  );
  const modules = await axios.get(
    "courses/modules-all",
    getHeaders(token, { course_id: context.params?.id }),
  );

  const initialTestResult = await axios.get(
    "tests/initial-result/",
    getHeaders(token, { course_id: context.params?.id, type: 1 }),
  );
  let finalTestResult = await axios.get<TestResult[]>(
    `tests/initial-result/`,
    getHeaders(token, {
      course_id: context.params?.id,
      type: 2,
    }),
  );

  return {
    props: {
      course: course.data,
      modules: modules.data,
      token,
      initialTestResult: initialTestResult.data,
      finalTestResult: finalTestResult.data,
    },
  };
};

export const getServerSideProps = AuthMiddleware(getServerSidePropsFunction);
