import express, { Request, Response, json } from "express";
import dotenv from "dotenv";
import cors from "cors";
const authRoutes = require("./routes/auth");
const cookie = require("cookie-parser");
dotenv.config();
const app = express(); //middleware => takes any request json data passess it into js object

//Middlewares
app.use(cookie());
app.use(json());
//app.use(cors()); //för att aktivera alla CORS-förfrågningar
app.use(
  cors({
    origin: ["http://localhost:3000", "https://localhost:3000"],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// app.set("trust proxy", 1); //if using heroku
app.use(authRoutes);

//Mongoose Connection
import { connect } from "mongoose";

//"quiz-db?" är namnet på databasen i mongoDB compass
connect(
  `mongodb+srv://${process.env.USER2}:${process.env.PASSWORD}@quiz-app.u2xum.mongodb.net/quiz-db?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
).then(() => {
  app.listen(PORT, () => {
    console.log("hiii im listening to port :) " + PORT);
  });
});

const PORT = process.env.PORT || 3030;
app.get("/", (req: Request, res: Response) => {
  res.send("Hello world :)");
});
