import React from "react";
import { LandingPageStyling } from "../../components/styles/Profile.styled";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as api from "../../api/index";
import { QuizType } from "../../interface/quizType";
import { setLogInSuccess } from "../Modal/ModalSlice";
import { useNavigate } from "react-router-dom";


export const ProfileView = () => {
  const disptach = useDispatch()
  const navigate = useNavigate()
  const [allQuizes, setQuiz] = useState<QuizType[]>([]);

  useEffect(() => {
    const loadQuizes = async () => {
      const res = await api.getAllQuizes();
      setQuiz(res.data);
    };
    loadQuizes();
  }, []);

  return (
    <LandingPageStyling>
      <div className="nr1">
        <h2>Hello from Profile View!</h2>
        {allQuizes &&
          allQuizes.map((quiz, index: number) => (
            <li key={index}>{quiz.titel}</li>
          ))}
      </div>
      <div className="nr2">
        <button onClick={() =>{
          disptach(setLogInSuccess(false))
          navigate('/')
        }}>Log Out</button>
      </div>
      <div className="nr3"></div>
    </LandingPageStyling>
  );
};
