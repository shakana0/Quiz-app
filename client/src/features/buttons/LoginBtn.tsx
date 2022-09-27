import React, { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  GoogleLogout,
} from "react-google-login";

export const GoogleLoginBtn = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [showLogout, setShowLogout] = useState(false);

  const handleLogin = async (
    res: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log("login success :)", res);
    setShowLogin(false);
    setShowLogout(true);

    // if ("accessToken" in res) {
    //   console.log(res.accessToken);
    // } else {
    //   console.log("offline");
    // }
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
  };
  return (
    <>
      {showLogin ? (
        <GoogleLogin
          clientId={`${process.env.REACT_APP_CLIENT_ID}`}
          onSuccess={handleLogin}
          onFailure={handleFailure}
          cookiePolicy="single_host_origin"
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

//https://www.youtube.com/watch?v=bf-vfhgWtKg