import React from "react";
import { ProfileViewStyling } from "../../components/styles/Profile.styled";
import { useDispatch } from "react-redux";
import { setLogInSuccess, resetErrorMsgs } from "../Modal/AuthSlice";
import { AuthBtn } from "../buttons/AuthBtn";
import { useSelector } from "react-redux";
import { QuizList } from "../quiz/QuizList";
import { useNavigate } from "react-router";
import { logoutUser } from "../Modal/AuthSlice";
import { GoogleLoginBtn } from "../buttons/GoogleBtn";
import { FacebookLoginBtn } from "../buttons/FacebookBtn";

export const ProfileView = () => {
  const navigate = useNavigate();
  const disptach = useDispatch();
  const { activeUser, authLogin } = useSelector((state: any) => state.auth);
  const authState = JSON.parse(window.localStorage.getItem("authLoginState") || "{")
  console.log(authState, 'authstate')

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
              // localStorage.removeItem("accessToken")
              // disptach(setLogInSuccess(false));
              disptach(logoutUser());
              disptach(resetErrorMsgs());
              navigate("/");
            }}
          >
            Log Out
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
