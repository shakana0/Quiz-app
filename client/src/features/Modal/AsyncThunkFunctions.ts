import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/userApi";

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

//fetching current google user
export const fetchCurrentGoogleUser: any = createAsyncThunk(
  "user/fetchCurrentGoogleUser",
  async () => {
    const response = await api.currGoogleUser();
    return response;
  }
);

//fetching current facebook user
export const fetchCurrentFacebookUser: any = createAsyncThunk(
  "user/fetchCurrenFacebooktUser",
  async () => {
    const response = await api.currFacebookUser();
    return response;
  }
);

//logout social media user
export const logoutSocialMediaUser: any = createAsyncThunk(
  "user/logoutSocialMediaUser",
  async () => {
    const response = await api.socialMediaLogout();
    return response;
  }
);
