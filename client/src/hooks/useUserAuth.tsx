import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCurrentUser,
  refreshCurrentUser,
  fetchCurrentGoogleUser,
  fetchCurrentFacebookUser,
  fetchUserFacebookLogin,
  fetchUserGoogleLogin,
} from "../features/Modal/AsyncThunkFunctions";

const useUserAuth = () => {
  const { logInSuccess } = useSelector((state: any) => state.auth);
  const [firstRender, setFirstRender] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    //null check
    const isGoogleLogIn = JSON.parse(
      window.localStorage.getItem("isGoogleLogIn") || "{}"
    );
    const isFacebookLogIn = JSON.parse(
      window.localStorage.getItem("isFacebookLogIn") || "{}"
    );

    //fetching user on first render
    if (firstRender && !isGoogleLogIn.login && !isFacebookLogIn.login) {
      setFirstRender(false);
      dispatch(fetchCurrentUser());
    }
    if (firstRender && isGoogleLogIn.login) {
      setFirstRender(false);
      dispatch(fetchCurrentGoogleUser());
    }
    if (firstRender && isFacebookLogIn.login) {
      setFirstRender(false);
      dispatch(fetchCurrentFacebookUser());
    }

    //refeshing current user
    let interval = setInterval(() => {
      if (isFacebookLogIn.login) {
        dispatch(fetchUserGoogleLogin());
      }
      if (isGoogleLogIn.login) {
        dispatch(fetchUserGoogleLogin());
      }
      dispatch(refreshCurrentUser());
    }, 20 * 60 * 1000); //20min
    return () => clearInterval(interval);
  }, []);

  return { logInSuccess };
};

export default useUserAuth;
