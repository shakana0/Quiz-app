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

quizSchema.statics.postQuiz = async function(this: any, id: String, quiz: QuizType){
  // console.log(id, quiz, 'heres the fkn arguemnt')
  const newQuiz: any = await this.findById({ _id: id }).exec();
  console.log(newQuiz, ':newQuiz', id, ':id')
  if (!newQuiz) {
    throw "404";
  } else {
    newQuiz.quizes.push(quiz);
    await newQuiz.save();
    return newQuiz;
  }
};

// "quizes" är namnet på mongoDB collectionen i powershell
// const QuizModel = model<QuizType>("quizes", schema);

// const QuizModel = model<QuizType>("quizes", quizSchema);
const QuizModel = mongoose.model("quizes", quizSchema);


// export default QuizModel;
module.exports = QuizModel;

