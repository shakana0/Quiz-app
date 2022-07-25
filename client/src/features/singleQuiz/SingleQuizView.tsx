import React, { useEffect, useState } from "react";
import { SingleQuizViewStyling } from "../../components/styles/SingleQuiz.styled";
import { useNavigate } from "react-router-dom";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import ReactCardFlip from "react-card-flip";

export const SingleQuizView = () => {
  const navigate = useNavigate();
  const { activeUser } = useSelector((state: any) => state.modal);
  const [currentQuiz, setCurrentQuiz] = useState<any>({});
  const { id }: any = useParams();
  const [isFlipped, setIsflipped] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let quiz: any = {};
    quiz = activeUser.quizes.filter((quiz: any) => quiz.id === id);
    setCurrentQuiz(quiz[0]);
  }, [id]);

  const handleClick = () => {
    setIsflipped(!isFlipped);
  };

  const renderCards = () => {
    if (currentQuiz.questions != null) {
      for (let question of currentQuiz.questions) {
        if (question.id === page) {
          return (
            <div className="card-container">
              <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
                <div className="front" onClick={handleClick}>
                  <h2>{question.term}</h2>
                </div>
                <div className="back" onClick={handleClick}>
                  <p>{question.definition}</p>
                </div>
              </ReactCardFlip>
            </div>
          );
        }
      }
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
          <button>Flashcards</button>
          <button>Write</button>
          <button>Match</button>
          <button>Test</button>
        </div>
        <div className="quiz-cintainer">
          {renderCards()}
          <div className="pagination-btns">
            <button
              onClick={() => {
                if (page > 1) {
                  setPage((prev: number) => prev - 1);
                }
                setIsflipped(false);
              }}
            >
              back
            </button>
            <button
              onClick={() => {
                if (page <= currentQuiz.questions.length - 1) {
                  setPage((prev: number) => prev + 1);
                }
                setIsflipped(false);
              }}
            >
              next
            </button>
          </div>
        </div>
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
