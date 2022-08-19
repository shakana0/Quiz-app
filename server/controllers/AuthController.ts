import { Request, Response } from "express";
const User = require("../db/models/auth");
import { handleErrors } from "../errors/errorHandler";
import { createToken } from "../errors/jwt";


module.exports.signup_get = (req: Request, res: Response) => {
  res.status(201).json({ msg: "here's get sign up" });
};

module.exports.login_get = (req: Request, res: Response) => {
  res.status(201).json({ msg: "here's get login in" });
};

module.exports.signup_post = async (req: Request, res: Response) => {
  const { emailAdress, userName, password } = req.body;
  // console.log(req.body, 'req body')
  try {
    //creating an intance and saving to db
    const createdUser = await User.create({ emailAdress, userName, password });
    const token = createToken(createdUser._id)
    res.cookie('jwt', token, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
    //res.cookie('jwt', token, {httpOnly: true, path: "/", sameSite: 'none', secure: true,  maxAge: 24 * 60 * 60 * 1000})
    // res.status(201).json({user: createdUser._id})
    // res.clearCookie('hejsan')
    res.status(201).json(createdUser);
    console.log('det går bra nu som de ska nu')
    console.log(req.cookies, 'coookiiieees')
    // return res
  } catch (err: any) {
    console.log('det gick fkn sönder')
    const errors = handleErrors(err);
    // res.status(400).send(err.status);
    res.status(400).json({ errors });
  }
  // res.send(`New sign up ${JSON.stringify(req.body)}`)
};

module.exports.login_post = async (req: Request, res: Response) => {
  const { emailAdress, userName, password } = req.body;

  res.send("user is logged in");
};
