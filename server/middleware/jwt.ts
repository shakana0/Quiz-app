require("dotenv").config();

const jwt = require("jsonwebtoken");
const maxAge = 24 * 60 * 60; //1d

export const createToken = (id: string) => {
  return jwt.sign({ id }, `${process.env.ACCESS_TOKEN_SECRET}`, {
    expiresIn: maxAge
  })
};
