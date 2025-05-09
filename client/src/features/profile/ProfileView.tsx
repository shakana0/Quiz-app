import { ProfileViewStyling } from "../../components/styles/Profile.styled";
import { useDispatch } from "react-redux";
import { resetErrorMsgs, setLogInSuccess } from "../Modal/AuthSlice";
import { AuthBtn } from "../buttons/AuthBtn";
import { useSelector } from "react-redux";
import { QuizList } from "../quiz/QuizList";
import { useNavigate } from "react-router";
import { GoogleLoginBtn } from "../buttons/GoogleBtn";
import { FacebookLoginBtn } from "../buttons/FacebookBtn";
import { logoutUser } from "../Modal/AsyncThunkFunctions";
import Strings from "../../utils/strings";

export const ProfileView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { activeUser } = useSelector((state: any) => state.auth);
  const authState = JSON.parse(
    window.localStorage.getItem("authLoginState") || "{}"
  );

  return (
    <ProfileViewStyling>
      <section className="profile">
        {authState.isGoogleLogin ? (
          <GoogleLoginBtn />
        ) : authState.isFacebookLogin ? (
          <FacebookLoginBtn />
        ) : (
          <button
            className="log-out-btn"
            onClick={() => {
              dispatch(logoutUser());
              dispatch(resetErrorMsgs());
              dispatch(setLogInSuccess(false));
              navigate("/");
            }}
          >
            {Strings.globalButtons.button.authLogOut}
          </button>
        )}
        <section className="profile-info">
          <div>
            <div className="circle"></div>
            <h1>{activeUser.userName}</h1>
          </div>
          <img
            src={require("../../assets/img/astronaut-reading2.png")}
            alt="astronaut reading books"
            width={350}
            height={360}
          />
        </section>
      </section>
      <QuizList />
      <AuthBtn
        className="create-btn"
        variant="tertiary"
        isFullWidth={true}
        btnText="Create"
        onClick={() => {
          navigate("/create-quiz");
        }}
      />
    </ProfileViewStyling>
  );
};
