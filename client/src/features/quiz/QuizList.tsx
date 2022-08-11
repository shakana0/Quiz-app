import React, { useEffect, useState } from "react";
import { QuizListStyling } from "../../components/styles/QuizList.styled";
import { QuizCard } from "./QuizCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const QuizList = () => {
  const { activeUser } = useSelector((state: any) => state.auth);
  const [allQuizes, setAllQuizes] = useState([]);
  useEffect(() => {
    if (activeUser !== null) {
      setAllQuizes(activeUser.quizes);
    }
  }, []);
  const renderList = () => {
    // if (allQuizes.length) {
    //   if (!allQuizes.length) {
    //     return (
    //       <h1 className="no-quizes-header">You don't have any quizes yet</h1>
    //     );
    //   } else {
    //     return (
    //       <>
    //         {allQuizes.map((quiz: any, index) => (
    //           <Link to={`/single-quiz/${quiz.id}`} key={index}>
    //             <QuizCard quiz={quiz} />
    //           </Link>
    //         ))}
    //       </>
    //     );
    //   }
    // }
    return(
      <h1>Hej</h1>
    )
  };
  return (
    <QuizListStyling>
      {renderList()}
    </QuizListStyling>
  );
};
