const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const validChar = /^[0-9a-zA-Z@.-_åäöÅÄÖ]+$/;
import { QuizType } from "./quizes";

export const userSchema = new mongoose.Schema({
  emailAdress: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    minlength: [
      13,
      "Your email adress needs to be between 13 and 20 characters long",
    ],
    maxlength: [
      40,
      "Your email adress needs to be between 13 and 20 characters long",
    ],
    validate: [isEmail, "email format not valid, must be e.g. name@gmail.com"],
  },
  userName: {
    type: String,
    required: [true, "User name is required"],
    unique: true,
    lowercase: true,
    minlength: [6, "User name must be 6 characters long"],
    maxlength: [
      15,
      "Your user name needs to be between 6 and 15 characters long",
    ],
    validate: [
      (userName: string) => {
        validChar.test(userName);
      },
      "Invalid characters detected :(",
    ],
  },
  password: {
    type: String,
    required: [true, "Passowrd is required"],
    minlength: [8, "passowrd must be 8 characters long"],
  },
  quizes: {
    type: Array<QuizType>,
    required: false,
  },
});

/* Moongose hooks => fire a function after some event */

//AFTER a save event accurs fire a function
userSchema.post("save", function (doc: any, next: any) {
  console.log("user was saved successfully :)", doc);
  next();
});

//BEFORE a event accurs, fire function
userSchema.pre("save", async function (this: any, next: any) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//static method to login
userSchema.statics.login = async function (
  this: any,
  emailAdress: string,
  userName: string,
  password: string
) {
  //this reffers to userschema
  const user: any = await this.find({
    $or: [
      {
        emailAdress: emailAdress,
      },
      {
        userName: userName,
      },
    ],
  });
  if (user.length) {
    //compare hached password
    const auth = await bcrypt.compare(password, user[0].password);
    if (auth) {
      return user;
    }
    //the throw method will be catched in the login func
    throw Error("incorrect password");
  }
  throw Error("incorrect email or user name");
};

userSchema.statics.userAuth = async function (this: any, id: string) {
  try {
    const user: any = await this.findById({ _id: id });
    user.password = undefined;
    return user;
  } catch (err: any) {
    console.log(err);
  }
};

userSchema.statics.postQuiz = async function (
  this: any,
  id: String,
  quiz: QuizType
) {
  const newQuiz: any = await this.findOneAndUpdate(
    { _id: id },
    { $push: { quizes: quiz } }
  ).exec();
  if (!newQuiz) {
    throw "404";
  }
  return newQuiz;
};

userSchema.statics.add_google_user = async function (this: any, user: any) {
  const { emailAdress, userName, password } = user;
  const newUser = await this.create({ emailAdress, userName, password });
  if (!newUser) {
    console.log("no newUser found");
    throw "400";
  }
  return newUser;
};
//check social media user login
userSchema.statics.check_social_media_user = async function (
  this: any,
  emailAdress: string
) {
  const user = await this.find({ emailAdress });
  if (!user) {
    throw "400";
  }
  return user;
};

const User = mongoose.model("user", userSchema);
module.exports = User;
