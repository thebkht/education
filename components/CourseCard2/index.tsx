import Image from "next/image";
import Button from "@/components/UI/Button";
import { Icons } from "../icons";

export default function Index({ course }: { course: any }) {
     return (<>
          <div className="flex flex-col gap-2 rounded-lg border border-border bg-background p-4">
               <div className="flex justify-end items-end flex-1 aspect-video relative">
                    {
                         course.locked ? (
                              <div className="h-full w-full bg-black/40 flex justify-center items-center rounded absolute z-10 backdrop-blur-lg">
                                   <Icons.lock className="text-background h-12 w-12" />
                              </div>
                         ) : (
                              <div className="h-full w-full bg-black/40 rounded absolute z-10"></div>
                         )
                    }
                    {
                        course.new && (
                            <div className="flex gap-2 py-2 px-3 border-t border-l border-border rounded-tl bg-background text-second text-sm absolute right-0 bottom-0 z-20 items-center justify-center">
                                 <div className="h-3 w-3 bg-blue-600 rounded-full"></div>
                                 <span>Новый</span>
                            </div>
                        )
                    }
                    <Image src={course.image} alt={course.title} layout="fill" className="rounded-[4px] object-cover !relative border border-border aspect-video" />
               </div>

               <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                         <div className="flex flex-1 justify-between items-center">
                              {course.topic ?? <span className="text-xs text-muted-foreground">{course.topic}</span>}
                              <div className="flex gap-1 items-end">
                                   <span className="text-xs text-muted-foreground">Ученик:</span>
                                   <span className="text-xs text-muted-foreground">{course.students || 0}</span>
                              </div>
                         </div>
                         <h1 className="font-semibold text-second text-sm line-clamp-2">
                              {course.title}
                         </h1>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-3">
                         {course.description}
                    </p>
                    <Button>Заключить договор на курс</Button>
               </div>
          </div>
     </>)
}