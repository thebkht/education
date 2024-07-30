import Image from "next/image";
import Button from "@/components/UI/Button";
import { Icons } from "../icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTrigger,
} from "@/components/UI/AlertDialog";
import Balancer from "react-wrap-balancer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/UI/DIalog";
import React from "react";
import { useRouter } from "next/router";
import { Course } from "@/lib/types";
import { axios } from "@/api/interseptors";
import { getHeaders } from "@/helpers";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { X } from "lucide-react";
import { any } from "zod";
import { getServerSideProps } from "@/pages/courses";

export default function Index({
  course: initialCourse,
  token,
}: {
  course: Course;
  token: string;
}) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [course, setCourse] = React.useState<Course>(initialCourse);
  const [contractFile, setContractFile] = React.useState<string | null>(null);
  const [isRegistered, setIsRegistered] = React.useState<boolean>(
    course.file ? true : false,
  );

  React.useEffect(() => {
    setCourse(initialCourse);
    setIsRegistered(course.file ? true : false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCourse]);

  const handleRegisterCourse = async () => {
    const registerCoursePromise = async () => {
      try {
        const res = await axios.get(
          `courses/register-course?course=${course.id}`,
          getHeaders(token),
        );
        if (res.status === 400) {
          throw new Error(res.data.message);
        }
        setIsRegistered(true);
        setContractFile(res.data.file);
        return res.data;
      } catch (error: any) {
        if (error.response?.status === 400) {
          throw new Error(error.response.data.message);
        } else {
          throw new Error("Kursga ro'yxatdan o'tishda xatolik yuz berdi");
        }
      }
    };

    toast.promise(registerCoursePromise, {
      loading: "Yuklanmoqda...",
      success: (data) => data.message,
      error: (error) => {
        return error.message;
      },
    });
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogDescription className={"text-center"}>
            <Balancer>
              Agar kursga to&apos;lovni amalga oshirmagan bo&apos;lsangiz, lekin
              kursga o&apos;tish imkoni yo&apos;q bo&apos;lsa, tizim
              administratoriga murojaat qiling. TEL: +998 99 999 99 99
            </Balancer>
          </AlertDialogDescription>
          <AlertDialogAction className={"mx-auto w-fit"}>
            Tushunarli
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
            <Button
              className={"w-fit rounded"}
              onClick={() => {
                if (isRegistered && course.file) {
                  router.push(course.file ?? contractFile);
                } else {
                  handleRegisterCourse();
                }
              }}
            >
              {isRegistered
                ? "Shartnomani yuklab olish"
                : "Kursga ro'yxatdan o'tish"}
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
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent className={"mb-3 max-h-[98dvh] max-w-[984px]"}>
          <object
            data={course.file ?? ""}
            type="application/pdf"
            className={"h-4/5 w-full"}
          ></object>
          <Button
            size={"sm"}
            className={"w-fit rounded"}
            onClick={() => course.file && router.push(course.file)}
          >
            Yuklab olish
          </Button>
          <AlertDialogCancel className="focus:ring-ring absolute right-4 top-4 h-fit w-fit rounded-sm border-none p-0 opacity-70 ring-offset-background transition-opacity hover:bg-transparent hover:text-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
