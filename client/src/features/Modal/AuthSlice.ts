import { createSlice } from "@reduxjs/toolkit";
import { credentialsType, errorMsgsType } from "../../interface/userType";
import {
  fetchCurrentUser,
  fetchLoggedInUser,
  fetchNewUser,
  logoutUser,
  refreshCurrentUser,
  fetchCurrentGoogleUser,
  fetchUserFacebookLogin,
  fetchCurrentFacebookUser,
  fetchUserGoogleLogin,
  logoutSocialMediaUser,
} from "./AsyncThunkFunctions";

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

const AuthSlice = createSlice({
  name: "AuthState",
  initialState,
  reducers: {
    setLogInSuccess: (state, { payload }) => {
      state.authLogin.isGoogleLogin = false;
      state.logInSuccess = payload;
    },
    setAuthLogin: (state, { payload }) => {
      if (payload.google) {
        state.authLogin.isGoogleLogin = payload.google;
      }
      if (payload) {
        state.authLogin.isFacebookLogin = payload.facebook;
      }
      localStorage.setItem("authLoginState", JSON.stringify(state.authLogin));
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
    setCurrentUser: (state, { payload }) => {
      console.log("user --> ", payload);
      if (payload === undefined) {
        state.logInSuccess = false;
      } else {
        state.activeUser = payload.data.user;
        state.logInSuccess = true;
        localStorage.setItem("isLoggedIn", JSON.stringify(state.logInSuccess));
      }
    },
  },
  extraReducers: {
    [fetchNewUser.fulfilled]: (state, { payload }) => {
      // console.log(payload, "payload");
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
      }
    },
    [fetchCurrentUser.fulfilled]: (state, actions) => {
      AuthSlice.caseReducers.setCurrentUser(state, actions);
      // if (payload === undefined) {
      //   state.logInSuccess = false;
      //   localStorage.setItem("isLoggedIn", "false");
      // } else {
      //   state.activeUser = payload.data.user;
      //   state.logInSuccess = true;
      //   localStorage.setItem("isLoggedIn", "true");
      // }
    },
    [refreshCurrentUser.fulfilled]: (state, actions) => {
      AuthSlice.caseReducers.setCurrentUser(state, actions);
      // if (payload === undefined) {
      //   state.logInSuccess = false;
      // } else {
      //   state.activeUser = payload.data.user;
      //   state.logInSuccess = true;
      //   localStorage.setItem("isLoggedIn", JSON.stringify(state.logInSuccess));
      // }
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
      // console.log(payload, "payload");
      if (payload) {
        state.activeUser = payload.data.user;
        state.logInSuccess = true;
        // state.authLogin.isGoogleLogin = true
        //console.log( state.authLogin, ' state.authLogin.isGoogleLogin')
      }
    },
    [fetchCurrentGoogleUser.fulfilled]: (state, actions) => {
      AuthSlice.caseReducers.setCurrentUser(state, actions);
      // if (payload === undefined) {
      //   state.logInSuccess = false;
      // } else {
      //   state.activeUser = payload.data.user;
      //   state.logInSuccess = true;
      //   localStorage.setItem("isLoggedIn", JSON.stringify(state.logInSuccess));
      // }
    },
    [fetchUserFacebookLogin.fulfilled]: (state, { payload }) => {
      if (payload) {
        state.activeUser = payload.data.user;
        state.logInSuccess = true;
      }
      localStorage.setItem("isLoggedIn", "true");
      console.log("state.logInSuccess", state.logInSuccess);
    },
    [fetchCurrentFacebookUser.fulfilled]: (state, actions) => {
      AuthSlice.caseReducers.setCurrentUser(state, actions); ///////////////////////
      // if (payload === undefined) {
      //   state.logInSuccess = false;
      // } else {
      //   state.activeUser = payload.data.user;
      //   state.logInSuccess = true;
      //   localStorage.setItem("isLoggedIn", JSON.stringify(state.logInSuccess));
      // }
    },
    [logoutSocialMediaUser.fulfilled]: (state, { payload }) => {
      console.log(payload, "payload");
      state.activeUser = {};
      state.logInSuccess = false;
      localStorage.setItem("isLoggedIn", JSON.stringify(state.logInSuccess));
      console.log("local storge is set to false now :)");
    },
  },
});

export const { setLogInSuccess, resetErrorMsgs, setIsCorrect, setAuthLogin } =
  AuthSlice.actions;
export default AuthSlice.reducer;
