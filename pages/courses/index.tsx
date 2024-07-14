import CourseLayout from '@/components/layout/CourseLayout';
import { courses } from '@/data/courses';
import CourseCard from '@/components/CourseCard2';
import { Icons } from '@/components/icons';

export default function Courses() {
     return (
          <>
               <CourseLayout>
                    <div className="flex gap-6 items-center">
                         <div className="bg-background w-60 rounded-[4px] py-2.5 px-4 flex items-center gap-2">
                              <input type="text" placeholder="Поиск сотрудника" className="bg-transparent border-none focus:outline-none w-full" />
                              <Icons.search className="w-4 h-4 text-muted-foreground" />
                         </div>
                    </div>
                    <div className="flex-1 grid xl:grid-cols-4 grid-cols-3 gap-x-6 gap-y-4 my-4">
                         {
                              courses.map((course, index) => (
                                   <CourseCard key={index} course={course} />
                              ))
                         }
                    </div>
               </CourseLayout>
          </>
     )
}