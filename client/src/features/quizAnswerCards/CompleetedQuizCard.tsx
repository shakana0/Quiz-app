import Strings from "../../utils/strings";

interface compleetedQuizProps {
  points?: number;
  questions: number;
}

const CompleetedQuizCard = ({ points, questions }: compleetedQuizProps) => {
  const rightAnswers = !!points || points === 0 ? (points / questions) : 0.5;
  const currentCompleetedQuizMsg =
    rightAnswers < 0.5
      ? Strings.singleQuiz.completedQuizMsg.bad
      : rightAnswers >= 0.5 && rightAnswers < 1
      ? Strings.singleQuiz.completedQuizMsg.ok
      : Strings.singleQuiz.completedQuizMsg.good;

  return (
    <article className="compleeted">
      <span className="emoji">{currentCompleetedQuizMsg.emoji}</span>
      <h1>{currentCompleetedQuizMsg.msg}</h1>
      {typeof points === 'number' ? (
        <h2>
          {Strings.singleQuiz.text.youGot} {points}/{questions}
          {Strings.singleQuiz.text.termsRight}
        </h2>
      ) : (
        <h2>
          {Strings.singleQuiz.flashCards.compleeted} {questions}
          {Strings.singleQuiz.flashCards.terms}
        </h2>
      )}
    </article>
  );
};

export default CompleetedQuizCard;
