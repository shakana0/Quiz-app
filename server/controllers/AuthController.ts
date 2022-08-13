// import { credentialsType } from "../db/models/user";
import { checkIfUserExists, createUser } from "../db/usersCrud";
// const UsersDB = {
//   users: require("../db/models/user"),
//   setUsers: function (data: credentialsType) {
//     this.users = data;
//   },
// };

// const fsPromises = require("fs").promises;
// const path = require("path");
const bcrypt = require("bcrypt");

// type RequestInfo = Request | string;
// interface Request extends Body {
//   // No definition for `body` here
//   // ...
// }
// interface Body {
//   readonly body: ReadableStream<Uint8Array> | null;
//   // ...
// }
// body: 'string' as unknown as ReadableStream<Uint8Array>

// (req: Request, res: Response) FUNKAR INTE
export const handleNewUserRegisteration = async (req: any, res: any) => {
  //destructuring from req.body
  const { emailAdress, userName, password } = req.body;
  if (!emailAdress || !userName || !password) {
    return res
      .status(400)
      .json({ msg: "user name or email and password are required" });
  }

  //checking for dubblicate email or username in db
    const dubblicate = await checkIfUserExists(req.body);
    if (dubblicate) {
      //status 409 === conflict
      return res.sendStatus(409);
    }
    try {
        //exrypt the password
        const hashedPwD = await bcrypt.hash(password, 10)
        //store new user in db
        const newUser = {"emailAdress": emailAdress, "userName": userName, "password": hashedPwD, "quizes": []}
        createUser(newUser)

    } catch (err: any) {
      res.status(500).json({ msg: err.message });
    }

};

module.exports = handleNewUserRegisteration