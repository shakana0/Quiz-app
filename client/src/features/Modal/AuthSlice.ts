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
  isLoading: boolean;
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
  isLoading: false,
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
      if (payload === undefined) {
        state.logInSuccess = false;
      } else {
        state.activeUser = payload.data.user;
        state.logInSuccess = true;
        localStorage.setItem("isLoggedIn", JSON.stringify(state.logInSuccess));
      }
    },
    setLoggedOutState: (state, { payload }) => {
      state.activeUser = {};
      state.logInSuccess = false;
      localStorage.setItem("isLoggedIn", JSON.stringify(state.logInSuccess));
    },
  },
  extraReducers: {
    [fetchNewUser.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchNewUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      if (payload.errors) {
        state.errorMsgs = payload.errors;
      } else {
        state.activeUser = payload.data.createdUser;
        localStorage.setItem("isLoggedIn", "true");
      }
    },
    [fetchLoggedInUser.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchLoggedInUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      if (payload.errors) {
        state.errorMsgs = payload.errors;
      } else {
        state.activeUser = payload.data.user;
        localStorage.setItem("isLoggedIn", "true");
      }
    },
    [fetchCurrentUser.fulfilled]: (state, actions) => {
      AuthSlice.caseReducers.setCurrentUser(state, actions);
    },
    [refreshCurrentUser.fulfilled]: (state, actions) => {
      AuthSlice.caseReducers.setCurrentUser(state, actions);
    },
    [logoutUser.pending]: (state) => {
      state.isLoading = true;
    },
    [logoutUser.fulfilled]: (state, actions) => {
      state.isLoading = false;
      AuthSlice.caseReducers.setLoggedOutState(state, actions);
    },
    [fetchUserGoogleLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchUserGoogleLogin.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      if (payload) {
        state.activeUser = payload.data.user;
        state.logInSuccess = true;
        state.authLogin.isGoogleLogin = true;
      }
    },
    [fetchCurrentGoogleUser.fulfilled]: (state, actions) => {
      AuthSlice.caseReducers.setCurrentUser(state, actions);
    },
    [fetchUserFacebookLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchUserFacebookLogin.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      if (payload) {
        state.activeUser = payload.data.user;
        state.logInSuccess = true;
      }
      localStorage.setItem("isLoggedIn", "true");
    },
    [fetchCurrentFacebookUser.fulfilled]: (state, actions) => {
      AuthSlice.caseReducers.setCurrentUser(state, actions);
    },
    [logoutSocialMediaUser.pending]: (state) => {
      state.isLoading = true;
    },
    [logoutSocialMediaUser.fulfilled]: (state, actions) => {
      state.isLoading = false;
      AuthSlice.caseReducers.setLoggedOutState(state, actions);
    },
  },
});

export const { setLogInSuccess, resetErrorMsgs, setIsCorrect, setAuthLogin } =
  AuthSlice.actions;
export default AuthSlice.reducer;
