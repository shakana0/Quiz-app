import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { credentialsType, activeFormType } from "../../interface/userType";
import * as api from "../../api/userApi";

interface UserAuthType {
//   showModal: boolean;
//   modalType: string;
  userList: Array<credentialsType>;
//   activeForm: activeFormType;
  logInSuccess: boolean;
  activeUser: object;
}

const initialState: UserAuthType = {
//   showModal: false,
//   modalType: "",
  userList: [],
//   activeForm: { logIn: false, signUp: false },
  logInSuccess: false,
  activeUser: {},
};

//fetching all uesers
export const fetchUsers: any = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    const response = await api.getAllUsers();
    return response.data;
  }
);

const AuthSlice = createSlice({
  name: "AuthState",
  initialState,
  reducers: {
    setLogInSuccess: (state, { payload }) => {
      state.logInSuccess = payload;
    },
    setActiveUser: (state, { payload }) => {
      state.activeUser = payload[0]
    },
  },
  extraReducers: {
    [fetchUsers.fulfilled]: (state, { payload }) => {
      state.userList = payload;
    },
  },
});

export const {
  setLogInSuccess,
  setActiveUser,
} = AuthSlice.actions;
export default AuthSlice.reducer;
