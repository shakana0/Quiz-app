import { HomeStyling } from "../../components/styles/Home.styled";
import { QuizList } from "../quiz/QuizList";

export const Home = () => {
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
      </section>
    </HomeStyling>
  );
};
