const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const validChar = /^[0-9a-zA-Z@.-_åäöÅÄÖ]+$/;

export const userSchema = new mongoose.Schema({
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
  },
  quizes: {
    type: [Object],
    required: false,
  },
});

  /* Moongose hooks => fire a function after some event */
  //AFTER a save event accurs fire a function
  userSchema.post('save', function(doc: any, next: any){
    console.log('user was saved successfully :)', doc)
     next()
  })

//BEFORE a event accurs, fire function
userSchema.pre('save', async function(this: any, next: any){
  // const salt = await bcrypt.genSalt()
   this.password = await bcrypt.hash(this.password, 10);
  console.log('user about to be created :)', this)
   next()
})


const User = mongoose.model("user", userSchema);
module.exports = User;
