import React, { useEffect, useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  GoogleLogout,
} from "react-google-login";
import {
  setLogInSuccess,
  fetchUserGoogleLogin,
  setAuthLogin,
} from "../Modal/AuthSlice";
import { toggleModalState } from "../Modal/ModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router";

export const GoogleLoginBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authLogin } = useSelector((state: any) => state.auth);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const authState = JSON.parse(window.localStorage.getItem("authLoginState") || 'false')


  useEffect(() => {
    function start() {
      gapi.auth2.init({
        clientId: `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const handleLogin = async (res: any) => {
    console.log("login success :)", res);
    const user = await dispatch(fetchUserGoogleLogin({ tokenId: res.tokenId }));
    if (user) {
      dispatch(setLogInSuccess(true));
      dispatch(setAuthLogin({google:true}));
      // dispatch(setAuthLogin(true));
      localStorage.setItem(
        "isGoogleLogIn",
        JSON.stringify({ login: true, token: '' })
      );
      dispatch(toggleModalState({ showModal: false, modalType: "" }));
      setIsSignedIn(true);
    }
  };
  const handleFailure = (
    res: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log("login failed", res);
  };

  const handleLogout = () => {
    console.log("you have been logged out successfully :)");
    dispatch(setLogInSuccess(false));
    dispatch(setAuthLogin({google:false}));
    // localStorage.clear();
    localStorage.setItem(
      "authLoginState",
      JSON.stringify({ isGoogleLogin: false })
    );
    localStorage.removeItem("isGoogleLogIn")
    setIsSignedIn(false);
    navigate("/");
  };
  return (
    <>
      {authState.isGoogleLogin ? (
        <GoogleLogout
          clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
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
          clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
          onSuccess={handleLogin}
          onFailure={handleFailure}
          cookiePolicy="single_host_origin"
          // isSignedIn={isSignedIn}
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

