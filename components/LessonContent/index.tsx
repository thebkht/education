import { Lesson, Module } from "@/lib/types";
import Accordion, {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/UI/Accordion";
import { useRouter } from "next/router";
import Button, { buttonVariants } from "@/components/UI/Button";
import { axios } from "@/api/interseptors";
import { getHeaders } from "@/helpers";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const Index = ({
  lessons: initialLessons,
  token,
  moduleId,
  updateLessons,
}: {
  lessons: Lesson[];
  token: string;
  moduleId: Module["id"];
  updateLessons: (lessons: Lesson[]) => void;
}) => {
  const router = useRouter();
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);

  useEffect(() => {
    setLessons(initialLessons);
  }, [initialLessons]);

  const handleStartLesson = async (lessonId: Lesson["id"]) => {
    const promise = async () => {
      try {
        const res = await axios.post<any>(
          `courses/lessons/start/${lessonId}/`,
          getHeaders(token),
        );
        const lessons = await axios.get<any>(
          "courses/lessons",
          getHeaders(token, { module: moduleId }),
        );
        setLessons(lessons.data);
        updateLessons(lessons.data);
        return res.data;
      } catch (error: any) {
        console.log(error);
        throw new Error(error.response.data.message);
      }
    };

    toast.promise(promise(), {
      loading: "Yuklanmoqda...",
      success: (data) => data.message,
      error: (error) => error.message,
    });
  };
  return (
    <div className="w-full">
      <div className="flex w-full gap-6 rounded-t border-b bg-background px-4 py-3">
        <div className="flex w-full items-center justify-between">
          <h4 className="text-base font-semibold text-second">Kurs tarkibi</h4>
          <Progress lessons={lessons} />
        </div>
      </div>
      <Accordion
        type="single"
        collapsible
        defaultValue={lessons
          .find((lesson) => lesson.started_date !== null)
          ?.id.toString()}
      >
        {lessons.map((lesson, index) => (
          <AccordionItem
            value={`${lesson.id}`}
            key={lesson.id}
            className="bg-accent2"
          >
            <AccordionTrigger
              onClick={() => {
                if (lesson.started_date === null) {
                  handleStartLesson(lesson.id);
                } else {
                  router.push(`/modules/${moduleId}/${lesson.id}`);
                }
              }}
              disabled={
                index != 0 && lessons[index - 1].completed_date === null
              }
              noIcon={lesson.started_date === null}
              className="text-left"
            >
              <div className="flex grow items-center gap-1">
                <div
                  className={`flex grow gap-2 text-left font-semibold ${lesson.completed_date !== null ? "text-primary" : "text-second-foreground"}`}
                >
                  {index + 1} - dars
                </div>
                {index == 0
                  ? !lesson.started_date && (
                      <div
                        className={buttonVariants({ size: "sm" })}
                        role="button"
                      >
                        <div>Darsni boshlash</div>
                      </div>
                    )
                  : !lesson.started_date &&
                    !lessons[index - 1].completed_date && (
                      <div
                        className={buttonVariants({ size: "sm" })}
                        role="button"
                      >
                        <div>Darsni boshlash</div>
                      </div>
                    )}
              </div>
            </AccordionTrigger>
            <AccordionContent
              className={`cursor-pointer border-b bg-background px-4 py-2 hover:bg-accent2`}
            >
              {lesson.title}
            </AccordionContent>
            {lesson.pdf_file && (
              <AccordionContent
                onClick={() => lesson.pdf_file && router.push(lesson.pdf_file)}
                className="cursor-pointer border-b bg-background px-4 py-2 hover:bg-accent2"
              >
                1. Mavzu bo‘yicha o‘quv qo‘llanma (PDF)
              </AccordionContent>
            )}
            {lesson.presentation_file && (
              <AccordionContent
                onClick={() =>
                  lesson.presentation_file &&
                  router.push(lesson.presentation_file)
                }
                className="cursor-pointer border-b bg-background px-4 py-2 hover:bg-accent2"
              >
                2. Mavzu bo‘yicha o‘quv qo‘llanma (PPT)
              </AccordionContent>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

const Progress = ({ lessons }: { lessons: Lesson[] }) => {
  const completedLessons = lessons.filter(
    (lesson) => lesson.completed_date !== null,
  ).length;
  const totalLessons = lessons.length;
  const progressPercentage =
    Math.floor((completedLessons / totalLessons) * 100) || 0;

  return (
    <div className="flex gap-2 text-sm text-second-foreground">
      <span>
        {completedLessons}/{totalLessons} ({progressPercentage}%)
      </span>
    </div>
  );
};

export default Index;
