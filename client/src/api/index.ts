import axios from "axios";

axios.defaults.baseURL = "https://quiz-app-backend-heroku.herokuapp.com";

// axios.defaults.baseURL = "http://localhost:3030";

export const getAllQuizes = async () => {
  try {
    const response = await axios.get("/quiz");
    return response;
  } catch (error: any) {
    console.log("funktionen körs iaf :(");
    return error.response;
  }
};
