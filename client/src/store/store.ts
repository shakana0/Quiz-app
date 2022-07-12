import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../features/Modal/ModalSlice";
export default configureStore({
  reducer: {
    modal: modalReducer, //modal är namnet som användes i useSelector för att komm åt state => state.modal
  },
});
