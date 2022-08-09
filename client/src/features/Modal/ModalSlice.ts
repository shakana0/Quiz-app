import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { credentialsType, activeFormType } from "../../interface/userType";
import * as api from "../../api/userApi";

interface ModalType {
  showModal: boolean;
  modalType: string;
  // userList: Array<credentialsType>;
  activeForm: activeFormType;
  // logInSuccess: boolean;
  // activeUser: object;
}

const initialState: ModalType = {
  showModal: false,
  modalType: "",
  // userList: [],
  activeForm: { logIn: false, signUp: false },
  // logInSuccess: false,
  // activeUser: {},
};

//fetching all uesers
// export const fetchUsers: any = createAsyncThunk(
//   "users/fetchUsers",
//   async () => {
//     const response = await api.getAllUsers();
//     return response.data;
//   }
// );

const ModalSlice = createSlice({
  name: "ModalState",
  initialState,
  reducers: {
    toggleModalState: (state, { payload }) => {
      state.showModal = payload.showModal;
      state.modalType = payload.modalType;
    },
    setActiveForm: (state, { payload }) => {
      state.activeForm.logIn = payload.logIn;
      state.activeForm.signUp = payload.signUp;
    },
    // setLogInSuccess: (state, { payload }) => {
    //   state.logInSuccess = payload;
    // },
    // setActiveUser: (state, { payload }) => {
    //   state.activeUser = payload[0]
    // },
  },
  // extraReducers: {
  //   [fetchUsers.fulfilled]: (state, { payload }) => {
  //     state.userList = payload;
  //   },
  // },
});

export const {
  toggleModalState,
  setActiveForm,
  // setLogInSuccess,
  // setActiveUser,
} = ModalSlice.actions;
export default ModalSlice.reducer;
