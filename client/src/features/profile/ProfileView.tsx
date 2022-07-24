import React from "react";
import { ProfileViewStyling } from "../../components/styles/Profile.styled";
import { useDispatch } from "react-redux";
import { setLogInSuccess } from "../Modal/ModalSlice";
import { AuthBtn } from "../buttons/AuthBtn";
import { useSelector } from "react-redux";
import { QuizList } from "../quiz/QuizList"
import { useNavigate } from "react-router";

export const ProfileView = () => {
  const navigate = useNavigate();
  const disptach = useDispatch();
  const { activeUser } = useSelector((state: any) => state.modal);
  return (
    <ProfileViewStyling>
      <section className="profile">
        <button
          className="log-out-btn"
          onClick={() => {
            disptach(setLogInSuccess(false));
            navigate("/");
          }}
        >
          Log Out
        </button>

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
      <QuizList/>
      <AuthBtn
        className="create-btn"
        variant="tertiary"
        isFullWidth={true}
        btnText="Create"
        onClick={(() =>{
          navigate('/create-quiz')
        })}
      />
    </ProfileViewStyling>
  );
};
