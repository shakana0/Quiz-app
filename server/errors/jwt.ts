const jwt = require("jsonwebtoken");
require("dotenv").config();

const maxAge = 24 * 60 * 60; //1d

export const createToken = (id: string) => {
 
  // return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
  //   expiresIn: maxAge
  // })
  return jwt.sign({ id }, 'd6e7f60533adf3a09', {
    expiresIn: maxAge
  })

//   const refreshToken = jwt.sign(
//     { id: id},
//     process.env.REFRESH_TOKEN_SECRET,
//     {expiresIn: '1d'}
//   )
// console.log(accessToken, 'accestoken')
  // return accessToken;
};
