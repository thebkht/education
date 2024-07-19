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
import { Course } from "@/lib/types";

export default function Index({ course }: { course: Course }) {
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
                         !course.has_access ? (
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
                                   if (!course.has_access) {
                                        setOpen(true)
                                   }
                              }
                         }>
                         <Image src={course.image} alt={course.name} layout="fill" className="rounded-[4px] object-cover !relative border border-border aspect-video" />
                    </div>
               </div>

               <div className="flex flex-col gap-2 relative">
                    <div className="flex flex-col gap-1">
                         <div
                              onClick={
                                   () => {
                                        if (!course.has_access) {
                                             setOpen(true)
                                        }
                                   }
                              }>
                              <h1 className="font-semibold text-second text-sm line-clamp-2">
                                   {course.name}
                              </h1>
                         </div>
                    </div>
                    <div
                         onClick={
                              () => {
                                   if (!course.has_access) {
                                        setOpen(true)
                                   }
                              }
                         }>
                         <p className="text-xs text-muted-foreground line-clamp-3">
                              {course.short_description}
                         </p>
                    </div>
                    {
                         !course.has_access ? (
                              <Dialog>
                                   <DialogTrigger asChild>
                                        <Button className={"w-fit rounded"}>Kurs uchun shartnoma tuzish</Button>
                                   </DialogTrigger>
                                   <DialogContent className={"max-w-[984px] max-h-[98dvh] mb-3"}>
                                        <object data={course.contract_file} type="application/pdf" className={"h-4/5 w-full"}></object>
                                        <Button size={"sm"} className={"w-fit rounded"}>
                                             Yuklab olish
                                        </Button>
                                   </DialogContent>
                              </Dialog>
                         ) : (
                              <Button className={"w-fit rounded"}
                                   onClick={() => router.push(`/courses/${course.id}`)}
                              >
                                   Kursga o&apos;tish
                              </Button>
                         )
                    }
               </div>
          </div>
     </>)
}