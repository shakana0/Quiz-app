import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
// import FacebookLogin from "react-facebook-login";
import FacebookIcon from "@mui/icons-material/Facebook";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
// import Cookie from 'js-cookie'
import {
  fetchUserFacebookLogin,
  setLogInSuccess,
  setAuthLogin,
} from "../Modal/AuthSlice";
import { toggleModalState } from "../Modal/ModalSlice";
//extend the Window interface and turning off type checking
declare global {
  interface Window {
    FB: any;
    fbAsyncInit: any;
  }
}
export const FacebookLoginBtn = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authLogin } = useSelector((state: any) => state.auth);
  const authState = JSON.parse(
    window.localStorage.getItem("authLoginState") || "false"
  );

  let FB = window.FB;
  // window.fbAsyncInit = function () {
  //   FB.init({
  //     appId: `${process.env.REACT_APP_FACEBOOK_APP_ID}`,
  //     status: true, // check login status
  //     cookie: true, // enable cookies to allow the server to access the session
  //     xfbml: true, // parse XFBML
  //   });
  //   FB.Canvas.setAutoResize();
  // };

  const responseFacebook = async (res: any) => {
    console.log("login success :)", res);

    const user = await dispatch(
      fetchUserFacebookLogin({
        accessToken: res.accessToken,
        userId: res.userID,
      })
    );
    if (user) {
      dispatch(setLogInSuccess(true));
      dispatch(setAuthLogin({ facebook: true }));
      localStorage.setItem(
        "isFacebookLogIn",
        JSON.stringify({
          login: true,
          // accessToken: res.accessToken,
          userId: res.userID,
        })
      );
      dispatch(toggleModalState({ showModal: false, modalType: "" }));
      // setIsSignedIn(true);
    }
    // setIsSignedIn(true);
    // console.log(Cookie.get(), "Cookies");
  };

  const facebookLogout = () => {
    // console.log(Cookie.get(), "Cookies");

    window.fbAsyncInit = function () {
      FB.init({
        appId: `${process.env.REACT_APP_FACEBOOK_APP_ID}`,
        status: true, // check login status
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true, // parse XFBML
      });
    };

    dispatch(setAuthLogin({ facebook: false }));
    dispatch(setLogInSuccess(false));
    localStorage.setItem(
      "authLoginState",
      JSON.stringify({ isFacebookLogin: false })
    );
    localStorage.removeItem("isFacebookLogIn");
    localStorage.removeItem("fblst_482675157248713");
    setIsSignedIn(false);
    navigate("/");
  };

  return (
    <>
      {authState.isFacebookLogin ? (
        <button className="log-out-btn" onClick={facebookLogout}>
          Fb Log out
        </button>
      ) : (
        <FacebookLogin
          appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
          // autoLoad={true}
          fields="name,email,picture"
          // onClick={componentClicked}
          callback={responseFacebook}
          render={(renderProps) => (
            <button onClick={renderProps.onClick}>
              <FacebookIcon className="facebook-icon" />
              <p>Log In With Facebook</p>
            </button>
          )}
        />
      )}
    </>
  );
};

//https://www.youtube.com/watch?v=zQNPDRg_1Po
//on refresh förvinner statet för alla logout knappar
//efetrsom vi har tillgång till access token för både fb och google så kan dessa spara i cookies istället för localstorage.
//fixa alla errors i consolen

//https://stackoverflow.com/questions/32256967/how-do-i-use-fb-getloginstatus-on-page-load-if-parse-com-handles-init
