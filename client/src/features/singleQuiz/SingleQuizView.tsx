import React, { useEffect, useState } from "react";
import { SingleQuizViewStyling } from "../../components/styles/SingleQuiz.styled";
import { useNavigate } from "react-router-dom";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

export const SingleQuizView = () => {
  const navigate = useNavigate();
  const { activeUser } = useSelector((state: any) => state.modal);
  const [currentQuiz, setCurrentQuiz] = useState([]);
  const { id }: any = useParams();
  useEffect(() => {
    let quiz = [];
    quiz = activeUser.quizes.filter((quiz: any) => quiz.titel === id)
    setCurrentQuiz(quiz[0])
  }, []);

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
      {/* <h1>{currentQuiz.titel}</h1> */}
      <section className="game-board">
        <div className="quiz-btns">
          <p>Pick a study mode!</p>
          <button>Flashcards</button>
          <button>Write</button>
          <button>Match</button>
          <button>Test</button>
        </div>
        <article className="quiz">citronsyra</article>
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
