import express, { Request, Response, Router } from "express";
import {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
} from "../db/usersCrud";
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const createdUser = await createUser(req.body);
  res.status(201).json(createdUser);
});

router.get("/", async (req: Request, res: Response) => {
  const allUsers = await getAllUsers();
  res.json(allUsers);
});

router.get("/:id", async (req: Request, res: Response) => {
  //"req.params.id" hämtar argumentet från params objektet
  const singleUser = await getSingleUser(req.params.id);
  res.json(singleUser);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const deletedUser = await deleteUser(req.params.id);
  res.json(deletedUser);
});

export default router;
