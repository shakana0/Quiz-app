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
  const [userStatus, setUserStatus] = useState<Number>(0);
  const authLoginState = JSON.parse( window.localStorage.getItem("authLoginState") || "{}");

  useEffect(() => {

    const getCurrentUsers = async () => {
      //fetching user on first render or when quizlist is updated
      const isSocialMediaLogin = (authLoginState.isGoogleLogin || authLoginState.isFacebookLogin)
        
      if (
        ((firstRender && !isSocialMediaLogin) || (quizChange && !isSocialMediaLogin)) 
      ) {
        setFirstRender(false);
        const userRes = await dispatch(fetchCurrentUser());
        setUserStatus(userRes?.payload?.status);
      }
      if (
        (firstRender && authLoginState.isGoogleLogin) ||
        (quizChange && authLoginState.isGoogleLogin)
      ) {
        setFirstRender(false);
        const googleUserRes = await dispatch(fetchCurrentGoogleUser());
        setUserStatus(googleUserRes?.payload?.status);
      }
      if (
        (firstRender && authLoginState.isFacebookLogin) ||
        (quizChange && authLoginState.isFacebookLogin)
      ) {
        setFirstRender(false);
        const fbUserRes = await dispatch(fetchCurrentFacebookUser());
        setUserStatus(fbUserRes?.payload?.status);
      }

      //refeshing current user
      let interval = setInterval(() => {
        if (!isSocialMediaLogin) {
          dispatch(refreshCurrentUser());
        }
      }, 20 * 60 * 1000); //20min

      dispatch(setQuizChange(false));

      return () => clearInterval(interval);
    };

    getCurrentUsers();
  }, [quizChange]);

  return { logInSuccess, userStatus };
};

export default useUserAuth;
