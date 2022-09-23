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

const App = () => {
  const { logInSuccess } = useSelector((state: any) => state.auth);
  const [firstRender, setFirstRender] = useState(true);
  const dispatch = useDispatch();
  const [user, setUser] = useState(false);
  // const appContext = useAuth();
  useEffect(() => {
    const currUser: any = localStorage.getItem("isLoggedIn");
    setUser(currUser)
    // user && JSON.parse(currUser) ? setUser(true) : setUser(false)
    console.log( currUser, 'curruser')
    console.log(user, 'user')
  }, [user]);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      dispatch(fetchCurrentUser());
      // appContext.setAuth(activeUser);
    }
    // localStorage.setItem("isLoggedIn", logInSuccess);

    console.log(user, 'user')


    let interval = setInterval(() => {
      dispatch(refreshCurrentUser());
    }, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [logInSuccess]);

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

          {/* <Route path="/" element={<LandingPage />} />
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
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
