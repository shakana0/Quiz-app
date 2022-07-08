import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalType {
  showModal: boolean;
  modalType: string;
}

const initialState: ModalType = {
  showModal: false,
  modalType: ''
};

const ModalSlice = createSlice({
  name: "ModalState",
  initialState,
  reducers: {
    toggleModalState: (state, {payload}) => {
      state.showModal = payload.showModal;
      state.modalType = payload.modalType
      // console.log('slice: showModal: ', state.showModal, 'modalType:', state.modalType)
    },
  },
});

export const { toggleModalState } = ModalSlice.actions;
export default ModalSlice.reducer;
