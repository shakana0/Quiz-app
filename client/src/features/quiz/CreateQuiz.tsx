import React, { useState, useEffect } from "react";
import { CreateQuizStyling } from "../../components/styles/CreateQuiz.styled";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import { AuthBtn } from "../buttons/AuthBtn";
import { QuizType } from "../../interface/quizType";

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
  const [currentQuestions, setQuestions] = useState<any[]>([initialQuestionsState]);
  const [quiz, setQuiz] = useState(initialQuizState);

  const deleteCard = (currentCardNum: number) => {
    let updatedCardList = quizCardList.filter(
      (cardNum) => cardNum != currentCardNum
    );
    let updatedQuestions = currentQuestions.filter((question) =>
      updatedCardList.find((cardNum) => cardNum === question.id)
    );
    setQuestions([...updatedQuestions]);
    setQuizCardList([...updatedCardList]);
  };
  const addQuestions = () => {
    currentQuestions.push({ id: counter, term: "", definition: "" });
  };
  const [quizErrors, setQuizErrors] = useState(initialQuizState);
  const [questionsError, setQueztionsError] = useState(false);

  useEffect(() => {
    setQuiz({ ...quiz, questions: [...currentQuestions] });
  }, [quiz]);

  const validateForm = () => {
    console.log(quiz, "this is quiz");
    setQuizErrors(initialQuizState);
    setQueztionsError(false);
    //validate quiz state

    if (quiz.titel === "") {
      console.log("titel är tom :(");
      setQuizErrors((current: any) => {
        return {
          ...current,
          titel: "Titel can not be empty",
        };
      });
    } else {
      console.log("den är inte tom längre :)");
    }
    if (quiz.description === "") {
      console.log("description är tom:(");
      setQuizErrors((current: any) => {
        return {
          ...current,
          description: "Description can not be empty",
        };
      });
    }

    // console.log(currentQuestions, 'heres the quiestions')
    for (let question of quiz.questions) {
      if (question.term === "" || question.definition === "") {
        setQueztionsError(true);
        console.log("vi har tomma strängar i questions");
      }
    }
  };

  //  console.log(quiz, "this is quiz");
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
            <p className="error">{quizErrors.titel}</p>
            <input
              type="text"
              placeholder="Add a description..."
              onChange={(event) => {
                setQuiz({ ...quiz, description: event?.target.value });
              }}
            />
            <p className="error">{quizErrors.description}</p>
          </div>
          <img
            src={require("../../assets/img/astronaut-on-computer2.png")}
            alt="astronaut on computer"
            width={350}
            height={360}
          />
        </section>
        <section className="card-section">
          <span className={questionsError ? "show-error" : "hide-error"}>
            <h4>
              You need to at least two cards, a term and definition to create
              quiz.
            </h4>
          </span>
          {quizCardList.map((cardNum: number) => (
            <article className="quiz-card" key={cardNum}>
              <div className="top">
                <input
                  type="text"
                  placeholder="Enter Term..."
                  onChange={(event) => {
                    for (let question of currentQuestions) {
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
                  for (let question of currentQuestions) {
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
          onClick={() => {
            // setQuiz({ ...quiz, questions: [...currentQuestions] });
            validateForm();
          }}
        />
      </form>
    </CreateQuizStyling>
  );
};
