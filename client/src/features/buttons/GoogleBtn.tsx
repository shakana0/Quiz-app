import { useEffect } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  GoogleLogout,
} from "react-google-login";
import { setLogInSuccess } from "../Modal/AuthSlice";
import { toggleModalState } from "../Modal/ModalSlice";
import { useDispatch } from "react-redux";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router";
import {
  fetchUserGoogleLogin,
  logoutSocialMediaUser,
} from "../Modal/AsyncThunkFunctions";
import Strings from "../../utils/strings";

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
      dispatch(toggleModalState({ showModal: false, modalType: "" }));
    }
  };

  const handleFailure = (
    res: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log("login failed", res);
  };

  const handleLogout = () => {
    dispatch(logoutSocialMediaUser());
    dispatch(setLogInSuccess(false));
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
              {Strings.globalButtons.button.googleLogout}
            </button>
          )}
        ></GoogleLogout>
      ) : (
        <GoogleLogin
          clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
          onSuccess={handleLogin}
          onFailure={handleFailure}
          cookiePolicy="single_host_origin"
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <GoogleIcon className="google-icon" />
              <p> {Strings.globalButtons.button.googleLogIn}</p>
            </button>
          )}
        ></GoogleLogin>
      )}
    </>
  );
};
