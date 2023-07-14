import { createSlice } from "@reduxjs/toolkit";
import { QuizType } from "../../interface/quizType";

interface ModalType {
  currentQuiz: QuizType;
  quizChange: boolean;
  deletedQuiz: {msg: string, status: string}
}

const initialState: ModalType = {
  currentQuiz: {
    id: "",
    titel: "",
    description: "",
    questions: [],
  },
  quizChange: false,
  deletedQuiz: {msg: "", status: ""}
};

const QuizSlice = createSlice({
  name: "QuizState",
  initialState,
  reducers: {
    setCurrentQuiz: (state, { payload }) => {
      state.currentQuiz = payload;
    },
    setQuizChange: (state, { payload }) => {
      state.quizChange = payload
    },
    setDeletedQuiz: (state, { payload }) => {
      state.deletedQuiz = {msg: payload.msg, status: payload.status}
    },
  },
});

export const { setCurrentQuiz, setQuizChange, setDeletedQuiz } = QuizSlice.actions;
export default QuizSlice.reducer;
