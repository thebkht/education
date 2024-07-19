import { z } from "zod";

const courseDetail = z.object({
  id: z.string().optional(),
  name: z.string(),
  short_description: z.string(),
  description: z.string().optional(),
  image: z.string(),
});

export type CourseDetail = z.infer<typeof courseDetail>;

const course = z.object({
  id: z.string(),
  name: z.string(),
  short_description: z.string(),
  has_access: z.boolean(),
  image: z.string(),
  contract_file: z.string().optional(),
});

export type Course = z.infer<typeof course>;

const teacher = z.object({
  fullname: z.string(),
  speciality: z.string(),
  picture: z.string(),
});

export type Teacher = z.infer<typeof teacher>;
