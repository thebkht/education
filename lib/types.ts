import { z } from "zod";

const image = z.object({
  src: z.string(),
  base64: z.string().optional(),
});

export type Image = z.infer<typeof image>;

const courseDetail = z.object({
  id: z.number(),
  title: z.string(),
  short_description: z.string(),
  description: z.string().optional(),
  image: image,
});

export type CourseDetail = z.infer<typeof courseDetail>;

const course = z.object({
  id: z.number(),
  title: z.string(),
  short_description: z.string(),
  has_access: z.boolean(),
  image: image,
  file: z.string().optional(),
});

export type Course = z.infer<typeof course>;

const teacher = z.object({
  fullname: z.string(),
  speciality: z.string(),
  picture: image,
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
  image: image.optional(),
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
  type: z.literal(1).or(z.literal(2)),
  course: courseShort,
  certificate_file: z.string(),
});

export type StudentResult = z.infer<typeof studetResult>;

const initialTestResult = z.object({
  id: z.number(),
  total_questions: z.number(),
  correct_answers: z.number(),
  finished: z.boolean(),
});

export type TestResult = z.infer<typeof initialTestResult>;

export const formSchema = z.object({
  test_enrolment: z.number(),
  answers: z.array(
    z.object({
      question: z.number(),
      option: z.number(),
    }),
  ),
});

const stats = z.object({
  courses_count: z.number(),
  teachers_count: z.number(),
  students_count: z.number(),
});

export type Stats = z.infer<typeof stats>;

const feedback = z.object({
  full_name: z.string(),
  feedback_text: z.string(),
  rating: z.number(),
});

export type Feedback = z.infer<typeof feedback>;

const feedbackList = z.object({
  links: z.object({
    next: z.string().nullable(),
    previous: z.string().nullable(),
  }),
  count: z.number(),
  page_size: z.number(),
  num_pages: z.number(),
  current_page: z.number(),
  countItemsOnPage: z.number(),
  results: z.array(feedback),
});

export type FeedbackList = z.infer<typeof feedbackList>;
