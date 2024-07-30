import { Lesson, Module } from "@/lib/types";
import Accordion, {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/UI/Accordion";
import { useRouter } from "next/router";
import Button from "@/components/UI/Button";
import { axios } from "@/api/interseptors";
import { getHeaders } from "@/helpers";
import { toast } from "sonner";

const Index = ({ lessons, token }: { lessons: Lesson[]; token: string }) => {
  const router = useRouter();
  const handleStartLesson = async (lessonId: Lesson["id"]) => {
    const promise = async () => {
      try {
        const formData = new FormData();
        formData.append("lesson", lessonId.toString());
        const res = await axios.post<any>(
          "courses/start-lesson",
          formData,
          getHeaders(token),
        );
        console.log(res);
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
                }
              }}
              disabled={
                index != 0 && lessons[index - 1].completed_date === null
              }
              noIcon={lesson.started_date === null}
              className="text-left"
            >
              <div className="flex grow items-center gap-1">
                <div className="flex grow gap-2 text-left font-normal text-second-foreground">
                  {index + 1} - dars
                </div>
                {!lesson.started_date ||
                  (index != 0 && lessons[index - 1].completed_date === null && (
                    <Button
                      size={"sm"}
                      onClick={async () => await handleStartLesson(lesson.id)}
                      role="button"
                    >
                      <div>Darsni boshlash</div>
                    </Button>
                  ))}
              </div>
            </AccordionTrigger>
            <AccordionContent className="cursor-pointer border-b bg-background px-4 py-2 hover:bg-accent2">
              {lesson.name}
            </AccordionContent>
            <AccordionContent
              onClick={() => lesson.pdf_file && router.push(lesson.pdf_file)}
              className="cursor-pointer border-b bg-background px-4 py-2 hover:bg-accent2"
            >
              1. Mavzu bo‘yicha o‘quv qo‘llanma (PDF)
            </AccordionContent>
            <AccordionContent
              onClick={() =>
                lesson.presentation_file &&
                router.push(lesson.presentation_file)
              }
              className="cursor-pointer border-b bg-background px-4 py-2 hover:bg-accent2"
            >
              2. Mavzu bo‘yicha o‘quv qo‘llanma (PPT)
            </AccordionContent>
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
      <span>Ваш прогресс:</span>
      <span>
        {completedLessons}/{totalLessons} ({progressPercentage}%)
      </span>
    </div>
  );
};

export default Index;
