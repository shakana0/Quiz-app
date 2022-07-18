 interface QuestionType {
  term: string;
  definition: string;
}

export interface QuizType {
  titel: string;
  description: string;
  questions: Array<QuestionType>;
}
