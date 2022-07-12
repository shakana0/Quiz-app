import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { credentialsType, isCorrectType } from "../../interface/userType";
import * as api from "../../api/userApi";

interface ModalType {
  showModal: boolean;
  modalType: string;
  userList: Array<credentialsType>;
}

const initialState: ModalType = {
  showModal: false,
  modalType: "",
  userList: [],
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
  },
  extraReducers: {
    [fetchUsers.fulfilled]: (state, { payload }) => {
      state.userList = payload;
      // console.log(state.userList)
    },
  },
});

export const { toggleModalState } =
  ModalSlice.actions;
export default ModalSlice.reducer;
