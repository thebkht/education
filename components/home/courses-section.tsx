import CourseCard from "@/components/CourseCard";
import { courses } from "@/data/courses";
import Button from "@/components/UI/Button";

export function CoursesSection() {
     return (
          <>
               <div className="flex flex-col container mx-auto gap-6 xl:p-0 px-4">
                    <div className="flex-1 flex gap-1">
                         <h3 className="text-2xl font-bold">Kurslar</h3>
                    </div>
                    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6">
                         {
                              courses.map((course, index) => (
                                   <CourseCard key={index} course={course} />
                              ))
                         }
                    </div>
                    <Button className="w-[150px] mx-auto">Barchasi</Button>
               </div>
          </>
     )
}