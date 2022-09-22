import React, { useEffect, useState } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { Layout } from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./features/home/LandingPageView";
import { Home } from "./features/home/Home";
import { ProfileView } from "./features/profile/ProfileView";
import { SingleQuizView } from "./features/singleQuiz/SingleQuizView";
import { CreateQuiz } from "./features/quiz/CreateQuiz";
import RequireAuth from "./hooks/RequireAuth";
import {
  fetchCurrentUser,
  refreshCurrentUser,
} from "./features/Modal/AuthSlice";

const App = () => {
  const { logInSuccess } = useSelector((state: any) => state.auth);
  const [firstRender, setFirstRender] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(!firstRender)
    if (firstRender) {
      setFirstRender(false)
      dispatch(fetchCurrentUser());
    }
    let interval = setInterval(() => {
      console.log('interval')
      dispatch(refreshCurrentUser());
    }, 1000 * 50);
    return () => clearInterval(interval)
  }, []);
  return (
    <>
      <Layout>
        <Routes>
          {/* {logInSuccess ? (
            <Route path="/" element={<Home />} />
          ) : (
            <Route path="/" element={<LandingPage />} />
          )} */}

          {/* <Route path="/quiz/:id" element={<SingleQuizView />} /> 
          ORIGINAL ROUTE
          */}
          <Route path="/" element={<LandingPage />} />
          <Route element={<RequireAuth />}>
            <Route path="/home" element={<Home />} />
            <Route path="/single-quiz/:id" element={<SingleQuizView />} />
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/create-quiz" element={<CreateQuiz />} />
          </Route>
        </Routes>
      </Layout>
    </>
  );
};

export default App;
