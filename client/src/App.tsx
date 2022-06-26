import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import * as api from "./api/index";
import { QuizType } from "./interface/quizType";

const App = () => {
  const [allQuizes, setQuiz] = useState<QuizType[]>([]);

  useEffect(() => {
    const loadQuizes = async () => {
      const res = await api.getAllQuizes();
      setQuiz(res.data);
    };
    loadQuizes();
  }, []);
  return (
    <>
      <h1>Hello from APP</h1>
      {allQuizes &&
        allQuizes.map((quiz, index: number) => (
          <li key={index}>{quiz.titel}</li>
        ))}
    </>
  );
};

export default App;
