import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../features/header/HeaderSlice";
export default configureStore({
  reducer: {
    modal: modalReducer, //modal är namnet som användes i useSelector för att komm åt state => state.modal
  },
});
