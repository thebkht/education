import { useRouter } from "next/router";
import { getCourseBySlug } from "@/lib/courses";
import CourseLayout from "@/components/layout/CourseLayout";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import { sections } from "@/data/course-chapters";
import Accordion, {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/UI/Accordion";
import { Icons } from "@/components/icons";
import Button from "@/components/UI/Button";
import Metadata from "@/components/Metadata";
import { notFound } from "next/navigation";
import { courses } from "@/data/courses";
import { CourseDetail, Module } from "@/lib/types";
import { IUser } from "@/interfaces/auth";
import { GetServerSidePropsContext } from "next";
import AuthMiddleware from "@/middlewares/auth";
import { axios } from "@/api/interseptors";
import { parseCookies } from "nookies";
import { getHeaders } from "@/helpers";

export default function Page({
  course,
  modules,
  user,
}: {
  course: CourseDetail;
  user: IUser;
  modules: Module[];
}) {
  const router = useRouter();
  const fakeCourse = courses[0];
  console.log(course, "course");
  console.log(modules, "modules");

  if (!course) course = fakeCourse;

  return (
    <>
      <Metadata
        title={course.name}
        description={course.short_description}
        image={course.image.base64}
      />
      <CourseLayout className={"mx-auto"} user={user}>
        <div className="mx-auto flex w-full max-w-[1064px] flex-1 flex-col gap-6 py-9">
          <div className="flex items-center gap-6">
            <div className="flex flex-1 flex-col gap-6">
              <div className="flex flex-col gap-4">
                <h4 className={"text-2xl font-bold text-second"}>
                  {course.name}
                </h4>
                <p className={"text-base text-secondary-foreground"}>
                  {course.short_description}
                </p>
              </div>
            </div>
            <Image
              src={course.image.src}
              alt={course.name}
              width={520}
              height={294}
              placeholder="blur"
              blurDataURL={course.image.base64}
              className="rounded border border-border"
            />
          </div>
          <div>
            <Tabs defaultValue={"content"} className="space-y-4">
              <TabsList className="gap-4">
                <TabsTrigger value={"content"}>Содержание курса</TabsTrigger>
                <TabsTrigger value={"overview"}>Обзор</TabsTrigger>
              </TabsList>
              <TabsContent value={"content"}>
                <Accordion type={"single"} defaultValue="module-1" collapsible>
                  {modules.map((module, index) => (
                    <AccordionItem value={`module-${index + 1}`} key={index}>
                      <AccordionTrigger>
                        <div className="flex w-full items-center justify-between">
                          <div className="flex flex-col gap-1">
                            <div className="flex gap-2 text-lg font-semibold text-second">
                              Раздел {index + 1}:
                              <span
                                className={
                                  "text-left font-normal text-second-foreground"
                                }
                              >
                                {module.name}
                              </span>
                            </div>
                          </div>
                          {/* <span className={"text-sm text-muted-foreground"}>
                            {section.lectures.filter(
                              (lecture) => lecture.completed,
                            ).length +
                              "/" +
                              section.lectures.length}
                          </span> */}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent
                        className={"flex flex-col gap-4 border-b"}
                      >
                        {/* <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            <Icons.play
                              className={
                                "h-[18px] w-[18px] text-second-foreground"
                              }
                            />
                            <div className="flex gap-1 font-semibold text-second">
                              Видео:
                              <span className={"font-normal"}>
                                {section.videos}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icons.list
                              className={
                                "h-[18px] w-[18px] text-second-foreground"
                              }
                            />
                            <div className="flex gap-1 font-semibold text-second">
                              Тест:
                              <span className={"font-normal"}>
                                {section.quizes}
                              </span>
                            </div>
                          </div>
                        </div> */}
                        <p className={"text-second-foreground"}>
                          {module.description}
                        </p>
                      </AccordionContent>
                      {/* {section.lectures.map((lecture, index) => (
                        <AccordionContent key={index}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {!lecture.locked ? (
                                lecture.completed ? (
                                  <Icons.checked
                                    className={"h-8 w-8 text-muted-foreground"}
                                  />
                                ) : (
                                  <Icons.unchecked
                                    className={"h-8 w-8 text-muted-foreground"}
                                  />
                                )
                              ) : (
                                <Icons.lock
                                  className={"h-8 w-8 text-muted-foreground"}
                                />
                              )}
                              <p
                                className={
                                  "max-w-[800px] text-second-foreground"
                                }
                              >
                                {lecture.title}
                              </p>
                            </div>
                            {!lecture.locked &&
                              (index === 0 ? (
                                <Button
                                  size={"sm"}
                                  className={"py-1.5 font-medium"}
                                  onClick={() =>
                                    router.push(`/courses/${course.id}/quiz/1`)
                                  }
                                >
                                  Пройти тест
                                </Button>
                              ) : (
                                <Button
                                  size={"sm"}
                                  className={"py-1.5 font-medium"}
                                  onClick={() =>
                                    router.push(
                                      `/courses/${course.id}/lecture/${section.id}/${lecture.id}`,
                                    )
                                  }
                                >
                                  Продолжить
                                </Button>
                              ))}
                          </div>
                        </AccordionContent>
                      ))} */}
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
              <TabsContent
                value={"overview"}
                className={"space-y-4 p-4 text-second"}
              >
                <h4 className={"text-lg font-semibold"}>Описание курса</h4>
                <p className={"text-sm"}>{course.description}</p>
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
    `/courses/${context.params?.id}`,
    getHeaders(token),
  );
  console.log(course, "course");
  const modules = await axios.get<any>(
    `courses/modules-all?course=${context.params?.id}`,
    getHeaders(token),
  );
  /* const lessons = await axios.get<any>(
    `/courses/lessons?module${modules.data[0].id}`,
    getHeaders(token),
  ); */
  return {
    props: {
      course: course.data,
      modules: modules.data,
    },
  };
};

export const getServerSideProps = AuthMiddleware(getServerSidePropsFunction);
