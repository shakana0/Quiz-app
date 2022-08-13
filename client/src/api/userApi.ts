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
  try {
    const response = await axios.post("/user/login", logInCredentials, {
      headers: {
        "Content-Type": "application/json",
        withCredentials: true,
      },
    });
    const accessToken = response?.data?.accessToken;
    // console.log(accessToken, "this is accesstoken");
    console.log(response, 'res')
    return response;
  } catch (error: any) {
    if (!error.response) {
      console.log("No server response");
    } else if (error.response?.status === 400) {
      console.log(`Server didn't get expected body`);
    } else if (error.response?.status === 401) {
      console.log(`Unauthorized`);
    } else {
      console.log("Login failed");
    }
    return error.response;
  }
};
