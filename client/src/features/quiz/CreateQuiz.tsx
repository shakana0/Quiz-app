import { useState, useEffect } from "react";
import { CreateQuizStyling } from "../../components/styles/CreateQuiz.styled";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import { AuthBtn } from "../buttons/AuthBtn";
import { QuizType } from "../../interface/quizType";
import { useDispatch, useSelector } from "react-redux";
import * as api from "../../api/quizApi";
import { useNavigate } from "react-router";
import { setIsLoading } from "../Modal/AuthSlice";
import Strings from "../../utils/strings";
import { setQuizInfo } from "../singleQuiz/QuizSlice";
import ImageSearch from "../handleImage/ImageSearch";
const { v4: uuidv4 } = require("uuid");

export const CreateQuiz = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { activeUser } = useSelector((state: any) => state.auth);
  const [counter, setCounter] = useState(2); //ful-hack
  const [quizCardList, setQuizCardList] = useState<number[]>([1]);

  const initialQuestionsState = {
    id: 1,
    term: "",
    definition: "",
  };
  const initialQuizState: QuizType = {
    id: uuidv4(),
    titel: "",
    description: "",
    questions: [],
  };
  const [searchTerm, setSearchTerm] = useState(initialQuestionsState);

  const [currentQuestions, setQuestions] = useState<any[]>([
    initialQuestionsState,
  ]);
  const [quiz, setQuiz] = useState(initialQuizState);

  const deleteCard = (currentCardNum: number) => {
    let updatedCardList = quizCardList.filter(
      (cardNum) => cardNum !== currentCardNum
    );
    let updatedQuestions = currentQuestions.filter((question) =>
      updatedCardList.find((cardNum) => cardNum === question.id)
    );
    setQuestions([...updatedQuestions]);
    setQuizCardList([...updatedCardList]);
  };
  const addQuestions = () => {
    currentQuestions.push({
      id: counter,
      term: "",
      definition: "",
    });
  };
  const [quizErrors, setQuizErrors] = useState(initialQuizState);
  const [questionsError, setQueztionsError] = useState(false);

  useEffect(() => {
    setQuiz({ ...quiz, questions: [...currentQuestions] });
  }, [counter]); //using counter as dependency because quiz is an object but
  //the changes which we wish to follow are the same in both counter and quiz thefore we can use counter.

  const renderImageSearch = (cardNum: number) => {
    return (
      <ImageSearch
        searchTerm={searchTerm.id === cardNum ? searchTerm.term : ""}
      />
    );
  };

  const validateForm = () => {
    setQuizErrors(initialQuizState);
    setQueztionsError(false);
    let currentErr = [];

    //validate quiz state
    if (quiz.titel === "") {
      setQuizErrors((prev: any) => {
        return {
          ...prev,
          titel: "Titel can not be empty",
        };
      });
      currentErr.push("error");
    }
    if (quiz.description === "") {
      setQuizErrors((prev: any) => {
        return {
          ...prev,
          description: "Description can not be empty",
        };
      });
      currentErr.push("error");
    }

    for (let question of quiz.questions) {
      if (question.term === "" || question.definition === "") {
        setQueztionsError(true);
        currentErr.push("error");
      }
    }
    if (quiz.questions.length < 2) {
      setQueztionsError(true);
      currentErr.push("error");
    }
    if (!currentErr.length) {
      sendQuiz();
    }
  };
  const sendQuiz = async () => {
    const res = await api.postQuiz(activeUser._id, quiz);
    dispatch(setQuizInfo({ msg: res?.data?.msg, status: res?.status }));
    dispatch(setIsLoading(true));
    navigate("/");
  };

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
            <h1>{Strings.createQuizPage.pageHader}</h1>
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
            <h4>{Strings.createQuizPage.text.error}</h4>
          </span>
          {quizCardList.map((cardNum: number) => (
            <article className="quiz-card" key={cardNum}>
              <div className="top">
                <input
                  type="text"
                  placeholder="Enter Term..."
                  onChange={(event) => {
                    currentQuestions.find((question) =>
                      question.id === cardNum
                        ? (question.term = event?.target.value)
                        : false
                    );
                  }}
                />
                <div>
                  <button
                    className="add-file-btn"
                    onClick={() => {
                      currentQuestions.find((question) =>
                        question.id === cardNum
                          ? setSearchTerm({
                              ...question,
                              term: question.term,
                            })
                          : false
                      );
                    }}
                  >
                    {Strings.createQuizPage.buttons.getImg}
                  </button>
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
                  currentQuestions.find((question) =>
                    question.id === cardNum
                      ? (question.definition = event?.target.value)
                      : false
                  );
                }}
              />
              {renderImageSearch(cardNum)}
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
            <h2>{Strings.createQuizPage.buttons.add}</h2>
          </button>
        </section>
        <AuthBtn
          className="create-btn"
          variant="tertiary"
          isFullWidth={true}
          btnText={Strings.globalButtons.button.create}
          onClick={() => {
            validateForm();
          }}
        />
      </form>
    </CreateQuizStyling>
  );
};
