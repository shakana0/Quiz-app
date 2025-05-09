import { useState } from "react";
import { useSelector } from "react-redux";
import CompleetedQuizCard from "../../quizAnswerCards/CompleetedQuizCard";
import Strings from "../../../utils/strings";
import WrongAnswerCard from "../../quizAnswerCards/WrongAnswerCard";
export const Match = () => {
  const { currentQuiz } = useSelector((state: any) => state.quiz);
  const [currIndex, setCurrIndex] = useState(1);
  const [points, setPoints] = useState(0);
  const [wrong, setWrong] = useState(false);
  let currQuiz: any = [];

  const renderCurrentDefinition = () => {
    if (currentQuiz.questions.length) {
      currQuiz = currentQuiz.questions.filter(
        (question: any) => question.id === currIndex
      );
      if (wrong === true) {
        return <WrongAnswerCard onContinue={() => setWrong(false)} />;
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
              <p>{Strings.singleQuiz.text.choose}</p>
              {renderTerms()}
            </section>
          </>
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

  const checkAnswer = (answer: string) => {
    if (currQuiz[0].term === answer) {
      setPoints((prev) => prev + 1);
    } else {
      setWrong(true);
    }
    setCurrIndex((prev) => prev + 1);
  };

  const renderTerms = () => {
    let allTerms = [];
    for (let question of currentQuiz.questions) {
      allTerms.push(question.term);
    }
    //shufflar hela arrayen
    for (let i = allTerms.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allTerms[i], allTerms[j]] = [allTerms[j], allTerms[i]];
    }

    let termsArr = [];
    termsArr = allTerms.filter((term) =>
      termsArr.length < 4 ? termsArr.push(term) : null
    );
    //checking  if the right term is not in array
    if (!termsArr.includes(currQuiz[0].term)) {
      termsArr.splice(Math.floor(Math.random() * termsArr.length), 1);
      termsArr.push(currQuiz[0].term);
    }

    if (currentQuiz.questions.length) {
      return (
        <div className="btns-wrapper">
          {termsArr.map((term: string, index: number) => (
            <button
              key={index}
              onClick={() => {
                checkAnswer(term);
              }}
            >
              {term}
            </button>
          ))}
        </div>
      );
    }
  };
  return <div className="match-container">{renderCurrentDefinition()}</div>;
};
