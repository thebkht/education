import { useRouter } from "next/router";
import React from "react";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import CourseLayout from "@/components/layout/CourseLayout"
import Button from "@/components/UI/Button"
import ResultCard from "@/components/ResultCard";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTrigger
} from "@/components/UI/AlertDialog";
import Balancer from "react-wrap-balancer";

export default function ResultPage() {
    const router = useRouter();
    const { slug: courseId, id: quizId } = router.query;

    const [correctAnswer, setCorrectAnswer] = React.useState<number>(0);
    const [totalAnswers, setTotalAnswers] = React.useState<number>(40);

    React.useEffect(() => {
        setCorrectAnswer(Math.floor(Math.random() * totalAnswers))
    }, [totalAnswers]);

    const scorePercentage = Math.round((correctAnswer / totalAnswers) * 100);
    const isPassed = scorePercentage >= 85;
    const Icon = isPassed ? Icons.approved : Icons.rejected;

    return (
        <>
            <CourseLayout className={"flex-none mx-auto"}>
                <div
                    className="flex flex-col rounded-2xl p-6 gap-24 bg-background flex-[1_0_auto] w-full items-center justify-center max-w-[1622px] max-h-[976px]">
                    <div className="flex items-center gap-4">
                        <Icon
                            className={cn("h-40 w-40", isPassed ? "fill-success text-success" : "fill-destructive text-destructive")} />
                        <div className={cn("flex flex-col  gap-2 font-bold", isPassed ? "text-success" : "text-destructive")}>
                            <span className={"text-[80px] leading-[96.82px]"}>
                                {scorePercentage}%
                            </span>
                            <span className={"text-4xl"}>
                                Topshirildi
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <ResultCard value={totalAnswers} />
                        <ResultCard value={correctAnswer} title={"To‘g‘ri javoblar soni"} valueClass={"text-success"} />
                        <ResultCard value={totalAnswers - correctAnswer} title={"Noto‘g‘ri javoblar soni"} valueClass={"text-destructive"} />
                    </div>
                    <div className="flex items-center gap-4">
                        <Button size={"sm"} className={"h-10 font-medium"}>
                            Ko&apos;rib chiqish
                        </Button>
                        {
                            isPassed ? (
                                <Button size="sm" className="h-10 font-medium gap-2"

                                >
                                    Sertifikat olish
                                    <Icons.download className={"h-5 w-5"} />
                                </Button>
                            ) : (
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button size="sm" className="h-10 font-medium gap-2">
                                            Qayta urinib ko‘ring
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className={"max-w-fit"}>
                                        <AlertDialogDescription className={'text-center text-sm'}>
                                            <Balancer>
                                                Пожалуйста, заплатите, чтобы пересдать тест
                                            </Balancer>
                                        </AlertDialogDescription>
                                        <AlertDialogAction  className={'w-fit mx-auto py-2 px-4 h-10 font-medium'}>
                                            Повторная подача
                                        </AlertDialogAction>
                                    </AlertDialogContent>
                                </AlertDialog>
                            )
                        }
                    </div>
                </div>
            </CourseLayout>
        </>
    )
}