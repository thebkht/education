import { quizes } from "@/data/quizes";

export function GetQuizById(id: string) {
  return quizes.find((quiz) => quiz.id === parseInt(id));
}
