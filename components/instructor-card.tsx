import Image from "next/image";

export function InstructorCard({ instructor, ...props }: { instructor: any } & React.ComponentPropsWithoutRef<"div">) {
     return (
          <>
               <div className="flex flex-col-reverse rounded-lg relative">
                    <div className="bg-gradient-to-b to-black/5 from-slate-50/0 h-full w-full absolute z-20"></div>
                    <div className="bg-gradient-to-b to-black/25 from-neutral-50/0 h-full w-full absolute z-10"></div>
                    <div className="flex-1 relative">
                         <div className="flex flex-col gap-1 items-center justify-end w-full h-full absolute bottom-3 z-30">
                              <p className="text-2xl font-bold text-primary-foreground">
                                   {instructor.name}
                              </p>
                              <span className="text-primary-foreground">
                                   {instructor.position}
                              </span>
                         </div>
                    </div>
                    <div className="w-full h-full flex-1 relative z-0">
                         <div className="inset-0">
                              <Image src={instructor.image} layout="fill"
                                   objectFit="cover"
                                   objectPosition="center" alt={instructor.name} className="rounded-lg h-full w-full !relative" />
                         </div>
                    </div>
               </div>
          </>
     )
}