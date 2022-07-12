import axios from "axios";
axios.defaults.baseURL = "https://quiz-app-backend-heroku.herokuapp.com";

export const postUser = async (user: object) => {
  try {
    const postedUser = await axios.post("/user", user);
    return postedUser;
  } catch (error: any) {
    return error.response;
  }
};

export const getAllUsers = async () => {
  try {
    const allUsers = await axios.get("/user");
    return allUsers;
  } catch (error: any) {
    return error.response;
  }
};
