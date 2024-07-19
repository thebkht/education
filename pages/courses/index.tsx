import CourseLayout from '@/components/layout/CourseLayout';
import CourseCard from '@/components/CourseCard2';
import { Icons } from '@/components/icons';
import Input from '@/components/UI/Input';
import Metadata from '@/components/Metadata';
import { Course } from '@/lib/types';

export const getServerSideProps = async () => {
     //fetch session from api /accounts/me
     //if session exists, return user data, otherwise return to / page
     const resUser = await fetch(`${process.env.API_URL}/accounts/me`, {
          method: 'GET',
          headers: {
               'Content-Type': 'application/json',
          },
     });
     const userData = await resUser.json();
     if (!userData) {
          return {
               redirect: {
                    destination: '/',
                    permanent: false,
               },
          };
     }

     const res = await fetch(`${process.env.API_URL}/courses/`, {
          method: 'GET',
          headers: {
               'Content-Type': 'application/json',
          },
     });
     const data = await res.json();
     return {
          props: {
               user: userData,
               courses: data,
          },
     };
}

type IndexProps = {
     user: any;
     courses: Course[];
}

export default function Courses({ user, courses }: IndexProps) {
     return (
          <>
               <Metadata title="Mening Kurslarim" description="Kurslar" />
               <CourseLayout user={user} >
                    <div className="box-border">
                         <div className="flex gap-6 items-center">
                              <div className="bg-background w-60 rounded-[4px] py-2.5 px-4 flex items-center gap-2 focus:border-primary focus:border">
                                   <Input type="text" placeholder="Qidiruv" className="bg-transparent border-none focus:outline-none w-full focus-visible:ring-offset-0 focus-visible:ring-0 p-0 h-fit focus-visible:shadow-none" />
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
                    </div>
               </CourseLayout>
          </>
     )
}