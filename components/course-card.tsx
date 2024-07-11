import Image from "next/image";
import Link from "next/link";

export function CourseCard({ course, ...props }: { course: any } & React.ComponentPropsWithoutRef<"div">) {
     return (
          <>
               <div className="flex flex-col gap-2 rounded-3xl">
                    <Link href={`#/courses/${course.slug}`}>
                         <div className="h-40 rounded-lg w-full">
                              <Image src={course.image} alt={course.title} layout="fill" className="rounded-lg object-cover !relative" />
                         </div>
                    </Link>
                    <div className="flex flex-col gap-1">
                         <Link href={`#/courses/${course.slug}`}>
                              <h1 className="font-semibold text-second line-clamp-2">
                                   {course.title}
                              </h1>
                         </Link>
                         <Link href={`#`}>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                   {course.description}
                              </p>
                         </Link>
                    </div>
               </div>
          </>
     )
}