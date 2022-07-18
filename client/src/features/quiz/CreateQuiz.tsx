import React, { useState, useEffect } from "react";
import { CreateQuizStyling } from "../../components/styles/CreateQuiz.styled";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import { AuthBtn } from "../buttons/AuthBtn";
import { QuizType } from "../../interface/quizType";
import { current } from "@reduxjs/toolkit";

export const CreateQuiz = () => {
  const [counter, setCounter] = useState(2); //ful-hack
  const [quizCardList, setQuizCardList] = useState<number[]>([1]);
  const initialQuestionsState = {
    id: 1,
    term: "",
    definition: "",
  };
  const initialQuizState: any = {
    titel: "",
    description: "",
    questions: [],
  };
  const [questions, setQuestions] = useState<any[]>([initialQuestionsState]);
  const [quiz, setQuiz] = useState(initialQuizState);

  const deleteCard = (currentCardNum: number) => {
    let updatedCardList = quizCardList.filter(
      (cardNum) => cardNum != currentCardNum
    );
    let updatedQuestions = questions.filter((question) =>
      updatedCardList.find((cardNum) => cardNum === question.id)
    );
    setQuestions([...updatedQuestions]);
    setQuizCardList([...updatedCardList]);
  };
  const addQuestions = () => {
    questions.push({ id: counter, term: "", definition: "" });
  };
  // console.log(questions);
  const [errors, setErrors] = useState();
  const validateForm = () => {};

  console.log(quiz, "this is quiz");
  return (
    <CreateQuizStyling>
      <form
        action=""
        onClick={(event) => {
          event.preventDefault();
        }}
      >
        <section className="quiz-info">
          <div>
            <h1>Create a new quiz</h1>
            <input
              type="text"
              placeholder="Enter a title like “Chemistry -chapter 2”"
              onChange={(event) => {
                setQuiz({ ...quiz, titel: event?.target.value });
              }}
            />
            <input
              type="text"
              placeholder="Add a description..."
              onChange={(event) => {
                setQuiz({ ...quiz, description: event?.target.value });
              }}
            />
          </div>
          <img
            src={require("../../assets/img/astronaut-on-computer2.png")}
            alt="astronaut on computer"
            width={350}
            height={360}
          />
        </section>
        <section className="card-section">
          {quizCardList.map((cardNum: number) => (
            <article className="quiz-card" key={cardNum}>
              <div className="top">
                <input
                  type="text"
                  placeholder="Enter Term..."
                  onChange={(event) => {
                    for (let question of questions) {
                      if (question.id === cardNum) {
                        question.term = event?.target.value;
                      }
                    }
                  }}
                />
                <div>
                  <button className="add-file-btn">Upload Image</button>
                  <DeleteOutlineOutlinedIcon
                    className="delete-icon"
                    onClick={() => {
                      deleteCard(cardNum);
                    }}
                  />
                </div>
              </div>
              <input
                type="text"
                placeholder="Enter Definition..."
                onChange={(event) => {
                  for (let question of questions) {
                    if (question.id === cardNum) {
                      question.definition = event?.target.value;
                    }
                  }
                }}
              />
            </article>
          ))}
          <button
            className="add-card-btn"
            onClick={() => {
              setCounter(counter + 1);
              addQuestions();
              setQuizCardList((prev) => [...prev, counter]);
            }}
          >
            <AddIcon className="add-icon" />
            <h2>Add Another Card</h2>
          </button>
        </section>
        <AuthBtn
          className="create-btn"
          variant="tertiary"
          isFullWidth={true}
          btnText="Create"
          onClick={(event) => {
            event.preventDefault();
            setQuiz({ ...quiz, questions: [questions] });
          }}
        />
      </form>
    </CreateQuizStyling>
  );
};
