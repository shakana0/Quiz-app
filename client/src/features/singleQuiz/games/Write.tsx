import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import CompleetedQuizCard from "../../quizAnswerCards/CompleetedQuizCard";
import WrongAnswerCard from "../../quizAnswerCards/WrongAnswerCard";

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
        return <WrongAnswerCard onContinue={() => setWrong(false)} />;
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
          <CompleetedQuizCard
            points={points}
            questions={currentQuiz.questions.length}
          />
        );
      }
    }
  };
  const checkAnwser = () => {
    if (guessedTerm !== "") {
      if (quiz[0].term.toLowerCase() === guessedTerm.toLowerCase()) {
        setPoints((prev) => prev + 1);
        setGuessedTerm("");
      } else {
        setWrong(true);
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
