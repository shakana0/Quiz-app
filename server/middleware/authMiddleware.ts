import { Request, Response } from "express";
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../db/models/auth");
import { createToken } from "./jwt";

const splitJWT = (cookies: string, jwt: any) => {
  if (cookies !== undefined) {
    jwt = cookies.split(";").filter((name: string) => name.includes("jwt"))[0];
    //kolla om det ens går att splitta efter att den har tagit specifik token
    if (!!jwt && jwt.includes("=")) {
      return jwt.split("=")[1];
    } else {
      return undefined;
    }
  }
};

const splitSocialilMediaToken = (cookies: string, token: any) => {
  if (cookies !== undefined) {
    token = cookies
      .split(";")
      .filter((name: string) => name.includes("socialMediaToken"))[0];
    //kolla om det ens går att splitta efter att den har tagit specifik token
    if (!!token && token.includes("=")) {
       return token.split("=")[1];
    } else {
      console.log('im in the else :)')
      return undefined;
    }
  }
};

module.exports.verifyToken = (req: any, res: Response, next: any) => {
  const cookies = req.headers.cookie;
  //get specific token
  let token;
  token = splitJWT(cookies, token);
  if (!token) {
    res.status(400).send({ result: "No Token Found" });
  }
  jwt.verify(
    String(token),
    `${process.env.ACCESS_TOKEN_SECRET}`,
    (err: any, user: any) => {
      if (err) {
        res.status(400).send({ result: "Invalid Token" });
      }
      req.id = user.id;
      next();
    }
  );
};

module.exports.getUser = async (req: any, res: Response) => {
  console.log('im in getUser :)', req)
  const userId = req.id;
  try {
    let user = await User.userAuth(userId);
    return res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ msg: "user not found" });
  }
};

module.exports.refreshToken = (req: any, res: Response, next: any) => {
  const cookies = req.headers.cookie;
  //get specific token
  let prevToken;
  prevToken = splitJWT(cookies, prevToken);
  if (!prevToken) {
    return res.status(400).json({ msg: "Unuthorized, could not find token" });
  }
  jwt.verify(
    String(prevToken),
    `${process.env.ACCESS_TOKEN_SECRET}`,
    (err: any, user: any) => {
      if (err) {
        res.status(403).json({ msg: "Authentication failed" });
      }
      //if verification seccuessful then clear cookie
      res.clearCookie("jwt");
      req.cookies.jwt = "";
      //generate new cookie
      const refreshToken = createToken(user.id);
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 60 * 60 * 1000,
      });

      req.id = user.id;
      next();
    }
  );
};

module.exports.logout = (req: any, res: Response, next: any) => {
  const cookies = req.headers.cookie;
  console.log(cookies);
  //get specific token
  let prevToken: any;
  prevToken = splitJWT(cookies, prevToken);
  console.log(!!prevToken);
  if (!prevToken) {
    return res.status(400).json({ msg: "Unuthorized, could not find token" });
  }
  jwt.verify(
    String(prevToken),
    `${process.env.ACCESS_TOKEN_SECRET}`,
    (err: any, user: any) => {
      if (err) {
        res.status(403).json({ msg: "Authentication failed" });
      }
      //if verification seccuessful then clear cookie
      // res.clearCookie('jwt')
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 1,
      });
      req.cookies.jwt = "";
      // res.end();
      return res
        .status(200)
        .json({ msg: "You are successfully logged out!", prevToken });
    }
  );
};

module.exports.social_media_logout = (req: any, res: Response, next: any) => {
  const cookies = req.headers.cookie;
  //get specific token name
  let token;
  token = splitSocialilMediaToken(cookies, token);
  if (!token) {
    return res.status(400).json({ msg: "Unuthorized, could not find token" });
  }
  res.clearCookie("socialMediaToken", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 1,
  });
  req.cookies.socialMediaToken = "";
  return res
    .status(200)
    .json({ msg: "social media token is empty now :)", token });
};
