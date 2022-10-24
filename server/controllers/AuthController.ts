import { Request, Response } from "express";
const User = require("../db/models/auth");
import { handleErrors } from "../errors/errorHandler";
import { createToken } from "../middleware/jwt";
const { OAuth2Client } = require("google-auth-library");
//initializing OAuth2Client using client-id
const client: any = new OAuth2Client(process.env.CLIENT_ID);
const fbClient: any = new OAuth2Client(process.env.FACEBOOK_APP_ID);


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
  console.log('hejsan')
  const { tokenId } = req.body;
  try {
    //verify tokenId w OAuth2Client by using client-id again
    const data = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.CLIENT_ID,
    });
    const { name, email } = data.getPayload();
    //creating an intance and saving to db
    const emailAdress = email;
    const userName = name;
    const password = `${process.env.GOOGLE_LOGIN_PASSWORD}`;
    //check if user alredy exists in db
    const user = await User.check_google_user(email);
    if (!user.length) {
      const user = await User.create({
        emailAdress,
        userName,
        password,
      });
      user[0].password = undefined;
      return res.status(201).json({ user });
    } else {
      console.log("user already exits :)");
      user[0].password = undefined;
      return res.status(201).json({ user: user[0] });
    }
  } catch (err: any) {
    res.status(401).json({ msg: "User Is Unauthorized" });
  }
};

module.exports.facebook_login = async (req: Request, res: Response) => {
  console.log('hallåå')
  const { tokenId } = req.body;
  console.log(tokenId, 'tokenid :)')
  try {
    //verify tokenId w OAuth2Client by using client-id again
    const data = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.FACEBOOK_APP_ID,
    });
    const { name, email } = data.getPayload();
    //creating an intance and saving to db
    const emailAdress = email;
    const userName = name;
    const password = `${process.env.GOOGLE_LOGIN_PASSWORD}`;
    //check if user alredy exists in db
    const user = await User.check_google_user(email);
    if (!user.length) {
      const user = await User.create({
        emailAdress,
        userName,
        password,
      });
      user[0].password = undefined;
      return res.status(201).json({ user });
    } else {
      console.log("user already exits :)");
      user[0].password = undefined;
      return res.status(201).json({ user: user[0] });
    }
  } catch (err: any) {
    res.status(401).json({ msg: "User Is Unauthorized" });
  }
};