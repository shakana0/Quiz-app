import axios from "axios";
import { QuizType } from "../interface/quizType";

// axios.defaults.baseURL = "https://quiz-app-backend-uco1.onrender.com/";

export const postQuiz = async (userId: string, quiz: any) => {
  console.log('created quiz --> ', quiz)
  try {
    const formData = new FormData()
    // const blobData = new Blob([quiz.questions[0].image], { type: quiz.questions[0].image.type });
    // const blobDataa = new File([Blob], "filename")

    quiz.questions.forEach((question: any) => {
      formData.append('images', question.image);
    });
    formData.append('data', JSON.stringify(quiz));

    const postedQuiz = await axios.post(`http://localhost:3030/user/${userId}/quizes`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    });
    return postedQuiz;
  } catch (error: any) {
    return error.response;
  }
};
// export const postQuiz = async (userId: string, quiz: object) => {
//   console.log('created quiz --> ', quiz)
//   try {
//     // const postedQuiz = await axios.post(`/user/${userId}/quizes`, quiz);
//     // return postedQuiz;
//   } catch (error: any) {
//     return error.response;
//   }
// };

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
