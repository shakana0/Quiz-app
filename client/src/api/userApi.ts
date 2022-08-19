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
      headers: {
        "Content-Type": "application/json",
        withCredentials: true,
        credentials: "include",
      },
    });
    return response;
  } catch (error: any) {
    return error.response.data;
  }
};

export const loginUser = async (logInCredentials: object) => {
  console.log("api", logInCredentials);
  try {
    const response = await axios.post("/login", logInCredentials, {
      headers: {
        "Content-Type": "application/json",
        withCredentials: true,
        credentials: "include",
      },
    });
    console.log(response, "res");
    return response;
  } catch (error: any) {
    console.log("we have an error", error.response.data.errors);
    return error.response.data;
    // if (!error.response) {
    //   console.log("No server response");
    // } else if (error.response?.status === 400) {
    //   console.log(`Server didn't get expected body`);
    // } else if (error.response?.status === 401) {
    //   console.log(`Unauthorized`);
    // } else {
    //   console.log("Login failed");
    // }
  }
};
