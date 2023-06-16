import { QuizCardStyling } from "../../components/styles/QuizCard";

interface quizProps {
  quiz?: any;
}

export const QuizCard = ({ quiz }: quizProps) => {
  return (
    <QuizCardStyling>
      <div className="quiz-card-info">
        <h2>{quiz.titel}</h2>
        <p>{quiz.description}</p>
      </div>
    </QuizCardStyling>
  );
};
