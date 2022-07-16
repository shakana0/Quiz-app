import React from "react";
import "./App.css";
// import { ThemeProvider } from "styled-components";
// import { Theme } from "./components/styles/Theme.styled"
import { useSelector } from "react-redux";
import { Layout } from "./components/styles/Layout";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./features/home/LandingPageView";
import { Home } from "./features/home/Home";
import { ProfileView } from "./features/profile/ProfileView";
// import { SingleQuizView } from "./features/singleQuiz/SingleQuizView";
import { CreateQuiz } from "./features/quiz/CreateQuiz";

const App = () => {
  const { logInSuccess } = useSelector((state: any) => state.modal);
  return (
    // <ThemeProvider theme={Theme}>
    <>
      <Layout>
        <Routes>
          {logInSuccess ? (
            <Route path="/" element={<Home />} />
          ) : (
            <Route path="/" element={<LandingPage />} />
          )}
          {/* <Route path="/quiz/:id" element={<SingleQuizView />} /> */}
          <Route path="/profile" element={<ProfileView />} />
          <Route path="/create-quiz" element={<CreateQuiz />} />

        </Routes>
      </Layout>
    </>
    // </ThemeProvider>
  );
};

export default App;
