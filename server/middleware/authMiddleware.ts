import { Request, Response } from "express";
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../db/models/auth");
import { createToken } from "./jwt";

const splitJWT = (cookies: string, jwt: any) => {
  if (cookies !== undefined) {
    jwt = cookies
      .split(";")
      .filter((name: string) => name.includes("jwt"))[0]
      .split("=")[1];
  }
  return jwt;
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
      // res.clearCookie('jwt')
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 1,
      });
      req.cookies.jwt = "";
      // res.end();
      console.log(req.headers.cookie, "req.headers.cookie");
      return res.status(200).json({ msg: "You are successfully logged out!" });
    }
  );
};
