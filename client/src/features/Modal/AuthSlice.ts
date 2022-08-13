import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { credentialsType } from "../../interface/userType";
import * as api from "../../api/userApi";

interface UserAuthType {
  userList: Array<credentialsType>;
  logInSuccess: boolean;
  activeUser: object;
}

const initialState: UserAuthType = {
  userList: [],
  logInSuccess: false,
  activeUser: {},
};

//fetching loggedIn user
export const fetchLoggedInUser: any = createAsyncThunk(
  "user/fetchLoggedInUser", 
  async (logInCredentials: object) => {
    const response = await api.loginUser(logInCredentials);
    return response.data;
  }
)
const AuthSlice = createSlice({
  name: "AuthState",
  initialState,
  reducers: {
    setLogInSuccess: (state, { payload }) => {
      if(payload === false){
        state.activeUser = {}
      }
      state.logInSuccess = payload;
    }
  },
  extraReducers: {
    [fetchLoggedInUser.fulfilled]: (state, { payload }) => {
      console.log(payload)
      if(payload.length){
        console.log('den är inte tom')
        state.activeUser = payload[0];
      }
      console.log(state.activeUser)
    },
  },
});

export const {
  setLogInSuccess
} = AuthSlice.actions;
export default AuthSlice.reducer;
