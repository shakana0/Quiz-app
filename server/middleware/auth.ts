const mongoose = require("mongoose"),
userSchema = mongoose.Schema;

const User = require("../db/models/auth");
// import { userSchema } from "../db/models/auth";

/* Moongose hooks => fire a function after or before an  event, uses next to move on in the func */

//AFTER a save event accurs fire a function
// export const userAfterSaveMsg = userSchema.post(
//   "save",
//   function (doc: any, next: any) {
//     console.log("user was saved successfully :)", doc);
//     next();
//   }
// );

userSchema.methods.post("save", function (doc: any, next: any) {
    console.log("user was saved successfully :)", doc);
    next();
  })

// module.exports = {
//   //AFTER a save event accurs fire a function
//   userAfterSaveMsg: User.post("save", function (doc: any, next: any) {
//     console.log("user was saved successfully :)", doc);
//     next();
//   }),
// };

//BEFORE a event accurs, fire function
