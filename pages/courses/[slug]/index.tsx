import { useRouter } from "next/router";
import { getCourseBySlug } from "@/lib/courses";
import { notFound } from "next/navigation";
import CourseLayout from "@/components/layout/CourseLayout";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import { sections } from "@/data/course-chapters";
import Accordion, { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/UI/Accordion";
import { Icons } from "@/components/icons";
import Button from "@/components/UI/Button"
import Metadata from "@/components/Metadata";

export default function Page() {
     const router = useRouter();
     const course = getCourseBySlug(router.query.slug)

     if (!course) return notFound();

     return (
          <>
               <Metadata title={course.title} description={course.description} image={course.image} />
               <CourseLayout className={"mx-auto"}>
                    <div className="flex-1 max-w-5xl flex flex-col gap-6 py-9 mx-auto w-full">
                         <div className="flex items-center gap-6">
                              <div className="flex flex-col gap-6 flex-1">
                                   <div className="flex flex-col gap-4">
                                        <h4 className={'font-bold text-2xl text-second'}>{course.title}</h4>
                                        <p className={'text-second-foreground text-base'}>{course.description}</p>
                                   </div>
                              </div>
                              <Image src={course.image} alt={course.title} width={520} height={294}
                                   className="rounded border border-border" />
                         </div>
                         <div>
                              <Tabs defaultValue={'content'} className="space-y-4">
                                   <TabsList className="gap-4">
                                        <TabsTrigger value={"content"}>Содержание курса</TabsTrigger>
                                        <TabsTrigger value={"overview"}>Обзор</TabsTrigger>
                                   </TabsList>
                                   <TabsContent value={"content"}>
                                        <Accordion type={"single"} defaultValue="chapter-1" collapsible>
                                             {
                                                  sections.map((section, index) => (
                                                       <AccordionItem value={`chapter-${index + 1}`} key={index} >
                                                            <AccordionTrigger>
                                                                 <div className="flex justify-between items-center w-full">
                                                                      <div className="flex gap-1 flex-col">
                                                                           <div
                                                                                className="flex gap-2 text-second text-lg font-semibold">
                                                                                Раздел {index + 1}:
                                                                                <span className={'text-second-foreground font-normal'}>
                                                                                     {section.title}
                                                                                </span>
                                                                           </div>
                                                                      </div>
                                                                      <span className={'text-muted-foreground text-sm'}>
                                                                           {
                                                                                section.lectures.filter(lecture => lecture.completed).length + "/" + section.lectures.length
                                                                           }
                                                                      </span>
                                                                 </div>
                                                            </AccordionTrigger>
                                                            <AccordionContent className={'flex flex-col gap-4 border-b'}>
                                                                 <div className="flex items-center gap-6">
                                                                      <div className="flex items-center gap-2">
                                                                           <Icons.play
                                                                                className={'h-[18px] w-[18px] text-second-foreground'} />
                                                                           <div className="flex gap-1 font-semibold text-second">
                                                                                Видео:
                                                                                <span className={'font-normal'}>{section.videos}</span>
                                                                           </div>
                                                                      </div>
                                                                      <div className="flex items-center gap-2">
                                                                           <Icons.list
                                                                                className={'h-[18px] w-[18px] text-second-foreground'} />
                                                                           <div className="flex gap-1 font-semibold text-second">
                                                                                Тест:
                                                                                <span className={'font-normal'}>{section.quizes}</span>
                                                                           </div>
                                                                      </div>
                                                                 </div>
                                                                 <p className={'text-second-foreground'}>
                                                                      {section.desc}
                                                                 </p>
                                                            </AccordionContent>
                                                            {
                                                                 section.lectures.map((lecture, index) => (
                                                                      <AccordionContent key={index}>
                                                                           <div className="flex items-center justify-between">
                                                                                <div className="flex gap-2 items-center">
                                                                                     {
                                                                                          !lecture.locked ? (lecture.completed ? (
                                                                                               <Icons.checked className={'h-8 w-8 text-muted-foreground'} />
                                                                                          ) : (
                                                                                               <Icons.unchecked className={'h-8 w-8 text-muted-foreground'} />
                                                                                          )) : (
                                                                                               <Icons.lock className={'h-8 w-8 text-muted-foreground'} />
                                                                                          )
                                                                                     }
                                                                                     <p className={'text-second-foreground max-w-[800px]'}>
                                                                                          {lecture.title}
                                                                                     </p>
                                                                                </div>
                                                                                {
                                                                                     !lecture.locked && (index === 0 ? (
                                                                                          <Button size={'sm'} className={'font-medium py-1.5'}
                                                                                               onClick={
                                                                                                    () => router.push(`/courses/${course.slug}/quiz/1`)
                                                                                               }>
                                                                                               Пройти тест
                                                                                          </Button>
                                                                                     ) : (
                                                                                          <Button size={'sm'} className={'font-medium py-1.5'}
                                                                                               onClick={
                                                                                                    () => router.push(`/courses/${course.slug}/lecture/${section.id}/${lecture.id}`)
                                                                                               }>
                                                                                               Продолжить
                                                                                          </Button>
                                                                                     ))
                                                                                }
                                                                           </div>
                                                                      </AccordionContent>
                                                                 ))
                                                            }
                                                       </AccordionItem>
                                                  ))
                                             }
                                        </Accordion>
                                   </TabsContent>
                                   <TabsContent value={"overview"} className={"space-y-4 text-second p-4"}>
                                        <h4 className={"font-semibold text-lg"}>
                                             Описание курса
                                        </h4>
                                        <p className={"text-sm"}>
                                             {course.overview}
                                        </p>
                                   </TabsContent>
                              </Tabs>
                         </div>
                    </div>
               </CourseLayout>
          </>
     )
}