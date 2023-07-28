import axios from "axios";

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

//Search images
export const getImages = async (pageNum: number, searchTerm: string) => {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?page=${pageNum}&per_page=5&query=${searchTerm}&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
    );
    return response.data.results
  } catch (error) {
    console.error('Error:', error);
  }
};
