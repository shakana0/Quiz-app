// import { Schema, model } from "mongoose";
const mongoose = require("mongoose"); 

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

const quizSchema = new mongoose.Schema({
  id: { type: String, required: true },
  titel: { type: String, required: true },
  description: { type: String, required: true },
  questions: { type: [Object], required: true },
});

//AFTER a save event accurs fire a function
quizSchema.post("save", function (doc: any, next: any) {
  console.log("user was saved successfully :)", doc);
  next();
});

// "quizes" är namnet på mongoDB collectionen i powershell
// const QuizModel = model<QuizType>("quizes", schema);

// const QuizModel = model<QuizType>("quizes", quizSchema);
const QuizModel = mongoose.model("quizes", quizSchema);
module.exports = QuizModel;

