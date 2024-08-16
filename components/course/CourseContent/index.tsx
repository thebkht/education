import { Icons } from "@/components/icons";
import { CourseDetail, Module, TestResult } from "@/lib/types";
import Button from "@/components/UI/Button";
import { useRouter } from "next/router";
import { axios } from "@/api/interseptors";
import { getHeaders } from "@/helpers";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getModuleIsCompleted, getModuleStatus } from "@/lib/modules";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/UI/AlertDialog";

const Index = ({
  modules,
  token,
  course,
  initialTestResult,
  finalTestResult,
}: {
  modules: Module[];
  token: string;
  course: CourseDetail;
  initialTestResult: TestResult;
  finalTestResult: TestResult;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [testType, setTestType] = useState<number>(1);

  const handleGenerateQuestions = async (type: number) => {
    if (initialTestResult.finished && type === 1) {
      return;
    }

    if (type === 2 && finalTestResult?.finished) {
      return;
    }

    const promise = async () => {
      try {
        const res = await axios.get<any>(
          `/tests/generate-questions`,
          getHeaders(token, { course_id: course.id, type }),
        );
        router.push(`/tests/${res.data.test_id}`);
      } catch (e: any) {
        if (
          e.response.status === 400 ||
          e.response.data.message ===
            "Siz boshlang'ich testni topshirib bo'lgansiz"
        ) {
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

  const correctAnswers = initialTestResult.correct_answers ?? 0;
  const totalQuestions = initialTestResult.total_questions ?? 0;

  const percentage = ((correctAnswers / (totalQuestions || 1)) * 100).toFixed(
    1,
  );

  return (
    <>
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
              count={modules.length || 0}
            />
            <CourseStats
              icon={
                <Icons.list
                  className={"h-[18px] w-[18px] text-second-foreground"}
                />
              }
              label="Test"
              count={2}
            />
          </div>
          <span className="text-sm text-muted-foreground">
            {initialTestResult.finished
              ? modules.filter((module) => module.completed).length
              : 0}
            /{modules.length}
          </span>
        </div>
        <ModuleCard
          title="Boshlang'ich test"
          url={
            initialTestResult.finished
              ? `/tests/${initialTestResult.id}/results/`
              : undefined
          }
          status={initialTestResult.finished ? "completed" : "in-process"}
        >
          {initialTestResult.finished ? (
            <div className={"text-second-foreground"}>
              {initialTestResult.correct_answers ?? 0}/
              {initialTestResult.total_questions ?? 0} ({percentage}%)
            </div>
          ) : (
            <Button
              size="sm"
              onClick={() => {
                setTestType(1);
                setOpen(true);
              }}
            >
              Testni yechish
            </Button>
          )}
        </ModuleCard>
        {modules.map((module, index) => (
          <ModuleCard
            key={index}
            id={module.id}
            title={module.title}
            status={
              !initialTestResult.finished
                ? "lock"
                : getModuleStatus(modules, index)
            }
          >
            {getModuleStatus(modules, index, !initialTestResult.finished) ===
            "in-process" ? (
              <Button onClick={() => router.push(`/modules/${module.id}`)}>
                Davom etish
              </Button>
            ) : null}
          </ModuleCard>
        ))}
        <ModuleCard
          status={
            finalTestResult.finished
              ? "completed"
              : initialTestResult.finished && getModuleIsCompleted(modules)
                ? "in-process"
                : "lock"
          }
          title="Yakuniy test"
          url={
            finalTestResult?.finished
              ? `/tests/${finalTestResult.id}/results/`
              : undefined
          }
        >
          {initialTestResult.finished &&
            getModuleIsCompleted(modules) &&
            !finalTestResult.finished && (
              <Button
                size="sm"
                onClick={() => {
                  setTestType(2);
                  setOpen(true);
                }}
              >
                Testni yechish
              </Button>
            )}
        </ModuleCard>
      </div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>Testni boshlash</AlertDialogTitle>
          <AlertDialogDescription>
            Siz testni boshlashga ishonchingiz komilmi?
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel className="flex-1">Yo&apos;q</AlertDialogCancel>
            <AlertDialogAction
              className="flex-1"
              onClick={() => handleGenerateQuestions(testType)}
            >
              Ha
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

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
  id,
  title,
  status,
  children,
  url,
}: {
  title: string;
  id?: number;
  status: "lock" | "in-process" | "completed";
  url?: string;
  children?: React.ReactNode | null;
}) => (
  <div className="cursor-pointer overflow-hidden p-4 pl-6 transition-all">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {status == "lock" ? (
          <Icons.lock className="h-8 w-8 text-muted-foreground" />
        ) : status == "completed" ? (
          <Icons.checked className="h-8 w-8 text-muted-foreground" />
        ) : (
          <Icons.unchecked className="h-8 w-8 text-muted-foreground" />
        )}
        {status == "completed" ? (
          <Link href={url ? url : `/modules/${id}`}>
            <p className="max-w-[800px] text-second-foreground">{title}</p>
          </Link>
        ) : (
          <p className="max-w-[800px] text-second-foreground">{title}</p>
        )}
      </div>
      {children}
    </div>
  </div>
);

export default Index;
