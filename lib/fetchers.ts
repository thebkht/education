import { CourseDetail } from "./types/course";

export async function getAllCourses() {
  const res = await fetch(`${process.env.API_URL}/courses/all`);
  const data = await res.json();
  return data;
}

export async function getCourses() {
  const res = await fetch(`${process.env.API_URL}/courses`);
  const data = await res.json();
  return data;
}

export async function getCourse({ id }: CourseDetail) {
  const res = await fetch(`${process.env.API_URL}/courses/${id}`);
  const data = await res.json();
  return data;
}
