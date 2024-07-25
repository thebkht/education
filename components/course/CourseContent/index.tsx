import { Icons } from "@/components/icons";
import { CourseDetail, Module } from "@/lib/types";
import Button from "@/components/UI/Button";

const Index = ({
  modules,
  courseId,
  router,
}: {
  modules: Module[];
  courseId: CourseDetail["id"];
  router: any;
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
        courseId={courseId}
        router={router}
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
  courseId,
  router,
}: {
  module: Module;
  index: number;
  modules: Module[];
  courseId: CourseDetail["id"];
  router: any;
}) => (
  <div className="overflow-hidden p-4 pl-6 transition-all">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {index !== 0 && !modules[index - 1].completed ? (
          <Icons.lock className="h-8 w-8 text-muted-foreground" />
        ) : module.completed ? (
          <Icons.checked className="h-8 w-8 text-muted-foreground" />
        ) : (
          <Icons.unchecked className="h-8 w-8 text-muted-foreground" />
        )}
        <p className="max-w-[800px] text-second-foreground">{module.name}</p>
      </div>
      {!(index !== 0 && !modules[index - 1].completed) && (
        <Button
          size="sm"
          className="py-1.5 font-medium"
          onClick={() =>
            router.push(`/courses/${courseId}/module/${module.id}`)
          }
        >
          {index !== 0 ? "Testni boshlash" : "Davom etish"}
        </Button>
      )}
    </div>
  </div>
);

export default Index;
