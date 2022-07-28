import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

export const Write = () => {
  const ref = useRef<HTMLInputElement>(null);
  const { currentQuiz } = useSelector((state: any) => state.quiz);
  const [guessedTerm, setGuessedTerm] = useState("");
  const [points, setPoints] = useState(0);
  const [index, setIndex] = useState(1);
  const [wrong, setWrong] = useState(false);
  let quiz: any = [];

  const renderDefinition = () => {
    if (currentQuiz.questions.length) {
      quiz = currentQuiz.questions.filter(
        (question: any) => question.id === index
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
      if (index <= currentQuiz.questions.length - 1 + 1 && wrong === false) {
        return (
          <div className="wrapper">
            <p className="points">{points}</p>
            <section>
              <p>{quiz[0].definition}</p>
            </section>
            <div>
              <input
                ref={ref}
                type="text"
                onChange={(event) => {
                  setGuessedTerm(event?.target.value);
                }}
              />
              <button onClick={checkAnwser}>Answer</button>
            </div>
          </div>
        );
      } else {
        return (
          <article className="compleeted">
            <span className="smiling-emoji">😊</span>
            <h2>
              Good Job! You got {points}/
              {currentQuiz.questions && currentQuiz.questions.length} terms right.
            </h2>
          </article>
        );
      }
    }
  };
  const checkAnwser = () => {
    if (guessedTerm !== "") {
      if (quiz[0].term.toLowerCase() === guessedTerm) {
        setPoints((prev) => prev + 1);
        setGuessedTerm("");
      } else {
        setWrong(true);
        console.log("feeel :(");
      }
      setIndex((prev) => prev + 1);
      if (ref.current != null) {
        ref.current.value = "";
      }
      renderDefinition();
    }
  };
  return <div className="write-container">{renderDefinition()}</div>;
};
