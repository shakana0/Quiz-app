import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../features/Modal/ModalSlice";
import quizReducer from "../features/singleQuiz/QuizSlice"
export default configureStore({
  reducer: {
    modal: modalReducer, //modal är namnet som användes i useSelector för att komm åt state => state.modal
    quiz: quizReducer,
  },
});
