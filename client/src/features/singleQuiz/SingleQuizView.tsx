import React, { useEffect, useState } from "react";
import { SingleQuizViewStyling } from "../../components/styles/SingleQuiz.styled";
import { useNavigate } from "react-router-dom";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { setCurrentQuiz } from "./QuizSlice";
import { FlashCards } from "./games/FlashCards";
import { Write } from "./games/Write";
import { Match } from "./games/Match";


export const SingleQuizView = () => {
  const disptach = useDispatch();
  const navigate = useNavigate();
  const { currentQuiz } = useSelector((state: any) => state.quiz);
  const { activeUser } = useSelector((state: any) => state.modal);
  const { id }: any = useParams();
  const [currentGame, setCurrentGame] = useState("");

  useEffect(() => {
    let quiz: any = {};
    if (activeUser.quizes != null) {
      quiz = activeUser.quizes.filter((quiz: any) => quiz.id === id);
      disptach(setCurrentQuiz(quiz[0]));
    }
  }, []);

  const renderQuiz = () => {
    if (currentGame === "FlashCards") {
      return <FlashCards />;
    }
    if (currentGame === "Write") {
      return <Write />;
    }if (currentGame === "Match") {
      return <Match />;
    }else {
      return <FlashCards />;
    }
  };

  return (
    <SingleQuizViewStyling>
      <button
        className="back-btn"
        onClick={() => {
          navigate("/profile");
        }}
      >
        <ArrowBackIosRoundedIcon className="back-icon" />
        <h3>Back</h3>
      </button>
      <h1>{currentQuiz.titel}</h1>
      <p className="description">{currentQuiz.description}</p>
      <section className="game-board">
        <div className="quiz-btns">
          <p>Pick a study mode!</p>
          <button
            onClick={() => {
              setCurrentGame("Flashcards");
            }}
          >
            Flashcards
          </button>
          <button
            onClick={() => {
              setCurrentGame("Write");
            }}
          >
            Write
          </button>
          <button
            onClick={() => {
              setCurrentGame("Match");
            }}
          >
            Match
          </button>
        </div>
        {renderQuiz()}
      </section>
      <img
        src={require("../../assets/img/astronaut-going-up.png")}
        alt="astronaut going up with a balloon"
        width={350}
        height={360}
      />
    </SingleQuizViewStyling>
  );
};
