import React from "react";
import { QuizCardStyling } from "../../components/styles/QuizCard";
import { QuizType } from "../../interface/quizType";

interface quizProps {
  quiz?: any;
}

export const QuizCard = ({ quiz }: quizProps) => {
  return (
    <QuizCardStyling >
      <h2>{quiz.titel}</h2>
      <p>{quiz.description}</p>
    </QuizCardStyling>
  );
};
