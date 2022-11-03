import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { credentialsType, errorMsgsType } from "../../interface/userType";
import * as api from "../../api/userApi";

interface UserAuthType {
  userList: Array<credentialsType>;
  logInSuccess: boolean;
  activeUser: object;
  // errorMsgs: { emailAdress: string; userName: string; password: string };
  errorMsgs: errorMsgsType;
  isCorrect: {
    email: boolean;
    userName: boolean;
    password: boolean;
  };
  authLogin: { isGoogleLogin: boolean; isFacebookLogin: boolean };
}

const initialState: UserAuthType = {
  userList: [],
  logInSuccess: false,
  activeUser: {},
  errorMsgs: { emailAdress: "", userName: "", password: "" },
  isCorrect: {
    email: false,
    userName: false,
    password: false,
  },
  authLogin: { isGoogleLogin: false, isFacebookLogin: false },
};
//fetch errors
export const fetchNewUser: any = createAsyncThunk(
  "user/fetchNewUser",
  async (logInCredentials: object) => {
    const response = await api.registerUser(logInCredentials);
    return response;
  }
);

//fetching loggedIn user
export const fetchLoggedInUser: any = createAsyncThunk(
  "user/fetchLoggedInUser",
  async (logInCredentials: object) => {
    const response = await api.loginUser(logInCredentials);
    // console.log(response);
    return response;
  }
);

//fetching current user
export const fetchCurrentUser: any = createAsyncThunk(
  "user/fetchCurrentUser",
  async () => {
    const response = await api.userAuth();
    return response;
  }
);

//refresh current user
export const refreshCurrentUser: any = createAsyncThunk(
  "user/refreshCurrentUser",
  async () => {
    const response = await api.refreshToken();
    return response;
  }
);

export const logoutUser: any = createAsyncThunk("user/logoutUser", async () => {
  const response = await api.logoutUser();
  return response;
});

//fetch logged in user with Google
export const fetchUserGoogleLogin: any = createAsyncThunk(
  "user/fetchUserGoogleLogin",
  async (idToken: object) => {
    const response = await api.loginWithGoogle(idToken);
    return response;
  }
);

//fetch logged in user with Facebook
export const fetchUserFacebookLogin: any = createAsyncThunk(
  "user/fetchUserFacebookLogin",
  async (credentials: object) => {
    const response = await api.loginWithFacebook(credentials);
    return response;
  }
);

const AuthSlice = createSlice({
  name: "AuthState",
  initialState,
  reducers: {
    setLogInSuccess: (state, { payload }) => {
      // if (payload === false) {
      //   state.activeUser = {};
      // }
      state.authLogin.isGoogleLogin = false;
      state.logInSuccess = payload;
    },
    setAuthLogin: (state, { payload }) => {
      // console.log(payload, 'payload from setAuthLogin')
      if (payload.google) {
        state.authLogin.isGoogleLogin = payload.google;
      }
      if (payload) {
        // console.log(payload.facebook, 'payload.facebook')
        state.authLogin.isFacebookLogin = payload.facebook;
      }
      localStorage.setItem(
        "authLoginState",
        JSON.stringify(state.authLogin)
      );
    },
    resetErrorMsgs: (state) => {
      state.errorMsgs = { emailAdress: "", userName: "", password: "" };
      state.isCorrect = {
        email: false,
        userName: false,
        password: false,
      };
    },
    setIsCorrect: (state) => {
      if (Object.keys(state.errorMsgs).length !== 0) {
        if (state.errorMsgs.emailAdress === "") {
          state.isCorrect.email = true;
        }
        if (state.errorMsgs.userName === "") {
          state.isCorrect.userName = true;
        }
        if (state.errorMsgs.password === "") {
          state.isCorrect.password = true;
        }
      }
    },
  },
  extraReducers: {
    [fetchNewUser.fulfilled]: (state, { payload }) => {
      console.log(payload, "payload");
      if (payload.errors) {
        state.errorMsgs = payload.errors;
      } else {
        state.activeUser = payload.data.createdUser;
      }
    },
    [fetchLoggedInUser.fulfilled]: (state, { payload }) => {
      if (payload.errors) {
        state.errorMsgs = payload.errors;
      } else {
        state.activeUser = payload.data.user;
        localStorage.setItem("isLoggedIn", "true");
        console.log("local storge is set to true now :)");
      }
    },
    [fetchCurrentUser.fulfilled]: (state, { payload }) => {
      if (payload === undefined) {
        state.logInSuccess = false;
        localStorage.setItem("isLoggedIn", "false");
      } else {
        state.activeUser = payload.data.user;
        state.logInSuccess = true;
        localStorage.setItem("isLoggedIn", "true");
      }
    },
    [refreshCurrentUser.fulfilled]: (state, { payload }) => {
      console.log(payload, "payload");
      if (payload === undefined) {
        state.logInSuccess = false;
      } else {
        state.activeUser = payload.data.user;
        state.logInSuccess = true;
        localStorage.setItem("isLoggedIn", JSON.stringify(state.logInSuccess));
      }
    },
    [logoutUser.fulfilled]: (state, { payload }) => {
      console.log(payload, "payload");
      state.activeUser = {};
      state.logInSuccess = false;
      // localStorage.setItem("isLoggedIn", JSON.stringify(state.logInSuccess));
      localStorage.setItem("isLoggedIn", JSON.stringify(state.logInSuccess));
      console.log("local storge is set to false now :)");
    },
    [fetchUserGoogleLogin.fulfilled]: (state, { payload }) => {
      console.log(payload, "payload");
      if (payload) {
        state.activeUser = payload.data.user;
        state.logInSuccess = true;
        // state.authLogin.isGoogleLogin = true
        //console.log( state.authLogin, ' state.authLogin.isGoogleLogin')
      }
    },
    [fetchUserFacebookLogin.fulfilled]: (state, { payload }) => {
      console.log(payload, "payload fb");
      if (payload) {
        state.activeUser = payload.data.user;
        state.logInSuccess = true;
      }
    },
  },
});

export const { setLogInSuccess, resetErrorMsgs, setIsCorrect, setAuthLogin } =
  AuthSlice.actions;
export default AuthSlice.reducer;
