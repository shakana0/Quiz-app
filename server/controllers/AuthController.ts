import { Request, Response } from "express";
const User = require("../db/models/auth");
import { handleErrors } from "../errors/errorHandler";
import { createToken } from "../middleware/jwt";
const { OAuth2Client } = require("google-auth-library");
//initializing OAuth2Client using client-id
const client: any = new OAuth2Client(process.env.CLIENT_ID);

module.exports.signup_post = async (req: Request, res: Response) => {
  const { emailAdress, userName, password } = req.body;
  try {
    //creating an intance and saving to db
    const createdUser = await User.create({ emailAdress, userName, password });
    const token = createToken(createdUser._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 10 * 60 * 1000,
    });
    //remove user password from response for security
    createdUser.password = undefined;
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
    if (req.cookies.jwt) {
      req.cookies.jwt = "";
    }
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 10 * 60 * 1000,
    });
    //remove user password from response for security
    user[0].password = undefined;
    res.status(200).json({ user: user[0], accessToken: token });
  } catch (error: any) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

module.exports.google_login = async (req: Request, res: Response) => {
  const { tokenId } = req.body;
  try {
    //verify tokenId w OAuth2Client by again using client-id
    const data = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.CLIENT_ID,
    });
    const { name, email } = data.getPayload();
    //creating an intance and saving to db
    const createdUser = await User.add_google_user({
      emailAdress: email,
      userName: name,
      password: 'hej12345'
    });
    // res.status(201).json({ userName: name, emailAdress: email });
    res.status(201).json({ createdUser });
  } catch (err: any) {
    res.status(401).json({ msg: "User Is Unauthorized" });
  }
};
