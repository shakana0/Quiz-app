import React, { useEffect, useState } from "react";
import { QuizListStyling } from "../../components/styles/QuizList.styled";
import { QuizCard } from "./QuizCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const QuizList = () => {
  const { activeUser } = useSelector((state: any) => state.modal);
  const [allQuizes, setAllQuizes] = useState([]);
  useEffect(() => {
    setAllQuizes(activeUser.quizes);
  }, []);
  return (
    <QuizListStyling>
      {allQuizes.map((quiz: any, index) => (
        //ändra :id till ett rikitgt id som generaras för varje quiz ***********
        <Link to={`/single-quiz/${quiz.id}`} key={index}>
          <QuizCard quiz={quiz} />
        </Link>
      ))}
    </QuizListStyling>
  );
};
