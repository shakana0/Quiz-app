import { useEffect } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  GoogleLogout,
} from "react-google-login";
import { setLogInSuccess, setAuthLogin } from "../Modal/AuthSlice";
import { toggleModalState } from "../Modal/ModalSlice";
import { useDispatch } from "react-redux";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router";
import {
  fetchUserGoogleLogin,
  logoutSocialMediaUser,
} from "../Modal/AsyncThunkFunctions";

export const GoogleLoginBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = JSON.parse(
    window.localStorage.getItem("authLoginState") || "false"
  );

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
    const user = await dispatch(fetchUserGoogleLogin({ tokenId: res.tokenId }));
    if (user) {
      dispatch(setLogInSuccess(true));
      dispatch(setAuthLogin({ google: true }));
      localStorage.setItem("isGoogleLogIn", JSON.stringify({ login: true }));
      dispatch(toggleModalState({ showModal: false, modalType: "" }));
    }
  };

  const handleFailure = (
    res: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log("login failed", res);
  };

  const handleLogout = () => {
    console.log("you have been logged out successfully :)");
    dispatch(logoutSocialMediaUser());
    dispatch(setLogInSuccess(false));
    dispatch(setAuthLogin({ google: false }));
    localStorage.setItem(
      "authLoginState",
      JSON.stringify({ isGoogleLogin: false })
    );
    localStorage.removeItem("isGoogleLogIn");
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

// export const {handleLogin} = GoogleLoginBtn()
