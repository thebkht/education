import { useRouter } from "next/router";
import CourseLayout from "@/components/layout/CourseLayout";
import { getQuizById } from "@/lib/quizes";
import { notFound } from "next/navigation";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form, {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/UI/Form";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { RadioGroupItem } from "@/components/UI/RadioGroup";
import Button from "@/components/UI/Button";
import React from "react";
import { Icons } from "@/components/icons";
import Metadata from "@/components/Metadata";
import { getCourseBySlug } from "@/lib/courses";

const formSchema = z.object({
    answers: z.array(
        z.object({
            questionId: z.number(),
            answerId: z.number(),
        })
    ),
});

export default function QuizPage() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const { fields, append, remove } = useFieldArray({
        name: "answers",
        control: form.control,
    });

    const [answeredQuestions, setAnsweredQuestions] = React.useState<number>(0);

    const { id, slug: courseId } = router.query;
    const quiz = getQuizById(id);

    if (!quiz) return notFound();

    const { questions } = quiz;

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        router.push(`/courses/${courseId}/quiz/${id}/results`);
    }

    const course = getCourseBySlug(courseId);
    if (!course) return notFound();

    return (
        <>
            <Metadata
                title={`${course.title}`}
                description={course.description}
                image={course.image}
            />
            <CourseLayout className={"mx-auto"}>
                <div className="flex gap-6 flex-col">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-10 bg-background p-6 rounded border max-w-[1574px]">
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="flex flex-col gap-6"
                                >
                                    <div className="flex gap-4 items-center text-second text-xl font-semibold">
                                        Тест
                                        <span className={"font-normal"}>
                                            {answeredQuestions}/{questions.length}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        {questions.map((question, index) => (
                                            <FormField
                                                control={form.control}
                                                key={index}
                                                name="answers"
                                                render={({ field }) => (
                                                    <FormItem className="gap-3 flex-col flex space-y-0">
                                                        <FormLabel
                                                            className={"text-base font-bold text-second"}
                                                        >
                                                            {index + 1}. {question.value}
                                                        </FormLabel>
                                                        <FormControl>
                                                            <RadioGroup
                                                                className={"flex flex-col gap-2"}
                                                                onValueChange={(value) => {
                                                                    const answerIndex = field.value?.findIndex(
                                                                        (answer) =>
                                                                            answer.questionId === question.id
                                                                    );
                                                                    if (answerIndex === -1) {
                                                                        append({
                                                                            questionId: question.id,
                                                                            answerId: parseInt(value),
                                                                        });
                                                                        setAnsweredQuestions(answeredQuestions + 1);
                                                                    } else {
                                                                        console.log("updating");
                                                                        append({
                                                                            questionId: question.id,
                                                                            answerId: parseInt(value),
                                                                        });
                                                                        remove(answerIndex);
                                                                    }
                                                                }}
                                                            >
                                                                {question.options.map((option) => (
                                                                    <FormItem
                                                                        key={option.id}
                                                                        className={
                                                                            "flex items-center gap-2 py-2 px-4 rounded space-y-0"
                                                                        }
                                                                    >
                                                                        <FormControl>
                                                                            <RadioGroupItem
                                                                                value={option.id.toString()}
                                                                                className={""}
                                                                            />
                                                                        </FormControl>
                                                                        <FormLabel
                                                                            className={"text-base text-second"}
                                                                        >
                                                                            {option.value}
                                                                        </FormLabel>
                                                                    </FormItem>
                                                                ))}
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <Button
                                        type="submit"
                                        size="sm"
                                        className={
                                            "h-10 w-fit disabled:bg-muted-foreground items-center gap-2 font-medium disabled:border-muted-foreground"
                                        }
                                        disabled={
                                            form.formState.isSubmitting || !form.formState.isValid
                                        }
                                    >
                                        <Icons.checkMark className={"h-4 w-4"} />
                                        Завершить
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            </CourseLayout>
        </>
    );
}
