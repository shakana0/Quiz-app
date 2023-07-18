import { useEffect } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { Layout } from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./features/home/LandingPageView";
import { Home } from "./features/home/Home";
import { ProfileView } from "./features/profile/ProfileView";
import { SingleQuizView } from "./features/singleQuiz/SingleQuizView";
import { CreateQuiz } from "./features/quiz/CreateQuiz";

import { useNavigate } from "react-router-dom";
import useUserAuth from "./hooks/useUserAuth";

const App = () => {
  const navigate = useNavigate();
  const { activeUser } = useSelector((state: any) => state.auth);
  const { logInSuccess } = useUserAuth();

  useEffect(() => {
    if (!Object.keys(activeUser).length) {
      navigate("/");
    }
  }, [activeUser]);

  return (
    <>
      <Layout>
        <Routes>
          {logInSuccess ? (
            <Route>
              <Route path="/" element={<Home />} />
              <Route path="/single-quiz/:id" element={<SingleQuizView />} />
              <Route path="/profile" element={<ProfileView />} />
              <Route path="/create-quiz" element={<CreateQuiz />} />
            </Route>
          ) : (
            <Route path="/" element={<LandingPage />} />
          )}
        </Routes>
      </Layout>
    </>
  );
};

export default App;
