 export interface QuestionType {
  id: number,
  term: string;
  definition?: string;
}

export interface QuizType {
  id: string,
  titel: string;
  description: string;
  questions: Array<QuestionType>;
}
