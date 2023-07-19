import { Request, Response } from "express";
// const Quiz = require("../db/models/quizes");
const User = require("../db/models/auth")

//posta quiz
module.exports.quiz_post = async (req: Request, res: Response) => {
  try {
    const postedQuiz = await User.postQuiz(req.params.id, req.body);
    res.status(201).json({msg: "Quiz was saved successfully", postedQuiz});
  } catch (err: any) {
    res.status(400).json({ msg: "An error occurred when trying to save quiz" });
  }
};

//delete quiz
module.exports.quiz_delete = async (req: Request, res: Response) => {
  try {
    await User.deleteQuiz(req.params.userId, req.params.quizId);
    res.status(201).json({ msg: "Quiz was deleted successfully"});
  } catch (err: any) {
    res.status(400).json({ msg: "An error occurred when trying to delete quiz" });
  }
};

//get all quizes
module.exports.quiz_get = async (req: Request, res: Response) => {
  try {
    const allQuizes = await User.getQuiz(req.params.userId);
    res.status(201).json({ allQuizes: allQuizes});
  } catch (err: any) {
    res.status(400).json({ err });
  }
};
