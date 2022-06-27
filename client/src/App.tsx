import React from "react";
import "./App.css";

import { Layout } from "./components/Layout";
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './features/home/LandingPageView';
import { ProfileView } from "./features/profile/ProfileView";
import { SingleQuizView } from "./features/singleQuiz/SingleQuizView";


const App = () => {


  return (
    <>
      <Layout>
      <Routes>
          <Route  path="/" element={<LandingPage />} />
          <Route path="/quiz/:id" element={<SingleQuizView />} />
          <Route path="/profile" element={<ProfileView />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
