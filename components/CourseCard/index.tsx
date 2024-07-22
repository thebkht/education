import { CourseDetail } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export default function Index({
  course,
  ...props
}: { course: CourseDetail } & React.ComponentPropsWithoutRef<"div">) {
  return (
    <>
      <div
        className="flex cursor-pointer flex-col gap-2 rounded-3xl"
        {...props}
      >
        <div className="h-40 w-full rounded-lg">
          <Image
            src={course.image.base64 ?? course.image.src}
            alt={course.name}
            layout="fill"
            className="!relative rounded-lg object-cover"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="line-clamp-2 font-semibold text-second">
            {course.name}
          </h1>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {course.short_description}
          </p>
        </div>
      </div>
    </>
  );
}
