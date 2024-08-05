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
import notFound from "@/pages/404";

type Props = {
  user: IUser;
  results: StudentResult;
  token: string;
};

export default function ResultPage({ user, results, token }: Props) {
  const router = useRouter();

  if (!results) {
    return notFound();
  }

  const scorePercentage = Math.round(
    (results.correct_answers / (results.total_questions || 1)) * 100,
  );
  const isPassed = scorePercentage >= 85;
  const Icon = isPassed ? Icons.approved : Icons.rejected;

  return (
    <>
      <Metadata
        title={`Test natijasi - ${results.course.name}`}
        description={results.course.short_description}
      />
      <Layout className={"mx-auto"} user={user}>
        <div className="flex max-h-[976px] w-full flex-[1_0_auto] flex-col items-center justify-center gap-24 rounded-2xl bg-background p-6">
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
            <ResultCard value={results.total_questions} />
            <ResultCard
              value={results.correct_answers}
              title={"To‘g‘ri javoblar soni"}
              valueClass={"text-success"}
            />
            <ResultCard
              value={results.total_questions - results.correct_answers}
              title={"Noto‘g‘ri javoblar soni"}
              valueClass={"text-destructive"}
            />
          </div>
          <div className="flex items-center gap-4">
            <Button
              size={"sm"}
              className={"h-10 font-medium"}
              onClick={() => router.push("/courses")}
            >
              Bosh sahifaga qaytish
            </Button>
            {results.type == 2 && isPassed && (
              <Button
                size={"sm"}
                className={"h-10 font-medium"}
                onClick={() => router.push(results.certificate_file)}
              >
                Sertifikatni yuklab olish
              </Button>
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
  try {
    const cookies = parseCookies(context);
    const token = cookies.token;
    const results = await axios.get<any>(
      `/tests/student-results/${context.params?.id}`,
      getHeaders(token),
    );

    return {
      props: {
        results: results.data,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export const getServerSideProps = AuthMiddleware(getServerSidePropsFunction);
