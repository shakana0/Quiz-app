import { Request, Response } from "express";
// const Quiz = require("../db/models/quizes");
const User = require("../db/models/auth")

//posta quiz
module.exports.quiz_post = async (req: Request, res: Response) => {
  // const { id } = req.params;
//   const { quiz } = req.body;
  // const postedQuiz = await Quiz.postQuiz(req.params.id, req.body);

  try {
    const postedQuiz = await User.postQuiz(req.params.id, req.body);
    res.status(201).json(postedQuiz);
  } catch (err: any) {
    res.status(400).json({ err });
  }
};
