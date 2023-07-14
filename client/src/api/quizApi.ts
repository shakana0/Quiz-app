import axios from "axios";

// axios.defaults.baseURL = "https://quiz-app-backend-heroku.herokuapp.com";
axios.defaults.baseURL = "https://quiz-app-backend-uco1.onrender.com/";

export const postQuiz = async (userId: string, quiz: object) => {
  try {
    const postedQuiz = await axios.post(`/user/${userId}/quizes`, quiz);
    return postedQuiz;
  } catch (error: any) {
    return error.response;
  }
};

//Edit quiz

//Delete quiz
export const deleteQuiz = async (userId: string, quizId: string) => {
  try {
    const res = await axios.delete(`/user/${userId}/${quizId}/quiz`);
    return res;
  } catch (error: any) {
    return error.response;
  }
};
