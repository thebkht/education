import { Icons } from "@/components/icons";
import { CourseDetail, Module } from "@/lib/types";
import Button from "@/components/UI/Button";
import { useRouter } from "next/router";
import { axios } from "@/api/interseptors";
import { getHeaders } from "@/helpers";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import Link from "next/link";

const Index = ({
  modules,
  token,
  course,
  completedTest,
}: {
  modules: Module[];
  token: string;
  course: CourseDetail;
  completedTest: boolean;
}) => (
  <div className="rounded border border-popover bg-background">
    <div className="flex justify-between overflow-hidden rounded border-b p-4 pl-6 transition-all">
      <div className="flex items-center gap-6">
        <CourseStats
          icon={
            <Icons.play
              className={"h-[18px] w-[18px] text-second-foreground"}
            />
          }
          label="Video"
          count={14}
        />
        <CourseStats
          icon={
            <Icons.list
              className={"h-[18px] w-[18px] text-second-foreground"}
            />
          }
          label="Test"
          count={10}
        />
      </div>
      <span className="text-sm text-muted-foreground">0/1</span>
    </div>
    {modules.map((module, index) => (
      <ModuleCard
        key={index}
        module={module}
        index={index}
        modules={modules}
        token={token}
        course={course}
        completedTest={completedTest}
      />
    ))}
  </div>
);

const CourseStats = ({
  icon,
  label,
  count,
}: {
  icon: JSX.Element;
  label: string;
  count: number;
}) => (
  <div className="flex items-center gap-2">
    {icon}
    <div className="flex gap-1 font-semibold text-second">
      {label}:<span className="font-normal">{count}</span>
    </div>
  </div>
);
const ModuleCard = ({
  module,
  index,
  modules,
  course,
  token,
  completedTest,
}: {
  module: Module;
  index: number;
  modules: Module[];
  token: string;
  course: CourseDetail;
  completedTest: boolean;
}) => {
  const router = useRouter();
  const [completed, setCompleted] = useState(completedTest);

  useEffect(() => {
    setCompleted(completedTest);
  }, [completedTest]);

  const handleGenerateQuestions = async (token: string, type: number) => {
    const promise = async () => {
      try {
        const res = await axios.get<any>(
          `/tests/generate-questions`,
          getHeaders(token, { course: course.id, type }),
        );
        router.push(`/tests/${res.data.test_enrollment}`);
      } catch (e: any) {
        if (
          e.response.status === 400 ||
          e.response.data.message ===
            "Siz boshlang'ich testni topshirib bo'lgansiz"
        ) {
          setCompleted(true);
          throw new Error(e.response.data.message);
        }
        throw new Error("Xatolik yuz berdi");
      }
    };

    toast.promise(promise, {
      loading: "Yuklanmoqda...",
      success: "Test muvaffaqiyatli boshlandi",
      error: (error) => error.message,
    });
  };
  return (
    <div className="cursor-pointer overflow-hidden p-4 pl-6 transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {index !== 0 && !modules[index - 1].completed ? (
            <Icons.lock className="h-8 w-8 text-muted-foreground" />
          ) : module.completed ? (
            <Icons.checked className="h-8 w-8 text-muted-foreground" />
          ) : (
            <Icons.unchecked className="h-8 w-8 text-muted-foreground" />
          )}
          {module.completed ? (
            <Link href={`/modules/${module.id}`}>
              <p className="max-w-[800px] text-second-foreground">
                {module.name}
              </p>
            </Link>
          ) : (
            <p className="max-w-[800px] text-second-foreground">
              {module.name}
            </p>
          )}
        </div>
        {!(index !== 0 && !modules[index - 1].completed) &&
          !module.completed && (
            <Button
              size="sm"
              className="py-1.5 font-medium"
              onClick={() => {
                index === 0 && !completed
                  ? handleGenerateQuestions(token, 1)
                  : router.push(`/modules/${module.id}`);
              }}
            >
              {index === 0 && !completed ? "Testni boshlash" : "Davom etish"}
            </Button>
          )}
      </div>
    </div>
  );
};

export default Index;
