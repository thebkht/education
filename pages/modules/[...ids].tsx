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
import { CourseDetail, Lesson } from "@/lib/types";
import { IUser } from "@/interfaces/auth";
import notFound from "@/pages/404";
import LessonContent from "@/components/LessonContent";

type Props = {
  lessons: Lesson[];
  lesson: Lesson;
  user: IUser;
};

const getYouTubeVideoID = (url: string): string | null => {
  const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const LecturePage = ({ lessons, user, lesson }: Props) => {
  const router = useRouter();

  const { ids } = router.query;
  const moduleId = ids && ids[0];

  if (!moduleId || !lesson) {
    return notFound();
  }

  return (
    <>
      <Metadata
        title={`${lesson.name}`}
        description={lesson.description}
        noFollow
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
                src={`https://www.youtube.com/embed/${getYouTubeVideoID(lesson.video_url ?? "")}?modestbranding=1&playsinline=1&color=white`}
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
              <LessonContent lessons={lessons} moduleId={Number(moduleId)} />
              <Button type="submit" size="sm" className="h-10 w-fit">
                <div className="flex items-center gap-2 font-medium">
                  <Icons.checkMark className="h-4 w-4" />
                  Tamomlash
                </div>
              </Button>
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
  const token = cookies.token;

  const moduleId = context.params?.ids?.[0];
  const lessonId = context.params?.ids?.[1];

  const lessons = await axios.get<any>(
    `courses/lessons?module=${moduleId}`,
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
    },
  };
};

export const getServerSideProps = AuthMiddleware(getServerSidePropsFunction);

export default LecturePage;
