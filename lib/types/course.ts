import { z } from "zod";

const courseDetail = z.object({
  id: z.string(),
  name: z.string(),
  short_description: z.string(),
  description: z.string().optional(),
  image: z.string(),
});

export type CourseDetail = z.infer<typeof courseDetail>;
