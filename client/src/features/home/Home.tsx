import { useState } from "react";
import { HomeStyling } from "../../components/styles/Home.styled";
import { QuizList } from "../quiz/QuizList";
import SnackBar from "../snackBar/snackBar";
import { useSelector } from "react-redux";

export const Home = () => {
  const { deletedQuiz } = useSelector((state: any) => state.quiz);
  const [deletedQuizSuccess, setDeletedQuizSuccess] = useState<boolean>(!!deletedQuiz.status);

  // const resetDeletedQuiz = () =>{
  //   dispatch(setDeletedQuiz({msg: "", status: ""}))
  // }

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
          bgColor={deletedQuiz.status > 201 ? "error" : "success"}
          onCancel={() => setDeletedQuizSuccess(false)}

        />
      </section>
    </HomeStyling>
  );
};
