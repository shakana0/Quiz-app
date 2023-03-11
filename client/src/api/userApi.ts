import axios from "axios";

// axios.defaults.baseURL = "https://quiz-app-backend-heroku.herokuapp.com";
axios.defaults.baseURL = "https://quiz-app-backend-uco1.onrender.com/";

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
    return error.response.data;
  }
};

export const loginUser = async (logInCredentials: object) => {
  try {
    const res = await axios.post("/login", logInCredentials, {
      withCredentials: true,
    });
    return res;
  } catch (error: any) {
    return error.response.data;
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
    return res;
  } catch (err: any) {
    console.log(err, "RefreshToken invalid or expired");
  }
};

export const logoutUser = async () => {
  const res = await axios.post("/logout", null, {
    withCredentials: true,
  });
  if (res.status === 200) {
    return res;
  }
  return new Error("Unable to logout. Plase try again.");
};

//google login post request
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

//facebook login post request
export const loginWithFacebook = async (credentials: object) => {
  try {
    const res = await axios.post("/facebook-login", credentials, {
      withCredentials: true,
    });
    return res;
  } catch (err: any) {
    console.log(err, "err");
  }
};

export const socialMediaLogout = async () => {
  const res = await axios.post("/social-media-logout", null, {
    withCredentials: true,
  });
  if (res.status === 200) {
    return res;
  }
  console.log("Unable to logout. Plase try again.");
  return new Error("Unable to logout. Plase try again.");
};

export const currGoogleUser = async () => {
  try {
    const res = await axios.get("/curr-google-user", {
      withCredentials: true,
    });
    return res;
  } catch (err: any) {
    console.log(err.response, "Token invalid or expired");
  }
};

export const currFacebookUser = async () => {
  try {
    const res = await axios.get("curr-facebook-user", {
      withCredentials: true,
    });
    return res;
  } catch (err: any) {
    console.log(err, "Token invalid or expired");
  }
};
