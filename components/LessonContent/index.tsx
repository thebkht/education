import { Lesson, Module } from "@/lib/types";
import Accordion, {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/UI/Accordion";

const Index = ({
  lessons,
  moduleId,
}: {
  lessons: Lesson[];
  moduleId: Module["id"];
}) => (
  <div className="w-full">
    <div className="flex w-full gap-6 rounded-t border-b bg-background px-4 py-3">
      <div className="flex w-full items-center justify-between">
        <h4 className="text-base font-semibold text-second">Kurs tarkibi</h4>
        <Progress lessons={lessons} />
      </div>
    </div>
    <Accordion type="single" collapsible defaultValue={`${moduleId}`}>
      {lessons.map((lesson, index) => (
        <AccordionItem
          value={`${lesson.id}`}
          key={lesson.id}
          className="bg-accent2"
        >
          <AccordionTrigger
            disabled={index != 0 && lessons[index - 1].completed_date === null}
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col gap-1">
                <div className="flex gap-2 text-left font-normal text-second-foreground">
                  {lesson.name}
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="border-b bg-background px-4 py-2 hover:bg-accent2">
            PDF fayl
          </AccordionContent>
          <AccordionContent className="border-b bg-background px-4 py-2 hover:bg-accent2">
            Prezentatsiya fayl
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
);

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
