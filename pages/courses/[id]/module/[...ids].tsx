import { useRouter } from "next/router";
import Layout from "@/components/layout/CourseLayout";
import { getCourseBySlug } from "@/lib/courses";
import Accordion, {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/UI/Accordion";
import { sections } from "@/data/course-chapters";
import { Icons } from "@/components/icons";
import Button from "@/components/UI/Button";
import Link from "next/link";
import Metadata from "@/components/Metadata";
import { getHeaders } from "@/helpers";
import { axios } from "@/api/interseptors";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";
import AuthMiddleware from "@/middlewares/auth";
import { CourseDetail, Lesson, Module } from "@/lib/types";
import { IUser } from "@/interfaces/auth";
import { useEffect, useState } from "react";
import notFound from "@/pages/404";

type Props = {
  course: CourseDetail;
  modules: Module[];
  lessons: Lesson[];
  lesson: Lesson;
  user: IUser;
};

function getYouTubeVideoID(url: string): string | null {
  const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export default function LecturePage({
  course,
  modules,
  lessons,
  user,
  lesson,
}: Props) {
  const router = useRouter();
  if (!course) {
    return notFound();
  }
  const { id, ids } = router.query;
  const lessonId = ids && ids[1];

  const moduleId = ids && ids[0];
  if (!moduleId) {
    return notFound();
  }

  return (
    <>
      <Metadata
        title={`${lesson?.name} - ${course.name}`}
        description={lesson?.description}
        image={course.image.src}
      />
      <Layout user={user}>
        <div className="box-border space-y-6">
          <div className="mr-auto flex max-w-[1064px] items-center">
            <h3 className="text-base font-semibold text-second">
              {lesson.name}
            </h3>
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-8 flex flex-col gap-4">
              <iframe
                id="ytplayer"
                src={`https://www.youtube.com/embed/${getYouTubeVideoID(lesson?.video_url ?? "")}?modestbranding=1&playsinline=1&color=white`}
                className="aspect-video max-h-[600px] w-full max-w-[1064px] rounded border shadow"
              />

              <div className="flex max-w-[1064px] flex-col gap-3">
                <div className="text-lg font-medium text-second">
                  Kurs haqida
                </div>
              </div>

              <div className="flex max-w-[1064px] flex-col rounded bg-background p-4 shadow">
                <div className="flex w-full justify-between text-sm">
                  <p className="text-muted-foreground">Kurs tavsifi</p>
                  <p className="line-clamp-[10] max-w-[68%] text-second">
                    {lesson.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-4 flex flex-col gap-4">
              <div className="w-full">
                <div className="flex w-full gap-6 rounded-t border-b bg-background px-4 py-3">
                  <div className="flex w-full items-center justify-between">
                    <h4 className="text-base font-semibold text-second">
                      Kurs tarkibi
                    </h4>
                    <div className="flex gap-2 text-sm text-second-foreground">
                      <span>Ваш прогресс:</span>
                      <span>
                        {lessons.filter(
                          (lesson) => lesson.completed_date !== null,
                        ).length +
                          "/" +
                          lessons.length}{" "}
                        (
                        {Math.floor(
                          (lessons.filter(
                            (lesson) => lesson.completed_date !== null,
                          ).length /
                            lessons.length) *
                            100,
                        ) || 0}
                        %)
                      </span>
                    </div>
                  </div>
                </div>
                <Accordion
                  type="single"
                  collapsible
                  defaultValue={`${moduleId}`}
                >
                  {modules.map((mod, index) => (
                    <AccordionItem
                      value={`${mod.id}`}
                      key={mod.id}
                      className="bg-accent2"
                    >
                      <AccordionTrigger
                        disabled={index != 0 && !modules[index - 1].completed}
                      >
                        <div className="flex w-full items-center justify-between">
                          <div className="flex flex-col gap-1">
                            <div className="flex gap-2 text-left font-normal text-second-foreground">
                              {mod.name}
                            </div>
                          </div>
                          <span
                            className={"text-sm text-muted-foreground"}
                          ></span>
                        </div>
                      </AccordionTrigger>
                      {lessons.map((lesson, i) => (
                        <Link
                          href={`/courses/${course.id}/module/${mod.id}/${lesson.id}`}
                          key={lesson.id}
                          className={
                            i === 0 && lessons[i - 1]?.completed_date === null
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        >
                          <AccordionContent
                            key={lesson.id}
                            className="border-b bg-background px-4 py-2 hover:bg-accent2"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2 text-sm text-second-foreground">
                                  <p>{index + 1}.</p>
                                  <p className={"line-clamp-1"}>
                                    {lesson.name}
                                  </p>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  {lesson.description}
                                </p>
                              </div>
                            </div>
                          </AccordionContent>
                        </Link>
                      ))}
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
              <Button type="submit" size="sm" className={"h-10 w-fit"}>
                <div className="flex items-center gap-2 font-medium">
                  <Icons.checkMark className={"h-4 w-4"} />
                  Tamomlash
                </div>
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

const getServerSidePropsFunction = async (
  context: GetServerSidePropsContext,
) => {
  const cookies = parseCookies(context);
  const token = cookies.token;
  const course = await axios.get(
    `/courses/${context.params?.id}`,
    getHeaders(token),
  );

  const moduleId = context.params?.ids?.[0];
  const lessonId = context.params?.ids?.[1];

  const modules = await axios.get<any>(
    `courses/modules?course=${context.params?.id}`,
    getHeaders(token),
  );

  if (modules.data === undefined) {
    return {
      notFound: true,
    };
  }

  const mod = modules.data.find(
    (m: Module) => m.id === parseInt(moduleId || ""),
  );

  if (moduleId) {
    if (!mod) {
      return {
        notFound: true,
      };
    }
  }

  const lessons = await axios.get<any>(
    `courses/lessons?module=${moduleId}`,
    getHeaders(token),
  );
  if (lessonId && !lessons.data) {
    return {
      notFound: true,
    };
  }
  console.log(lessons.data, "lessons");

  let lesson;
  if (!lessonId) {
    lesson = lessons.data[0];
  } else {
    lesson = lessons.data.find(
      (l: Lesson) => l.id === parseInt(lessonId || ""),
    );
  }
  console.log(lessonId, lesson, "lesson");
  if (!lesson) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      course: course.data,
      modules: modules.data,
      lessons: lessons.data,
      lesson,
    },
  };
};

export const getServerSideProps = AuthMiddleware(getServerSidePropsFunction);
