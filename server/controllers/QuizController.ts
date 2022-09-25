import { Request, Response } from "express";
const Quiz = require("../db/models/quizes");

//posta quiz
module.exports.quiz_post = async (req: Request, res: Response) => {
  const { id } = req.params;
//   const { quiz } = req.body;
  // const postedQuiz = await Quiz.postQuiz(req.params.id, req.body);

  try {
    const postedQuiz = await Quiz.postQuiz(id, req.body);
    console.log(req.body.quizes, "reqbody");
    res.status(201).json(postedQuiz);
  } catch (err: any) {
    res.status(400).json({ err });
  }
};
