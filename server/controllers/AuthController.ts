import { Request, Response } from "express";
const User = require("../db/models/auth");
import { handleErrors } from "../errors/errorHandler"


module.exports.signup_get = (req: Request, res: Response) => {
  res.status(201).json({ msg: "here's get sign up" });
};

module.exports.login_get = (req: Request, res: Response) => {
  res.status(201).json({ msg: "here's get login in" });
};

module.exports.signup_post = async (req: Request, res: Response) => {
  const { emailAdress, userName, password } = req.body;
  try {
    //creating an intance and saving to db
    const createdUser = await User.create({ emailAdress, userName, password });
    res.status(201).json(createdUser);
  } catch (err: any) {
    const errors = handleErrors(err);
    // res.status(400).send(err.status);
    res.status(400).json({errors});

  }
  // res.send(`New sign up ${JSON.stringify(req.body)}`)
};

module.exports.login_post = async (req: Request, res: Response) => {
  const { emailAdress, userName, password } = req.body;

  res.send("user is logged in");
};
