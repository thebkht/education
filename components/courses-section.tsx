import { CourseCard } from "./course-card";
import { courses } from "./courses";

export function CoursesSection() {
     return (
          <>
               <div className="flex flex-col container mx-auto gap-6">
                    <div className="flex-1 flex gap-1">
                         <h3 className="text-2xl font-bold">Kurslar</h3>
                    </div>
                    <div className="grid grid-cols-4 gap-6">
                         {
                              courses.map((course, index) => (
                                   <CourseCard key={index} course={course} />
                              ))
                         }
                    </div>
                    <button className="bg-primary border border-primary text-primary-foreground px-3 py-4 rounded-[4px] w-[150px] mx-auto leading-4">Barchasi</button>
               </div>
          </>
     )
}