import { Request, Response } from "express";
const jwt = require("jsonwebtoken");
require("dotenv").config();

const requireAuth = (req: Request, res: Response, next: any) => {
  const token = req.cookies.jwt;
  //check if web token exits and is verified
  if (token) {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err: any, decodedToken: string) => {
        if (err) {
            console.log(err.message)
          throw Error("token does not exist");
        }else{
            console.log(decodedToken, 'decodedToken')
            next();
        }
      }
    );
  } else {
    throw Error("token does not exist");
  }
};

module.exports = { requireAuth }