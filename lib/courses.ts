import { courses } from "@/data/courses";

export function getCourseBySlug(slug: string | string[] | undefined) {
  return courses.find((course) => course.slug === slug);
}
