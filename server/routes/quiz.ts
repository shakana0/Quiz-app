import express, { Request, Response, Router } from "express";
import { createQuiz, getAllQuizes, getSingleQuiz, deleteSingleQuiz } from "../db/quizCrud";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const createdQuiz = await createQuiz(req.body);
  res.status(201).json(createdQuiz);
});

router.get("/", async (req: Request, res: Response) => {
  const allQuizes = await getAllQuizes();
  res.json(allQuizes);
});

//geting single quiz
router.get("/:id", async (req: Request, res: Response) => {
  //"req.params.id" hämtar argumentet från params objektet
  const singleQuiz = await getSingleQuiz(req.params.id)
  res.json(singleQuiz)
})

router.delete("/:id", async (req: Request, res: Response) =>{
  const deletedQuiz = await deleteSingleQuiz(req.params.id)
  res.json(deletedQuiz)
})

export default router;
