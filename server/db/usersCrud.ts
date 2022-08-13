import UserModel, { credentialsType } from "./models/user";
import { QuizType } from "./models/quizes";

export const createUser = async (credentials: credentialsType) => {
  const newUser = new UserModel(credentials);
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

export const checkIfUserExists = async (user: credentialsType) => {
  const res = await UserModel.find({
    $or: [
      {
        userName: user.userName,
      },
      {
        emailAdress: user.emailAdress,
      },
    ],
  });
  return res;
};

export const logInUser = async (user: credentialsType) => {
  // console.log(user, 'from crud')
  const loggedInUser = await UserModel.find({
    $or: [
      {
        userName: user.userName,
      },
      {
        emailAdress: user.emailAdress,
      }
    ],
  });
  // console.log(loggedInUser, 'res from crud')
  return loggedInUser;
};

export const deleteUser = async (userId: string) => {
  const singleUser = await UserModel.findByIdAndDelete({ _id: userId });
  return singleUser;
};

export const postQuiz = async (userId: String, quiz: QuizType) => {
  const newQuiz = await UserModel.findById(userId);
  if (!newQuiz) {
    throw "404";
  } else {
    newQuiz.quizes.push(quiz);
    await newQuiz.save();
    return newQuiz;
  }
};
