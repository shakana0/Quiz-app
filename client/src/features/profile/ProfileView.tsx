import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import * as api from "../../api/index";
import { QuizType } from "../../interface/quizType";

const LandingPageStyling = styled.div`
  background-color: aliceblue;
  .nr1{
    background-color: red;
    height: 60vh;
    width: 300px;
  }
  .nr2{
    background-color: orange;
    height: 60vh;
    width: 300px;
  }
  .nr3{
    background-color: #6fe16f;
    height: 60vh;
    width: 300px;
  }
  
`;

export const ProfileView = () => {
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
        <div className="nr1"></div>
        <div className="nr2"></div>
        <div className="nr3"></div>

      {/* <h1>Hello from Profile View!</h1>
      <h1>Hello from APP</h1>
      {allQuizes &&
        allQuizes.map((quiz, index: number) => (
          <li key={index}>{quiz.titel}</li>
        ))} */}
    </LandingPageStyling>
  );
};
