import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

export const Write = () => {
  const ref = useRef<HTMLInputElement>(null);
  const { currentQuiz } = useSelector((state: any) => state.quiz);
  const [guessedTerm, setGuessedTerm] = useState("");
  const [points, setPoints] = useState(0);
  const [index, setIndex] = useState(1);

  const renderDefinition = () => {
    if (currentQuiz.questions.length) {
      let quiz = [];
      quiz = currentQuiz.questions.filter(
        (question: any) => question.id === index
      );
      return (
        <section>
          <p>{quiz[0].definition}</p>
        </section>
      );
    }
  };
  const checkAnwser = () => {
    if (
      currentQuiz.questions.find(
        (term: any) => term.term.toLowerCase() === guessedTerm
        && index < currentQuiz.questions.length
      )
    ) {
      console.log("rätt :))");
      setPoints((prev) => prev + 1);
      setIndex((prev) => prev + 1);
      if (ref.current != null) {
        ref.current.value = "";
      }
      renderDefinition();
    } else {
      console.log("feeel :(");
    }
  };
  return (
    <div className="write-container">
      <>
        <p className="points">{points}</p>
        {renderDefinition()}
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
      </>
    </div>
  );
};
