import axios from "axios";
axios.defaults.baseURL = "https://quiz-app-backend-heroku.herokuapp.com";
// axios.defaults.headers.common = {
//   "Content-Type": "application/json",
//   withCredentials: true,
// };
// axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export const registerUser = async (user: object) => {
  try {
    const registeredUser = await axios.post("/user", user);
    return registeredUser;
  } catch (error: any) {
    return error.response;
  }
};

export const loginUser = async (logInCredentials: object) => {
  // console.log(logInCredentials, "from api :)");
  try {
    const loggedInUser = await axios.post("/user/login", logInCredentials, {
      headers: {
        "Content-Type": "application/json",
        withCredentials: true,
      },
    });
    console.log(loggedInUser, "hej");
    return loggedInUser;
  } catch (error: any) {
    return error.response;
  }
};
// loginUser();
export const getAllUsers = async () => {
  try {
    const allUsers = await axios.get("/user");
    return allUsers;
  } catch (error: any) {
    return error.response;
  }
};
