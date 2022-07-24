import QuizModel, { QuizType } from "./models/quizes";

export const createQuiz = async (quiz: QuizType) => {
  const newQuiz = new QuizModel(quiz);
  if (!quiz) {
    throw "404";
  }
  await newQuiz.save();
  return newQuiz;
};

// export const postQuiz = async (userId: String, quiz: QuizType) => {
//   const newQuiz = new QuizModel.findById(userId);
//   if (!newQuiz) {
//     throw "404";
//   }
//   await newQuiz.save();
//   return newQuiz;
// };

export const getAllQuizes = async () => {
  const result = await QuizModel.find({});
  return result;
};

export const getSingleQuiz = async (quizId: string) => {
  const singleQuiz = await QuizModel.findById({ _id: quizId });
  return singleQuiz;
};

export const deleteSingleQuiz = async (quizId: string) => {
    const deletedQuiz = QuizModel.findByIdAndDelete({_id: quizId})
    return deletedQuiz;
}
