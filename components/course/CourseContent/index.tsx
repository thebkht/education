import { Icons } from "@/components/icons";
import { CourseDetail, InitialTestResult, Module } from "@/lib/types";
import Button from "@/components/UI/Button";
import { useRouter } from "next/router";
import { axios } from "@/api/interseptors";
import { getHeaders } from "@/helpers";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getModuleIsCompleted, getModuleStatus } from "@/lib/modules";

const Index = ({
  modules,
  token,
  course,
  initialTestResult,
}: {
  modules: Module[];
  token: string;
  course: CourseDetail;
  initialTestResult: InitialTestResult;
}) => {
  const router = useRouter();

  const handleGenerateQuestions = async (type: number) => {
    if (initialTestResult.finished) {
      return;
    }

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
        <span className="text-sm text-muted-foreground">
          {initialTestResult.finished
            ? modules.filter((module) => module.completed).length
            : 0}
          /{modules.length}
        </span>
      </div>
      <ModuleCard
        title="Boshlang'ich test"
        status={initialTestResult.finished ? "completed" : "in-process"}
      >
        {initialTestResult.finished ? (
          <div className={"text-second-foreground"}>
            {initialTestResult.correct_answers ?? 0}/
            {initialTestResult.total_questions ?? 0} (
            {Math.floor(
              initialTestResult.correct_answers /
                initialTestResult.total_questions,
            ) * 100 || 0}
            %)
          </div>
        ) : (
          <Button onClick={() => handleGenerateQuestions(1)}>
            Testni yechish
          </Button>
        )}
      </ModuleCard>
      {modules.map((module, index) => (
        <ModuleCard
          key={index}
          title={module.name}
          status={
            !initialTestResult.finished
              ? "lock"
              : getModuleStatus(modules, index)
          }
        />
      ))}
      <ModuleCard
        status={
          initialTestResult.finished && getModuleIsCompleted(modules)
            ? "in-process"
            : "lock"
        }
        title="Yakuniy test"
      >
        {initialTestResult.finished && getModuleIsCompleted(modules) && (
          <Button>Testni yechish</Button>
        )}
      </ModuleCard>
    </div>
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
  title,
  status,
  children,
}: {
  title: string;
  status: "lock" | "in-process" | "completed";
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
          <Link href={`/modules/${module.id}`}>
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
