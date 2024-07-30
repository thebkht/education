import { useRouter } from "next/router";
import React from "react";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import Layout from "@/components/layout/CourseLayout";
import Button from "@/components/UI/Button";
import ResultCard from "@/components/ResultCard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTrigger,
} from "@/components/UI/AlertDialog";
import Balancer from "react-wrap-balancer";
import { getCourseBySlug } from "@/lib/courses";
import Metadata from "@/components/Metadata";
import { IUser } from "@/interfaces/auth";
import { StudentResult } from "@/lib/types";
import AuthMiddleware from "@/middlewares/auth";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";
import { getHeaders } from "@/helpers";
import { axios } from "@/api/interseptors";

type Props = {
  user: IUser;
  test: StudentResult;
  token: string;
};

export default function ResultPage({ user, test, token }: Props) {
  const router = useRouter();

  const scorePercentage = Math.round(
    (test.correct_answers / test.total_questions) * 100,
  );
  const isPassed = scorePercentage >= 85;
  const Icon = isPassed ? Icons.approved : Icons.rejected;

  return (
    <>
      <Metadata
        title={`Test natijasi - ${test.course.name}`}
        description={test.course.short_description}
      />
      <Layout className={"mx-auto flex-none"} user={user}>
        <div className="flex max-h-[976px] w-full max-w-[1622px] flex-[1_0_auto] flex-col items-center justify-center gap-24 rounded-2xl bg-background p-6">
          <div className="flex items-center gap-4">
            <Icon
              className={cn(
                "h-40 w-40",
                isPassed
                  ? "fill-success text-success"
                  : "fill-destructive text-destructive",
              )}
            />
            <div
              className={cn(
                "flex flex-col gap-2 font-bold",
                isPassed ? "text-success" : "text-destructive",
              )}
            >
              <span className={"text-[80px] leading-[96.82px]"}>
                {scorePercentage}%
              </span>
              <span className={"text-4xl"}>Topshirildi</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <ResultCard value={test.total_questions} />
            <ResultCard
              value={test.correct_answers}
              title={"To‘g‘ri javoblar soni"}
              valueClass={"text-success"}
            />
            <ResultCard
              value={test.total_questions - test.correct_answers}
              title={"Noto‘g‘ri javoblar soni"}
              valueClass={"text-destructive"}
            />
          </div>
          <div className="flex items-center gap-4">
            <Button size={"sm"} className={"h-10 font-medium"}>
              Ko&apos;rib chiqish
            </Button>
            {isPassed ? (
              <Button
                size="sm"
                className="h-10 gap-2 font-medium"
                onClick={() => router.push(test.certificate_file)}
              >
                Sertifikat olish
                <Icons.download className={"h-5 w-5"} />
              </Button>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" className="h-10 gap-2 font-medium">
                    Qayta urinib ko‘ring
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className={"max-w-fit"}>
                  <AlertDialogDescription className={"text-center text-sm"}>
                    <Balancer>
                      Пожалуйста, заплатите, чтобы пересдать тест
                    </Balancer>
                  </AlertDialogDescription>
                  <AlertDialogAction
                    className={"mx-auto h-10 w-fit px-4 py-2 font-medium"}
                  >
                    Повторная подача
                  </AlertDialogAction>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}

const getServerSidePropsFunction = async (
  context: GetServerSidePropsContext,
) => {
  const cookies = parseCookies(context);
  const token = cookies.token;
  const results = await axios.get<any>(
    "/tests/student-results",
    getHeaders(token),
  );
  const test = results.data.find(
    (r: StudentResult) =>
      r.id === parseInt(context.params?.id?.toString() ?? ""),
  );
  if (!test) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      test,
    },
  };
};

export const getServerSideProps = AuthMiddleware(getServerSidePropsFunction);
