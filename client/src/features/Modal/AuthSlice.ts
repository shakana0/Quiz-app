import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
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
  async (cred: object) => {
    console.log(cred, 'vaad')
    const response = await api.loginUser(cred);
    return response.data;
  }
)
// export const fetchUsers: any = createAsyncThunk(
//   "users/fetchUsers",
//   async () => {
//     const response = await api.getAllUsers();
//     return response.data;
//   }
// );

const AuthSlice = createSlice({
  name: "AuthState",
  initialState,
  reducers: {
    setLogInSuccess: (state, { payload }) => {
      state.logInSuccess = payload;
    },
    // setActiveUser: (state, { payload }) => {
    //   state.activeUser = payload[0]
    // },
  },
  extraReducers: {
    [fetchLoggedInUser.fulfilled]: (state, { payload }) => {
      console.log(payload)
      state.activeUser = payload;
      console.log(state.activeUser)
    },
  },
});

export const {
  setLogInSuccess
} = AuthSlice.actions;
export default AuthSlice.reducer;
