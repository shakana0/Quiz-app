import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { credentialsType, activeFormType } from "../../interface/userType";
import * as api from "../../api/userApi";

interface ModalType {
  showModal: boolean;
  modalType: string;
  userList: Array<credentialsType>;
  activeForm: activeFormType;
  logInSuccess: boolean;
}

const initialState: ModalType = {
  showModal: false,
  modalType: "",
  userList: [],
  activeForm: { logIn: false, signUp: false },
  logInSuccess: false,
};

//fetching all uesers
export const fetchUsers: any = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    const response = await api.getAllUsers();
    return response.data;
  }
);

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
    setLogInSuccess: (state, { payload }) => {
      state.logInSuccess = payload;
      console.log(state.logInSuccess )
    },
  },
  extraReducers: {
    [fetchUsers.fulfilled]: (state, { payload }) => {
      state.userList = payload;
      // console.log(state.userList)
    },
  },
});

export const { toggleModalState, setActiveForm, setLogInSuccess } = ModalSlice.actions;
export default ModalSlice.reducer;
