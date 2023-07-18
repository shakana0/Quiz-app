import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { useSelector } from "react-redux";
import CompleetedQuizCard from "../../quizAnswerCards/CompleetedQuizCard";
import Strings from "../../../utils/strings";

export const FlashCards = () => {
  const { currentQuiz } = useSelector((state: any) => state.quiz);
  const [isFlipped, setIsflipped] = useState(false);
  const [page, setPage] = useState(1);
  const handleClick = () => {
    setIsflipped(!isFlipped);
  };
  const renderCards = () => {
    if (currentQuiz.questions != null) {
      if (page > 1 || page <= currentQuiz.questions.length - 1) {
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
      if (page > currentQuiz.questions.length - 1) {
        return (
          <CompleetedQuizCard
            questions={currentQuiz.questions.length}
          />
        );
      }
    }
  };

  return (
    <div className="quiz-container">
      <>
        {renderCards()}
        <div className="pagination-btns">
          <button
            onClick={() => {
              if (page > 1) {
                setIsflipped(false);
                setTimeout(() => {
                  setPage((prev: number) => prev - 1);
                }, 200);
              }
            }}
          >
            {Strings.singleQuiz.buttons.back}
          </button>
          <button
            onClick={() => {
              if (
                page <= currentQuiz.questions.length - 1 ||
                page <= currentQuiz.questions.length - 1 + 1
              ) {
                setIsflipped(false);
                setTimeout(() => {
                  setPage((prev: number) => prev + 1);
                }, 200);
              }
            }}
          >
            {Strings.singleQuiz.buttons.next}
          </button>
        </div>
      </>
    </div>
  );
};
