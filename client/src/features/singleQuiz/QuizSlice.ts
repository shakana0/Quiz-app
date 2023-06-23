import { createSlice } from "@reduxjs/toolkit";
import { QuizType } from "../../interface/quizType";

interface ModalType {
  currentQuiz: QuizType;
  quizChange: boolean;
}

const initialState: ModalType = {
  currentQuiz: {
    id: "",
    titel: "",
    description: "",
    questions: [],
  },
  quizChange: false
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
    }
  },
});

export const { setCurrentQuiz, setQuizChange } = QuizSlice.actions;
export default QuizSlice.reducer;
