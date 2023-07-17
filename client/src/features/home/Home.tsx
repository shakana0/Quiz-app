import { useState } from "react";
import { HomeStyling } from "../../components/styles/Home.styled";
import { QuizList } from "../quiz/QuizList";
import SnackBar from "../snackBar/snackBar";
import { useDispatch, useSelector } from "react-redux";
import { setDeletedQuiz } from "../singleQuiz/QuizSlice";

export const Home = () => {
  const dispatch = useDispatch();
  const { deletedQuiz } = useSelector((state: any) => state.quiz);
  const [deletedQuizSuccess, setDeletedQuizSuccess] = useState<boolean>(
    !!deletedQuiz.status
  );
  const error = deletedQuiz.status > 201;
  const handleOnCancel = () => {
    setDeletedQuizSuccess(false);
    dispatch(setDeletedQuiz({ msg: "", status: "" }));
  };

  return (
    <HomeStyling>
      <div className="hero-img">
        <div className="overlay">
          <h1>HOME</h1>
        </div>
        <img
          src={require("../../assets/img/astronaut-hanging-ship.png")}
          alt="astronaut on computer"
          width={390}
          height={400}
        />
      </div>
      <section>
        <h1 className="recent-header">Recent</h1>
        <QuizList />
        <SnackBar
          open={deletedQuizSuccess}
          msg={deletedQuiz.msg}
          bgColor={error ? "error" : "success"}
          onCancel={() => handleOnCancel()}
        />
      </section>
    </HomeStyling>
  );
};
