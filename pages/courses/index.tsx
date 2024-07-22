import Layout from "@/components/layout/CourseLayout";
import CourseCard from "@/components/CourseCard2";
import { Icons } from "@/components/icons";
import Input from "@/components/UI/Input";
import Metadata from "@/components/Metadata";
import { GetServerSideProps } from "next";
import { useUser } from "@/context/UserContext";
import { Course } from "@/lib/types";

type IndexProps = {
  initialUser: User;
  courses: Course[];
};

interface User {
  id: string;
  name: string;
  email: string;
}

export default function Courses({ initialUser, courses }: IndexProps) {
  const user = useUser();
  return (
    <>
      <Metadata title="Mening Kurslarim" description="Kurslar" />
      <Layout>
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
