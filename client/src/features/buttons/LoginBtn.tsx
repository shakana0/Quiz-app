import React, { useState, useEffect } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  GoogleLogout,
} from "react-google-login";
import { setLogInSuccess, fetchUserGoogleLogin } from "../Modal/AuthSlice";
import { toggleModalState } from "../Modal/ModalSlice";
import { useDispatch } from "react-redux";
import { gapi } from "gapi-script";

export const GoogleLoginBtn = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [showLogout, setShowLogout] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: `${process.env.REACT_APP_CLIENT_ID}`,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const handleLogin = async (res: any) => {
    console.log("login success :)", res);
    setShowLogin(false);
    setShowLogout(true);
    const user = await dispatch(fetchUserGoogleLogin({ tokenId: res.tokenId }));
    if (user) {
      // dispatch(setLogInSuccess(true));
      // dispatch(toggleModalState({ showModal: false, modalType: "" }));
    }
  };
  const handleFailure = (
    res: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log("login failed", res);
    setShowLogin(true);
    setShowLogout(false);
  };

  const handleLogout = () => {
    console.log("you have been logged out successfully :)");
    dispatch(setLogInSuccess(false));
  };
  return (
    <>
      {showLogin ? (
        <GoogleLogin
          clientId={`${process.env.REACT_APP_CLIENT_ID}`}
          onSuccess={handleLogin}
          onFailure={handleFailure}
          cookiePolicy="single_host_origin"
          className={"google-btn"}
        >
          <button>
            <GoogleIcon className="google-icon" />
            <p>Log In With Google</p>
          </button>
        </GoogleLogin>
      ) : null}
      {showLogout ? (
        <GoogleLogout
          clientId={`${process.env.REACT_APP_CLIENT_ID}`}
          buttonText="Logout"
          onLogoutSuccess={handleLogout}
        ></GoogleLogout>
      ) : null}
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
