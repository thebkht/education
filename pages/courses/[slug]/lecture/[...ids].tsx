import { useRouter } from "next/router";
import CoursesLayout from "@/components/layout/CourseLayout";
import { getCourseBySlug } from "@/lib/courses";
import Accordion, { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/UI/Accordion";
import { sections } from "@/data/course-chapters";
import { Icons } from "@/components/icons";
import Button from "@/components/UI/Button";
import Link from "next/link";

export default function LecturePage() {
     const router = useRouter();
     const { slug, ids } = router.query;

     const section_id = ids ? ids[0] : null;
     const lecture_id = ids ? ids[1] : null;

     const course = getCourseBySlug(slug);

     if (!course) {
          return <p>Course not found</p>
     }

     return (
          <>
               <CoursesLayout>
                    <div className="flex flex-col gap-6">
                         <div className="flex max-w-[1064px] items-center mr-auto">
                              <h3 className="font-semibold text-second text-base">{course.title}</h3>
                         </div>
                         <div className="grid grid-cols-12 gap-6">
                              <div className="flex flex-col gap-4 col-span-8">
                                   <iframe id="ytplayer"
                                        src="https://www.youtube.com/embed/BP7FZsx0gz4?modestbranding=1&playsinline=1&color=white" className="max-w-[1064px] max-h-[600px] w-full aspect-video border shadow rounded" />

                                   <div className="flex gap-3 max-w-[1064px] flex-col">
                                        <div className="text-second font-medium text-lg">Об этом курсе</div>
                                   </div>

                                   <div className="flex flex-col max-w-[1064px] bg-background rounded shadow p-4">
                                        <div className="flex justify-between text-sm w-full">
                                             <p className="text-muted-foreground">Описание курса</p>
                                             <p className="text-second line-clamp-[10] max-w-[68%]">{course.overview}</p>
                                        </div>
                                   </div>
                              </div>
                              <div className="flex flex-col gap-4 col-span-4">
                                   <div className="w-full">
                                        <div className="flex gap-6 rounded-t py-3 px-4 border-b bg-background w-full">
                                             <div className="flex items-center justify-between w-full">
                                                  <h4 className="text-second font-semibold text-base">Содержание курса</h4>
                                                  <div className="flex gap-2 text-second-foreground text-sm">
                                                       <span>
                                                            Ваш прогресс:
                                                       </span>
                                                       <span>
                                                            {
                                                                 sections[0].lectures.filter(lecture => lecture.completed).length + "/" + sections[0].lectures.length
                                                            } ({
                                                                 Math.floor(sections[0].lectures.filter(lecture => lecture.completed).length / sections[0].lectures.length * 100) || 0
                                                            }%)
                                                       </span>
                                                  </div>
                                             </div>
                                        </div>
                                        <Accordion type="single" collapsible defaultValue={`${section_id}`}>
                                             {sections.map((section, index) => (
                                                  <AccordionItem value={`${section.id}`} key={section.id} className="bg-indigo-50">
                                                       <AccordionTrigger>
                                                            <div className="flex justify-between items-center w-full">
                                                                 <div className="flex gap-1 flex-col">
                                                                      <div
                                                                           className="flex gap-2 text-second text-sm font-semibold">
                                                                           Раздел {index + 1}:
                                                                           <span className={'text-second-foreground font-normal'}>
                                                                                {section.title}
                                                                           </span>
                                                                      </div>
                                                                 </div>
                                                                 <span className={'text-muted-foreground text-sm'}>

                                                                 </span>
                                                            </div>
                                                       </AccordionTrigger>
                                                       {section.lectures.map((lecture, index) => (
                                                            <Link href={`/courses/${slug}/lecture/${section.id}/${lecture.id}`} key={lecture.id}>
                                                                 <AccordionContent key={lecture.id} className="bg-background border-b py-2 px-4">
                                                                      <div className="flex items-center justify-between">
                                                                           <div className="flex gap-1 flex-col">

                                                                                <div className="flex gap-2 text-second-foreground items-center text-sm">
                                                                                     <p>
                                                                                          {index + 1}.
                                                                                     </p>
                                                                                     <p className={'line-clamp-1'}>
                                                                                          {lecture.title}
                                                                                     </p>
                                                                                </div>
                                                                                <p className="text-muted-foreground text-xs">
                                                                                     Описание курса
                                                                                </p>
                                                                           </div>

                                                                      </div>
                                                                 </AccordionContent>
                                                            </Link>
                                                       ))}
                                                  </AccordionItem>
                                             ))}
                                        </Accordion>
                                   </div>
                                   <Button
                                        type="submit"
                                        size="sm"
                                        className={
                                             "h-10 w-fit"
                                        }
                                   >
                                        <div className="flex items-center gap-2 font-medium">
                                             <Icons.checkMark className={"h-4 w-4"} />
                                             Завершить
                                        </div>
                                   </Button>
                              </div>
                         </div>
                    </div>
               </CoursesLayout>
          </>
     )
}