import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { credentialsType } from "../../interface/userType";
import * as api from "../../api/userApi";

interface UserAuthType {
  userList: Array<credentialsType>;
  logInSuccess: boolean;
  activeUser: object;
  errorMsgs: object;
}

const initialState: UserAuthType = {
  userList: [],
  logInSuccess: false,
  activeUser: {},
  errorMsgs: {},
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
    return response.data;
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
      state.errorMsgs = {};
    },
  },
  extraReducers: {
    [fetchLoggedInUser.fulfilled]: (state, { payload }) => {
      console.log(payload);
      if (payload.length) {
        console.log("den är inte tom");
        state.activeUser = payload[0];
      }
      console.log(state.activeUser);
    },
    [fetchNewUser.fulfilled]: (state, { payload }) => {
      if (payload.errors) {
        state.errorMsgs = payload.errors;
      } else {
        //won't save password in redux state now
        delete payload.data.password;
        state.activeUser = payload.data;
      }
    },
  },
});

export const { setLogInSuccess, resetErrorMsgs } = AuthSlice.actions;
export default AuthSlice.reducer;
