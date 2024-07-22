import { Teacher } from "@/lib/types";
import Image from "next/image";

export default function Index({
  instructor,
  ...props
}: { instructor: Teacher } & React.ComponentPropsWithoutRef<"div">) {
  return (
    <>
      <div className="relative flex flex-col-reverse rounded-lg">
        <div className="absolute z-20 h-full w-full rounded-lg bg-gradient-to-b from-slate-50/0 to-black/5"></div>
        <div className="absolute z-10 h-full w-full rounded-lg bg-gradient-to-b from-neutral-50/0 to-black/25"></div>
        <div className="relative flex-1">
          <div className="absolute bottom-3 z-30 flex h-full w-full flex-col items-center justify-end gap-1">
            <p className="text-center font-bold text-primary-foreground md:text-xl xl:text-2xl">
              {instructor.fullname}
            </p>
            <span className="text-center text-sm text-primary-foreground xl:text-base">
              {instructor.speciality}
            </span>
          </div>
        </div>
        <div className="relative z-0 aspect-[28/40] h-full w-full flex-1">
          <Image
            src={instructor.picture}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt={instructor.fullname}
            className="!relative h-full w-full rounded-lg"
          />
        </div>
      </div>
    </>
  );
}
