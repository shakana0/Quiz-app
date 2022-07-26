import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { QuizType } from "../../interface/quizType";

interface ModalType {
  currentQuiz: QuizType;
}

const initialState: ModalType = {
  currentQuiz: {
    id: "",
    titel: "",
    description: "",
    questions: [],
  },
};

const QuizSlice = createSlice({
  name: "QuizState",
  initialState,
  reducers: {
    setCurrentQuiz: (state, { payload }) => {
      state.currentQuiz = payload;
    },
  },
});

export const { setCurrentQuiz } = QuizSlice.actions;
export default QuizSlice.reducer;
