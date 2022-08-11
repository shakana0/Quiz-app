import UserModel, { credentialsType } from "./models/user";
import { QuizType } from "./models/quizes";

export const createUser = async (credentials: credentialsType) => {
  const newUser = new UserModel(credentials);
  // const token = await newUser.authenticate(emailAdress,password)
  if (!credentials) {
    throw "400";
  }
  await newUser.save();
  return newUser;
};

export const getAllUsers = async () => {
  const allUsers = await UserModel.find({});
  return allUsers;
};

// export const getSingleUser = async (userId: string) => {
//   const singleUser = await UserModel.find({ _id: userId });
//   return singleUser;
// };

export const logInUser = async (user: credentialsType) => {
  const loggedInUser = await UserModel.find({
    $or: [
      {
        userName: user.userName,
        password: user.password,
      },
      {
        emailAdress: user.emailAdress,
        password: user.password,
      },
    ],
  });
  return loggedInUser;
};

export const deleteUser = async (userId: string) => {
  const singleUser = await UserModel.findByIdAndDelete({ _id: userId });
  return singleUser;
};

export const postQuiz = async (userId: String, quiz: QuizType) => {
  console.log(userId, quiz, "från crud");
  const newQuiz = await UserModel.findById(userId);
  if (!newQuiz) {
    throw "404";
  } else {
    newQuiz.quizes.push(quiz);
    await newQuiz.save();
    console.log(userId, quiz, "från crud");
    return newQuiz;
  }
};
