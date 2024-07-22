import { z } from "zod";

const courseDetail = z.object({
  id: z.number(),
  name: z.string(),
  short_description: z.string(),
  description: z.string().optional(),
  image: z.object({
    src: z.string(),
    base64: z.string().optional(),
  }),
});

export type CourseDetail = z.infer<typeof courseDetail>;

const course = z.object({
  id: z.number(),
  name: z.string(),
  short_description: z.string(),
  has_access: z.boolean(),
  image: z.object({
    src: z.string(),
    base64: z.string().optional(),
  }),
  contract_file: z.string().optional(),
  status: z.number(),
});

export type Course = z.infer<typeof course>;

const teacher = z.object({
  fullname: z.string(),
  speciality: z.string(),
  picture: z.string(),
});

export type Teacher = z.infer<typeof teacher>;

const modules = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  has_access: z.boolean(),
});

export type Module = z.infer<typeof modules>;
