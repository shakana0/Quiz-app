import { createSlice } from "@reduxjs/toolkit";
import { QuizType } from "../../interface/quizType";

interface ModalType {
  currentQuiz: QuizType;
  quizChange: boolean;
  quizInfo: {msg: string, status: string}
}

const initialState: ModalType = {
  currentQuiz: {
    id: "",
    titel: "",
    description: "",
    questions: [],
  },
  quizChange: false,
  quizInfo: {msg: "", status: ""}
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
    setQuizInfo: (state, { payload }) => {
      state.quizInfo = {msg: payload.msg, status: payload.status}
    },
  },
});

export const { setCurrentQuiz, setQuizChange, setQuizInfo } = QuizSlice.actions;
export default QuizSlice.reducer;
