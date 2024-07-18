import Image from "next/image";
import Button from "@/components/UI/Button";
import { Icons } from "../icons";
import {
     AlertDialog,
     AlertDialogAction,
     AlertDialogContent,
     AlertDialogDescription,
     AlertDialogTrigger
} from "@/components/UI/AlertDialog";
import Balancer from "react-wrap-balancer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/UI/DIalog";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

export default function Index({ course }: { course: any }) {
     const router = useRouter();
     const [open, setOpen] = React.useState(false);
     return (<>
          <AlertDialog open={open} onOpenChange={setOpen}>
               <AlertDialogContent>
                    <AlertDialogDescription className={'text-center'}>
                         <Balancer>
                              Если вы произвели оплату, но курсы не открылись, обратитесь к администратору системы.
                              тел: +998 (71) 123-45-67
                         </Balancer>
                    </AlertDialogDescription>
                    <AlertDialogAction className={'w-fit mx-auto'}>
                         Понятно
                    </AlertDialogAction>
               </AlertDialogContent>
          </AlertDialog>
          <div className="flex flex-col gap-2 rounded-lg border border-border bg-background p-4 hover:shadow-lg shadow-md">
               <div className="aspect-video relative h-auto w-full">
                    {
                         course.locked ? (
                              <div className="h-full w-full bg-black/40 flex justify-center items-center rounded absolute z-10 backdrop-blur-lg cursor-pointer" onClick={
                                   () => setOpen(true)
                              }>
                                   <Icons.lock className="text-background h-12 w-12" />
                              </div>
                         ) : (
                              <div className="h-full w-full bg-black/40 rounded absolute z-10 pointer-events-none"></div>
                         )
                    }
                    <div
                         onClick={
                              () => {
                                   if (course.locked) {
                                        setOpen(true)
                                   }
                              }
                         }>
                         <Image src={course.image} alt={course.title} layout="fill" className="rounded-[4px] object-cover !relative border border-border aspect-video" />
                    </div>
               </div>

               <div className="flex flex-col gap-2 relative">
                    <div className="flex flex-col gap-1">
                         <div className="flex flex-1 justify-between items-center">
                              {course.topic ?? <span className="text-xs text-muted-foreground">{course.topic}</span>}
                              <div className="flex gap-1 items-end">
                                   <span className="text-xs text-muted-foreground">Ученик:</span>
                                   <span className="text-xs text-muted-foreground">{course.students || 0}</span>
                              </div>
                         </div>
                         <div
                              onClick={
                                   () => {
                                        if (course.locked) {
                                             setOpen(true)
                                        }
                                   }
                              }>
                              <h1 className="font-semibold text-second text-sm line-clamp-2">
                                   {course.title}
                              </h1>
                         </div>
                    </div>
                    <div
                         onClick={
                              () => {
                                   if (course.locked) {
                                        setOpen(true)
                                   }
                              }
                         }>
                         <p className="text-xs text-muted-foreground line-clamp-3">
                              {course.description}
                         </p>
                    </div>
                    {
                         course.locked ? (
                              <Dialog>
                                   <DialogTrigger asChild>
                                        <Button className={"w-fit rounded"}>Заключить договор на курс</Button>
                                   </DialogTrigger>
                                   <DialogContent className={"max-w-[984px] max-h-[98dvh] mb-3"}>
                                        <object data="" type="application/pdf" className={"h-4/5 w-full"}></object>
                                        <Button size={"sm"} className={"w-fit rounded"}>
                                             Скачать
                                        </Button>
                                   </DialogContent>
                              </Dialog>
                         ) : (
                              <Button className={"w-fit rounded"}
                                   onClick={() => router.push(`/courses/${course.slug}`)}
                              >
                                   Перейти к курсу
                              </Button>
                         )
                    }
               </div>
          </div>
     </>)
}