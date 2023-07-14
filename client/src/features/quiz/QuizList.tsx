import { useEffect, useState } from "react";
import { QuizListStyling } from "../../components/styles/QuizList.styled";
import { QuizCard } from "./QuizCard";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { setIsLoading } from "../Modal/AuthSlice";
import { setQuizChange } from "../singleQuiz/QuizSlice";
import useUserAuth from "../../hooks/useUserAuth";

export const QuizList = () => {
  const dispatch = useDispatch();
  const { activeUser } = useSelector((state: any) => state.auth);
  const { isLoading } = useSelector((state: any) => state.auth);
  const [allQuizes, setAllQuizes] = useState([]);
  const { userStatus } = useUserAuth();

  useEffect(() => {
    setAllQuizes(activeUser.quizes);

    if (userStatus === 200) {
      dispatch(setIsLoading(false));
    }
  }, [activeUser.quizes, userStatus]);

  useEffect(() => {
    let interval = setTimeout(() => {
      if (userStatus === 200) {
        dispatch(setQuizChange(true));
      }
    }, 3 * 1000);
    return () => clearInterval(interval);
  }, [userStatus]);

  const renderList = () => {
    if (!allQuizes.length) {
      return (
        <h1 className="no-quizes-header">You don't have any quizes yet</h1>
      );
    } else {
      return (
        <>
          {allQuizes.map((quiz: any, index) => (
            <Link to={`/single-quiz/${quiz.id}`} key={index}>
              <QuizCard quiz={quiz} />
            </Link>
          ))}
        </>
      );
    }
  };
  return (
    <QuizListStyling>
      {isLoading ? (
        <Loader isFixed={false} hasBackground={false} />
      ) : (
        renderList()
      )}
    </QuizListStyling>
  );
};
