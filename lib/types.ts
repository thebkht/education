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
  picture: z.object({
    src: z.string(),
    base64: z.string().optional(),
  }),
});

export type Teacher = z.infer<typeof teacher>;

const lesson = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  pdf_file: z.string().optional(),
  presentation_file: z.string().optional(),
  video_file: z.string(),
  completed_date: z.string().optional(),
  started_date: z.string().optional(),
  has_access: z.boolean().optional(),
});

export type Lesson = z.infer<typeof lesson>;

const modules = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  has_access: z.boolean(),
  lessons: z.array(lesson).optional(),
});

export type Module = z.infer<typeof modules>;
