import { CourseDetail } from "@/lib/types";
import Image from "next/image";

const Index = ({ course }: { course: CourseDetail }) => (
  <div className="flex items-center gap-6">
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h4 className="text-2xl font-bold text-second">{course.name}</h4>
        <p className="text-base text-secondary-foreground">
          {course.short_description}
        </p>
      </div>
    </div>
    <Image
      src={course.image.src}
      alt={course.name}
      width={520}
      height={294}
      placeholder="blur"
      blurDataURL={course.image.base64}
      className="rounded border border-border"
    />
  </div>
);

export default Index;
