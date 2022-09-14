//DENNA BEHÖVS INTE :((


import express, { Request, Response, Router } from "express";
import {
  createUser,
  getAllUsers,
  logInUser,
  deleteUser,
  postQuiz,
  checkIfUserExists,
  updateUser
} from "../db/usersCrud";
// import { verifyJWT } from "../middleware/VerifyJWT"
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config()


//register user
router.post("/", async (req: Request, res: Response) => {
  const { emailAdress, userName, password } = req.body;
  // console.log(req.body, 'här är req bodyy')
  if (!emailAdress || !userName || !password) {
    return res
      .status(400)
      .json({ msg: "User name, email and password are required" });
  }
  //checking for dubblicate email or username in db
  const dubblicate = await checkIfUserExists(req.body);
  if (Object.keys(dubblicate).length !== 0) {
    //status 409 === conflict
    res.status(409).json({ Msg: "Email or user name already exits" });
  } else {
    try {
      //exrypt the password
      const hashedPwD = await bcrypt.hash(password, 10);
      //store new user in db
      const newUser = {
        emailAdress: emailAdress,
        userName: userName,
        password: hashedPwD,
        quizes: [],
      };
      const createdUser = await createUser(newUser);
      res.status(201).json({ Msg: `Success,user ${createdUser} is created`,
      });
      // verifyJWT(createdUser)
    } catch (err: any) {
      res.status(500).json({ msg: err.message });
    }
  }

  //DEN HÄR DELEN FUNKAR AT LEAst
  // const createdUser = await createUser(req.body);
  // res.status(201).json(createdUser);

  // res.status(201).json(req.body);
});

router.get("/", async (req: Request, res: Response) => {
  const allUsers = await getAllUsers();
  res.json(allUsers);
});

router.post("/login", async (req: Request, res: Response) => {
  const { emailAdress, userName, password } = req.body;
  // console.log(req.body, 'här är req bodyy')
  if (!emailAdress || !userName || !password) {
    return res
      .status(400)
      .json({ Msg: "User name, email and password are required" });
  }
  const foundUser = await logInUser(req.body);
  // console.log(foundUser, "foundUser");
  if (Object.keys(foundUser).length === 0) {
    // console.log(Object.keys(foundUser).length !== 0, typeof foundUser);
    //status 409 === conflict
    res.status(401).json({ msg: "Unauthorized" });
  }
  //camparing password
  const match = await bcrypt.compare(password, foundUser[0].password);
  if (match) {
    //create JWTs
    const accessToken = jwt.sign(
      {"userName": foundUser[0].userName},
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: '30s'}
    )
    const refreshToken = jwt.sign(
      {"userName": foundUser[0].userName},
      process.env.REFRESH_TOKEN_SECRET,
      {expiresIn: '1d'}
    )
    // const allUsers = await getAllUsers()
    // const otherUsers = allUsers.filter((user) => user.userName !== foundUser[0].userName )
    const currentUser = { ...foundUser[0], refreshToken}
    //updating user
    const updatedUser = await updateUser(currentUser)
    console.log(updatedUser, 'coming from /login')
    // res.json({
    //   Msg: `Success, ${JSON.stringify(
    //     foundUser[0].emailAdress
    //   )} is now logged in`,
    // });

    //sending the accesstoken as httpOnly cookie so js doesn't have access to it
    res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000}) //1d
    res.json({ accessToken, currentUser });
  } else {
    res.sendStatus(401);
  }

  //DEN HÄR DELEN FUNKAR AT LEAst
  // const user = await logInUser(req.body);
  // res.status(201).json(user);
  // console.log(req.body, "this is req body :)");
});

router.delete("/:id", async (req: Request, res: Response) => {
  const deletedUser = await deleteUser(req.params.id);
  res.json(deletedUser);
});

//posta quiz
router.post("/:id/quizes", async (req: Request, res: Response) => {
  const postedQuiz = await postQuiz(req.params.id, req.body);
  console.log(req.body.quizes, "reqbody");
  res.status(201).json(postedQuiz);
});

export default router;
