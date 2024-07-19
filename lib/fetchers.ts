export async function getAllCourses() {
  const res = await fetch(`${process.env.API_URL}/courses/all`);
  const data = await res.json();
  return data;
}
