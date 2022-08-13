import { createSlice } from "@reduxjs/toolkit";
import { activeFormType } from "../../interface/userType";

interface ModalType {
  showModal: boolean;
  modalType: string;
  activeForm: activeFormType;
}

const initialState: ModalType = {
  showModal: false,
  modalType: "",
  activeForm: { logIn: false, signUp: false },
};

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
    }
  },
});

export const {
  toggleModalState,
  setActiveForm
} = ModalSlice.actions;
export default ModalSlice.reducer;
