import {
  configureStore,
} from "@reduxjs/toolkit";
import authReducer from "../features/Modal/AuthSlice";
import modalReducer from "../features/Modal/ModalSlice";
import quizReducer from "../features/singleQuiz/QuizSlice";

export default configureStore({
  reducer: {
    modal: modalReducer, //modal är namnet som användes i useSelector för att komma åt state => state.modal
    quiz: quizReducer,
    auth: authReducer
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  })
});

//icon animation hover
//https://ianlunn.github.io/Hover/
