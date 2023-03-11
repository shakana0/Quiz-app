import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCurrentUser,
  refreshCurrentUser,
  //   fetchUserGoogleLogin,
  //   fetchUserFacebookLogin,
  fetchCurrentGoogleUser,
  fetchCurrentFacebookUser,
} from "../features/Modal/AsyncThunkFunctions";

const useUserAuth = () => {
  const { logInSuccess, authLogin } = useSelector((state: any) => state.auth);
  const [firstRender, setFirstRender] = useState(true);
  const dispatch = useDispatch();
  console.log("useUserAuth was called :)");

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
      console.log("refreshing google login");
      dispatch(fetchCurrentGoogleUser());
      //   dispatch(fetchUserGoogleLogin({ tokenId: isGoogleLogIn.token }));
    }
    // if (firstRender && !isFacebookLogIn.login) {
    //   setFirstRender(false);
    //   dispatch(fetchCurrentUser());
    // }
    if (firstRender && isFacebookLogIn.login) {
      setFirstRender(false);
      console.log("refreshing facebook login ");
      dispatch(fetchCurrentFacebookUser());
    }

    //refeshing current user
    let interval = setInterval(() => {
      //vet inte om det behövs
      if (authLogin.isGoogleLogin) {
        // dispatch(fetchUserGoogleLogin({ tokenId: isGoogleLogIn.token }));
      } else {
        dispatch(refreshCurrentUser());
      }
      console.log("refreshing :)");
    }, 10 * 60 * 3000);
    return () => clearInterval(interval);
  }, []);

  return { logInSuccess };
};

export default useUserAuth;
