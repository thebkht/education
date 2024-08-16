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
        <div className="relative h-40 w-full rounded-lg">
          <Image
            src={course.image.src}
            alt={course.title}
            fill
            placeholder="blur"
            blurDataURL={course.image.base64}
            className="!relative rounded-lg object-cover"
            sizes="(max-width: 1920px) 100vw"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="line-clamp-2 font-semibold text-second">
            {course.title}
          </h1>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {course.short_description}
          </p>
        </div>
      </div>
    </>
  );
}
