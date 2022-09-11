import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { credentialsType } from "../../interface/userType";
import * as api from "../../api/userApi";

interface UserAuthType {
  userList: Array<credentialsType>;
  logInSuccess: boolean;
  activeUser: object;
  // errorMsgs: object;
  errorMsgs: { emailAdress: string; userName: string; password: string };
  isCorrect: {
    email: boolean;
    userName: boolean;
    password: boolean;
  };
}

const initialState: UserAuthType = {
  userList: [],
  logInSuccess: false,
  activeUser: {},
  // errorMsgs: {},
  errorMsgs: { emailAdress: "", userName: "", password: "" },
  isCorrect: {
    email: false,
    userName: false,
    password: false,
  },
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
    console.log(response, "heres response");
    return response;
  }
);
const AuthSlice = createSlice({
  name: "AuthState",
  initialState,
  reducers: {
    setLogInSuccess: (state, { payload }) => {
      if (payload === false) {
        state.activeUser = {};
      }
      state.logInSuccess = payload;
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
    [fetchLoggedInUser.fulfilled]: (state, { payload }) => {
      // console.log(payload.errors)
      // console.log(payload.data.user)
      if (payload.errors) {
        state.errorMsgs = payload.errors;
      } else {
        //won't save password in redux state now
        // delete payload.data[0].password;
        state.activeUser = payload.data.user;
        console.log(state.activeUser)
      }
    },
    [fetchNewUser.fulfilled]: (state, { payload }) => {
      console.log(payload, "payload");
      if (payload.errors) {
        state.errorMsgs = payload.errors;
      } else {
        //won't save password in redux state now
        // delete payload.data.password;
        state.activeUser = payload.data.createdUser;
      }
    },
  },
});

export const { setLogInSuccess, resetErrorMsgs, setIsCorrect } =
  AuthSlice.actions;
export default AuthSlice.reducer;
