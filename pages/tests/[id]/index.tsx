import { useRouter } from "next/router";
import Layout from "@/components/layout/CourseLayout";
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
import AuthMiddleware from "@/middlewares/auth";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";
import { getHeaders } from "@/helpers";
import { Test } from "@/lib/types";
import { IUser } from "@/interfaces/auth";
import { axios } from "@/api/interseptors";
import notFound from "@/pages/404";
import { toast } from "sonner";

const formSchema = z.object({
  test_enrolment: z.number(),
  answers: z.array(
    z.object({
      question: z.number(),
      option: z.number(),
    }),
  ),
});

type Props = {
  test: Test;
  user: IUser;
  token: string;
};

export default function TestPage({ test, user, token }: Props) {
  const router = useRouter();
  console.log(test);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      test_enrolment: test.id,
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "answers",
    control: form.control,
  });

  const [answeredQuestions, setAnsweredQuestions] = React.useState<number>(0);
  if (!test) {
    return notFound();
  }
  const { questions } = test;

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const promise = async () => {
      try {
        const res = await axios.post(
          `/tests/submit`,
          values,
          getHeaders(token),
        );
        /* router.push(`/tests/${test.id}/result`); */
        console.log(res);
      } catch (error: any) {
        console.log(error);
        throw new Error("Xatolik yuz berdi");
      }
    };

    toast.promise(promise, {
      loading: "Yuklanmoqda...",
      success: "Test muvaffaqiyatli bajarildi",
      error: (error) => error.message,
    });
  }

  return (
    <>
      <Metadata title={`Test`} noFollow />
      <Layout className={"mx-auto"} user={user}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex max-w-[1574px] flex-col gap-10 rounded border bg-background p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-6"
                >
                  <div className="flex items-center gap-4 text-xl font-semibold text-second">
                    Тест
                    <span className={"font-normal"}>
                      {answeredQuestions}/{test.total_questions}
                    </span>
                  </div>
                  <div className="flex flex-col gap-4">
                    {questions.map((question, index) => (
                      <FormField
                        control={form.control}
                        key={index}
                        name="answers"
                        render={({ field }) => (
                          <FormItem className="flex flex-col gap-3 space-y-0">
                            <FormLabel
                              className={"text-base font-bold text-second"}
                            >
                              {index + 1}. {question.title}
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                className={"flex flex-col gap-2"}
                                onValueChange={(value) => {
                                  const answerIndex = field.value?.findIndex(
                                    (answer) => answer.question === question.id,
                                  );
                                  if (answerIndex === -1) {
                                    append({
                                      question: question.id,
                                      option: parseInt(value),
                                    });
                                    setAnsweredQuestions(answeredQuestions + 1);
                                  } else {
                                    console.log("updating");
                                    append({
                                      question: question.id,
                                      option: parseInt(value),
                                    });
                                    remove(answerIndex);
                                  }
                                }}
                              >
                                {question.options.map((option) => (
                                  <FormItem
                                    key={option.id}
                                    className={
                                      "flex items-center gap-2 space-y-0 rounded px-4 py-2"
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
                                      {option.title}
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
                    onClick={() => onSubmit(form.getValues())}
                    className={
                      "h-10 w-fit items-center gap-2 font-medium disabled:border-muted-foreground disabled:bg-muted-foreground"
                    }
                    /* disabled={
                      form.formState.isSubmitting || !form.formState.isValid
                    } */
                  >
                    <Icons.checkMark className={"h-4 w-4"} />
                    Завершить
                  </Button>
                </form>
              </Form>
            </div>
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

    const test = await axios.get<any>(
      `/tests/start-test-enrolment/${context.params?.id}`,
      getHeaders(token),
    );

    if (!test.data) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        test: test.data,
        token,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export const getServerSideProps = AuthMiddleware(getServerSidePropsFunction);
