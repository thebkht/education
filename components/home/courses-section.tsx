import CourseCard from "@/components/CourseCard";
import Button from "@/components/UI/Button";
import { courses as fakeCourses } from "@/data/courses";
import { IUser } from "@/interfaces/auth";
import { getAllCourses } from "@/lib/fetchers";
import { CourseDetail } from "@/lib/types";
import { useRouter } from "next/router";

export function CoursesSection({
  courses,
  user,
}: {
  courses: CourseDetail[];
  user: IUser | null;
}) {
  const router = useRouter();

  if (!courses || courses.length === 0) {
    return null;
  }

  return (
    <>
      <div className="container mx-auto space-y-6 px-4 xl:p-0">
        <div className="flex flex-1 gap-1">
          <h3 className="text-2xl font-bold">Kurslar</h3>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {courses?.map((course: CourseDetail, index: number) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
        {user && (
          <Button
            className="mx-auto w-[150px]"
            onClick={() => router.push("/courses")}
          >
            Barchasi
          </Button>
        )}
      </div>
    </>
  );
}
