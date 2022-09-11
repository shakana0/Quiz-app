import axios from "axios";

axios.defaults.baseURL = "https://quiz-app-backend-heroku.herokuapp.com";
// axios.defaults.headers.common = {
//   "Content-Type": "application/json",
//   withCredentials: true,
//   credentials: "include",
// };

// export const registerUser = async (user: object) => {
//   try {
//     const registeredUser = await axios.post("/user", user);
//     return registeredUser;
//   } catch (error: any) {
//     return error.response;
//   }
// };

export const registerUser = async (user: object) => {
  try {
    const response = await axios.post("/signup", user, {
      withCredentials: true
    });
    console.log(response, "res");
    return response;
  } catch (error: any) {
    console.log(error.response)
    return error.response.data;
  }
};

export const loginUser = async (logInCredentials: object) => {
  try {
    const response = await axios.post("/login", logInCredentials, {
      withCredentials: true
    });
    console.log(response, "res");
    // localStorage.setItem('accessToken', JSON.stringify(response.accessToken))
    return response;
  } catch (error: any) {
    console.log("we have an error", error.response);
    return error.response.data;
  }
};
