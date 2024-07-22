import Image from "next/image";
import Button from "@/components/UI/Button";
import { Icons } from "../icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTrigger,
} from "@/components/UI/AlertDialog";
import Balancer from "react-wrap-balancer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/UI/DIalog";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { Course } from "@/lib/types";
import { axios } from "@/api/interseptors";
import { parseCookies } from "nookies";
import { getHeaders } from "@/helpers";

export default function Index({ course }: { course: Course }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [contractFile, setContractFile] = React.useState<string | null>(null);

  const handleRegisterCourse = async () => {
    try {
      const cookies = parseCookies();
      const token = cookies.token;
      const res = await axios.get(
        `courses/register-course?course=${course.id}`,
        getHeaders(token),
      );
      if (res.data?.contract_file) {
        setContractFile(res.data.contract_file);
        setOpenDialog(true);
      }
    } catch (error) {
      console.error("Error registering course:", error);
    }
  };
  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogDescription className={"text-center"}>
            <Balancer>
              Если вы произвели оплату, но курсы не открылись, обратитесь к
              администратору системы. тел: +998 (71) 123-45-67
            </Balancer>
          </AlertDialogDescription>
          <AlertDialogAction className={"mx-auto w-fit"}>
            Понятно
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
      <div className="flex flex-col gap-2 rounded-lg bg-background p-4 shadow-md hover:shadow-lg">
        <div className="relative aspect-video h-auto w-full">
          {!course.has_access ? (
            <div
              className="absolute z-10 flex h-full w-full cursor-pointer items-center justify-center rounded bg-black/40 backdrop-blur-lg"
              onClick={() => setOpen(true)}
            >
              <Icons.lock className="h-12 w-12 text-background" />
            </div>
          ) : (
            <div className="pointer-events-none absolute z-10 h-full w-full rounded"></div>
          )}
          <div
            onClick={() => {
              if (!course.has_access) {
                setOpen(true);
              }
            }}
          >
            <Image
              src={course.image.src}
              alt={course.name}
              layout="fill"
              placeholder="blur"
              blurDataURL={course.image.base64}
              className="!relative aspect-video rounded-[4px] object-cover"
            />
          </div>
        </div>

        <div className="relative flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <div
              onClick={() => {
                if (!course.has_access) {
                  setOpen(true);
                }
              }}
            >
              <h1 className="line-clamp-2 text-sm font-semibold text-second">
                {course.name}
              </h1>
            </div>
          </div>
          <div
            onClick={() => {
              if (!course.has_access) {
                setOpen(true);
              }
            }}
          >
            <p className="line-clamp-3 text-xs text-muted-foreground">
              {course.short_description}
            </p>
          </div>
          {!course.has_access ? (
            <Button className={"w-fit rounded"} onClick={handleRegisterCourse}>
              Kurs uchun shartnoma tuzish
            </Button>
          ) : (
            <Button
              className={"w-fit rounded"}
              onClick={() => router.push(`/courses/${course.id}`)}
            >
              Kursga o&apos;tish
            </Button>
          )}
        </div>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className={"mb-3 max-h-[98dvh] max-w-[984px]"}>
          <object
            data={contractFile ?? ""}
            type="application/pdf"
            className={"h-4/5 w-full"}
          ></object>
          <Button
            size={"sm"}
            className={"w-fit rounded"}
            onClick={() =>
              course.contract_file && router.push(course.contract_file)
            }
          >
            Yuklab olish
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
