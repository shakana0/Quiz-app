import React, {useState} from "react";
import { QuizCardStyling } from "../../components/styles/QuizCard";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

interface quizProps {
  quiz?: any;
}

export const QuizCard = ({ quiz }: quizProps) => {
  return (
    <QuizCardStyling>
      <div className="icon-container">
        <DeleteOutlineOutlinedIcon className={"delete-icon"} />
      </div>
      <div className="quiz-card-info">
        <h2>{quiz.titel}</h2>
        <p>{quiz.description}</p>
      </div>
    </QuizCardStyling>
  );
};
