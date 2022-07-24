import axios from "axios";

axios.defaults.baseURL = "https://quiz-app-backend-heroku.herokuapp.com";

// axios.defaults.baseURL = "http://localhost:3030";


export const postQuiz = async (userId: string, quiz: object) => {
  console.log(quiz, 'kmr från api :)')
  try {
    const postedQuiz = await axios.post(`/user/${userId}/quizes`, quiz);
    return postedQuiz;
  } catch (error: any) {
    return error.response;
  }
};

export const getAllQuizes = async () => {
  try {
    const response = await axios.get("/quiz");
    return response;
  } catch (error: any) {
    return error.response;
  }
};
