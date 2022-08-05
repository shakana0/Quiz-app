import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
// import { QuestionType } from "../../../interface/quizType"

export const Match = () => {
  const { currentQuiz } = useSelector((state: any) => state.quiz);
  const [currIndex, setCurrIndex] = useState(1);
  const [points, setPoints] = useState(0);
  const [wrong, setWrong] = useState(false);
  const [quiz, setQuiz] = useState<any>([]);
  let currQuiz: any = [];

  const renderCurrentDefinition = () => {
    if (currentQuiz.questions.length) {
      currQuiz = currentQuiz.questions.filter(
        (question: any) => question.id === currIndex
      );
      if (wrong === true) {
        return (
          <article className="wrong">
            <span className="angry-emoji">😡</span>
            <h2>Wrong!</h2>
            <button
              onClick={() => {
                setWrong(false);
              }}
            >
              Continue
            </button>
          </article>
        );
      }
      if (
        currIndex <= currentQuiz.questions.length - 1 + 1 &&
        wrong === false
      ) {
        return (
          <>
            <section className="definition">
              <p>{currQuiz[0].definition}</p>
            </section>
            <section className="alternatives">
              <p>Choose mathcing term</p>
              {renderTerms()}
            </section>
          </>
        );
      } else {
        return (
          <article className="compleeted">
            <span className="smiling-emoji">😊</span>
            <h2>
              Good Job! You got {points}/
              {currentQuiz.questions && currentQuiz.questions.length} terms
              right.
            </h2>
          </article>
        );
      }
    }
  };

  const checkAnswer = (answer: string) => {
    if (currQuiz[0].term === answer) {
      setPoints((prev) => prev + 1);
    } else {
      setWrong(true);
    }
    setCurrIndex((prev) => prev + 1);
  };

  const renderTerms = () => {
    if (currentQuiz.questions.length) {
      return (
        <div className="btns-wrapper">
          {currentQuiz.questions.map((quiz: any, index: number) => (
            <button
              key={index}
              onClick={() => {
                checkAnswer(quiz.term);
              }}
            >
              {quiz.term}
            </button>
          ))}
        </div>
      );
    }
  };
  return <div className="match-container">{renderCurrentDefinition()}</div>;
};
