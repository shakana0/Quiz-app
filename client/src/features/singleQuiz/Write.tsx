import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const Write = () =>{
    const { currentQuiz } = useSelector((state: any) => state.quiz);
    const [guessedTerm, setGuessedTerm] = useState('')
    return(
        <></>
    )
}

/*
input === current term
*/