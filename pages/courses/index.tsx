import CourseLayout from '@/components/layout/CourseLayout';
import { courses } from '@/data/courses';
import CourseCard from '@/components/CourseCard2';

export default function Courses() {
     return (
          <>
               <CourseLayout>
                    <div className="flex-1 grid grid-cols-4 gap-6">
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