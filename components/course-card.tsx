import Image from "next/image";

export function CourseCard({ course, ...props }: { course: any } & React.ComponentPropsWithoutRef<"div">) {
     return (
          <>
               <div className="flex flex-col gap-2 rounded-3xl">
                    <div className="h-40 rounded-lg w-full">
                         <Image src={course.image} alt={course.title} layout="fill" className="rounded-lg object-cover !relative" />
                    </div>
                    <div className="flex flex-col gap-1">
                         <h1 className="font-semibold text-second line-clamp-2">
                              {course.title}
                         </h1>
                         <p className="text-sm text-muted-foreground line-clamp-2">
                              {course.description}
                         </p>
                    </div>
               </div>
          </>
     )
}