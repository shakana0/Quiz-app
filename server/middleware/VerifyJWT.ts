//ANVÄNDS INTE :(())

import { Request, Response } from "express";
const jwt = require("jsonwebtoken");
require("dotenv").config();

 const verifyJWT = (req: any, res: Response, next: any) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.sendStatus(401);
  }
  const token = authHeader.split("")[1];
  jwt.verify(
    token,
    `${process.env.ACCESS_TOKEN_SECRET}`,
    (err: any, decoded: any) => {
      if (err) {
        return res.sendStatus(403); //forbidden, invalid token
      }
      req.user = decoded.userName
      next()
    }
  );
};

module.exports = verifyJWT
