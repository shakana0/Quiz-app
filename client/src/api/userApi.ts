import axios from "axios";
axios.defaults.baseURL = "https://quiz-app-backend-heroku.herokuapp.com";
// axios.defaults.baseURL = "http://localhost:3030";



export const postUser = async (user: object) => {
    console.log('vi är i api')
  try {
    const postedUser = await axios.post("/user", user);
    console.log(postedUser)
    return postedUser;
  } catch (error: any) {
    console.log("funktionen körs iaf :(", user);
    return error.response;
  }
};
