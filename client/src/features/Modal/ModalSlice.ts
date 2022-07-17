import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { credentialsType, activeFormType } from "../../interface/userType";
import * as api from "../../api/userApi";

interface ModalType {
  showModal: boolean;
  modalType: string;
  userList: Array<credentialsType>;
  activeForm: activeFormType;
  logInSuccess: boolean;
  activeUser: credentialsType;
}

const initialState: ModalType = {
  showModal: false,
  modalType: "",
  userList: [],
  activeForm: { logIn: false, signUp: false },
  logInSuccess: false,
  activeUser: {
    emailAdress: "",
    userName: "",
    password: "",
  },
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
    //skapa useeffest eller ngt som hämtar logInSuccess värdet från localStorage för varje gång applikationen rendreras om
    setLogInSuccess: (state, { payload }) => {
      state.logInSuccess = payload;
      console.log(state.logInSuccess);
    },
    setActiveUser: (state, { payload }) => {
      state.activeUser.emailAdress = payload.emailAdress;
      state.activeUser.userName = payload.userName;
      state.activeUser.password = payload.password;
    },
  },
  extraReducers: {
    [fetchUsers.fulfilled]: (state, { payload }) => {
      state.userList = payload;
      // console.log(state.userList)
    },
  },
});

export const { toggleModalState, setActiveForm, setLogInSuccess, setActiveUser } =
  ModalSlice.actions;
export default ModalSlice.reducer;
