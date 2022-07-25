import { Schema, model } from "mongoose";

export interface QuestionType {
  id: number;
  term: string;
  definition: string;
}

//alla nycklar och värden måste vara identiska till json format. Är caseSensitive//
export interface QuizType {
  id: string;
  titel: string;
  description: string;
  questions: Array<QuestionType>;
}

const schema = new Schema<QuizType>({
  id: { type: String, required: true },
  titel: { type: String, required: true },
  description: { type: String, required: true },
  questions: { type: [Object], required: true },
});

// "quizes" är namnet på mongoDB collectionen i powershell
// const QuizModel = model<QuizType>("quizes", schema);

const QuizModel = model<QuizType>("quizes", schema);

export default QuizModel;
