import express, { Request, Response, json } from "express";
import quizRouter from "./routes/quiz";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(json());
app.use("/quiz", quizRouter);
import { connect } from "mongoose";

//"quiz-db" är namnet på docker-containern / databasen
// connect("mongodb://localhost:27017/quiz-db");

//"quiz-db?" är namnet på databasen i mongoDB compass 
connect(
  `mongodb+srv://${process.env.USER2}:${process.env.PASSWORD}@quiz-app.u2xum.mongodb.net/quiz-db?retryWrites=true&w=majority`
).then(() => {
  app.listen(PORT, () => {
    console.log("hello im listening to port :) " + PORT);
  });
});

const PORT = 3030;
app.get("/", (req: Request, res: Response) => {
  res.send("Hello world :)");
});

// app.listen(PORT, () => {
//   console.log("I am listening to port", PORT);
// });
