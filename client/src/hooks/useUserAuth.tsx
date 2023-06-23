import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCurrentUser,
  refreshCurrentUser,
  fetchCurrentGoogleUser,
  fetchCurrentFacebookUser,
} from "../features/Modal/AsyncThunkFunctions";
import { setQuizChange } from "../features/singleQuiz/QuizSlice";

const useUserAuth = () => {
  const { logInSuccess } = useSelector((state: any) => state.auth);
  const [firstRender, setFirstRender] = useState(true);
  const dispatch = useDispatch();
  const { quizChange } = useSelector((state: any) => state.quiz);

  useEffect(() => {
    //null check
    const isGoogleLogIn = JSON.parse(
      window.localStorage.getItem("isGoogleLogIn") || "{}"
    );
    const isFacebookLogIn = JSON.parse(
      window.localStorage.getItem("isFacebookLogIn") || "{}"
    );

    //fetching user on first render
    if (firstRender && !isGoogleLogIn.login && !isFacebookLogIn.login || quizChange && !isGoogleLogIn.login && !isFacebookLogIn.login) {
      setFirstRender(false);
      dispatch(fetchCurrentUser());
    }
    if (firstRender && isGoogleLogIn.login || quizChange && isGoogleLogIn.login) {
      setFirstRender(false);
      dispatch(fetchCurrentGoogleUser());
    }
    if (firstRender && isFacebookLogIn.login || quizChange && isFacebookLogIn.login) {
      setFirstRender(false);
      dispatch(fetchCurrentFacebookUser());
    }

    //refeshing current user
    let interval = setInterval(() => {
      if (isGoogleLogIn.login === false || isFacebookLogIn.login === false) {
        dispatch(refreshCurrentUser());
      }
    }, 20 * 60 * 1000); //20min

    dispatch(setQuizChange(false));

    return () => clearInterval(interval);
    
  }, [quizChange]);

  return { logInSuccess };
};

export default useUserAuth;
