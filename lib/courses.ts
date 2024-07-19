import { courses } from "@/data/courses";

export function getCourseBySlug(slug: string) {
  //return course by index(slug)
  return courses[Number(slug) - 1];
}
