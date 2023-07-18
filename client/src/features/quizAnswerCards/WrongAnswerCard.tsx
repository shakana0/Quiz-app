import Strings from "../../utils/strings";

interface wrongAnswerProps {
  onContinue: () => void;
}

const WrongAnswerCard = ({ onContinue }: wrongAnswerProps) => {
  return (
    <article className="wrong">
      <span className="emoji">{Strings.singleQuiz.wrong.wrongEmoji}</span>
      <h2>{Strings.singleQuiz.wrong.wrong}</h2>
      <button onClick={onContinue}>
        {Strings.singleQuiz.buttons.continue}
      </button>
    </article>
  );
};

export default WrongAnswerCard;
