const mongoose = require("mongoose");
const { isEmail } = require("validator");

const validChar = /^[0-9a-zA-Z@.-_åäöÅÄÖ]+$/;

const userSchema = new mongoose.Schema({
  emailAdress: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    minlength: [13, 'Your email adress needs to be between 13 and 20 characters long'],
    maxlength: [20, 'Your email adress needs to be between 13 and 20 characters long'],
    validate: [isEmail, 'email format not valid, must be e.g. name@gmail.com']
  },
  userName: {
    type: String,
    required: [true, "User name is required"],
    unique: true,
    lowercase: true,
    minlength: [8, "User name must be 8 characters long"],
    maxlength: [15, 'Your user name needs to be between 8 and 15 characters long'],
    validate: [(userName: string) => {
        validChar.test(userName)
    }, 'Invalid characters detected :(']

  },
  password: {
    type: String,
    required: [true, "Passowrd is required"],
    minlength: [8, "passowrd must be 8 characters long"],
    // maxlength: [15, 'Your user name needs to be between 8 and 15 characters long'],
  },
  quizes: {
    type: [Object],
    required: false,
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
