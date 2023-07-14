import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import FacebookIcon from "@mui/icons-material/Facebook";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { setLogInSuccess } from "../Modal/AuthSlice";
import { toggleModalState } from "../Modal/ModalSlice";
import {
  fetchUserFacebookLogin,
  logoutSocialMediaUser,
} from "../Modal/AsyncThunkFunctions";
//extend the Window interface and turning off type checking
declare global {
  interface Window {
    FB: any;
    fbAsyncInit: any;
  }
}
export const FacebookLoginBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = JSON.parse(
    window.localStorage.getItem("authLoginState") || "false"
  );

  let FB = window.FB;
  const responseFacebook = async (res: any) => {
    // console.log(res.accessToken)
    const user = await dispatch(
      fetchUserFacebookLogin({
        accessToken: res.accessToken,
        userId: res.userID,
      })
    );
    if (user) {
      dispatch(setLogInSuccess(true));
      dispatch(toggleModalState({ showModal: false, modalType: "" }));
    }
  };

  const facebookLogout = () => {
    dispatch(logoutSocialMediaUser());
    window.fbAsyncInit = function () {
      FB.init({
        appId: `${process.env.REACT_APP_FACEBOOK_APP_ID}`,
        status: true, // check login status
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true, // parse XFBML
      });
    };
    dispatch(setLogInSuccess(false));
    localStorage.setItem(
      "authLoginState",
      JSON.stringify({ isFacebookLogin: false })
    );
    localStorage.removeItem("isFacebookLogIn");
    localStorage.removeItem("fblst_482675157248713");
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
          fields="name,email,picture"
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
//https://stackoverflow.com/questions/32256967/how-do-i-use-fb-getloginstatus-on-page-load-if-parse-com-handles-init
