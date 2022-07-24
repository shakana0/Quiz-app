import React, { useState, useEffect } from "react";
import { ProfileViewStyling } from "../../components/styles/Profile.styled";
import { useDispatch } from "react-redux";
import * as api from "../../api/quizApi";
import { setLogInSuccess } from "../Modal/ModalSlice";
import { useNavigate } from "react-router-dom";
import { AuthBtn } from "../buttons/AuthBtn";
import { useSelector } from "react-redux";

export const ProfileView = () => {
  const disptach = useDispatch();
  const navigate = useNavigate();
  const { activeUser } = useSelector((state: any) => state.modal);
  // console.log(activeUser, 'profile')
 
  // const [allQuizes, setQuiz] = useState<QuizType[]>([]);

  // useEffect(() => {
  //   const loadQuizes = async () => {
  //     const res = await api.getAllQuizes();
  //     setQuiz(res.data);
  //   };
  //   loadQuizes();
  // }, []);

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
      <section className="list">
        <button onClick={(()=>{
          navigate('/single-quiz')
        })}>Single Quiz</button>
      </section>
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
