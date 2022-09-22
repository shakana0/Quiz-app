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
      withCredentials: true,
    });
    console.log(response, "res");
    // if (response.data.accessToken) {
    //   localStorage.setItem(
    //     "accessToken",
    //     JSON.stringify(response.data.accessToken)
    //   );
    //   localStorage.setItem(
    //     "user",
    //     JSON.stringify(response.data.createdUser)
    //   );
    // }
    return response;
  } catch (error: any) {
    console.log(error.response);
    return error.response.data;
  }
};

export const loginUser = async (logInCredentials: object) => {
  try {
    const response = await axios.post("/login", logInCredentials, {
      withCredentials: true,
    });
    console.log(response, "res");
    return response;
  } catch (error: any) {
    console.log("we have an error", error.response);
    return error.response.data;
  }
};

export const userAuth = async () => {
  console.log('in userAuth api')
  try {
    const res = await axios.get("/currUser", {
      withCredentials: true,
    });
    return res;
  } catch (err: any) {
    console.log(err, "Token invalid or expired");
  }
};

export const refreshToken = async () => {
  console.log('in refreshToken api')
  try {
    const res = await axios.get("/refresh", {
      withCredentials: true,
    });
    console.log(res, 'res')
    return res;
  } catch (err: any) {
    console.log(err, "RefreshToken invalid or expired");
  }
};

export const logoutUser = async () => {
    const res = await axios.post("/logout", {
      withCredentials: true,
    });
    console.log(res, 'res')
    if(res.status === 200){
      return res;
    }
    return new Error('Unable to logout. Plase try again.')
};