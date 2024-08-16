import { Teacher } from "@/lib/types";
import Image from "next/image";

type IndexProps = {
  instructor: Teacher;
} & React.ComponentPropsWithoutRef<"div">;

export default function Index({ instructor, ...props }: IndexProps) {
  return (
    <div className="relative flex flex-col-reverse rounded-lg" {...props}>
      <div className="absolute inset-0 z-20 rounded-lg bg-gradient-to-b from-slate-50/0 to-black/5"></div>
      <div className="absolute inset-0 z-10 rounded-lg bg-gradient-to-b from-neutral-50/0 to-black/25"></div>
      <div className="absolute z-30 flex w-full flex-1 items-end justify-center pb-3">
        <div className="w-full text-center">
          <p className="font-bold text-primary-foreground md:text-xl xl:text-2xl">
            {instructor.fullname}
          </p>
          <span className="text-sm text-primary-foreground xl:text-base">
            {instructor.speciality}
          </span>
        </div>
      </div>
      <div className="relative aspect-[28/40] h-full w-full flex-1">
        <Image
          src={instructor.picture.src}
          fill
          placeholder="blur"
          blurDataURL={instructor.picture.base64}
          alt={instructor.fullname}
          className="rounded-lg object-cover object-center"
        />
      </div>
    </div>
  );
}
