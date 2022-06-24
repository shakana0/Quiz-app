import express, { Request, Response, json } from "express";
import quizRouter from "./routes/quiz";

const app = express();
app.use(json());
app.use("/quiz", quizRouter);
import { connect } from "mongoose";
//"quiz-db" är namnet på docker-containern
connect("mongodb://localhost:27017/quiz-db");

const PORT = 3030;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world :)");
});

app.listen(PORT, () => {
  console.log("I am listening to port", PORT);
});
