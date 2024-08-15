import Balancer from "react-wrap-balancer";
import CountUp from "react-countup";
import { Stats } from "@/lib/types";

export function Facts({ stats }: { stats: Stats }) {
  return (
    <>
      <div className="container mx-auto flex flex-wrap justify-between gap-y-4 px-4 xl:p-0">
        <h1 className="w-[296px] text-2xl font-semibold text-second">
          <Balancer>
            Istalgan joyda, o&apos;zingizga qulay vaqtda o&apos;qish imkoniyati
          </Balancer>
        </h1>
        <div className="flex w-44 flex-col justify-between">
          <p className="text-3xl font-bold text-primary">
            <CountUp
              end={stats.students_count ?? 0}
              suffix={stats.students_count > 50 ? "+" : ""}
            />
          </p>
          <span className="text-muted-foreground">
            <Balancer>Malaka oshirgan tinglovchilar</Balancer>
          </span>
        </div>
        <div className="flex w-44 flex-col justify-between">
          <p className="text-3xl font-bold text-primary">
            <CountUp
              end={stats.courses_count ?? 0}
              suffix={stats.courses_count > 50 ? "+" : ""}
            />
          </p>
          <span className="text-muted-foreground">
            <Balancer>Malaka oshirish kurslari</Balancer>
          </span>
        </div>
        <div className="flex w-44 flex-col justify-between">
          <p className="text-3xl font-bold text-primary">
            <CountUp
              end={stats.teachers_count ?? 0}
              suffix={stats.teachers_count > 50 ? "+" : ""}
            />
          </p>
          <span className="text-muted-foreground">
            <Balancer>Uzoq yillik tajribaga ega ustozlarimiz</Balancer>
          </span>
        </div>
      </div>
    </>
  );
}
