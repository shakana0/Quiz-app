import { useState } from "react";
import { HomeStyling } from "../../components/styles/Home.styled";
import { QuizList } from "../quiz/QuizList";
import SnackBar from "../snackBar/snackBar";
import { useDispatch, useSelector } from "react-redux";
import { setQuizInfo } from "../singleQuiz/QuizSlice";
import Strings from "../../utils/strings";

export const Home = () => {
  const dispatch = useDispatch();
  const { quizInfo } = useSelector((state: any) => state.quiz);
  const [deletedQuizSuccess, setDeletedQuizSuccess] = useState<boolean>(
    !!quizInfo.status
  );
  const error = quizInfo.status > 201;
  const handleOnCancel = () => {
    setDeletedQuizSuccess(false);
    dispatch(setQuizInfo({ msg: "", status: "" }));
  };

  return (
    <HomeStyling>
      <div className="hero-img">
        <div className="overlay">
          <h1>{Strings.home.pageHader.toUpperCase()}</h1>
        </div>
        <img
          src={require("../../assets/img/astronaut-hanging-ship.png")}
          alt="astronaut on computer"
          width={390}
          height={400}
        />
      </div>
      <section>
        <h1 className="recent-header">{Strings.home.recent}</h1>
        <QuizList />
        <SnackBar
          open={deletedQuizSuccess}
          msg={quizInfo.msg}
          bgColor={error ? "error" : "success"}
          onCancel={() => handleOnCancel()}
        />
      </section>
    </HomeStyling>
  );
};
