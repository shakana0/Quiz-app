import express, { Request, Response, json } from "express";
import userRouter from "./routes/user";
import dotenv from "dotenv";
import cors from "cors";
const authRoutes = require("./routes/auth");
const cookie = require("cookie-parser");
dotenv.config();
const app = express(); //middleware => takes any request json data passess it into js object
//import { createToken } from "./errors/jwt";

app.use(cookie());
app.use(json());
app.use(cors())//för att aktivera alla CORS-förfrågningar
// app.use(
//   cors({
//     origin: "http://localhost:3030",
//     credentials: true,
//   })
// );

//app.set("trust proxy", 1); //if using heroku
app.use("/user", userRouter);
app.use(authRoutes);

//app.get("/", (req: Request, res: Response) => {  funkar för att se cookie i browser
  // const token = createToken("142563784bjrhb");
  // res.cookie("test", token, {
  //   httpOnly: true,
  //   maxAge: 24 * 60 * 60 * 1000,
  // });
  // res.send("heres your fkn cookies");
//});


//cookies
// app.get('/set-cookies', (req: Request, res: Response) =>{
//   res.cookie('heej', false, {httpOnly: true,  maxAge: 24 * 60 * 60 * 1000}) //a day
//   res.send('heres your cookies')
// })
// app.get('/read-cookies', (req: Request, res: Response) =>{
//  const cookies = req.cookies
// //  console.log(cookies)
//  res.json(cookies)
// })

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

// const PORT = 3030;
const PORT = process.env.PORT || 3030;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world :)");
});

// app.listen(PORT, () => {
//   console.log("I am listening to port", PORT);
// });
