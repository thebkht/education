import { quizes } from "@/data/quizes";

export function getQuizById(id: string | string[] | undefined) {
  return quizes.find((quiz) => quiz.id === id) || quizes[0];
}
