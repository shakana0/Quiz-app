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
// import useAuth from "./hooks/userAuth";
import { useNavigate } from "react-router-dom";
import Google from "@mui/icons-material/Google";
const App = () => {
  const navigate = useNavigate();
  const { logInSuccess } = useSelector((state: any) => state.auth);
  const [firstRender, setFirstRender] = useState(true);
  const dispatch = useDispatch();
  const [user, setUser] = useState(false);
  // const appContext = useAuth();

  // console.log(user, "user");

  useEffect(() => {
    // user && JSON.parse(currUser) ? setUser(true) : setUser(false)
    // const currUser = JSON.parse(
    //   localStorage.getItem("isLoggedIn") || "false"
    // );
    const currUser = window.localStorage.getItem("isLoggedIn");
    if (currUser !== null) {
      // console.log(currUser, "curruser");
      setUser(JSON.parse(currUser));
    }
    // console.log(user, 'user')
  }, []);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      // localStorage.clear();
      dispatch(fetchCurrentUser());
      // appContext.setAuth(activeUser);
    }
    let interval = setInterval(() => {
      dispatch(refreshCurrentUser());
      console.log('refreshing :)')
    }, 10 * 60 * 1000);
    // if (logInSuccess === false) {
    //   navigate("/");
    // }
    return () => clearInterval(interval);
  }, []);

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

          {/* <Route path="/quiz/:id" element={<SingleQuizView />} /> 
          ORIGINAL ROUTE
          */}
          {/* 
          <Route path="/" element={<LandingPage />} />
          <Route element={<RequireAuth />}>
            <Route path="/home" element={<Home />} />
            <Route path="/single-quiz/:id" element={<SingleQuizView />} />
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/create-quiz" element={<CreateQuiz />} />
          </Route> */}
        </Routes>
      </Layout>
    </>
  );
};

export default App;
