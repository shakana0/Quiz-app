import { Request, Response } from "express";
const User = require("../db/models/auth");

interface errMsg {
  properties: {
    message?: string;
    type?: string;
    validator?: void;
    path?: string;
    value?: string;
  };
}

//Handle errors
const handleErrors = (err: any) => {
  console.log(err.code, err.message)
  // : { [key: string]: any } == type annotation
  let errors: { [key: string]: any }  = { emailAdress: "", userName: "", password: "" };
  if(err.code === 11000 && err.message.includes('emailAdress')){
    errors.emailAdress = 'Email already exits'
    return errors
  }
  if(err.code === 11000 && err.message.includes('userName')){
    console.log('hej')
    errors.userName = 'User name already exits'
    return errors
  }
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }: any) => {
      //populate object using brackets js
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

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

  // console.log(userName, password)
  // res.send(`New sign up ${JSON.stringify(req.body)}`)
};

module.exports.login_post = async (req: Request, res: Response) => {
  const { emailAdress, userName, password } = req.body;

  res.send("user is logged in");
};
