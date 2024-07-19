import { CourseDetail } from "@/lib/types/course";
import Image from "next/image";
import Link from "next/link";

export default function Index({ course, ...props }: { course: CourseDetail } & React.ComponentPropsWithoutRef<"div">) {
     return (
          <>
               <div className="flex flex-col gap-2 rounded-3xl" {...props}>
                    <Link href={`#/courses/${course.id}`}>
                         <div className="h-40 rounded-lg w-full">
                              <Image src={course.image} alt={course.name} layout="fill" className="rounded-lg object-cover !relative" />
                         </div>
                    </Link>
                    <div className="flex flex-col gap-1">
                         <Link href={`#/courses/${course.id}`}>
                              <h1 className="font-semibold text-second line-clamp-2">
                                   {course.name}
                              </h1>
                         </Link>
                         <Link href={`#`}>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                   {course.short_description}
                              </p>
                         </Link>
                    </div>
               </div>
          </>
     )
}