import React, { useEffect } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  GoogleLogout,
} from "react-google-login";
import { setLogInSuccess, fetchUserGoogleLogin, setAuthLogin } from "../Modal/AuthSlice";
import { toggleModalState } from "../Modal/ModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router";


export const GoogleLoginBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { authLogin } = useSelector((state: any) => state.auth);

  useEffect(() => {
    function start() {
      gapi.auth2.init({
        clientId: `${process.env.REACT_APP_CLIENT_ID}`,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  /*
  HA EN USEEFFECT SOM LADDAR IN ANVÄNADRE LÖPANDE
  */
  const handleLogin = async (res: any) => {
    console.log("login success :)", res);
    const user = await dispatch(fetchUserGoogleLogin({ tokenId: res.tokenId }));
    if (user) {
      dispatch(setLogInSuccess(true))
      dispatch(setAuthLogin(true))
      dispatch(toggleModalState({ showModal: false, modalType: "" }));
    }
  };
  const handleFailure = (
    res: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log("login failed", res);
  };

  const handleLogout = () => {
    console.log("you have been logged out successfully :)")
    dispatch(setLogInSuccess(false))
    dispatch(setAuthLogin(false))
    navigate("/")
  };
  return (
    <>
      {authLogin.isGoogleLogin ? (
        <GoogleLogout
          clientId={`${process.env.REACT_APP_CLIENT_ID}`}
          onLogoutSuccess={handleLogout}
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className="log-out-btn"
            >
              G Log Out
            </button>
          )}
        ></GoogleLogout>
      ) : (
        <GoogleLogin
          clientId={`${process.env.REACT_APP_CLIENT_ID}`}
          onSuccess={handleLogin}
          onFailure={handleFailure}
          cookiePolicy="single_host_origin"
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <GoogleIcon className="google-icon" />
              <p>Log In With Google</p>
            </button>
          )}
        ></GoogleLogin>
      )}
    </>
  );
};

//https://www.youtube.com/watch?v=75aTZq-qoZk
//https://www.youtube.com/watch?v=LA16VCpUido
//google login in and mongodb
//https://towardsdatascience.com/tutorial-mongodb-user-authentication-with-google-sign-in-fcc13076799f

// 1. skapa en api request som skickar datan till en route i backend const loginWGoogle
/* 2. i backend har vi först vår route, router.post("URL", Auth.signup_post, Auth.login_post) =>
Auth.signup_post: om email eller userName existerar => (error) , annars skapa modell m jwt o allt.
Auth.login_post: om använadre exiterar login
*/
