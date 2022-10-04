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
    const res = await axios.post("/signup", user, {
      withCredentials: true,
    });
    return res;
  } catch (error: any) {
    return error.res.data;
  }
};

export const loginUser = async (logInCredentials: object) => {
  try {
    const res = await axios.post("/login", logInCredentials, {
      withCredentials: true,
    });
    return res;
  } catch (error: any) {
    return error.res.data;
  }
};

export const userAuth = async () => {
  try {
    const res = await axios.get("/currUser", {
      withCredentials: true,
    });
    return res;
  } catch (err: any) {
    console.log(err.response, "Token invalid or expired");
  }
};

export const refreshToken = async () => {
  try {
    const res = await axios.get("/refresh", {
      withCredentials: true,
    });
    console.log(res, "res");
    return res;
  } catch (err: any) {
    console.log(err, "RefreshToken invalid or expired");
  }
};

export const logoutUser = async () => {
  const res = await axios.post("/logout", null, {
    withCredentials: true,
  });
  console.log(res, "res");
  if (res.status === 200) {
    return res;
  }
  return new Error("Unable to logout. Plase try again.");
};

export const loginWithGoogle = async (idToken: object) => {
  try {
    const res = await axios.post("/google-login", idToken, {
      withCredentials: true,
    });
    return res;
  } catch (err: any) {
    console.log(err, "err");
  }
};
