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
  file: z.string().optional(),
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
  video_url: z.string(),
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
  completed: z.boolean().optional(),
});

export type Module = z.infer<typeof modules>;

const option = z.object({
  id: z.number(),
  title: z.string(),
});

const question = z.object({
  id: z.number(),
  title: z.string(),
  type: z.enum(["1", "2"]),
  options: z.array(option),
});

const test = z.object({
  id: z.number(),
  started_at: z.string(),
  questions: z.array(question),
  type: z.enum(["1", "2"]),
  total_questions: z.number(),
  finished: z.boolean(),
});

export type Test = z.infer<typeof test>;

const courseShort = z.object({
  id: z.number(),
  name: z.string(),
  short_description: z.string(),
});

const studetResult = z.object({
  id: z.number(),
  total_questions: z.number(),
  correct_answers: z.number(),
  finished: z.boolean(),
  type: z.enum(["1", "2"]),
  course: courseShort,
  certificate_file: z.string(),
});

export type StudentResult = z.infer<typeof studetResult>;
