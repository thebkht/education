import Layout from '@/components/layout/CourseLayout';
import CourseCard from '@/components/CourseCard2';
import { Icons } from '@/components/icons';
import Input from '@/components/UI/Input';
import Metadata from '@/components/Metadata';
import { GetServerSideProps } from 'next';
import { useUser } from '@/context/UserContext';
import { Course } from '@/lib/types';

type IndexProps = {
     initialUser: User;
     courses: Course[];
}

interface User {
     id: string;
     name: string;
     email: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
     const res = await fetch(`${process.env.API_URL}/accounts/me`);
     const user = await res.json();

     return {
          props: {
               initialUser: user,
          },
     };
};



export default function Courses({ initialUser, courses }: IndexProps) {
     const user = useUser();
     return (
          <>
               <Metadata title="Mening Kurslarim" description="Kurslar" />
               <Layout >
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
               </Layout>
          </>
     )
}