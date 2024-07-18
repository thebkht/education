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

export default function Index({ course }: { course: any }) {
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
          <div className="flex flex-col gap-2 rounded-lg border border-border bg-background p-4">
               <div className="flex justify-end items-end flex-1 aspect-video relative">
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
                    <Link href={course.locked ? "#" : `/courses/${course.slug}`}
                         onClick={
                              () => {
                                   if (course.locked) {
                                        setOpen(true)
                                   }
                              }
                         }>
                         <Image src={course.image} alt={course.title} layout="fill" className="rounded-[4px] object-cover !relative border border-border aspect-video" />
                    </Link>
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
                         <Link href={course.locked ? "#" : `/courses/${course.slug}`}
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
                         </Link>
                    </div>
                    <Link href={course.locked ? "#" : `/courses/${course.slug}`}
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
                    </Link>
                    {
                         course.locked ? (
                              <Dialog>
                                   <DialogTrigger asChild>
                                        <Button className={"w-fit rounded"}>Заключить договор на курс</Button>
                                   </DialogTrigger>
                                   <DialogContent className={"p-0 max-w-[984px] max-h-[948px] h-full border-none mb-3"} noClose>
                                        <object data="" type="application/pdf" className={"h-full w-full"}></object>
                                        <Button className={"w-fit rounded"}>Подписать</Button>
                                        <Button className={"w-fit rounded"}>Подписать</Button>
                                   </DialogContent>
                              </Dialog>
                         ) : (
                              <Button className={"w-fit rounded"}>
                                   <Link href={`/courses/${course.slug}`}>
                                        Перейти к курсу
                                   </Link>
                              </Button>
                         )
                    }
               </div>
          </div>
     </>)
}