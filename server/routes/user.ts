import express, { Request, Response, Router } from "express";
import {
  createUser,
  getAllUsers,
  logInUser,
  deleteUser,
  postQuiz,
} from "../db/usersCrud";
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const {emailAdress, userName, password} = req.body.cred
  const createdUser = await createUser(req.body);
  res.status(201).json(createdUser);
});

router.get("/", async (req: Request, res: Response) => {
  const allUsers = await getAllUsers();
  res.json(allUsers);
});

// router.get("/:id", async (req: Request, res: Response) => {
//   //"req.params.id" hämtar argumentet från params objektet
//   const singleUser = await getSingleUser(req.params.id);
//   res.json(singleUser);
// });

router.get("/login", async (req: Request, res: Response) => {
  const user = await logInUser(req.body);
  res.status(201).json(user);
  console.log(req.body, 'this is req body :)')
  // res.json(singleUser);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const deletedUser = await deleteUser(req.params.id);
  res.json(deletedUser);
});

//posta quiz
router.post("/:id/quizes", async (req: Request, res: Response) => {
  const postedQuiz = await postQuiz(req.params.id, req.body);
  console.log(req.body.quizes, 'reqbody')
  res.status(201).json(postedQuiz);
});

export default router;
