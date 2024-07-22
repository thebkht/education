import Layout from "@/components/layout/CourseLayout";
import CourseCard from "@/components/CourseCard2";
import { Icons } from "@/components/icons";
import Input from "@/components/UI/Input";
import Metadata from "@/components/Metadata";
import { Course } from "@/lib/types";
import { IUser } from "@/interfaces/auth";
import { GetServerSidePropsContext } from "next";
import { axios } from "@/api/interseptors";
import { parseCookies } from "nookies";
import { getHeaders } from "@/helpers";
import AuthMiddleware from "@/middlewares/auth";

type IndexProps = {
  user: IUser;
  courses: Course[];
};

export default function Courses({ user, courses }: IndexProps) {
  return (
    <>
      <Metadata title="Mening Kurslarim" description="Kurslar" />
      <Layout user={user}>
        <div className="box-border">
          <div className="flex items-center gap-6">
            <div className="flex w-60 items-center gap-2 rounded-[4px] bg-background px-4 py-2.5 focus:border focus:border-primary">
              <Input
                type="text"
                placeholder="Qidiruv"
                className="h-fit w-full border-none bg-transparent p-0 focus:outline-none focus-visible:shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Icons.search className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <div className="my-4 grid flex-1 grid-cols-3 gap-x-6 gap-y-4 xl:grid-cols-4">
            {courses?.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
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
  let courses = await axios.get<any>(`courses`, getHeaders(token));

  return {
    props: {
      courses: courses.data,
    },
  };
};

export const getServerSideProps = AuthMiddleware(getServerSidePropsFunction);
