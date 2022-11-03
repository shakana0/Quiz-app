import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import FacebookLogin from "react-facebook-login";
import {
  fetchUserGoogleLogin,
  fetchUserFacebookLogin,
  setLogInSuccess,
  setAuthLogin,
} from "../Modal/AuthSlice";
import { toggleModalState } from "../Modal/ModalSlice";
//extend the Window interface and turning off type checking
declare global {
  interface Window {
    FB: any;
  }
}
export const FacebookLoginBtn = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authLogin } = useSelector((state: any) => state.auth);
  const authState = JSON.parse(window.localStorage.getItem("authLoginState") || 'false')


  let FB = window.FB;

  const responseFacebook = async (res: any) => {
    // console.log(res);
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
        JSON.stringify({ login: true, accessToken: res.accessToken, userId: res.userID })
      );
      dispatch(toggleModalState({ showModal: false, modalType: "" }));
      // setIsSignedIn(true);
    }
    // setIsSignedIn(true);
  };

  const facebookLogout = () => {
    //doesnt work on refresh
    FB.getLoginStatus(function (response: any) {
      console.log(response, "responsee fbb");
      FB.logout(function (response: any) {
        console.log("user is now logged out :)");
      });
    });
    dispatch(setAuthLogin({ facebook: false }));
    // localStorage.clear();
    dispatch(setLogInSuccess(false));
    localStorage.setItem(
      "authLoginState",
      JSON.stringify({ isFacebookLogin: false })
    );
    localStorage.removeItem("isFacebookLogIn")
    setIsSignedIn(false);
    navigate("/");

    // setIsSignedIn(false);
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
