import { Request, Response } from "express";
const User = require("../db/models/auth");
import { handleErrors } from "../errors/errorHandler";
import { createToken } from "../middleware/jwt";

module.exports.signup_get = (req: Request, res: Response) => {
  res.status(201).json({ msg: "here's get sign up" });
};

module.exports.login_get = (req: Request, res: Response) => {
  res.status(201).json({ msg: "you're authenticated :))"});
};

module.exports.signup_post = async (req: Request, res: Response) => {
  const { emailAdress, userName, password } = req.body;
  try {
    //creating an intance and saving to db
    const createdUser = await User.create({ emailAdress, userName, password });
    const token = createToken(createdUser._id);
    res.cookie("jwt", token, { httpOnly: true, sameSite: "none", secure: true, maxAge: 24 * 60 * 60 * 1000 });
    //remove user password from response for security
    createdUser.password = undefined
    res.status(201).json({ createdUser, accessToken: token });
  } catch (err: any) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req: Request, res: Response) => {
  const { emailAdress, userName, password } = req.body;
  try {
    const user = await User.login(emailAdress, userName, password);
    const token = createToken(user[0]._id);
    console.log('generated token', token)
    if(req.cookies.jwt){
      req.cookies.jwt = ""
    }
    res.cookie("jwt", token, { httpOnly: true, sameSite: "none", secure: true, maxAge: 60*1000});
    //remove user password from response for security
    user[0].password = undefined
    res.status(200).json({user: user[0], accessToken: token});
  } catch (error: any) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};
