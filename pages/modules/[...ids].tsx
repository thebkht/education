import { useRouter } from "next/router";
import Layout from "@/components/layout/CourseLayout";
import { Icons } from "@/components/icons";
import Button from "@/components/UI/Button";
import Metadata from "@/components/Metadata";
import { getHeaders } from "@/helpers";
import { axios } from "@/api/interseptors";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";
import AuthMiddleware from "@/middlewares/auth";
import { Lesson, Module } from "@/lib/types";
import { IUser } from "@/interfaces/auth";
import notFound from "@/pages/404";
import LessonContent from "@/components/LessonContent";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/Skeleton";

type Props = {
  lessons: Lesson[];
  lesson: Lesson;
  user: IUser;
  token: string;
  mod: any;
};

const getVideoID = (url: string): string | null => {
  const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};
const createUrl = (url: string): string => {
  if (
    (url?.startsWith("https://youtu") ||
      url?.startsWith("http://youtu") ||
      url?.startsWith("https://www.youtu")) &&
    getVideoID(url)
  ) {
    return `https://www.youtube.com/embed/${getVideoID(url)}?&modestbranding=1&showinfo=0&autoplay=0&controls=1&loop=1`;
  } else {
    return url + "?&modestbranding=1&showinfo=0&autoplay=0&controls=1&loop=1";
  }
};
const LecturePage = ({
  lessons: initialLessons,
  user,
  lesson,
  token,
  mod,
}: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);

  console.log(lessons);

  useEffect(() => {
    setLessons(initialLessons);
  }, [initialLessons]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const { ids } = router.query;
  const moduleId = ids && ids[0];

  if (!moduleId || !lesson) {
    return notFound();
  }

  const handleFinishLesson = async () => {
    const promise = async () => {
      try {
        const res = await axios.patch<any>(
          "courses/finish-lesson",
          { lesson: lesson.id },
          getHeaders(token),
        );
        const lessons = await axios.get<any>(
          "courses/lessons",
          getHeaders(token, { module: moduleId }),
        );
        setLessons(lessons.data);
        return res.data;
      } catch (error: any) {
        throw new Error("Xatolik yuz berdi");
      }
    };

    toast.promise(promise(), {
      loading: "Yuklanmoqda...",
      success: (data) =>
        data.message ? data.message : "Muvaffaqiyatli yakunlandi",
      error: (error) => error.message,
    });
  };

  return (
    <>
      <Metadata
        title={`${mod.title}`}
        description={lesson.description}
        noFollow
      />
      <Layout user={user}>
        <div className="box-border space-y-6">
          <div className="mr-auto flex max-w-[1064px] items-center">
            <h3 className="text-base font-semibold text-second">
              {lesson.title}
            </h3>
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-8 flex flex-col gap-4">
              <div className="relative aspect-video w-full">
                <iframe
                  id="ytplayer"
                  src={createUrl(lesson.video_url ?? "")}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  className="absolute top-1 aspect-video max-h-[600px] w-full max-w-[1064px] rounded border shadow"
                />
                {loading && (
                  <Skeleton
                    containerClassName="absolute z-[2] rounded top-0 right-0 bottom-0 left-0"
                    className="h-full w-full"
                    baseColor="#d1d5db"
                    highlightColor="#e9e8ed"
                  />
                )}
              </div>
              <div className="flex max-w-[1064px] flex-col gap-3">
                <div className="text-lg font-medium text-second">
                  Kurs haqida
                </div>
              </div>
              <div className="flex max-w-[1064px] flex-col rounded bg-background p-4 shadow">
                <div className="flex w-full justify-between text-sm">
                  <p className="text-muted-foreground">Kurs tavsifi</p>
                  <div
                    className="line-clamp-[10] max-w-[68%] text-second"
                    dangerouslySetInnerHTML={{ __html: lesson.description }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="col-span-4 flex flex-col gap-4">
              <LessonContent
                lessons={lessons}
                token={token}
                moduleId={Number(moduleId)}
                updateLessons={(lessons: Lesson[]) => setLessons(lessons)}
              />
              {lesson?.started_date !== null && !lesson.completed_date && (
                <Button type="submit" size="sm" className="h-10 w-fit">
                  <div
                    className="flex items-center gap-2 font-medium"
                    onClick={handleFinishLesson}
                  >
                    <Icons.checkMark className="h-4 w-4" />
                    Tamomlash
                  </div>
                </Button>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

const getServerSidePropsFunction = async (
  context: GetServerSidePropsContext,
) => {
  const cookies = parseCookies(context);
  const token = cookies["access_token"];

  const moduleId = context.params?.ids?.[0];
  const lessonId = context.params?.ids?.[1];

  const mod = await axios.get<any>(
    `courses/modules/${moduleId}`,
    getHeaders(token),
  );

  const lessons = await axios.get<any>(
    `courses/lessons?module_id=${moduleId}`,
    getHeaders(token),
  );
  if (lessonId && !lessons.data) {
    return {
      notFound: true,
    };
  }

  let lesson = lessonId
    ? lessons.data.find((l: Lesson) => l.id === parseInt(lessonId))
    : lessons.data[0];

  if (!lesson) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      lessons: lessons.data,
      lesson,
      token,
      mod: mod.data,
    },
  };
};

export const getServerSideProps = AuthMiddleware(getServerSidePropsFunction);

export default LecturePage;
